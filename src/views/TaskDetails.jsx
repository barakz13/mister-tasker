import { useState } from 'react';
import { useEffect } from 'react';
import { taskService } from '../services/task-service';
import { getDate, getTime2 } from '../services/util-service';
import { Link } from 'react-router-dom';

export function TaskDetails(props) {
  const [task, setTask] = useState(null);
  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const taskId = props.match.params.id;
    try {
      const task = await taskService.getById(taskId);
      console.log('task', task);
      setTask(task);
    } catch (err) {
      console.log('err.message', err.message);
    }
  };

  if (!task) return <div className="div-loading">Loading...</div>;
  return (
    <section className="task-details-section">
      <section className="task-details flex column space-evenly align-center">
        <h1 className="task-details-title">{task.title}</h1>
        <p className="task-details-label">Description: {task.description}</p>
        <p className="task-details-label">Status: {task.status}</p>
        <p className="task-details-label">Importance: {task.importance}</p>
        <p className="task-details-label">Tries count: {task.triesCount}</p>
        {task.doneAt ? (
          <p className="task-details-label">
            {' '}
            Done at: {getTime2(task.doneAt / 1000)}
          </p>
        ) : (
          ''
        )}
        <p className="task-details-label">
          Created at: {getTime2(task.createdAt.seconds)}
        </p>
        <Link to={`/task`}>
          <button className="task-details-back btn">Back</button>
        </Link>
      </section>
    </section>
  );
}
