<template>
  <d2-container class="page">
    <div class="em_search">
      <div class="em_input">
        <el-autocomplete class="inline-input"
                         size="medium"
                         v-model="searchValue"
                         :fetch-suggestions="querySearch"
                         placeholder="搜索关键词"
                         prefix-icon="el-icon-search"
                         :trigger-on-focus="false"
                         @select="handleSelect"></el-autocomplete>
      </div>
      <div class="em_input_right">
        <div class="em_input">
          <el-button type="primary"
                     size="medium"
                     @click="addNew">新增</el-button>
        </div>
        <div class="em_input">
          <el-button type="danger"
                     size="medium"
                     plain
                     @click="delItem">删除</el-button>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="em_content">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column prop="id"
                         label="序号"> </el-table-column>
        <el-table-column prop="title"
                         label="标题名称"> </el-table-column>
        <el-table-column prop="start_time"
                         label="测评时间"
                         width="300">
          <template slot-scope="scope">
            {{ scope.row.start_time }}至{{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.status_name == '未开始'"
                 class="status_tiem">
              <i class="status noStart"></i>
              未开始
            </div>
            <div v-else-if="scope.row.status_name == '进行中'"
                 class="status_tiem">
              <i class="status start"></i>
              进行中
            </div>
            <div v-else-if="scope.row.status_name == '已结束'"
                 class="status_tiem">
              <i class="status over"></i>
              已结束
            </div>
            <!-- {{tableData[scope.$index].status?'未开始':"开始"}} -->
          </template>
        </el-table-column>
        <el-table-column prop="isEnable"
                         label="是否启用"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].isEnable"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showEdit(scope.row, scope.$index)">编辑</el-link>
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showStatistical(scope.row, scope.$index)">统计</el-link>
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showConfig(scope.row, scope.$index)">配置</el-link>
            <el-link type="primary"
                     style="margin-right: 12px"
                     @click="showPapers">底稿</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增与编辑-->
    <el-dialog :title="typeTitle"
               center
               top="4vh"
               class="dialogSelf"
               :visible.sync="dialogReview"
               width="700px">
      <Review ref="review"
              :parentData="parentData"></Review>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   v-show="typeTitle == '评议添加'"
                   @click="addNewDate">确 定</el-button>
        <el-button type="primary"
                   v-show="typeTitle == '评议编辑'"
                   @click="editData">更 新</el-button>
        <el-button @click="dialogReview = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 统计 -->
    <el-dialog title="统计结果"
               center
               top="7vh"
               class="dialogSelf"
               :visible.sync="dialogStatistics"
               width="972px">
      <Statistics :statisticsData="statisticsData"
                  @openDetail="openDetail"
                  v-if="dialogStatistics"></Statistics>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="statisticalData">确 定</el-button>
        <el-button @click="dialogStatistics = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 配置 -->
    <el-dialog title="事项配置"
               center
               top="7vh"
               class="dialogSelf"
               :visible.sync="dialogConfigure"
               width="1000px">
      <Configure ref="configure"
                 @getComponentParam="getComponentParam"></Configure>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="configData">确 定</el-button>
        <el-button @click="dialogConfigure = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 明细查询 -->
    <el-dialog title="明细查询"
               center
               class="dialogSelf"
               :visible.sync="dialogDetail"
               width="1000px">
      <DetailQuery v-if="dialogDetail"></DetailQuery>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogDetail = false">确 定</el-button>
        <el-button @click="dialogDetail = false">取 消</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import Review from './components/review'
import Statistics from '@/views/Sharing/components/statistics'
import Configure from '@/views/Sharing/components/configure'
import DetailQuery from '../../QuestionnaireInvestigation/SurveyList/components/detailQuery'

import {
  GET_QUESTION_LIST,
  GET_COUNT_QUESTION
} from '@/api/questionnaireInvestigation.js'
import {
  SAVE_QUESTION,
  SAVE_QUESTION_DETAIL,
  SAVE_QUESTION_CONFIG
} from '@/api/evaluationanagement.js'

import { mapState } from 'vuex'
export default {
  components: {
    Review,
    Configure,
    Statistics,
    DetailQuery
  },
  data() {
    return {
      typeTitle: '评议添加', //评议添加,评议编辑
      dialogReview: false, //控制新增和编辑
      dialogStatistics: false, //控制统计框
      dialogConfigure: false, //控制配置框
      dialogPapers: false, //控制低稿框
      dialogDetail: false, //明细查询
      searchValue: '', //搜索值
      restaurants: [],
      tableData: [],
      parentData: {}, //编辑组件中的数据
      //分页参数
      queryParams: {
        page: 1,
        page_size: 10
      },
      total: 0,
      statisticsData: [], //统计回显的数据
      question_id: -1
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
    this.subjectId = localStorage.getItem('evaluation_id')
    this.getQuestionList()
  },
  methods: {
    openDetail() {
      this.dialogDetail = true
    },
    getComponentParam(val) {
      console.log('组价中传输来的数据', val)
    },
    // 获取测评列表
    getQuestionList() {
      GET_QUESTION_LIST().then(res => {
        if (res.status === 0) {
          this.tableData = res.data.data
        }
      })
    },
    // 展示编辑框
    showEdit(row, index) {
      debugger
      SAVE_QUESTION_DETAIL({
        id: row.id
      }).then(res => {
        if (res.status === 0) {
          this.dialogReview = true
          this.typeTitle = '评议编辑'
          let data = res.data
          this.$nextTick(() => {
            this.$refs['review'].review.title = data.title
            this.$refs['review'].review.type = data.type
            this.$refs['review'].review.type = data.form_type
            this.$refs['review'].review.mark = data.desc
            this.$refs['review'].review.textarea = data.index_desc
            this.$refs['review'].review.date[0] = data.start_time
            this.$refs['review'].review.date[1] = data.end_time
            this.$refs['review'].review.isWaiver = data.is_waiver
            this.$refs['review'].review.isIp = data.is_ip
            this.$refs['review'].review.accessIp = data.ip_value
            this.$refs['review'].review.question_top_list = data.top
            let arr = []
            data.user_list.map(item => {
              arr.push(item.id)
            })
            this.$refs['review'].review.people = arr.join(',') //用于参评人员数量的的展示
            this.$refs['review'].review.peopleList = data.user_list //用于参评人员的table的展示
            this.$refs['review'].review.showPeopleConut =
              data.user_list.length + '人'
          })
        }
      })
    },
    // 更新
    editData() {
      let flag = this.$refs['review'].checkFrom()
      if (flag) {
        // 只有校验成功才能提交
        console.log('评级编辑参数', this.$refs['review'].review)
      }
      console.log('flag', flag)
      console.log('更新')
    },
    // 展示统计框
    showStatistical(row, index) {
      let obj = {
        page_size: this.queryParams.page_size,
        page: this.queryParams.page,
        question_id: row.id
      }
      console.log('统计查询参数', obj)
      GET_COUNT_QUESTION(obj).then(res => {
        this.dialogStatistics = true
        let map = res.data[0].config
        this.statisticsData = res.data
        if (res.status === 0) {
          console.log('统计返回值', res.data)
        }
      })
    },
    // 统计数据提交
    statisticalData() {},
    // 展示配置框
    showConfig(row, index) {
      this.dialogConfigure = true
      this.question_id = row.id
    },
    // 配置框数据提交 保存测评
    configData() {
      let obj = {
        question_id: this.question_id,
        issue_list: this.$refs['configure'].issue_list
      }
      SAVE_QUESTION_CONFIG(obj).then(res => {
        if (res.status == 0) {
          this.dialogConfigure = false
          this.msgSuccess('保存成功')
        }
      })
    },
    // 展示底稿框
    showPapers() {},
    handleSelectionChange() {},
    // 展示新增框
    addNew() {
      this.dialogReview = true
      this.typeTitle = '评议添加'
      this.initParam()
    },
    initParam() {
      this.$refs['review'].review = {
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
        appraisalSubject: [] //评议主体
      }
    },
    // 新增
    addNewDate() {
      // 调用组件中的表单校验方法
      let flag = this.$refs['review'].checkFrom()
      if (flag) {
        let review = this.$refs['review'].review
        let question_top_list = []
        review.appraisalSubject.map((item, index) => {
          let obj = {
            title: item,
            sort: index
          }
          question_top_list.push(obj)
        })
        let param = {
          title: review.title,
          type: review.type,
          form_type: review.type,
          desc: review.mark,
          index_desc: review.textarea,
          start_time: review.date[0],
          end_time: review.date[1],
          is_waiver: review.isWaiver,
          is_ip: review.isIp,
          ip_value: review.accessIp,
          question_top_list: question_top_list,
          question_user_list: review.people.split(',')
        }
        console.log('param11', param)
        SAVE_QUESTION(param).then(res => {
          if (res.status === 0) {
            this.dialogReview = false
            this.getQuestionList()

            this.msgSuccess('保存成功')
          }
        })
      }
    },
    // 删除
    delItem() {},
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
    }
  }
}
</script>
<style lang="scss" scoped>
.em_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.em_input_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.em_input {
  margin: 0 6px;
}
.em_content {
  padding-top: 20px;
}
.em_content ::v-deep .el-table th,
.el-table tr {
  background: #f4f5f8 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #7984a7 !important;
  opacity: 1;
}

.em_content {
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