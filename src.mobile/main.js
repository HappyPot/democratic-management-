import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UUID from "vue-uuid";
Vue.use(UUID);
import draggableComponents from "./views/draggableComponents/index"
Vue.use(draggableComponents)

import { deepClone } from "./untils";
Vue.prototype.$deepClone = deepClone
import 'flex.css'
import './vant'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
