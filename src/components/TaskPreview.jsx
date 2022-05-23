import { Link } from 'react-router-dom';

export function TaskPreview({ task }) {
  return (
    <Link to={`/task/${task._id}`} className="task-preview flex">
      <h5 className="task-preview-title">{task.title}</h5>
      <h5 className="task-preview-description">{task.description}</h5>
      <h5 className="task-preview-time-status">{task.status}</h5>
      <h5 className="task-preview-time-created">{task.createdAt}</h5>
      <h5 className="task-preview-time-done">{task.doneAt}</h5>
      <h5 className="task-preview-importance">{task.importance}</h5>
    </Link>
  );
}
