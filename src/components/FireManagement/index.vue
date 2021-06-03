<template>
  <div id="app">
    <div class="title">
      <div class="gotoSy">
        <div style="width: 130px">
          <router-link to="/"> <p>返回首页</p></router-link>
        </div>
      </div>
      <div class="xiaofangInfo">
        <p>消防管理</p>

        <p>-{{ btnInfo }}</p>
      </div>
      <div class="fenbuInfo">
        <!-- <div
          :class="
            btnInfo == '电气火灾隐患' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
          @click="getInfo('电气火灾隐患')"
        >
         
          <p>电气火灾隐患</p>
         
        </div> -->
        <div
          :class="btnInfo == '项目管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('项目管理')"
        >
          <p>项目管理</p>
        </div>
        <div
          :class="btnInfo == '设备管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('设备管理')"
        >
          <p>设备管理</p>
        </div>
        <div
          :class="btnInfo == '单位管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('单位管理')"
        >
          <p>单位管理</p>
        </div>
        <div
          :class="btnInfo == '派工单' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('派工单')"
        >
          <p>派工单</p>
        </div>
        <div
          :class="
            btnInfo == '设备安装确认' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
          @click="getInfo('设备安装确认')"
        >
          <p>设备安装确认</p>
        </div>
        <!-- <div
          :class="btnInfo == '系统设置' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('系统设置')"
        >
          <p>系统设置</p>
        </div> -->
        <!-- <div
          :class="btnInfo == '报警故障' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('报警故障')"
        >
          <p>报警故障</p>
        </div>
        <div
          :class="btnInfo == '用电规划' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('用电规划')"
        >
          <p>用电规划</p>
        </div>
        <div
          :class="btnInfo == '功率管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('功率管理')"
        >
          <p>功率管理</p>
        </div>
        <div
          :class="btnInfo == '电量统计' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('电量统计')"
        >
          <p>电量统计</p>
        </div>
        <div
          :class="
            btnInfo == '线路老化预警' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
          @click="getInfo('线路老化预警')"
        >
          <p>线路老化预警</p>
        </div>
        <div
          :class="
            btnInfo == '烟雾火灾预警' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
          @click="getInfo('烟雾火灾预警')"
        >
          <p>烟雾火灾预警</p>
        </div>
        <div
          :class="btnInfo == '短路预警' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('短路预警')"
        >
          <p>短路预警</p>
        </div>
        <div
          :class="btnInfo == '漏电预警' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('漏电预警')"
        >
          <p>漏电预警</p>
        </div> -->
      </div>
    </div>
    <div
      id="content_wapperCopy"
      :class="
        this.btnInfo != '电气火灾隐患' ? 'content_wapper' : 'content_wapperCopy'
      "
    >
      <template v-if="this.btnInfo == '电气火灾隐患'">
        <div id="content_wapper"><DianQiHuoZhai /></div>

        <!-- <router-view></router-view> -->
      </template>
      <template v-if="this.btnInfo == '项目管理'">
        <XiangMuGuanLi />
      </template>
      <template v-if="this.btnInfo == '设备管理'">
        <SheBeiGuanLi />
      </template>
      <template v-if="this.btnInfo == '单位管理'"> <DanWeiGuanLi /> </template>
      <template v-if="this.btnInfo == '报警故障'">
        <BaoJingGuZhang />
      </template>
      <template v-if="this.btnInfo == '用电规划'">
        <YongDianGuiHua />
      </template>

      <template v-if="this.btnInfo == '功率管理'">
        <GongLvGuanLi />
      </template>
      <template v-if="this.btnInfo == '电量统计'">
        <DianLiangTongJi />
      </template>
      <template v-if="this.btnInfo == '线路老化预警'">
        <XianLvLaoHuaYuJing />
      </template>
      <template v-if="this.btnInfo == '烟雾火灾预警'">
        <YanWuHuoZaiYuJing />
      </template>
      <template v-if="this.btnInfo == '短路预警'">
        <DuanLvYuJing />
      </template>
      <template v-if="this.btnInfo == '漏电预警'">
        <LouDianYuJing />
      </template>
      <template v-if="this.btnInfo == '派工单'">
        <PaiGongDan />
      </template>
      <template v-if="this.btnInfo == '设备安装确认'">
        <SheBeiAnZhuangQueRen />
      </template>
    </div>
  </div>
</template>


<script>
import BaoJingGuZhang from "./BaoJingGuZhang";
import DanWeiGuanLi from "./DanWeiGuanLi";
import XiangMuGuanLi from "./xiangmuguanli/xiangmuguanli";
import SheBeiGuanLi from "./SheBeiGuanLi";
import YongDianGuiHua from "./YongDianGuiHua";
import GongLvGuanLi from "./GongLvGuanLi";
import XianLvLaoHuaYuJing from "./XianLvLaoHuaYuJing";
import DianLiangTongJi from "./DianLiangTongJi";
import YanWuHuoZaiYuJing from "./YanWuHuoZaiYuJing";
import DuanLvYuJing from "./DuanLvYuJing";
import LouDianYuJing from "./LouDianYuJing";
import DianQiHuoZhai from "./DianQiHuoZhai";
import PaiGongDan from "./PaiGongDan";
import SheBeiAnZhuangQueRen from "./SheBeiAnZhuangQueRen";
export default {
  data() {
    return {
      outerVisible: false,
      equipmentColor: "police",

      currentPage4: 1,

      btnInfo: "项目管理",
    };
  },
  methods: {
    equipment(data) {
      this.equipmentColor = data;
    },
    getInfo(data) {
      this.btnInfo = data;
      window.name = data;
      // if (data == "电气火灾隐患") {
      //   this.map = new AMap.Map("content_wapperCopy", {
      //     center: [116.397428, 39.90923],
      //     resizeEnable: true,
      //     zoom: 10,
      //     mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      //   });
      //   this.map.setZoomAndCenter(4, [116.205467, 39.907761]);
      // }
    },
    onSubmit() {
      console.log("submit!");
    },
    stop() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
  },
  components: {
    XiangMuGuanLi,
    SheBeiGuanLi,
    BaoJingGuZhang,
    DanWeiGuanLi,
    YongDianGuiHua,
    GongLvGuanLi,
    DianLiangTongJi,
    XianLvLaoHuaYuJing,
    YanWuHuoZaiYuJing,
    DuanLvYuJing,
    LouDianYuJing,
    DianQiHuoZhai,
    PaiGongDan,
    SheBeiAnZhuangQueRen,
  },
  mounted() {
    if (window.name == "") {
      this.btnInfo = "项目管理";
    } else if (window.name != "") {
      this.btnInfo = window.name;
    }
    // this.map = new AMap.Map("content_wapper", {
    //   center: [116.397428, 39.90923],
    //   resizeEnable: true,
    //   zoom: 10,
    //   mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
    // });
    // this.map.setZoomAndCenter(4, [116.205467, 39.907761]);
    this.stop();
  },

  destroyed() {
    window.name = "";
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
#app {
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
        width: 236px;
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
        width: 236px;
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
        width: 236px;
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

  color: #fff;
  width: 100%;
  height: calc(100vh);
  background: #030542;
  .title {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    height: 108px;
    // background: #030542;
    position: relative;
    z-index: 99;
    .gotoSy {
      width: 190px;
      height: 76px;
      background-image: url("../../assets/images/Rectangle 2 copy.png");
      background-size: 100% 100%;
      p {
        font-size: 22px;
        text-align: center;
        line-height: 90px;
      }
    }
    .xiaofangInfo {
      margin-top: 10px;
      width: 325px;
      p {
        font-weight: bold;
        text-align: center;
        &:nth-child(1) {
          font-size: 38px;
        }
        &:nth-child(2) {
          font-size: 26px;
        }
      }
      // background: #fff;
    }
    .fenbuInfo {
      width: 1400px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .infoBtn {
        margin-right: 14px;
        width: 130px;
        height: 30px;
        background: linear-gradient(0deg, #274184, #021132);
        border: 1px solid #3486da;
        border-radius: 6px;
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          text-align: center;
        }
      }
      .infoBtnClick {
        background: rgb(48, 148, 213);
      }
    }
  }
  .content_wapper {
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    margin: 0 30px;
    height: 800px;
    position: relative;
    background: #fff;
  }
  #content_wapper {
    // box-sizing: border-box;
    // padding: 20px 20px 0 20px;
    // margin: 0 30px;
    height: 830px;
    // background: #fff;
  }
  .content_wapperCopy {
    position: relative;
    // box-sizing: border-box;
    // padding: 20px 20px 0 20px;
    // margin: 0 30px;
    height: 800px;
    // background: #fff;
  }
  .tabs {
    .caozuo {
      span {
        cursor: pointer;
        color: #1071e2;
        margin-right: 10px;
      }
    }
  }
  .onLineInfo {
    height: 110px;
    padding-top: 20px;
    box-sizing: border-box;
    ul {
      li {
        width: 158px;
        float: left;
        border-left: 1px solid #eaeaea;
        &:nth-child(1) {
          border: none;
        }
        p {
          font-size: 22px;
          color: #000;
          text-align: center;
          &:nth-child(2) {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
  .onLineBG {
    width: 103%;
    height: 20px;
    background: #030542;
    // margin: 0 20px 0 -20px;
    margin-left: -20px;
    margin-bottom: 20px;
    // float: left;
  }
  .danwei_left {
    color: #000;
    height: 700px;
    // background: #bfa;
    margin: -20px 0 0 -20px;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
  }
  .danwei_right {
    color: #000;
    margin: -20px;
    height: 800px;
    // background: rgb(170, 176, 255);
    .one {
      width: 20px;
      height: 100%;
      background: #021132;
      // position: relative;
      // display: inline;
      float: left;
    }
  }
  .block {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
}
</style>