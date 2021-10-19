
const state = {
  subjectId: 1,//主体
  userInfo: {},//用户基本信息
  urlParams: {},//路由参数
}

const mutations = {
  SAVE_SUBJECT_ID: (state, id) => {
    localStorage.setItem('evaluationm_id', id);
    state.subjectId = id
  },
  SAVE_USER_INFO: (state, obj) => {
    localStorage.setItem('evaluationm', JSON.stringify(obj));
    state.userInfo = obj
  },
  SAVE_URL_PARAMS: (state, obj) => {
    state.urlParams = obj
  },
}

const actions = {
  saveSubjectId({ commit }, id) {
    commit('SAVE_SUBJECT_ID', id)
  },
  saveUserInfo({ commit }, info) {
    commit('SAVE_USER_INFO', info)
  },
  saveUrlParams({ commit }, info) {
    debugger
    commit('SAVE_URL_PARAMS', info)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
