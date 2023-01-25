import Axios from 'axios'

const userApi = Axios.create({
  baseURL: 'http://localhost:3333/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
})

userApi.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete config.headers['Authorization']
  }
  return config
})

export default userApi
export { default as userApiActions } from './userApiActions'
