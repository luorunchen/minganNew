<template>
  <div id="app">
    <div class="title">
      <div class="titleFZ">
        <span>{{ utils.userName }}</span>
        <span>{{ day }}</span>
        <span>{{ date }}</span>
      </div>
      <div class="titleLeft">
        <img
          src="../../assets/images/juxing2.png"
          alt=""
          width="100%"
          height="100%"
        />
        <div class="btnLeft">
          <div class="btnLeftOne"><span>首页</span></div>
          <div class="btnLeftTwo" @click="FireInternetOfThings">
            <span>消防物联网</span>
          </div>
        </div>
      </div>
      <div class="titleIMG">
        <p class="titleName">智慧安全系统平台</p>
        <img
          src="../../assets/images/juxing4.png"
          alt=""
          width="100%"
          height="100%"
        />
      </div>
      <div class="titleRight">
        <img
          src="../../assets/images/juxing3.png"
          alt=""
          width="100%"
          height="100%"
        />
        <div class="btnRight">
          <div class="btnRightOne" @click="FireManagement">
            <span>消防管理</span>
          </div>
          <div class="btnRightTwo" @click="SystemSettings">
            <span>系统设置</span>
          </div>
          <span
            @click="audioON"
            style="margin-left: 30px; line-height: 30px; cursor: pointer"
            >报警声音({{ $store.state.SoundSwitch }})</span
          >
        </div>
      </div>
      <div class="titlePassword">
        <span style="margin-right: 45px">
          <img src="../../assets/images/mima.png" alt="" />
          <el-button type="text" @click="dialogVisible = true"
            >更改密码</el-button
          >

          <el-dialog
            :modal-append-to-body="false"
            :visible.sync="dialogVisible"
            width="373px"
          >
            <p>更改密码</p>
            <el-form
              :model="numberValidateForm"
              ref="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- 原密码 -->
              <el-form-item
                prop="Odd_Password"
                :rules="[{ required: true, message: '原密码不能为空' }]"
              >
                <el-input
                  type="password"
                  prefix-icon="el-icon-goods"
                  placeholder="原密码"
                  v-model="numberValidateForm.Odd_Password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 新密码 -->
              <el-form-item
                prop="New_Password"
                :rules="[{ required: true, message: '新密码不能为空' }]"
              >
                <el-input
                  type="password"
                  prefix-icon="el-icon-goods"
                  placeholder="新密码"
                  v-model="numberValidateForm.New_Password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 确认密码 -->
              <el-form-item
                prop="True_Password"
                :rules="[{ required: true, message: '确认不能为空' }]"
              >
                <el-input
                  type="password"
                  placeholder="确认密码"
                  prefix-icon="el-icon-goods"
                  v-model="numberValidateForm.True_Password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 确定按钮 -->
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('numberValidateForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('numberValidateForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
        </span>
        <span @click="out">
          <img
            src="../../assets//images/tuichu.png"
            width="18px"
            height="15px"
            alt=""
          />退出</span
        >
      </div>
    </div>
    <div class="title2"></div>
    <!-- LEFT信息 -->
    <div class="infoLeft">
      <!-- <div id="myChart" style="width: 200px; height: 200px"></div> -->
      <div class="one">
        <ul>
          <li @click="push_AlarmData_info('d')">
            <p :class="this.btnColor == 'd' ? 'p_BG p_BG2' : 'p_BG'">今日</p>
          </li>
          <li @click="push_AlarmData_info('w')">
            <p :class="this.btnColor == 'w' ? 'p_BG p_BG2' : 'p_BG'">本周</p>
          </li>
          <li @click="push_AlarmData_info('m')">
            <p :class="this.btnColor == 'm' ? 'p_BG p_BG2' : 'p_BG'">本月</p>
          </li>
          <li @click="push_AlarmData_info('y')">
            <p :class="this.btnColor == 'y' ? 'p_BG p_BG2' : 'p_BG'">本年</p>
          </li>
        </ul>

        <div class="infoYMR">
          <div class="infoYMRLi">
            <div class="infoYMRLi_item"></div>
            <p style="color: #f830af; font-size: 24px">
              {{ this.AlarmData.AlarmNo }}
            </p>
            <p style="color: #9bdef0; font-size: 14px">未处理报警</p>
          </div>
          <div class="infoYMRLi">
            <p style="color: #00c0ff; font-size: 24px">
              {{ this.AlarmData.AlarmYes }}
            </p>

            <p style="color: #9bdef0; font-size: 14px">已处理报警数</p>
          </div>
          <!-- <div class="infoYMRLi"></div>
          <div class="infoYMRLi"></div> -->
        </div>
        <div class="infoYMR">
          <div class="infoYMRLi">
            <div class="infoYMRLi_item"></div>
            <p style="color: #f830af; font-size: 24px">
              {{ this.AlarmData.FaultNo }}
            </p>
            <p style="color: #9bdef0; font-size: 14px">未处理故障数</p>
          </div>
          <div class="infoYMRLi">
            <div class="infoYMRLi_item"></div>
            <p style="color: #00c0ff; font-size: 24px">
              {{ this.AlarmData.FaultYes }}
            </p>
            <p style="color: #9bdef0; font-size: 14px">已处理故障数</p>
          </div>
          <!-- <div class="infoYMRLi"></div>
          <div class="infoYMRLi"></div> -->
        </div>
      </div>

      <div class="two">
        <p>设备概况</p>
        <div class="twoEchart"></div>
      </div>
      <div class="three">
        <p>设备类型统计数量</p>
        <div class="threeEchart"></div>
      </div>
      <div class="four">
        <p>报警数量统计</p>
        <div class="fourEchart"></div>
      </div>
    </div>
    <!-- RIGHT信息 -->
    <div class="infoRight">
      <div class="one">
        <p>报警信息</p>
        <div class="scroll_wapper" @click="handleClick($event)">
          <template v-if="this.AlarmInfo.length > 0">
            <vueSeamlessScroll :data="AlarmInfo" :class-option="classOption">
              <div
                class="oneEchartWapper"
                v-for="(item, index) in AlarmInfo"
                :key="index"
              >
                <div class="oneEchart">
                  <div style="display: flex">
                    <div class="circular"></div>
                    <template>{{ item.isTrafficname }}</template>
                  </div>

                  <template>
                    {{ item.creationtime }}
                  </template>
                  >
                </div>
                <div
                  style="margin-left: 14px; color: #00e4ff"
                  @click="alarmInfoClick(item.did, item.devicenoid)"
                >
                  <div :id="item.did" :imei="item.deviceid" :type="item.type">
                    设备:{{ item.deviceid }}
                  </div>
                  <div :id="item.did" :imei="item.deviceid" :type="item.type">
                    地址:{{ item.address }}
                  </div>
                </div>
              </div></vueSeamlessScroll
            >
          </template>
          <template v-else>
            <div class="no_AlarmInfo">暂无报警</div>
          </template>
        </div>
        <p
          class="sc_p"
          v-if="this.AlarmInfo != ''"
          @click="loadMore"
          v-loading.lock="fullscreenLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(12, 33, 77, 0.8)"
        >
          加载更多....
        </p>
      </div>
      <div class="two">
        <p>本周故障数及报警数</p>
        <div class="twoEchart_right"></div>
      </div>
      <div class="three">
        <p>项目地区分布</p>
        <div class="threeEchart_right"></div>
      </div>
    </div>
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
  </div>
</template>


<script>
import {
  push_AlarmData,
  push_AlarmInfo,
  push_DeviceData,
  check_device_type,
  push_AlarmNumData,
  push_AlarmAndFault,
  push_ProjectRegion,
  AlarmInforMore,
  DeviceProjectNew,
  updateuserpassword,
} from "@/api/index.js";
import md5 from "js-md5";
import vueSeamlessScroll from "vue-seamless-scroll";
import PublicPopUps from "../FireInternetOfThings/translate/publicPopUps";
// import AMap from "AMap";
export default {
  data() {
    return {
      pagetype: 6,
      fullscreenLoading: false,
      pageSize: 1,
      AlarmInfo: "",
      btnColor: "d",
      AlarmData: {
        AlarmNo: "",
        AlarmYes: "",
        FaultNo: "",
        FaultYes: "",
      },
      dialogVisible: false,
      numberValidateForm: {
        Odd_Password: "",
        New_Password: "",
        True_Password: "",
      },
      date: "",
      day: "",
      onOFF: "关",
    };
  },

  mounted() {
    this.init();
    this.drawLine();
    this.push_AlarmData_info("d");
    this.day = this.$moment().format("MM-DD");
    // //console.log(day);
    const date = this.$moment().isoWeekday();
    // //console.log(date);
    switch (date) {
      case 1:
        this.date = "周一";
        break;

      case 2:
        this.date = "周二";
        break;
      case 3:
        this.date = "周三";
        break;
      case 4:
        this.date = "周四";
        break;
      case 5:
        this.date = "周五";
        break;
      case 6:
        this.date = "周六";
        break;
      case 7:
        this.date = "周日";
        break;
    }
  },

  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    handleClick(event) {
      const devID = event.target.id;
      const imei = event.target.attributes.imei.value;
      const type = event.target.attributes.type.value;
      console.log(event.target.id, 6);
      // console.log(event.target.data, 5);
      console.log(event.target.attributes.type.value, 4);
      console.log(event.target.attributes.imei.value, 4);
      // console.log(this.$refs.itemInfo.attr('data-id'));
      this.alarmInfoClick(devID, imei, type);
    },

    alarmInfoClick(devID, imei, type) {
      this.$refs.publicPopUps.openTypeFun(devID, imei, type);
    },
    // 声音开关
    audioON() {
      // console.log(123);
      if (this.onOFF == "开") {
        this.$store.commit("SoundSwitchFun", "关");
        return (this.onOFF = "关");
      }
      if (this.onOFF == "关") {
        this.onOFF = "开";
        this.$store.commit("SoundSwitchFun", "开");
      }
    },
    //年月日信息获取
    push_AlarmData_info(data) {
      // //console.log(this.utils);
      this.btnColor = data;
      push_AlarmData(this.utils.userName, data).then((res) => {
        // ////console.log(res);
        this.AlarmData.AlarmNo = res.data.AlarmNo;
        this.AlarmData.AlarmYes = res.data.AlarmYes;
        this.AlarmData.FaultNo = res.data.FaultNo;
        this.AlarmData.FaultYes = res.data.FaultYes;
      });
      push_AlarmInfo(this.utils.userName, data).then((res) => {
        ////console.log(res.data.data, 99999);
        this.AlarmInfo = res.data.data;
        this.pageCount = res.data.pageCount;
        ////console.log(this.pageCount);
      });
    },
    //设备概况

    //消防管理
    FireManagement() {
      this.$router.push("/FireManagement");
    },
    //加载更多
    loadMore() {
      this.pageSize++;
      if (this.pageSize >= this.pageCount) {
        return this.$message({
          message: "已经是最后一条",
          type: "warning",
        });
      }
      this.fullscreenLoading = true;
      AlarmInforMore(
        this.utils.userName,
        this.btnColor,
        this.pageSize,
        10
      ).then((res) => {
        res.data.data.forEach((element) => {
          this.AlarmInfo.push(element);
          this.fullscreenLoading = false;
        });
        //console.log(res.data.data);
        // this.AlarmInfo.push(res.data.data);
        //console.log(this.AlarmInfo);
      });
    },
    //系统设置跳转
    SystemSettings() {
      this.$router.push("/SystemSettings");
    },
    //消防物联网跳转
    FireInternetOfThings() {
      this.$router.push("/FireInternetOfThings");
    },
    //地图部分
    init() {
      this.map = new AMap.Map("app", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 5,
        mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      });
      this.map.setZoomAndCenter(4, [116.205467, 39.907761]);
      const region = sessionStorage.getItem("region");
      DeviceProjectNew(
        this.utils.userName,
        "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21",
        region
      ).then((res) => {
        if (res.data.length <= 0) {
          return (this.loading_map = false);
        }
        //console.log(res);
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
        let a = [];
        let b = [];
        // console.log(res.data.Company.length);
        for (let i = 0; i < res.data.Company.length; i++) {
          if (res.data.Company[i].style == 1) {
            b.push(res.data.Company[i]);
          } else {
            a.push(res.data.Company[i]);
          }
        }
        let c = [...a, ...b];
        const mass = new AMap.MassMarks(c, {
          opacity: 0.8,
          zIndex: 111,
          cursor: "pointer",
          style: style,
        });
        console.log(mass, 999);
        console.log(this.map, 999);
        const marker = new AMap.Marker({ content: " ", map: this.map });
        mass.setMap(this.map);
        let _that = this;
        //绑定事件模块
        mass.on("click", function (e) {
          console.log(e);
          _that.$refs.publicPopUps.initOff();
          _that.$refs.publicPopUps.echart_wapper(e.data.pid);
          _that.map.setZoomAndCenter(20, [
            e.data.lnglat.lng,
            e.data.lnglat.lat,
          ]);
        });
      });
    },
    submitForm(formName) {
      let odd = this.numberValidateForm.Odd_Password;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateuserpassword(
            this.numberValidateForm.New_Password,
            md5(odd),
            this.utils.userName
          ).then(
            (res) => {
              if (res.data.list[0].status == true) {
                this.$message.success("修改成功");
              } else {
                this.$message.error(res.data.list[0].err_msg);
              }
            },
            () => {
              this.$message.error("请稍后重试或联系管理员 ");
            }
          );
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.querySelector(".twoEchart"));
      push_DeviceData(this.utils.userName, "").then((res) => {
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          grid: {
            top: "10%",
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            left: 10,
            bottom: 10,
            data: ["报警", "故障", "离线", "正常", "设备总数", "项目总数"],
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
              data: [
                { value: res.data.DeciveNumAlarm, name: "报警" },
                { value: res.data.DeciveNumFault, name: "故障" },
                { value: res.data.DeciveNumOff, name: "离线" },
                { value: res.data.DeciveNumOn, name: "正常" },
                { value: res.data.DeciveNumAll, name: "设备总数" },
                { value: res.data.ProjectNumAll, name: "项目总数" },
              ],
            },
          ],
        });
      });

      //left第二个图表
      let myChart_three = this.$echarts.init(
        document.querySelector(".threeEchart")
      );

      check_device_type().then((res) => {
        let arr = [];

        const data2 = res.data.list[0].values.split(",");

        for (let i = 0; i < data2.length; i++) {
          const data = res.data.list[0].name.split(",");
          const data2 = res.data.list[0].values.split(",");
          arr.push({ name: data[i], value: data2[i] });
        }
        myChart_three.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          grid: {
            top: "10%",
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            left: 10,
            bottom: 10,
            data: arr.name,
            textStyle: {
              color: "#fft",
            },
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "70%",
              center: ["60%", "50%"],
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
              data: arr,
            },
          ],
        });
      });

      //left第三个图表
      let myChart_four = this.$echarts.init(
        document.querySelector(".fourEchart")
      );
      var indictedCase = [10, 7, 15, 8];
      push_AlarmNumData(this.utils.userName, "").then((res) => {
        // //console.log(res.data[0].typeName);
        let listName = [];
        let listNum = [];
        res.data.forEach((element) => {
          listName.push(element.typeName);
          listNum.push(element.num);
        });
        // //console.log(listName);
        myChart_four.setOption({
          // backgroundColor: "#051c71",
          // title: {
          //   text: echarts.format.addCommas(dataCount) + " Data",
          //   left: 10,
          // },
          // toolbox: {
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: false,
          //     },
          //     saveAsImage: {
          //       pixelRatio: 2,
          //     },
          //   },
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            bottom: "30%",
            top: "5%",
          },
          dataZoom: [
            {
              type: "inside",
            },
            {
              type: "slider",
            },
          ],
          xAxis: {
            data: listName,
            silent: false,
            splitLine: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              // rotate: 10,
              //"rotate": 30,
              interval: 0,
              // color: "#eee",
              fontSize: 14,
              formatter: function (params) {
                var val = "";
                if (params.length > 1) {
                  val = params.substr(0, 4) + "...";
                  return val;
                } else {
                  return params;
                }
              },
            },
          },
          yAxis: {
            splitArea: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
          },
          series: [
            {
              type: "bar",
              data: listNum,
              // Set `large` for large data amount
              large: true,
            },
          ],
        });
      });

      //right本周报警及故障数
      let twoEchart_right = this.$echarts.init(
        document.querySelector(".twoEchart_right")
      );

      push_AlarmAndFault(this.utils.userName, "0").then((res) => {
        //console.log(res, 7777);
        let tiem = [];
        let data = [];
        let fault = [];
        res.data.Alarm.forEach((element) => {
          tiem.push(element.date);
          data.push(element.num);
        });
        res.data.Fault.forEach((element) => {
          fault.push(element.num);
        });
        //console.log(tiem);
        twoEchart_right.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: ["报警数", "故障数"],
            left: 10,
            top: 5,
            textStyle: {
              color: "#fft",
            },
          },

          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "17%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: tiem,
              axisLabel: {
                //"rotate": 30,
                interval: 0,
                color: "#eee",
                fontSize: 14,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                //"rotate": 30,
                interval: 0,
                color: "#eee",
                fontSize: 14,
              },
            },
          ],
          series: [
            {
              name: "故障数",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: fault,
            },
            {
              name: "报警数",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: data,
            },
          ],
        });
      });

      //right第二个图表
      let myChart_three_right = this.$echarts.init(
        document.querySelector(".threeEchart_right")
      );
      push_ProjectRegion(this.utils.userName, "").then((res) => {
        //console.log(res, 6666);
        if (res.data.length <= 0) {
          // return this.$message.error("图表数据加载失败");
          return; //console.log("数据加载失败");
        }
        let name = [];
        let num = [];
        res.data.forEach((element) => {
          name.push(element.address);
          num.push(element.num);
        });
        myChart_three_right.setOption({
          tooltip: {
            trigger: "axis",
            backgroundColor: "#fff",
            padding: [15, 30],
            extraCssText:
              "box-shadow: 0px 0px 25px 5px rgb(41, 95, 159) inset;border-radius:10px",
          },
          // dataZoom: [
          //   {
          //     type: "slider",
          //     show: true,
          //     start: 0,
          //     end: 30,
          //     xAxisIndex: [0],
          //   },
          // ],
          legend: {
            show: true,
            top: "5%",

            textStyle: {
              color: "#fff",
            },
            data: ["数量"],
          },
          grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "2%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            axisTick: {
              show: false,
            },

            axisLabel: {
              // rotate: 10,
              //"rotate": 30,
              interval: 0,
              color: "#eee",
              fontSize: 14,
              formatter: function (params) {
                var val = "";
                if (params.length > 4) {
                  val = params.substr(0, 4) + "...";
                  return val;
                } else {
                  return params;
                }
              },
            },

            data: name,
          },
          yAxis: [
            {
              type: "value",
              name: "单位:(个)",
              min: 0,
              // "max": leftMax*2,
              axisTick: {
                show: false,
              },
              // splitLine: {
              //   show: false,
              //   lineStyle: {
              //     color: "transparent",
              //   },
              // },
              splitNumber: 5,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#eee",
                },
              },
              nameTextStyle: {
                color: "#fff",
              },
            },
          ],
          series: [
            {
              name: "数量",
              type: "bar",
              barWidth: 8,
              barGap: 0,
              label: {
                normal: {
                  show: false,
                  position: "insideRight",
                },
              },
              itemStyle: {
                normal: {
                  color: "#77f9ef",
                },
              },
              data: num,
            },
            {
              name: "数量",
              type: "bar",
              barWidth: 8,
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  show: false,
                  position: "insideRight",
                },
              },
              itemStyle: {
                normal: {
                  color: "#52bbb3",
                },
              },
              data: num,
            },
            {
              name: "数量",
              type: "pictorialBar", // 长方体顶部四边形
              symbol: "diamond",
              symbolRotate: 0,
              symbolSize: ["16", "10"],
              symbolOffset: ["0", "-5"],
              symbolPosition: "end",
              z: 3, // 顶部四边形
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  show: false,
                  position: "insideRight",
                },
              },
              itemStyle: {
                normal: {
                  color: "#52bbb3",
                },
              },
              data: num,
            },
          ],
        });
      });
    },

    out() {
      sessionStorage.removeItem("userName");
      this.$router.push("/login");
    },
  },
  components: {
    vueSeamlessScroll,
    PublicPopUps,
  },
};
</script>
<style lang='less' scoped>
#app {
  width: 100%;
  height: calc(100vh);
  // background: #bfa;
  .title {
    display: flex;
    color: #fff;
    width: 100%;
    height: 100px;
    background: #030542;
    align-items: center;
    position: relative;
    z-index: 999;
    // box-shadow: 5px 20px 3px rgba(3, 5, 66, 0.8 );
    .titleFZ {
      // width: 208px;
      // padding-top: 36px;
      padding-left: 48px;
      span {
        margin-left: 10px;
        font-size: 16px;
      }
      // margin-left: 48px;
    }
    .titleLeft {
      width: 500px;
      height: 48px;
      .btnLeft {
        font-size: 16px;
        float: right;
        display: flex;
        margin-top: -44px;
        margin-right: 30px;
        .btnLeftOne {
          margin-right: 10px;
          width: 131px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3094d5;
          text-decoration: none;
          color: #fff;
          transform: skewX(25deg);
          cursor: pointer;
          span {
            font-weight: 900;
            transform: skewX(-25deg);
          }
        }
        .btnLeftTwo {
          width: 131px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgb(7, 82, 194);
          text-decoration: none;
          color: #fff;
          transform: skewX(25deg);
          cursor: pointer;
          span {
            font-weight: 900;
            transform: skewX(-25deg);
          }
        }
      }
    }
    .titleIMG {
      padding-top: 15px;
      // width: 240px;
      height: 68px;

      // transform: translateX(-30%);
      text-align: center;
      img {
        width: 478px;
        height: 100%;
      }
      // margin: 0 auto;
      .titleName {
        font-size: 35px;
        position: absolute;
        width: 478px;
        // z-index: 999;
        // left: 50%;
        // top: 50%;
        // transform: translateX(-50%);
        line-height: 60px;
      }
    }
    .titleRight {
      width: 460px;
      height: 48px;
      .btnRight {
        // float: right;
        display: flex;
        margin-top: -44px;
        font-size: 16px;
        // margin-right: 30px;
        margin-left: 30px;
        .btnRightOne {
          margin-right: 10px;
          width: 131px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgb(7, 82, 194);
          text-decoration: none;
          color: #fff;
          transform: skewX(-25deg);
          cursor: pointer;
          span {
            font-weight: 900;
            transform: skewX(25deg);
          }
        }
        .btnRightTwo {
          width: 131px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgb(7, 82, 194);
          text-decoration: none;
          color: #fff;
          transform: skewX(-25deg);
          cursor: pointer;
          span {
            font-weight: 900;
            transform: skewX(25deg);
          }
        }
      }
    }
    .titlePassword {
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      img {
        width: 18px;
        height: 15px;
      }
      /deep/.el-dialog {
        background: none;
      }
      /deep/.el-dialog__header {
        display: none;
      }
      /deep/.el-dialog__body {
        background-image: url("../../assets//images/juxing7.png");
        // width: 373px;
        height: 358px;
        color: #fff;
        background-size: 100% 100%;
      }
      /deep/.demo-ruleForm {
        margin-left: -95px;
        margin-top: 40px;
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
  .infoLeft {
    margin-left: 20px;
    width: 373px;
    height: 500px;
    // background: #bfa;
    position: absolute;
    color: #fff;
    z-index: 999;
    .one {
      width: 100%;
      height: 165px;

      background-image: url("../../assets//images/juxing5.png");
      background-size: 100% 165px;

      // display: flex;
      ul {
        margin-left: 20px;
        list-style-type: none;
        li {
          float: left;
          .p_BG {
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            margin-left: 23px;
            width: 50px;
            height: 20px;

            background: linear-gradient(
              0deg,
              rgba(39, 65, 132, 0.62),
              rgba(2, 17, 50, 0.62)
            );
            text-align: center;
            border: 1px solid #3486da;
            border-radius: 6px;
          }
          .p_BG2 {
            background: #3094d5;
          }
        }
      }

      .infoYMR {
        margin: 0 auto;
        width: 330px;
        clear: both;
        display: flex;
        justify-content: space-around;
        .infoYMRLi {
          cursor: pointer;
          text-align: center;
          margin-top: 10px;
          width: 150px;
          height: 50px;
          background: rgb(15, 60, 118);
          position: relative;
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
    }
    .two {
      width: 100%;
      height: 190px;
      background-image: url("../../assets/images/juxing7.png");
      background-size: 100% 190px;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .twoEchart {
        height: 150px;
      }
    }
    .three {
      width: 100%;
      height: 210px;
      background-image: url("../../assets//images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .threeEchart {
        height: 170px;
      }
    }
    .four {
      width: 100%;
      height: 220px;
      background-image: url("../../assets//images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .fourEchart {
        height: 180px;
      }
    }
  }
  .infoRight {
    color: #fff;
    margin-right: 20px;
    width: 373px;
    height: 500px;
    // background: rgb(17, 166, 211);
    position: absolute;
    right: 0;
    z-index: 999;
    // top: 0;
    .one {
      height: 300px;
      background-image: url("../../assets//images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 60px;
        font-size: 18px;
      }
      .scroll_wapper {
        overflow-y: auto;
        height: 66%; //高度根据需求自行设定
        overflow-x: hidden;
        .no_AlarmInfo {
          font-size: 40px;
          color: #999;
          line-height: 200px;
          text-align: center;
        }
        .oneEchartWapper {
          width: 332px;
          margin: 0 auto;
          font-size: 14px;

          .oneEchart {
            display: flex;
            justify-content: space-between;
            width: 332px;
            margin: 0 auto;
            .circular {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: red;
              margin-top: 5px;
              margin-right: 5px;
            }
          }
        }
      }
      .sc_p {
        text-align: center;
        line-height: 30px;
        color: #999;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .two {
      height: 240px;
      background-image: url("../../assets//images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .twoEchart_right {
        height: 200px;
      }
    }
    .three {
      height: 250px;
      background-image: url("../../assets//images/juxing7.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .threeEchart_right {
        height: 210px;
      }
    }
  }
}
</style>