import { request } from '../utils/request';

export const commentService = {

  gets: (tid: number): Promise<any> => request({
    url: `/api/thread/${tid}/comments`
  }),

  get: (id: number): Promise<any> => request({
    url: `/api/comment/${id}`
  }),

  create: (tid: number, data: any): Promise<any> => request({
    url: `/api/thread/${tid}/comment`,
    method: 'POST',
    data
  }),

  delete: (id: number): Promise<any> => request({
    url: `/api/comment/${id}`,
    method: 'DELETE'
  })
}