import request from '@/utils/request'

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/biz/notification/details',
    method: 'get',
    params: query
  })
}
// 阅读公告列表
export function readNotice(query) {
  return request({
    url: '/biz/notification/read',
    method: 'post',
    data: query
  })
}

// 查询未读消息
export function unread(query) {
  return request({
    url: '/biz/notification/unread',
    method: 'post',
    data: query
  })
}

// 查看我的消息
export function myBox(query) {
  return request({
    url: '/biz/notification/myBox',
    method: 'post',
    data: query
  })
}
// 查询公告详细
export function getNoticeDetail(data) {
  return request({
    url: '/biz/notification/detail',
    method: 'post',
    data: data
  })
}// 查询管理员消息详细
export function adminReadDetails(data) {
  return request({
    url: '/biz/notification/adminReadDetails',
    method: 'post',
    data: data
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/biz/notification',
    method: 'post',
    data: data
  })
}

// 修改公告

export function updateNotice(data) {
  return request({
    url: '/biz/notification',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}


// 查询草稿详细
export function getDraft() {
  return request({
    url: '/biz/notification/draft/load',
    method: 'get',

  })
}

// 新增草稿
export function saveDraft(data) {
  return request({
    url: '/biz/notification/draft/save',
    method: 'post',
    data: data
  })
}
