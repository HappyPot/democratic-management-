<template>
  <div id="surveyStatistics">
    <div class="screen">
      <div class="screen_item" @click="getChoiceSummaryExport">
        <img
          style="margin-left: 20px; margin-right: 4px"
          src="../../../../assets/image/exportlist.svg"
          alt=""
        />
        <div>导出数据</div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="单选信息" name="first">
        <div class="table_box">
          <div class="table_header">
            <div class="col1">序号</div>
            <div class="col2">问题</div>
            <div class="col3">选项</div>
          </div>
          <div
            class="table_body"
            v-for="(item, index) in radioData"
            :key="index"
          >
            <div class="col1 tch">{{ index + 1 }}</div>
            <div class="col2 tch">{{ item.issue }}</div>
            <div class="table_item col3 tch">
              <div
                class="table_item_1"
                v-for="(val, i) in item.values"
                :key="i"
              >
                <div>{{ val.title }}30岁以下</div>
                <div>{{ val.num }}票({{ val.bl }}%)</div>
              </div>
            </div>
          </div>
          <div class="entry" v-show="radioData.length == 0">暂无数据</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文本信息" name="second">
        <div v-for="(group, i) in textList" :key="i">
          <div class="table">
            <div class="table_column">
              <div class="">
                {{ group.issue }}
              </div>
              <div class="showDetail" @click="viewDetails(group)">查看明细</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  GET_PAPER_TEXTLIST,
  GET_CHOICE_SUMMARY,
  GET_CHOICE_SUMMARY_EXPORT,
} from "@/api/question.js";

export default {
  name: "SurveyStatistics",
  props: {
    questionId: {
      require: true,
      default: undefined,
    },
  },
  data() {
    return {
      activeName: "first", //单选信息或者文本信息
      radioData: [], //单选数据
      textList: [], //文字数据
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
    };
  },
  mounted() {
    this.handleClick();
    console.log("aaa",this.questionId);
  },
  methods: {
    // 查看明细
    viewDetails(group) {
      this.$emit("openDetail", {
        group,
        questionId: this.questionId,
      });
    },
    //   单选导出
    getChoiceSummaryExport() {
      let obj = {
        question_id: this.questionId,
      };
      GET_CHOICE_SUMMARY_EXPORT(obj).then((res) => {
        const blob = new Blob([res]);
        const fileName = "单选信息数据.xls";
        const link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
    },
    handleClick() {
      if (this.activeName == "first") {
        // 单选
        this.getChoiceSummary();
      } else {
        //   文字
        this.getPaperTextList();
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [2, 1];
      } else if (columnIndex === 1) {
        return [0, 0];
      }
    },
    // 获取单选列表
    getChoiceSummary() {
      let obj = {
        question_id: this.questionId,
      };
      GET_CHOICE_SUMMARY(obj).then((res) => {
        if (res.status === 0) {
          this.radioData = res.data.content;
        }
      });
    },
    // 获取文本列表
    getPaperTextList() {
      let obj = {
        question_id: this.questionId,
      };
      GET_PAPER_TEXTLIST(obj).then((res) => {
        if (res.status === 0) {
          this.textList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#surveyStatistics {
  height: 662px;
  overflow: auto;
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
    display: flex;
    background: #fff !important;
    padding-left: 17px;
    padding-right: 17px;
    border-bottom: 1px solid #f2f3f8;
  }
  .screen_item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .screen {
    display: flex;
    align-items: center;
    width: 149px;
    height: 16px;
    position: absolute;
    top: 92px;
    right: 38px;
    z-index: 9999;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .table_header {
    display: flex;
    background: #f4f5f8;
    padding: 18px 17px;
    color: #7984a7;
  }
  .col1 {
    width: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .col2 {
    width: 200px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .col3 {
    text-align: center;
    width: calc(100% - 300px);
  }
  .tch {
    height: 80px;
  }
  .table_item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .table_item_1 {
    }
  }
  .entry {
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid #f2f3f8;
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
  .showDetail {
    cursor: pointer;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 19px;
    color: #018bf8;
  }
}
</style>