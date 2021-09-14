<template>
  <div class="page-login">
    <div class="login_content">
      <div class="login_center">
        <div class="login_left">
          <div class="ll_top">
            <img src="./image/icon.png"
                 alt="" />
            问卷调查民主测评系统
          </div>
          <div class="login_left_bg">
            <img src="./image/sbg.png"
                 alt="" />
          </div>
        </div>
        <div class="login_right">
          <div class="login_title">
            民主测评系统
            <span class="line"></span>
          </div>
          <div class="login_item">
            <span class="errorTip">
              <i class="el-icon-circle-close"></i> {{ errorText }}</span>
            <el-select v-model="formLogin.usinessEntity"
                       class="login_item"
                       placeholder="选中业务主体">
              <el-option v-for="item in usinessEntityOptions"
                         :key="item.id"
                         :label="item.subject_name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="login_item">
            <el-input v-model="formLogin.username"
                      placeholder="请输入登录账号"></el-input>
          </div>
          <div class="login_item">
            <el-input v-model="formLogin.password"
                      show-password
                      placeholder="请输入登录密码"></el-input>
          </div>
          <div class="login_btn_box">
            <el-button type="primary"
                       class="login_btn"
                       @click="submit">登录</el-button>
          </div>
          <div class="login_tips">首次登录或者忘记密码，请扫码登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_SUBJECT_LIST, LOGIN } from '../../../api/login.js'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      errorText: '', //错误提示语
      account: '', //账号
      usinessEntity: '', //业务主体
      usinessEntityOptions: [], //业务主体列表
      // 表单
      formLogin: {
        usinessEntity: 1, //业务主体
        username: 'liuxi',
        password: 'admin123'
      }
    }
  },

  mounted() {
    this.getSubjectList()
    this.$router.push({
      name: 'index'
    })
  },
  methods: {
    ...mapActions('evaluation/account', ['login']),
    // 获取主体
    getSubjectList() {
      GET_SUBJECT_LIST().then(res => {
        if (res.status == 0) {
          this.usinessEntityOptions = res.data
        }
      })
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      let errorText = {
        usinessEntity: '请选择业务主体',
        username: '请输入登录账号',
        password: '请输入登录密码'
      }
      document.getElementsByClassName('errorTip')[0].style.display = 'none'
      for (let key in this.formLogin) {
        if (!this.formLogin[key]) {
          this.errorText = errorText[key]
          document.getElementsByClassName('errorTip')[0].style.display = 'block'
          document.getElementsByClassName('errorTip')[0].style.bottom = '56px'
          return
        }
      }
      let obj = {
        account: this.formLogin.username,
        pwd: this.formLogin.password,
        subject_id: this.formLogin.usinessEntity
      }
      this.login({
        account: this.formLogin.username,
        pwd: this.formLogin.password,
        subject_id: this.formLogin.usinessEntity
      }).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$router.replace(this.$route.query.redirect || '/index')
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
.login_content {
  background: url('./image/bg.png') no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
}
.login_center {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1166px;
  height: 681px;
  .login_left,
  .login_right {
    width: 583px;
    height: 681px;
    box-sizing: border-box;
    border-radius: 0px 10px 10px 0px;
  }
  .login_left {
    border-radius: 10px 0px 0px 10px;
    background: linear-gradient(-46deg, #0253fa, #0064fb, #4c64fe);
    padding-top: 81px;
    padding-left: 49px;
    .ll_top {
      display: flex;
      align-items: center;
      font-size: 29px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 41px;
      color: #ffffff;
      img {
        width: 49px;
        height: 49px;
        margin-right: 9px;
      }
    }
    .login_left_bg {
      margin-top: 28px;
      img {
        width: 440px;
        height: 374px;
      }
    }
  }
  .login_right {
    border-radius: 0px 10px 10px 0px;
    background: #fff;
    padding-top: 88px;
    padding-left: 97px;
    padding-right: 97px;
    .login_title {
      font-size: 29px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 41px;
      color: #000b13;
      position: relative;
      text-align: center;
      margin-bottom: 78px;
      .line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: #d0eaff;
        height: 3px;
        width: 149px;
      }
    }
    .login_item {
      width: 389px;
      height: 49px;
      margin-bottom: 7px;
      position: relative;
    }
    .login_btn {
      width: 389px;
      height: 49px;
    }
    .login_btn_box {
      margin-top: 47px;
    }
    .login_tips {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 21px;
      color: #018bf8;
      text-align: center;
      margin-top: 77px;
    }
  }
}
</style>
