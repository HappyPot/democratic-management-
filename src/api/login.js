
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

  return requestForMock({
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

/**
  * @description 退出登录
  */
 export function LOGOUT(query) {
  return request({
    url: '/admin/logout?url=dev.wj.com',
    method: 'POST',
    // data:query
  })
}
