
import request from "../untils/request";
import { find, map, random } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, serviceForMock, requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'


/**
  * @description 获取树状结构的单位列表
  */
 export function GET_UNITTREE_LIST(query) {

  // 模拟数据
  mock
    .onAny('/admin/unit/getUnitTreeList?is_enable=1')
    .reply(config => tools.responseSuccess({
      "status": 0,
      "msg": "OK",
      "data": [
        {
          "id": 1,
          "unit_name": "西安凡数",
          "unit_code": "100",
          "parent_id": "0",
          "subject_id": 1,
          "sort": null,
          "is_enable": 1,
          "created_at": null,
          "updated_at": null,
          "is_child": true,
          "children": [
            {
              "id": 2,
              "unit_name": "凡数分公司",
              "unit_code": "100100",
              "parent_id": "100",
              "subject_id": 1,
              "sort": null,
              "is_enable": 1,
              "created_at": null,
              "updated_at": null,
              "is_child": true,
              "children": [
                {
                  "id": 3,
                  "unit_name": "凡数分公司的子公司",
                  "unit_code": "10010001",
                  "parent_id": "100100",
                  "subject_id": 1,
                  "sort": null,
                  "is_enable": 1,
                  "created_at": "2021-08-28T10:15:24.000000Z",
                  "updated_at": "2021-08-28T10:15:24.000000Z",
                  "is_child": false,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }))

  return request({
    url: '/admin/unit/getUnitTreeList?is_enable=1',
    method: 'get',
  })
}

/**
  * @description 保存单位
  */
 export function SAVE_UNIT(query) {
  return request({
    url: '/admin/unit/saveUnit',
    method: 'post',
    data:query
  })
}

/**
  * @description 删除单位
  */
 export function DEL_UNIT(query) {
  return request({
    url: '/admin/unit/deleteUnit',
    method: 'post',
    data:query
  })
}


/**
  * @description 获取职务列表
  */
 export function GET_DUTY_LIST(query) {

  // 模拟数据
  mock
    .onAny('/admin/duty/getDutyList')
    .reply(config => tools.responseSuccess({
        "status": 0,
        "msg": "OK",
        "data": {
          "data": [
            {
              "id": 1,
              "duty_name": "师领导班子成员",
              "duty_code": "10010002",
              "subject_id": 1,
              "sort": null,
              "is_enable": null
            },
            {
              "id": 2,
              "duty_name": "团场领导班子成员",
              "duty_code": "10010003",
              "subject_id": 1,
              "sort": null,
              "is_enable": null
            }
          ],
          "total": 2,
          "last_page": 1,
          "current_page": 1
        }
    }))
  return request({
    url: '/admin/duty/getDutyList',
    method: 'get',
    params:query
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
/**
  * @description 删除职务
  */
 export function DEL_DUTY(query) {
  return request({
    url: '/admin/duty/deleteDuty',
    method: 'post',
    data:query
  })
}

/**
  * @description 获取部门列表
  */
 export function GET_DEPARTMENT_LIST(query) {

 // 模拟数据
 mock
 .onAny('/admin/department/getDepartmentList')
 .reply(config => tools.responseSuccess({
  "status": 0,
	"msg": "OK",
	"data": {
		"data": [
			{
				"id": 1,
				"department_name": "技术部",
				"code": "1",
				"subject_id": 1,
				"sort": 1,
				"is_enable": 1
			},
			{
				"id": 2,
				"department_name": "财务部",
				"code": "1",
				"subject_id": 1,
				"sort": 1,
				"is_enable": null
			}
		],
		"total": 2,
		"last_page": 1,
		"current_page": 1
	}
 }))

  return request({
    url: '/admin/department/getDepartmentList',
    method: 'get',
    params:query
  })
}

/**
  * @description 保存部门
  */
 export function SAVE_DEPARTMENT(query) {
  return request({
    url: '/admin/department/saveDepartment',
    method: 'post',
    data:query
  })
}
/**
  * @description 删除部门
  */
 export function DEL_DEPARTMENT(query) {
  return request({
    url: '/admin/department/deleteDepartment',
    method: 'post',
    data:query
  })
}

/**
  * @description 获取员工列表
  */
 export function GET_USER_LIST(query) {

// 模拟数据
mock
.onAny('/admin/user/getUserList')
.reply(config => tools.responseSuccess({
    "status": 0,
    "msg": "OK",
    "data": {
      "data": [
        {
          "id": 1,
          "code": "100",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 2,
          "code": "101",
          "is_enable": 1,
          "unit_name": "凡数分公司",
          "duty_name": "团场领导班子成员",
          "department_name": "财务部"
        },
        {
          "id": 3,
          "code": "10010010000001",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 4,
          "code": "10010010000002",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 5,
          "code": "10010010000001",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 6,
          "code": "10010010010000003",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 7,
          "code": "10010010010010000004",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 8,
          "code": "10010010010010010000",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        },
        {
          "id": 9,
          "code": "10010010010010010010",
          "is_enable": 1,
          "unit_name": "西安凡数",
          "duty_name": "师领导班子成员",
          "department_name": "技术部"
        }
      ],
      "total": 9,
      "last_page": 1,
      "current_page": 1
    }
}))

  return request({
    url: '/admin/user/getUserList',
    method: 'get',
    params:query
  })
}

/**
  * @description 保存员工
  */
 export function SAVE_USER(query) {
  return request({
    url: '/admin/user/saveUser',
    method: 'post',
    data:query
  })
}

/**
  * @description 删除员工
  */
 export function DEL_USER(query) {
  return request({
    url: '/admin/user/deleteUser',
    method: 'post',
    data:query
  })
}