<template>
  <d2-container class="page" v-loading="loading">
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
            :disabled="selection.length == 0 || selection.length > 1"
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
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="title" label="标题名称">
          <template slot-scope="scope">
            <el-popover
              placement="right-end"
              width="200"
              trigger="hover"
              @show="showUrl(scope.row)"
            >
              <div
                ref="qrCodeUrl"
                :id="'qrcode' + scope.row.id"
                class="qrCodeUrl"
              ></div>
              <div class="qrCodeUrl_text">地址：{{ urlText }}</div>
              <el-button type="text" slot="reference">
                {{ scope.row.title }}</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="start_time" label="测评时间">
          <template slot-scope="scope">
            {{ scope.row.start_time }}至{{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column prop="form_type" label="评议类型" width="120">
          <template slot-scope="scope">
            {{ scope.row.form_type == 1 ? "定向评议" : "社会评议" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
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
        <el-table-column
          prop="isEnable"
          label="是否启用"
          show-overflow-tooltip
          width="140"
        >
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].isEnable"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link
              type="primary"
              v-show="scope.row.form_type == 1"
              style="margin-right: 12px"
              @click="showTestRate(scope.row, scope.$index)"
              >查看参评率</el-link
            >
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
    <!-- 新增与编辑-->
    <el-dialog
      :title="typeTitle"
      center
      top="4vh"
      class="dialogSelf"
      :visible.sync="dialogReview"
      :close-on-click-modal="false"
      width="700px"
    >
      <Review
        v-if="dialogReview"
        ref="review"
        :parentData="parentData"
      ></Review>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          v-show="typeTitle == '评议添加'"
          v-preventReClick
          @click="addNewDate"
          >确 定</el-button
        >
        <el-button
          type="primary"
          v-show="typeTitle == '评议编辑'"
          @click="editData"
          >确 定</el-button
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
      :close-on-click-modal="false"
      width="972px"
    >
      <Statistics
        :statisticsData="statisticsData"
        @openDetail="openDetail"
        v-if="dialogStatistics"
      ></Statistics>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogStatistics = false"
          >确 定</el-button
        >
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
      :close-on-click-modal="false"
      width="1000px"
    >
      <Configure ref="configure" v-if="dialogConfigure"></Configure>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="configData">确 定</el-button>
        <el-button @click="dialogConfigure = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 明细查询 -->
    <el-dialog
      title="明细查询"
      center
      :before-close="closeDetail"
      class="dialogSelf"
      :visible.sync="dialogDetail"
      :close-on-click-modal="false"
      width="1000px"
    >
      <DetailQuery v-if="dialogDetailRadio" :idInfo="idInfo"></DetailQuery>
      <DetailQueryText
        v-if="dialogDetailText"
        :idInfo="idInfo"
      ></DetailQueryText>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDetail">确 定</el-button>
        <el-button @click="closeDetail">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 二维码 -->
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
    <!--查看参评率 -->
    <el-dialog
      title="查看参评率"
      center
      :visible.sync="dialogTestRate"
      :close-on-click-modal="false"
      width="1050px"
    >
      <div class="testRate">
        <div class="exportList" @click="exportExcel">
          <img src="../../../assets/image/exportlist.svg" alt="" /> 批量导出
        </div>
        <el-table
          :data="tableDataTestRate"
          v-loading="tableDataTestRateLoading"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="unit_name" label="单位名称"> </el-table-column>
          <el-table-column prop="user_total" label="总人数"> </el-table-column>
          <el-table-column prop="cyrs" label="参与人数"> </el-table-column>
          <el-table-column prop="bl" label="参评率">
            <template slot-scope="scope"> {{ scope.row.bl }}% </template>
          </el-table-column>
          <el-table-column prop="no_cyrs" label="未参与测评人数">
            <template slot-scope="scope">
              <el-link type="primary" @click="showNoTest(scope.row)">{{
                scope.row.no_cyrs
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="wc_rs" label="完成人数"> </el-table-column>
          <el-table-column prop="wc_rs_bl" label="完成率"> </el-table-column>
          <el-table-column prop="no_wc_rs" label="未完成人数">
            <template slot-scope="scope">
              <el-link type="primary" @click="showNoTestPeople(scope.row)">{{
                scope.row.no_wc_rs
              }}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTestRate = false"
          >确 定</el-button
        >
        <el-button @click="dialogTestRate = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--未参与人数 -->
    <el-dialog
      title="未参与人数"
      center
      :visible.sync="dialogTestRateNo"
      :close-on-click-modal="false"
      width="1000px"
    >
      <div class="testRate">
        <div class="exportList" @click="getQuestionNotInExprot">
          <img src="../../../assets/image/exportlist.svg" alt="" /> 批量导出
        </div>
        <div class="testRateNo">
          <el-table
            :data="tableDataTestRateNo"
            height="600"
            v-loading="tableDataTestRateLoadingNo"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="code" label="人员账号"> </el-table-column>
            <el-table-column prop="unit_name" label="单位名称">
            </el-table-column>
            <el-table-column prop="department_name" label="部门名称">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTestRateNo = false"
          >确 定</el-button
        >
        <el-button @click="dialogTestRateNo = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 社会评议人员 -->
    <el-dialog
      title="社会公众评议"
      center
      :visible.sync="dialogPublic"
      :close-on-click-modal="false"
      width="1000px"
    >
      <div class="testRate">
        <div class="em_input" style="width: 260px; margin-bottom: 16px">
          <div class="ul_item">
            <el-input
              class="inline-input"
              size="medium"
              v-model="searchValue"
              placeholder="搜索关键词"
            >
              <template slot="append">
                <div class="search_append" @click="searchPublicList">搜索</div>
              </template>
            </el-input>
          </div>
        </div>
        <div class="exportList" @click="getPublicExprot">
          <img src="../../../assets/image/exportlist.svg" alt="" /> 批量导出
        </div>
        <div class="testRateNo">
          <el-table
            :data="tableDataPublic"
            height="600"
            v-loading="tableDataPublicLoading"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column
              prop="title"
              show-overflow-tooltip
              label="测评主体"
            >
            </el-table-column>
            <el-table-column prop="user_name" label="人员"> </el-table-column>
            <el-table-column
              prop="value"
              show-overflow-tooltip
              label="评价内容"
            >
            </el-table-column>
            <el-table-column prop="created_at" label="提交时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span
        slot="
                             footer"
        class="dialog-footer"
      >
        <el-button type="primary" @click="dialogTestRateNo = false"
          >确 定</el-button
        >
        <el-button @click="dialogTestRateNo = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 未完成人数 -->
    <el-dialog
      title="未完成人信息"
      center
      :visible.sync="dialogTestRateNoPeople"
      :close-on-click-modal="false"
      width="1000px"
    >
      <div class="testRate">
        <div class="exportList" @click="getQuestionUnitNoWcInfoExport">
          <img src="../../../assets/image/exportlist.svg" alt="" /> 批量导出
        </div>
        <div class="testRateNo">
          <el-table
            :data="tableDataTestRateNoPeople"
            height="600"
            v-loading="tableDataTestRateLoadingNoPeople"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="code" label="人员账号"> </el-table-column>
            <el-table-column prop="unit_name" label="单位名称">
            </el-table-column>
            <el-table-column prop="department_name" label="部门名称">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTestRateNo = false"
          >确 定</el-button
        >
        <el-button @click="dialogTestRateNo = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import Review from "./components/review";
import Statistics from "@/views/Sharing/components/statistics";
import Configure from "@/views/Sharing/components/configure";
import DetailQuery from "../../QuestionnaireInvestigation/SurveyList/components/detailQuery";
import DetailQueryText from "../../QuestionnaireInvestigation/SurveyList/components/detailQueryText";

import {
  GET_QUESTION_LIST,
  GET_COUNT_QUESTION,
  BACK_QUESTION_CONFIG,
  GET_QUESTIONNOTIN,
  GET_QUESTIONNOTIN_EXPORT,
  GET_SOCIOLOGY_LIST,
  GET_SOCIOLOGY_EXPORT,
  GET_QUESTION_UNIT_NOWCINFO,
  GET_QUESTION_UNIT_NOWCINFO_EXPORT,
} from "@/api/questionnaireInvestigation.js";
import {
  SAVE_QUESTION,
  SAVE_QUESTION_DETAIL,
  SAVE_QUESTION_CONFIG,
  DEL_QUESTION,
  GET_QUESTION_UNIY_BL,
  GET_UNIY_BL_EXPORT,
} from "@/api/evaluationanagement.js";
import QRCode from "qrcodejs2";
import { mapState } from "vuex";
export default {
  components: {
    Review,
    Configure,
    Statistics,
    DetailQuery,
    DetailQueryText,
  },
  data() {
    return {
      testNoUnitPeopleId: undefined,
      dialogTestRateNoPeople: false,
      tableDataTestRateLoadingNoPeople: false,
      tableDataPublic: [], //社会公众评议列表
      tableDataPublicLoading: false, //社会公众评议列表loading
      testNoUnitId: 0,
      dialogTestRateNo: false, //未参与人数
      dialogTestRateNoPeople: false, //未参与人数
      tableDataTestRateLoading: false, //参评率loading
      tableDataTestRateLoadingNo: false, //未参评率loading
      loading: false,
      tableDataTestRate: [], //查看参评率
      tableDataTestRateNo: [], //未参与人数
      tableDataTestRateNoPeople: [], //未完成人数

      idInfo: {}, //包含id和question_id
      selection: [], //表格中被选中的
      typeTitle: "评议添加", //评议添加,评议编辑
      dialogPublic: false, //社会公众评议显示隐藏
      dialogReview: false, //控制新增和编辑
      dialogStatistics: false, //控制统计框
      dialogConfigure: false, //控制配置框
      dialogPapers: false, //控制低稿框
      dialogDetail: false, //明细查询
      dialogDetailRadio: false, //单选明细查询
      dialogDetailText: false, //文本明细查询
      dialogTest: false, //测试地址二维码
      dialogTestRate: false, //查看参评率
      searchValue: "", //搜索值
      restaurants: [],
      tableData: [],
      parentData: {}, //编辑组件中的数据
      //分页参数
      queryParams: {
        page: 1,
        page_size: 10,
        search_name: "",
        type: 1,
      },
      total: 0,
      statisticsData: [], //统计回显的数据
      question_id: -1,
      updateId: undefined,
      urlParam: "",
      testTitle: "",
      urlText: "", //访问网址文字
      testRateId: undefined, //查看参评率id
      publicExprotId: undefined, //社会评议导出id
      searchValue: "", //社会评议搜索值
    };
  },
  mounted() {
    this.subjectId = localStorage.getItem("evaluation_id");
    this.getQuestionList();
  },
  methods: {
    // 导出未完成人数
    getQuestionUnitNoWcInfoExport() {
      GET_QUESTION_UNIT_NOWCINFO_EXPORT({
        unit_id: this.testNoUnitPeopleId,
      }).then((res) => {
        const blob = new Blob([res]);
        const fileName = "未完成人信息数据.xls";
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
    //获取单位未完成人数
    getQuestionUnitNoWcInfo(unitid) {
      this.tableDataTestRateLoadingNoPeople = true;
      GET_QUESTION_UNIT_NOWCINFO({
        unit_id: this.testNoUnitPeopleId,
      }).then((res) => {
        this.tableDataTestRateNoPeople = res.data;
        this.tableDataTestRateLoadingNoPeople = false;
      });
    },
    //搜索社会
    searchPublicList() {
      let obj = {
        question_id: this.publicExprotId,
        search: this.searchValue,
      };
      GET_SOCIOLOGY_LIST(obj).then((res) => {
        this.dialogPublic = true;
        this.loading = false;
        this.tableDataPublic = res.data;
      });
    },
    // 社会评议导出
    getPublicExprot() {
      let obj = {
        question_id: this.publicExprotId,
        search: this.searchValue,
      };
      GET_SOCIOLOGY_EXPORT(obj).then((res) => {
        const blob = new Blob([res]);
        const fileName = "社会公众评议数据.xls";
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
    // 未参与人员导出
    getQuestionNotInExprot() {
      GET_QUESTIONNOTIN_EXPORT({
        unit_id: this.testNoUnitId,
      }).then((res) => {
        const blob = new Blob([res]);
        const fileName = "未参与人员数据.xls";
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
    // 展示未参与人员
    showNoTest(row) {
      this.testNoUnitId = row.unit_id;
      this.dialogTestRateNo = true;
      this.getQuestionNotIn();
    },
    // 展示未完成人信息
    showNoTestPeople(row) {
      this.testNoUnitPeopleId = row.unit_id;
      this.dialogTestRateNoPeople = true;
      this.getQuestionUnitNoWcInfo();
    },
    // 未参与人员列表
    getQuestionNotIn() {
      this.tableDataTestRateLoadingNo = true;
      GET_QUESTIONNOTIN({
        unit_id: this.testNoUnitId,
      }).then((res) => {
        this.tableDataTestRateLoadingNo = false;
        this.tableDataTestRateNo = res.data;
      });
    },
    // 关闭明细
    closeDetail() {
      this.dialogDetail = false;
      this.dialogDetailRadio = false;
      this.dialogDetailText = false;
    },
    // 导出excel表
    exportExcel() {
      let obj = {
        question_id: this.testRateId,
      };
      GET_UNIY_BL_EXPORT(obj).then((res) => {
        const blob = new Blob([res]);
        const fileName = "参评率数据.xls";
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
    // 查看参评率
    showTestRate(row) {
      this.dialogTestRate = true;
      this.tableDataTestRateLoading = true;
      this.testRateId = row.id;
      let obj = {
        question_id: row.id,
      };
      GET_QUESTION_UNIY_BL(obj).then((res) => {
        if (res.status == 0) {
          this.tableDataTestRateLoading = false;
          this.tableDataTestRate = res.data;
        }
      });
    },
    showUrl(row) {
      this.urlParam = row.id;
      this.testTitle = row.title;
      this.$nextTick(() => {
        const codeHtml = document.getElementById("qrcode" + row.id);
        codeHtml.innerHTML = "";
        let url = window.location.href;
        let urlarr = url.split("/");
        this.urlText = `${urlarr[0]}//${urlarr[2]}/mobile#/myassessment?showSelect=0&question_id=${row.id}&form_type=${row.form_type}`;
        var qrcode = new QRCode(codeHtml, {
          text: `${urlarr[0]}//${urlarr[2]}/mobile#/myassessment?showSelect=0&question_id=${row.id}&form_type=${row.form_type}`, // 需要转换为二维码的内容
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      });
    },
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
    // 搜索功能
    searchList() {
      console.log("11", this.queryParams);
      this.getQuestionList();
    },
    openDetail(group) {
      this.dialogDetail = true;
      if (group.text.indexOf("文本") > -1) {
        this.dialogDetailText = true;
      } else {
        this.dialogDetailRadio = true;
      }
      this.idInfo = group;
    },
    // 获取测评列表
    getQuestionList() {
      GET_QUESTION_LIST(this.queryParams).then((res) => {
        if (res.status === 0) {
          this.tableData = res.data.data;
          // this.tableData = [];
          this.total = res.data.total;
        }
      });
    },
    // 展示编辑框
    showEdit(row, index) {
      this.updateId = row.id;
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
            this.$refs["review"].review.date = [data.start_time, data.end_time];
            this.$refs["review"].review.isWaiver = data.is_waiver;
            this.$refs["review"].review.isIp = data.is_ip;
            this.$refs["review"].review.accessIp = data.ip_value;
            this.$refs["review"].review.appraisalSubject = [];
            data.top.map((item) => {
              this.$refs["review"].review.appraisalSubject.push(item.title);
            });
            // this.$refs["review"].review.appraisalSubject = data.top;
            let arr = [];
            if (data.user_list && data.user_list.length > 0) {
              data.user_list.map((item) => {
                arr.push(item.id);
              });
            }
            this.$refs["review"].review.people = arr.join(","); //用于参评人员数量的的展示
            this.$refs["review"].review.peopleList = data.user_list; //用于参评人员的table的展示
            this.$refs["review"].review.originPeopleList = data.user_list; //用于参评人员的table的展示
            this.$refs["review"].review.showPeopleConut =
              data.user_list.length + "人";
          });
        }
      });
    },
    // 更新
    editData() {
      this.addNewDate();
    },
    // 展示统计框
    showStatistical(row, index) {
      this.loading = true;
      this.publicExprotId = row.id;
      if (row.form_type == 2) {
        this.searchPublicList();
      } else {
        let obj = {
          page_size: this.queryParams.page_size,
          page: this.queryParams.page,
          question_id: row.id,
        };
        console.log("统计查询参数", obj);
        GET_COUNT_QUESTION(obj).then((res) => {
          this.dialogStatistics = true;
          this.loading = false;
          let map = res.data[0].config;
          this.statisticsData = res.data;
          console.log("this.statisticsData", this.statisticsData);
          if (res.status === 0) {
            console.log("统计返回值", res.data);
          }
        });
      }
    },
    // 统计数据提交
    statisticalData() {},
    // 展示配置框
    showConfig(row, index) {
      BACK_QUESTION_CONFIG({
        question_id: row.id,
      }).then((res) => {
        if (res.status == 0) {
          this.dialogConfigure = true;
          setTimeout(() => {
            if (res.data.length > 0) {
              let map = {
                2: "TextCom",
                1: "RadioCom",
                3: "CheckboxCom",
                4: "SingleText",
                5: "MultilineText",
              };
              let arr = [];
              res.data.map((item) => {
                let obj = {
                  id: item.id,
                  type: map[item.type],
                  typeParam: item.type,
                  des: item.issue,
                  value: item.issue,
                  uuid: this.uuid.v1(),
                  config: {
                    value: item.issue,
                    title: item.issue,
                    valueArr: item.config,
                  },
                };
                arr.push(obj);
              });
              this.$refs.configure.drawingList = arr;
            } else {
              this.$refs.configure.drawingList = [];
            }
            this.question_id = row.id;
          }, 500);
        }
      });
    },
    // 配置框数据提交 保存测评
    configData() {
      let obj = {
        question_id: this.question_id,
        issue_list: this.$refs["configure"].issue_list,
      };
      console.log("obj==========", obj);
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
    },
    // 展示新增框
    addNew() {
      this.updateId = undefined;
      this.dialogReview = true;
      this.typeTitle = "评议添加";
      this.$nextTick(() => {
        this.initParam();
        this.$refs["review"].clearUserList();
      });
    },
    initParam() {
      this.$refs["review"].review = {
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
          type: 1,
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
        if (this.updateId) {
          param["id"] = this.updateId;
        }
        console.log("param11", param);
        SAVE_QUESTION(param).then((res) => {
          if (res.status === 0) {
            this.dialogReview = false;
            this.msgSuccess("保存成功");
            this.getQuestionList();
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
.testRate {
  position: relative;
  .exportList {
    position: absolute;
    right: 23px;
    top: -28px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
}
.em_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.testRateNo {
  overflow: auto;
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
.testRate
  .em_input
  .ul_item
  .inline-input.el-input-group
  ::v-deep
  .el-input-group__append {
  padding: 0 !important;
  border: none;
}

.testRateNo ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}
</style>