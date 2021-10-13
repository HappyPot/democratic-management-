import { LOGIN } from '../../../../api/mobile'
import { setToken, removeToken } from "@.mobile/untils/auth"
import { setUserInfom, removeUserInfom } from "@.mobile/untils/userinfo"
import router from '../../../../router/index'

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
    async login({ dispatch }, {
      pwd = '',
      subject_id = "",
      code = "",
    } = {}) {
      const res = await LOGIN({ pwd, subject_id, code })
      setToken(res.data.token)
      // 设置 vuex 用户信息
      setUserInfom(JSON.stringify(res.data))
      dispatch('evaluationm/base/saveUserInfo', res.data, { root: true })
      dispatch('evaluationm/base/saveSubjectId', res.data.subject_id, { root: true })
    },
    /**
   * @description 注销用户并返回登录页面
   * @param {Object} context
   * @param {Object} payload confirm {Boolean} 是否需要确认
   */

    async logout({ dispatch }) {
      // 删除cookie
      removeToken()
      // 清空 vuex 用户信息
      dispatch('evaluationm/base/saveUserInfo', {}, { root: true })
      // 跳转路由
      // router.push({ name: 'login' })
    },

  }
}
