import request from '@/utils/request'
export function getByKeys(data) {
    return request({
        url: '/de/search',
        method: 'get',
        params: data
    })
}

export function adddes(data) {
    return request({
        url: '/de/add',
        method: 'post',
        data: data
    })
}

export function dekdesById(dId) {
    return request({
        url: '/de/' + dId,
        method: 'delete'
    })
}

export function delByIds(ids) {
    return request({
        url: '/de/s/' + ids,
        method: 'delete'
    })
}

export function updateDe(data) {
    return request({
        url: '/de/update',
        method: 'post',
        data: data
    })
}
export function synchrodata(data) {
    return request({
        url: '/de/synchrodata',
        method: 'post',
        data: data
    })
}

export function getaiKeys(data) {
    return request({
        url: '/de/searchai',
        method: 'get',
        params: data
    })
}

export function deaiById(aId) {
    return request({
        url: '/de/saii/' + aId,
        method: 'delete'
    })
}
export function delaiByIds(ids) {
    return request({
        url: '/de/sai/' + ids,
        method: 'delete'
    })
}
export function updatai(data) {
    return request({
        url: '/de/updateai',
        method: 'post',
        data: data
    })
}
export function addai(data) {
    return request({
        url: '/de/addai',
        method: 'post',
        data: data
    })
}