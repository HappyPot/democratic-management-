import request from "../untils/request";
import { find, map, random } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, serviceForMock, requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'


/**
  * @description 获取角色权限列表
  */
 export function GET_ADMINUSER_LIST(query) {

 // 模拟数据
 mock
 .onAny('/admin/adminUser/getAdminUserList?subject_id=1')
 .reply(config => tools.responseSuccess({
	"status": 0,
	"msg": "OK",
	"data": {
		"data": [
			{
				"account": "liuxi",
				"account_type": 2,
				"unit_id": 2,
				"sort": 2,
				"is_enable": 1,
				"unit_name": "凡数分公司"
			}
		],
		"total": 1,
		"last_page": 1,
		"current_page": 1
	}
}))

  return requestForMock({
    url: '/admin/adminUser/getAdminUserList?subject_id=1',
    method: 'get',
  })
}

/**
  * @description 保存角色
  */
 export function SAVE_ADMINUSER(query) {

  // 模拟数据
  mock
  .onAny('/admin/adminUser/getAdminUserList?subject_id=1')
  .reply(config => tools.responseSuccess({
   "status": 0,
   "msg": "OK",
   "data": {
     "data": [
       {
         "account": "liuxi",
         "account_type": 2,
         "unit_id": 2,
         "sort": 2,
         "is_enable": 1,
         "unit_name": "凡数分公司"
       }
     ],
     "total": 1,
     "last_page": 1,
     "current_page": 1
   }
 }))
 
   return requestForMock({
     url: '/admin/adminUser/saveAdminUser',
     method: 'POST',
     data:query
   })
 }