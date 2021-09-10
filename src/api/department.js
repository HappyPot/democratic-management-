
import request from "../untils/request";


/**
  * @description 保存部门
  */
 export function SAVE_DEPARTMENT(query) {
  return request({
    url: '/admin/department/saveDepartment',
    method: 'post',
    data:query
  })
}