const INITIAL_STATE = {
  tasks: null,
  filterBy: null,
};

export function taskReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.tasks,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.taskId),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.taskId ? action.task : task
        ),
      };
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy,
      };

    default:
      return state;
  }
}
