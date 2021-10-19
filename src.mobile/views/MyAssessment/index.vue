<template >
  <div class="MyAssessment">
    <div v-if="issueObj">
      <div class="m_title">我的测评</div>
      <div class="m_title_item">{{ issueObj.title }}</div>
      <div class="m_content">
        <div class="sTitle">指导语</div>
        <div class="m_content_box">
          {{ issueObj.index_desc }}
        </div>
        <div class="user" @click="updatePwd">
          <img src="../../assets/image/个人中心.svg" alt="" />
        </div>
      </div>
      <div class="input_item">
        <van-button plain type="info" block @click="start">开始测评</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_QUESTION_INFO } from "../../api/mobile";

export default {
  name: "MyAssessment",
  data() {
    return {
      issueObj: null,
      showSelect: -1,
      question_id: -1,
      form_type: 1, //1为定向评仪 2为社会评仪
    };
  },
  created() {
    this.showSelect = this.$route.query.showSelect - 0;
    this.question_id = this.$route.query.question_id;
    this.form_type = this.$route.query.form_type
    GET_QUESTION_INFO({
      id: this.question_id,
      form_type:this.form_type
    }).then((res) => {
      if (res.status == 0) {
        this.issueObj = res.data;
      }
    });
  },
  methods: {
    start() {
      this.$router.push({
        path: "evaluationobject",
        query: {
          question_id: this.question_id,
          showSelect: this.showSelect,
        },
      });
    },
    updatePwd() {
      this.$router.push({
        path: "personalcenter",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
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
  position: absolute;
  bottom: 0.15rem;
  right: 0.12rem;
  border-radius: 100%;
  // background: blue;
  img {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>