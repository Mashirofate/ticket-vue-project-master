import request from '@/utils/request'

export function addVa(data) {
  return request({
    url: '/va/add',
    method: 'post',
    data: data
  })
}

export function updateVa(data) {
  return request({
    url: '/va/update',
    method: 'post',
    data: data
  })
}

export function delVaById(id) {
  return request({
    url: '/va/' + id,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/va/s/' + ids,
    method: 'delete'
  })
}

export function getByKeys(params) {
  return request({
    url: '/va/search',
    method: 'get',
    params: params
  })
}

export function getOpenActivies(params) {
  return request({
    url: '/va/open',
    method: 'get',
    params: params
  })
}

export function updateEnable(vmId, enable) {
  return request({
    url: '/va/' + vmId + '/' + enable,
    method: 'put'
  })
}

export function getVaByVaId(vaId) {
  return request({
    url: '/va/' + vaId,
    method: 'get'
  })
}

export function getVaSimples() {
  return request({
    url: '/va/simple',
    method: 'get'
  })
}
