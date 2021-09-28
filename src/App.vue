<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  data() {
    return {
      onLine: navigator.onLine
    }
  },
  created() {
    this.i18nHandle(this.$i18n.locale)
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },

  methods: {
    updateOnlineStatus(e) {
      console.log(e.type)
      const { type } = e
      this.onLine = type === 'online'
      if (type != 'online') {
        this.$router.push({
          name: 'offline'
        })
      } else {
        this.$router.push({
          name: 'index'
        })
      }
    },
    i18nHandle(val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
.search_append {
  width: 71px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #409eff;
  box-sizing: border-box;
  color: #409eff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
}
.unit_list_search
  .ul_item
  .inline-input.el-input-group
  .el-input-group__append {
  padding: 0 !important;
  border: none;
}
</style>
