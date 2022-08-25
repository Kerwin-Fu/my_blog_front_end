import router from '@/router'
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import store from '../store'

export const baseURL = 'http://localhost:8000'

const http = axios.create({
  baseURL,
  timeout: 20000
})

http.interceptors.request.use(config => {
  if (config && config.headers && config?.url?.indexOf('/api/user') === 0) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }
  return config
})


http.interceptors.response.use(response => {
  return response
}, error => {
  const response = error.response
  const data = response.data

  ElMessage.error(`${data.message} (错误代码：${data.code})`)

  if (response.status === 401) {
    store.dispatch('clearLogin')
    return router.replace('/sign/login')
  }

  return Promise.reject(error)
})

export default http


export interface ApiResult<T = any> {
  code: number,
  message: string,
  data: T
}

export function get<T = any>(url: string, config?: AxiosRequestConfig | undefined) {
  const promise = http.get<ApiResult<T>>(url, config)

  return promise.then(res => res.data.data)
}


export function del<T = any>(url: string, config?: AxiosRequestConfig | undefined) {
  const promise = http.delete<ApiResult<T>>(url, config)
  return promise.then(res => res.data.data)
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
  const promise = http.post<ApiResult<T>>(url, data, config)
  return promise.then(res => res.data.data)
}

export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
  const promise = http.put<ApiResult<T>>(url, data, config)
  return promise.then(res => res.data.data)
}