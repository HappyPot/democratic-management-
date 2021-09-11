
const state = {
  subjectId:1,//主体
  unitList:['初始化']//单位列表
}

const mutations = {
  SAVE_SUBJECT_ID: (state,id) => {
    state.subjectId = id
  },
  SAVE_UNIT_LIST: (state,list) => {
    state.unitList = list
  },
}

const actions = {
  saveSubjectId({ commit },id) {
    commit('SAVE_SUBJECT_ID',id)
  },
  saveUnitList({ commit },list) {
    commit('SAVE_UNIT_LIST',list)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
