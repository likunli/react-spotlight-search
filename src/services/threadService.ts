import { request } from '../utils/request';

export const threadService = {

  gets: (): Promise<any> => request({
    url: `/api/threads`
  }),

  get: (tid: number): Promise<any> => request({
    url: `/api/thread/${tid}`
  }),

  create: (data: number): Promise<any> => request({
    url: `/api/thread`,
    method: 'POST',
    data: data
  }),

  update: (tid: number, data: any): Promise<any> => request({
    url: `/api/thread/${tid}`,
    method: 'PUT',
    data: data
  }),

  delete: (tid: number): Promise<any> => request({
    url: `/api/thread/${tid}`,
    method: 'DELETE'
  })
}