<template >
  <div class="SuccessTip">
    <!-- <div class="m_title">测评对象</div> -->
    <div class="su_content">
      <img src="../../assets/image/successtip.png" alt="" />
      <div class="tip_text">恭喜您，提交成功！</div>
      <div class="su_btn">
        <van-button type="default" style="margin-right: 0.12rem"
          >返回查看测评</van-button
        >
        <van-button type="info">完成</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuccessTip",
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.SuccessTip {
  position: relative;
  height: 100vh;
  width: 100%;
  .su_content {
    position: absolute;
    top: 2.37rem;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 0.44rem;
      height: 0.44rem;
      margin-bottom: 0.17rem;
    }
    .tip_text {
      font-size: 0.14rem;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 0.2rem;
      color: #111747;
      opacity: 1;
    }
    .su_btn {
      display: flex;
      margin-top: 0.32rem;
    }
  }
}
</style>