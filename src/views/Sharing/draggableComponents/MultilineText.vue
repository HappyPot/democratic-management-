<template>
  <div class="component">
    <div class="setting">
      <div class="setting_btn"
           @click="delCom"><img src="../image/delCom.png"></div>
      <div class="setting_btn"><img src="../image/settingCom.png"
             @click="settingCom"></div>
    </div>
    <div class="TextCom_content">
      <div class="config_title">{{comInfo.des}}</div>
      <div>
        <el-input class="inputcom"
                  style="width: 500px;"
                  type="textarea"
                  size="medium"
                  disabled
                  v-model="comInfo.value"></el-input>
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
        <div class="config_item">
          <div class="config_title">
            提示内容
          </div>
          <el-input class="inputcom"
                    type="textarea"
                    size="medium"
                    v-model="comInfo.value">
          </el-input>
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
  name: 'MultilineText',
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
      console.log('多行文字组件', this.comInfo)
      this.$emit('getData', this.comInfo)
      this.dialogConfigure = false
    },
    // 设置文本
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
.component {
  padding-bottom: 39px;
}
</style>