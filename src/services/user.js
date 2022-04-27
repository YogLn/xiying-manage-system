import request from './request'

export function getUserListReq() {
  return request({
    url: '/admin/user'
  })
}
export function banUserReq(data) {
  return request({
    url: '/admin/user/ban',
    method: 'PUT',
    data
  })
}
export function unLockUserReq(userId) {
  return request({
    url: `/admin/user/unblock/${userId}`,
    method: 'PUT'
  })
}
export function registerSponsorReq(data) {
  return request({
    url: `/register/sponsor`,
    method: 'POST',
    data
  })
}
