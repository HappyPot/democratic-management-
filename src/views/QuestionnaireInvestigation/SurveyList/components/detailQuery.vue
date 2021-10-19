<template>
  <div class="review">
    <div class="screen" @click="showScreen">
      <img src="../../../../assets/image/screen.png" alt="" />
    </div>
    <div class="screen_content" v-if="isShowScreen">
      <div class="pc_head">
        <div>
          <wlTreeSelect
            leaf
            width="200"
            nodeKey="title"
            placeholder="测评对象"
            style="margin-right: 10px"
            checkbox
            :data="evaluationOptions"
            @change="getTestList"
            v-model="evaluation"
          ></wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect
            checkStrictly
            width="200"
            nodeKey="unit_name"
            placeholder="选择单位"
            style="margin-right: 10px"
            checkbox
            clearable
            :data="superiorUnitOptions"
            @change="getUnitIdList"
            v-model="superiorUnit"
          >
          </wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect
            checkStrictly
            width="200"
            nodeKey="department_name"
            placeholder="选择部门"
            style="margin-right: 10px"
            checkbox
            clearable
            :data="departmentOptions"
            @change="getDepartmentIdList"
            v-model="department_id_list"
          >
          </wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect
            checkStrictly
            width="200"
            nodeKey="duty_name"
            placeholder="选择职务"
            style="margin-right: 10px"
            checkbox
            clearable
            :data="jobOptions"
            @change="getDutyIdList"
            v-model="duty_id_list"
          >
          </wlTreeSelect>
        </div>
        <div class="pc_item">
          <el-button size="small" type="primary" plain @click="search"
            >搜索</el-button
          >
        </div>
        <div class="pc_item"></div>
        <div class="pc_item"></div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="测评明细" name="first">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">{{ idInfo.name }}</div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="code" label="人员编码"> </el-table-column>
              <el-table-column prop="unit_name" label="单位名称">
              </el-table-column>
              <el-table-column prop="department_name" label="部门名称">
              </el-table-column>
              <el-table-column prop="duty_name" label="人员类别">
              </el-table-column>
              <el-table-column prop="subject_title" label="测评主体">
              </el-table-column>
              <el-table-column
                v-for="(item, index) in valueMap"
                :key="index"
                :prop="item.title"
                :label="item.value"
              >
                <template slot-scope="scope">
                  <div v-show="scope.row[item.title] == item.prop">
                    <img
                      style="width: 16px; height: 16px"
                      src="../../../../assets/image/dui.png"
                      alt=""
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="created_at" label="提交时间">
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="测评对象汇总" name="second">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">{{ idInfo.name }}</div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataEvaluation" style="width: 100%">
              <el-table-column prop="title" label="测评对象"> </el-table-column>
              <el-table-column prop="sum" label="总数"> </el-table-column>
              <el-table-column
                v-for="(item, index) in evaluationMap"
                :key="index"
                :label="item.label"
              >
                <el-table-column
                  :prop="k.prop"
                  v-for="(k, i) in item.props"
                  :key="i + 1"
                  :label="k.label"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="弃权"> </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单位汇总" name="third">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">{{ idInfo.name }}</div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataUnit" style="width: 100%">
              <el-table-column prop="unit_name" label="单位"> </el-table-column>
              <el-table-column prop="sum" label="总数"> </el-table-column>
              <el-table-column
                v-for="(item, index) in unitMap"
                :key="index"
                :label="item.label"
              >
                <el-table-column
                  :prop="k.prop"
                  v-for="(k, i) in item.props"
                  :key="i + 1"
                  :label="k.label"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="弃权"> </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="部门汇总" name="fourth">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">{{ idInfo.name }}</div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataDep" style="width: 100%">
              <el-table-column prop="department_name" label="部门">
              </el-table-column>
              <el-table-column prop="sum" label="总数"> </el-table-column>
              <el-table-column
                v-for="(item, index) in depMap"
                :key="index"
                :label="item.label"
              >
                <el-table-column
                  :prop="k.prop"
                  v-for="(k, i) in item.props"
                  :key="i + 1"
                  :label="k.label"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="弃权"> </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人员类别汇总" name="five">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">{{ idInfo.name }}</div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataPeople" style="width: 100%">
              <el-table-column prop="duty_name" label="人员类别">
              </el-table-column>
              <el-table-column prop="sum" label="总数"> </el-table-column>
              <el-table-column
                v-for="(item, index) in peopleMap"
                :key="index"
                :label="item.label"
              >
                <el-table-column
                  :prop="k.prop"
                  v-for="(k, i) in item.props"
                  :key="i + 1"
                  :label="k.label"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="弃权"> </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  GET_QUESTION_OBJECT_DETAIL,
  GET_QUESTION_UNIT_DETAIL,
  GET_QUESTION_DEPARTMENT_DETAIL,
  GET_QUESTION_DUTY_DETAIL,
  GET_QUESTION_DETAIL,
} from "@/api/questionnaireInvestigation.js";
import {
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST,
} from "@/api/personnelmanagement.js";
export default {
  name: "DetailQuery",
  props: {
    idInfo: {
      require: true,
      default: () => {},
    },
  },
  data() {
    return {
      valueMap: [], //选项与value的映射
      defaultProps: {
        children: "children",
        label: "label",
      },
      evaluation: "", //测评对象值
      evaluationOptions: [], //测评对象列表
      superiorUnit: "", //单位
      superiorUnitOptions: [], //单位列表,
      department_id_list: "", //部门
      departmentOptions: [], //部门列表
      duty_id_list: "", //职务
      jobOptions: [], //职务列表
      isShowScreen: false,
      activeName: "first", //默认标签框
      queryParams: {
        //分页参数
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [
        //测评明细
      ],
      // 部门汇总
      tableDataDep: [],
      // 人员类别
      tableDataPeople: [],
      tableDataUnit: [
        //单位汇总
      ],
      tableDataEvaluation: [
        //测评对象
        // {
        //   title: '2016-05-03',
        //   sum: '1000',
        //   p1: '1',
        //   l1: '2',
        //   p2: '3',
        //   l2: '4',
        //   p3: '5',
        //   l3: '6'
        // }
      ],
      evaluationMap: [], //测评对象的map
      unitMap: [], //单位汇总map
      depMap: [], //部门汇总map
      peopleMap: [], //部门汇总map
      selected: [], // 树下拉框选中数据
      total: 0,
      commonParam: {
        question_issue_id: this.idInfo.group.id,
        question_id: this.idInfo.group.question_id,
        duty_id_list: [],
        question_top_id_list: [],
        unit_id_list: [],
        department_id_list: [],
        page: 1,
        page_size: 10,
      },
    };
  },
  created() {
    // 单位
    this.getUnitLIst();
    // 职务
    this.getDutyList();
    // 部门
    this.getDepartmentList();

    // // 对象汇总
    // this.getQuestionObjectDetail();
    // // 单位汇总
    // this.getQuestionUnitDetail();
    // // 部门汇总
    // this.getQuestionDepartmentDetail();
    // // 人员汇总
    // this.getQuestionDutyDetail();
    // 搜索
    this.search();
  },
  methods: {
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getQuestionDetail();
      console.log(`每页 ${val} 条`);
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getQuestionDetail();
    },
    // 搜索
    search() {
      this.getQuestionObjectDetail();
      this.getQuestionUnitDetail();
      this.getQuestionDepartmentDetail();
      this.getQuestionDutyDetail();
      this.getQuestionDetail();
    },
    // 获取职务列表
    getDutyList() {
      GET_DUTY_LIST({
        subject_id: this.subjectId,
        page: 1,
        page_size: 9999,
      }).then((res) => {
        if (res.status === 0) {
          console.log("获取职务列表", res.data.data);
          this.jobOptions = res.data.data;
        }
      });
    },
    // 获取部门列表
    getDepartmentList() {
      GET_DEPARTMENT_LIST({
        subject_id: this.subjectId,
        page: 1,
        page_size: 9999,
      }).then((res) => {
        if (res.status === 0) {
          this.departmentOptions = res.data.data;
        }
      });
    },
    //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST({
        subject_id: this.subjectId,
      }).then((res) => {
        if (res.status === 0) {
          this.superiorUnitOptions = res.data;
        }
      });
    },
    // 获取测评明细
    getQuestionDetail() {
      this.commonParam.page_size = this.queryParams.page_size;
      this.commonParam.page = this.queryParams.page;
      GET_QUESTION_DETAIL(this.commonParam).then((res) => {
        if (res.status === 0) {
          this.tableData = res.data.data;
          let configarr = res.data.config.config;
          this.total = res.data.total;
          if (configarr.length > 0) {
            configarr.map((item, index) => {
              let obj = {
                prop: item.value,
                value: item.content,
                title: "value" + index,
              };
              this.valueMap.push(obj);
            });
          }
          this.tableData.map((item) => {
            for (let j = 0; j < item.value.length; j++) {
              for (let i = 0; i < this.valueMap.length; i++) {
                if (item.value[j] == this.valueMap[i].prop) {
                  item[`${this.valueMap[i].title}`] = item.value[j];
                }
              }
            }
          });
        }
      });
    },
    // 获取对象汇总
    getQuestionObjectDetail() {
      this.tableDataEvaluation = [];
      GET_QUESTION_OBJECT_DETAIL(this.commonParam).then((res) => {
        if (res.status === 0) {
          console.log("对象汇总", res.data);
          this.evaluationOptions = res.data;

          // this.tableDataEvaluation = res.data
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let obj = {
              title: element.title,
              sum: element.sum,
            };
            for (let i = 0; i < element.value.length; i++) {
              var item = element.value[i];
              let testmap = {
                label: item.question_name,
                props: [
                  {
                    label: "票",
                    prop: "p" + i,
                  },
                  {
                    label: "率",
                    prop: "l" + i,
                  },
                ],
              };
              obj["p" + i] = item.num;
              obj["l" + i] = item.ratio;
              if (index == 0) {
                this.evaluationMap.push(testmap);
              }
            }
            this.tableDataEvaluation.push(obj);
            console.log("this.tableDataEvaluation", this.tableDataEvaluation);
          }
        }
      });
    },
    // 获取单位汇总
    getQuestionUnitDetail() {
      GET_QUESTION_UNIT_DETAIL(this.commonParam).then((res) => {
        if (res.status === 0) {
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let obj = {
              unit_name: element.unit_name,
              sum: element.sum,
            };
            for (let i = 0; i < element.value.length; i++) {
              var item = element.value[i];
              let testmap = {
                label: item.unit_name,
                props: [
                  {
                    label: "票",
                    prop: "p" + i,
                  },
                  {
                    label: "率",
                    prop: "l" + i,
                  },
                ],
              };
              obj["p" + i] = item.num;
              obj["l" + i] = item.ratio;
              if (index == 0) {
                this.unitMap.push(testmap);
              }
            }
            this.tableDataUnit.push(obj);
            console.log("this.tableDataUnit", this.tableDataUnit);
          }
        }
      });
    },
    // 部门汇总
    getQuestionDepartmentDetail() {
      GET_QUESTION_DEPARTMENT_DETAIL(this.commonParam).then((res) => {
        if (res.status === 0) {
          console.log("部门汇总", res.data);
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let obj = {
              department_name: element.department_name,
              sum: element.sum,
            };
            for (let i = 0; i < element.value.length; i++) {
              var item = element.value[i];
              let testmap = {
                label: item.department_name,
                props: [
                  {
                    label: "票",
                    prop: "p" + i,
                  },
                  {
                    label: "率",
                    prop: "l" + i,
                  },
                ],
              };
              obj["p" + i] = item.num;
              obj["l" + i] = item.ratio;
              if (index == 0) {
                this.depMap.push(testmap);
              }
            }
            this.tableDataDep.push(obj);
            console.log("this.tableDataDep", this.tableDataDep);
          }
        }
      });
    },
    // 人员汇总
    getQuestionDutyDetail() {
      GET_QUESTION_DUTY_DETAIL(this.commonParam).then((res) => {
        if (res.status === 0) {
          console.log("人员汇总", res.data);
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let obj = {
              duty_name: element.duty_name,
              sum: element.sum,
            };
            for (let i = 0; i < element.value.length; i++) {
              var item = element.value[i];
              let testmap = {
                label: item.duty_name,
                props: [
                  {
                    label: "票",
                    prop: "p" + i,
                  },
                  {
                    label: "率",
                    prop: "l" + i,
                  },
                ],
              };
              obj["p" + i] = item.num;
              obj["l" + i] = item.ratio;
              if (index == 0) {
                this.peopleMap.push(testmap);
              }
            }
            this.tableDataPeople.push(obj);
            console.log("this.tableDataDep", this.tableDataPeople);
          }
        }
      });
    },
    handleSelectionChange(val) {},
    // 打开筛选款
    showScreen() {
      this.isShowScreen = !this.isShowScreen;
    },
    // 获取测评对象idlist
    getTestIdList(val) {
      val.map((item) => {
        this.commonParam.question_top_id_list.push(item.id);
      });
    },
    // 获取单位idlist
    getUnitIdList(val) {
      val.map((item) => {
        this.commonParam.unit_id_list.push(item.id);
      });
    },
    // 获取部门idlist
    getDepartmentIdList(val) {
      val.map((item) => {
        this.commonParam.department_id_list.push(item.id);
      });
    },
    // 获取职务idlist
    getDutyIdList(val) {
      val.map((item) => {
        this.commonParam.duty_id_list.push(item.id);
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
  width: 16px;
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
  width: 936px;
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
}
.baseInfo_item {
  margin-bottom: 16px;
}
.pc_head {
  display: flex;
  .pc_item {
    width: 200px;
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
</style>