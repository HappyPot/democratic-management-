<template >
  <div class="AssessmentList">
    <div class="m_title">我的测评</div>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="未提交">
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
        </van-tab>
        <van-tab title="已提交">
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
          <div class="eo_item">
            1.纪委监委机关
            <i>1</i>
          </div>
        </van-tab>
        <van-tab title="" disabled> </van-tab>
        <van-tab title="" disabled> </van-tab>
        <van-tab title="" disabled> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "AssessmentList",
  data() {
    return {
      active: "2",
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.content {
  width: 3.35rem;
  margin: 0 auto;
  /deep/ .van-tabs__line {
    background-color: #1497fe;
  }
  /deep/ .van-tab {
    color: #7984a7;
  }
  /deep/ .van-tab--active {
    color: #1497fe;
  }
  .eo_item {
    font-size: 0.14rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 0.2rem;
    color: #111747;
    opacity: 1;
    padding: 0.2rem 0;
    border-top: 1px solid #f2f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>