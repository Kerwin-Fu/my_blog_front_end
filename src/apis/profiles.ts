import {get,put} from '../utils/request'

export function getUserProfile() {
  return get('/api/user/profile')
}