<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
  </div>
</template>
<script>
export default {
  name: "TextCom",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      radio: "",
      comInfo: null,
    };
  },
  created() {
    this.comInfo = this.$deepClone(this.info);
  },
  mounted() {
    this.radio = this.answer;
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "./index.less";

.ed_item {
  margin-bottom: 0.24rem;
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
</style>