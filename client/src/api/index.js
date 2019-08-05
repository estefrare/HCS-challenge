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

const post = (endpoint, data = {}) =>
  fetch(endpoint, { ...getClient(), method: 'POST', body: JSON.stringify(data) })
    .then(status)
    .then(res => res.json())
    .catch(error => {
      return Promise.reject(error)
    })

export const loginApi = (params) => post(`${API_URL}/api/auth/login`, params)