<template >
  <div class="EvaluationObject">
    <div class="m_title">测评对象</div>
    <div class="m_stitle">
      测评对象
    </div>
    <div class="eo_item"
         v-for="(item,index) in list"
         :key="index">
      1.纪委监委机关
      <img src="../../assets/image/下一级.svg"
           alt="">
    </div>
  </div>
</template>
<script>
import { GET_QUESTION } from '../../api/mobile'
export default {
  name: 'EvaluationObject',
  data() {
    return {
      list: [],
      listNo: []
    }
  },
  created() {
    GET_QUESTION().then(res => {
      if (res.status == 0) {
        res.data.map(item => {
          // 未提交
          if (item.status == 1) {
            this.listNo.push(item)
          } else {
            this.list.push(item)
          }
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/index.less';
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