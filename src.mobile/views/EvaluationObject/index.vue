<template >
  <div class="EvaluationObject">
    <div class="user" @click="updatePwd" v-if="form_type != 2">
      <img src="../../assets/image/个人中心.svg" alt="" />
    </div>
    <div class="m_title">测评对象</div>
    <div class="m_stitle">测评对象</div>
    <div
      class="eo_item"
      :style="{ color: item.is_fill - 0 == 2 ? '#7984A7' : '' }"
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
import { getUserInfom } from "@.mobile/untils/userinfo";
import { mapState } from "vuex";
import { getUuid, setUuid, removeUuid } from "../../untils/saveUid";

export default {
  name: "EvaluationObject",
  data() {
    return {
      toplist: [],
      question_id: -1,
      showSelect: 1,
      form_type: undefined,
      uuid: "",
    };
  },
  computed: {
    ...mapState("evaluationm/base", ["urlParams"]),
  },
  created() {
    this.question_id = this.$route.query.question_id;
    if (this.urlParams.form_type) {
      this.form_type = this.urlParams.form_type - 0;
    } else {
      // 以下社会评议判断 from_type：2
      if (this.$route.query.form_type == 2) {
        this.form_type = this.$route.query.form_type - 0;
        if (getUuid()) {
          this.uuid = getUuid();
        } else {
          this.uuid = this.$uuid.v1();
        }
        this.$store.dispatch("evaluationm/base/saveUrlParams", {
          question_id: this.question_id,
          form_type: this.form_type - 0,
          showSelect: this.showSelect,
          uuid: this.uuid,
        });
      }
    }
    // 以上社会评议判断
    this.showSelect = this.$route.query.showSelect - 0;
    let obj = {};
    if (this.form_type == 2) {
      obj = {
        form_type: this.form_type,
        id: this.question_id,
        user_uid: this.urlParams.uuid,
      };
    } else {
      obj = {
        id: this.question_id,
      };
    }
    GET_QUESTION_INFO(obj).then((res) => {
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
    updatePwd() {
      this.$router.push({
        path: "personalcenter",
      });
    },
    togodetail(item) {
      if (this.form_type == 2) {
        this.$router.push({
          path: "evaluationDetailssociology",
          query: {
            showSelect: 1,
            question_id: item.question_id,
            title: item.title,
            top_id: item.id,
            toplist: JSON.stringify(this.toplist),
            form_type: this.form_type,
          },
        });
      } else {
        this.$router.push({
          path: "evaluationdetails",
          query: {
            showSelect: 1,
            question_id: item.question_id,
            title: item.title,
            top_id: item.id,
            toplist: JSON.stringify(this.toplist),
            form_type: this.form_type,
          },
        });
      }
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