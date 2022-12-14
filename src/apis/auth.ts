import { post, get } from '../utils/request'

export function register(data: {
  username: string,
  password: string,
  nickname: string
}) {
  return post<boolean>('/api/register', data)
}

export function captcha() {
  return get<{ key: string, svg: string }>('/api/captcha')
}

export function login(data: {
  username: string;
  password: string;
  captchaKey: string;
  captchaCode: string;
}) {
  return post<string>('/api/login', data)
}