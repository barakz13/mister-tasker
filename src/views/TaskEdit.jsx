import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { taskService } from '../services/task-service';
import { Link } from 'react-router-dom';

export const TaskEdit = ({ history, match }) => {
  const [taskToEdit, handleChange, setTaskToEdit] = useForm(null);
  useEffect(() => {
    console.log(match.params.id);
    getTask();
  }, []);

  const getTask = async () => {
    const taskId = match.params.id;

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
  const onSaveTask = async (ev) => {
    ev.preventDefault();
    await taskService.save(taskToEdit);
    history.push('/task');
  };

  const onRemoveTask = async () => {
    await taskService.remove(taskToEdit);
    history.push('/task');
  };

  const inputRef = (elInput) => {
    if (elInput) elInput.focus();
  };

  if (!taskToEdit) return <div className="div-loading">Loading...</div>;
  return (
    <section className="task-edit-section">
      <div className="task-edit flex column space-between">
        <form
          className="task-edit-form flex column space-between align-center"
          onSubmit={onSaveTask}
        >
          <h1>{taskToEdit.id ? 'Update task' : 'Add task'} </h1>
          <label htmlFor="title">Enter title:</label>
          <input
            className="task-edit-input"
            required
            type="text"
            name="title"
            value={taskToEdit.title}
            onChange={handleChange}
            // ref={inputRef}
          />
          <label htmlFor="description">Enter description:</label>
          <input
            className="task-edit-input"
            required
            type="text"
            name="description"
            value={taskToEdit.description}
            onChange={handleChange}
          />
          <label htmlFor="importance">Enter importance (1-3):</label>
          <input
            className="task-edit-input"
            required
            type="number"
            name="importance"
            min={1}
            max={3}
            value={taskToEdit.importance}
            onChange={handleChange}
          />
          <button className="task-edit-btn btn">
            {taskToEdit.id ? 'Update' : 'Save'}
          </button>
        </form>

        <div className="task-edit-btns flex space-evenly align-center">
          {match.params.id ? (
            <button
              className="task-edit-btn-bottom btn"
              onClick={() => onRemoveTask(taskToEdit._id)}
            >
              Delete
            </button>
          ) : (
            ''
          )}
          <Link to={`/task`}>
            <button className="task-edit-btn-bottom btn">Back</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
