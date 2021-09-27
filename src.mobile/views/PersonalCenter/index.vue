<template >
  <div class="PersonalCenter">
    <div class="m_title">个人中心</div>
    <div class="pc_content">
      <div class="pc_item">
        <img src="../../assets/image/我的测评.svg" alt="" />
        <div>我的测评</div>
      </div>
      <div class="pc_item">
        <img src="../../assets/image/我的问卷.svg" alt="" />
        <div>我的问卷</div>
      </div>
    </div>
    <div class="pc_acount">
      <div class="pca_item">
        <span>登录账号</span>
        <span>13255667788</span>
      </div>
      <div class="pca_item">
        <span>修改密码</span>
        <span>></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalCenter",
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