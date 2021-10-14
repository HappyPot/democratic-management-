<template>
  <d2-container class="page">
    <div class="role_permissions">
      <div class="rp_search">
        <div class="rp_input">
          <div class="ul_item">
            <el-input class="inline-input"
                      size="medium"
                      v-model="queryParams.account"
                      placeholder="按账号和编码模糊搜索">
              <template slot="append">
                <div class="search_append"
                     @click="searchList">搜索</div>
              </template>
            </el-input>
          </div>
        </div>
        <div class="rp_input_right">
          <div class="rp_input">
            <el-button type="primary"
                       size="medium"
                       @click="addNew">新增</el-button>
          </div>
          <div class="rp_input">
            <el-button type="danger"
                       size="medium"
                       plain
                       @click="delItemList">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="sl_content">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column type="index"
                         label="序号"> </el-table-column>
        <el-table-column prop="account"
                         label="登录账号"> </el-table-column>
        <el-table-column prop="account_type"
                         label="所属角色">
          <template slot-scope="scope">
            {{ scope.row.account_type == 1 ? "管理员" : "子管理员" }}
          </template>
        </el-table-column>
        <el-table-column prop="unit_name"
                         label="单位名称"> </el-table-column>
        <el-table-column prop="date"
                         label="是否启用">
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
                     @click="showEdit(scope.row, scope.$index)">编辑</el-link>
            <el-link type="danger"
                     style="margin-right: 12px"
                     @click="delItem(scope.row, scope.$index)">删除</el-link>
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
    </div>
    <el-dialog :title="typeTitle"
               center
               class="dialogSelf"
               :visible.sync="dialogAccount"
               :close-on-click-modal="false"
               width="700px">
      <div class="addNew">
        <div class="dc_item">
          <div class="dc_text">登录账号</div>
          <el-input v-model="from.loginAccount"
                    class="dc_select"
                    size="medium"
                    placeholder="请输入登录账号"></el-input>
          <span class="errorTip"
                data-name="loginAccount">
            <i class="el-icon-circle-close"></i> 请输入登录账号，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text">初始密码</div>
          <el-input v-model="from.initialPassword"
                    class="dc_select"
                    size="medium"
                    placeholder="请输入初始密码"></el-input>
          <!-- <span class="errorTip"
                data-name="initialPassword">
            <i class="el-icon-circle-close"></i> 请输入初始密码，在提交</span> -->
        </div>
        <div class="dc_item">
          <div class="dc_text">选择单位</div>
          <wlTreeSelect width="500"
                        placeholder="请选择单位"
                        style="margin-right: 10px"
                        :data="superiorUnitOptions"
                        v-model="from.unitNo">
          </wlTreeSelect>
          <span class="errorTip"
                data-name="unitNo">
            <i class="el-icon-circle-close"></i> 请选择单位，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text">排序</div>
          <el-input v-model="from.sortValue"
                    size="medium"
                    class="dc_select"></el-input>
        </div>
        <div class="dc_item">
          <div class="dc_text">账号状态</div>
          <el-radio-group v-model="from.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   v-show="typeTitle == '添加账号'"
                   @click="addNewData">确 定</el-button>
        <el-button type="primary"
                   size="medium"
                   v-show="typeTitle == '编辑账号'"
                   @click="editData">更 新</el-button>
        <el-button @click="dialogAccount = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  GET_ADMINUSER_LIST,
  SAVE_ADMINUSER,
  DEL_ADMINUSER,
  GET_ADMINUSER_INFO
} from '@/api/rolepermissions.js'
import { mapState } from 'vuex'
import { GET_UNITTREE_LIST } from '@/api/personnelmanagement.js'
export default {
  data() {
    return {
      //分页参数
      queryParams: {
        // page: 1, //当前第几页
        // page_size: 10, //每页显示的条数
        account: ''
      },
      total: 0,
      selection: [], //表格中被选中的
      typeTitle: '添加账号', //评议添加,评议编辑
      unitNoOptions: [], //单位list
      dialogAccount: false,
      searchValue: '',
      restaurants: [],
      tableData: [],
      superiorUnitOptions: [], //单位数组
      from: {
        loginAccount: '',
        initialPassword: '',
        unitNo: '',
        sortValue: 1,
        status: 1
      },
      updateId: undefined
    }
  },
  created() {
    this.getAdminUserList()
    this.getUnitLIst()
  },
  methods: {
    // 搜索功能
    searchList() {
      this.getAdminUserList()
    },
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
        DEL_ADMINUSER(obj).then(res => {
          if (res.status == 0) {
            this.getAdminUserList()
            this.msgSuccess('删除成功')
          }
        })
      })
    },
    //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST().then(res => {
        if (res.status === 0) {
          this.superiorUnitOptions = res.data
        }
      })
    },
    // 获取角色权限列表
    getAdminUserList() {
      GET_ADMINUSER_LIST(this.queryParams).then(res => {
        if (res.status == 0) {
          this.tableData = res.data.data
        }
      })
    },
    handleSelectionChange(selection, row) {
      this.selection = selection
      console.log(selection)
    },
    delItem(row, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          id_list: [row.id]
        }
        DEL_ADMINUSER(obj).then(res => {
          if (res.status == 0) {
            this.getAdminUserList()
            this.msgSuccess('删除成功')
          }
        })
      })
    },
    findUnit(data, row) {
      let value = {}
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.id != row.unit_id) {
          if (element.children && element.children.length > 0) {
            this.findUnit(element.children, row)
          }
        } else {
          value = element
          break
        }
      }
      return value
    },
    // 展示编辑框
    showEdit(row, index) {
      this.updateId = row.id
      let unit = this.findUnit(this.superiorUnitOptions, row)
      this.dialogAccount = true
      this.typeTitle = '编辑账号'
      GET_ADMINUSER_INFO({
        id: row.id
      }).then(res => {
        if (res.status === 0) {
          this.from = {
            loginAccount: res.data.account,
            initialPassword: '',
            unitNo: [unit],
            sortValue: res.data.sort,
            status: res.data.is_enable
          }
        }
      })
    },
    editData() {
      this.addNewData()
    },
    // 新增
    addNew() {
      this.dialogAccount = true
      this.typeTitle = '添加账号'
      this.updateId = undefined
    },
    // 新增数据
    addNewData() {
      this.fromValidate(this.from)
      if (this.accessSubmit) {
        let obj = {
          account: this.from.loginAccount,
          unit_id: this.from.unitNo[0].id,
          sort: this.from.sortValue,
          is_enable: this.from.status
        }
        if (this.from.initialPassword) {
          obj['pwd'] = this.from.initialPassword
        }
        if (this.updateId) {
          obj['id'] = this.updateId
        }
        console.log('角色新增', obj)
        SAVE_ADMINUSER(obj).then(res => {
          if (res.status === 0) {
            this.dialogAccount = false
            this.initParam()
            if (this.typeTitle == '添加账号') {
              this.msgSuccess('新增成功')
            } else {
              this.msgSuccess('修改成功')
            }
            this.getAdminUserList()
          }
        })
      }
    },
    initParam() {
      this.from = {
        loginAccount: '',
        initialPassword: '',
        unitNo: '',
        sortValue: 1,
        status: 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rp_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rp_input_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rp_input {
  margin: 0 6px;
}
.rp_content {
  padding-top: 20px;
}
.rp_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}

.rp_content {
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
.rp_search
  .rp_input
  .ul_item
  .inline-input.el-input-group
  ::v-deep
  .el-input-group__append {
  padding: 0 !important;
  border: none;
}
</style>