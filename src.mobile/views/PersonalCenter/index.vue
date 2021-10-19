<template >
  <div class="PersonalCenter">
    <div class="m_title">个人中心</div>
    <div class="pc_content">
      <div class="pc_item" @click="togoMyTest(1)">
        <img src="../../assets/image/我的测评.svg" alt="" />
        <div>我的测评</div>
      </div>
      <div class="pc_item" @click="togoMyTest(2)">
        <img src="../../assets/image/我的问卷.svg" alt="" />
        <div>我的问卷</div>
      </div>
    </div>
    <div class="pc_acount">
      <div class="pca_item">
        <span>登录账号</span>
        <span>{{ userInfo.code }}</span>
      </div>
      <div class="pca_item" @click="updatePwd">
        <span>修改密码</span>
        <span><img src="../../assets/image/下一级.svg" alt="" /></span>
      </div>
      <div class="pca_item" @click="logout">
        <span>退出登录</span>
        <span><img src="../../assets/image/下一级.svg" alt="" /></span>
      </div>
    </div>
  </div>
</template>
<script>
import { LOGOUT } from "../../api/mobile";

export default {
  name: "PersonalCenter",
  data() {
    return {
      userInfo: null,
      showSelect: -1,
      question_id: -1,
    };
  },
  
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("evaluationm"));
  },
  methods: {
    // 退出登陆
    logout() {
      LOGOUT().then((res) => {
        this.$router.push({
          path: "/",
        });
      });
    },
    // 我的测评
    togoMyTest(type) {
      this.showSelect = this.$route.query.showSelect - 0;
      this.question_id = this.$route.query.question_id;
      this.$router.push({
        path: "/assessmentList",
        query: {
          type: type,
          question_id: this.question_id,
          showSelect: this.showSelect,
        },
      });
    },
    updatePwd() {
      this.$router.push({
        path: "/changepassword",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.PersonalCenter {
  background: #f9fafc;
  padding: 0.15rem;
  box-sizing: border-box;
}
.pc_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pc_item {
    width: 1.68rem;
    height: 1.32rem;
    background: #fff;
    border-radius: 0.08rem;
    text-align: center;
    font-size: 0;
    padding: 0.19rem;
    box-sizing: border-box;
    img {
      width: 0.64rem;
      height: 0.64rem;
      display: inline-block;
      margin-bottom: 0.14rem;
    }
    div {
      font-size: 0.14rem;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 0.2rem;
      color: #111747;
      opacity: 1;
    }
  }
}
.pc_acount {
  width: 3.45rem;
  margin: 0 auto;
  padding: 0 0.15rem;
  background: #fff;
  box-sizing: border-box;
  margin-top: 0.12rem;
}
.pca_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.14rem;
  height: 0.6rem;
  span:nth-of-type(2) {
    color: #7984a7;
  }
}
.pca_item:nth-of-type(1) {
  border-bottom: 1px solid #f2f5f9;
}
</style>