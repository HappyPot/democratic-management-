
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
				"id": 1,
				"title": "机关部门担当作为评议",
				"type": 1,
				"form_type": 1,
				"subject_id": 1,
				"desc": null,
				"index_desc": null,
				"start_time": "2021-09-01 16:10:55",
				"end_time": "2021-09-02 16:11:00",
				"is_waiver": null,
				"is_ip": null,
				"ip_value": null,
				"created_at": null,
				"updated_at": null,
				"status_name": "已结束"
			},
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

  return requestForMock({
    url: '/admin/question/getQuestionList',
    method: 'get',
  })
}


/**
  * @description 获取统计结果
  */
 export function GET_COUNT_QUESTION(query) {

	// 模拟数据
	mock
	.onAny('/admin/question/getCountQuestion?page_size=10&question_id=1')
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
							"value": "3",
							"proportion": "20.00"
						},
						{
							"num": 1,
							"value": "4",
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
	
		return requestForMock({
			url: '/admin/question/getCountQuestion?page_size=10&question_id=1',
			method: 'get',
		})
	}


	/**
  * @description 保存测评配置
  */
export function SAVE_QUESTION_CONFIG(query) {
	
		return requestForMock({
			url: '/admin/question/saveQuestionConfig',
			method: 'get',
		})
	}
	