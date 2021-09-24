<template>
  <div class="mhome_page">
    <div class="m_title">登陆</div>
    <div class="profile">
      <img src="../assets/image/userimg.jpeg"
           alt="" />
    </div>
    <div class="tips">我的账号</div>
    <div class="filed">
      <div class="input_item">
        <van-field size="small"
                   v-model="value"
                   placeholder="请输入账号" />
      </div>
      <div class="input_item">
        <van-field size="small"
                   v-model="password"
                   type="password"
                   placeholder="请输入密码" />
      </div>
      <div class="input_item"
           style="margin-top: 0.5rem">
        <van-button type="info"
                    @click="login"
                    block>确认</van-button>
      </div>
      <div class="fpwd">忘记密码？</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      acount: '', //账号
      password: '' //密码
    }
  },
  methods: {
    login() {
      this.$router.push({
        name: 'MyAssessment'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style/index.less';
.profile {
  text-align: center;
  img {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
  }
}
.tips {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #010609;
  text-align: center;
  margin-bottom: 0.24rem;
}


.fpwd {
  font-size: 0.12rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.17rem;
  color: #1497fe;
  opacity: 1;
  width: 3.11rem;
  margin: 0 auto;
}
// .input_item /deep/ .van-button--info {
//   background-color: #1497fe;
//   border: 1px solid #1497fe;
// }
// .input_item /deep/ .van-field {
//   padding: 7px 16px;
// }
</style>
