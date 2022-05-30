import { taskService } from './task-service';
import { externalService } from './externalService';
import { workerEvent } from './util-service';

export const workerService = {
  performTask,
  startStopWorker,
};

var gIsWorkerOn;

async function performTask(task) {
  try {
    task.status = 'Running';
    await taskService.save(task);
    window.dispatchEvent(workerEvent);
    var updatedTask = await taskService.getById(task.id);
    await externalService.execute(updatedTask);
    updatedTask.status = 'Done';
    updatedTask.doneAt = Date.now();
  } catch (err) {
    updatedTask.status = 'Failed';
    updatedTask.errors.push(err);
  } finally {
    updatedTask.lastTriedAt = Date.now();
    updatedTask.triesCount++;
    await taskService.save(updatedTask);
    window.dispatchEvent(workerEvent);
    return updatedTask;
  }
}

// Run worker
async function _runWorker(sortBy) {
  // The isWorkerOn is toggled by the button: "Start/Stop Task Worker"
  console.log('gIsWorkerOn', gIsWorkerOn);
  if (!gIsWorkerOn) return;
  var delay = 5000;
  try {
    const task = await getNextTask(sortBy);
    console.log(task);
    if (task) {
      try {
        await performTask(task);
      } catch (err) {
        console.log(`Failed Task`, err);
      } finally {
        delay = 1;
      }
    } else {
      gIsWorkerOn = false;
      console.log('Snoozing... no tasks to perform');
    }
  } catch (err) {
    console.log(`Failed getting next task to execute`, err);
  } finally {
    setTimeout(_runWorker, delay, sortBy);
  }
}

function startStopWorker(isWorkerOn, sortBy) {
  gIsWorkerOn = isWorkerOn;
  _runWorker(sortBy);
}

async function getNextTask(sortBy) {
  try {
    const filterBy = {
      triesCount: 6,
      status: ['New', 'Failed'],
    };
    const tasks = await taskService.query(filterBy, sortBy);
    //   {
    //     $and: [
    //       { doneAt: null },
    //       { triesCount: { $lt: 5 } },
    //       { status: { $ne: 'Running' } },
    //     ],
    //   },
    //   { importance: -1 }
    const task = tasks.shift();
    console.log(task);
    return task;
  } catch (err) {}
}
