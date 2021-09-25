<template >
  <div class="ChangePassword">
    <div class="pwd_item p_1">
      <van-field v-model="password" label="原密码" placeholder="请输入原密码" />
    </div>
    <div class="pwd_item">
      <van-field v-model="password" label="新密码" placeholder="请输入新密码" />
    </div>
    <div class="pwd_item b_1">
      <van-button type="info" block>确认</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      password: "",
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
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
</style>