<template >
  <div class="ErrorTip">
    <!-- <div class="m_title">测评对象</div> -->
    <div class="su_content">
      <img src="../../assets/image/errortip.svg" alt="" />
      <div class="tip_text">很遗憾，提交失败！</div>
      <div class="su_btn">
        <van-button type="default" style="margin-right: 0.12rem"
          >返回查看测评</van-button
        >
        <van-button type="info">继续提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ErrorTip",
  data() {
    return {
      question_id: -1,
      form_type: undefined,
    };
  },
  created() {
    this.question_id = this.$route.query.question_id;
    this.form_type = this.$route.query.form_type - 0;
  },
  methods: {
    toback() {
      this.$router.push({
        path: "evaluationobject",
        query: {
          showSelect: 1,
          question_id: this.question_id,
          form_type: this.form_type,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.ErrorTip {
  position: relative;
  height: 100vh;
  width: 100%;
  .su_content {
    position: absolute;
    width: 3rem;
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