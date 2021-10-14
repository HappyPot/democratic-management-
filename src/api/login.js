
import request from "../untils/request";
import { find, map, random } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, serviceForMock, requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'
/**
  * @description 获取主体
  */
export function GET_SUBJECT_LIST(query) {

  // 模拟数据
  mock
    .onAny('/getSubjectList')
    .reply(config => tools.responseSuccess({
      "status": 0,
      "msg": "OK",
      "data": [
        {
          "id": 1,
          "subject_name": "主体1"
        },
        {
          "id": 2,
          "subject_name": "主体2"
        }
      ]
    }))

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
    data: query
  })
}

/**
  * @description 退出登录
  */
export function LOGOUT(query) {
  return request({
    url: '/admin/logout',
    method: 'POST',
  })
}

/**
  * @description 首页数据
  */
export function GET_INDEX(query) {
  // 模拟数据
  mock
    .onAny('/admin/index')
    .reply(config => tools.responseSuccess({
      "status": 0,
      "msg": "OK",
      "data": {
        "question_count": [
          {
            "count": 27,
            "type": 1
          }
        ],
        "system_info": {
          "account_title": "liuxi",
          "subject_title": "兵团本级",
          "last_login_at": "2021-10-14 10:58:27",
          "tel": "029 8112 9365",
          "version": "V1.0.1"
        }
      }
    }))
  return request({
    url: '/admin/index',
    method: 'GET',
  })
}

/**
  * @description 管理员修改密码
  */
export function SAVE_PWD(query) {

  return request({
    url: '/admin/saveAdminPassword',
    method: 'post',
    data: query
  })
}
