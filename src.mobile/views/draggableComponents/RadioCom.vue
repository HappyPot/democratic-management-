<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
    <div class="ed_select">
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        @change="getValue"
      >
        <van-radio
          :name="item.value"
          v-for="item in comInfo.config"
          :key="item.id"
        >
          <span class="ed_select_label">{{ item.content }}</span>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "RadioCom",
  props: {
    info: {
      type: Object,
      default: () => {},
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
  methods: {
    getValue() {
      this.$emit("getValue", {
        question_issue_id: this.comInfo.id,
        value: this.radio - 0,
      });
    },
  },
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