import {
  loginApi,
  getTasksApi,
  addTasksApi,
  editTasksApi,
  removeTasksApi,
  logoutApi
} from '../api'

export const loginAction = (params) => ({
  type: 'LOGIN',
  payload: loginApi(params)
})

export const getTasksAction = () => ({
  type: 'GET_TASKS',
  payload: getTasksApi()
})

export const selectTaskAction = (id) => ({
  type: 'SELECT_TASK',
  payload: id
})

export const addTaskAction = (task) => ({
  type: 'ADD_TASK',
  payload: addTasksApi(task)
})

export const editTaskAction = (task) => ({
  type: 'EDIT_TASK',
  payload: editTasksApi(task)
})

export const removeTaskAction = (id) => ({
  type: 'REMOVE_TASK',
  payload: removeTasksApi(id)
})

export const logoutAction = () => ({
  type: 'LOGOUT',
  payload: logoutApi()
})