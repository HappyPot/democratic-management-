<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
    <div class="text_item">
      <van-field v-model="value" placeholder="" @input="getValue" />
    </div>
  </div>
</template>
<script>
export default {
  name: "SingleText",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      comInfo: null,
      value: "",
    };
  },
  created() {
    this.comInfo = this.$deepClone(this.info);
    console.log("this.comInfo", this.comInfo);
  },
  methods: {
    getValue() {
      this.$emit("getValue", {
        question_issue_id: this.comInfo.id,
        value: this.value,
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>