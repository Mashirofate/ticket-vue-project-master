import request from '@/utils/request'

export function getByKeys(data) {
  return request({
    url: '/bt/search',
    method: 'get',
    params: data
  })
}

export function adddes(data) {
  return request({
    url: '/bt/add',
    method: 'post',
    data: data
  })
}

export function desccId(fId) {
  return request({
    url: '/bt/' + fId,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/bt/s/' + ids,
    method: 'delete'
  })
}

export function updatecc(data) {
  return request({
    url: '/bt/update',
    method: 'post',
    data: data
  })
}
