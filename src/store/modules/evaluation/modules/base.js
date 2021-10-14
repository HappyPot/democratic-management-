
const state = {
  subjectId: 1,//主体
  unitList: [],//单位列表
  jobList: [],//单位列表
  departmentList: [],//单位列表
  userInfo: {},//用户基本信息
}

const mutations = {
  SAVE_SUBJECT_ID: (state, id) => {
    localStorage.setItem('evaluation_id', id);
    state.subjectId = id
  },
  SAVE_UNIT_LIST: (state, list) => {
    state.unitList = list
  },
  SAVE_JOB_LIST: (state, list) => {
    state.jobList = list
  },
  SAVE_DEPARTMENT_LIST: (state, list) => {
    state.departmentList = list
  },
  SAVE_USER_INFO: (state, obj) => {
    localStorage.setItem('evaluation', JSON.stringify(obj));
    state.userInfo = obj
  },
}

const actions = {
  saveSubjectId({ commit }, id) {
    commit('SAVE_SUBJECT_ID', id)
  },
  saveUnitList({ commit }, list) {
    commit('SAVE_UNIT_LIST', list)
  },
  saveJobList({ commit }, list) {
    commit('SAVE_JOB_LIST', list)
  },
  saveDepartmentList({ commit }, list) {
    commit('SAVE_DEPARTMENT_LIST', list)
  },
  saveUserInfo({ commit }, info) {
    commit('SAVE_USER_INFO', info)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
