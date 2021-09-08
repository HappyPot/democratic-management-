<template>
  <div class="review">
    <div class="screen"
         @click="showScreen">
      <img src="../../../../assets/image/screen.png"
           alt="">
    </div>
    <div class="screen_content"
         v-if="isShowScreen">
      <div class="pc_head">
        <div>
          <wlTreeSelect leaf
                        width="200"
                        size="small"
                        placeholder="测评对象"
                        style="margin-right:10px"
                        checkbox
                        :data="evaluationOptions"
                        @change="hindleChanged"
                        v-model="evaluation"></wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect leaf
                        width="200"
                        size="small"
                        placeholder="单位"
                        style="margin-right:10px"
                        checkbox
                        :data="unitOptions"
                        @change="hindleChanged"
                        v-model="unit"></wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect leaf
                        width="200"
                        size="small"
                        placeholder="部门"
                        style="margin-right:10px"
                        checkbox
                        :data="departmentOptions"
                        @change="hindleChanged"
                        v-model="department"></wlTreeSelect>
        </div>
        <div>
          <wlTreeSelect leaf
                        width="200"
                        style="margin-right:10px"
                        size="small"
                        placeholder="职务"
                        checkbox
                        :data="jobOptions"
                        @change="hindleChanged"
                        v-model="job"></wlTreeSelect>
        </div>
        <div class="pc_item">
          <el-button size="small"
                     type="primary"
                     plain>搜索</el-button>
        </div>
        <div class="pc_item"></div>
        <div class="pc_item"></div>
      </div>
    </div>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="测评明细"
                   name="first">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">
              1.品德修养好，为人诚实守信【单选】
            </div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column prop="id"
                               label="序号">
              </el-table-column>
              <el-table-column prop="name"
                               label="人员编码">
              </el-table-column>
              <el-table-column prop="date"
                               label="单位名称">
              </el-table-column>
              <el-table-column prop="date"
                               label="部门名称">
              </el-table-column>
              <el-table-column prop="date"
                               label="人员类别">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
              </el-table-column>
              <el-table-column prop="date"
                               label="提交时间">
              </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="测评对象汇总"
                   name="second">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">
              1.品德修养好，为人诚实守信【单选】
            </div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableData"
                      style="width: 100%">
              <el-table-column prop="date"
                               label="测评对象">
              </el-table-column>
              <el-table-column prop="date"
                               label="总数">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="比较满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="一般">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="不满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="弃权">
              </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单位汇总"
                   name="third">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">
              1.品德修养好，为人诚实守信【单选】
            </div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataUnit"
                      style="width: 100%">
              <el-table-column prop="date"
                               label="单位">
              </el-table-column>
              <el-table-column prop="date"
                               label="总数">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="比较满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="一般">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="不满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="弃权">
              </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="部门汇总"
                   name="fourth">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">
              1.品德修养好，为人诚实守信【单选】
            </div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataDep"
                      style="width: 100%">
              <el-table-column prop="date"
                               label="部门">
              </el-table-column>
              <el-table-column prop="date"
                               label="总数">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="比较满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="一般">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="不满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="弃权">
              </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人员类别汇总"
                   name="five">
        <div class="baseInfo">
          <div class="baseInfo_item">
            <div class="bt_title">
              1.品德修养好，为人诚实守信【单选】
            </div>
          </div>
          <!-- 表格部分 -->
          <div class="base_table">
            <el-table :data="tableDataPeople"
                      style="width: 100%">
              <el-table-column prop="date"
                               label="人员类别">
              </el-table-column>
              <el-table-column prop="date"
                               label="总数">
              </el-table-column>
              <el-table-column prop="date"
                               label="满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="比较满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="一般">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="不满意">
                <el-table-column prop="date"
                                 label="票">
                </el-table-column>
                <el-table-column prop="date"
                                 label="率">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="date"
                               label="弃权">
              </el-table-column>
            </el-table>
            <div class="pagination_my">
              <!-- <pagination @current-change="handleCurrentChange"
                          v-show="total > 0"
                          :total="total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getList"
                          layout="prev, pager, next" /> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import wlTreeSelect from '../../../../components/wl-tree-select/index'
export default {
  name: 'DetailQuery',
  components: {
    wlTreeSelect
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      evaluation: '', //测评对象值
      evaluationOptions: [], //测评对象列表
      unit: '', //单位
      unitOptions: [], //单位列表,
      department: '', //部门
      departmentOptions: [], //部门列表
      job: '', //职务
      jobOptions: [], //职务列表
      isShowScreen: false,
      activeName: 'first', //默认标签框
      total: 0, //总条数
      queryParams: {
        //分页参数
        pageNum: 1,
        pageSize: 10
      },
      // 部门汇总
      tableDataDep: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      // 人员类别
      tableDataPeople: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      tableDataUnit: [
        //单位汇总
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      tableDataEvaluation: [
        //测评对象
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      tableData: [
        //测评明细
        {
          id: 1,
          date: '2021-',
          status: 1,
          name: '01师'
        },
        {
          id: 2,
          date: '2021-',
          status: 2,
          name: '01师'
        }
      ],
      // evaluationOptions: [
      //   {
      //     id: 'love',
      //     name: '所有和你走过的风光',
      //     children: [
      //       {
      //         id: 1,
      //         name: '海边',
      //         children: [
      //           {
      //             id: 5,
      //             name: '蓬莱'
      //           }
      //         ]
      //       },
      //       {
      //         id: 2,
      //         name: '森林'
      //       },
      //       {
      //         id: 3,
      //         name: '草原'
      //       },
      //       {
      //         id: 4,
      //         name: '古城'
      //       }
      //     ]
      //   }
      // ],
      selected: [] // 树下拉框选中数据
    }
  },
  methods: {
    handleSelectionChange(val) {},
    // 打开筛选款
    showScreen() {
      this.isShowScreen = !this.isShowScreen
    },
    hindleChanged(val) {
      console.log(val, 2)
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
  width: 16px;
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
  min-height: 100px;
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
</style>