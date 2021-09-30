
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

/**
  * @description 获取测评详情
  */
 export function GET_QUESTION_INFO(query) {
  return request({
    url: '/web/getQuestionDetail',
    method: 'get',
    params: query
  })
}

/**
  * @description 修改密码
  */
 export function SAVE_PASSWORD(query) {
  return request({
    url: '/web/savePassword',
    method: 'post',
    data: query
  })
}
