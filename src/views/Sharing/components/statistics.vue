<template>
  <div class="statistics">
    <div class="subject_group">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="1.品德修养好，为人诚实守信"
                          name="1">
          <div class="table">
            <div class="table_head table_column">
              <div class="th th_1">选项</div>
              <div class="th th_2">小计</div>
              <div class="th">百分比</div>
            </div>
            <div class="table_body table_column">
              <div class="th th_1">满意</div>
              <div class="th th_2">30</div>
              <div class="th">20%</div>
            </div>
            <div class="table_head table_column">
              <div class="th th_1">回答本题的人数总计</div>
              <div class="th th_2">100</div>
              <div class="th showDetail"
                   @click="viewDetails">查看明细</div>
            </div>
          </div>
          <div class="result">
            <div class="result_text">统计结果展示</div>
            <div class="result_chart">
              <!-- 按钮部分 -->
              <div class="rc_switch">
                <div :class="btnType==1?'rc_btn_gruop fouse':'rc_btn_gruop'"
                     @click="changeChart(1)">
                  <img v-if="btnType == 1"
                       src="../image/pie.png"
                       alt="">
                  <img v-else
                       src="../image/pie_gray.png"
                       alt="">
                  饼状图
                </div>
                <div :class="btnType==2?'rc_btn_gruop fouse':'rc_btn_gruop'"
                     @click="changeChart(2)">
                  <img v-if="btnType == 2"
                       src="../image/bar.png"
                       alt="">
                  <img v-else
                       src="../image/bar_gray.png"
                       alt="">
                  柱状图
                </div>
                <div :class="btnType==3?'rc_btn_gruop fouse':'rc_btn_gruop'"
                     @click="changeChart(3)">
                  <img v-if="btnType == 3"
                       src="../image/line.png"
                       alt="">
                  <img v-else
                       src="../image/line_gray.png"
                       alt="">
                  条形图
                </div>
                <div :class="btnType==4?'rc_btn_gruop fouse':'rc_btn_gruop'"
                     @click="changeChart(4)">
                  <img v-if="btnType == 4"
                       src="../image/brokenline.png"
                       alt="">
                  <img v-else
                       src="../image/brokenline_gray.png"
                       alt="">
                  折线图
                </div>
              </div>
              <!-- 图表部分 -->
              <div class="rc_chart">
                <div id="my_chart">

                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>

      </el-collapse>

    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
let my_chart = null
export default {
  name: 'Statistics',
  data() {
    return {
      btnType: 1,
      activeNames: ['1'],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // 切换图表
    changeChart(type) {
      this.btnType = type
      this.initCharts()
      // switch (key) {
      //   case value:
      //     break

      //   default:
      //     break
      // }
    },
    // 初始化图表
    initCharts() {
      my_chart = echarts.init(document.getElementById('my_chart'))
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '0'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '80%'],
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' }
            ]
          }
        ]
      }
      my_chart.setOption(option)
    },
    // 查看明细
    viewDetails() {
      console.log('查看明细')
    }
  }
}
</script>
<style lang="scss" scoped>
.subject_item {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 23px;
  color: #1e263d;
}
.table_column {
  display: flex;
  align-items: center;
  background: #f4f5f8;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 19px;
  color: #7984a7;
  height: 54px;
  box-sizing: border-box;
  line-height: 54px;
  padding-left: 23px;
}
.table_body {
  background: #fff !important;
}
.th_1 {
  width: 420px;
}
.th_2 {
  width: 220px;
}
.showDetail {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 19px;
  color: #018bf8;
}
.result_text {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 23px;
  color: #1e263d;
  margin-top: 23px;
  margin-bottom: 16px;
}
.result_chart {
  display: flex;
  align-items: center;
  position: relative;
}
.rc_btn_gruop {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfe1e8;
  border-radius: 4px;
  width: 99px;
  height: 31px;
  margin-bottom: 12px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}
.fouse {
  border: 1px solid #018bf8 !important;
  color: #018bf8 !important;
}
#my_chart {
  width: 600px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>