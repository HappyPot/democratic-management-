
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
			"data": {
				"title": "机关部门总体评议情况汇总表",
				"title_c": [
					"定向评议人"
				],
				"list": [
					{
						"department_name": "人大",
						"value": {
							"1": {
								"id": 1,
								"content": "满意",
								"value": 1,
								"num": 6,
								"bl": "100.00"
							},
							"2": {
								"id": 2,
								"content": "较满意",
								"value": 2,
								"num": "0.00",
								"bl": "0.00"
							},
							"3": {
								"id": 3,
								"content": "一般",
								"value": 3,
								"num": "0.00",
								"bl": "0.00"
							},
							"4": {
								"id": 4,
								"content": "不满意",
								"value": 4,
								"num": "0.00",
								"bl": "0.00"
							},
							"5": {
								"id": 5,
								"content": "不了解",
								"value": 5,
								"num": "0.00",
								"bl": "0.00"
							}
						},
						"value_sum": 6
					}
				]
			}
		}))
	// return requestForMock({
	// 	url: '/admin/question/getQuestionObjectDetail',
	// 	method: 'post',
	// 	data: query
	// })
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
			"data": {
				"title": "机关部门总体评议情况汇总表",
				"title_c": [
					"定向评议人"
				],
				"list": [
					{
						"unit_name": "一师",
						"value": {
							"1": {
								"id": 1,
								"content": "满意",
								"value": 1,
								"num": 154,
								"bl": "93.90"
							},
							"2": {
								"id": 2,
								"content": "较满意",
								"value": 2,
								"num": 9,
								"bl": "5.49"
							},
							"3": {
								"id": 3,
								"content": "一般",
								"value": 3,
								"num": "0.00",
								"bl": "0.00"
							},
							"4": {
								"id": 4,
								"content": "不满意",
								"value": 4,
								"num": "0.00",
								"bl": "0.00"
							},
							"5": {
								"id": 5,
								"content": "不了解",
								"value": 5,
								"num": 1,
								"bl": "0.61"
							}
						},
						"value_sum": 164
					}
				]
			}
		}))
	// return requestForMock({
	// 	url: '/admin/question/getQuestionUnitDetail',
	// 	method: 'post',
	// 	data: query
	// })
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
			"data": {
				"title": "机关部门总体评议情况汇总表",
				"title_c": [
					"定向评议人"
				],
				"list": [
					{
						"department_name": "人大",
						"value": {
							"1": {
								"id": 1,
								"content": "满意",
								"value": 1,
								"num": 6,
								"bl": "100.00"
							},
							"2": {
								"id": 2,
								"content": "较满意",
								"value": 2,
								"num": "0.00",
								"bl": "0.00"
							},
							"3": {
								"id": 3,
								"content": "一般",
								"value": 3,
								"num": "0.00",
								"bl": "0.00"
							},
							"4": {
								"id": 4,
								"content": "不满意",
								"value": 4,
								"num": "0.00",
								"bl": "0.00"
							},
							"5": {
								"id": 5,
								"content": "不了解",
								"value": 5,
								"num": "0.00",
								"bl": "0.00"
							}
						},
						"value_sum": 6
					}
				]
			}
		}))
	// return requestForMock({
	// 	url: '/admin/question/getQuestionDepartmentDetail',
	// 	method: 'post',
	// 	data: query
	// })
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
			"data": {
				"title": "机关部门总体评议情况汇总表",
				"title_c": [
					"定向评议人"
				],
				"list": [
					{
						"duty_name": "师领导班子成员",
						"value": {
							"1": {
								"id": 1,
								"content": "满意",
								"value": 1,
								"num": 8,
								"bl": "100.00"
							},
							"2": {
								"id": 2,
								"content": "较满意",
								"value": 2,
								"num": "0.00",
								"bl": "0.00"
							},
							"3": {
								"id": 3,
								"content": "一般",
								"value": 3,
								"num": "0.00",
								"bl": "0.00"
							},
							"4": {
								"id": 4,
								"content": "不满意",
								"value": 4,
								"num": "0.00",
								"bl": "0.00"
							},
							"5": {
								"id": 5,
								"content": "不了解",
								"value": 5,
								"num": "0.00",
								"bl": "0.00"
							}
						},
						"value_sum": 8
					}
				]
			}
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
						"value": [2, 3],
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
						"value": [1, 3],
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

/**
* @description 获取测评主体
*/
export function GET_OBJECT(query) {

	return request({
		url: '/admin/question/getObject',
		method: 'get',
		params: query
	})
}

/**
* @description 导出测评对象数据
*/
export function GET_EXPORT(query) {

	return request({
		url: '/admin/question/getQuestionExport',
		method: 'post',
		data: query,
		responseType: "blob"
	})
}
/**
* @description 导出文本数据
*/
export function GET_EXPORT_TEXT(query) {

	return request({
		url: '/admin/question/getQuestionUserDetailExport',
		method: 'post',
		data: query,
		responseType: "blob"
	})
}

/**
* @description 参评率导出
*/
export function GET_UNIT_BLEXPORT(query) {

	return request({
		url: '/admin/question/getUnitBlExport',
		method: 'get',
		params: query
	})
}

/**
* @description 获取未参与人员列表
*/
export function GET_QUESTIONNOTIN(query) {

	return request({
		url: '/admin/question/getQuestionNotIn',
		method: 'get',
		params: query
	})
}

// 未参与人员导出

/**
* @description 获取未参与人员列表导出
*/
export function GET_QUESTIONNOTIN_EXPORT(query) {

	return request({
		url: '/admin/question/getQuestionNotInExprot',
		method: 'get',
		params: query,
		responseType: "blob"
	})
}

/**
* @description 获取未参与人员列表导出
*/
export function GET_SOCIOLOGY_LIST(query) {

	return request({
		url: '/admin/question/getSociologyList',
		method: 'get',
		params: query,
	})
}


/**
* @description 获取未参与人员列表导出
*/
export function GET_SOCIOLOGY_EXPORT(query) {

	return request({
		url: '/admin/question/getSociologyListExport',
		method: 'get',
		params: query,
		responseType: "blob"
	})
}

/**
* @description 获取单位下未完成测评的人员信息
*/
export function GET_QUESTION_UNIT_NOWCINFO(query) {

	return request({
		url: '/admin/question/getQuestionUnitNoWcInfo',
		method: 'get',
		params: query,
	})
}

/**
* @description 获取单位下未完成测评的人员信导出
*/
export function GET_QUESTION_UNIT_NOWCINFO_EXPORT(query) {

	return request({
		url: '/admin/question/getQuestionUnitNoWcInfoExport',
		method: 'get',
		params: query,
		responseType: "blob"
	})
}
