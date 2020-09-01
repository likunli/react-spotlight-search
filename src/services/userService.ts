import { request } from '../utils/request';

export const userService = {

  get: (id: number): Promise<any> => request({
    url: `/api/user/${id}`
  }),

  create: (data: any): Promise<any> => request({
    url: `/api/user`,
    method: 'POST',
    data: data
  }),

  checkSession: (data: any): Promise<any> => request({
    url: `/api/session`
  }),

  login: (data: any): Promise<any> => request({
    url: `/api/session`,
    method: 'POST',
    data: data
  }),

  logout: (): Promise<any> => request({
    url: `/api/session`,
    method: 'DELETE'
  })
}