
import request from "../untils/request";

/**
  * @description 获取树状结构的单位列表
  */
export function GET_UNITTREE_LIST(query) {
  return request({
    url: '/admin/unit/getUnitTreeList?is_enable=1',
    method: 'get',
  })
}

/**
  * @description 保存单位
  */
 export function SAVE_UNIT(query) {
  return request({
    url: '/admin/unit/saveUnit',
    method: 'post',
    data:query
  })
}