
import request from "../untils/request";
import { find, map, random } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, serviceForMock, requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'

/**
  * @description 获取测评列表
  */
export function GET_QUESTION_LIST(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionList')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": {
				"data": [
					{
						"id": 2,
						"title": "自定义测评",
						"type": 1,
						"form_type": 1,
						"subject_id": 1,
						"desc": null,
						"index_desc": null,
						"start_time": "2021-09-02 16:11:23",
						"end_time": "2021-09-03 16:11:29",
						"is_waiver": null,
						"is_ip": null,
						"ip_value": null,
						"created_at": null,
						"updated_at": null,
						"status_name": "已结束"
					},
					{
						"id": 3,
						"title": "测评主题",
						"type": 1,
						"form_type": 1,
						"subject_id": 1,
						"desc": null,
						"index_desc": null,
						"start_time": "2021-09-08 00:00:00",
						"end_time": "2021-09-10 00:00:00",
						"is_waiver": 1,
						"is_ip": 1,
						"ip_value": null,
						"created_at": "2021-09-06T07:53:50.000000Z",
						"updated_at": "2021-09-06T07:53:50.000000Z",
						"status_name": "未开始"
					},
					{
						"id": 10,
						"title": "测评主题",
						"type": 1,
						"form_type": 1,
						"subject_id": 1,
						"desc": null,
						"index_desc": null,
						"start_time": "2021-09-08 00:00:00",
						"end_time": "2021-09-10 00:00:00",
						"is_waiver": 1,
						"is_ip": 1,
						"ip_value": null,
						"created_at": "2021-09-06T08:46:21.000000Z",
						"updated_at": "2021-09-06T08:46:21.000000Z",
						"status_name": "未开始"
					}
				],
				"total": 4,
				"last_page": 1,
				"current_page": 1
			}
		}))

	return request({
		url: '/admin/question/getQuestionList',
		method: 'get',
		params: query
	})
}


/**
  * @description 获取统计结果
  */
export function GET_COUNT_QUESTION(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getCountQuestion')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": [
				{
					"id": 1,
					"question_id": 1,
					"alias": null,
					"issue": "您对该部门作风建设情况总体评价是：",
					"type": 1,
					"sort": 1,
					"config": [
						{
							"value": "1",
							"content": "满意"
						},
						{
							"value": "2",
							"content": "不满意"
						},
						{
							"value": "3",
							"content": "一般"
						}
					],
					"count": [
						[
							{
								"num": 5,
								"value": "1",
								"proportion": "83.33"
							},
							{
								"num": 1,
								"value": "3",
								"proportion": "16.67"
							}
						]
					]
				},
				{
					"id": 2,
					"question_id": 1,
					"alias": null,
					"issue": "具体表现",
					"type": 4,
					"sort": 2,
					"config": null,
					"text_count": 2
				},
				{
					"id": 3,
					"question_id": 1,
					"alias": null,
					"issue": "提示文字",
					"type": 2,
					"sort": 3,
					"config": null
				},
				{
					"id": 4,
					"question_id": 1,
					"alias": null,
					"issue": "多选框",
					"type": 3,
					"sort": 4,
					"config": [
						{
							"value": "1",
							"content": "满意"
						},
						{
							"value": "2",
							"content": "不满意"
						},
						{
							"value": "3",
							"content": "一般"
						}
					],
					"count": [
						[
							{
								"num": 3,
								"value": "1",
								"proportion": "60.00"
							},
							{
								"num": 1,
								"value": "2",
								"proportion": "20.00"
							},
							{
								"num": 1,
								"value": "3",
								"proportion": "20.00"
							}
						]
					]
				},
				{
					"id": 5,
					"question_id": 1,
					"alias": null,
					"issue": "多行文本",
					"type": 5,
					"sort": 5,
					"config": null,
					"text_count": 0
				}
			]
		}))

	return request({
		url: '/admin/question/getCountQuestion',
		method: 'get',
		params: query
	})
}

/**
* @description 测评对象汇总
*/
export function GET_QUESTION_OBJECT_DETAIL(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionObjectDetail')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": [
				{
					"id": 1,
					"question_id": 1,
					"title": "纪检委机关",
					"sort": 1,
					"sum": 3,
					"value": [
						{
							"num": 2,
							"value": "1",
							// "question_top_id": '满意',
							"question_name": '满意',
							"question_id": '1',
							"ratio": "66.67"
						},
						{
							"num": 1,
							"value": "3",
							// "question_top_id": '比较满意','
							"question_name": '比较满意',
							"question_id": '2',
							"ratio": "33.33"
						},
						{
							"num": 1,
							"value": "4",
							// "question_top_id": '比较满意','
							"question_name": '一般',
							"question_id": '3',
							"ratio": "444.44"
						}
					]
				},
				{
					"id": 2,
					"question_id": 1,
					"title": "办公厅",
					"sort": 1,
					"sum": 2,
					"value": [
						{
							"num": 2,
							"value": "1",
							// "question_top_id": '满意',
							"question_name": '满意',
							"question_id": '1',
							"ratio": "123"
						},
						{
							"num": 1,
							"value": "3",
							// "question_top_id": '比较满意','
							"question_name": '比较满意',
							"question_id": '2',
							"ratio": "321"
						},
						{
							"num": 1,
							"value": "4",
							// "question_top_id": '比较满意','
							"question_name": '一般',
							"question_id": '3',
							"ratio": "345"
						}
					]
				},
			]
		}))
	return request({
		url: '/admin/question/getQuestionObjectDetail',
		method: 'post',
		data: query
	})
}

/**
* @description 单位汇总
*/
export function GET_QUESTION_UNIT_DETAIL(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionUnitDetail')
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
					"sum": 3,
					"value": [
						{
							"num": 2,
							"value": "1",
							"unit_id": 1,
							"unit_name": '满意',
							"ratio": "66.67"
						},
						{
							"num": 1,
							"value": "3",
							"unit_id": 1,
							"unit_name": '比较满意',
							"ratio": "33.33"
						}
					]
				},
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
					"sum": 2,
					"value": [
						{
							"num": 2,
							"value": "1",
							"unit_id": 1,
							"unit_name": '满意',
							"ratio": "5555"
						},
						{
							"num": 1,
							"value": "3",
							"unit_id": 1,
							"unit_name": '比较满意',
							"ratio": "8888"
						}
					]
				},
			]
		}))
	return request({
		url: '/admin/question/getQuestionUnitDetail',
		method: 'post',
		data: query
	})
}


/**
* @description 部门汇总
*/
export function GET_QUESTION_DEPARTMENT_DETAIL(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionDepartmentDetail')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": [
				{
					"id": 1,
					"department_name": "技术部",
					"department_code": "1",
					"subject_id": 1,
					"sort": 1,
					"is_enable": 1,
					"created_at": null,
					"updated_at": null,
					"sum": 3,
					"value": [
						{
							"num": 2,
							"value": "1",
							"department_id": 1,
							"department_name": "满意",
							"ratio": "6666"
						},
						{
							"num": 1,
							"value": "3",
							"department_id": 1,
							"department_name": "比较满意",
							"ratio": "0000"
						}
					]
				},
				{
					"id": 2,
					"department_name": "财务部",
					"department_code": "1",
					"subject_id": 1,
					"sort": 1,
					"is_enable": null,
					"created_at": null,
					"updated_at": null,
					"sum": 2,
					"value": [
						{
							"num": 2,
							"value": "1",
							"department_id": 1,
							"department_name": "满意",
							"ratio": "6666"
						},
						{
							"num": 1,
							"value": "3",
							"department_id": 1,
							"department_name": "比较满意",
							"ratio": "0000"
						}
					]
				},
			]
		}))
	return request({
		url: '/admin/question/getQuestionDepartmentDetail',
		method: 'post',
		data: query
	})
}

/**
* @description 人员类别汇总
*/
export function GET_QUESTION_DUTY_DETAIL(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionDutyDetail')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": [
				{
					"id": 1,
					"duty_name": "师领导班子成员",
					"duty_code": "10010002",
					"subject_id": 1,
					"sort": null,
					"is_enable": null,
					"sum": 3,
					"value": [
						{
							"num": 2,
							"value": "1",
							"duty_id": 1,
							"duty_name": "满意",
							"ratio": "66.67"
						},
						{
							"num": 1,
							"value": "3",
							"duty_id": 1,
							"duty_name": "比较满意",
							"ratio": "33.33"
						}
					]
				},
			]
		}))
	return request({
		url: '/admin/question/getQuestionDutyDetail',
		method: 'post',
		data: query
	})
}

/**
* @description 保存测评配置
*/
export function SAVE_QUESTION_CONFIG(query) {

	return request({
		url: '/admin/question/saveQuestionConfig',
		method: 'post',
		data: query
	})
}

/**
* @description 测评明细
*/
export function GET_QUESTION_DETAIL(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/getQuestionUserDetail')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": {
				"data": [
					// {
					// 	"question_top_id": 3,
					// 	"question_issue_id": 7,
					// 	"user_id": 2,
					// 	"value": [1,2],
					// 	"created_at": null,
					// 	"code": "10102930100002",
					// 	"department_id": 293,
					// 	"unit_id": 2,
					// 	"duty_id": 1,
					// 	"subject_title": "一师",
					// 	"duty_name": "师领导班子成员",
					// 	"unit_name": "一师",
					// 	"department_name": "一师领导班子"
					// },
					{
						"question_top_id": 3,
						"question_issue_id": 7,
						"user_id": 2,
						"value": [2,3],
						"created_at": null,
						"code": "10102930100002",
						"department_id": 293,
						"unit_id": 2,
						"duty_id": 1,
						"subject_title": "一师",
						"duty_name": "师领导班子成员",
						"unit_name": "一师",
						"department_name": "一师领导班子"
					}, {
						"question_top_id": 3,
						"question_issue_id": 7,
						"user_id": 2,
						"value": [1,3],
						"created_at": null,
						"code": "10102930100002",
						"department_id": 293,
						"unit_id": 2,
						"duty_id": 1,
						"subject_title": "一师",
						"duty_name": "师领导班子成员",
						"unit_name": "一师",
						"department_name": "一师领导班子"
					}
				],
				"total": 3,
				"last_page": 1,
				"current_page": 1,
				"config": {
					"id": 7,
					"question_id": 1,
					"alias": null,
					"issue": "多选测试1",
					"type": 3,
					"sort": 6,
					"config": [
						{
							"id": 1,
							"content": "a",
							"value": 1
						},
						{
							"id": 1,
							"content": "b",
							"value": 2
						},
						{
							"id": 1,
							"content": "c",
							"value": 3
						}
					]
				}
			}
		}))

	return request({
		url: '/admin/question/getQuestionUserDetail',
		method: 'post',
		data: query
	})
}

/**
* @description 测评配置结果
*/
export function BACK_QUESTION_CONFIG(query) {

	// 模拟数据
	mock
		.onAny('/admin/question/backQuestionConfig')
		.reply(config => tools.responseSuccess(
			{
				"status": 0,
				"msg": "OK", //返回文字描述
				"data": [
					{
						"id": 1, //配置项id
						"question_id": 1, //问题id
						"alias": null, //别名
						"issue": "单选1", //问题
						"type": 1, //问题类型
						"sort": 0, //问题排序
						"config": [
							{
								"id": 1, //配置项id
								"content": "1",
								"value": 1
							}
						] //问题答案配置项
					}
				] //返回数据
			}
		))

	// return requestForMock({
	// 	url: '/admin/question/backQuestionConfig',
	// 	method: 'get',
	// 	// params: query
	// })
	return request({
		url: '/admin/question/backQuestionConfig',
		method: 'get',
		params: query
	})
}
