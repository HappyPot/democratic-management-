<template >
  <div class="EvaluationDetails">
    <div class="m_container">
      <div class="m_title">测评详情</div>
      <div class="m_stitle">兵直机关部门作风建设网上评议</div>
      <div class="subject">测评主体：1.纪委监委机关</div>
      <component
        v-for="item in issue"
        :key="item.id"
        :info="item"
        :is="map[item.type]"
      ></component>
      <!-- <div class="ed_item">
        <div class="ed_title">您对该部门作风建设情况总体评价是：</div>
        <div class="ed_select">
          <van-radio-group v-model="radio"
                           direction="horizontal">
            <van-radio name="1">
              <span class="ed_select_label">满意</span>
            </van-radio>
            <van-radio name="2">
              <span class="ed_select_label">比较满意</span>
            </van-radio>
            <van-radio name="3">
              <span class="ed_select_label">一般</span>
            </van-radio>
            <van-radio name="4">
              <span class="ed_select_label">不满意</span>
            </van-radio>
            <van-radio name="5">
              <span class="ed_select_label">不了解</span>
            </van-radio>
          </van-radio-group>
        </div>
      </div> -->
      <!-- <div class="ed_item">
        <div class="ed_title">您认为该部门作风建设存在的问题是：</div>
        <div class="child_item">
          <div class="ed_detail">
            1.围绕中心、服务大局，创造性开展工作的意识不强
          </div>
          <div class="ed_select">
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">
                <span class="ed_select_label">满意</span>
              </van-radio>
              <van-radio name="2">
                <span class="ed_select_label">比较满意</span>
              </van-radio>
              <van-radio name="3">
                <span class="ed_select_label">一般</span>
              </van-radio>
              <van-radio name="4">
                <span class="ed_select_label">不满意</span>
              </van-radio>
              <van-radio name="5">
                <span class="ed_select_label">不了解</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div class="s_performance">
            <div class="s_tips">具体表现</div>
            <div class="s_textarea">
              <van-field v-model="value" placeholder="" />
            </div>
          </div>
        </div>
        <div class="child_item">
          <div class="ed_detail">
            2.围绕中心、服务大局，创造性开展工作的意识不强
          </div>
          <div class="ed_select">
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">
                <span class="ed_select_label">满意</span>
              </van-radio>
              <van-radio name="2">
                <span class="ed_select_label">比较满意</span>
              </van-radio>
              <van-radio name="3">
                <span class="ed_select_label">一般</span>
              </van-radio>
              <van-radio name="4">
                <span class="ed_select_label">不满意</span>
              </van-radio>
              <van-radio name="5">
                <span class="ed_select_label">不了解</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div class="s_performance">
            <div class="s_tips">具体表现</div>
            <div class="s_textarea">
              <van-field v-model="value" placeholder="" />
            </div>
          </div>
        </div>
        <div class="child_item">
          <div class="ed_detail">3.其他方面(意见和建议)</div>
          <div class="s_performance">
            <div class="s_textarea">
              <van-field v-model="value" placeholder="" />
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="submit">
      <div class="s_1">上一个</div>
      <div class="s_2">提交</div>
      <div class="s_3">暂存</div>
      <div class="s_1">下一个</div>
    </div>
  </div>
</template>
<script>
import { GET_QUESTION_INFO } from "../../api/mobile";
export default {
  name: "EvaluationDetails",
  data() {
    return {
      radio: "",
      value: "",
      map: {
        1: "RadioCom",
        2: "TextCom",
        3: "CheckboxCom",
        4: "SingleText",
        5: "MultilineText",
      },
      issue: [
        {
          id: 31,
          question_id: 1,
          alias: null,
          issue: "多选",
          type: 3,
          sort: 1,
          config: [
            {
              id: 1,
              content: "默认",
              value: 1,
            },
            {
              id: 2,
              content: "默认2",
              value: 2,
            },
          ],
        },
        {
          id: 30,
          question_id: 1,
          alias: null,
          issue: "文字",
          type: 2,
          sort: 0,
          config: null,
        },
        {
          id: 37,
          question_id: 1,
          alias: null,
          issue: " 您对该部门作风建设情况总体评价是：",
          type: 1,
          sort: 0,
          config: [
            {
              id: 1,
              content: "满意",
              value: 1,
            },
            {
              id: 2,
              content: "比较满意",
              value: 2,
            },
            {
              id: 3,
              content: "一般",
              value: 3,
            },
            {
              id: 4,
              content: "不满意",
              value: 4,
            },
          ],
        },
        {
          id: 32,
          question_id: 1,
          alias: null,
          issue: "多行文本",
          type: 5,
          sort: 2,
          config: null,
        },
      ],
    };
  },
  created() {
    // GET_QUESTION_INFO({
    //   id: 1
    // }).then(res => {
    //   if (res.status == 0) {
    //     this.issue = res.data.issue
    //   }
    // })
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../assets/style/index.less";
.EvaluationDetails {
  padding: 0.2rem;
  padding-top: 0;
  box-sizing: border-box;
}
.m_stitle {
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 0.22rem;
  color: #111747;
  opacity: 1;
}
.subject {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-top: 0.16rem;
  margin-bottom: 0.32rem;
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
.ed_item {
  margin-bottom: 0.24rem;
}
.ed_detail {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.s_tips {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #111747;
  opacity: 1;
  margin-bottom: 0.12rem;
}
.s_textarea {
  background: #ffffff;
  border: 1px solid #e7effc;
  border-radius: 0.02rem;
}

.s_textarea /deep/ .van-cell {
  padding: 0.05rem 0.16rem;
}
.child_item {
  margin-bottom: 0.24rem;
}
.submit {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 3.4rem;
}
.s_1 {
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #1497fe;
  opacity: 1;
  cursor: pointer;
}
.s_2,
.s_3 {
  width: 0.76rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border: 1px solid #1497fe;
  opacity: 1;
  border-radius: 4px;
  font-size: 0.14rem;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 0.2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.s_2 {
  background: #1497fe;
}
.s_3 {
  color: #1497fe;
}
.m_container {
  padding-bottom: 0.7rem;
}
</style>