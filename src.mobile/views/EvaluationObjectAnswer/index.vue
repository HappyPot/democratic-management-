<template >
  <div class="EvaluationObject">
    <div class="m_title">测评对象</div>
    <div class="m_stitle">测评对象</div>
    <div
      class="eo_item"
      v-for="(item, index) in toplist"
      :key="index"
      @click="togodetail(item, item.is_fill - 0)"
    >
      {{ index + 1 }}.{{ item.title }}
      <img src="../../assets/image/下一级.svg" alt="" />
    </div>
  </div>
</template>
<script>
import { GET_QUESTION_INFO } from "../../api/mobile";
export default {
  name: "EvaluationObject",
  data() {
    return {
      toplist: [],
      question_id: -1,
      showSelect: 1,
    };
  },
  created() {
    this.question_id = this.$route.query.question_id;
    this.showSelect = this.$route.query.showSelect - 0;
    GET_QUESTION_INFO({
      id: this.question_id,
    }).then((res) => {
      if (res.status == 0) {
        this.toplist = res.data.top;
        if (this.toplist.length == 0) {
          this.togodetail({
            question_id: this.question_id,
            title: res.data.title,
            id: res.data.id,
          });
        }
      }
    });
  },
  methods: {
    togodetail(item, flag) {
      this.$router.push({
        path: "evaluationanswer",
        query: {
          question_id: item.question_id,
          title: item.title,
          top_id: item.id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.EvaluationObject {
  padding: 0.2rem;
  box-sizing: border-box;
  position: relative;
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