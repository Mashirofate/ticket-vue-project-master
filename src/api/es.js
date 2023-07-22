import request from '@/utils/request'

export function addEm(data) {
  return request({
    url: '/es/add',
    method: 'post',
    data: data
  })
}

export function getByKeys(data) {
  return request({
    url: '/es/search',
    method: 'get',
    params: data
  })
}

export function dekEnById(eId) {
  return request({
    url: '/es/' + eId,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/es/s/' + ids,
    method: 'delete'
  })
}

