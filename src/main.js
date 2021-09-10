// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'
import draggableComponents from "@/views/Sharing/draggableComponents/index.js";
import './assets/icon/iconfont.css';
import '@/views/common/index.scss'
import MixinValidate from '@/views/mixin/validate.js';
Vue.mixin(MixinValidate);
// import VueI18n from 'vue-i18n';
// import VeeValidate from 'vee-validate';
// import zh_CN from 'vee-validate/dist/locale/zh_CN'

// //启用Vue国际化插件
// Vue.use(VueI18n)

// //配置VeeValidate
// const i18n1 = new VueI18n({
//     locale: 'zh_CN',
// })

// Vue.use(VeeValidate, {
//     i18n1,
//     i18nRootKey: 'validation',
//     dictionary: {
//         zh_CN
//     }
// });


Vue.use(draggableComponents)

import wlTreeSelect from './components/wl-tree-select/index'
Vue.use(wlTreeSelect)


import { deepClone } from "./untils";
Vue.prototype.$deepClone = deepClone
// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')
