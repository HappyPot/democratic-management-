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
        :answer="item.value"
        @getValue="getValue"
      ></component>
    </div>
    <div class="submit">
      <div class="s_2" @click="submit(2)">提交</div>
    </div>
  </div>
</template>
<script>
import {
  SAVE_SOCIOLOGY_VALUE,
  GET_ANSWER,
  GET_USER_QUESTION_ISSUE_SOCIETY,
} from "../../api/mobile";
import { mapState } from "vuex";
import { getUuid, setUuid, removeUuid } from "../../untils/saveUid";

export default {
  name: "EvaluationDetailsSociology",
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
      form_type: undefined,
    };
  },
  computed: {
    ...mapState("evaluationm/base", ["urlParams"]),
  },
  mounted() {
    this.showSelect = this.$route.query.showSelect - 0;
    //社会评议逻辑
    if (this.$route.query.form_type) {
      this.form_type = this.$route.query.form_type - 0;
    }
    this.question_id = this.$route.query.question_id;
    this.title = this.$route.query.title;
    this.top_id = this.$route.query.top_id;
    this.toplist = JSON.parse(this.$route.query.toplist);
    let param = {
      question_id: this.question_id,
      question_top_id: this.top_id,
      form_type: this.form_type - 0,
      user_uid: getUuid(),
    };
    GET_USER_QUESTION_ISSUE_SOCIETY(param).then((res) => {
      if (res.status == 0) {
        this.issue = res.data.issue;
        res.data.issue.map((item) => {
          if (item.type != 2) {
            if (item.type == 1 || item.type == 3) {
              this.questionObj[item.id] = {
                question_issue_id: item.id,
                value: item.value,
              };
            } else {
              this.questionObj[item.id] = {
                question_issue_id: item.id,
                value: item.value,
              };
            }
          }
        });
        this.is_edit = res.data.is_edit;
        console.log("this.issue", this.issue);
        this.originData = res.data;
        if (this.toplist.length != 0) {
          this.top_id = this.$route.query.top_id;
          this.min = this.toplist[0].id;
          this.max = this.toplist[this.toplist.length - 1].id;
        }
      }
    });
  },
  methods: {
    // 获取数据
    getValue(val) {
      this.questionObj[val.question_issue_id] = val;
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
        question_top_id: this.top_id,
        user_uid: getUuid(),
        form_type: this.form_type,
        values: values,
      };
      console.log("obj", obj);
      SAVE_SOCIOLOGY_VALUE(obj).then((res) => {
        if (res.status == 0) {
          this.$router.push({
            path: "successtip",
            query: {
              question_id: this.question_id - 0,
              form_type: this.form_type,
            },
          });
        } else {
          this.$router.push({
            path: "errortip",
            query: {
              question_id: this.question_id - 0,
              form_type: this.form_type,
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
