import { loginApi } from '../api'

export const loginAction = (params) => ({
  type: 'LOGIN',
  payload: loginApi(params)
})