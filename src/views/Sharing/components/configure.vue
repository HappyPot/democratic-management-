<template>
  <div id="mytest">
    <div class="frombuild">
      <div class="frombuild_left">
        <draggable
          class="drawing-board"
          v-model="drawingList"
          :animation="340"
          :scroll="true"
          group="componentsGroup"
        >
          <component
            v-if="isYes"
            v-for="(item, index) in drawingList"
            :key="index.id"
            :info="item"
            @getData="getData"
            @delCom="delCom"
            :is="item.type"
          ></component>
        </draggable>
      </div>
      <div class="frombuild_right">
        <div class="fr_title">自定义表单项</div>
        <div class="fr_tip">拖拽表单到左侧区域进行配置</div>
        <div class="draggable">
          <draggable
            v-model="draggableArr"
            :scroll="true"
            :clone="clone"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            draggable=".draggable_item"
            animation="300"
          >
            <transition-group>
              <div
                class="draggable_item"
                v-for="(item, index) in draggableArr"
                :key="index + '1'"
              >
                <img src="../image/dargg.png" alt="" />
                <span>{{ item.des }}</span>
                <img class="dr_img" :src="item.url" alt="" />
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "Deltest",
  components: {
    draggable,
  },
  mounted() {
    setTimeout(() => {
      console.log("aaa", this.drawingList);
    }, 1000);
  },
  data() {
    return {
      draggableArr: [
        {
          id: 1,
          type: "TextCom",
          typeParam: 2,
          des: "文字",
          value: "默认",
          url: require("../image/text.png"),
          config: {
            value: "",
            title: "",
          },
        },
        {
          id: 2,
          type: "RadioCom",
          typeParam: 1,
          des: "单选", //标题全称
          url: require("../image/radio.png"),
          config: {
            value: 2,
            title: "", //标题简称
            valueArr: [
              {
                id: 1,
                content: "默认",
                value: 1,
              },
              {
                id: 2,
                content: "默认2",
                value: 2,
              },
            ],
          },
        },
        {
          id: 3,
          type: "CheckboxCom",
          typeParam: 3,
          des: "多选",
          url: require("../image/checkbox.png"),
          config: {
            value: [2],
            title: "", //标题简称
            valueArr: [
              {
                id: 1,
                content: "默认",
                value: 1,
              },
              {
                id: 2,
                content: "默认2",
                value: 2,
              },
            ],
          },
        },
        {
          id: 4,
          type: "SingleText",
          typeParam: 4,
          des: "单行文本",
          value: "默认单行文本",
          url: require("../image/linetext.png"),
          config: {
            value: "默认提示文字",
            title: "", //标题简称
          },
        },
        {
          id: 5,
          type: "MultilineText",
          typeParam: 5,
          des: "多行文本",
          value: "默认单行文本",
          url: require("../image/multiline.png"),
          config: {
            value: "默认提示文字",
            title: "", //标题简称
          },
        },
      ],
      drawingList: [], //左侧
      componentDataList: [],
      issue_list: [],
      isYes: true,
    };
  },
  methods: {
    clone(origin) {
      const data = JSON.parse(JSON.stringify(origin));
      data.uuid = this.uuid.v1();
      this.getData(data);
      return data;
    },
    // 删除组件
    delCom(val) {
      this.isYes = false;
      let index = undefined;
      let arr = JSON.parse(JSON.stringify(this.drawingList));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uuid == val) {
          index = i;
        }
      }
      arr.splice(index, 1);
      this.drawingList = arr;
      setTimeout(() => {
        this.isYes = true;
      }, 0);
    },
    // 获取组件中的数据
    getData(val) {
      for (let i = 0; i < this.drawingList.length; i++) {
        if (this.drawingList[i].uuid == val.uuid) {
          this.drawingList[i] = val;
        }
      }
      this.issue_list = [];
      this.drawingList.map((item, index) => {
        if (item.typeParam == 1 || item.typeParam == 3) {
          let obj = {
            issue: item.des,
            type: item.typeParam,
            sort: index,
            config: item.config.valueArr,
          };
          this.issue_list.push(obj);
        } else {
          let obj = {
            issue: item.des,
            type: item.typeParam,
            sort: index,
          };
          this.issue_list.push(obj);
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
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