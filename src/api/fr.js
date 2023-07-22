
import request from '@/utils/request'

export function getByKeys(data) {
  return request({
    url: '/fr/search',
    method: 'post',
    data: data
  })
}

