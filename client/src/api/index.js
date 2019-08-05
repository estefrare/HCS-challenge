import store from '../redux/store'

const API_URL = 'http://localhost:3000'

const getClient = () => {
  let { token } = store.getState().users
  return {
    baseURL: API_URL,
    timeout: 25000,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  }
}

const status = (res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
}

const get = endpoint =>
  fetch(endpoint, { ...getClient(), method: 'GET' })
    .then(status)
    .then(res => res.json())
    .catch(error => {
      return Promise.reject(error)
    })

const post = (endpoint, data = {}) =>
  fetch(endpoint, { ...getClient(), method: 'POST', body: JSON.stringify(data) })
    .then(status)
    .then(res => res.json())
    .catch(error => {
      return Promise.reject(error)
    })

const put = (endpoint, data = {}) =>
  fetch(endpoint, { ...getClient(), method: 'PUT', body: JSON.stringify(data) })
    .then(status)
    .then(res => res.json())
    .catch(error => {
      return Promise.reject(error)
    })

const del = (endpoint, data = {}) =>
  fetch(endpoint, { ...getClient(), method: 'DELETE' })
    .then(status)
    .then(res => res.json())
    .catch(error => {
      return Promise.reject(error)
    })

export const loginApi = (params) => post(`${API_URL}/api/auth/login`, params)
export const getTasksApi = () => get(`${API_URL}/api/task`)
export const addTasksApi = (task) => post(`${API_URL}/api/task`, task)
export const editTasksApi = (task) => put(`${API_URL}/api/task/${task._id}`, task)
export const removeTasksApi = (id) => del(`${API_URL}/api/task/${id}`)
export const logoutApi = (task) => post(`${API_URL}/api/auth/logout`)