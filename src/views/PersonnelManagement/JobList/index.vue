<template>
  <d2-container class="page">
    <div class="unit_list">
      <div class="unit_list_search">
        <div class="ul_item">
          <el-input class="inline-input"
                    size="medium"
                    v-model="queryParams.search_name"
                    placeholder="职务名称或者职务编码">
            <template slot="append">
              <div class="search_append"
                   @click="searchList">搜索</div>
            </template>
          </el-input>
        </div>
        <div class="ul_item">
          <el-button type="primary"
                     size="medium"
                     @click="addNew">新增</el-button>
        </div>
        <div class="ul_item">
          <el-button type="danger"
                     size="medium"
                     plain
                     @click="delItemList"
                     :disabled="selection.length == 0">删除</el-button>
        </div>
        <div class="ul_item_right"
             @click="batchImport">
          <img src="../../system/index/image/import.png"
               alt="" />
          批量导入
        </div>
      </div>
    </div>
    <div class="unit_content">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column prop="id"
                         label="序号"> </el-table-column>
        <el-table-column prop="duty_name"
                         label="职务名称"> </el-table-column>
        <el-table-column prop="is_enable"
                         label="状态"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch :active-value="1"
                       :inactive-value="0"
                       v-model="tableData[scope.$index].is_enable">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showEdit(scope.$index, scope.row)">编辑</el-link>
            <el-link type="danger"
                     @click="delItem(scope.$index, scope.row)">删除</el-link>
          </template>
        </el-table-column>
        <div slot="empty"
             style="position: relative">
          <div style="
              position: absolute;
              top: 35%;
              left: 50%;
              transform: translate(-50%, -50%);
            ">
            数据为空
          </div>
          <img style="height: 30vh"
               src="../../../assets/image/数据为空.svg"
               alt="" />
        </div>
      </el-table>
      <div class="pagination_my">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="total"
                       @pagination="getDutyList"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="total, prev, pager, next, sizes,jumper">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="批量导入"
               center
               :visible.sync="dialogImport"
               width="30%">
      <div class="dialogImport_content">
        <div class="dc_item">
          <div class="dc_text">选择文件</div>
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     multiple
                     :limit="3">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-upload2"
                       plain>上传</el-button>
          </el-upload>
        </div>
        <div class="dc_item">
          <div class="dc_text">下载导入模板</div>
          <el-button type="primary"
                     size="small"
                     plain>导入模板</el-button>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   @click="dialogImport = false">确 定</el-button>
        <el-button size="medium"
                   @click="dialogImport = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--新增 -->
    <el-dialog :title="typeDialog"
               center
               :visible.sync="dialogAdd"
               width="700px">
      <div class="addNew">
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>职务编号</div>
          <el-input v-model="from.jobNo"
                    class="dc_select"
                    size="medium"
                    placeholder="请输入职务编号"></el-input>
          <span class="errorTip"
                data-name="jobNo">
            <i class="el-icon-circle-close"></i> 请输入职务编号，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>职务名称</div>
          <el-input v-model="from.jobName"
                    class="dc_select"
                    size="medium"
                    placeholder="请输入职务名称"></el-input>
          <span class="errorTip"
                data-name="jobName">
            <i class="el-icon-circle-close"></i> 请输入职务名称，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text">排序</div>
          <el-input v-model="from.sortValue"
                    size="medium"
                    class="dc_select"></el-input>
        </div>
        <div class="dc_item">
          <div class="dc_text">是否禁用</div>
          <el-radio-group v-model="from.isDisableJob">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   v-show="typeDialog == '新增'"
                   @click="addNewData">确 定</el-button>
        <el-button type="primary"
                   size="medium"
                   v-show="typeDialog == '编辑'"
                   @click="editData">更 新</el-button>
        <el-button size="medium"
                   @click="dialogAdd = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import D2Badge from '../../system/index/components/d2-badge'
import D2Help from '../../system/index/components/d2-help'
import D2PageCover from '../../system/index/components/d2-page-cover'
import {
  GET_DUTY_LIST,
  SAVE_DUTY,
  DEL_DUTY
} from '@/api/personnelmanagement.js'
import { mapState } from 'vuex'

export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover
  },
  data() {
    return {
      selection: [], //表格中被选中的
      typeDialog: '新增', //弹框的类型
      searchValue: '', //搜索条件
      restaurants: [],
      state1: '',
      tableData: [],
      dialogImport: false,
      dialogAdd: false,
      jobNoOptions: [], //职务编号
      from: {
        jobNo: '', //职务编号
        jobName: '', //职务名称
        sortValue: '', //排序
        isDisableJob: 1 //职务是否禁用
      },
      //分页参数
      queryParams: {
        page: 1,
        page_size: 10,
        search_name: ''
      },
      total: 0
    }
  },
  created() {
    this.getDutyList()
  },
  mounted() {
    this.subjectId = localStorage.getItem('evaluation_id')
  },
  methods: {
    // 多个删除
    delItemList() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          id_list: []
        }
        if (this.selection.length > 0) {
          for (let index = 0; index < this.selection.length; index++) {
            const element = this.selection[index]
            obj.id_list.push(element.id)
          }
        }
        console.log('obj', obj)
        DEL_DUTY(obj).then(res => {
          if (res.status == 0) {
            this.getDutyList()
            this.msgSuccess('删除成功')
          }
        })
      })
    },
    // 搜索功能
    searchList() {
      this.getDutyList()
    },
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val
      this.getDutyList()
      console.log(`每页 ${val} 条`)
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getDutyList()
    },
    // 获取职务列表
    getDutyList() {
      GET_DUTY_LIST(this.queryParams).then(res => {
        if (res.status === 0) {
          console.log('获取职务列表', res.data.data)
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },

    // 批量导入
    batchImport() {
      this.dialogImport = true
    },
    // 展示新增弹框
    addNew() {
      this.resetErrorTip()
      this.dialogAdd = true
      this.typeDialog = '新增'
    },
    // 新增数据
    addNewData() {
      // 表单校验
      this.fromValidate(this.from)
      if (this.accessSubmit) {
        let obj = {
          duty_name: this.from.jobName,
          duty_code: this.from.jobNo,
          is_enable: this.from.isDisableJob,
          sort: this.from.sortValue
        }
        obj.id = this.from.id || undefined
        console.log('职务提交', obj)
        SAVE_DUTY(obj).then(res => {
          if (res.status === 0) {
            this.dialogAdd = false
            this.initParam()
            this.getDutyList()
            this.msgSuccess('保存成功')
          }
        })
      }
    },
    initParam() {
      this.from = {
        jobNo: '', //职务编号
        jobName: '', //职务名称
        sortValue: '', //排序
        isDisableJob: 1 //职务是否禁用
      }
    },
    // 展示编辑弹框
    showEdit(index, row) {
      this.resetErrorTip()
      this.typeDialog = '编辑'
      this.dialogAdd = true
      this.from.jobNo = row.duty_code
      this.from.jobName = row.duty_name
      this.from.sortValue = row.sort
      this.from.isDisableJob = row.is_enable
      this.from.id = row.id
    },
    editData() {
      this.addNewData()
    },
    // 删除
    delItem(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          id_list: [row.id]
        }
        DEL_DUTY(obj).then(res => {
          if (res.status == 0) {
            this.getDutyList()
            this.msgSuccess('删除成功')
          }
        })
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(selection, row) {
      this.selection = selection
      console.log(selection)
    }
  }
}
</script>

<style lang="scss" scoped>
.unit_list_search {
  width: 100%;
  display: flex;
  align-items: center;
  .ul_item {
    margin-right: 12px;
  }
  .ul_item_right {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 20px;
    color: #1e263d;
    opacity: 1;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
    }
  }
}

.unit_content {
  padding-top: 20px;
  // padding-left: 24px;
  padding-right: 24px;
  position: relative;
  .pagination_my {
    position: absolute;
    right: 0;
    bottom: -44px;
  }
}
.unit_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}
.dc_item {
  margin-bottom: 16px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: #7984a7;
  opacity: 1;
  .dc_text {
    margin-bottom: 8px;
  }
  .dc_select {
    width: 500px;
  }
}
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
