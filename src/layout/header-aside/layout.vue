<template>
  <div class="d2-layout-header-aside-group"
       :style="styleLayoutMainGroup"
       :class="{ grayMode: grayActive }">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content"
         flex="dir:top">
      <!-- 顶栏 -->
      <div class="d2-theme-header"
           :style="{ opacity: this.searchActive ? 0.5 : 1 }"
           flex-box="0"
           flex>
        <router-link to="/index"
                     style="
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
          "
                     :class="{ 'logo-group': true, 'logo-transition': asideTransition }"
                     :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth }"
                     flex-box="0">
          <!-- <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`"> -->
          <img style="width: 16px; height: 16px; margin-right: 5px"
               src="../../assets/image/logo.png" />
          <span class="logo_title">民主评测管理</span>
        </router-link>
        <!-- <div class="toggle-aside-btn"
             @click="handleToggleAside"
             flex-box="0">
          <d2-icon name="bars" />
        </div> -->
        <d2-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="d2-header-right"
             flex-box="0">
          <div class="contactUs">
            <img src="../../assets/image/contactUs.png"
                 alt="" />
            联系我们
          </div>
          <div class="userInfo">
            <img src="../../assets/image/userinfo.jpeg"
                 alt="" />
            <span>{{userInfo.account}}</span>
            <i class="el-icon-arrow-down"
               @click="extend"></i>
            <div :class="showActive ? 'extend_menu active_extend' : 'extend_menu'">
              <span class="triangle-up"></span>
              <div class="extend_item"
                   style="margin-bottom: 20px">
                修改密码
              </div>
              <div class="extend_item"
                   @click="logOut">退出登录</div>
            </div>
          </div>
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <!-- <d2-header-search @click="handleSearchClick" />
          <d2-header-log />
          <d2-header-fullscreen />
          <d2-header-theme />
          <d2-header-size />
          <d2-header-locales />
          <d2-header-color />
          <d2-header-user /> -->
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container"
           flex-box="1"
           flex>
        <!-- 主体 侧边栏 -->
        <div flex-box="0"
             ref="aside"
             :class="{
            'd2-theme-container-aside': true,
            'd2-theme-container-transition': asideTransition,
          }"
             id="my_menu"
             :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1,
          }">
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main"
             style="background: #f4f5f8"
             flex-box="1"
             flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive"
                 class="d2-theme-container-main-layer"
                 style="top: 23px; left: 22px"
                 flex>
              <d2-panel-search ref="panelSearch"
                               @close="searchPanelClose" />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive"
                 class="d2-theme-container-main-layer"
                 flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header"
                   flex-box="0">
                <d2-tabs />
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body"
                   flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
          <div class="copyright">
            @西安凡数创新信息技术有限公司 版权所有 | 陕ICP879990号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderLocales from './components/header-locales'
import d2HeaderSearch from './components/header-search'
import d2HeaderSize from './components/header-size'
import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
import d2HeaderLog from './components/header-log'
import d2HeaderColor from './components/header-color'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
import { LOGOUT } from '@/api/login'

import {
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST
} from '@/api/personnelmanagement.js'
export default {
  name: 'd2-layout-header-aside',
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog,
    d2HeaderColor
  },
  data() {
    return {
      showActive: false, //控制头像处的菜单展示
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      userInfo: {} //用户信息
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      asideTransition: state => state.menu.asideTransition
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey() {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
          }
        : {}
    }
  },
  created() {
    // this.getUnitLIst()
    // this.getDutyList()
    // this.getDepartmentList()
    this.userInfo = JSON.parse(localStorage.getItem('evaluation'))
  },
  methods: {
    ...mapActions('evaluation/account', ['logout']),
    //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST().then(res => {
        if (res.status === 0) {
          // 存储主体信息
          console.log('获取单位列表', res.data)
          this.$store.dispatch('evaluation/base/saveUnitList', res.data)
        }
      })
    },
    // 获取职务列表
    getDutyList() {
      GET_DUTY_LIST({
        subject_id: 1
      }).then(res => {
        if (res.status === 0) {
          console.log('获取职务列表', res.data.data)
          this.$store.dispatch('evaluation/base/saveJobList', res.data)
        }
      })
    },
    // 获取部门列表
    getDepartmentList() {
      GET_DEPARTMENT_LIST().then(res => {
        if (res.status === 0) {
          console.log('获取部门列表', res.data.data)
          this.$store.dispatch('evaluation/base/saveDepartmentList', res.data)
        }
      })
    },
    // 退出登录
    logOut() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    // 展开
    extend() {
      this.showActive = !this.showActive
    },
    ...mapActions('d2admin/menu', ['asideCollapseToggle']),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.copyright {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #9aa0a8;
}
.logo_title {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 22px;
  color: #1a264b;
}
.theme-d2 .d2-theme-container .d2-theme-container-aside .el-menu .el-menu-item {
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-d2
  .d2-theme-container
  .d2-theme-container-aside
  .el-menu
  .el-menu-item.is-active {
  background: #1497fe;
  color: #fff;
}
.theme-d2
  .d2-theme-container
  .d2-theme-container-aside
  .el-menu
  .el-menu-item.is-active
  i {
  color: #fff;
}
.theme-d2 .d2-theme-container .d2-theme-container-aside .el-scrollbar__wrap {
  margin-right: 0 !important;
}
.theme-d2
  .d2-theme-container
  .d2-theme-container-aside
  .el-menu
  .el-menu-item:hover {
  color: #1a264b !important;
  background: #e7f4ff;
}
.theme-d2
  .d2-theme-container
  .d2-theme-container-aside
  .el-menu
  .el-menu-item:hover
  i {
  color: #1a264b !important;
}
.contactUs {
  font-size: 14px;
  margin-right: 32px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #1a264b;
  opacity: 1;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
}
.userInfo {
  font-size: 14px;
  margin-right: 40px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #1a264b;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 30px;
    height: 30px;
    border: 1px solid #f4f5f8;
    border-radius: 20px;
    margin-right: 8px;
  }
  span {
    margin-right: 8px;
  }
  .extend_menu {
    position: absolute;
    top: -310px;
    left: 5px;
    z-index: 9999;
    width: 120px;
    height: 110px;
    background: #ffffff;
    border: 1px solid #eaecef;
    box-shadow: 0px 3px 6px rgba(122, 130, 155, 0.1);
    opacity: 0;
    padding: 24px 20px;
    box-sizing: border-box;
    .triangle-up {
      position: absolute;
      top: -10px;
      right: 11px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
    }
    .extend_item {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: #000b13;
      cursor: pointer;
    }
  }
}
.active_extend {
  opacity: 1 !important;
  top: 38px !important;
  left: 5px !important;
}
// @@@
</style>
