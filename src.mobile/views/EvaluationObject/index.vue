<template >
  <div class="EvaluationObject">
    <div class="m_title">测评对象</div>
    <div class="m_stitle">
      测评对象
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
    <div class="eo_item">
      1.纪委监委机关
      <i>1</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EvaluationObject'
}
</script>
<style lang="less" scoped>
@import '../../assets/style/index.less';
.EvaluationObject {
  padding: 0.2rem;
  box-sizing: border-box;
}
.m_stitle {
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 0.22rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.08rem;
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
</style>