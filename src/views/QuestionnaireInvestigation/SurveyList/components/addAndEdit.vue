<template>
  <div class="baseInfo">
    <div class="baseInfo_item">
      <div class="bt_title">
        调查标题
      </div>
      <div class="bt_input">
        <el-input size="medium"
                  v-model="review.title"></el-input>
        <span class="errorTip"
              data-name="title"> <i class="el-icon-circle-close"></i> 请输入调查标题，在提交</span>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        调查分类
      </div>
      <div class="bt_input">
        <el-select v-model="review.surveyClass"
                   style="width:500px"
                   size="medium"
                   placeholder="请选择类别">
          <el-option v-for="item in classOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span class="errorTip"
              data-name="title"> <i class="el-icon-circle-close"></i> 请选择调查分类，在提交</span>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        调查时间
      </div>
      <div class="bt_input">
        <el-date-picker style="width:500px"
                        v-model="review.date"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
        <span class="errorTip"
              data-name="date"> <i class="el-icon-circle-close"></i> 请选择调查时间，在提交</span>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        调查说明
      </div>
      <div class="bt_input">
        <el-input size="medium"
                  type="textarea"
                  :rows="2"
                  v-model="review.mark"></el-input>
        <span class="errorTip"
              data-name="mark"> <i class="el-icon-circle-close"></i> 请输入调查说明，在提交</span>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        是否同IP参与调查
      </div>
      <div class="bt_input">
        <el-radio-group v-model="review.isIp">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        允许IP段
      </div>
      <div class="bt_input">
        <el-input size="medium"
                  type="textarea"
                  :rows="2"
                  v-model="review.accessIp"></el-input>
        <span class="errorTip"
              data-name="accessIp"> <i class="el-icon-circle-close"></i> 请输入允许IP段，在提交</span>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        评议类型
      </div>
      <div class="bt_input">
        <el-radio-group v-model="review.type">
          <el-radio :label="1">定向评议</el-radio>
          <el-radio :label="2">社会评议</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        参评调查人员
      </div>
      <div class="bt_input">
        <el-select v-model="review.people"
                   style="width:500px"
                   size="medium"
                   placeholder="请选择参评人员">
          <el-option v-for="item in peopleOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span class="errorTip"
              data-name="accessIp"> <i class="el-icon-circle-close"></i> 请选择参评调查人员，在提交</span>
      </div>
    </div>
    <div class="baseInfo_group">
      <div class="baseInfo_item">
        <div class="bt_title">
          是否允许弃权
        </div>
        <div class="bt_input"
             style="width:376px">
          <el-radio-group v-model="review.isWaiver">
            <div class="radio_item">
              <el-radio :label="1">是</el-radio>
            </div>
            <div class="radio_item">
              <el-radio :label="2">否</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="baseInfo_item">
        <div class="bt_title">
          是否启用
        </div>
        <div class="bt_input"
             style="width:200px">
          <el-radio-group v-model="review.status">
            <div class="radio_item">
              <el-radio :label="1">是</el-radio>
            </div>
            <div class="radio_item">
              <el-radio :label="2">否</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddAndEdit',
  data() {
    return {
      classOptions: [], //调查分类列表
      review: {
        surveyClass: '', //调查分类值
        title: '', //调查标题
        date: '', //调查时间
        mark: '', //调查说明
        isIp: 1, //是否同IP参评
        accessIp: '', //允许IP段
        type: 1, //评议类型
        isWaiver: 1, //是否允许弃权
        status: '', //是否启用
        people: '' //参评人员
      }
    }
  },
  methods: {
    // 表单校验
    checkFrom() {
      this.fromValidate(this.review)
      // 校验评议主体
      return this.accessSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.baseInfo_group {
  display: flex;
  align-items: center;
}
.baseInfo_item {
  margin-bottom: 16px;
}
.bt_title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: #7984a7;
  margin-bottom: 8px;
}
.bt_input {
  width: 500px;
  position: relative;
  .del_btn {
    position: absolute;
    top: 50%;
    right: -5%;
    transform: translateY(-50%);
  }
}
</style>

