import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import { reducer as formReducer } from 'redux-form'
import userReducer from './reducer'

const reducers = {
  users: userReducer,
  form: formReducer
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(promise))
export default store