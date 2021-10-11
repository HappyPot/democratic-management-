<template >
  <div class="EvaluationObject">
    <div class="m_title">测评对象</div>
    <div class="m_stitle">测评对象</div>
    <div
      class="eo_item"
      v-for="(item, index) in toplist"
      :key="index"
      @click="togodetail(item)"
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
    };
  },
  created() {
    GET_QUESTION_INFO({
      id: 1,
    }).then((res) => {
      if (res.status == 0) {
        this.toplist = res.data.top;
      }
    });
  },
  methods: {
    togodetail(item) {
      this.$router.push({
        path: "evaluationdetails",
        query: {
          showSelect: 1,
          question_id: item.question_id,
          title: item.title,
          top_id: item.id,
          toplist: JSON.stringify(this.toplist),
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