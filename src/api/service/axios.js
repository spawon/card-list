import axios from 'axios'
import { ErrorWithRange as NProgress } from '@vue/component-compiler-utils/dist/types'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default instance
