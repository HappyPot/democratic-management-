<template>
  <d2-container class="page">
    <div class="unit_list">
      <div class="unit_list_search">
        <div class="ul_item">
          <el-input
            class="inline-input"
            size="medium"
            v-model="searchValue"
            placeholder="单位名称或者单位编码"
          >
            <template slot="append">
              <div class="search_append" @click="searchList">搜索</div>
            </template>
          </el-input>
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
            plain
            @click="delItemList"
            :disabled="selection.length == 0"
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
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="unit_name" label="单位名称"> </el-table-column>
        <el-table-column prop="is_enable" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_enable"
              :active-value="1"
              :inactive-value="0"
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
          <div class="dc_text">上级单位</div>
          <wlTreeSelect
            width="500"
            placeholder="请选择上级单位"
            style="margin-right: 10px"
            :data="superiorUnitOptions"
            @change="getSuperiorUnit"
            v-model="from.superiorUnit"
          >
          </wlTreeSelect>
        </div>

        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>单位编号</div>
          <el-input
            v-model="from.unitNo"
            class="dc_select"
            size="medium"
            placeholder="请输入单位编号"
          ></el-input>
          <span class="errorTip" data-name="unitNo">
            <i class="el-icon-circle-close"></i> 请输入单位编号，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>单位名称</div>
          <el-input
            v-model="from.unitName"
            class="dc_select"
            size="medium"
            placeholder="请输入单位名称"
          ></el-input>
          <span class="errorTip" data-name="unitName">
            <i class="el-icon-circle-close"></i> 请选择单位名称，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text">排序</div>
          <el-input
            v-model="from.sortValue"
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
          v-show="typeDialog == '新增'"
          @click="addNewData"
          >确 定</el-button
        >
        <el-button
          type="primary"
          size="medium"
          v-show="typeDialog == '编辑'"
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
  GET_UNITTREE_LIST,
  SAVE_UNIT,
  DEL_UNIT,
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
      evaluation: "", //测评对象值
      evaluationOptions: [],
      searchValue: "", //搜索条件
      restaurants: [],
      state1: "",
      tableData: [],
      toSearch: [], //供搜索功能使用的源数据
      multipleSelection: [],
      dialogImport: false,
      dialogAdd: false,
      typeDialog: "新增", //弹框的类型
      superiorUnitOptions: [], //上级单位数组
      unitNoOptions: [], //单位编号
      from: {
        unitNo: "", //单位编号
        unitName: "", //单位名称
        sortValue: "", //排序
        superiorUnit: [], //上级单位
        isDisableUnit: 1, //单位是否禁用
      },
    };
  },
  mounted() {
    this.subjectId = localStorage.getItem("evaluation_id");
    this.getUnitLIst();
  },
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
            if (element.children.length != 0) {
              this.msgError("有子单位不允许删除");
              return;
            } else {
              obj.id_list.push(element.id);
            }
          }
        }
        console.log("obj", obj);
        DEL_UNIT(obj).then((res) => {
          if (res.status == 0) {
            this.getUnitLIst();
            this.msgSuccess("删除成功");
          }
        });
      });
    },
    // 搜索功能
    searchList() {
      this.tableData = this.toSearch.filter((item) => {
        return (
          item.unit_code.indexOf(this.searchValue) > -1 ||
          item.unit_name.indexOf(this.searchValue) > -1
        );
      });
      console.log(this.tableData);
    },
    // //获取单位列表
    getUnitLIst() {
      GET_UNITTREE_LIST().then((res) => {
        if (res.status === 0) {
          this.tableData = res.data;
          this.toSearch = res.data;
          this.superiorUnitOptions = res.data;
        }
      });
    },
    // 获取上级单位值
    getSuperiorUnit(val) {
      console.log("获取上级单位值", this.from.superiorUnit);
    },
    // 获取单位编号
    getUnitNo(val) {
      console.log("获取单位编号", val);
    },
    // 展示编辑弹框
    showEdit(index, row) {
      this.resetErrorTip();
      this.typeDialog = "编辑";
      this.dialogAdd = true;
      this.from.unitNo = row.unit_code;
      this.from.unitName = row.unit_name;
      this.from.sortValue = row.sort;
      this.from.is_enable = row.is_enable;
      this.from.superiorUnit = [row];
      this.from.id = row.id;
      console.log(this.from);
    },
    editData() {
      this.addNewData();
    },
    // 批量导入
    batchImport() {
      this.dialogImport = true;
    },
    // 展示新增弹框
    addNew() {
      this.from.id = undefined;
      this.resetErrorTip();
      this.dialogAdd = true;
      this.typeDialog = "新增";
    },
    // 新增数据
    addNewData() {
      // 新增数据接口
      // 表单校验
      this.fromValidate(this.from);
      debugger;
      if (this.accessSubmit) {
        let obj = {
          subject_id: this.subjectId,
          unit_name: this.from.unitName,
          unit_code: this.from.unitNo,
          sort: this.from.sortValue,
          is_enable: this.from.isDisableUnit,
          parent_id: null,
        };
        if (this.from.superiorUnit.length > 0) {
          obj["parent_id"] = this.from.superiorUnit[0].id;
        }
        obj.id = this.from.id || undefined;
        console.log("SAVE_UNIT", obj);
        SAVE_UNIT(obj).then((res) => {
          if (res.status === 0) {
            this.dialogAdd = false;
            this.typeDialog = "新增";
            this.initParam();
            this.getUnitLIst();

            this.msgSuccess("保存成功");
          }
        });
      }
    },
    initParam() {
      this.from = {
        unitNo: "", //单位编号
        unitName: "", //单位名称
        sortValue: "", //排序
        superiorUnit: [], //上级单位
        isDisableUnit: 1, //单位是否禁用
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
        console.log("obj", obj);
        DEL_UNIT(obj).then((res) => {
          if (res.status == 0) {
            this.getUnitLIst();
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
      if (row.children) {
        //只对有子节点的行响应
        if (!row.isChecked) {
          //由行数据中的元素isChecked判断当前是否被选中
          row.children.map((item) => {
            //遍历所有子节点
            this.$refs.multipleTable.toggleRowSelection(item, true); //切换该子节
            item.isChecked = true;
          });
          row.isChecked = true; //当前行isChecked标志元素切换为false
        } else {
          row.children.map((item) => {
            this.$refs.multipleTable.toggleRowSelection(item, false);
            item.isChecked = false;
          });
          row.isChecked = false;
        }
      }
      // console.log(row);
      this.selection = selection;
      console.log(selection);
    },
  },
};
</script>

<style lang="scss">
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
// .search_append {
//   width: 71px;
//   height: 36px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #409eff;
//   box-sizing: border-box;
//   color: #409eff;
//   border-top-right-radius: 4px;
//   border-bottom-right-radius: 4px;
//   cursor: pointer;
// }
// .unit_list_search
//   .ul_item
//   .inline-input.el-input-group
//   .el-input-group__append {
//   padding: 0 !important;
//   border: none;
// }
</style>
