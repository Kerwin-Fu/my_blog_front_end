import { post } from '@/utils/request'

export function uploadImage(data: FormData) {
  return post('/api/user/image/upload', data)
}