<template>
  <div class="component">
    <div class="setting">
      <div class="setting_btn"><img src="../image/delCom.png"></div>
      <div class="setting_btn"><img src="../image/settingCom.png"
             @click="settingCom"></div>
    </div>
    <div class="TextCom_content">
      {{comInfo.value}}
    </div>
    <el-dialog title="选项配置"
               append-to-body
               center
               :visible.sync="dialogConfigure"
               width="700px">
      <div class="config_box">
        <div class="config_title">
          {{comInfo.config.title || '文本内容'}}
        </div>
        <el-input type="textarea"
                  v-model="comInfo.value">
        </el-input>
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
  name: 'TextCom',
  props: {
    info: {
      type: Object,
      default: () => {
        value: '默认值'
        dec: ''
      }
    }
  },
  data() {
    return {
      comInfo: null,
      dialogConfigure: false
    }
  },
  created() {
    this.comInfo = this.$deepClone(this.info)
  },
  methods: {
    // 保存数据
    saveData() {
      console.log('文字组件', this.comInfo)
      this.comInfo.uuid = this.uuid.v1()
      this.$emit('getData', this.comInfo)
      this.dialogConfigure = false
    },
    // 设置文本
    settingCom() {
      this.dialogConfigure = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>