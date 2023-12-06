import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询列表
export function getBlacklist(query) {
  return request({
    url: '/biz/blacklist/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getBlackDetail(blacklistId) {
  return request({
    url: '/biz/blacklist/' + parseStrEmpty(blacklistId),
    method: 'get'
  })
  //
}// 查询车牌号查详情
export function readBlacklist(data) {
  return request({
    url: '/biz/blacklist/readBlacklist' ,
    method: 'post',
    data: data
  })
}

// 新增用户
export function addBlack(data) {
  return request({
    url: '/biz/blacklist',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateBlack(data) {
  return request({
    url: '/biz/blacklist',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}



// 状态修改
export function changeBlackStatus(data) {

  return request({
    url: '/biz/blacklist/changeStatus',
    method: 'put',
    data: data
  })
}


