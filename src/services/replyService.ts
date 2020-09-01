import { request } from '../utils/request';

export const replyService = {

  gets: (cid: number): Promise<any> => request({
    url: `/api/comment/${cid}/reply`
  }),


  create: (cid: number, data: any): Promise<any> => request({
    url: `/api/comment/${cid}/reply`,
    method: 'POST',
    data: data
  }),

  delete: (id: number): Promise<any> => request({
    url: `/api/reply/${id}`,
    method: 'DELETE'
  })
}