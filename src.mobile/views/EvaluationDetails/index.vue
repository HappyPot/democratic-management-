<template >
  <div class="EvaluationDetails" ref="EvaluationDetails">
    <div class="m_container">
      <div class="m_title">测评详情</div>
      <div class="m_stitle">{{ originData.title }}</div>
      <div class="subject">测评主体：{{ title }}</div>
      <component
        v-for="item in issue"
        :key="item.id"
        :info="item"
        :is="map[item.type]"
        :ref="'type_' + item.id"
        @getValue="getValue"
      ></component>
      <!-- <div class="ed_item">
<div class="ed_title">您对该部门作风建设情况总体评价是：</div>
<div class="ed_select">
<van-radio-group v-model="radio"
direction="horizontal">
<van-radio name="1">
<span class="ed_select_label">满意</span>
</van-radio>
<van-radio name="2">
<span class="ed_select_label">比较满意</span>
</van-radio>
<van-radio name="3">
<span class="ed_select_label">一般</span>
</van-radio>
<van-radio name="4">
<span class="ed_select_label">不满意</span>
</van-radio>
<van-radio name="5">
<span class="ed_select_label">不了解</span>
</van-radio>
</van-radio-group>
</div>
</div> -->
      <!-- <div class="ed_item">
<div class="ed_title">您认为该部门作风建设存在的问题是：</div>
<div class="child_item">
<div class="ed_detail">
1.围绕中心、服务大局，创造性开展工作的意识不强
</div>
<div class="ed_select">
<van-radio-group v-model="radio" direction="horizontal">
<van-radio name="1">
<span class="ed_select_label">满意</span>
</van-radio>
<van-radio name="2">
<span class="ed_select_label">比较满意</span>
</van-radio>
<van-radio name="3">
<span class="ed_select_label">一般</span>
</van-radio>
<van-radio name="4">
<span class="ed_select_label">不满意</span>
</van-radio>
<van-radio name="5">
<span class="ed_select_label">不了解</span>
</van-radio>
</van-radio-group>
</div>
<div class="s_performance">
<div class="s_tips">具体表现</div>
<div class="s_textarea">
<van-field v-model="value" placeholder="" />
</div>
</div>
</div>
<div class="child_item">
<div class="ed_detail">
2.围绕中心、服务大局，创造性开展工作的意识不强
</div>
<div class="ed_select">
<van-radio-group v-model="radio" direction="horizontal">
<van-radio name="1">
<span class="ed_select_label">满意</span>
</van-radio>
<van-radio name="2">
<span class="ed_select_label">比较满意</span>
</van-radio>
<van-radio name="3">
<span class="ed_select_label">一般</span>
</van-radio>
<van-radio name="4">
<span class="ed_select_label">不满意</span>
</van-radio>
<van-radio name="5">
<span class="ed_select_label">不了解</span>
</van-radio>
</van-radio-group>
</div>
<div class="s_performance">
<div class="s_tips">具体表现</div>
<div class="s_textarea">
<van-field v-model="value" placeholder="" />
</div>
</div>
</div>
<div class="child_item">
<div class="ed_detail">3.其他方面(意见和建议)</div>
<div class="s_performance">
<div class="s_textarea">
<van-field v-model="value" placeholder="" />
</div>
</div>
</div>
</div> -->
    </div>
    <div class="submit">
      <div class="s_1" @click="pre" v-if="toplist.length != 0">上一个</div>
      <div class="s_2" @click="submit(2)">提交</div>
      <div class="s_3" @click="submit(1)">暂存</div>
      <div class="s_1" @click="next" v-if="toplist.length != 0">下一个</div>
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
      issue: [
        // {
        // id: 31,
        // question_id: 1,
        // alias: null,
        // issue: "多选",
        // type: 3,
        // sort: 1,
        // config: [
        // {
        // id: 1,
        // content: "默认",
        // value: 1,
        // },
        // {
        // id: 2,
        // content: "默认2",
        // value: 2,
        // },
        // ],
        // },
        // {
        // id: 30,
        // question_id: 1,
        // alias: null,
        // issue: "文字",
        // type: 2,
        // sort: 0,
        // config: null,
        // },
        // {
        // id: 37,
        // question_id: 1,
        // alias: null,
        // issue: " 您对该部门作风建设情况总体评价是：",
        // type: 1,
        // sort: 0,
        // config: [
        // {
        // id: 1,
        // content: "满意",
        // value: 1,
        // },
        // {
        // id: 2,
        // content: "比较满意",
        // value: 2,
        // },
        // {
        // id: 3,
        // content: "一般",
        // value: 3,
        // },
        // {
        // id: 4,
        // content: "不满意",
        // value: 4,
        // },
        // ],
        // },
        // {
        // id: 32,
        // question_id: 1,
        // alias: null,
        // issue: "多行文本",
        // type: 5,
        // sort: 2,
        // config: null,
        // },
      ],
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
    this.showSelect = this.$route.query.showSelect - 0;
    this.question_id = this.$route.query.question_id;
    this.title = this.$route.query.title;
    GET_QUESTION_INFO({
      id: this.$route.query.question_id,
    }).then((res) => {
      if (res.status == 0) {
        this.issue = res.data.issue;
        console.log("this.issue", this.issue);
        this.originData = res.data;
        this.toplist = res.data.top;
        if (this.toplist.length != 0) {
          this.top_id = this.$route.query.top_id;
          this.min = this.toplist[0].id;
          this.max = this.toplist[this.toplist.length - 1].id;
        }
      }
    });
  },
  methods: {
    // 上一个
    pre() {
      console.log("上一个this.top_id", this.top_id);
      this.top_id = this.top_id - 0 - 1;
      if (this.top_id < this.min) {
        this.top_id = this.min;
        this.$notify({ type: "danger", message: "第一个" });
        return;
      }
      this.toplist.map((item) => {
        if (this.top_id == item.id - 0) {
          this.title = item.title;
          this.top_id = item.id;
          this.question_id = item.id;
          this.$refs.EvaluationDetails.scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐。默认值
          });
        }
      });
      this.getanswer();
    },
    // 获取答案
    getanswer() {
      GET_ANSWER({
        question_top_id: this.top_id,
        question_id: this.question_id,
      }).then((res) => {
        this.answerList = res.data;
        for (let i = 0; i < this.issue.length; i++) {
          const element = this.issue[i];
          for (let k = 0; k < this.answerList.length; k++) {
            const element2 = this.answerList[k];
            if (element.id == element2.question_issue_id) {
              console.log("question_issue_id", this.$refs["type_1"]);
              this.$refs[
                "type_" + element2.question_issue_id
              ][0].comanserObject = element2;
              this.$refs["type_" + element2.question_issue_id][0].setValue();
            }
          }
        }
      });
    },
    // 下一个
    next() {
      console.log("下一个this.top_id", this.top_id);
      this.top_id = this.top_id - 0 + 1;
      if (this.top_id > this.max) {
        this.top_id = this.max;
        this.$notify({ type: "danger", message: "最后一个" });
        return;
      }
      this.toplist.map((item) => {
        if (this.top_id == item.id - 0) {
          this.title = item.title;
          this.top_id = item.id;
          this.question_id = item.id;
          this.$refs.EvaluationDetails.scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐。默认值
          });
        }
      });
      this.getanswer();
    },
    // 获取数据
    getValue(val) {
      this.questionObj[val.question_issue_id] = val;
      console.log("this.questionObj[val.id]", this.questionObj);
    },
    submit(type) {
      let values = [];
      let len = 0;
      for (let key in this.questionObj) {
        this.questionObj[key]["question_top_id"] = this.top_id - 0;
        if (
          this.questionObj[key]["value"] &&
          !Array.isArray(this.questionObj[key]["value"])
        ) {
          values.push(this.questionObj[key]);
        } else if (
          Array.isArray(this.questionObj[key]["value"]) &&
          this.questionObj[key]["value"].length > 0
        ) {
          values.push(this.questionObj[key]);
        }
      }
      this.issue.map((item) => {
        if (item.type - 0 != 2) {
          len += 1;
        }
      });
      console.log("len", len);
      console.log("values.lenght", values.length);
      // if (len != values.length) {
      // this.$notify({ type: "danger", message: "有未填项" });
      // return;
      // }
      let obj = {
        question_id: this.question_id - 0,
        submit_type: type,
        values: values,
      };
      // console.log("obj", obj);
      // this.$router.push({
      // path: "successtip",
      // });
      SAVE_ANSWER(obj).then((res) => {
        if (res.status == 0) {
          this.$router.push({
            path: "successtip",
          });
        } else {
          this.$router.push({
            path: "errortip",
          });
        }
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
  font-size: 0.14rem;
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
</style>
