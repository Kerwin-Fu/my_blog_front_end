import { get, put } from '../utils/request'

export function getUserProfile() {
  return get('/api/user/profile')
}

export function updateAvatar(avatar: string) {
  return put<boolean>('/api/user/profile/avatar', { avatar })
}

export function updateBaseInfo(data: {
  nickname: string
}) {
  return put<boolean>('/api/user/profile/baseinfo', data)
}

export function updatePassword(data: {
  oldPassword: string,
  newPassword: string
}) {
  return put<boolean>('/api/user/profile/password', data)
}