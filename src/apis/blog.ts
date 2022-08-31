import { get } from '@/utils/request';

export function listBlogArticles(data: {
  categoryId?: string,
  pageNo?: number,
  pageSize?: number
}) {
  return get<{ total: number, items: any[] }>('/api/articles', {
    params: data
  })

}

export function getArticleDetail(id: string) {
  return get(`/api/articles/${id}`)
}