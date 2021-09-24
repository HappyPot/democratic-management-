<template >
  <div class="MyAssessment">
    <div class="m_title">我的测评</div>
    <div class="m_title_item">
      兵直机关部门作风建设网上评议
    </div>
    <div class="m_content">
      <div class="sTitle">指导语</div>
      <div class="m_content_box">
        欢迎您参加兵直机关部门作风建设网上评议，请您认真阅读说明，并根据提示进行评议。
        1.列入被评议范围的兵团机关部门部门共6个，请您逐一做出评价。总体评价，可在"意"、"基本满意"、"不满意"、"不了解"四种选项中，选其中一种；具体评价，从七个方面，在意"、"基本满意"、"不满意"、"不了解"四种选项中，选其中一种，并可点击"意见建议"进行填写，有其他意见建议也可具体填写。
        2.点击"暂存"临时保存评议数据,您以后可以多次登录系统继续录入评议数据。点击"提交"完成评议，根据评议规则，提交后不能再修改，请您务必确认无误后再行提交。
        3.如果您认为必要，可以留下姓名和联系方式以
        便相关部门进一步了解情况，反馈整改结果。
      </div>
      <div class="user"></div>
    </div>
    <div class="input_item">
      <van-button plain
                  type="info"
                  block>开始测评</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyAssessment'
}
</script>
<style lang="less" scoped>
@import '../../assets/style/index.less';
.m_title_item {
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 0.22rem;
  color: #111747;
  opacity: 1;
  padding-bottom: 0.08rem;
  padding-left: 0.2rem;
}
.m_content {
  border-top: 1px solid #f2f5f9;
  padding: 0.2rem;
  position: relative;
}
.m_content_box {
  border: 1px dashed #eaebee;
  padding: 0.2rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.3rem;
  color: #111747;
  opacity: 1;
}
.sTitle {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #7984a7;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.user {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  bottom: 0.15rem;
  right: 0.32rem;
  border-radius: 100%;
  background: blue;
}
</style>