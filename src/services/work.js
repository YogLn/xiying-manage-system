import request from './request'

export function getListReq() {
  return request({
    url: '/admin/rankWork/uncheck'
  })
}
export function deleteReq(rankWorkId) {
  return request({
    url: `/admin/rankWork/${rankWorkId}`,
    method: 'DELETE'
  })
}
export function auditReq(rankWorkId) {
  return request({
    url: `/admin/rankWork/${rankWorkId}`,
    method: 'PUT'
  })
}
