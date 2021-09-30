<template >
  <div class="ChangePassword">
    <div class="pwd_item">
      <van-field v-if="!isOpen"
                 v-model="password"
                 label="新密码"
                 type="password"
                 placeholder="请输入新密码">
        <template #button>
          <div class="conPwd"
               @click="toggle">
            <img v-show="isOpen"
                 src="../../assets/image/pwdopen.png"
                 alt="">
            <img v-show="!isOpen"
                 src="../../assets/image/pwdclose.png"
                 alt="">
          </div>
        </template>
      </van-field>
      <van-field v-if="isOpen"
                 v-model="password"
                 type="text"
                 label="新密码"
                 placeholder="请输入新密码">
        <template #button>
          <div class="conPwd"
               @click="toggle">
            <img v-show="isOpen"
                 src="../../assets/image/pwdopen.png"
                 alt="">
            <img v-show="!isOpen"
                 src="../../assets/image/pwdclose.png"
                 alt="">
          </div>
        </template>
      </van-field>
    </div>
    <div class="pwd_item b_1">
      <van-button type="info"
                  @click="updatePwd"
                  block>确认</van-button>
    </div>
  </div>
</template>
<script>
import { SAVE_PASSWORD } from '../../api/mobile'
export default {
  name: 'ChangePassword',
  data() {
    return {
      password: '',
      isOpen: false,
      userInfo: null
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('evaluationm'))
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    // 修改密码
    updatePwd() {
      let obj = {
        pwd: this.password
      }
      SAVE_PASSWORD(obj).then(res => {
        if (res.status == 0) {
          this.$toast.success('修改成功')
          this.$router.push({
            path: 'mobile'
          })
        } else {
          this.$toast.fail('修改失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/index.less';
.ChangePassword {
  padding-top: 0.24rem;
}
.pwd_item {
  width: 3.44rem;
  margin: 0 auto;
}
.p_1 {
  border-bottom: 1px solid #f9fafc;
}
.b_1 {
  margin-top: 0.3rem;
}
.conPwd {
  img {
    width: 0.16rem;
    height: 0.16rem;
  }
}
</style>