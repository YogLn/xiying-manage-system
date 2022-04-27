import request from './request'

export function getCommentListReq() {
  return request({
    url: '/admin/comment'
  })
}
export function deleteCommentReq(data) {
  return request({
    url: '/admin/comment',
    method: 'DELETE',
    data
  })
}
export function auditCommentReq(commentID) {
  return request({
    url: `/admin/comment/${commentID}`,
    method: 'PUT'
  })
}
