<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
    <div class="text_item">
      <van-field
        v-model="value"
        :disabled="disabled"
        placeholder=""
        @input="getValue"
      />
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
    answer: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
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
  mounted() {
    this.value = this.answer;
  },
  methods: {
    setValue() {
      this.value = this.comanserObject.value;
    },
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