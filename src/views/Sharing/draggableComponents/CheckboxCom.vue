<template>
  <div class="component">
    <div class="setting">
      <div class="setting_btn"
           @click="delCom"><img src="../image/delCom.png"></div>
      <div class="setting_btn"><img src="../image/settingCom.png"
             @click="settingCom"></div>
    </div>
    <div class="com_content">
      <div class="config_title">{{comInfo.des}}</div>
      <div>
        <el-checkbox-group v-model="comInfo.config.value">
          <div class="compo">
            <el-checkbox v-for="(item) in comInfo.config.valueArr"
                         :key="item.id"
                         :label="item.value">{{item.content}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <el-dialog title="选项配置"
               append-to-body
               center
               :visible.sync="dialogConfigure"
               :close-on-click-modal="false"
               width="700px">
      <div class="config_box">
        <div class="config_item">
          <div class="config_title">
            标题全称
          </div>
          <el-input class="inputcom"
                    size="medium"
                    v-model="comInfo.des">
          </el-input>
        </div>
        <div class="config_item">
          <div class="config_title">
            标题简称
          </div>
          <el-input class="inputcom"
                    size="medium"
                    v-model="comInfo.config.title">
          </el-input>
        </div>
        <div class="config_item"
             v-for="(item,index) in comInfo.config.valueArr"
             :key="item.id">
          <div class="config_title">
            选项{{item.id}}
          </div>
          <el-input class="inputcom"
                    size="medium"
                    v-model="item.content">
          </el-input>
          <div class="del_icon"
               @click="delItem(index)">
            <i class="el-icon-delete"
               style="color:red"></i>
          </div>
        </div>
        <div class="config_item">
          <el-button type="primary"
                     class="inputcom"
                     icon="el-icon-plus"
                     plain
                     @click="addConfigItem">添加选项</el-button>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogConfigure = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CheckboxCom',
  props: {
    info: {
      type: Object,
      default: () => {
        value: '默认值'
        des: ''
      }
    }
  },
  data() {
    return {
      dialogConfigure: false,
      comInfo: null
    }
  },
  created() {
    this.comInfo = this.$deepClone(this.info)
    console.log('复选框组件', this.comInfo)
  },
  methods: {
    // 保存数据
    saveData() {
      // this.comInfo.uuid = this.uuid.v1()
      this.$emit('getData', this.comInfo)
      this.dialogConfigure = false
    },
    // 添加选项
    addConfigItem() {
      let arr = this.comInfo.config.valueArr
      arr.push({
        id: arr.length + 1,
        content: `默认${arr.length + 1}`,
        value: arr.length + 1
      })
    },
    // 删除选项
    delItem(index) {
      this.comInfo.config.valueArr.splice(index, 1)
    },
    settingCom() {
      this.dialogConfigure = true
    },
    delCom() {
      this.$emit('delCom', this.comInfo.uuid)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>