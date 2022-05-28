import { TaskList } from '../components/TaskList';
import { taskService } from '../services/task-service';
import { useEffect, useState, useRef } from 'react';
import { workerService } from '../services/worker-service';

export function TaskApp({ history }) {
  const [tasks, setTasks] = useState(null);
  let [isWorkerOnTries, setIsWorkerOnTries] = useState(false);
  let [isWorkerOnImportance, setIsWorkerOnImportance] = useState(false);

  useEffect(() => {
    console.log('task app mounted');
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await taskService.query();
    setTasks(tasks);
  };

  const onSave = async (id) => {
    try {
      const task = await taskService.getById(id);
      task.status = 'Running';
      loadTasks();
      await workerService.performTask(task);
      loadTasks();
    } catch (err) {}
  };

  const onStartWorker = (value) => {
    // console.log('first', isWorkerOn);
    // isWorkerOn = !isWorkerOn;
    if (value === 'tries') {
      setIsWorkerOnTries((isWorkerOnTries = !isWorkerOnTries));
      workerService.startStopWorker(isWorkerOnTries, 'tries');
    } else {
      setIsWorkerOnImportance((isWorkerOnImportance = !isWorkerOnImportance));
      workerService.startStopWorker(isWorkerOnImportance, 'importance');
    }
    // setIsWorkerOn(!isWorkerOn);
    // console.log('second', isWorkerOn);
  };

  const onGoToEdit = () => {
    history.push('/task/edit');
  };

  if (!tasks) return <div className="div-loading">Loading...</div>;
  return (
    <section className="task-app flex column">
      <div className="task-app-btns flex space-evenly">
        <div className="btn-worker-div flex space-between align-center">
          <button
            className="btn-worker btn"
            onClick={() => onStartWorker('tries')}
          >
            {isWorkerOnTries ? 'Stop' : 'Start'}{' '}
            <span className="btn-worker-span"> (fewer tries first)</span>
          </button>
          <button
            className="btn-worker btn"
            onClick={() => onStartWorker('importance')}
          >
            {isWorkerOnImportance ? 'Stop' : 'Start'}{' '}
            <span className="btn-worker-span">(higher importance first)</span>
          </button>
        </div>
        <div className="btn-add-div flex justify-center align-center">
          <button className="btn-add btn" onClick={onGoToEdit}>
            Add
          </button>
        </div>
      </div>
      <TaskList
        tasks={tasks}
        onSaveTask={onSave}
        onStartWorker={onStartWorker}
      />
    </section>
  );
}
