
import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 按车辆类型统计
export function getCountData(query) {
  return request({
    url: '/biz/vehicle/type/count',
    method: 'get',
    // method: 'get',
    params: query
  })
}

