<template>
  <div>
    <div class="rightWapper">
      <div class="right_one" ref="right_one">
        <div class="chaxun">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="selectDeviceByNumberFun"
                >查询</el-button
              >
            </el-form-item>
            <!-- <el-form-item> 12312 </el-form-item> -->
          </el-form>
        </div>
        <template>
          <div class="scroll_wapper">
            <div
              class="right_info"
              v-if="this.SElec_DetailElecDevice_List_Copy == ''"
            >
              <ul
                class="olList"
                v-for="(item, index) in SElec_DetailElecDevice_List"
                :key="index"
                @click="echart_wapper(item.BH)"
              >
                <li>
                  <span v-if="item.value != null || item.value != undefined"
                    >{{ index + 1 }}.</span
                  >
                  <span v-else>设备号:</span> {{ item.text }}
                </li>

                <li v-if="item.value != null || item.value != undefined">
                  报警次数:{{ item.value }}
                </li>
                <li v-else>设备名称:{{ item.device_name }}</li>

                <li>地址:{{ item.MC || "暂无" }}</li>
              </ul>
            </div>
            <div class="right_info" v-else>
              <ul
                class="olList"
                v-for="(item, index) in SElec_DetailElecDevice_List_Copy"
                :key="index"
                @click="see(item.BH, item.text, item.productNumber)"
              >
                <li v-if="item.text != null || item.text != undefined">
                  <span v-if="item.value != null || item.value != undefined"
                    >{{ index + 1 }}.</span
                  >
                  <span v-else>设备号:</span> {{ item.text }}
                </li>

                <li v-if="item.value != null || item.value != undefined">
                  报警次数:{{ item.value }}
                </li>
                <li v-else>设备名称:{{ item.device_name }}</li>

                <li>地址:{{ item.MC || "暂无" }}</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
    <!-- 搜索内容弹窗 -->
  </div>
</template>

<script>
import PublicPopUps from "../translate/publicPopUps.vue";
import { selectDeviceByNumber } from "@/api/index.js";
export default {
  props: ["SElec_DetailElecDevice_List", "pagetype"],
  data() {
    return {
      DeviceHistory: "",
      SElec_DetailElecDevice_List_Copy: [],
      fazhishezhi: {
        SYDL: "",
        AXDL: "",
        BXDL: "",
        CXDL: "",
        AXWD: "",
        BXWD: "",
        CXWD: "",
        NXWD: "",
        AXDY: "",
        BXDY: "",
        CXDY: "",
      },
      baoxiandanhao: "",
      ElecDataList_images: [],
      ElecDataList: "",
      getDeviceByPidList: "",
      loading: true,
      GetMapDataList: "",
      GetMapDataListName: {
        name: "",
        callPolice: "",
        onLine: "",
        offLine: "",
      },
      managementInput: "",
      //独立烟感
      SmartIndependentSmokeDialog: false,
      //重点部位
      KeyPartsDialog: false,
      // 火灾报警
      FireAlarmSystemDialog: false,
      msg: "",
      FireWaterSystemDialog: false,
      equipmentColor: "onLine",
      sizeForm: {
        date2: "",
        date1: "",
      },
      innerVisible_lishi: false,
      checkList: [],
      activeName: "second",
      input: "",
      innerVisible: false,
      dialogVisible: false,
      onlineVisible: false,
      innerVisible_shebei: false,
      offlineVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      getDeviceByDevIdList: "",
      shengyu_loudian: "",
      ElecDataList_typeName: "",
      currentPage4: 1,
      tableData: [],
      getHistoryFault: "",
    };
  },
  mounted() {
    // console.log(this.SElec_DetailElecDevice_List, 4564565);
    // undefined;
  },
  components: {
    PublicPopUps,
  },
  watch: {
    SElec_DetailElecDevice_List(val) {
      this.SElec_DetailElecDevice_List_Copy = "";
    },
  },
  computed: {
    listData() {
      // console.log();
      return this.$store.state.DeviceProjectNewData;
    },
  },

  methods: {
    see(data, address, productNumber) {
      //是否为地址搜索
      if (address == undefined) {
        this.$refs.publicPopUps.initOff();
        this.$refs.publicPopUps.echart_wapper(data);
      } else {
        this.$refs.publicPopUps.see(data, productNumber);
      }
      // console.log(address, 98798789798);
    },
    echart_wapper(data) {
      this.$refs.publicPopUps.initOff();
      this.$refs.publicPopUps.echart_wapper(data);
    },
    selectDeviceByNumberFun() {
      var reg = new RegExp("^[0-9]*$");
      let dataInfo = [];
      if (reg.test(this.formInline.user)) {
        selectDeviceByNumber(this.formInline.user).then((res) => {
          this.loading = false;
          res.data.forEach((el, index) => {
            el.text = el.productNumber;
            el.MC = el.installLocation;
            el.BH = el.devId;
          });
          if (res.data.length <= 0) {
            return this.$message.error("关键词未查询到相关信息");
          }
          this.SElec_DetailElecDevice_List_Copy = res.data;
        });
      } else {
        console.log(this.listData, 77777777);
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].address.indexOf(this.formInline.user) >= 0) {
            // console.log(data[i].address, 99999)
            this.listData[i].device_name = this.listData[i].name;
            this.listData[i].MC = this.listData[i].address;
            this.listData[i].BH = this.listData[i].pid;
            dataInfo.push(this.listData[i]);
          }
        }
        // console.log(dataInfo);
        if (dataInfo.length <= 0) {
          return this.$message.error("关键词未查询到相关信息");
        }

        this.SElec_DetailElecDevice_List_Copy = dataInfo;
      }
    },
  },
  updated() {
    // console.log(123);
    if (this.SElec_DetailElecDevice_List.length > 0) {
      this.$refs.right_one.style.height = "2.34" + "rem";
    }
    if (this.SElec_DetailElecDevice_List_Copy.length > 0) {
      this.$refs.right_one.style.height = "2.34" + "rem";
    }
  },
};
</script>
<style lang='less' scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   background-color: rgb(13, 30, 77);
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px #1b6c89;
//   background-color: #1b6c89;
// }

.row-bg {
  padding: 5px 10px;

  // background-color: #f9fafc;
}
.titleWapper {
  /deep/.el-dialog__header {
    background: rgb(20, 49, 108);
    padding: 0;
    // /deep/.el-dialog__title {
    //   width: 255px;
    //   height: 30px;
    //   display: inline-block;
    //   background: linear-gradient(90deg, #3053af, #14295a);
    //   color: #fff;
    // }
    // /deep/.el-dialog__headerbtn .el-dialog__close {
    //   color: #fff;
    // }
  }
  /deep/.el-dialog__body {
    color: #fff;
    height: 100%;
    background: linear-gradient(0deg, rgb(39, 65, 132), rgb(2, 17, 50, 0.62));

    border: 1px solid #3486da;
    // border-radius: 6px;
  }
  .title_name {
    width: 255px;
    height: 30px;
    background: linear-gradient(90deg, #3053af, #14295a);
    line-height: 30px;
    padding-left: 16px;
  }
  .scroll_wapper {
    margin-top: 15px;
    // position: relative;
    overflow-y: auto;
    height: 370px; //高度根据需求自行设定
    overflow-x: hidden;
  }
  .scroll_wapper ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .left_one {
    margin-top: 15px;
    // width: 371px;
    // height: 131px;
    background: linear-gradient(-87deg, #3053af, #14295a);
    border: 1px solid #3486da;
    ul {
      margin: 15px 0 0 15px;
      li {
        margin-bottom: 10px;
      }
    }
  }

  .right_wapper {
    margin-top: 30px;
    .one {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #f830af;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .one_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .two {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #30ff32;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .two_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .three {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.5);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #c0cbe9;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }
    .three_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .four {
      height: 274px;
      border: 1px solid #3486da;
      p {
        &:nth-child(1) {
          width: 180px;
          height: 30px;
          background: linear-gradient(90deg, #3053af, #14295a);
          line-height: 30px;
          padding-left: 16px;
          // margin-top: 14px;
          margin: 15px 0 0 15px;
        }
        &:nth-child(2) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(3) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(4) {
          padding: 0 16px;
          text-indent: 2em;
        }
      }
    }
    .five {
      height: 274px;
      border: 1px solid #3486da;
      p {
        width: 180px;
        height: 30px;
        background: linear-gradient(90deg, #3053af, #14295a);
        line-height: 30px;
        padding-left: 16px;
        margin: 15px 0 0 15px;
      }
      .echart_wapper {
        height: 230px;
      }
    }
  }
}
/deep/.el-textarea__inner {
  width: 90%;
  margin-left: 15px;
}
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}

// /deep/.el-button--primary {
//   background: #1071e2;
// }
.chakan {
  cursor: pointer;
  color: #1071e2;
}
.shezhi_left {
  // background: #bfa;
  height: 160px;
  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  .titleP {
    margin-left: 20px;
    line-height: 40px;
    // text-align: center;
  }
  ul {
    border-top: 1px solid #f3f6fa;
    padding-left: 20px;
    li {
      margin-top: 8px;
    }
  }
}
.shizhi_right {
  .right_one {
    margin-left: 20px;
    height: 265px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    /deep/.el-button {
      width: 100%;
    }
  }
  .right_two {
    margin-top: 20px;
    margin-left: 20px;
    height: 580px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    .tabs {
      padding: 10px 30px;
      p {
        margin-bottom: 5px;
        // margin-top: 20px;
      }
      .tabs_one {
        /deep/.el-input__inner {
          margin-bottom: 20px;
        }
      }

      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
.shebeiWapper {
  margin-top: 25px;
  display: flex;
  height: 1600px;
  .shebeiInfo {
    .one {
      width: 300px;
      height: 315px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;
        li {
          margin-top: 8px;
        }
      }
    }
    .two {
      margin-top: 20px;
      width: 300px;
      height: 250px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      // background: #bfa;
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }
      /deep/.el-button--mini {
        margin: 10px 0 0 15px;
      }
    }
  }
  .shebeiEcharts {
    margin-left: 20px;
    width: 750px;
    height: 212px;
    // background: #bfa;
    .imgWapper {
      height: 90px;
      text-align: center;
      background: #1071e2;
      div {
        // line-height: 90px;
        padding-top: 3px;
        p {
          color: #fff;
        }
      }
      ul {
        margin-top: -10px;
        text-align: left;
        span {
          color: red;
        }
      }
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      height: 212px;
      ul {
        margin-left: 15px;
        li {
          margin-top: 15px;
        }
      }
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .two_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_two_search {
        width: 100%;
        height: 300px;
      }
    }
    .three_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_three_search {
        width: 100%;
        height: 300px;
      }
    }
    .four_echarts {
      height: 200px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_four_search {
        width: 100%;
        height: 160px;
      }
    }
    .one_echarts {
      height: 340px;
      // background: #bfa;

      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_one_search {
        width: 100%;
        height: 300px;
      }
    }
  }
}
.rightWapper {
  margin-top: 50px;
  position: absolute;
  z-index: 99;
  right: 20px;
  width: 330px;
  .right_one {
    // background-image: ("../../../assets/images/zhengchangbili.png");
    height: 90px;
    background-size: 100% 450px;
    background-image: url("../../../assets/images/sousuo.png");
    .chaxun {
      padding-top: 20px;
      padding-left: 20px;
      /deep/.el-input__inner {
        background: #021019;
        color: #fff;
        border: 1px solid #3094d5;
        width: 200px;
      }
    }
    .scroll_wapper {
      // padding-left: px;
      // margin-top: 15px;
      // position: relative;

      overflow-y: auto;
      // height: 290px; //高度根据需求自行设定
      max-height: 350px;
      overflow-x: hidden;
      padding-bottom: -10px;
      .right_info {
        padding-left: 1px;
        // margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 18px;
          font-size: 14px;

          background: linear-gradient(-87deg, #3053af, #14295a);
          border-top: 1px solid #3486da;

          // height: 93px;
          &:nth-child(1) {
            border-top: none;
          }
          li {
            padding-bottom: 5px;
          }
        }
      }
    }
  }
}
.FireWaterSystemDialogWapper {
  width: 500px;
  margin: 0 auto;
  .title {
    text-align: center;
  }
  .shuiya_echarts {
    // width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  .yeya_echarts {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  /deep/.el-button--small {
    width: 120px;
  }
}
.shuju_echarts {
  width: 95%;
  height: 450px;
  margin: 0 auto;
  // background: #bfa;
  margin-top: 20px;

  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  p {
    line-height: 20px;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .shuju_echarts_wapper {
    // width: 90%;
    height: 410px;
    // margin: 0 auto;
    // background: #bfa;
    // margin-top: 30px;
  }
}

//火灾报警样式
.FireAlarmSystemDialog {
  // margin: 20px 0 0 20px;
  .one {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      margin-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .two {
    margin-top: 20px;
    width: 100%;
    // height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
  .formList {
    padding-left: 20px;
  }
  .three {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
}
//独立烟感样式
.SmartIndependentSmoke {
  .two {
    // margin-top: 20px;
    // width: 300px;
    height: 250px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    /deep/.el-button--mini {
      margin: 10px 0 0 15px;
    }
  }
}
.SmartIndependentSmoke_right_wapper {
  .rihgt_one {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      // border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .right_two {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    img {
      margin: 12px 70px;
      width: 50%;
      height: 100%;
    }
  }
  .SmartIndependentSmoke_echars_one {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .SmartIndependentSmoke_echars_one_wapper {
      height: 300px;
    }
  }
  .lishibaojing {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .formList {
      padding-left: 20px;
    }
  }
}
</style>