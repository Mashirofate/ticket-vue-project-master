import request from '@/utils/request'

export function addEm(data) {
  return request({
    url: '/em/add',
    method: 'post',
    data: data
  })
}

export function updateEm(data) {
  return request({
    url: '/em/update',
    method: 'post',
    data: data
  })
}

export function dekEmById(id) {
  return request({
    url: '/em/' + id,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/em/s/' + ids,
    method: 'delete'
  })
}

export function getByKeys(params) {
  return request({
    url: '/em/search',
    method: 'get',
    params: params
  })
}

export function updateEnable(vmId, enable) {
  return request({
    url: '/em/' + vmId + '/' + enable,
    method: 'put'
  })
}

