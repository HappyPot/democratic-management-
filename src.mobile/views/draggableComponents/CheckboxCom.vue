<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
    <div class="ed_select">
      <van-checkbox-group
        v-model="radio"
        direction="horizontal"
        :disabled="disabled"
        @change="getValue"
      >
        <van-checkbox
          :name="item.value"
          v-for="item in comInfo.config"
          :key="item.id"
        >
          <span class="ed_select_label">{{ item.content }}</span>
        </van-checkbox>
      </van-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckboxCom",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: [],
      comInfo: null,
      comanserObject: null,
    };
  },
  created() {
    this.comInfo = this.$deepClone(this.info);
  },
  mounted() {
    for (let i = 0; i < this.answer.length; i++) {
      this.answer[i] = this.answer[i] - 0;
    }
    this.radio = this.answer;
  },
  methods: {
    setValue() {
      this.radio.push(this.comanserObject.value);
      this.radio = [...new Set(this.radio)];
    },
    getValue() {
      this.$emit("getValue", {
        question_issue_id: this.comInfo.id,
        value: this.radio,
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