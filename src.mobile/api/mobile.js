
import request from "../untils/request";
/**
  * @description 登录
  */
export function LOGIN(query) {
  return request({
    url: '/web/login',
    method: 'POST',
    data: query
  })
}

/**
  * @description 获取我测评列表
  */
export function GET_QUESTION(query) {
  return request({
    url: '/web/getUserQuestion',
    method: 'get',
    params: query
  })
}
