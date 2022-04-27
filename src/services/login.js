import request from './request'

export function loginReq(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
