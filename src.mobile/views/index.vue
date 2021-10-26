<template>
  <div class="mhome_page">
    <div class="m_title">登陆</div>
    <div class="profile">
      <img src="../assets/image/userimg.svg" alt="" />
    </div>
    <div class="tips">我的账号</div>
    <div class="filed">
      <div class="input_item">
        <van-field size="small" v-model="account" placeholder="请输入账号" />
      </div>
      <div class="input_item">
        <van-field
          size="small"
          v-model="password"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="myinput" style="margin-top: 0.5rem">
        <div class="mybtn" @click="submit">登录</div>
      </div>
      <div class="fpwd">忘记密码？</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      account: "", // 账号
      password: "", // 密码
    };
  },
  methods: {
    ...mapActions("evaluationm/account", ["login"]),
    submit() {
      if (!this.account) {
        this.$notify({ type: "danger", message: "请输入账号" });
        return;
      } else if (!this.password) {
        this.$notify({ type: "danger", message: "请输入密码" });
        return;
      }
      const href = this.$route.query.redirect;
      const params = {
        code: this.account,
        pwd: this.password,
        subject_id: 1,
      };
      if (Object.keys(this.$route.query).length > 0) {
        const fieldList = href.split("&")[1].split("=");
        params.question_id = fieldList[1];
      }
      console.log(1111, params);
      this.login(params).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$router.replace(this.$route.query.redirect || "/myassessment");
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/style/index.less";
.mhome_page {
  background: url("../assets/image/bgm.svg") no-repeat;
  // background-size: cover;
  height: 100vh;
  background-size: cover;
}
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
.mybtn {
  width: 3.11rem;
  height: 0.44rem;
  background: url("../assets/image/login.svg") no-repeat;
  background-size: 3.11rem 0.44rem;
  color: #fff;
  text-align: center;
  font-size: 0.16rem;
  line-height: 0.44rem;
}
.myinput {
  background: #ffffff;
  border-radius: 4px;
  width: 3.11rem;
  margin: 0 auto;
  margin-bottom: 0.16rem;
}
</style>
