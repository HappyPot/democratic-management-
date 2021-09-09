<template>
  <d2-container class="page">
    <div class="survey_list">
      <div class="sl_search">
        <div class="sl_input">
          <el-autocomplete class="inline-input"
                           size="medium"
                           v-model="searchValue"
                           :fetch-suggestions="querySearch"
                           placeholder="搜索关键词"
                           prefix-icon="el-icon-search"
                           :trigger-on-focus="false"
                           @select="handleSelect"></el-autocomplete>
        </div>
        <div class="sl_input_right">
          <div class="sl_input">
            <el-button type="primary"
                       size="medium"
                       @click="addNew">新增</el-button>
          </div>
          <div class="sl_input">
            <el-button type="danger"
                       size="medium"
                       plain
                       @click="delItem">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="sl_content">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="id"
                         label="序号">
        </el-table-column>
        <el-table-column prop="name"
                         label="问卷标题">
        </el-table-column>
        <el-table-column prop="date"
                         label="问卷形式">
        </el-table-column>
        <el-table-column prop="date"
                         label="调查形式">
        </el-table-column>
        <el-table-column prop="date"
                         label="调查时间">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="tableData[scope.$index].status == 1"
                 class="status_tiem">
              <i class="status noStart"></i>
              未开始
            </div>
            <div v-else-if="tableData[scope.$index].status == 2"
                 class="status_tiem">
              <i class="status start"></i>
              进行中
            </div>
            <div v-else-if="tableData[scope.$index].status == 3"
                 class="status_tiem">
              <i class="status over"></i>
              已结束
            </div>
            <!-- {{tableData[scope.$index].status?'未开始':"开始"}} -->
          </template>
        </el-table-column>
        <el-table-column prop="date"
                         label="是否启用">
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].isEnable">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         show-overflow-tooltip>
          <template>
            <el-link type="primary"
                     style="margin-right:12px">编辑</el-link>
            <el-link type="primary"
                     style="margin-right:12px"
                     @click="showStatistics">统计</el-link>
            <el-link type="primary"
                     style="margin-right:12px">配置</el-link>
            <el-link type="primary"
                     style="margin-right:12px">底稿</el-link>
            <el-link type="danger"
                     style="margin-right:12px">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 统计 -->
    <el-dialog title="统计结果"
               center
               class="dialogSelf"
               :visible.sync="dialogStatistics"
               width="972px">
      <Statistics></Statistics>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStatistics = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogStatistics = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 配置 -->
    <el-dialog title="事项配置"
               center
               class="dialogSelf"
               :visible.sync="dialogConfigure"
               width="1000px">
      <Configure></Configure>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogConfigure = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogConfigure = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增和编辑 -->
    <el-dialog :title="addEditType"
               center
               class="dialogSelf"
               :visible.sync="dialogEdit"
               width="1000px">
      <AddAndEdit></AddAndEdit>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogEdit = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 明细查询 -->
    <el-dialog title="事项配置"
               center
               class="dialogSelf"
               :visible.sync="dialogDetail"
               width="1000px">
      <DetailQuery></DetailQuery>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogDetail = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogDetail = false">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import Statistics from '@/views/Sharing/components/statistics'
import Configure from '@/views/Sharing/components/configure'
import AddAndEdit from './components/addAndEdit'
import DetailQuery from './components/detailQuery'
export default {
  components: {
    Statistics,
    Configure,
    AddAndEdit,
    DetailQuery
  },
  data() {
    return {
      addEditType: '新增', //新增或者编辑
      dialogEdit: false, //新增和编辑
      dialogStatistics: false, //统计弹框展示
      dialogConfigure: false, //事项配置
      dialogDetail: true, //明细弹框
      searchValue: '',
      restaurants: [],
      tableData: [
        {
          id: 1,
          date: '2021-10-01至2021-10-31',
          status: 1,
          name: '01师',
          isEnable: false
        }
      ]
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    addNew() {},
    delItem() {},
    // 打开统计弹框
    showStatistics() {
      this.dialogStatistics = true
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
    // 补全后选择
    handleSelect(item) {
      console.log(item)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.sl_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sl_input_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sl_input {
  margin: 0 6px;
}
.sl_content {
  padding-top: 20px;
}
.sl_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}

.sl_content {
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
</style>