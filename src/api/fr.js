import request from '@/utils/request'

export function getByKeys(data) {
    return request({
        url: '/fr/search',
        method: 'post',
        data: data
    })
}

export function getposts(params) {
    return request({
        url: '/fr/posts',
        method: 'post',
        data: params
    })
}

export function gethuizou(params) {
    return request({
        url: '/fr/huiZhouPosts',
        method: 'post',
        data: params
    })
}
export function getapplet(params) {
    return request({
        url: '/fr/applet',
        method: 'post',
        data: params
    })
}
export function getEntryrecord(params) {
    return request({
        url: '/fr/Entryrecord',
        method: 'post',
        data: params
    })
}