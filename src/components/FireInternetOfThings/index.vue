<template>
  <div
    id="app"
    v-loading="loading_map"
    element-loading-text="地图资源加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div class="title">
      <div class="gotoSy">
        <div style="width: 130px">
          <router-link to="/"> <p>返回首页</p></router-link>
        </div>
      </div>
      <div class="xiaofangInfo">
        <p>消防物联网</p>

        <p>-{{ btnInfo }}</p>
      </div>
      <div class="fenbuInfo">
        <div
          :class="
            btnInfo == '隐患整改进度' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'FireInternetOfThings' }">
            <p textInfo="隐患整改进度" @click="getText()">隐患整改进度</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '电气火灾隐患' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'electricalFire' }"
            ><p textInfo="电气火灾隐患" @click="getText()">电气火灾隐患</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '消防水系统' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'FireWaterSystem' }">
            <p textInfo="消防水系统" @click="getText()">消防水系统</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '火灾报警系统' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'FireAlarmSystem' }">
            <p textInfo="火灾报警系统" @click="getText()">火灾报警系统</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '重点部位' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'KeyParts' }">
            <p textInfo="重点部位" @click="getText()">重点部位</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '智慧型独立烟感' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'SmartIndependentSmoke' }">
            <p textInfo="智慧型独立烟感" @click="getText()">智慧型独立烟感</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '燃气探测器' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'GasDetector' }">
            <p textInfo="燃气探测器" @click="getText()">燃气探测器</p>
          </router-link>
        </div>
        <div
          :class="btnInfo == '应急处理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
        >
          <router-link :to="{ name: 'EmergencyManagement' }">
            <p textInfo="应急处理" @click="getText()">应急处理</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '智慧型消防报警' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'IntelligentFireAlarm' }">
            <p textInfo="智慧型消防报警" @click="getText()">智慧型消防报警</p>
          </router-link>
        </div>
        <div :class="btnInfo == '灭火器' ? 'infoBtn infoBtnClick' : 'infoBtn'">
          <router-link :to="{ name: 'FireExtinguisher' }">
            <p textInfo="灭火器" @click="getText()">灭火器</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '电力检测系统' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'PowerDetection' }">
            <p textInfo="电力检测系统" @click="getText()">电力检测系统</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '设备定位全景图' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'Panorama' }">
            <p textInfo="设备定位全景图" @click="getText()">设备定位全景图</p>
          </router-link>
        </div>
        <div
          :class="
            btnInfo == '燃气瓶压力探测' ? 'infoBtn infoBtnClick' : 'infoBtn'
          "
        >
          <router-link :to="{ name: 'GasBottlePressureDetection' }">
            <p textInfo="燃气瓶压力探测" @click="getText()">燃气瓶压力探测</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="title2"></div>

    <div v-if="btnInfo === '隐患整改进度'">
      <div class="yinhanZgLeft">
        <div class="one">
          <div class="infoYMR">
            <!-- 第一个 -->
            <div class="infoYMRLi">
              <div class="infoYMRLi_item"></div>
              <p style="font-size: 24px; color: #f830af">
                {{ numOne }}
              </p>
              <p style="font-size: 14px; color: #9bdef0">本月隐患数</p>
            </div>
            <!-- 第二个 -->
            <div class="infoYMRLi">
              <div class="infoYMRLi_item"></div>
              <p style="font-size: 24px; color: #00c0ff">{{ numTwo }}</p>
              <p style="font-size: 14px; color: #9bdef0">上月隐患数</p>
            </div>
            <!-- 第三个 -->
            <div class="infoYMRLi">
              <div class="infoYMRLi_item"></div>
              <p style="font-size: 24px; color: #00c0ff">
                {{ getIndexReportList.errsum }}
              </p>
              <p style="font-size: 14px; color: #9bdef0">本年隐患数</p>
            </div>
          </div>
          <div class="one_echart_left"></div>
        </div>
        <div class="two">
          <p>本年度火灾隐患统计</p>
          <div class="two_echart_left"></div>
        </div>
        <div class="three">
          <p>本年度隐患趋势统计</p>
          <div class="three_echart_left"></div>
        </div>
      </div>
      <div class="yinhanZgRight">
        <div class="one">
          <p>发现隐患排行榜</p>
          <div class="scroll_wapper">
            <ul v-for="(item, index) in getIndexReportList.lt" :key="index">
              <li>{{ index + 1 }}.{{ item.date }}({{ item.num }})</li>
            </ul>
          </div>
        </div>
        <div class="two">
          <p>隐患整改排行榜</p>
          <div class="scroll_wapper">
            <ul v-for="(item, index) in getIndexReportList.ls" :key="index">
              <li>{{ index + 1 }}.{{ item.date }}({{ item.num }})</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
    <router-view></router-view>
  </div>
</template>

<script>
import { getIndexReport, DeviceProjectNew } from "@/api/index.js";
import PublicPopUps from "../FireInternetOfThings/translate/publicPopUps.vue";
export default {
  data() {
    return {
      pagetype: "",
      numTwo: "0",
      loading_map: false,
      numOne: "0",
      btnInfo: "隐患整改进度",
      getIndexReportList: "",
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === "/FireInternetOfThings") {
        this.echart();
      }
    },
    //  应急处理组件触发函数
    status() {
      this.mass.setMap(null);
      this.DeviceProjectNewFun(this.$store.state.initStatus); //   需要调用的方法
      // console.log(this.$store.state.initStatus);
    },
    contractFile(val, lav) {
      console.log(val);

      this.map.setZoomAndCenter(20, val);
    },
  },
  mounted() {
    // console.log(this.$route.path, 999999);

    switch (this.$route.path) {
      case "/FireInternetOfThings":
        this.DeviceProjectNewFun("3");
        this.pagetype = "2";
        this.echart();
        break;
      case "/FireInternetOfThings/electricalFire":
        this.btnInfo = "电气火灾隐患";
        this.pagetype = "2";
        this.DeviceProjectNewFun("3");
        break;
      case "/FireInternetOfThings/FireWaterSystem":
        this.btnInfo = "消防水系统";
        this.pagetype = "3";
        this.DeviceProjectNewFun("4,8");
        break;
      case "/FireInternetOfThings/FireAlarmSystem":
        this.btnInfo = "火灾报警系统";
        this.pagetype = "4";
        this.DeviceProjectNewFun("0,5,20");
        break;
      case "/FireInternetOfThings/KeyParts":
        this.btnInfo = "重点部位";
        this.pagetype = "5";
        this.DeviceProjectNewFun("9,13,20");
        break;
      case "/FireInternetOfThings/SmartIndependentSmoke":
        this.btnInfo = "智慧型独立烟感";
        this.pagetype = "6";
        this.DeviceProjectNewFun("2");
        break;
      case "/FireInternetOfThings/GasDetector":
        this.btnInfo = "燃气探测器";
        this.pagetype = "7";
        this.DeviceProjectNewFun("1,6,11");
        break;
      case "/FireInternetOfThings/EmergencyManagement":
        this.btnInfo = "应急处理";
        this.DeviceProjectNewFun("3,4,8");
        this.pagetype = "8";
        break;
      case "/FireInternetOfThings/IntelligentFireAlarm":
        this.btnInfo = "智慧型消防报警";
        this.pagetype = "13";
        this.DeviceProjectNewFun("10,15,16,19,18");
        break;
      case "/FireInternetOfThings/FireExtinguisher":
        this.btnInfo = "灭火器";
        this.pagetype = "10";
        this.DeviceProjectNewFun("21");
        break;
      case "/FireInternetOfThings/PowerDetection":
        this.btnInfo = "电力检测系统";
        this.pagetype = "12";
        this.DeviceProjectNewFun("12");
        break;
      case "/FireInternetOfThings/Panorama":
        this.btnInfo = "设备定位全景图";
        this.pagetype = "12";
        this.DeviceProjectNewFun("3");
        break;
      case "/FireInternetOfThings/GasBottlePressureDetection":
        this.btnInfo = "燃气瓶压力探测";
        this.pagetype = "42";
        this.DeviceProjectNewFun("3");
        break;
    }

    this.init();
  },

  methods: {
    getText() {
      this.btnInfo = event.currentTarget.getAttribute("textInfo");
      // this.init();
      // console.log(this.btnInfo);
      if (this.mass != undefined) {
        this.mass.setMap(null);
      }
      switch (this.btnInfo) {
        case "隐患整改进度":
          this.DeviceProjectNewFun("3");
          this.pagetype = "2";
          break;
        case "电气火灾隐患":
          this.DeviceProjectNewFun("3");
          // alert(this.mass);
          if (this.nass != undefined) {
            this.mass.setMap(null);
          }
          this.pagetype = "2";
          break;
        case "消防水系统":
          this.DeviceProjectNewFun("4,8");
          // this.mass.setMap(null);
          this.pagetype = "3";
          break;
        case "火灾报警系统":
          this.DeviceProjectNewFun("0,5,20");
          // this.mass.setMap(null);
          this.pagetype = "4";
          break;
        case "重点部位":
          this.DeviceProjectNewFun("9,13,20");
          // this.mass.setMap(null);
          this.pagetype = "5";
          break;
        case "智慧型独立烟感":
          this.DeviceProjectNewFun("2");
          // this.mass.setMap(null);
          this.pagetype = "6";
          break;
        case "燃气探测器":
          this.DeviceProjectNewFun("1,6,11");
          // this.mass.setMap(null);
          this.pagetype = "7";
          break;
        case "应急处理":
          this.DeviceProjectNewFun("3,4,8");
          break;
        case "智慧型消防报警":
          this.DeviceProjectNewFun("10,15,16,19,18");
          // this.mass.setMap(null);
          this.pagetype = "13";
          break;
        case "灭火器":
          this.DeviceProjectNewFun("21");
          // this.mass.setMap(null);
          this.pagetype = "10";
          break;
        case "电力检测系统":
          this.DeviceProjectNewFun("12");
          // this.mass.setMap(null);
          this.pagetype = "12";
          break;
        case "设备定位全景图":
          this.DeviceProjectNewFun("3");
          // this.mass.setMap(null);
          this.pagetype = "2";
          break;
        case "燃气瓶压力探测":
          this.DeviceProjectNewFun("42");
          // this.mass.setMap(null);
          this.pagetype = "42";
          break;
      }
    },
    echart() {
      getIndexReport(this.utils.userName).then((res) => {
        console.log(res);
        this.getIndexReportList = res.data;
        this.numOne = res.data.lo[7].num;
        this.numTwo = res.data.lo[6].num;
        console.log(this.numOne);
        let yinhuan_date = [];
        let yinhuan_num = [];
        res.data.lo.forEach((element) => {
          yinhuan_date.push(element.date);
          yinhuan_num.push(element.num);
        });

        let one_echart_left = this.$echarts.init(
          document.querySelector(".one_echart_left")
        );

        let modify = [];
        modify.push(
          {
            name: "已整改",
            value: res.data.errdel,
            itemStyle: { color: "#238BDE" },
          },
          {
            name: "未整改",
            value: res.data.errsum - res.data.errdel,
            itemStyle: { color: "#EB811A" },
          }
        );

        // 绘制图表
        one_echart_left.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          grid: {
            top: "10%",
          },
          legend: {
            orient: "vertical",
            left: 10,
            bottom: 10,
            data: ["已整改", "未整改"],
            textStyle: {
              color: "#fft",
            },
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },

              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: modify,
            },
          ],
        });

        let two_echart_left = this.$echarts.init(
          document.querySelector(".two_echart_left")
        );
        two_echart_left.setOption({
          color: ["#238BDE", "#c23531"],
          legend: {
            textStyle: {
              color: "#fft",
            },
          },
          tooltip: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "20%",
            containLabel: true,
          },
          dataset: {
            dimensions: ["product", "火灾隐患", "未整改隐患"],

            source: [
              { product: "宝安区", 火灾隐患: 886, 未整改隐患: 728 },
              { product: "龙华区", 火灾隐患: 356, 未整改隐患: 132 },
              { product: "龙岗区", 火灾隐患: 152, 未整改隐患: 93 },
              { product: "罗湖区", 火灾隐患: 15, 未整改隐患: 8 },
              { product: "光明区", 火灾隐患: 188, 未整改隐患: 79 },
              { product: "贵阳市", 火灾隐患: 10, 未整改隐患: 9 },
              { product: "东莞市", 火灾隐患: 29, 未整改隐患: 20 },
              { product: "铜陵市", 火灾隐患: 8, 未整改隐患: 5 },
              { product: "广州市", 火灾隐患: 10, 未整改隐患: 9 },
              { product: "清远市", 火灾隐患: 20, 未整改隐患: 9 },
              { product: "遵义市", 火灾隐患: 10, 未整改隐患: 0 },
              { product: "梅州市", 火灾隐患: 10, 未整改隐患: 0 },
              { product: "福田区", 火灾隐患: 10, 未整改隐患: 0 },
            ],
          },
          xAxis: {
            type: "category",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: "bar" }, { type: "bar" }],
        });
        let three_echart_left = this.$echarts.init(
          document.querySelector(".three_echart_left")
        );

        three_echart_left.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          // legend: {
          //   textStyle: {
          //     color: "#fft",
          //   },
          //   // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          // },

          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "20%",
            containLabel: true,
          },
          xAxis: [
            {
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              type: "category",
              boundaryGap: false,
              data: yinhuan_date,
            },
          ],
          yAxis: [
            {
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              type: "value",
            },
          ],
          series: [
            {
              name: "隐患趋势统计",
              type: "line",
              stack: "总量",

              label: {
                normal: {
                  show: true,
                  position: "top",
                },
              },
              areaStyle: {
                normal: {
                  color: "#04CDF4", //改变区域颜色
                },
              },
              itemStyle: {
                normal: {
                  color: "#04CDF4", //改变折线点的颜色
                  lineStyle: {
                    color: "#04CDF4", //改变折线颜色
                  },
                },
              },
              // areaStyle: {},
              data: yinhuan_num,
            },
          ],
        });
      });
    },
    //地图部分
    init() {
      this.map = new AMap.Map("app", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      });
      this.map.setZoomAndCenter(4, [116.205467, 39.907761]);
    },
    DeviceProjectNewFun(data) {
      // console.log(this.$refs.publicPopUps.initOff());
      this.loading_map = true;
      const region = sessionStorage.getItem("region");
      DeviceProjectNew(this.utils.userName, data, region).then((res) => {
        // this.DeviceProjectNewData = res.data.Company;
        // console.log(res.data);
        if (res.data.length <= 0) {
          return (this.loading_map = false);
        }

        let a = [];
        let b = [];
        for (let i = 0; i < res.data.Company.length; i++) {
          if (res.data.Company[i].style == 1) {
            b.push(res.data.Company[i]);
          } else {
            a.push(res.data.Company[i]);
          }
        }

        this.DeviceProjectNewData = [...a, ...b];
        this.$store.commit("DeviceProject", this.DeviceProjectNewData);
        // console.log(c, "我是aa,b");
        this.$nextTick(() => {
          const style = [
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(20, 20),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(23, 23),
            },
          ];
          // console.log(this.DeviceProjectNewData, 987987);

          this.mass = new AMap.MassMarks(this.DeviceProjectNewData, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          // this.DeviceProjectNewData = [];
          const marker = new AMap.Marker({ content: " ", map: this.map });
          this.mass.setMap(this.map);
          this.loading_map = false;
          // 保存this
          var _that = this;
          //绑定事件模块
          this.mass.on("click", function (e) {
            // console.log(e);

            // this.$refs.publicPopUps.initOff();

            _that.$refs.publicPopUps.initOff();
            _that.$refs.publicPopUps.echart_wapper(e.data.pid);
          });
        });
      });
    },
  },
  components: {
    PublicPopUps,
  },

  computed: {
    status() {
      //  计算属性
      // console.log(this.$store.state.initStatus);
      return this.$store.state.initStatus; //  Vuex 中定义的属性
    },
    contractFile() {
      return this.$store.state.map_lnglat;
    },
  },
};
</script>
<style lang='less' scoped>
#app {
  color: #fff;
  width: 100%;
  height: calc(100vh);
  position: relative;
  z-index: 9;
  .title {
    display: flex;
    width: 100%;
    height: 108px;
    background: #030542;
    position: relative;
    z-index: 999;

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
          font-size: 46px;
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
  .title2 {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 20px;
    background-image: linear-gradient(to top, rgba(8, 48, 74, 0.5), #030542);
  }
  .yinhanZgLeft {
    left: 20px;
    width: 373px;
    // height: 500px;
    // background: #bfa;
    position: absolute;
    z-index: 999;
    .one {
      height: 300px;
      background-image: url("../../assets/images/juxing5.png");
      background-size: 100% 100%;
      .infoYMR {
        padding-top: 10px;
        margin: 0 auto;
        width: 330px;
        clear: both;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .infoYMRLi {
          text-align: center;
          margin-top: 10px;
          width: 150px;
          height: 50px;
          background: rgb(15, 60, 118);
          position: relative;
          &:nth-child(3) {
            width: 96%;
          }
          .infoYMRLi_item {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        }
        .infoYMRLi_item::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;

          border-left: 2px solid #00c0ff;
          border-bottom: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi_item::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;

          border-right: 2px solid #00c0ff;
          border-bottom: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;

          border-left: 2px solid #00c0ff;
          border-top: 2px solid #00c0ff;

          width: 10px;
          height: 10px;
        }
        .infoYMRLi::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          border-right: 2px solid #00c0ff;
          border-top: 2px solid #00c0ff;
          width: 10px;
          height: 10px;
        }
      }
      .one_echart_left {
        width: 100%;
        height: 170px;
        // background: #bfa;
      }
    }
    .two {
      width: 510px;
      height: 240px;
      background-image: url("../../assets/images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .two_echart_left {
        height: 190px;
      }
      // .twoEchart_left {
      //   height: 200px;
      // }
    }
    .three {
      width: 510px;
      height: 240px;
      background-image: url("../../assets/images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      // .twoEchart_right {
      //   height: 200px;
      // }
      .three_echart_left {
        height: 190px;
      }
    }
  }
  .yinhanZgRight {
    right: 20px;
    width: 373px;
    // height: 500px;
    // background: #bfa;
    position: absolute;
    z-index: 999;

    .one {
      // width: 510px;
      height: 350px;
      background-image: url("../../assets/images/zhengchangbili.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .scroll_wapper {
        overflow-y: auto;
        height: 82%; //高度根据需求自行设定
        overflow-x: hidden;
        ul {
          width: 90%;
          margin: 0 auto;
          li {
            margin-top: 10px;
          }
        }
      }

      .twoEchart_right {
        height: 200px;
      }
    }
    .two {
      // width: 510px;
      // margin-top: 20px;
      height: 350px;
      background-image: url("../../assets/images/zhengchangbili.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      .scroll_wapper {
        overflow-y: auto;
        height: 82%; //高度根据需求自行设定
        overflow-x: hidden;
        ul {
          width: 90%;
          margin: 0 auto;
          li {
            margin-top: 10px;
          }
        }
      }
      .twoEchart_right {
        height: 200px;
      }
    }
  }
}
</style>