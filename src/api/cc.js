import request from '@/utils/request'

export function getByKeys(data) {
  return request({
    url: '/cc/search',
    method: 'get',
    params: data
  })
}

export function adddes(data) {
  return request({
    url: '/cc/add',
    method: 'post',
    data: data
  })
}

export function desccId(fId) {
  return request({
    url: '/cc/' + fId,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/cc/s/' + ids,
    method: 'delete'
  })
}

export function updatecc(data) {
  return request({
    url: '/cc/update',
    method: 'post',
    data: data
  })
}
