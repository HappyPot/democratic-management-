import Vue from 'vue'
import Vuex from 'vuex'

import evaluationm from './modules/evaluationm'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    evaluationm
  }
})
