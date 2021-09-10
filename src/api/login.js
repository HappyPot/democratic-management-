
import request from "../untils/request";

/**
  * @description 获取主体
  */
export function GET_SUBJECT_LIST(query) {
  return request({
    url: '/getSubjectList',
    method: 'get',
  })
}

/**
  * @description 登录
  */
 export function LOGIN(query) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data:query
  })
}
