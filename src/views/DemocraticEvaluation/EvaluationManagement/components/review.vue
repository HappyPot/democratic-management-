<template>
  <div class="review">
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="first">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">评议标题</div>
            <div class="bt_input">
              <el-input size="medium"
                        v-model="review.title"></el-input>
              <span class="errorTip"
                    data-name="title">
                <i class="el-icon-circle-close"></i>
                请输入评议标题，在提交</span>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">评议时间</div>
            <div class="bt_input">
              <el-date-picker v-model="review.date"
                              type="daterange"
                              style="width:500px"
                              value-format="yyyy-MM-dd"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
              <span class="errorTip"
                    data-name="date">
                <i class="el-icon-circle-close"></i>
                请选择评议时间，在提交</span>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">评议说明</div>
            <div class="bt_input">
              <el-input size="medium"
                        type="textarea"
                        :rows="2"
                        v-model="review.mark"></el-input>
              <span class="errorTip"
                    data-name="mark">
                <i class="el-icon-circle-close"></i>
                请输入评议说明，在提交</span>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">是否同IP参评</div>
            <div class="bt_input">
              <el-radio-group v-model="review.isIp">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">允许IP段</div>
            <div class="bt_input">
              <el-input size="medium"
                        type="textarea"
                        :rows="2"
                        v-model="review.accessIp"></el-input>
              <span class="errorTip"
                    data-name="accessIp">
                <i class="el-icon-circle-close"></i>
                请输入允许IP段，在提交</span>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">评议类型</div>
            <div class="bt_input">
              <el-radio-group v-model="review.type">
                <el-radio :label="1">定向评议</el-radio>
                <el-radio :label="2">社会评议</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="baseInfo_item">
            <div class="bt_title">参评人员</div>
            <div class="bt_input">
              <el-input v-model="review.showPeopleConut"
                        style="width: 500px"
                        size="medium"
                        placeholder="请选择参评人员"
                        @focus="selectPeople" />
              <span class="errorTip"
                    data-name="people">
                <i class="el-icon-circle-close"></i>
                请选择参评人员，在提交</span>
            </div>
          </div>
          <div class="baseInfo_group">
            <div class="baseInfo_item">
              <div class="bt_title">是否允许弃权</div>
              <div class="bt_input"
                   style="width: 376px">
                <el-radio-group v-model="review.isWaiver">
                  <div class="radio_item">
                    <el-radio :label="1">是</el-radio>
                  </div>
                  <div class="radio_item">
                    <el-radio :label="2">否</el-radio>
                  </div>
                </el-radio-group>
              </div>
            </div>
            <div class="baseInfo_item">
              <div class="bt_title">评议状态</div>
              <div class="bt_input"
                   style="width: 200px">
                <el-radio-group v-model="review.status">
                  <div class="radio_item">
                    <el-radio :label="1">是</el-radio>
                  </div>
                  <div class="radio_item">
                    <el-radio :label="2">否</el-radio>
                  </div>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="首页说明"
                   name="second">
        <div style="position: relative; margin-bottom: 20px">
          <div>
            <el-input type="textarea"
                      style="width: 500px"
                      :rows="28"
                      placeholder="请输入首页说明"
                      v-model="review.textarea">
            </el-input>
          </div>
          <span class="errorTip"
                data-name="textarea">
            <i class="el-icon-circle-close"></i> 请输入首页说明，在提交</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="参评人员"
                   name="third">
        <div class="people_content">
          <div class="pc_head">
            <div>
              <wlTreeSelect checkStrictly
                            width="140"
                            placeholder="选择单位"
                            style="margin-right: 10px"
                            checkbox
                            :data="superiorUnitOptions"
                            @change="getSuperiorUnit"
                            v-model="searchParam.unit">
              </wlTreeSelect>
            </div>
            <div>
              <el-select v-model="searchParam.department"
                         class="pc_item"
                         size="medium"
                         placeholder="选择部门">
                <el-option v-for="item in departmentOptions"
                           :key="item.department_code"
                           :label="item.department_name"
                           :value="item.department_name">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="searchParam.peopleType"
                         class="pc_item"
                         size="medium"
                         placeholder="选择人员类别">
                <el-option v-for="item in jobOptions"
                           :key="item.duty_name"
                           :label="item.duty_name"
                           :value="item.duty_name">
                </el-option>
              </el-select>
            </div>
            <div class="pc_item">
              <el-button size="medium"
                         type="primary"
                         @click="filter"
                         plain>搜索</el-button>
            </div>
            <div class="pc_item"></div>
            <div class="pc_item"></div>
          </div>
          <div class="people_table">
            <el-table ref="multipleTable"
                      tooltip-effect="dark"
                      height="520"
                      :data="peopleTableData"
                      @selection-change="handleSelectionChange"
                      style="width: 100%">
              <el-table-column type="selection"
                               width="55"> </el-table-column>
              <el-table-column prop="code"
                               label="人员编号"> </el-table-column>
              <el-table-column prop="unit_name"
                               label="单位名称"> </el-table-column>
              <el-table-column prop="department_name"
                               label="部门名称">
              </el-table-column>
              <el-table-column prop="duty_name"
                               label="人员类别">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评议主体"
                   name="fourth">
        <div class="appraisal_subject">
          <div class="baseInfo_item"
               v-for="(item, index) in review.appraisalSubject"
               :key="index">
            <div class="bt_title">评议主体{{ index + 1 }}</div>
            <div class="bt_input">
              <el-input size="medium"
                        v-model="review.appraisalSubject[index]"></el-input>
              <span class="errorTip errorsubject"
                    data-name="appraisalSubject">
                <i class="el-icon-circle-close"></i> 请输入评议主体{{
                  index + 1
                }}，在提交</span>
              <div class="del_btn"
                   @click="delSubject">
                <i class="el-icon-delete"
                   style="color: red"></i>
              </div>
            </div>
          </div>
          <div>
            <el-button type="primary"
                       size="medium"
                       icon="el-icon-plus"
                       plain
                       @click="addSubject">添加主体</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  GET_USER_LIST,
  SAVE_USER,
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST
} from '@/api/personnelmanagement.js'
export default {
  name: 'Review',
  data() {
    return {
      activeName: 'third',
      peopleOptions: [], //参评人员列表
      review: {
        title: '', //评议标题
        date: [], //评议时间
        mark: '', //评议说明
        isIp: 1, //是否同IP参评
        accessIp: '', //允许IP段
        type: 1, //评议类型
        isWaiver: 1, //是否允许弃权
        status: 1, //评议状态
        people: '', //参评人员
        showPeopleConut: 0, //参评人员数量
        peopleList: [], //参评人员具体对象
        textarea: '', //首页说明
        appraisalSubject: [1, 2, 3, 5, 6] //评议主体
      },
      unit: '', //单位
      department: '', //部门
      departmentOptions: [], //部门列表
      peopleType: '', //人员类别
      peopleTableData: [], //人员类别列表
      superiorUnitOptions: [], //单位列表
      departmentOptions: [], //部门列表
      jobOptions: [], //职务列表
      subjectId: '',
      //搜索条件
      searchParam: {
        unit: '',
        department: '',
        peopleType: ''
      },
      selectPeople: []
    }
  },
  created() {
    this.getUnitLIst()
    // 职务
    this.getDutyList()
    // 部门
    this.getDepartmentList()
    // 员工
    this.getUserList()
  },
  watch: {
    review: {
      handler(newVal, oldVal) {
        this.selectPeople = newVal.peopleList
      },
      deep: true
    }
  },

  methods: {
    // 测试
    test(rows) {
      rows.forEach(row => {
        debugger
        this.$refs.multipleTable.toggleRowSelection(row, true)
      })
    },
    // 获取员工列表
    getUserList() {
      GET_USER_LIST().then(res => {
        if (res.status === 0) {
          this.peopleTableData = res.data.data
          this.originList = res.data.data
          this.$nextTick(() => {
            if (this.selectPeople.length > 0) {
              this.selectPeople.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(
                  this.peopleTableData.find(item => {
                    return row.id == item.id
                  }),
                  true
                )
              })
            }
          })
        }
      })
    },
    filter() {
      console.log('搜索条件', this.searchParam)
      this.peopleTableData = this.originList.filter(item => {
        return (
          item.department_name == this.department ||
          item.duty_name == this.searchParam.peopleType ||
          item.unit_name == this.searchParam.unit[0].unit_name
        )
      })
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
          console.log('获取部门列表', res.data.data)
        }
      })
    },
    // //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST({
        subject_id: this.subjectId
      }).then(res => {
        if (res.status === 0) {
          this.superiorUnitOptions = res.data
        }
      })
    },
    // 选择参选人员
    handleSelectionChange(val) {
      console.log('参选人员', val)
      // this.review.peopleList = val
      // this.review.people = ''
      // let arr = []
      // val.map(item => {
      //   arr.push(item.id)
      // })
      // this.review.people = arr.join(',')
      // this.review.showPeopleConut = arr.length + '人'
      // console.log('aaaa', this.review.people)
    },
    // 跳转到选择人员
    selectPeople() {
      this.activeName = 'third'
    },
    // 表单校验
    checkFrom() {
      this.fromValidate(this.review)
      // 校验评议主体
      let arr = Array.from(document.getElementsByClassName('errorsubject'))
      for (
        let index = 0;
        index < this.review.appraisalSubject.length;
        index++
      ) {
        const element = this.review.appraisalSubject[index]
        if (!this.review.appraisalSubject[index]) {
          arr[index].style.display = 'block'
        }
      }
      return this.accessSubmit
    },
    handleClick() {},
    // 添加主题
    addSubject() {
      this.review.appraisalSubject.push('')
    },
    //删除主体
    delSubject(index) {
      this.review.appraisalSubject.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../common/index.scss';
.review {
  width: 624px;
  padding: 0 12px;
  height: 697px;
  overflow: auto;
}
.bt_title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: #7984a7;
  margin-bottom: 8px;
}
.bt_input {
  width: 500px;
  position: relative;
  .del_btn {
    position: absolute;
    top: 50%;
    right: -5%;
    transform: translateY(-50%);
  }
}
.baseInfo_group {
  display: flex;
  align-items: center;
}
.baseInfo_item {
  margin-bottom: 16px;
}

.dialogSelf ::v-deep .el-dialog {
  height: 875.69px;
}
.pc_head {
  display: flex;
  align-items: center;
  .pc_item {
    width: 140px;
    margin-right: 12px;
  }
}
.people_table {
  padding-top: 12px;
}
.people_table ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}
</style>