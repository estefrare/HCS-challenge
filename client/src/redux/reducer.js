const initialState = {
  username: undefined,
  isFetching: false,
  token: undefined,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isAdding: false,
        isFetching: false,
      }
    default:
      return state
  }
}

export default reducer