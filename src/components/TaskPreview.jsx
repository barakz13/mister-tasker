import { Link } from 'react-router-dom';
import { getDate, getTime } from '../services/util-service';

export function TaskPreview({ task }) {
  return (
    <section>
      <h5 className="task-preview-title">{task.title}</h5>
      <h5 className="task-preview-description">{task.description}</h5>
      <h5 className="task-preview-time-status">{task.status}</h5>
      <h5 className="task-preview-time-created">{getDate(task.createdAt)}</h5>
      <h5 className="task-preview-time-done">{task.doneAt}</h5>
      <h1 className="task-preview-importance">{task.importance}</h1>
    </section>
    // <Link to={`/task/${task.id}`} className="task-preview flex">

    // </Link>
  );
}
