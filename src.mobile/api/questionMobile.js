
import request from "../untils/request";


/**
  * @description 获取问卷详情
  */
export function GET_PAPERDETAIL(query) {
  return request({
    url: '/web/paper/getPaperDetail',
    method: 'get',
    params: query
  })
}

/**
  * @description 获取问卷答案和问题
  */
export function GET_SHOW_QUESTION_ANSWER(query) {


  return request({
    url: '/web/paper/getShowQuestionAndAnswer',
    method: 'get',
    params: query
  })
}

/**
  * @description 保存问卷答案
  */
export function SAVE_PAPER_VALUE(query) {
  return request({
    url: '/web/paper/savePaperValue',
    method: 'get',
    params: query
  })
}
