<template>
  <div class="statistics">
    <div class="subject_group">
      <!-- 单选和多选显示 -->
      <div v-for="(group, i) in statisticsData"
           :key="i">
        <div class="table">
          <div class="table_head table_column">
            <div class="th th_1">{{ group.issue }}【{{typeMap[group.type]}}】</div>
            <div class="th showDetail"
                 @click="
                    viewDetails(group, group.issue + '【' + typeMap[group.type] + '】',typeMap[group.type],group.type)
                  ">
              查看明细
            </div>
          </div>
        </div>
      </div>
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
    viewDetails(group, name, text, type) {
      this.$emit('openDetail', {
        group,
        name,
        text,
        type
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
  justify-content: space-between;
  // background: #f4f5f8;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 19px;
  color: #1e263d;
  height: 54px;
  box-sizing: border-box;
  line-height: 54px;
  padding-left: 23px;
  padding-right: 23px;
}
.table_body {
  background: #fff !important;
}
.th_1 {
  // width: 420px;
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