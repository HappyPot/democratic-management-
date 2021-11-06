<template>
  <div class="statistics">
    <div class="subject_group">
      <el-collapse v-model="activeNames"
                   @change="changeQuestion"
                   accordion>
        <el-collapse-item :title="group.issue + '【' + group.type + '】'"
                          v-for="(group, i) in list"
                          :name="i"
                          :key="i">
          <!-- 单选和多选显示 -->
          <div v-show="group.type == '单选' || group.type == '多选'">
            <div class="table">
              <div class="table_head table_column">
                <div class="th th_1">选项</div>
                <div class="th th_2">小计</div>
                <div class="th">百分比</div>
              </div>
              <div class="table_body table_column"
                   v-for="(item, index) in group.tableData"
                   :key="index"
                   v-show="group['mapData'][item['value']]">
                <div class="th th_1">{{ group["mapData"][item["value"]] }}</div>
                <div class="th th_2">{{ item.num }}</div>
                <div class="th">{{ item.proportion }}%</div>
              </div>
              <div class="table_head table_column">
                <div class="th th_1">回答本题的人数总计</div>
                <div class="th th_2">{{ group.count }}</div>
                <div class="th showDetail"
                     @click="
                    viewDetails(group, group.issue + '【' + group.type + '】')
                  ">
                  查看明细
                </div>
              </div>
            </div>
            <div class="result">
              <div class="result_text">统计结果展示</div>
              <div class="result_chart">
                <!-- 按钮部分 -->
                <div class="rc_switch">
                  <div :class="
                      btnType == 1 ? 'rc_btn_gruop fouse' : 'rc_btn_gruop'
                    "
                       @click="changeChart(1, group.chartData, i)">
                    <img v-if="btnType == 1"
                         src="../image/pie.png"
                         alt="" />
                    <img v-else
                         src="../image/pie_gray.png"
                         alt="" />
                    饼状图
                  </div>
                  <div :class="
                      btnType == 2 ? 'rc_btn_gruop fouse' : 'rc_btn_gruop'
                    "
                       @click="changeChart(2, group.chartData, i)">
                    <img v-if="btnType == 2"
                         src="../image/bar.png"
                         alt="" />
                    <img v-else
                         src="../image/bar_gray.png"
                         alt="" />
                    柱状图
                  </div>
                  <div :class="
                      btnType == 3 ? 'rc_btn_gruop fouse' : 'rc_btn_gruop'
                    "
                       @click="changeChart(3, group.chartData, i)">
                    <img v-if="btnType == 3"
                         src="../image/line.png"
                         alt="" />
                    <img v-else
                         src="../image/line_gray.png"
                         alt="" />
                    条形图
                  </div>
                  <div :class="
                      btnType == 4 ? 'rc_btn_gruop fouse' : 'rc_btn_gruop'
                    "
                       @click="changeChart(4, group.chartData, i)">
                    <img v-if="btnType == 4"
                         src="../image/brokenline.png"
                         alt="" />
                    <img v-else
                         src="../image/brokenline_gray.png"
                         alt="" />
                    折线图
                  </div>
                </div>
                <!-- 图表部分 -->
                <div class="rc_chart">
                  <div :id="'my_chart_' + i"
                       class="my_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="
              group.type == '文本' ||
              group.type == '单行文本框' ||
              group.type == '文本' ||
              group.type == '多行文本框'
            ">
            <div class="table">
              <div class="table_head table_column">
                <div class="th th_1">{{ group.issue }}</div>
                <div class="th th_2">{{ group.text_count }}</div>
                <div class="th showDetail"
                     @click="
                    viewDetails(group, group.issue + '【' + group.type + '】')
                  ">
                  查看明细
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
  props: {
    statisticsData: {
      require: true,
      default: () => []
    }
  },
  data() {
    return {
      btnType: -1,
      activeNames: [],
      mapData: {}, //值与文字的映射
      list: [], //循环数据
      typeMap: {
        1: '单选',
        2: '文本',
        3: '多选',
        4: '单行文本框',
        5: '多行文本框'
      }
    }
  },
  created() {
    console.log('statisticsData', this.statisticsData)
    let mapData = {}
    for (let i = 0; i < this.statisticsData.length; i++) {
      if (
        this.statisticsData[i].type == 3 ||
        this.statisticsData[i].type == 1
      ) {
        this.statisticsData[i].config.map(item => {
          mapData[item.value] = item.content
        })
        let arr = []
        this.statisticsData[i].count[0].map(item => {
          if (mapData[item['value']]) {
            let obj = {
              value: item.num,
              name: mapData[item['value']]
            }
            arr.push(obj)
          }
        })
        let num = 0
        this.statisticsData[i].count[0].map(item => {
          num += item.num - 0
        })
        let obj = {
          type: this.typeMap[this.statisticsData[i].type],
          count: num,
          issue: this.statisticsData[i].issue,
          tableData: this.statisticsData[i].count[0],
          mapData: mapData,
          chartData: arr,
          id: this.statisticsData[i].id,
          question_id: this.statisticsData[i].question_id,
          btnType: -1
        }
        this.list.push(obj)
      } else if (
        this.statisticsData[i].type == 2 ||
        this.statisticsData[i].type == 4 ||
        this.statisticsData[i].type == 5
      ) {
        let obj = {
          type: this.typeMap[this.statisticsData[i].type],
          text_count: this.statisticsData[i].text_count,
          issue: this.statisticsData[i].issue,
          id: this.statisticsData[i].id,
          question_id: this.statisticsData[i].question_id,
          btnType: -1
        }
        this.list.push(obj)
      }
    }
  },
  methods: {
    // 切换coll
    changeQuestion() {
      this.btnType = -1
    },
    // 切换图表
    changeChart(type, data, i) {
      this.btnType = type
      this.initCharts(type, data, i)
    },
    // 初始化图表
    initCharts(type, data, i) {
      let mychart = echarts.init(document.getElementById('my_chart_' + i))
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
            barWidth: 20,
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            data: data
          }
        ]
      }
      // let option = {
      //   tooltip: { trigger: 'item' },
      //   legend: { orient: 'vertical', right: '0' },
      //   series: [
      //     {
      //       name: '',
      //       type: 'pie',
      //       radius: ['30%', '80%'],
      //       emphasis: {
      //         label: { show: true, fontSize: '40', fontWeight: 'bold' }
      //       },
      //       data: [
      //         { value: 5, name: '满意' },
      //         { value: 1, name: '一般' }
      //       ]
      //     }
      //   ]
      // }
      let arr = []
      data.map(item => {
        arr.push(item.name)
      })
      switch (type) {
        case 1:
          option.series[0].type = 'pie'
          break
        case 2:
          option.series[0].type = 'bar'
          option.grid = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
          option.xAxis = {
            type: 'category',
            data: arr
          }
          option.yAxis = {
            type: 'value'
          }
          break
        case 3:
          option.series[0].type = 'bar'
          option.yAxis = {
            type: 'category',
            data: arr
          }
          option.xAxis = {
            type: 'value'
          }
          option.grid = {
            left: 40,
            right: 20,
            top: 20,
            bottom: 20
          }
          break
        case 4:
          option.series[0].type = 'line'
          option.xAxis = {
            type: 'category',
            data: arr
          }
          option.yAxis = {
            type: 'value'
          }
          option.grid = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
          break
      }
      console.log('option', JSON.stringify(option))
      mychart.setOption(option, true)
    },
    // 查看明细
    viewDetails(group, name) {
      this.$emit('openDetail', {
        group,
        name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.statistics {
  height: 662px;
  overflow: auto;
}
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
.my_chart {
  width: 600px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>