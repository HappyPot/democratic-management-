<template>
  <div id="mytest">
    <div class="frombuild">
      <div class="frombuild_left">
        <draggable class="drawing-board"
                   :list="drawingList"
                   :animation="340"
                   :scroll="true"
                   group="componentsGroup">
          <component v-for="item in drawingList"
                     :key="item.id"
                     :info="item"
                     :is="item.type"></component>
        </draggable>
      </div>
      <div class="frombuild_right">
        <div class="fr_title">自定义表单项</div>
        <div class="fr_tip">拖拽表单到左侧区域进行配置</div>
        <div class="draggable">
          <draggable v-model="draggableArr"
                     :scroll="true"
                     :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                     draggable=".draggable_item"
                     animation="300">
            <transition-group>
              <div class="draggable_item"
                   v-for="(item) in draggableArr"
                   :key="item.id">
                <img src="../image/dargg.png"
                     alt="">
                <span>{{item.des}}</span>
                <img class="dr_img"
                     :src="item.url"
                     alt="">
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'Deltest',
  components: {
    draggable
  },
  data() {
    return {
      draggableArr: [
        {
          id: 1,
          type: 'TextCom',
          des: '文字',
          value: '默认',
          url: require('../image/text.png'),
          config: {
            value: '',
            title: ''
          }
        },
        {
          id: 2,
          type: 'RadioCom',
          des: '单选', //标题全称
          url: require('../image/radio.png'),
          config: {
            value: 2,
            title: '', //标题简称
            valueArr: [
              {
                id: 1,
                label: '默认',
                value: 1
              },
              {
                id: 2,
                label: '默认2',
                value: 2
              }
            ]
          }
        },
        {
          id: 3,
          type: 'CheckboxCom',
          des: '多选',
          url: require('../image/checkbox.png'),
          config: {
            value: [2],
            title: '', //标题简称
            valueArr: [
              {
                id: 1,
                label: '默认',
                value: 1
              },
              {
                id: 2,
                label: '默认2',
                value: 2
              }
            ]
          }
        },
        {
          id: 4,
          type: 'SingleText',
          des: '单行文本',
          value: '默认单行文本',
          url: require('../image/linetext.png'),
          config: {
            value: '默认提示文字',
            title: '' //标题简称
          }
        },
        {
          id: 5,
          type: 'MultilineText',
          des: '多行文本',
          value: '默认单行文本',
          url: require('../image/multiline.png'),
          config: {
            value: '默认提示文字',
            title: '' //标题简称
          }
        }
      ],
      drawingList: [],
      componentsMap: {
        TextCom: 'TextCom'
      }
    }
  },
  watch: {
    drawingList(val) {
      console.log(val)
    }
  },
  methods: {
    // 开始拖动
    start(e) {
      console.log('开始', e)
    },
    // 拖动结束
    end(e) {
      console.log('结束', e)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.frombuild {
  display: flex;
  align-items: center;
  padding-right: 20px;
  box-sizing: border-box;
  .frombuild_left {
    width: 564px;
    border-right: 1px dashed #dfe1e8;
    min-height: 500px;
    padding-right: 24px;
  }
  .frombuild_right {
    width: 372px;
    min-height: 500px;
    margin-left: 24px;
    .fr_title {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1e263d;
    }
    .fr_tip {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 24px;
      color: #f25151;
      margin-top: 8px;
      margin-bottom: 20px;
    }
  }
}
.draggable_item {
  width: 348px;
  height: 56px;
  background: #f4f5f8;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-radius: 4px;
  padding-left: 13px;
  box-sizing: border-box;
  padding-right: 12px;
  img {
    width: 14px;
    height: 14px;
  }
  span {
    margin-left: 5px;
  }
  .dr_img {
    margin-left: auto;
  }
}
.drawing-board {
  height: 500px;
  overflow: auto;
  // background: red;
}
</style>