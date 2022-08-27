import { get} from '@/utils/request'

export function listCategories() {
  return get<any[]>('/api/categories')
}