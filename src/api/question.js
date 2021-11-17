
import request from "../untils/request";
import { find, map, random } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, serviceForMock, requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'


/**
* @description 问卷调查单选列表
  @param question_id 
*/
export function GET_CHOICE_SUMMARY(query) {
	// 模拟数据
	mock
		.onAny('/admin/paper/getChoiceSummary')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": {
				"title": "兵直机关干部赴基层锻炼思想状况调查问卷汇总表（共6人）",
				"max_cell": 4,
				"content": [
					{
						"issue": "您的年龄",
						"values": [
							{
								"title": "30岁以下",
								"num": 9,
								"bl": "100.00"
							},
							{
								"title": "30-40岁",
								"num": 0,
								"bl": 0
							},
							{
								"title": "40-45岁",
								"num": 0,
								"bl": 0
							}
						]
					},
					{
						"issue": "子女情况",
						"values": [
							{
								"title": "学龄前",
								"num": 9,
								"bl": "100.00"
							},
							{
								"title": "中小学",
								"num": 0,
								"bl": 0
							},
							{
								"title": "大学或者已工作",
								"num": 0,
								"bl": 0
							},
							{
								"title": "没有孩子",
								"num": 0,
								"bl": 0
							}
						]
					}
				]
			}
		}))
	return request({
		url: '/admin/paper/getChoiceSummary',
		method: 'get',
		params: query,
	})
}

/**
* @description 问卷调查单选列表导出
  @param question_id 
*/
export function GET_CHOICE_SUMMARY_EXPORT(query) {
	return request({
		url: '/admin/paper/getChoiceSummaryExport',
		method: 'get',
		params: query,
		responseType: "blob"
	})
}


/**
* @description 问卷调查文本列表
  @param question_id 
*/
export function GET_PAPER_TEXTLIST(query) {
	// 模拟数据
	mock
		.onAny('/admin/paper/getPaperTextList')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": [
				{
					"id": 75,
					"issue": "您认为机关干部是否有必要赴基层锻炼其他原因："
				},
				{
					"id": 75,
					"issue": "您认为机关干部是否有必要赴基层锻炼其他原因："
				},
				{
					"id": 75,
					"issue": "您认为机关干部是否有必要赴基层锻炼其他原因："
				},
				{
					"id": 75,
					"issue": "您认为机关干部是否有必要赴基层锻炼其他原因："
				}
			]
		}))
	return request({
		url: '/admin/paper/getPaperTextList',
		method: 'get',
		params: query,
	})
}


/**
* @description 问卷调查文本查看明细
  @param question_id,question_issue_id,page_size
*/
export function GET_PAPER_TEXTCONTENT(query) {
	// 模拟数据
	mock
		.onAny('/admin/paper/getPaperTextContentL')
		.reply(config => tools.responseSuccess({
			"status": 0,
			"msg": "OK",
			"data": {
				"current_page": 1,
				"data": [
					{
						"value": "我想去但没去成",
						"created_at": "2021-11-09",
						"user_name": "游客8"
					}
				],
				"first_page_url": "http://cpapi.cn/api/admin/paper/getPaperTextContentL?page=1",
				"from": 1,
				"last_page": 1,
				"last_page_url": "http://cpapi.cn/api/admin/paper/getPaperTextContentL?page=1",
				"links": [
					{
						"url": null,
						"label": "&laquo; Previous",
						"active": false
					}
				],
				"next_page_url": null,
				"path": "http://cpapi.cn/api/admin/paper/getPaperTextContentL",
				"per_page": 100,
				"prev_page_url": null,
				"to": 9,
				"total": 9
			}
		}))
	return request({
		url: '/admin/paper/getPaperTextContentL',
		method: 'get',
		params: query,
	})
}
