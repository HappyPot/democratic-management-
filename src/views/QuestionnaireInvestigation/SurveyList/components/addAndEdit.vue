<template>
  <div class="baseInfo">
    <div class="baseInfo_item">
      <div class="bt_title">
        调查标题
      </div>
      <div class="bt_input">
        <el-input size="medium"
                  v-model="review.title"></el-input>
      </div>
    </div>
    <div class="baseInfo_item">
      <div class="bt_title">
        调查分类
      </div>
      <div class="bt_input">
        <el-select v-model="surveyClass"
                   style="width:500px"
                   size="medium"
                   placeholder="请选择类别">
          <el-option v-for="item in classOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
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
        <el-select v-model="people"
                   style="width:500px"
                   size="medium"
                   placeholder="请选择参评人员">
          <el-option v-for="item in peopleOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
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
      surveyClass: '', //调查分类值
      review: {
        title: '', //评议标题
        date: '', //评议时间
        mark: '', //评议说明
        isIp: 1, //是否同IP参评
        accessIp: '', //允许IP段
        type: '', //评议类型
        isWaiver: 1, //是否允许弃权
        status: '', //评议状态
        people: '' //参评人员
      }
    }
  }
}
</script>
<style>
.baseInfo_group {
  display: flex;
  align-items: center;
}
.baseInfo_item {
  margin-bottom: 16px;
}
</style>

