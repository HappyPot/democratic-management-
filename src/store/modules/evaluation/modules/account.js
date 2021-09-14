import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import { LOGIN } from '@/api/login.js'
import {setToken,removeToken} from "@/untils/auth"
export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login ({ dispatch }, {
      account = '',
      pwd = '',
      subject_id=""
    } = {}) {
      const res = await LOGIN({ account, pwd,subject_id })
      setToken(res.data.adminToken)
      // // 设置 vuex 用户信息
       dispatch('evaluation/base/saveUserInfo', res.data,{ root: true })
       dispatch('evaluation/base/saveSubjectId', res.data.subject_id,{ root: true })

      // await dispatch('d2admin/user/set', { name: res.name }, { root: true })
      // // 用户登录后从持久化数据加载一系列的设置
      // await dispatch('load')
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
     
      async logout ({ dispatch }) {
        // 删除cookie
        removeToken()
        // 清空 vuex 用户信息
        dispatch('evaluation/base/saveUserInfo', {},{ root: true })
        // 跳转路由
        router.push({ name: 'login' })
      },
     
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    async load ({ dispatch }) {
      // 加载用户名
      await dispatch('d2admin/user/load', null, { root: true })
    }
  }
}
