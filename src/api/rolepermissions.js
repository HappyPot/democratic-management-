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
    .onAny('/admin/adminUser/getAdminUserList')
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

  return request({
    url: '/admin/adminUser/getAdminUserList',
    method: 'get',
    params: query
  })
}

/**
  * @description 保存角色
  */
export function SAVE_ADMINUSER(query) {

  // 模拟数据
  mock
    .onAny('/admin/adminUser/getAdminUserList')
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

  return request({
    url: '/admin/adminUser/saveAdminUser',
    method: 'POST',
    data: query
  })
}

/**
  * @description 删除角色
  */
export function DEL_ADMINUSER(query) {

  // 模拟数据
  mock
    .onAny('/admin/adminUser/deleteAdminUser')
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

  return request({
    url: '/admin/adminUser/deleteAdminUser',
    method: 'POST',
    data: query
  })
}

/**
  * @description 获取角色信息
  */
 export function GET_ADMINUSER_INFO(query) {

  // 模拟数据
  mock
    .onAny('/admin/adminUser/getAdminUserInfo')
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

  return request({
    url: '/admin/adminUser/getAdminUserInfo',
    method: 'get',
    params: query
  })
}
