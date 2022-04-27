import request from './request'

export function addActivityReq(data) {
  return request({
    url: '/campaign',
    method: 'POST',
    data
  })
}

export function getActivityListReq() {
  return request({
    url: '/admin/campaign'
  })
}

export function deleteActivityReq(id) {
  return request({
    url: `/admin/campaign/${id}`,
    method: 'DELETE'
  })
}
