<template>
  <d2-container class="page">
    <div class="unit_list">
      <div class="unit_list_search">
        <div class="ul_item">
          <el-input
            class="inline-input"
            size="medium"
            v-model="queryParams.search_name"
            placeholder="部门名称或者部门编码"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="department_name" label="部门名称">
        </el-table-column>
        <el-table-column prop="is_enable" label="状态" show-overflow-tooltip>
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
          @pagination="getDepartmentList"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, prev, pager, next, sizes,jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="批量导入" center :visible.sync="dialogImport" width="30%">
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
    <el-dialog :close-on-click-modal="false" title="新增部门" center :visible.sync="dialogAdd" width="700px">
      <div class="addNew">
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>部门编号</div>
          <el-input
            v-model="from.departmentNo"
            class="dc_select"
            size="medium"
            placeholder="请输入部门编号"
          ></el-input>
          <span class="errorTip" data-name="departmentNo">
            <i class="el-icon-circle-close"></i> 请输入部门编号，在提交</span
          >
        </div>
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>部门名称</div>
          <el-input
            v-model="from.departmentName"
            class="dc_select"
            size="medium"
            placeholder="请输入部门名称"
          ></el-input>
          <span class="errorTip" data-name="departmentName">
            <i class="el-icon-circle-close"></i> 请输入部门名称，在提交</span
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
          <el-radio-group v-model="from.isDisableDepartment">
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
          size="medium"
          type="primary"
          v-show="typeDialog == '编辑'"
          @click="editData"
          >确 定</el-button
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
import {
  GET_DEPARTMENT_LIST,
  SAVE_DEPARTMENT,
  DEL_DEPARTMENT,
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
      typeDialog: "新增", //弹框的类型
      searchValue: "", //搜索条件
      restaurants: [],
      state1: "",
      tableData: [],
      multipleSelection: [],
      dialogImport: false,
      dialogAdd: false,
      departmentListNoOptions: [], //部门编号
      from: {
        departmentNo: "", //部门编号
        departmentName: "", //部门名称
        sortValue: "", //排序
        isDisableDepartment: 1, //部门是否禁用
      },
      //分页参数
      queryParams: {
        page: 1, //当前第几页
        page_size: 10, //每页显示的条数
        search_name: "",
      },
      total: 0,
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.subjectId = localStorage.getItem("evaluation_id");
    this.getDepartmentList();
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
            obj.id_list.push(element.id);
          }
        }
        console.log("obj", obj);
        DEL_DEPARTMENT(obj).then((res) => {
          if (res.status == 0) {
            this.getDepartmentList();
            this.msgSuccess("删除成功");
          }
        });
      });
    },
    // 搜索功能
    searchList() {
      this.getDepartmentList();
    },
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      console.log(`每页 ${val} 条`);
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getDepartmentList();
    },
    // 获取部门列表
    getDepartmentList() {
      GET_DEPARTMENT_LIST(this.queryParams).then((res) => {
        if (res.status === 0) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    // 批量导入
    batchImport() {
      this.dialogImport = true;
    },
    // 新增
    addNew() {
      this.resetErrorTip();
      this.dialogAdd = true;
      this.typeDialog = "新增";
      this.initParam();
    },
    // 新增数据
    addNewData() {
      // 新增数据接口
      // 表单校验
      this.fromValidate(this.from);
      if (this.accessSubmit) {
        let obj = {
          subject_id: this.subjectId,
          department_name: this.from.departmentName,
          department_code: this.from.departmentNo - 0,
          is_enable: this.from.isDisableDepartment - 0,
          sort: this.from.sortValue - 0,
        };
        console.log("保存部门", obj);
        obj.id = this.from.id || undefined;
        SAVE_DEPARTMENT(obj).then((res) => {
          if (res.status === 0) {
            this.dialogAdd = false;
            this.initParam();
            this.getDepartmentList();
            this.msgSuccess("保存成功");
          }
        });
      }
    },
    initParam() {
      this.from = {
        departmentNo: "", //部门编号
        departmentName: "", //部门名称
        sortValue: "", //排序
        isDisableDepartment: 1, //部门是否禁用
      };
    },
    // 展示编辑弹框
    showEdit(index, row) {
      this.resetErrorTip();
      this.typeDialog = "编辑";
      this.dialogAdd = true;
      this.from.departmentNo = row.department_code;
      this.from.departmentName = row.department_name;
      this.from.sortValue = row.sort;
      this.from.isDisableJob = row.is_enable;
      this.from.id = row.id;
    },
    editData() {
      this.addNewData();
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
        DEL_DEPARTMENT(obj).then((res) => {
          if (res.status == 0) {
            this.getDepartmentList();
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
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号",
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号",
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F",
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层",
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺",
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819",
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306",
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元",
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺",
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6",
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号",
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号",
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室",
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部",
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室",
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号",
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位",
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼",
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13",
        },
      ];
    },
    // 补全后选择
    handleSelect(item) {
      console.log(item);
    },
    // 联想补全
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
  },
};
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
