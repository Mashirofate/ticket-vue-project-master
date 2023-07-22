import request from '@/utils/request'

export function getNumber(aId) {
  return request({
    url: '/tf/' + aId,
    method: 'get'
  })
}

export function getSum(aId) {
  return request({
    url: '/tf/s/' + aId,
    method: 'get'
  })
}

export function getTotality(aId) {
  return request({
    url: '/tf/Totality/' + aId,
    method: 'get'
  })
}

export function getHeadcount(aId) {
  return request({
    url: '/tf/getHeadcount/' + aId,
    method: 'get'
  })
}

export function getExportSum(aId) {
  return request({
    url: '/tf/HeadExport/' + aId,
    method: 'get'
  })
}
