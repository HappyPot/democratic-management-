<template >
  <div class="EvaluationDetails" ref="EvaluationDetails">
    <div class="m_container">
      <div class="m_title">测评详情</div>
      <!-- <div class="m_stitle">{{ originData.title }}</div> -->
      <div class="subject">测评主体：{{ title }}</div>
      <component
        v-for="item in issue"
        :key="item.id"
        :info="item"
        :is="map[item.type]"
        :answer="item.value"
        :ref="'type_' + item.id"
      ></component>
    </div>
  </div>
</template>
<script>
import { GET_QUESTION_INFO, SAVE_ANSWER, GET_ANSWER } from "../../api/mobile";
export default {
  name: "EvaluationDetails",
  data() {
    return {
      radio: "",
      value: "",
      id: "",
      map: {
        1: "RadioCom",
        2: "TextCom",
        3: "CheckboxCom",
        4: "SingleText",
        5: "MultilineText",
      },
      answerList: [],
      issue: [],
      originData: {
        title: "",
      },
      title: "",
      top_id: undefined,
      questionObj: {},
      question_id: undefined,
      toplist: [],
      min: 0,
      max: 0,
      showSelect: -1,
    };
  },
  mounted() {
    this.question_id = this.$route.query.question_id;
    this.top_id = this.$route.query.top_id;
    this.title = this.$route.query.title;
    this.getanswer();
  },
  methods: {
    // 获取答案
    getanswer() {
      GET_ANSWER({
        question_top_id: this.top_id,
        question_id: this.question_id,
      }).then((res) => {
        this.issue = res.data;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.EvaluationDetails {
  padding: 0.2rem;
  padding-top: 0;
  position: relative;
  box-sizing: border-box;
}
.m_stitle {
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 0.22rem;
  color: #111747;
  opacity: 1;
}
.subject {
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-top: 0.16rem;
  margin-bottom: 0.32rem;
}
.ed_title {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.ed_select_label {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  display: block;
}

.ed_select /deep/ .van-radio--horizontal {
  margin-bottom: 0.16rem;
  width: 0.99rem;
}
.ed_item {
  margin-bottom: 0.24rem;
}
.ed_detail {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.s_tips {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.s_textarea {
  background: #ffffff;
  border: 1px solid #e7effc;
  border-radius: 0.02rem;
}

.s_textarea /deep/ .van-cell {
  padding: 0.05rem 0.16rem;
}
.child_item {
  margin-bottom: 0.24rem;
}
.submit {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 3.4rem;
}
.s_1 {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #1497fe;
  opacity: 1;
  cursor: pointer;
}
.s_2,
.s_3 {
  width: 0.76rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border: 1px solid #1497fe;
  opacity: 1;
  border-radius: 4px;
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.s_2 {
  background: #1497fe;
}
.s_3 {
  color: #1497fe;
}
.m_container {
  padding-bottom: 0.7rem;
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
