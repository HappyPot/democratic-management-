<template>
  <div id="page_home">
    <!--  -->
    <div class="page_top">
      <!-- 系统信息 -->
      <div class="system_info">
        <div class="si_title">系统信息</div>
        <div class="si_user">
          <div class="si_user_icon">
            <img src="../../../assets/image/userinfo.jpeg" alt="头像" />
          </div>
          <div class="si_user_info">
            <div class="sui_name">
              {{ system_info.account_title }}，欢迎您！
            </div>
            <div class="sui_time">
              当前主体：{{ system_info.subject_title }}
            </div>
          </div>
        </div>
        <div class="other_info">
          <div>上次登录时间：{{ system_info.last_login_at }}</div>
          <div>技术服务电话：{{ system_info.tel }}</div>
          <div>版本号：{{ system_info.version }}</div>
        </div>
      </div>
      <!-- 数组总览 -->
      <div class="data_screening">
        <div class="si_title">数据总览</div>
        <div class="data_group">
          <div class="dg_left" @click="toEvaluation">
            <div class="dg_left_title">
              <img src="./image/mzcp.png" alt="" />
              <span>民主测评</span>
            </div>
            <div class="data_text">
              民主测评项目
              <span>{{ test }}</span>
            </div>
          </div>
          <div class="dg_right" @click="toQuestionnaire">
            <div class="dg_left_title">
              <img src="./image/wjdc.png" alt="" />
              <span>调查问卷</span>
            </div>
            <div class="data_text">
              问卷调查项目
              <span style="color: #7bb3ff">{{ investigation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 民主测评操作流程 -->
    <div class="process">
      <div class="process_title">民主测评操作流程</div>
      <div class="process_1">
        <div class="p_item">
          <img src="./image/p_1.png" alt="" />
          基础阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item">
          <img src="./image/p_1.png" alt="" />
          基础信息
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item">
          <img src="./image/p_1.png" alt="" />
          民主测评表
        </div>
      </div>
      <div class="p_arrow_down">
        <img class="sp_down" src="./image/down.png" alt="" />
      </div>
      <div class="process_2">
        <div class="p_item p_item_2">
          <img src="./image/p_1.png" alt="" />
          评测阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_4.png" alt="" />
          新建测评
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_5.png" alt="" />
          启动测评
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_6.png" alt="" />
          测评监控
        </div>
      </div>
      <div class="p_arrow_down">
        <img class="sp_down" src="./image/down.png" alt="" />
      </div>
      <div class="process_3">
        <div class="p_item p_item_3">
          <img src="./image/p_1.png" alt="" />
          反馈阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item p_item_3">
          <img src="./image/p_7.png" alt="" />
          强行结束
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img" src="./image/arrow.png" alt="" />
        </div>
        <div class="p_item p_item_3">
          <img src="./image/p_8.png" alt="" />
          统计分析
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST,
} from "@/api/personnelmanagement.js";
import { GET_INDEX } from "@/api/login.js";

import { mapState } from "vuex";
export default {
  data() {
    return {
      account: "", //用户名
      updated_at: "", // 更新时间
      created_at: "", //上次登录时间
      userInfo: {},
      test: 0, //民主测评项目
      investigation: 0, //问卷调查项目
      system_info: {},
    };
  },
  created() {},
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("evaluation"));
    this.account = this.userInfo.account;
    GET_INDEX().then((res) => {
      if (res.status == 0) {
        let array = res.data.question_count;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (element.type == 1) {
            this.test = element.count;
          }
          if (element.type == 2) {
            this.investigation = element.count;
          }
        }
        this.system_info = res.data.system_info;
      }
    });
  },
  // filters: {
  //   formatUpdateTime(val) {
  //     if (val) {
  //       return val.split("T")[0];
  //     }
  //   },
  // },
  methods: {
    // 进入民主测评
    toEvaluation() {
      this.$router.push({
        path: "/democraticevaluation/evaluationmanagement",
      });
    },
    // 进入调查问卷
    toQuestionnaire() {
      this.$router.push({
        path: "/questionnaireinvestigation/surveylist",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#page_home {
  padding-right: 20px;
}
.page_top {
  display: flex;
  align-items: center;
}
.system_info {
  flex: 1;
  min-width: 463px;
  height: 261px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
  margin-right: 24px;
  border-radius: 8px;
}
.si_user {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.si_user_icon {
  width: 60px;
  height: 60px;
  margin-right: 24px;
  img {
    display: block;
    width: 60px;
    height: 60px;
  }
}
.sui_name {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 25px;
  color: #21273a;
  margin-bottom: 8px;
}
.sui_time {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7;
}
.si_title {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 22px;
  color: #1e263d;
  margin-bottom: 23px;
}
.other_info {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7;
  div {
    margin-bottom: 12px;
  }
}
.data_screening {
  border-radius: 8px;
  flex: 1.45;
  min-width: 673px;
  height: 261px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
  .data_group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dg_left {
    margin-right: 24px;
  }
  .dg_left,
  .dg_right {
    cursor: pointer;
    flex: 1;
    width: 310px;
    height: 168px;
    background: #ffffff;
    box-shadow: 0px 8px 30px rgba(0, 5, 58, 0.05);
    opacity: 1;
    border-radius: 10px;
    padding: 24px;
    box-sizing: border-box;
  }
  .dg_left_title {
    display: flex;
    align-items: center;
    img {
      width: 51px;
      height: 56px;
      margin-right: 14px;
    }
    span {
      margin-bottom: 8px;
    }
  }
  .data_text {
    width: 100%;
    margin-top: 24px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 21px;
    color: #9aa7bc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 38px;
      font-weight: 400;
      line-height: 46px;
      color: #b976f2;
    }
  }
}
.process {
  padding: 24px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 23px;
  height: 482px;
  .process_1,
  .process_2,
  .process_3 {
    display: flex;
    align-items: center;
  }
  .p_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 163px;
    height: 54px;
    background: #fcbab7;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 21px;
    color: #ffffff;
    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
  .p_item_2 {
    background: #cca2f2;
  }
  .p_item_3 {
    background: #a8cdff;
  }
  .p_arrow {
    background: #fff;
  }
  .p_arrow_down {
    margin-top: 11px;
    margin-bottom: 11px;
    width: 163px;
    height: 54px;
    img {
      display: block;
      height: 68px;
    }
  }
  .sp_img {
    width: 47px !important;
    height: 14px !important;
  }
  .sp_down {
    width: 14px !important;
    height: 47px !important;
    margin: 0 auto;
  }
  .process_title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 21px;
    color: #1e263d;
    margin-bottom: 70px;
  }
}
</style>
