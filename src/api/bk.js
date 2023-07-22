import request from '@/utils/request'

export function getByNames() {
  return request({
    url: '/bk/ay/',
    method: 'get'
  })
}

export function getByKeys(data) {
  return request({
    url: '/bk/search',
    method: 'get',
    params: data
  })
}

export function dekEnById(eId) {
  return request({
    url: '/bk/' + eId,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/bk/s/' + ids,
    method: 'delete'
  })
}

