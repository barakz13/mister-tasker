import { taskService } from './task-service';
import { externalService } from './externalService';

export const workerService = {
  performTask,
  startStopWorker,
};

var gIsWorkerOn;

async function performTask(task) {
  try {
    task.status = 'Running';
    await taskService.save(task);
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
    return updatedTask;
  }
}

// Run worker
async function _runWorker() {
  // The isWorkerOn is toggled by the button: "Start/Stop Task Worker"
  console.log('gIsWorkerOn', gIsWorkerOn);
  if (!gIsWorkerOn) return;
  var delay = 5000;
  try {
    const task = await getNextTask();
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
    setTimeout(_runWorker, delay);
  }
}

function startStopWorker(isWorkerOn) {
  gIsWorkerOn = isWorkerOn;
  _runWorker();
}

async function getNextTask() {
  try {
    const filterBy = {
      doneAt: null,
      triesCount: 6,
      status: ['Running', 'Done'],
    };
    const tasks = await taskService.query(filterBy);
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
