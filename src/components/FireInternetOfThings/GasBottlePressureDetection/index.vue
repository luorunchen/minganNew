<template>
  <div id="xiaofangshui">
    <div class="leftWapper">
      <div class="left_one" ref="leftOne">
        <p>今日报警项目</p>
        <div class="title">
          <ul v-for="(item, index) in baojingNum" :key="index">
            <li>{{ item }}</li>
          </ul>
        </div>

        <ul
          class="ulList"
          v-for="(item, index) in DeviceAlarmList"
          :key="index"
        >
          <li @click="callPolice(item.pid)">
            <span>{{ item.typeName }}</span
            ><span>共{{ item.value }}条未处理></span>
          </li>
        </ul>
      </div>
      <div class="left_two">
        <p>燃气瓶压力探测器</p>
        <!-- <div class="title">
          <ul>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
          </ul>
        </div> -->

        <Translate @click="callPolice()" />
      </div>
    </div>
    <SearchTranslate
      :SElec_DetailElecDevice_List="SElec_DetailElecDevice_List"
      :pagetype="pagetype"
    />
  </div>
</template>

<script>
import { DeviceAlarm, SElec_DetailElecDevice } from "@/api/index.js";
import Translate from "../translate/baojingTranslate.vue";
import SearchTranslate from "../translate/searchTranslate.vue";
export default {
  data() {
    return {
      SElec_DetailElecDevice_List: "",
      baojingNum: "",
      DeviceAlarmList: "",
      pagetype: 42,
    };
  },
  mounted() {
    this.DeviceAlarm();
  },
  methods: {
    callPolice(pid) {
      SElec_DetailElecDevice(pid).then((res) => {
        this.SElec_DetailElecDevice_List = res.data;
      });
    },
    DeviceAlarm() {
      const region = sessionStorage.getItem("region");
      DeviceAlarm(this.utils.userName, "42", region).then((res) => {
        this.DeviceAlarmList = res.data;
        let num = 0;
        // console.log(res.data, 99);
        if (res.data.length <= 0) {
          // return this.$message.error("今日报警数据丢失");
          this.baojingNum = "000000";

          this.$refs.leftOne.style.height = "140" + "px";
        } else {
          res.data.forEach((element) => {
            num += element.value;
          });

          // this.baojingNum = str + num;
          let str = "000000" + num;
          this.baojingNum = str.substring(str.length - 6);
        }
      });
    },
  },
  components: {
    Translate,
    SearchTranslate,
  },
};
</script>
<style lang='less' scoped>
#xiaofangshui {
  // /deep/.el-input__inner {
  //   background: #021019;
  //   color: #fff;
  //   border: 1px solid #3094d5;
  // }
  ul {
    list-style-type: none;
  }
  // position: relative;
  // z-index: 999;
  // color: #bfa;
  .leftWapper {
    left: 20px;
    position: absolute;
    z-index: 999;
    width: 373px;
    .left_one {
      background-image: url("../../../assets/images/zhengchangbili.png");
      height: 450px;
      background-size: 100% 450px;
      p {
        text-align: center;
        line-height: 70px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-left: 30px;
        // width: 200px;
        height: 32px;
        font-size: 16px;
        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #f830af;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        margin-left: 30px;
        li {
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .left_two {
      background-image: url("../../../assets/images/juxing7.png");
      height: 300px;
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 65px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 30px;
        // width: 200px;
        height: 32px;

        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #6dff64;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        margin-left: 30px;
        li {
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .rightWapper {
    margin-top: 50px;
    position: absolute;
    z-index: 999;
    right: 20px;
    width: 330px;
    .right_one {
      // background-image: ("../../../assets/images/zhengchangbili.png");
      height: 400px;
      background-size: 100% 100%;
      background-image: url("../../../assets/images/juxing5.png");
      .chaxun {
        padding-top: 20px;
        padding-left: 20px;
      }
      .right_info {
        // padding-left: 1px;
        margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 45px;
        }
      }
    }
  }
}
</style>