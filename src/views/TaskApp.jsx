import { TaskList } from '../components/TaskList';
import { taskService } from '../services/task-service';
import { useEffect, useState } from 'react';

export function TaskApp() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    console.log('did mount');
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await taskService.query(null);
    setTasks(tasks);
    console.log(tasks);
  };
  if (!tasks) return <div>Loading tasks....</div>;
  return (
    <section className="task-app">
      <TaskList tasks={tasks} />
    </section>
  );
}
