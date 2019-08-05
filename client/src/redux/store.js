import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import userReducer from './reducer'

const reducers = {
  users: userReducer
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(promise))
export default store