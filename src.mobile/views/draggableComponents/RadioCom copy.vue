<template>
  <div class="ed_item">
    <div class="ed_title">{{ comInfo.issue }}</div>
    <div class="ed_select">
      <van-radio-group
        v-model="radio"
        :disabled="disabled"
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
    <div class="text_item" v-show="textFlag">
      <van-field
        v-model="radio"
        rows="2"
        autosize
        type="textarea"
        :disabled="disabled"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        @input="getValue"
      />
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
      message: "",
      textFlag: false,
      radio: "",
      comInfo: null,
      comanserObject: null,
    };
  },
  created() {
    this.comInfo = this.$deepClone(this.info);
  },
  mounted() {
    this.radio = this.answer[0] - 0 || "";
  },
  methods: {
    setValue() {
      this.radio = this.comanserObject.value;
    },
    getValue() {
      // let textObj = this.comInfo.config.find((item) => {
      //   return item.value - 0 == this.radio - 0;
      // });
      // if (!textObj) {
      //   return;
      // }
      // if (textObj.content.indexOf("其他") > -1) {
      //   this.textFlag = true;
      // } else {
      //   this.textFlag = false;
      // }
      // this.$emit("getValue", {
      //   question_issue_id: this.comInfo.id,
      //   value: this.radio - 0,
      // });
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