import { get, post, put, del } from '@/utils/request';

export function listArticles(data: {
  categoryId?: string,
  keyword?: string,
  pageNo?: number,
  pageSize?: number
}) {
  return get<{ total: number, items: any[] }>('/api/user/articles', {
    params: data
  })
}


export function createArticle(data: {
  title: string,
  summary: string,
  content: string,
  categoryId: string
}) {
  return post<boolean>('/api/user/articles', data)
}

export function updateArticle(data: {
  _id: string,
  title: string,
  summary: string,
  content: string,
  categoryId: string
}) {
  return put<boolean>(`/api/user/articles/${data._id}`, data)
}

export function getArticle(id: string) {
  return get(`/api/user/articles/${id}`)
}