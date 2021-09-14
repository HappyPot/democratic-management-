<template>
  <d2-container class="page">
    <div class="unit_list">
      <div class="unit_list_search">
        <div class="ul_item">
          <el-autocomplete class="inline-input"
                           size="medium"
                           v-model="searchValue"
                           :fetch-suggestions="querySearch"
                           placeholder="单位名称或者单位编码"
                           prefix-icon="el-icon-search"
                           :trigger-on-focus="false"
                           @select="handleSelect"></el-autocomplete>
        </div>
        <div class="ul_item">
          <wlTreeSelect leaf
                        width="200"
                        placeholder="请选择单位名称"
                        style="margin-right: 10px"
                        checkbox
                        size="medium"
                        :data="superiorUnitOptions"
                        @change="getSuperiorUnit"
                        v-model="search.superiorUnit">
          </wlTreeSelect>
        </div>
        <div class="ul_item">
          <el-select v-model="search.department"
                     size="medium"
                     placeholder="请选择部门名称">
            <el-option v-for="item in departmentOptions"
                       :key="item.department_code"
                       :label="item.department_name"
                       :value="item.department_code">
            </el-option>
          </el-select>
        </div>
        <div class="ul_item">
          <el-select v-model="search.job"
                     size="medium"
                     placeholder="请选择职务名称">
            <el-option v-for="item in jobOptions"
                       :key="item.duty_code"
                       :label="item.duty_name"
                       :value="item.duty_code">
            </el-option>
          </el-select>
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
                     @click="delItem">删除</el-button>
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
                row-key="id"
                default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column prop="code"
                         label="人员编码"> </el-table-column>
        <el-table-column prop="unit_name"
                         label="单位名称"> </el-table-column>
        <el-table-column prop="department_name"
                         label="部门名称">
        </el-table-column>
        <el-table-column prop="duty_name"
                         label="职务名称"> </el-table-column>
        <el-table-column prop="is_enable"
                         label="是否启用"
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
          <template>
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showEdit">编辑</el-link>
            <el-link type="danger"
                     @click="delItem">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_my">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="total"
                       @pagination="getUserList"
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
          <div class="dc_text">所属单位</div>
          <wlTreeSelect leaf
                        width="500"
                        size="medium"
                        placeholder="请选择单位"
                        style="margin-right: 10px"
                        checkbox
                        :data="superiorUnitOptions"
                        @change="getSuperiorUnit"
                        v-model="from.unitName">
          </wlTreeSelect>
          <span class="errorTip"
                data-name="unitName">
            <i class="el-icon-circle-close"></i> 请选择单位，在提交</span>
        </div>

        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>所属部门</div>
          <el-select v-model="from.department"
                     class="dc_select"
                     size="medium"
                     placeholder="请选择部门">
            <el-option v-for="item in departmentOptions"
                       :key="item.department_code"
                       :label="item.department_name"
                       :value="item.department_code">
            </el-option>
          </el-select>
          <span class="errorTip"
                data-name="department">
            <i class="el-icon-circle-close"></i> 请选择部门，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text"><i class="redTip">*</i>所属职务</div>
          <el-select v-model="from.job"
                     class="dc_select"
                     size="medium"
                     placeholder="请选择职务名称">
            <el-option v-for="item in jobOptions"
                       :key="item.duty_code"
                       :label="item.duty_name"
                       :value="item.duty_code">
            </el-option>
          </el-select>
          <span class="errorTip"
                data-name="job">
            <i class="el-icon-circle-close"></i> 请选择职务，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text">编号</div>
          <el-input v-model="from.number"
                    size="medium"
                    class="dc_select"></el-input>
          <span class="errorTip"
                data-name="number">
            <i class="el-icon-circle-close"></i> 请输入编号，在提交</span>
        </div>
        <div class="dc_item">
          <div class="dc_text">密码</div>
          <el-input v-model="from.password"
                    type="password"
                    size="medium"
                    class="dc_select"></el-input>
        </div>
        <div class="dc_item">
          <div class="dc_text">是否禁用</div>
          <el-radio-group v-model="from.isDisableUnit">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="medium"
                   v-show="typeDialog == '新增员工'"
                   @click="addNewData">确 定</el-button>
        <el-button type="primary"
                   size="medium"
                   v-show="typeDialog == '编辑员工'"
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
import { validateTelephone } from '@/untils/validate'
import {
  GET_USER_LIST,
  SAVE_USER,
  GET_UNITTREE_LIST,
  GET_DUTY_LIST,
  GET_DEPARTMENT_LIST
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
      search: {
        superiorUnit: '', //搜索条件的单位名称
        department: '', //搜索条件的部门名称
        job: '' //搜索条件的职务名称
      },
      departmentOptions: [], //部门列表
      jobOptions: [], //职务列表
      evaluation: '', //测评对象值
      evaluationOptions: [],
      searchValue: '', //搜索条件
      restaurants: [],
      state1: '',
      tableData: [],
      multipleSelection: [],
      dialogImport: false,
      dialogAdd: false,
      typeDialog: '新增员工', //弹框的类型
      superiorUnitOptions: [], //上级单位数组
      unitNoOptions: [
        {
          id: 'love',
          name: '所有和你走过的风光',
          children: [
            {
              id: 1,
              name: '海边',
              children: [
                {
                  id: 5,
                  name: '蓬莱'
                }
              ]
            }
          ]
        }
      ], //单位编号
      from: {
        unitName: '', //单位名称
        department: '', //部门名称
        job: '', //职务名称
        number: '', //编号
        password: '', //密码
        isDisableUnit: false //单位是否禁用
      },
      //分页参数
      queryParams: {
        page: 1, //当前第几页
        page_size: 10 //每页显示的条数
      },
      total: 0
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
    this.subjectId = localStorage.getItem('evaluation_id')
    this.getUserList()
    this.getUnitLIst()
    // 职务
    this.getDutyList()
    // 部门
    this.getDepartmentList()
  },
  methods: {
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
    // 设置每页条数
    handleSizeChange(val) {
      this.queryParams.page_size = val
      this.getUserList()
      console.log(`每页 ${val} 条`)
    },
    // 触发分页
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getUserList()
    },
    // 获取员工列表
    getUserList() {
      this.queryParams.subject_id = this.subjectId
      GET_USER_LIST(this.queryParams).then(res => {
        if (res.status === 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 获取上级单位值
    getSuperiorUnit(val) {
      console.log('获取上级单位值', val)
    },
    // 获取单位编号
    getUnitNo(val) {
      console.log('获取单位编号', val)
    },
    hindleChanged(val) {
      console.log(val, 2)
    },
    // 展示编辑弹框
    showEdit() {
      this.resetErrorTip()
      this.typeDialog = '编辑员工'
      this.dialogAdd = true
    },
    editData() {
      this.fromValidate(this.from)
      // 更新接口
      if (this.accessSubmit) {
        alert('更新成功')
      } else {
        alert('更新失败')
      }
    },
    // 批量导入
    batchImport() {
      this.dialogImport = true
    },
    // 展示新增弹框
    addNew() {
      this.resetErrorTip()
      this.dialogAdd = true
      this.typeDialog = '新增员工'
    },
    // 新增数据
    addNewData() {
      // 新增数据接口
      // 表单校验
      this.fromValidate(this.from)
      if (this.accessSubmit) {
        let obj = {
          account: 'xiaose',
          department_id: 1,
          department_code: this.from.department,
          unit_id: 1,
          unit_code: this.from.unitName,
          duty_id: 1,
          duty_code: this.from.job,
          subject_id: this.subjectId
        }
        SAVE_USER(this.from).then(res => {
          if (res.status === 0) {
            this.initParam()
            this.dialogAdd = false
            this.getUserList()
            this.msgSuccess('保存成功')
          }
        })
      }
    },
    initParam() {
      this.from = {
        unitName: '', //单位名称
        department: '', //部门名称
        job: '', //职务名称
        number: '', //编号
        password: '', //密码
        isDisableUnit: false //单位是否禁用
      }
    },
    // 删除
    delItem() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alert('删除接口')
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ]
    },
    // 补全后选择
    handleSelect(item) {
      console.log(item)
    },
    // 联想补全
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/index.scss';
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
