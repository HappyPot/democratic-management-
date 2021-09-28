<template>
  <div class="s_textarea">
    <van-field v-model="value" placeholder="" />
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
    };
  },
  created() {
    this.comInfo = this.$deepClone(this.info);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>