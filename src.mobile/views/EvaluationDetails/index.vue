<template >
  <div class="EvaluationDetails" ref="EvaluationDetails">
    <div class="user" @click="updatePwd">
      <img src="../../assets/image/个人中心.svg" alt="" />
    </div>
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
        :answer="item.value"
        @getValue="getValue"
      ></component>
    </div>
    <div class="submit" v-if="is_edit">
      <!-- <div class="s_1" @click="pre" v-if="toplist.length != 0">上一个</div> -->
      <div class="s_2" @click="submit(2)">提交</div>
      <div class="s_3" @click="submit(1)">暂存</div>
      <!-- <div class="s_1" @click="next" v-if="toplist.length != 0">下一个</div> -->
    </div>
  </div>
</template>
<script>
import {
  GET_QUESTION_INFO,
  SAVE_ANSWER,
  GET_ANSWER,
  GET_USER_QUESTION_ISSUE,
} from "../../api/mobile";
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
      is_edit: true,
    };
  },
  mounted() {
    this.showSelect = this.$route.query.showSelect - 0;
    this.question_id = this.$route.query.question_id;
    this.title = this.$route.query.title;
    this.top_id = this.$route.query.top_id;
    this.toplist = JSON.parse(this.$route.query.toplist);
    let param = {
      question_id: this.question_id,
      question_top_id: this.top_id,
    };
    GET_USER_QUESTION_ISSUE(param).then((res) => {
      if (res.status == 0) {
        this.issue = res.data.issue;
        res.data.issue.map((item) => {
          if (item.type != 2) {
            if (item.type == 1 || item.type == 3) {
              this.questionObj[item.id] = {
                question_issue_id: item.id,
                value: [],
              };
            } else {
              this.questionObj[item.id] = {
                question_issue_id: item.id,
                value: "",
              };
            }
          }
        });
        this.is_edit = res.data.is_edit;
        console.log("this.issue", this.issue);
        this.originData = res.data;
        // this.toplist = res.data.top;
        if (this.toplist.length != 0) {
          this.top_id = this.$route.query.top_id;
          this.min = this.toplist[0].id;
          this.max = this.toplist[this.toplist.length - 1].id;
        }
      }
    });
  },
  methods: {
    updatePwd() {
      this.$router.push({
        path: "personalcenter",
      });
    },
    // 上一个
    pre() {
      this.$dialog.alert({
        title: "提示",
        message: "为了防止数据丢失，请及时暂存数据",
        confirmButtonColor: "#1497fe",
        confirmButtonText: "知道了",
      });
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
      this.$dialog.alert({
        title: "提示",
        message: "为了防止数据丢失，请及时暂存数据",
        confirmButtonColor: "#1497fe",
        confirmButtonText: "知道了",
      });
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
    },
    submit(type) {
      let values = [];
      let len = 0;
      for (let key in this.questionObj) {
        this.questionObj[key]["question_top_id"] = this.top_id - 0;
        // if (
        //   this.questionObj[key]["value"] &&
        //   !Array.isArray(this.questionObj[key]["value"])
        // ) {
        //   values.push(this.questionObj[key]);
        // } else if (
        //   Array.isArray(this.questionObj[key]["value"]) &&
        //   this.questionObj[key]["value"].length > 0
        // ) {
        //   values.push(this.questionObj[key]);
        // }
        values.push(this.questionObj[key]);
      }
      this.issue.map((item) => {
        if (item.type - 0 != 2) {
          len += 1;
        }
      });
      console.log("len", len);
      console.log("values.lenght", values.length);
      if (len != values.length && type != 1) {
        this.$dialog.alert({
          title: "提示",
          message: "当前测评内容未完成，请完成后再进行提交",
          confirmButtonColor: "#1497fe",
          confirmButtonText: "知道了",
        });
        return;
      }
      let obj = {
        question_id: this.question_id - 0,
        submit_type: type,
        values: values,
      };
      console.log("obj", obj);
      SAVE_ANSWER(obj).then((res) => {
        if (res.status == 0) {
          this.$router.push({
            path: "successtip",
            query: {
              question_id: this.question_id - 0,
            },
          });
        } else {
          this.$router.push({
            path: "errortip",
            query: {
              question_id: this.question_id - 0,
            },
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
