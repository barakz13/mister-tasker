import { TaskList } from '../components/TaskList';
import { taskService } from '../services/task-service';
import { useEffect, useState, useRef } from 'react';
import { workerService } from '../services/worker-service';

export function TaskApp({ history }) {
  const [tasks, setTasks] = useState(null);
  let [isWorkerOn, setIsWorkerOn] = useState(false);

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

  const onStartWorker = () => {
    console.log('first', isWorkerOn);
    // isWorkerOn = !isWorkerOn;
    setIsWorkerOn((isWorkerOn = !isWorkerOn));
    // setIsWorkerOn(!isWorkerOn);
    console.log('second', isWorkerOn);
    // workerService.startStopWorker(isWorkerOn);
  };

  const onGoToEdit = () => {
    history.push('/task/edit');
  };

  if (!tasks) return <div className="div-loading">Loading...</div>;
  return (
    <section className="task-app flex column">
      <div className="task-app-btns flex space-evenly">
        <div className="btn-worker-div flex justify-center align-center">
          <button className="btn-worker btn" onClick={onStartWorker}>
            {isWorkerOn ? 'Stop' : 'Start'}
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
