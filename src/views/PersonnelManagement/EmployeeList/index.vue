<template>
  <d2-container class="page">
    <div class="unit_list">
      <div class="unit_list_search">
        <div class="ul_item">
          <div class="ul_item">
            <el-input
              class="inline-input"
              size="medium"
              v-model="queryParams.search_name"
              placeholder="按账户和编码模糊搜索"
            >
            </el-input>
          </div>
        </div>
        <div class="ul_item">
          <wlTreeSelect
            width="200"
            placeholder="请选择单位名称"
            style="margin-right: 10px"
            checkbox
            collapse-tags
            size="medium"
            :data="superiorUnitOptions"
            @change="getSuperiorUnit"
            v-model="superiorUnit"
          >
          </wlTreeSelect>
        </div>
        <div class="ul_item">
          <el-select
            multiple
            collapse-tags
            v-model="queryParams.department_id_list"
            size="medium"
            placeholder="请选择部门名称"
          >
            <el-option
              v-for="item in departmentOptions"
              :key="item.department_code"
              :label="item.department_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ul_item">
          <el-select
            v-model="queryParams.duty_id_list"
            size="medium"
            multiple
            collapse-tags
            placeholder="请选择职务名称"
          >
            <el-option
              v-for="item in jobOptions"
              :key="item.duty_code"
              :label="item.duty_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ul_item">
          <el-button type="primary" plain size="medium" @click="searchList"
            >搜索</el-button
          >
        </div>
        <div class="ul_item">
          <el-button type="primary" size="medium" @click="addNew"
            >新增</el-button
          >
        </div>
        <div class="ul_item">
          <el-button
            type="danger"
            size="medium"
            @click="delItemList"
            :disabled="selection.length == 0"
            plain
            >删除</el-button
          >
        </div>
        <div class="ul_item_right" @click="batchImport">
          <img src="../../system/index/image/import.png" alt="" />
          批量导入
        </div>
      </div>
    </div>
    <div class="unit_content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="人员编码"> </el-table-column>
        <el-table-column prop="unit_name" label="单位名称"> </el-table-column>
        <el-table-column prop="department_name" label="部门名称">
        </el-table-column>
        <el-table-column prop="duty_name" label="职务名称"> </el-table-column>
        <el-table-column
          prop="is_enable"
          label="是否启用"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="tableData[scope.$index].is_enable"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link
              type="primary"
              style="margin-right: 12px"
              @click="showEdit(scope.$index, scope.row)"
              >编辑</el-link
            >
            <el-link type="danger" @click="delItem(scope.$index, scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
        <div slot="empty" style="position: relative">
          <div
            style="
              position: absolute;
              top: 35%;
              left: 50%;
              transform: translate(-50%, -50%);
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
          @pagination="getUserList"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, prev, pager, next, sizes,jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="批量导入" center :visible.sync="dialogImport" width="30%">
      <div class="dialogImport_content">
        <div class="dc_item">
          <div class="dc_text">选择文件</div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
          >
            <el-button type="primary" size="small" icon="el-icon-upload2" plain
              >上传</el-button
            >
          </el-upload>
        </div>
        <div class="dc_item">
          <div class="dc_text">下载导入模板</div>
          <el-button type="primary" size="small" plain>导入模板</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="dialogImport = false"
          >确 定</el-button
        >
        <el-button size="medium" @click="dialogImport = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--新增 -->
    <el-dialog
      :title="typeDialog"
      center
      :visible.sync="dialogAdd"
      width="700px"
    >
      <div class="addNew">
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>所属单位</div>
          <wlTreeSelect
            leaf
            width="500"
            size="medium"
            placeholder="请选择单位"
            style="margin-right: 10px"
            checkbox
            :data="superiorUnitOptions"
            @change="getSuperiorUnit"
            v-model="from.unitName"
          >
          </wlTreeSelect>
          <span class="errorTip" data-name="unitName">
            <i class="el-icon-circle-close"></i> 请选择单位，在提交</span
          >
        </div>

        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>所属部门</div>
          <el-select
            v-model="from.department"
            class="dc_select"
            size="medium"
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in departmentOptions"
              :key="item.department_code"
              :label="item.department_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="errorTip" data-name="department">
            <i class="el-icon-circle-close"></i> 请选择部门，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>所属职务</div>
          <el-select
            v-model="from.job"
            class="dc_select"
            size="medium"
            placeholder="请选择职务名称"
          >
            <el-option
              v-for="item in jobOptions"
              :key="item.duty_code"
              :label="item.duty_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="errorTip" data-name="job">
            <i class="el-icon-circle-close"></i> 请选择职务，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text">编号</div>
          <el-input
            v-model="from.number"
            disabled
            size="medium"
            class="dc_select"
          ></el-input>
          <span class="errorTip" data-name="number">
            <i class="el-icon-circle-close"></i> 请输入编号，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text">密码</div>
          <el-input
            v-model="from.password"
            type="password"
            size="medium"
            class="dc_select"
          ></el-input>
        </div>
        <div class="dc_item">
          <div class="dc_text">是否禁用</div>
          <el-radio-group v-model="from.isDisableUnit">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="medium"
          v-show="typeDialog == '新增员工'"
          @click="addNewData"
          >确 定</el-button
        >
        <el-button
          type="primary"
          size="medium"
          v-show="typeDialog == '编辑员工'"
          @click="editData"
          >更 新</el-button
        >
        <el-button size="medium" @click="dialogAdd = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import D2Badge from "../../system/index/components/d2-badge";
import D2Help from "../../system/index/components/d2-help";
import D2PageCover from "../../system/index/components/d2-page-cover";
import { validateTelephone } from "@/untils/validate";
import {
  GET_USER_LIST,
  SAVE_USER,
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST,
  DEL_USER,
  GET_USER_INFO,
} from "@/api/personnelmanagement.js";
import { mapState } from "vuex";
export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover,
  },
  data() {
    return {
      selection: [], //表格中被选中的
      search: {},
      departmentOptions: [], //部门列表
      jobOptions: [], //职务列表
      evaluation: "", //测评对象值
      evaluationOptions: [],
      searchValue: "", //搜索条件
      restaurants: [],
      state1: "",
      tableData: [],
      multipleSelection: [],
      dialogImport: false,
      dialogAdd: false,
      typeDialog: "新增员工", //弹框的类型
      superiorUnitOptions: [], //上级单位数组
      superiorUnit: [], //搜索条件的单位名称
      unitNoOptions: [
        {
          id: "love",
          name: "所有和你走过的风光",
          children: [
            {
              id: 1,
              name: "海边",
              children: [
                {
                  id: 5,
                  name: "蓬莱",
                },
              ],
            },
          ],
        },
      ], //单位编号
      from: {
        unitName: "", //单位名称
        department: "", //部门名称
        job: "", //职务名称
        number: "", //编号
        password: "", //密码
        isDisableUnit: false, //单位是否禁用
      },
      //分页参数
      queryParams: {
        page: 1, //当前第几页
        page_size: 10, //每页显示的条数
        department_id_list: [], //搜索条件的部门名称
        duty_id_list: [], //搜索条件的职务名称
        search_name: "",
        unit_id_list: [],
      },
      total: 0,
    };
  },
  created() {
    this.subjectId = localStorage.getItem("evaluation_id");
    this.getUserList();
    this.getUnitLIst();
    // 职务
    this.getDutyList();
    // 部门
    this.getDepartmentList();
  },
  mounted() {},
  methods: {
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
        DEL_USER(obj).then((res) => {
          if (res.status == 0) {
            this.getUserList();
            this.msgSuccess("删除成功");
          }
        });
      });
    },
    // 搜索
    searchList() {
      this.getUserList();
    },
    // 获取职务列表
    getDutyList() {
      GET_DUTY_LIST({
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
        page: 1,
        page_size: 9999,
      }).then((res) => {
        if (res.status === 0) {
          this.departmentOptions = res.data.data;
          console.log("获取部门列表", res.data.data);
        }
      });
    },
    // //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST().then((res) => {
        if (res.status === 0) {
          this.superiorUnitOptions = res.data;
        }
      });
    },
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getUserList();
      console.log(`每页 ${val} 条`);
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getUserList();
    },
    // 获取员工列表
    getUserList() {
      let obj = {
        page: this.queryParams.page,
        page_size: this.queryParams.page_size,
      };
      if (this.queryParams.department_id_list.length > 0) {
        obj["department_id_list"] = this.queryParams.department_id_list;
      }
      if (this.queryParams.duty_id_list.length > 0) {
        obj["duty_id_list"] = this.queryParams.duty_id_list;
      }
      if (this.superiorUnit.length > 0) {
        let idlist = [];
        this.superiorUnit.map((item) => {
          idlist.push(item.id);
        });
        obj["unit_id_list"] = idlist;
      }
      if (this.queryParams.search_name) {
        obj["search_name"] = this.queryParams.search_name;
      }
      GET_USER_LIST(obj).then((res) => {
        if (res.status === 0) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    // 获取上级单位值
    getSuperiorUnit(val) {
      console.log("获取上级单位值", val);
    },
    // 获取单位编号
    getUnitNo(val) {
      console.log("获取单位编号", val);
    },
    hindleChanged(val) {
      console.log(val, 2);
    },
    findUnit(data, row) {
      let value = {};
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.id != row.unit_id) {
          if (element.children && element.children.length > 0) {
            this.findUnit(element.children, row);
          }
        } else {
          value = element;
          break;
        }
      }
      return value;
    },
    // 展示编辑弹框
    showEdit(index, row) {
      this.resetErrorTip();
      this.typeDialog = "编辑员工";
      this.dialogAdd = true;
      this.from.id = row.id;
      GET_USER_INFO({
        id: row.id,
      }).then((res) => {
        if (res.status == 0) {
          let unit = this.findUnit(this.superiorUnitOptions, {
            unit_id: res.data.unit_id,
          });
          this.from.unitName = [unit];
          this.from.department = res.data.department_id;
          this.from.job = res.data.duty_id;
          this.from.isDisableUnit = res.data.is_enable;
          this.from.number = res.data.code;
        }
      });
    },
    editData() {
      // 更新接口
      this.addNewData();
    },
    // 批量导入
    batchImport() {
      this.dialogImport = true;
    },
    // 展示新增弹框
    addNew() {
      this.resetErrorTip();
      this.dialogAdd = true;
      this.typeDialog = "新增员工";
    },
    // 新增数据
    addNewData() {
      // 新增数据接口
      // 表单校验
      this.fromValidate(this.from);
      let departmentcode = this.departmentOptions.find((item) => {
        return item.id == this.from.department;
      }).department_code;
      let dutycode = this.jobOptions.find((item) => {
        return item.id == this.from.job;
      }).duty_code;
      // let idlist = []
      // if (this.from.unitName.length > 0) {
      //   this.from.unitName.map(item => {
      //     idlist.push(item.id)
      //   })
      // }
      if (this.accessSubmit) {
        let obj = {
          // id: this.from.number,
          pwd: this.from.password,
          department_id: this.from.department,
          department_code: departmentcode,
          unit_id: this.from.unitName[0].id,
          unit_code: this.from.unitName[0].unit_code,
          duty_id: this.from.job,
          duty_code: dutycode,
          subject_id: this.subjectId,
        };
        console.log("aaaa", obj);
        obj.id = this.from.id || undefined;
        SAVE_USER(obj).then((res) => {
          if (res.status === 0) {
            this.initParam();
            this.dialogAdd = false;
            this.getUserList();
            this.msgSuccess("保存成功");
          }
        });
      }
    },
    initParam() {
      this.from = {
        unitName: "", //单位名称
        department: "", //部门名称
        job: "", //职务名称
        number: "", //编号
        password: "", //密码
        isDisableUnit: false, //单位是否禁用
      };
    },
    // 删除
    delItem(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id_list: [row.id],
        };
        DEL_USER(obj).then((res) => {
          if (res.status == 0) {
            this.getUserList();
            this.msgSuccess("删除成功");
          }
        });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(selection, row) {
      this.selection = selection;
      console.log(selection);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/index.scss";
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
}
.dc_select {
  width: 500px;
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
