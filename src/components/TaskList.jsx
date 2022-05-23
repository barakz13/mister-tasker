import { TaskPreview } from './TaskPreview';
import { useEffect } from 'react';

export function TaskList({ tasks }) {
  useEffect(() => {
    console.log(tasks);

    return () => {};
  }, []);

  return (
    <section className="task-list-section">
      <ul className="task-list flex column">
        {tasks.map((task) => (
          <TaskPreview task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );
}
