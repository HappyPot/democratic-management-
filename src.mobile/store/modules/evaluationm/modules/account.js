import { LOGIN } from '../../../../api/mobile'
// import { setToken, removeToken } from "@.mobile/untils/auth"
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
      account = '',
      pwd = '',
      subject_id = ""
    } = {}) {
      debugger
      const res = await LOGIN({ account, pwd, subject_id })
      setToken(res.data.adminToken)
      // 设置 vuex 用户信息
      // dispatch('evaluationm/base/saveUserInfo', res.data, { root: true })
      // dispatch('evaluationm/base/saveSubjectId', res.data.subject_id, { root: true })
    },
  }
}
