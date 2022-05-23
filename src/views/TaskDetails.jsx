import { useState } from 'react';
import { useEffect } from 'react';
import { taskService } from '../services/task-service';
import { getDate, getTime2 } from '../services/util-service';

export function TaskDetails(props) {
  const [task, setTask] = useState(null);
  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const taskId = props.match.params;
    try {
      const task = await taskService.getById(taskId);
      console.log('task', task);
      setTask(task);
    } catch (err) {
      console.log('err.message', err.message);
    }
  };

  if (!task) return <div>Loading task...</div>;
  return (
    <section className="task-details-container">
      <h1>{task.title}</h1>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created at: {getTime2(task.createdAt)}</p>
      {task.DoneAt && <p> Done at:{getDate(task.DoneAt)}</p>}
    </section>
  );
}
