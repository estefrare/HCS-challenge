const initialState = {
  username: undefined,
  isFetching: false,
  isAdding: false,
  tasks: [],
  selectedTask: undefined,
  token: undefined,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK_PENDING':
    case 'REMOVE_TASK_PENDING':
    case 'EDIT_TASK_PENDING':
      return {
        ...state,
        isAdding: true,
      }
    case 'LOGIN_PENDING':
      return {
        ...state,
        isFetching: true,
      }
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isFetching: false,
        token: action.payload.data.token,
        username: action.payload.data.username
      }
    case 'REMOVE_TASK_FULFILLED': {
      const tasks = state.tasks.filter(t => t._id !== action.payload.data._id)
      return {
        ...state,
        isAdding: false,
        tasks,
        selectedTask: undefined,
      }
    }
    case 'EDIT_TASK_FULFILLED': {
      const taskIndex = state.tasks.findIndex(t => t._id === action.payload.data._id)
      const tasks = [...state.tasks]
      tasks[taskIndex] = action.payload.data
      return {
        ...state,
        isAdding: false,
        tasks,
      }
    }
    case 'ADD_TASK_FULFILLED':
      return {
        ...state,
        isAdding: false,
        tasks: [
          ...state.tasks,
          action.payload.data
        ]
      }
    case 'GET_TASKS_FULFILLED':
      return {
        ...state,
        isFetching: false,
        tasks: action.payload
      }
    case 'REMOVE_TASK_REJECTED':
    case 'EDIT_TASK_REJECTED':
    case 'ADD_TASK_REJECTED':
    case 'GET_TASKS_REJECTED':
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isAdding: false,
        isFetching: false,
      }
    case 'SELECT_TASK':
      return {
        ...state,
        selectedTask: action.payload,
      }
    default:
      return state
  }
}

export default reducer