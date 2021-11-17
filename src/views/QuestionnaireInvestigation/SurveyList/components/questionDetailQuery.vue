<template>
  <div class="review">
    <div class="screen">
      <!-- <div class="screen_item" @click="getexport">
        <img
          style="margin-left: 20px; margin-right: 4px"
          src="../../../../assets/image/exportlist.svg"
          alt=""
        />
        <div>导出数据</div>
      </div> -->
    </div>
    <div class="baseInfo">
      <div class="baseInfo_item">
        <div class="bt_title">{{ idInfo.group.issue }}</div>
      </div>
      <!-- 表格部分 -->
      <div class="base_table">
        <el-table :data="list" v-loading="loading" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="user_name" show-overflow-tooltip label="人员">
          </el-table-column>
          <el-table-column prop="value" show-overflow-tooltip label="文本内容">
          </el-table-column>
          <el-table-column
            prop="created_at"
            show-overflow-tooltip
            label="提交时间"
          >
          </el-table-column>
        </el-table>
        <div class="pagination_my">
          <el-pagination
            v-show="total > 0"
            :total="total"
            :page-size="commonParam.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_PAPER_TEXTCONTENT } from "@/api/question.js";
export default {
  name: "QuestionDetailQuery",
  props: {
    idInfo: {
      require: true,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      commonParam: {
        page: 1,
        page_size: 10,
      },
    };
  },
  mounted() {
    this.getPaperTextContentL();
    console.log("aaa", this.idInfo.group);
  },
  methods: {
    // 设置每页条数
    handleSizeChange(val) {
      this.commonParam.page_size = val;
      this.getPaperTextContentL();
    },
    // 触发分页
    handleCurrentChange(val) {
      this.commonParam.page = val;
      this.getPaperTextContentL();
    },
    // 获取文本内容
    getPaperTextContentL() {
      this.loading = true;
      let obj = {
        question_id: this.idInfo.questionId,
        question_issue_id: this.idInfo.group.id,
        page: this.commonParam.page_size,
        page_size: this.commonParam.page,
      };
      console.log("obj", obj);
      GET_PAPER_TEXTCONTENT(obj).then((res) => {
        if (res.status === 0) {
          this.loading = false;
          this.list = res.data.data;
          this.total = res.data.total;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/index.scss";
.review {
  padding: 0 12px;
}
.bt_title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 24px;
  color: #1e263d;
  margin-bottom: 12px;
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
.screen_content {
  position: absolute;
  width: 844px;
  background: #fff;
  min-height: 76px;
  z-index: 12;
  padding-top: 20px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #dfe1e8;
  border-radius: 4px;
  box-sizing: border-box;
  top: 137px;
  padding-bottom: 17px;
  right: 34px;
}
.baseInfo_item {
  margin-bottom: 16px;
}
.pc_head {
  display: flex;
  flex-wrap: wrap;
  .pc_item {
    width: 260px;
    margin-right: 12px;
  }
}
.tree_self {
  width: 200px;
  height: 186px;
  background: #ffffff;
  border: 1px solid #eaedf3;
  border-top: none;
  opacity: 1;
  border-radius: 5px;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
}
.pagination_my {
  position: absolute;
  right: 0;
  bottom: 4px;
}
.base_table {
  position: relative;
  padding-bottom: 45px;
}
.screen_item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>