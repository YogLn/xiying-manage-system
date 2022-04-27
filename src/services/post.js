import request from './request'

export function getPostListReq() {
  return request({
    url: '/admin/post/uncheck'
  })
}

export function auditPostReq(postId) {
  return request({
    url: `/admin/post/${postId}`,
    method: 'PUT'
  })
}

export function deletePostReq(postId) {
  return request({
    url: `/admin/post/${postId}`,
    method: 'DELETE'
  })
}
