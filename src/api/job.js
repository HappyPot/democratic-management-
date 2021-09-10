
import request from "../untils/request";


/**
  * @description 获取职务列表
  */
export function GET_DUTY_LIST(query) {
  return request({
    url: '/admin/duty/getDutyList?subject_id=1',
    method: 'get',
  })
}

/**
  * @description 保存职务
  */
 export function SAVE_DUTY(query) {
  return request({
    url: '/admin/duty/saveDuty',
    method: 'post',
    data:query
  })
}