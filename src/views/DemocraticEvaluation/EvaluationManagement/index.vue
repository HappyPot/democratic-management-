<template>
  <d2-container class="page">
    <div class="em_search">
      <div class="em_input">
        <div class="ul_item">
          <el-input
            class="inline-input"
            size="medium"
            v-model="queryParams.search_name"
            placeholder="搜索关键字"
          >
            <template slot="append">
              <div class="search_append" @click="searchList">搜索</div>
            </template>
          </el-input>
        </div>
      </div>
      <div class="em_input_right">
        <div class="em_input">
          <el-button type="primary" size="medium" @click="addNew"
            >新增</el-button
          >
        </div>
        <div class="em_input">
          <el-button
            type="danger"
            size="medium"
            plain
            @click="delItemList"
            :disabled="selection.length == 0"
            >删除</el-button
          >
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="em_content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="title" label="标题名称"> </el-table-column>
        <el-table-column prop="start_time" label="测评时间" width="300">
          <template slot-scope="scope">
            {{ scope.row.start_time }}至{{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.status_name == '未开始'" class="status_tiem">
              <i class="status noStart"></i>
              未开始
            </div>
            <div
              v-else-if="scope.row.status_name == '进行中'"
              class="status_tiem"
            >
              <i class="status start"></i>
              进行中
            </div>
            <div
              v-else-if="scope.row.status_name == '已结束'"
              class="status_tiem"
            >
              <i class="status over"></i>
              已结束
            </div>
            <!-- {{tableData[scope.$index].status?'未开始':"开始"}} -->
          </template>
        </el-table-column>
        <el-table-column prop="isEnable" label="是否启用" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].isEnable"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link
              type="primary"
              style="margin-right: 12px"
              @click="showEdit(scope.row, scope.$index)"
              >编辑</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 12px"
              @click="showStatistical(scope.row, scope.$index)"
              >统计</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 12px"
              @click="showConfig(scope.row, scope.$index)"
              >配置</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 12px"
              @click="showPapers"
              >底稿</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_my">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total"
          @pagination="getDutyList"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, prev, pager, next, sizes,jumper"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增与编辑-->
    <el-dialog
      :title="typeTitle"
      center
      top="4vh"
      class="dialogSelf"
      :visible.sync="dialogReview"
      width="700px"
    >
      <Review ref="review" :parentData="parentData"></Review>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          v-show="typeTitle == '评议添加'"
          @click="addNewDate"
          >确 定</el-button
        >
        <el-button
          type="primary"
          v-show="typeTitle == '评议编辑'"
          @click="editData"
          >更 新</el-button
        >
        <el-button @click="dialogReview = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 统计 -->
    <el-dialog
      title="统计结果"
      center
      top="7vh"
      class="dialogSelf"
      :visible.sync="dialogStatistics"
      width="972px"
    >
      <Statistics
        :statisticsData="statisticsData"
        @openDetail="openDetail"
        v-if="dialogStatistics"
      ></Statistics>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statisticalData">确 定</el-button>
        <el-button @click="dialogStatistics = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 配置 -->
    <el-dialog
      title="事项配置"
      center
      top="7vh"
      class="dialogSelf"
      :visible.sync="dialogConfigure"
      width="1000px"
    >
      <Configure
        ref="configure"
        @getComponentParam="getComponentParam"
      ></Configure>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="configData">确 定</el-button>
        <el-button @click="dialogConfigure = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 明细查询 -->
    <el-dialog
      title="明细查询"
      center
      class="dialogSelf"
      :visible.sync="dialogDetail"
      width="1000px"
    >
      <DetailQuery v-if="dialogDetail"></DetailQuery>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetail = false"
          >确 定</el-button
        >
        <el-button @click="dialogDetail = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import Review from "./components/review";
import Statistics from "@/views/Sharing/components/statistics";
import Configure from "@/views/Sharing/components/configure";
import DetailQuery from "../../QuestionnaireInvestigation/SurveyList/components/detailQuery";

import {
  GET_QUESTION_LIST,
  GET_COUNT_QUESTION,
} from "@/api/questionnaireInvestigation.js";
import {
  SAVE_QUESTION,
  SAVE_QUESTION_DETAIL,
  SAVE_QUESTION_CONFIG,
  DEL_QUESTION,
} from "@/api/evaluationanagement.js";

import { mapState } from "vuex";
export default {
  components: {
    Review,
    Configure,
    Statistics,
    DetailQuery,
  },
  data() {
    return {
      selection: [], //表格中被选中的
      typeTitle: "评议添加", //评议添加,评议编辑
      dialogReview: false, //控制新增和编辑
      dialogStatistics: false, //控制统计框
      dialogConfigure: false, //控制配置框
      dialogPapers: false, //控制低稿框
      dialogDetail: false, //明细查询
      searchValue: "", //搜索值
      restaurants: [],
      tableData: [],
      parentData: {}, //编辑组件中的数据
      //分页参数
      queryParams: {
        page: 1,
        page_size: 10,
        search_name: "",
      },
      total: 0,
      statisticsData: [], //统计回显的数据
      question_id: -1,
    };
  },
  mounted() {
    this.subjectId = localStorage.getItem("evaluation_id");
    this.getQuestionList();
  },
  methods: {
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      console.log(`每页 ${val} 条`);
      this.getQuestionList();
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getQuestionList();
    },
    // 多个删除
    delItemList() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id_list: [],
        };
        if (this.selection.length > 0) {
          for (let index = 0; index < this.selection.length; index++) {
            const element = this.selection[index];
            obj.id_list.push(element.id);
          }
        }
        console.log("obj", obj);
        DEL_QUESTION(obj).then((res) => {
          if (res.status == 0) {
            this.getQuestionList();
            this.msgSuccess("删除成功");
          }
        });
      });
    },
    // 搜索功能
    searchList() {
      console.log("11", this.queryParams);
      this.getQuestionList();
    },
    openDetail() {
      this.dialogDetail = true;
    },
    getComponentParam(val) {
      console.log("组价中传输来的数据", val);
    },
    // 获取测评列表
    getQuestionList() {
      GET_QUESTION_LIST(this.queryParams).then((res) => {
        if (res.status === 0) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    // 展示编辑框
    showEdit(row, index) {
      SAVE_QUESTION_DETAIL({
        id: row.id,
      }).then((res) => {
        if (res.status === 0) {
          this.dialogReview = true;
          this.typeTitle = "评议编辑";
          let data = res.data;
          this.$nextTick(() => {
            this.$refs["review"].review.title = data.title;
            this.$refs["review"].review.type = data.type;
            this.$refs["review"].review.type = data.form_type;
            this.$refs["review"].review.mark = data.desc;
            this.$refs["review"].review.textarea = data.index_desc;
            this.$refs["review"].review.date[0] = data.start_time;
            this.$refs["review"].review.date[1] = data.end_time;
            this.$refs["review"].review.isWaiver = data.is_waiver;
            this.$refs["review"].review.isIp = data.is_ip;
            this.$refs["review"].review.accessIp = data.ip_value;
            this.$refs["review"].review.question_top_list = data.top;
            let arr = [];
            data.user_list.map((item) => {
              arr.push(item.id);
            });
            this.$refs["review"].review.people = arr.join(","); //用于参评人员数量的的展示
            this.$refs["review"].review.peopleList = data.user_list; //用于参评人员的table的展示
            this.$refs["review"].review.showPeopleConut =
              data.user_list.length + "人";
          });
        }
      });
    },
    // 更新
    editData() {
      let flag = this.$refs["review"].checkFrom();
      if (flag) {
        // 只有校验成功才能提交
        console.log("评级编辑参数", this.$refs["review"].review);
      }
      console.log("flag", flag);
      console.log("更新");
    },
    // 展示统计框
    showStatistical(row, index) {
      let obj = {
        page_size: this.queryParams.page_size,
        page: this.queryParams.page,
        question_id: row.id,
      };
      console.log("统计查询参数", obj);
      GET_COUNT_QUESTION(obj).then((res) => {
        this.dialogStatistics = true;
        let map = res.data[0].config;
        this.statisticsData = res.data;
        if (res.status === 0) {
          console.log("统计返回值", res.data);
        }
      });
    },
    // 统计数据提交
    statisticalData() {},
    // 展示配置框
    showConfig(row, index) {
      this.dialogConfigure = true;
      this.question_id = row.id;
    },
    // 配置框数据提交 保存测评
    configData() {
      let obj = {
        question_id: this.question_id,
        issue_list: this.$refs["configure"].issue_list,
      };
      SAVE_QUESTION_CONFIG(obj).then((res) => {
        if (res.status == 0) {
          this.dialogConfigure = false;
          this.msgSuccess("保存成功");
        }
      });
    },
    // 展示底稿框
    showPapers() {},
    handleSelectionChange(selection, row) {
      this.selection = selection;
      console.log(selection);
    },
    // 展示新增框
    addNew() {
      this.dialogReview = true;
      this.typeTitle = "评议添加";
      this.initParam();
    },
    initParam() {
      this.$refs["review"].review = {
        title: "", //评议标题
        date: [], //评议时间
        mark: "", //评议说明
        isIp: 1, //是否同IP参评
        accessIp: "", //允许IP段
        type: 1, //评议类型
        isWaiver: 1, //是否允许弃权
        status: 1, //评议状态
        people: "", //参评人员
        showPeopleConut: 0, //参评人员数量
        peopleList: [], //参评人员具体对象
        textarea: "", //首页说明
        appraisalSubject: [], //评议主体
      };
    },
    // 新增
    addNewDate() {
      // 调用组件中的表单校验方法
      let flag = this.$refs["review"].checkFrom();
      if (flag) {
        let review = this.$refs["review"].review;
        let question_top_list = [];
        review.appraisalSubject.map((item, index) => {
          let obj = {
            title: item,
            sort: index,
          };
          question_top_list.push(obj);
        });
        let param = {
          title: review.title,
          type: review.type,
          form_type: review.type,
          desc: review.mark,
          index_desc: review.textarea,
          start_time: review.date[0],
          end_time: review.date[1],
          is_waiver: review.isWaiver,
          is_ip: review.isIp,
          ip_value: review.accessIp,
          question_top_list: question_top_list,
          question_user_list: review.people.split(","),
        };
        console.log("param11", param);
        SAVE_QUESTION(param).then((res) => {
          if (res.status === 0) {
            this.dialogReview = false;
            this.getQuestionList();

            this.msgSuccess("保存成功");
          }
        });
      }
    },
    // 删除
    delItem() {},
  },
};
</script>
<style lang="scss" scoped>
.em_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.em_input_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.em_input {
  margin: 0 6px;
}
.em_content {
  padding-top: 20px;
  position: relative;
  .pagination_my {
    position: absolute;
    right: 0;
    bottom: -44px;
  }
}
.em_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}

.em_content {
  .status {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 100%;
    margin-right: 4px;
  }
  .noStart {
    background: #17bb79;
  }
  .start {
    background: #e9b345;
  }
  .over {
    background: #bfc3c8;
  }
  .status_tiem {
    display: flex;
    align-items: center;
  }
}
.search_append {
  width: 71px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #409eff;
  box-sizing: border-box;
  color: #409eff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
}
.em_search
  .em_input
  .ul_item
  .inline-input.el-input-group
  ::v-deep
  .el-input-group__append {
  padding: 0 !important;
  border: none;
}
</style>