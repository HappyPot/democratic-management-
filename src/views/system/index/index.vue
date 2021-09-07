<template>
  <div id="page_home">
    <!--  -->
    <div class="page_top">
      <!-- 系统信息 -->
      <div class="system_info">
        <div class="si_title">
          系统信息
        </div>
        <div class="si_user">
          <div class="si_user_icon">
            <img src=""
                 alt="">
          </div>
          <div class="si_user_info">
            <div class="sui_name">
              王志辉，欢迎您！
            </div>
            <div class="sui_time">
              最后更新时间：2021-01-01
            </div>
          </div>
        </div>
        <div class="other_info">
          <div>上次登录时间：2021-09-10 10:30:56</div>
          <div>技术服务电话：029-55667788</div>
          <div>版本号：V1.0.0pro</div>
        </div>
      </div>
      <!-- 数组总览 -->
      <div class="data_screening">
        <div class="si_title">
          数据总览
        </div>
        <div class="data_group">
          <div class="dg_left">
            <div class="dg_left_title">
              <img src="./image/mzcp.png"
                   alt="">
              <span>民主测评</span>
            </div>
            <div class="data_text">
              民主测评项目
              <span>19259</span>
            </div>
          </div>
          <div class="dg_right">
            <div class="dg_left_title">
              <img src="./image/wjdc.png"
                   alt="">
              <span>调查问卷</span>
            </div>
            <div class="data_text">
              问卷调查项目
              <span style="color:#7BB3FF">19259</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 民主测评操作流程 -->
    <div class="process">
      <div class="process_title">
        民主测评操作流程
      </div>
      <div class="process_1">
        <div class="p_item">
          <img src="./image/p_1.png"
               alt="">
          基础阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item">
          <img src="./image/p_1.png"
               alt="">
          基础信息
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item">
          <img src="./image/p_1.png"
               alt="">
          民主测评表
        </div>
      </div>
      <div class="p_arrow_down">
        <img class="sp_down"
             src="./image/down.png"
             alt="">
      </div>
      <div class="process_2">
        <div class="p_item p_item_2">
          <img src="./image/p_1.png"
               alt="">
          评测阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_4.png"
               alt="">
          新建测评
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_5.png"
               alt="">
          启动测评
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item p_item_2">
          <img src="./image/p_6.png"
               alt="">
          测评监控
        </div>
      </div>
      <div class="p_arrow_down">
        <img class="sp_down"
             src="./image/down.png"
             alt="">
      </div>
      <div class="process_3">
        <div class="p_item p_item_3">
          <img src="./image/p_1.png"
               alt="">
          反馈阶段
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item p_item_3">
          <img src="./image/p_7.png"
               alt="">
          强行结束
        </div>
        <div class="p_item p_arrow">
          <img class="sp_img"
               src="./image/arrow.png"
               alt="">
        </div>
        <div class="p_item p_item_3">
          <img src="./image/p_8.png"
               alt="">
          统计分析
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // var docEl = document.getElementById('page_home')
    // var recalc = function() {
    //   var width = docEl.clientWidth
    //   // 乘以100，px : rem = 100 : 1
    //   docEl.style.fontSize = 100 * (width / 1400) + 'px'
    // }
    // recalc()
    // if (!doc.addEventListener) return
    // win.addEventListener(resizeEvt, recalc, false)
  },
  methods: {}
}
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
