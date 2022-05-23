import { TaskPreview } from './TaskPreview';

export function TaskList({ tasks }) {
  return (
    <section className="task-list-section">
      <ul className="task-list flex column">
        {tasks.map((task) => (
          <TaskPreview key={task._id} task={task} />
        ))}
      </ul>
    </section>
  );
}
