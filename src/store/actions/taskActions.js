import { taskService } from '../../services/taskService.js';

function loadTasks() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().taskModule;
      const tasks = await taskService.query(filterBy);
      dispatch({ type: 'SET_TASKS', tasks });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

function saveTask(task) {
  return async (dispatch) => {
    try {
      await taskService.save(task);
      if (task._id) {
        dispatch({ type: 'ADD_TASK', task });
        console.log('user added');
      } else {
        dispatch({ type: 'UPDATE_TASK', task });
        console.log('user updated');
      }
    } catch (err) {
      console.log('err:', err);
    }
  };
}
function removeTask(taskId) {
  return async (dispatch) => {
    try {
      await taskService.remove(taskId);
      dispatch({ type: 'REMOVE_TASK', taskId });
      console.log('user Removed');
    } catch (err) {
      console.log('err:', err);
    }
  };
}

function getTask(taskId) {
  return async (dispatch) => {
    try {
      const task = await taskService.getById(taskId);
      return task;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

function setFilterBy(filterBy) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER_BY', filterBy });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export const taskActions = {
  loadTasks,
  saveTask,
  removeTask,
  getTask,
  setFilterBy,
};
