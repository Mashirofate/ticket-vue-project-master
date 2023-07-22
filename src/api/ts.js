import request from '@/utils/request';

export function addTs(data) {
  return request({
    url: '/ts/add',
    method: 'post',
    data: data
  });
}

// // TODO: 功能和引用在那？
export function dekEmById(id) {
  return request({
    url: '/ts/' + id,
    method: 'delete'
  });
}

export function dekTsById(tid) {
  return request({
    url: '/ts/' + tid,
    method: 'delete'
  });
}

export function delByIds(ids) {
  return request({
    url: '/ts/s/' + ids,
    method: 'delete'
  });
}

export function getByKeys(params) {
  return request({
    url: '/ts/search',
    method: 'get',
    params: params
  });
}

export function updateTs(data) {
  return request({
    url: '/ts/update',
    method: 'post',
    data: data
  })
}
