
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

/**
  * @description 保存答案
  */
export function SAVE_ANSWER(query) {
  return request({
    url: '/web/saveQuestionUserValue',
    method: 'post',
    data: query
  })
}

/**
  * @description 获取用户答案 作废
  */
export function GET_ANSWERFFF(query) {
  return request({
    url: '/web/getUserQuestionIssue',
    method: 'get',
    params: query
  })
}

/**
  * @description 获取用户答案
  */
export function GET_ANSWER(query) {
  return request({
    url: '/web/getShowQuestionAndAnswer',
    method: 'get',
    params: query
  })
}



/**
  * @description 退出登录
  */
export function LOGOUT(query) {
  return request({
    url: '/web/logout',
    method: 'get',
  })
}

/**
  * @description 获取用户题目以及答案
  */
export function GET_USER_QUESTION_ISSUE(query) {
  return request({
    url: '/web/getUserQuestionIssue',
    method: 'get',
    params: query
  })
}
