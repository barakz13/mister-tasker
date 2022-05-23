import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { taskService } from '../services/task-service';
import { Link } from 'react-router-dom';

export const TaskEdit = props => {
  const [taskToEdit, handleChange, setTaskToEdit] = useForm(null);
  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const taskId = props.match.params.id;

    if (taskId) {
      try {
        const task = await taskService.getById(taskId);
        setTaskToEdit(task);
      } catch (err) {
        console.log('err.message', err.message);
      }
    } else {
      const task = taskService.getEmptyTask();
      setTaskToEdit(task);
    }
  };
  const onSaveTask = async ev => {
    ev.preventDefault();
    await taskService.save(taskToEdit);
    props.history.push('/task');
  };

  const onRemoveTask = async () => {
    await taskService.remove(taskToEdit);
    props.history.push('/task');
  };

  const inputRef = elInput => {
    if (elInput) elInput.focus();
  };

  if (!taskToEdit) return <div>Loading task to edit...</div>;
  return (
    <section className="task-edit-container">
      <form onSubmit={onSaveTask}>
        <h1>{taskToEdit.id ? 'Update task' : 'Add task'} </h1>
        <label htmlFor="title">Enter title:</label>
        <input
          type="text"
          name="title"
          value={taskToEdit.title}
          onChange={handleChange}
          // ref={inputRef}
        />
        <label htmlFor="description">Enter description:</label>
        <input
          type="text"
          name="description"
          value={taskToEdit.description}
          onChange={handleChange}
        />
        <label htmlFor="importance">Enter importance:</label>
        <input
          type="number"
          name="importance"
          min={1}
          max={3}
          value={taskToEdit.importance}
          onChange={handleChange}
        />
        <button>{taskToEdit.id ? 'Update' : 'Save'}</button>
      </form>

      <div className="btns-action">
        <Link to={`/task`}>
          <button>Back</button>
        </Link>
        <button onClick={() => onRemoveTask(taskToEdit._id)}>Delete</button>
      </div>
    </section>
  );
};
