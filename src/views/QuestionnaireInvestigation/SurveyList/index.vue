<template>
  <d2-container class="page">
    <div class="survey_list">
      <div class="sl_search">
        <div class="sl_input">
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
        <div class="sl_input_right">
          <div class="sl_input">
            <el-button type="primary" size="medium" @click="addNew"
              >新增</el-button
            >
          </div>
          <div class="sl_input">
            <el-button type="danger" size="medium" plain @click="delItemList"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="sl_content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="title" label="问卷标题">
          <template slot-scope="scope">
            <el-button type="text" @click="showUrl(scope.row)">
              {{ scope.row.title }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="form_type" label="问卷形式" width="100">
          <template slot-scope="scope">
            {{ scope.row.form_type == 1 ? "定向测评" : "公开测评" }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="调查形式" width="100">
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? "测评" : "问卷" }}
          </template>
        </el-table-column>
        <el-table-column prop="start_time" label="调查时间">
          <template slot-scope="scope">
            {{ scope.row.start_time }}至{{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="状态"
          show-overflow-tooltip
          width="120"
        >
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
        <el-table-column prop="isEnable" label="是否启用" width="140">
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
            <!-- <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showPapers">底稿</el-link> -->
            <!-- <el-link type="danger"
                     style="margin-right: 12px">删除</el-link> -->
          </template>
        </el-table-column>
        <div slot="empty" style="position: relative">
          <div
            style="
              position: absolute;
              top: 88%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 17px;
            "
          >
            数据为空
          </div>
          <img
            style="height: 30vh"
            src="../../../assets/image/数据为空.svg"
            alt=""
          />
        </div>
      </el-table>
      <div class="pagination_my">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total"
          @pagination="getQuestionList"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, prev, pager, next, sizes,jumper"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 统计 -->
    <el-dialog
      title="统计结果"
      :close-on-click-modal="false"
      center
      class="dialogSelf"
      top="7vh"
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
      :close-on-click-modal="false"
      center
      class="dialogSelf"
      :visible.sync="dialogConfigure"
      width="1000px"
    >
      <Configure
        ref="configure"
        v-if="dialogConfigure"
        @getComponentParam="getComponentParam"
      ></Configure>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="configData">确 定</el-button>
        <el-button @click="dialogConfigure = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 新增和编辑 -->
    <el-dialog
      :title="typeTitle"
      center
      class="dialogSelf"
      :visible.sync="dialogEdit"
      width="700px"
      :close-on-click-modal="false"
    >
      <AddAndEdit v-if="dialogEdit" ref="addAndEdit"></AddAndEdit>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewDate" v-preventReClick
          >确 定</el-button
        >
        <el-button @click="dialogEdit = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 明细查询 -->
    <el-dialog
      title="明细查询"
      center
      class="dialogSelf"
      :visible.sync="dialogDetail"
      :close-on-click-modal="false"
      width="1000px"
    >
      <DetailQuery v-if="dialogDetail" :idInfo="idInfo"></DetailQuery>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail">确 定</el-button>
        <el-button @click="dialogDetail = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="testTitle"
      center
      :visible.sync="dialogTest"
      :close-on-click-modal="false"
      width="400px"
    >
      <div ref="qrCodeUrl" id="qrcode" class="qrCodeUrl"></div>
      <div class="qrCodeUrl_text">地址：{{ urlText }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTest = false">确 定</el-button>
        <el-button @click="dialogTest = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import Statistics from "@/views/Sharing/components/statistics";
import Configure from "@/views/Sharing/components/configure";
import AddAndEdit from "./components/addAndEdit";
import DetailQuery from "./components/detailQuery";
import QRCode from "qrcodejs2";
import {
  GET_QUESTION_LIST,
  GET_COUNT_QUESTION,
} from "@/api/questionnaireInvestigation.js";
import {
  SAVE_QUESTION_CONFIG,
  SAVE_QUESTION_DETAIL,
  SAVE_QUESTION,
  DEL_QUESTION,
} from "@/api/evaluationanagement.js";
import { mapState } from "vuex";

export default {
  components: {
    Statistics,
    Configure,
    AddAndEdit,
    DetailQuery,
  },
  data() {
    return {
      idInfo: {}, //包含id和question_id
      selection: [],
      typeTitle: "新增", //新增或者编辑
      dialogEdit: false, //新增和编辑
      dialogStatistics: false, //统计弹框展示
      dialogConfigure: false, //事项配置
      dialogDetail: false, //明细弹框
      dialogTest: false, //测试地址二维码
      searchValue: "",
      tableData: [],
      //分页参数
      queryParams: {
        page: 1,
        page_size: 10,
        search_name: "",
        type: 2,
      },
      total: 0,
      statisticsData: [], //统计回显的数据
      question_id: -1,
      updateId: undefined,
      urlParam: "",
      testTitle: "",
      urlText: "", //访问网址文字
    };
  },
  mounted() {
    this.getQuestionList();
  },
  methods: {
    openDetail(group) {
      this.dialogDetail = true;
      this.idInfo = group;
    },
    showUrl(row) {
      this.dialogTest = true;
      this.urlParam = row.id;
      this.testTitle = row.title;
      this.$nextTick(() => {
        const codeHtml = document.getElementById("qrcode");
        codeHtml.innerHTML = "";
        let url = window.location.href;
        let urlarr = url.split("/");
        this.urlText = `${urlarr[0]}//${urlarr[2]}/mobile#/myassessment?&form_type=2&showSelect=0&question_id=${row.id}`;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: `${urlarr[0]}//${urlarr[2]}/mobile#/myassessment?&form_type=2&showSelect=0&question_id=${row.id}`, // 需要转换为二维码的内容
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      });
    },
    // 多个删除
    delItemList() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id: "",
        };
        if (this.selection.length > 0) {
          for (let index = 0; index < this.selection.length; index++) {
            const element = this.selection[index];
            obj.id = element.id;
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
    handleSelectionChange(selection, row) {
      this.selection = selection;
      console.log(selection);
    },
    // 搜索功能
    searchList() {
      console.log("11", this.queryParams);
      this.getQuestionList();
    },
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getQuestionList();
      console.log(`每页 ${val} 条`);
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getQuestionList();
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
    // 展示明细
    showDetail() {
      this.dialogDetail = true;
    },
    // 展示新增框
    addNew() {
      this.dialogEdit = true;
      this.typeTitle = "新增";
      this.updateId = undefined;
      this.$nextTick(() => {
        this.initParam();
        this.$refs["addAndEdit"].clearUserList();
      });
    },
    initParam() {
      this.$refs["addAndEdit"].review = {
        title: "", //评议标题
        date: ["", ""], //评议时间
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
      };
    },
    // 新增
    addNewDate() {
      let flag = this.$refs["addAndEdit"].checkFrom();
      if (flag) {
        let review = this.$refs["addAndEdit"].review;
        // let question_top_list = [];
        // review.appraisalSubject.map((item, index) => {
        //   let obj = {
        //     title: item,
        //     sort: index,
        //   };
        //   question_top_list.push(obj);
        // });
        let param = {
          title: review.title,
          type: 2,
          form_type: review.type,
          desc: review.mark,
          index_desc: review.textarea,
          start_time: review.date[0],
          end_time: review.date[1],
          is_waiver: review.isWaiver,
          is_ip: review.isIp,
          ip_value: review.accessIp,
          // question_top_list: question_top_list,
          question_user_list: review.people.split(","),
        };
        if (this.updateId) {
          param["id"] = this.updateId;
        }
        console.log("param11", param);
        SAVE_QUESTION(param).then((res) => {
          if (res.status === 0) {
            this.dialogEdit = false;
            this.getQuestionList();
            this.msgSuccess("保存成功");
          }
        });
      }
    },
    delItem() {},
    // 展示编辑框
    showEdit(row, index) {
      this.updateId = row.id;
      SAVE_QUESTION_DETAIL({
        id: row.id,
      }).then((res) => {
        if (res.status === 0) {
          this.dialogEdit = true;
          this.typeTitle = "评议编辑";
          let data = res.data;
          this.$nextTick(() => {
            this.$refs["addAndEdit"].review.title = data.title;
            this.$refs["addAndEdit"].review.type = data.type;
            this.$refs["addAndEdit"].review.type = data.form_type;
            this.$refs["addAndEdit"].review.mark = data.desc;
            this.$refs["addAndEdit"].review.textarea = data.index_desc;
            this.$refs["addAndEdit"].review.date = [
              data.start_time,
              data.end_time,
            ];
            this.$refs["addAndEdit"].review.isWaiver = data.is_waiver;
            this.$refs["addAndEdit"].review.isIp = data.is_ip;
            this.$refs["addAndEdit"].review.accessIp = data.ip_value;
            this.$refs["addAndEdit"].review.question_top_list = data.top;
            let arr = [];
            data.user_list.map((item) => {
              arr.push(item.id);
            });
            this.$refs["addAndEdit"].review.people = arr.join(","); //用于参评人员数量的的展示
            this.$refs["addAndEdit"].review.peopleList = data.user_list; //用于参评人员的table的展示
            this.$refs["addAndEdit"].review.showPeopleConut =
              data.user_list.length + "人";
          });
        }
      });
    },
    // 更新
    editData() {
      this.addNewDate();
    },
    // 打开统计弹框
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
    // 获取统计信息
    statisticalData() {},
    // 展示配置框
    showConfig(row, index) {
      setTimeout(() => {
        this.question_id = row.id;
        this.$refs.configure.drawingList = [];
      }, 500);
      this.dialogConfigure = true;
    },
    // 配置框数据提交
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
    // showPapers() {}
  },
};
</script>
<style lang="scss" scoped>
.sl_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sl_input_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sl_input {
  margin: 0 6px;
}
.sl_content {
  padding-top: 20px;
  position: relative;
  .pagination_my {
    position: absolute;
    right: 0;
    bottom: -44px;
  }
}
.sl_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}

.sl_content {
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
.sl_search
  .sl_input
  .ul_item
  .inline-input.el-input-group
  ::v-deep
  .el-input-group__append {
  padding: 0 !important;
  border: none;
}
.qrCodeUrl {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.qrCodeUrl_text {
  color: #7984a7;
  text-align: center;
  margin-top: 24px;
}
</style>