<template>
  <div class="review">
    <div class="screen">
      <div class="screen_item"
           @click="showScreen">
        <img src="../../../../assets/image/screen.svg"
             style="margin-right: 4px;"
             alt="" />
        <div>筛选</div>
      </div>
      <div class="screen_item"
           @click="getexport">
        <img style="margin-left: 20px;margin-right: 4px;"
             src="../../../../assets/image/exportlist.svg"
             alt="" />
        <div>导出数据</div>
      </div>

    </div>
    <div class="screen_content"
         v-if="isShowScreen">
      <div class="pc_head">
        <div>
          <wlTreeSelect leaf
                        width="200"
                        nodeKey="title"
                        placeholder="测评对象"
                        style="margin-right: 10px"
                        :data="evaluationOptions"
                        @change="getTestIdList"
                        v-model="evaluation"></wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect checkStrictly
                        width="200"
                        nodeKey="unit_name"
                        placeholder="选择单位"
                        style="margin-right: 10px"
                        clearable
                        :data="superiorUnitOptions"
                        @change="getUnitIdList"
                        v-model="superiorUnit">
          </wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect checkStrictly
                        width="200"
                        nodeKey="department_name"
                        placeholder="选择部门"
                        style="margin-right: 10px"
                        clearable
                        :data="departmentOptions"
                        @change="getDepartmentIdList"
                        v-model="department_id_list">
          </wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect checkStrictly
                        width="200"
                        nodeKey="duty_name"
                        placeholder="选择职务"
                        style="margin-right: 10px"
                        clearable
                        :data="jobOptions"
                        @change="getDutyIdList"
                        v-model="duty_id_list">
          </wlTreeSelect>
        </div>
        <div class="pc_item">
          <el-button size="small"
                     type="primary"
                     plain
                     @click="search">搜索</el-button>
        </div>
        <div class="pc_item"></div>
        <div class="pc_item"></div>
      </div>
    </div>
    <div class="baseInfo">
      <div class="baseInfo_item">
        <div class="bt_title">{{ idInfo.name }}</div>
      </div>
      <!-- 表格部分 -->
      <div class="base_table">
        <el-table :data="tableData"
                  v-loading="loading"
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"> </el-table-column>
          <el-table-column prop="code"
                           label="人员编码"> </el-table-column>
          <el-table-column prop="unit_name"
                           label="单位名称"> </el-table-column>
          <el-table-column prop="department_name"
                           label="部门名称"> </el-table-column>
          <el-table-column prop="duty_name"
                           show-overflow-tooltip
                           label="人员类别"> </el-table-column>
          <el-table-column prop="duty_name"
                           show-overflow-tooltip
                           label="评价内容">
            <template slot-scope="scope">
              {{scope.row.value}}
            </template>
          </el-table-column>
          <el-table-column prop="created_at"
                           show-overflow-tooltip
                           label="提交时间"> </el-table-column>
        </el-table>
        <div class="pagination_my">
          <el-pagination v-show="total > 0"
                         :total="total"
                         :page-size="commonParam.page_size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :page-sizes="[10, 20, 30, 40]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GET_QUESTION_OBJECT_DETAIL,
  GET_QUESTION_UNIT_DETAIL,
  GET_QUESTION_DEPARTMENT_DETAIL,
  GET_QUESTION_DUTY_DETAIL,
  GET_QUESTION_DETAIL,
  GET_OBJECT,
  GET_EXPORT
} from '@/api/questionnaireInvestigation.js'
import {
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST
} from '@/api/personnelmanagement.js'
export default {
  name: 'DetailQueryText',
  props: {
    idInfo: {
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      valueMap: [], //选项与value的映射
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      evaluation: '', //测评对象值
      evaluationOptions: [], //测评对象列表
      superiorUnit: '', //单位
      superiorUnitOptions: [], //单位列表,
      department_id_list: '', //部门
      departmentOptions: [], //部门列表
      duty_id_list: '', //职务
      jobOptions: [], //职务列表
      isShowScreen: false,
      activeName: 'second', //默认标签框
      queryParams: {
        //分页参数
        page: 1,
        page_size: 10
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
      loading: false,
      commonParam: {
        question_issue_id: this.idInfo.group.id,
        question_id: this.idInfo.group.question_id,
        question_top_id: '',
        duty_id: '',
        unit_id: '',
        department_id: '',
        page: 1,
        page_size: 10
      }
    }
  },
  created() {
    // 单位
    this.getUnitLIst()
    // 职务
    this.getDutyList()
    // 部门
    this.getDepartmentList()
    this.getObject()
    // 搜索
    this.search()
  },
  methods: {
    getexport() {
      let map = {
        second: 1,
        third: 2,
        fourth: 3,
        five: 4
      }
      this.commonParam['type'] = map[this.activeName]
      GET_EXPORT(this.commonParam).then(res => {
        const blob = new Blob([res])
        const fileName = '数据.xls'
        const link = document.createElement('a')
        link.download = fileName
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      })
    },
    // 获取测评主体
    getObject() {
      GET_OBJECT({
        question_id: this.commonParam.question_id
      }).then(res => {
        if (res.status === 0) {
          this.evaluationOptions = res.data
        }
      })
    },
    // 设置每页条数
    handleSizeChange(val) {
      this.commonParam.page_size = val
      this.getQuestionDetail()
      console.log(`每页 ${val} 条`)
    },
    // 触发分页
    handleCurrentChange(val) {
      this.commonParam.page = val
      this.getQuestionDetail()
    },
    // 搜索
    search() {
      this.getQuestionDetail()
    },
    // 获取职务列表
    getDutyList() {
      GET_DUTY_LIST({
        subject_id: this.subjectId,
        page: 1,
        page_size: 9999
      }).then(res => {
        if (res.status === 0) {
          console.log('获取职务列表', res.data.data)
          this.jobOptions = res.data.data
        }
      })
    },
    // 获取部门列表
    getDepartmentList() {
      GET_DEPARTMENT_LIST({
        subject_id: this.subjectId,
        page: 1,
        page_size: 9999
      }).then(res => {
        if (res.status === 0) {
          this.departmentOptions = res.data.data
        }
      })
    },
    //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST({
        subject_id: this.subjectId
      }).then(res => {
        if (res.status === 0) {
          this.superiorUnitOptions = res.data
        }
      })
    },
    // 获取测评明细
    getQuestionDetail() {
      // this.commonParam.page_size = this.queryParams.page_size
      // this.commonParam.page = this.queryParams.page
      this.loading = true
      GET_QUESTION_DETAIL(this.commonParam).then(res => {
        if (res.status === 0) {
          this.loading = false
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },

    handleSelectionChange(val) {},
    // 打开筛选款
    showScreen() {
      this.isShowScreen = !this.isShowScreen
    },
    // 获取测评对象idlist
    getTestIdList(val) {
      this.commonParam.question_top_id = val[0].id
      // val.map(item => {
      //   this.commonParam.question_top_id.push(item.id)
      // })
    },
    // 获取单位idlist
    getUnitIdList(val) {
      this.commonParam.unit_id = val[0].id
      // val.map(item => {
      //   this.commonParam.unit_id_list.push(item.id)
      // })
    },
    // 获取部门idlist
    getDepartmentIdList(val) {
      this.commonParam.department_id = val[0].id
      // val.map(item => {
      //   this.commonParam.department_id_list.push(item.id)
      // })
    },
    // 获取职务idlist
    getDutyIdList(val) {
      this.commonParam.duty_id = val[0].id
      // val.map(item => {
      //   this.commonParam.duty_id_list.push(item.id)
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../common/index.scss';
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
.screen_item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>