<template >
  <div class="AssessmentList">
    <div class="m_title">我的测评</div>
    <div class="content">
      <van-tabs v-model="active" @change="tabsChange">
        <van-tab name="1" title="未提交">
          <div class="eo_item" v-for="(item, index) in list" :key="index" @click="showDetail">
            {{ index + 1 }}.{{ item.title }}
            <img src="../../assets/image/下一级.svg" alt="" />
          </div>
        </van-tab>
        <van-tab name="2" title="已提交">
          <div class="eo_item" v-for="(item, index) in listNo" :key="index" @click="showDetail">
            {{ index+1 }}.{{ item.title }}
            <img src="../../assets/image/下一级.svg" alt="" />
          </div>
        </van-tab>
        <!--样式占位 -->
        <van-tab title="" disabled> </van-tab>
        <van-tab title="" disabled> </van-tab>
        <van-tab title="" disabled> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { GET_QUESTION } from '../../api/mobile'

export default {
  name: 'AssessmentList',
  data () {
    return {
      active: '1',
      list: [],
      listNo: [],
      showSelect: -1,
      question_id: -1
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (status = '1') {
      this.type = this.$route.query.type
      GET_QUESTION({
        type: this.type,
        status: status
      }).then((res) => {
        if (res.status == 0) {
        // 未提交
          const { data } = res
          if (this.active == 1) {
            this.list = data
          } else {
            this.listNo = data
          }
        }
      })
    },
    tabsChange (data) {
      this.getList(this.active)
    },
    showDetail () {
      this.showSelect = this.$route.query.showSelect - 0
      this.question_id = this.$route.query.question_id
      this.$router.push({
        path: 'evaluationobject',
        query: {
          question_id: this.question_id,
          showSelect: this.showSelect
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.content {
  width: 3.35rem;
  margin: 0 auto;
  /deep/ .van-tabs__line {
    background-color: #1497fe;
  }
  /deep/ .van-tab {
    color: #7984a7;
  }
  /deep/ .van-tab--active {
    color: #1497fe;
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
}
</style>
