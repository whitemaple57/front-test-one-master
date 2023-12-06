import request from '@/utils/request'


// 获取岗亭名称
export function getEntranceName(query) {
  return request({
    url: '/biz/analysis/getEntranceName',
    method: 'post',
    data: query
  })
}
// 获取岗亭车辆统计
export function getEntranceCount(query) {
  return request({
    url: '/biz/analysis/getEntranceCount',
    method: 'post',
    data: query
  })
}

// 获取岗亭车辆统计(以岗亭名称统计)
export function getEntranceCountName(query) {
  return request({
    url: '/biz/analysis/getEntranceCountName',
    method: 'post',
    data: query
  })
}

// 统计今日车辆
export function getTodayVehicle(query) {
  return request({
    url: '/biz/analysis/list/vehicle/today',
    method: 'get',
    params: query
  })
}

// 统计本月车辆
export function getMonthVehicle(query) {
  return request({
    url: '/biz/analysis/list/vehicle/month',
    method: 'get',
    params: query
  })
}

// 统计今日危化品车辆
export function getChemicalVehicle(query) {
  return request({
    url: '/biz/analysis/list/vehicle/chemical',
    method: 'get',
    params: query
  })
}


// 获取企业车辆统计
export function getCompanyCount(query) {
  return request({
    url: '/biz/analysis/getCompanyCount',
    method: 'post',
    params: query
  })
}
