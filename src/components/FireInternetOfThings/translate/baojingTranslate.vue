<template>
  <div id="app">
    <div class="title">
      <ul v-for="(item, index) in deviceNum" :key="index">
        <li>{{ item }}</li>
      </ul>
    </div>
    <ul
      class="ulList"
      v-if="
        this.$route.path === '/FireInternetOfThings/FireWaterSystem' ||
        this.$route.path === '/FireInternetOfThings/FireAlarmSystem' ||
        this.$route.path === '/FireInternetOfThings/KeyParts' ||
        this.$route.path === '/FireInternetOfThings/SmartIndependentSmoke' ||
        this.$route.path === '/FireInternetOfThings/GasDetector' ||
        this.$route.path === '/FireInternetOfThings/IntelligentFireAlarm' ||
        this.$route.path === '/FireInternetOfThings/FireExtinguisher' ||
        this.$route.path === '/FireInternetOfThings/PowerDetection' ||
        this.$route.path === '/FireInternetOfThings/GasBottlePressureDetection'
      "
    >
      <li
        @click="fatherMethod('1')"
        :class="this.DeviceNumList.alarm == 0 ? 'pointer_events' : ''"
      >
        <span>报警</span
        ><span style="color: #f9387f">{{ DeviceNumList.alarm }}></span>
      </li>
      <li
        @click="fatherMethod('2')"
        :class="this.DeviceNumList.online == 0 ? 'pointer_events' : ''"
      >
        <span v-if="$route.path === '/FireInternetOfThings/KeyParts'"
          >离线</span
        >
        <span v-else>在线</span>
        <span>{{ DeviceNumList.online }}></span>
      </li>
      <li
        @click="fatherMethod('3')"
        :class="this.DeviceNumList.offline == 0 ? 'pointer_events' : ''"
      >
        <span v-if="$route.path === '/FireInternetOfThings/KeyParts'"
          >在线</span
        >
        <span v-else>离线</span>
        <span style="color: #ffff00">{{ DeviceNumList.offline }}></span>
      </li>
    </ul>

    <ul
      class="ulList"
      v-else-if="
        this.$route.path === '/FireInternetOfThings/EmergencyManagement'
      "
    >
      <li @click="windowsClick('3')">
        <span>电气火灾设备</span><span>></span>
      </li>
      <li @click="windowsClick('4,8')">
        <span>消防水设备</span><span>></span>
      </li>
    </ul>

    <ul class="ulList" v-else>
      <li @click="(dialogVisible = true), callPolice(''), fatherMethod('1')">
        <span>报警</span
        ><span style="color: #f9387f">{{ DeviceNumList.alarm }}></span>
      </li>
      <li @click="(onlineVisible = true), online('', 1), fatherMethod('2')">
        <span>在线</span><span>{{ DeviceNumList.online }}></span>
      </li>
      <li @click="(offlineVisible = true), online('', 0), fatherMethod('3')">
        <span>离线</span
        ><span style="color: #ffff00">{{ DeviceNumList.offline }}></span>
      </li>
    </ul>
    <!-- 报警设备弹窗 -->
    <el-dialog
      title="报警设备"
      :visible.sync="dialogVisible"
      width="70%"
      :modal-append-to-body="false"
    >
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item label="项目名称">
          <el-button plain size="mini" @click="callPolice('')">全部</el-button>
          <el-button plain size="mini" @click="callPolice('0')">报警</el-button>
          <el-button plain size="mini" @click="callPolice('1')">故障</el-button>
        </el-form-item>

        <el-form-item label="项目名称">
          <el-input
            v-model="callPoliceInput.xiangmuName"
            placeholder="项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            v-model="callPoliceInput.shebeiName"
            placeholder="设备编号"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          height="500"
          v-loading="callPoliceList_loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255,255,255)"
          :data="callPoliceList.list"
          style="width: 100%"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="date" label="项目名称" width="180">
            <template slot-scope="scope">
              {{ scope.row.pname }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="项目位置" width="180">
          </el-table-column>
          <el-table-column prop="devno" label="设备编号"> </el-table-column>
          <el-table-column prop="address" label="事件详情" width="250">
            <template slot-scope="scope">
              {{ scope.row.type }},告警值:
              <template v-if="scope.row.type == '剩余电流-报警'">
                <span style="color: red">
                  {{ scope.row.leakageAlarmCurrentValue }} </span
                >mA
              </template>
              <template v-if="scope.row.type == 'A相电流-报警'">
                <span style="color: red">
                  {{ scope.row.currentAlarmAvalue }} </span
                >A
              </template>
              <template v-if="scope.row.type == 'B相电流-报警'">
                <span style="color: red">
                  {{ scope.row.currentAlarmBvalue }} </span
                >A
              </template>
              <template v-if="scope.row.type == 'C相电流-报警'">
                <span style="color: red">
                  {{ scope.row.currentAlarmBvalue }} </span
                >A
              </template>
              <template v-if="scope.row.type == 'B温度-报警'">
                <span style="color: red">
                  {{ scope.row.temperatureAlarmBvalue }} </span
                >℃
              </template>
              <template v-if="scope.row.type == 'A温度-报警'">
                <span style="color: red">
                  {{ scope.row.temperatureAlarmAvalue }} </span
                >℃
              </template>
              <template v-if="scope.row.type == 'C温度-报警'">
                <span style="color: red">
                  {{ scope.row.temperatureAlarmCvalue }} </span
                >℃
              </template>
              <template v-if="scope.row.type == 'N温度-报警'">
                <span style="color: red">
                  {{ scope.row.temperatureAlarmNvalue }} </span
                >℃
              </template>
              <template v-if="scope.row.type == '漏电故障'">
                <span style="color: red">
                  {{ scope.row.noAlarmCurrentValue }} </span
                >mA
              </template>
              <template v-if="scope.row.type == 'A相电压过载-报警'">
                <span style="color: red">
                  {{ scope.row.voltageAlarmAvalue }} </span
                >V
              </template>
              <template v-if="scope.row.type == 'B相电压-报警'">
                <span style="color: red">
                  {{ scope.row.voltageAlarmBvalue }} </span
                >V
              </template>
              <template v-if="scope.row.type == 'C相电压-报警'">
                <span style="color: red">
                  {{ scope.row.voltageAlarmCvalue }} </span
                >V
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="regdate" sortable label="事件时间">
          </el-table-column>
          <!-- <el-table-column prop="address" label="心跳时间"> </el-table-column> -->
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <span
                @click="see(scope.row.devId, scope.row.productNumber)"
                class="chakan"
                >查看</span
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.callPoliceList.total * 1 || 0"
        >
        </el-pagination>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
    <!-- 在线设备弹窗 -->
    <el-dialog
      title="在线设备"
      :visible.sync="onlineVisible"
      width="70%"
      :modal-append-to-body="false"
    >
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="项目名称">
          <el-input
            v-model="onlineInput.xiangmuName"
            placeholder="项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            v-model="onlineInput.shebeiName"
            placeholder="设备编号"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="onlineList.list"
          height="500"
          v-loading="callPoliceList_loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255,255,255)"
          style="width: 100%"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="installLocation" label="项目位置" width="180">
          </el-table-column>
          <el-table-column prop="productNumber" label="设备编号">
          </el-table-column>
          <el-table-column prop="flowTime" label="保险单号"
            >暂无保险单号
          </el-table-column>
          <el-table-column prop="heartbeatTime" label="开启流量时间">
          </el-table-column>
          <el-table-column prop="regdate" sortable label="心跳时间">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <span
                @click="see(scope.row.devId, scope.row.productNumber)"
                class="chakan"
                >查看</span
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.onlineList.total * 1 || 0"
        >
        </el-pagination>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
    <!-- 离线设备弹窗 -->
    <el-dialog
      title="离线设备"
      :visible.sync="offlineVisible"
      width="70%"
      :modal-append-to-body="false"
    >
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="项目名称">
          <el-input
            v-model="onlineInput.xiangmuName"
            placeholder="项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            v-model="onlineInput.shebeiName"
            placeholder="设备编号"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="onlineList.list"
          height="500"
          v-loading="callPoliceList_loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255,255,255)"
          style="width: 100%"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="installLocation" label="项目位置" width="180">
          </el-table-column>
          <el-table-column prop="productNumber" label="设备编号">
          </el-table-column>
          <el-table-column prop="flowTime" label="保险单号"
            >暂无保险单号
          </el-table-column>
          <el-table-column prop="heartbeatTime" label="开启流量时间">
          </el-table-column>
          <el-table-column prop="regdate" sortable label="心跳时间">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <span
                @click="see(scope.row.devId, scope.row.productNumber)"
                class="chakan"
                >查看</span
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.onlineList.total * 1 || 0"
        >
        </el-pagination>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>

    <PubilcPopUps ref="publicPopUps" :pagetype="pagetype" />
  </div>
</template>

<script>
import {
  DeviceNum,
  getAlarmDevice,
  getDeviceStatus,
  ElectricDeviceDate,
  ElecData,
  WebeditFileimageServlet,
  ReadParameterApi,
  getDeviceByDevId,
  resetclose,
  putMessToDevice,
  putMessToDeviceOn,
  resetclosefuwei,
  insertClouddog,
  updateShutdown,
  SetParameterApi,
  UpdateDevicePush,
  getHistoryFault,
  getHistDeviceAlarm,
  getUserInfo,
} from "@/api/index.js";
import PubilcPopUps from "../translate/publicPopUps";
export default {
  data() {
    return {
      caozuojilv: [],
      one_echarts_loading: false,
      DeviceHistory: "",
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
      ElectricDeviceDateType: false,
      ElecDataList_images: [],
      shengyu_loudian: "",
      ElecDataList_typeName: "",
      getDeviceByDevIdList: "",
      ElecDataList: "",
      onlineList: "",
      callPoliceList_loading: true,
      pageSize: 10,
      pagetype: "",
      callPoliceList: "",
      handleCurrentChangeNum: "1",
      deviceNum: "",
      DeviceNumList: "",
      sizeForm: {
        date2: "",
        date1: "",
      },
      callPoliceInput: {
        xiangmuName: "",
        shebeiName: "",
      },
      onlineInput: {
        xiangmuName: "",
        shebeiName: "",
      },
      innerVisible_lishi: false,
      checkList: [],
      activeName: "second",
      managementInput: "",
      innerVisible: false,
      dialogVisible: false,
      onlineVisible: false,
      innerVisible_shebei: false,
      offlineVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      currentPage4: 1,
      tableData: [],
      Historical_alarm_list_loading: false,
      Historical_alarm_list: [],
    };
  },
  mounted() {
    this.DeviceNum();
  },
  components: {
    PubilcPopUps,
  },
  methods: {
    //历史报警
    // Historical_alarm() {
    //   this.Historical_alarm_list_loading = true;
    //   const time = new Date();
    //   const year = time.getFullYear();
    //   const month = time.getMonth() + 1;
    //   const day = time.getDate();
    //   let now = year + "-" + month + "-" + day;
    //   if (this.sizeForm.date1 != "") {
    //     now = this.sizeForm.date1;
    //   }
    //   // console.log(this.sizeForm.date1, 987987);
    //   getHistDeviceAlarm(this.productNumber, now).then(
    //     (res) => {
    //       this.Historical_alarm_list_loading = false;
    //       if (res.data == "") {
    //         return this.$message.warning("暂无历史数据");
    //       }
    //       this.Historical_alarm_list = res.data.DevData;
    //     },
    //     () => {
    //       this.$message.error("请稍后重试或联系管理员");
    //     }
    //   );
    // },
    windowsClick(data) {
      // let status = this.$store.state.initStatus; //
      this.$store.commit("changeStatus", data);
    },
    //有用
    fatherMethod(num) {
      let data;
      switch (num) {
        case "1":
          data = this.DeviceNumList.alarmPid;
          break;
        case "2":
          data = this.DeviceNumList.onlinePid;
          break;
        case "3":
          data = this.DeviceNumList.offlinePid;
          break;
      }

      // console.log(data.join(","));
      this.$parent.callPolice(data.join(","));
    },
    //设备历史
    // deviceHistory(type) {
    //   if (type == "故障") {
    //     getHistoryFault(
    //       this.ElecDataList.DevData[0].productNumber,
    //       this.DeviceHistory[0],
    //       this.DeviceHistory[1]
    //     ).then((res) => {
    //       if (res.data.length <= 0) {
    //         return this.$message.error("暂无历史数据");
    //       }
    //     });
    //   } else {
    //     getUserInfo(
    //       "",
    //       "",
    //       this.productNumber,
    //       this.DeviceHistory[0],
    //       this.DeviceHistory[1]
    //     ).then(
    //       (res) => {
    //         this.caozuojilv = res.data;
    //         if (res.data.length == 0) {
    //           return this.$message.error("暂无历史数据");
    //         }
    //       },
    //       () => {
    //         this.$message.error("请稍后重试或联系管理员");
    //       }
    //     );
    //   }
    //   //console.log(this.DeviceHistory);
    // },
    //报警推送
    // baojingtuisong() {
    //   console.log(this.checkList);
    //   let app = 0;
    //   let sms = 0;
    //   let phone = 0;
    //   // if(this.checklist.length==3){
    //   //   app = 1
    //   // }
    //   // if(this.checklist.length==2){
    //   //   sms = 1
    //   // }
    //   this.checkList.forEach((index, element) => {
    //     console.log(index, element);
    //     if (index === "短信") {
    //       sms = 1;
    //     }
    //     if (index === "电话") {
    //       phone = 1;
    //     }
    //     if (index === "App") {
    //       app = 1;
    //     }
    //   });
    //   UpdateDevicePush(
    //     "undefined",
    //     app,
    //     this.utils.userName,
    //     sms,
    //     this.ElecDataList.DevData[0].productNumber,
    //     phone
    //   ).then((res) => {
    //     this.$message.success("修改成功");
    //   });
    // },
    //设备设置按钮

    // // 设备设置

    // //提交处置情况
    // management() {
    //   if (this.ElecDataList.DevData[0].aFid == "") {
    //     return this.$message.warning("设备正常,无需解除");
    //   }
    //   if (this.managementInput == "") {
    //     return this.$message.error("请填写处置信息");
    //   }
    //   console.log(this.ElecDataList.DevData[0]);
    //   WebeditFileimageServlet(
    //     this.utils.userName + "," + this.ElecDataList.DevData[0].aFid,
    //     this.managementInput
    //   ).then((res) => {
    //     if (res.data.list[0].status == true) {
    //       this.innerVisible = false;
    //       return this.$message.success("报警解除成功");
    //     }
    //   });
    // },
    // 在线设备
    online(alarm, data) {
      let object = this.onlineInput.shebeiName || this.onlineInput.xiangmuName;
      this.callPoliceList_loading = true;
      this.alarm = alarm;

      let type;
      switch (this.$route.path) {
        case "/FireInternetOfThings/electricalFire":
          // this.btnInfo = "电气火灾隐患";
          type = 3;
          break;
        case "/FireInternetOfThings/FireWaterSystem":
          this.btnInfo = "消防水系统";
          type = "4,8";
          break;
        case "/FireInternetOfThings/FireAlarmSystem":
          this.btnInfo = "火灾报警系统";
          type = "0,5,20";
          break;
        case "/FireInternetOfThings/KeyParts":
          this.btnInfo = "重点部位";
          type = "9,13,20";
          break;
        case "/FireInternetOfThings/SmartIndependentSmoke":
          this.btnInfo = "智慧型独立烟感";
          type = "2";
          break;
        case "/FireInternetOfThings/GasDetector":
          this.btnInfo = "燃气探测器";
          type = "1,6,11";
          break;
        case "/FireInternetOfThings/EmergencyManagement":
          this.btnInfo = "应急处理";
          type = "3,4,8";
          break;
        case "/FireInternetOfThings/IntelligentFireAlarm":
          this.btnInfo = "智慧型消防报警";
          type = "10,15,16,19,18";
          break;
        case "/FireInternetOfThings/FireExtinguisher":
          this.btnInfo = "灭火器";
          type = "21";
          break;
        case "/FireInternetOfThings/PowerDetection":
          this.btnInfo = "电力检测系统";
          type = "12";
          break;
        case "/FireInternetOfThings/Panorama":
          this.btnInfo = "设备定位全景图";
          type = "3";
          break;
      }
      getDeviceStatus(
        this.utils.userName,
        this.currentPage4,
        alarm,
        this.pageSize,
        object,
        type,
        this.utils.userName,
        data
      ).then((res) => {
        this.onlineList = res.data;
        this.callPoliceList_loading = false;
      });
    },

    // 报警设备
    callPolice(alarm) {
      this.callPoliceList_loading = true;
      this.alarm = alarm;
      let object =
        this.callPoliceInput.shebeiName || this.callPoliceInput.xiangmuName;
      getAlarmDevice(
        this.utils.userName,
        this.currentPage4,
        alarm,
        this.pageSize,
        object
      ).then((res) => {
        console.log(res);
        this.callPoliceList = res.data;
        this.callPoliceList_loading = false;
      });
    },
    DeviceNum() {
      let type;
      switch (this.$route.path) {
        case "/FireInternetOfThings/electricalFire":
          // this.btnInfo = "电气火灾隐患";
          type = 3;
          break;
        case "/FireInternetOfThings/FireWaterSystem":
          this.btnInfo = "消防水系统";
          type = "4,8";
          break;
        case "/FireInternetOfThings/FireAlarmSystem":
          this.btnInfo = "火灾报警系统";
          type = "0,5,20";
          break;
        case "/FireInternetOfThings/KeyParts":
          this.btnInfo = "重点部位";
          type = "9,13,20";
          break;
        case "/FireInternetOfThings/SmartIndependentSmoke":
          this.btnInfo = "智慧型独立烟感";
          type = "2";
          break;
        case "/FireInternetOfThings/GasDetector":
          this.btnInfo = "燃气探测器";
          type = "1,6,11";
          break;
        case "/FireInternetOfThings/EmergencyManagement":
          this.btnInfo = "应急处理";
          type = "3,4,8";
          break;
        case "/FireInternetOfThings/IntelligentFireAlarm":
          this.btnInfo = "智慧型消防报警";
          type = "10,15,16,19,18";
          break;
        case "/FireInternetOfThings/FireExtinguisher":
          this.btnInfo = "灭火器";
          type = "21";
          break;
        case "/FireInternetOfThings/PowerDetection":
          this.btnInfo = "电力检测系统";
          type = "12";
          break;
        case "/FireInternetOfThings/Panorama":
          this.btnInfo = "设备定位全景图";
          type = "3";
          break;
        case "/FireInternetOfThings/GasBottlePressureDetection":
          this.btnInfo = "燃气瓶压力探测";
          type = "42";
          break;
      }
      const region = sessionStorage.getItem("region");
      DeviceNum(this.utils.userName, type, region).then((res) => {
        this.DeviceNumList = res.data;
        // console.log(this.DeviceNumList);

        let subNum = "000000" + this.DeviceNumList.deviceNum;
        console.log(this.DeviceNumList.deviceNum, "----------------------");

        //数据为undefined直接返回0
        if (this.DeviceNumList.deviceNum == undefined) {
          return (this.deviceNum = "000000");
        }
        // if (
        //   this.$route.path === "/FireInternetOfThings/electricalFire" ||
        //   this.$route.path === "/FireInternetOfThings/Panorama"
        // ) {
        //   subNum = "002" + this.DeviceNumList.deviceNum * 1;
        //   this.DeviceNumList.online = "20" + this.DeviceNumList.online;
        // }
        // subNum.toString();
        this.deviceNum = subNum.substring(subNum.length - 6);
        // alert(this.deviceNum);
        if (this.deviceNum == "efined") {
          return (this.deviceNum = "000000");
        }
      });
    },

    // TabS 切换函数
    handleClick(tab, event) {
      // console.log(tab.label);
      if (tab.label === "阀值设置") {
        ReadParameterApi(this.ElecDataList.DevData[0].productNumber).then(
          (res) => {
            console.log(res.data.row);
            const row = res.data.row;
            this.fazhishezhi.AXWD = row.AWenDu;
            this.fazhishezhi.BXWD = row.BWenDu;
            this.fazhishezhi.CXWD = row.CWenDu;
            this.fazhishezhi.NXWD = row.NWenDu;
            this.fazhishezhi.SYDL = row.SYdianliu;
            this.fazhishezhi.AXDL = row.ADianLiu;
            this.fazhishezhi.BXDL = row.BDianLiu;
            this.fazhishezhi.CXDL = row.CDianLiu;
            this.fazhishezhi.AXDY = row.ADianYa;
            this.fazhishezhi.BXDY = row.BDianYa;
            this.fazhishezhi.CXDY = row.CDianYa;
          }
        );
      }
      if (tab.label === "设备历史故障") {
        getHistoryFault(
          this.ElecDataList.DevData[0].productNumber,
          this.DeviceHistory[0],
          this.DeviceHistory[1]
        ).then(
          (res) => {
            if (res.data.length <= 0) {
              return this.$message.error("暂无历史数据");
            }
            // this.DeviceHistory_LIST = res.data.DevData;
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
      if (tab.label === "设置操作记录") {
        // console.log(123);
        getUserInfo("", "", this.productNumber, "", "").then(
          (res) => {
            if (res.data.length <= 0) {
              return this.$message.warning("暂无历史数据");
            }
            this.caozuojilv = res.data;
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
    },
    // 查看echart图片函数
    see(devId, productNumber) {
      console.log(this.$refs.publicPopUps);
      this.$refs.publicPopUps.see(devId, productNumber);
      //清空处置情况
      // this.innerVisible = true;
      // this.managementInput = "";
      // this.productNumber = productNumber;
      // const time = new Date();
      // const year = time.getFullYear();
      // const month = time.getMonth() + 1;
      // const day = time.getDate();
      // const now = year + "-" + month + "-" + day;
      // this.one_echarts_loading = true;
      // await getDeviceByDevId(devId).then(
      //   (res) => {
      //     if (res.data == null || res.data == undefined) {
      //       return this.$message.error("请稍后重试或联系管理员");
      //     }
      //     if (
      //       res.data.list[0].mess5[0] == null &&
      //       res.data.list[0].mess2 == "[]"
      //     ) {
      //       return this.$message.error("请稍后重试或联系管理员");
      //     }
      //     if (
      //       res.data.list[0].mess5 == "[]" &&
      //       res.data.list[0].mess2 == "[]"
      //     ) {
      //       return this.$message.error("请稍后重试或联系管理员");
      //     }
      //     // //console.log(res, "sssqqq");
      //     this.getDeviceByDevIdList = res.data.list[0];
      //     // this.getDeviceByDevIdList.mess5[0].push(
      //     //   this.getDeviceByDevIdList.mess2[0]
      //     // );
      //     //
      //     //console.log(Array.isArray(this.getDeviceByDevIdList.mess5));
      //     !Array.isArray(this.getDeviceByDevIdList.mess5)
      //       ? (this.mwss5Status = false)
      //       : (this.mwss5Status = true);
      //     //console.log(this.mwss5Status, 646654);
      //     if (this.mwss5Status == true) {
      //       //判断数组是非为空数组
      //       if (this.getDeviceByDevIdList.mess5.length <= 0) {
      //         return (this.mwss5Status = false);
      //       }
      //       this.getDeviceByDevIdList.mess5[0].date = this.getDeviceByDevIdList.mess2[0];
      //     }
      //   },
      //   () => {
      //     return this.$message.error("请稍后重试或联系管理员");
      //   }
      // );

      // // 设备详情接口
      // ElecData(devId, now).then((res) => {
      //   //重置照片
      //   this.ElecDataList_images = [];
      //   this.ElecDataList = res.data;

      //   //判断数组是否有数据
      //   if (res.data.DevData.length > 0) {
      //     if (res.data.DevData[0].image != "") {
      //       const list = res.data.DevData[0].image.split(",");
      //       list.forEach((Element) => {
      //         // Element =
      //         let a = "http://edog-online.com/ctx/devPic/" + Element;
      //         this.ElecDataList_images.push(a);
      //       });
      //     }
      //   }

      //   this.ElecDataList_typeName = res.data.DevData[0].typeName;
      //   ReadParameterApi(res.data.DevData[0].productNumber).then((res) => {
      //     // console.log(res, "ldjakjdla");
      //     // this.getDeviceByDevIdList.row = res.data.row;
      //     // console.log(this.getDeviceByDevIdList, 7899987978);
      //     this.shengyu_loudian = {
      //       oneAlarm: this.getDeviceByDevIdList.mess2[0]
      //         .noLeakageAlarmACurrentValue,
      //       twoAlarm: this.getDeviceByDevIdList.mess2[0]
      //         .noLeakageAlarmBCurrentValue,
      //       threeAlarm: this.getDeviceByDevIdList.mess2[0]
      //         .noLeakageAlarmCCurrentValue,
      //       fourAlarm: this.getDeviceByDevIdList.mess2[0]
      //         .leakageAlarmCurrentValue,
      //       oneDianLiu: res.data.row.ADianLiu,
      //       twoDianLiu: res.data.row.BDianLiu,
      //       threeDianLiu: res.data.row.CDianLiu,
      //       fourDianLiu: res.data.row.SYdianliu,
      //       oneVolatage: this.getDeviceByDevIdList.mess2[0]
      //         .noVoltageAlarmAValue,
      //       twoVolatage: this.getDeviceByDevIdList.mess2[0]
      //         .noVoltageAlarmBValue,
      //       threeVolatage: this.getDeviceByDevIdList.mess2[0]
      //         .noVoltageAlarmCValue,
      //       oneDianYa: res.data.row.ADianYa,
      //       twoDianYa: res.data.row.BDianYa,
      //       threeDianYa: res.data.row.CDianYa,
      //       oneTempera: this.getDeviceByDevIdList.mess2[0]
      //         .noAlarmATemperatureValue,
      //       twoTempera: this.getDeviceByDevIdList.mess2[0]
      //         .noAlarmBTemperatureValue,
      //       threeTempera: this.getDeviceByDevIdList.mess2[0]
      //         .noAlarmCTemperatureValue,
      //       fourTempera: this.getDeviceByDevIdList.mess2[0]
      //         .noAlarmNTemperatureValue,
      //       oneWenDu: res.data.row.AWenDu,
      //       twoWenDu: res.data.row.BWenDu,
      //       threeWenDu: res.data.row.CWenDu,
      //       fourWenDu: res.data.row.NWenDu,
      //     };
      //     console.log(this.shengyu_loudian);
      //   });
      // });
      // // 图表接口
      // ElectricDeviceDate(devId, now).then((res) => {
      //   // console.log(res.data, 2321232123212);
      //   this.callPoliceList_loading = false;
      //   this.one_echarts_loading = false;
      //   let dianLiuUa = [];
      //   let dianLiuUb = [];
      //   let dianLiuUc = [];
      //   let dianLiuUd = [];
      //   let dianYaA = [];
      //   let dianYaB = [];
      //   let dianYaC = [];
      //   let wenduA = [];
      //   let wenduB = [];
      //   let wenduC = [];
      //   let wenduN = [];
      //   let name = [];
      //   // if (res.data.Data.length > 0) {
      //   //   this.ElectricDeviceDateType = true;
      //   // } else {
      //   //   return (this.ElectricDeviceDateType = false);
      //   // }

      //   res.data.Data.forEach((element) => {
      //     dianLiuUa.push(element.ia);
      //     dianLiuUb.push(element.ib);
      //     dianLiuUc.push(element.ic);
      //     dianLiuUd.push(element.ld);
      //     wenduA.push(element.ta);
      //     wenduB.push(element.tb);
      //     wenduC.push(element.tc);
      //     wenduN.push(element.tn);
      //     dianYaA.push(element.ua);
      //     dianYaB.push(element.ub);
      //     dianYaC.push(element.uc);
      //     name.push(element.happenedTime);
      //   });

      //   this.$nextTick(() => {
      //     let one_echart_left = this.$echarts.init(
      //       document.querySelector(".echarts_wapper_one")
      //     );

      //     // 电流统计图
      //     one_echart_left.setOption({
      //       tooltip: {
      //         trigger: "axis",
      //       },
      //       legend: {
      //         data: ["A电流(mA)", "B电流(mA)", "C电流(mA)", "剩余电流(mA)"],
      //       },
      //       grid: {
      //         left: "3%",
      //         right: "4%",
      //         bottom: "3%",
      //         containLabel: true,
      //       },
      //       toolbox: {
      //         feature: {
      //           saveAsImage: {},
      //         },
      //       },
      //       xAxis: {
      //         type: "category",
      //         boundaryGap: false,
      //         data: name.reverse(),
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           name: "A电流(mA)",
      //           type: "line",

      //           data: dianLiuUa.reverse(),
      //         },
      //         {
      //           name: "B电流(mA)",
      //           type: "line",

      //           data: dianLiuUb.reverse(),
      //         },
      //         {
      //           name: "C电流(mA)",
      //           type: "line",

      //           data: dianLiuUc.reverse(),
      //         },
      //         {
      //           name: "剩余电流(mA)",
      //           type: "line",

      //           data: dianLiuUd.reverse(),
      //         },
      //       ],
      //     });
      //     // 温度统计图
      //     let two_echart_left = this.$echarts.init(
      //       document.querySelector(".echarts_wapper_two")
      //     );
      //     two_echart_left.setOption({
      //       tooltip: {
      //         trigger: "axis",
      //       },
      //       legend: {
      //         data: ["A温度(℃)", "B温度(℃)", "C温度(℃)", "N温度(℃)"],
      //       },
      //       grid: {
      //         left: "3%",
      //         right: "4%",
      //         bottom: "3%",
      //         containLabel: true,
      //       },
      //       toolbox: {
      //         feature: {
      //           saveAsImage: {},
      //         },
      //       },
      //       xAxis: {
      //         type: "category",
      //         boundaryGap: false,
      //         data: name.reverse(),
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           name: "A温度(℃)",
      //           type: "line",

      //           data: wenduA.reverse(),
      //         },
      //         {
      //           name: "B温度(℃)",
      //           type: "line",

      //           data: wenduB.reverse(),
      //         },
      //         {
      //           name: "C温度(℃)",
      //           type: "line",

      //           data: wenduC.reverse(),
      //         },
      //         {
      //           name: "N温度(℃)",
      //           type: "line",

      //           data: wenduN.reverse(),
      //         },
      //       ],
      //     });

      //     //电压统计图
      //     let three_echart_left = this.$echarts.init(
      //       document.querySelector(".echarts_wapper_three")
      //     );
      //     three_echart_left.setOption({
      //       tooltip: {
      //         trigger: "axis",
      //       },
      //       legend: {
      //         data: ["A电压(A)", "B电压(A)", "C电压(A)"],
      //       },
      //       grid: {
      //         left: "3%",
      //         right: "4%",
      //         bottom: "3%",
      //         containLabel: true,
      //       },
      //       toolbox: {
      //         feature: {
      //           saveAsImage: {},
      //         },
      //       },
      //       xAxis: {
      //         type: "category",
      //         boundaryGap: false,
      //         data: name.reverse(),
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           name: "A电压(A)",
      //           type: "line",
      //           // stack: "总量",
      //           data: dianYaA.reverse(),
      //         },
      //         {
      //           name: "B电压(A)",
      //           type: "line",
      //           // stack: "总量",
      //           data: dianYaB.reverse(),
      //         },
      //         {
      //           name: "C电压(A)",
      //           type: "line",
      //           // stack: "总量",
      //           data: dianYaC.reverse(),
      //         },
      //       ],
      //     });
      //   });
      // });
    },

    // 分页器回调
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.callPoliceList_loading = true;
      if (this.onlineVisible == true) {
        this.online(this.alarm);
      }
      if (this.dialogVisible == true) {
        this.callPolice(this.alarm);
      }
    },
    handleCurrentChange(val) {
      this.callPoliceList_loading = true;
      this.currentPage4 = val;
      if (this.onlineVisible == true) {
        this.online(this.alarm, 1);
      }
      if (this.dialogVisible == true) {
        this.callPolice(this.alarm);
      }
      if (this.offlineVisible == true) {
        this.online(this.alarm, 0);
      }
    },
    // 弹窗查询按钮
    onSubmit() {
      this.currentPage4 = 1;
      if (this.onlineVisible == true) {
        this.online(this.alarm, 1);
      }
      if (this.dialogVisible == true) {
        this.callPolice(this.alarm);
      }
      if (this.offlineVisible == true) {
        this.online(this.alarm, 0);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.row-bg {
  padding: 5px 10px;

  // background-color: #f9fafc;
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
      span {
        color: blue;
      }
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
.title {
  margin-top: 10px;
  margin-bottom: 10px;
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
    color: #6dff64;
    line-height: 32px;
    text-align: center;
  }
}
.shebeiWapper {
  margin-top: 25px;
  display: flex;
  height: 1600px;
  .shebeiInfo {
    .one {
      width: 300px;
      color: #4b6082;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      span {
        color: #000;
      }
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        .ulInfo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          text-align: center;
          margin: 0 auto;
          line-height: 150px;
          color: #fff;
          font-size: 20px;
        }
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;
        li {
          margin-top: 8px;
          color: #4b6082;
          span {
            color: #333;
          }
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      ul {
        margin-top: -10px;
        text-align: left;
        span {
          color: red;
        }
      }
      .imgWapper_img {
        height: 90px;
        img {
          width: 35px;
          height: 35px;
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
      .zanwushuju {
        // background-color: black;
        text-align: center;
        line-height: 300px;
        font-family: "Raleway", sans-serif;
        font-size: 28px;
        color: #fff;
        text-shadow: 4px 4px 0 red, 4px -4px 0 red, -4px -4px 0 red,
          -4px 4px 0 red, 4px 3px 0 red, 4px -3px 0 red, -4px -3px 0 red,
          -4px 3px 0 red, 4px 2px 0 red, 4px -2px 0 red, -4px -2px 0 red,
          -4px 2px 0 red, 4px 1px 0 red, 4px -1px 0 red, -4px -1px 0 red,
          -4px 1px 0 red, 4px 0px 0 red, 4px 0px 0 red, -4px 0px 0 red,
          -4px 0px 0 red, 3px 4px 0 red, 3px -4px 0 red, -3px -4px 0 red,
          -3px 4px 0 red, 3px 3px 0 red, 3px -3px 0 red, -3px -3px 0 red,
          -3px 3px 0 red, 3px 2px 0 red, 3px -2px 0 red, -3px -2px 0 red,
          -3px 2px 0 red, 3px 1px 0 red, 3px -1px 0 red, -3px -1px 0 red,
          -3px 1px 0 red, 3px 0px 0 red, 3px 0px 0 red, -3px 0px 0 red,
          -3px 0px 0 red, 2px 4px 0 red, 2px -4px 0 red, -2px -4px 0 red,
          -2px 4px 0 red, 2px 3px 0 red, 2px -3px 0 red, -2px -3px 0 red,
          -2px 3px 0 red, 2px 2px 0 red, 2px -2px 0 red, -2px -2px 0 red,
          -2px 2px 0 red, 2px 1px 0 red, 2px -1px 0 red, -2px -1px 0 red,
          -2px 1px 0 red, 2px 0px 0 red, 2px 0px 0 red, -2px 0px 0 red,
          -2px 0px 0 red, 1px 4px 0 red, 1px -4px 0 red, -1px -4px 0 red,
          -1px 4px 0 red, 1px 3px 0 red, 1px -3px 0 red, -1px -3px 0 red,
          -1px 3px 0 red, 1px 2px 0 red, 1px -2px 0 red, -1px -2px 0 red,
          -1px 2px 0 red, 1px 1px 0 red, 1px -1px 0 red, -1px -1px 0 red,
          -1px 1px 0 red, 1px 0px 0 red, 1px 0px 0 red, -1px 0px 0 red,
          -1px 0px 0 red, 0px 4px 0 red, 0px -4px 0 red, 0px -4px 0 red,
          0px 4px 0 red, 0px 3px 0 red, 0px -3px 0 red, 0px -3px 0 red,
          0px 3px 0 red, 0px 2px 0 red, 0px -2px 0 red, 0px -2px 0 red,
          0px 2px 0 red, 0px 1px 0 red, 0px -1px 0 red, 0px -1px 0 red,
          0px 1px 0 red, 0px 0px 0 red, 0px 0px 0 red, 0px 0px 0 red,
          0px 0px 0 red, 0 0 0 red;
      }
      .echarts_wapper_two {
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
      .zanwushuju {
        // background-color: black;
        text-align: center;
        line-height: 300px;
        font-family: "Raleway", sans-serif;
        font-size: 28px;
        color: #fff;
        text-shadow: 4px 4px 0 red, 4px -4px 0 red, -4px -4px 0 red,
          -4px 4px 0 red, 4px 3px 0 red, 4px -3px 0 red, -4px -3px 0 red,
          -4px 3px 0 red, 4px 2px 0 red, 4px -2px 0 red, -4px -2px 0 red,
          -4px 2px 0 red, 4px 1px 0 red, 4px -1px 0 red, -4px -1px 0 red,
          -4px 1px 0 red, 4px 0px 0 red, 4px 0px 0 red, -4px 0px 0 red,
          -4px 0px 0 red, 3px 4px 0 red, 3px -4px 0 red, -3px -4px 0 red,
          -3px 4px 0 red, 3px 3px 0 red, 3px -3px 0 red, -3px -3px 0 red,
          -3px 3px 0 red, 3px 2px 0 red, 3px -2px 0 red, -3px -2px 0 red,
          -3px 2px 0 red, 3px 1px 0 red, 3px -1px 0 red, -3px -1px 0 red,
          -3px 1px 0 red, 3px 0px 0 red, 3px 0px 0 red, -3px 0px 0 red,
          -3px 0px 0 red, 2px 4px 0 red, 2px -4px 0 red, -2px -4px 0 red,
          -2px 4px 0 red, 2px 3px 0 red, 2px -3px 0 red, -2px -3px 0 red,
          -2px 3px 0 red, 2px 2px 0 red, 2px -2px 0 red, -2px -2px 0 red,
          -2px 2px 0 red, 2px 1px 0 red, 2px -1px 0 red, -2px -1px 0 red,
          -2px 1px 0 red, 2px 0px 0 red, 2px 0px 0 red, -2px 0px 0 red,
          -2px 0px 0 red, 1px 4px 0 red, 1px -4px 0 red, -1px -4px 0 red,
          -1px 4px 0 red, 1px 3px 0 red, 1px -3px 0 red, -1px -3px 0 red,
          -1px 3px 0 red, 1px 2px 0 red, 1px -2px 0 red, -1px -2px 0 red,
          -1px 2px 0 red, 1px 1px 0 red, 1px -1px 0 red, -1px -1px 0 red,
          -1px 1px 0 red, 1px 0px 0 red, 1px 0px 0 red, -1px 0px 0 red,
          -1px 0px 0 red, 0px 4px 0 red, 0px -4px 0 red, 0px -4px 0 red,
          0px 4px 0 red, 0px 3px 0 red, 0px -3px 0 red, 0px -3px 0 red,
          0px 3px 0 red, 0px 2px 0 red, 0px -2px 0 red, 0px -2px 0 red,
          0px 2px 0 red, 0px 1px 0 red, 0px -1px 0 red, 0px -1px 0 red,
          0px 1px 0 red, 0px 0px 0 red, 0px 0px 0 red, 0px 0px 0 red,
          0px 0px 0 red, 0 0 0 red;
      }
      .echarts_wapper_three {
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
      .zanwushuju {
        // background-color: black;
        text-align: center;
        line-height: 160px;
        font-family: "Raleway", sans-serif;
        font-size: 28px;
        color: #fff;
        text-shadow: 4px 4px 0 red, 4px -4px 0 red, -4px -4px 0 red,
          -4px 4px 0 red, 4px 3px 0 red, 4px -3px 0 red, -4px -3px 0 red,
          -4px 3px 0 red, 4px 2px 0 red, 4px -2px 0 red, -4px -2px 0 red,
          -4px 2px 0 red, 4px 1px 0 red, 4px -1px 0 red, -4px -1px 0 red,
          -4px 1px 0 red, 4px 0px 0 red, 4px 0px 0 red, -4px 0px 0 red,
          -4px 0px 0 red, 3px 4px 0 red, 3px -4px 0 red, -3px -4px 0 red,
          -3px 4px 0 red, 3px 3px 0 red, 3px -3px 0 red, -3px -3px 0 red,
          -3px 3px 0 red, 3px 2px 0 red, 3px -2px 0 red, -3px -2px 0 red,
          -3px 2px 0 red, 3px 1px 0 red, 3px -1px 0 red, -3px -1px 0 red,
          -3px 1px 0 red, 3px 0px 0 red, 3px 0px 0 red, -3px 0px 0 red,
          -3px 0px 0 red, 2px 4px 0 red, 2px -4px 0 red, -2px -4px 0 red,
          -2px 4px 0 red, 2px 3px 0 red, 2px -3px 0 red, -2px -3px 0 red,
          -2px 3px 0 red, 2px 2px 0 red, 2px -2px 0 red, -2px -2px 0 red,
          -2px 2px 0 red, 2px 1px 0 red, 2px -1px 0 red, -2px -1px 0 red,
          -2px 1px 0 red, 2px 0px 0 red, 2px 0px 0 red, -2px 0px 0 red,
          -2px 0px 0 red, 1px 4px 0 red, 1px -4px 0 red, -1px -4px 0 red,
          -1px 4px 0 red, 1px 3px 0 red, 1px -3px 0 red, -1px -3px 0 red,
          -1px 3px 0 red, 1px 2px 0 red, 1px -2px 0 red, -1px -2px 0 red,
          -1px 2px 0 red, 1px 1px 0 red, 1px -1px 0 red, -1px -1px 0 red,
          -1px 1px 0 red, 1px 0px 0 red, 1px 0px 0 red, -1px 0px 0 red,
          -1px 0px 0 red, 0px 4px 0 red, 0px -4px 0 red, 0px -4px 0 red,
          0px 4px 0 red, 0px 3px 0 red, 0px -3px 0 red, 0px -3px 0 red,
          0px 3px 0 red, 0px 2px 0 red, 0px -2px 0 red, 0px -2px 0 red,
          0px 2px 0 red, 0px 1px 0 red, 0px -1px 0 red, 0px -1px 0 red,
          0px 1px 0 red, 0px 0px 0 red, 0px 0px 0 red, 0px 0px 0 red,
          0px 0px 0 red, 0 0 0 red;
      }
      .echarts_wapper_four {
        display: flex;

        img {
          margin-left: 20px;
          width: 150px;
          height: 150px;
        }
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
      .zanwushuju {
        // background-color: black;
        text-align: center;
        line-height: 300px;
        font-family: "Raleway", sans-serif;
        font-size: 28px;
        color: #fff;
        text-shadow: 4px 4px 0 red, 4px -4px 0 red, -4px -4px 0 red,
          -4px 4px 0 red, 4px 3px 0 red, 4px -3px 0 red, -4px -3px 0 red,
          -4px 3px 0 red, 4px 2px 0 red, 4px -2px 0 red, -4px -2px 0 red,
          -4px 2px 0 red, 4px 1px 0 red, 4px -1px 0 red, -4px -1px 0 red,
          -4px 1px 0 red, 4px 0px 0 red, 4px 0px 0 red, -4px 0px 0 red,
          -4px 0px 0 red, 3px 4px 0 red, 3px -4px 0 red, -3px -4px 0 red,
          -3px 4px 0 red, 3px 3px 0 red, 3px -3px 0 red, -3px -3px 0 red,
          -3px 3px 0 red, 3px 2px 0 red, 3px -2px 0 red, -3px -2px 0 red,
          -3px 2px 0 red, 3px 1px 0 red, 3px -1px 0 red, -3px -1px 0 red,
          -3px 1px 0 red, 3px 0px 0 red, 3px 0px 0 red, -3px 0px 0 red,
          -3px 0px 0 red, 2px 4px 0 red, 2px -4px 0 red, -2px -4px 0 red,
          -2px 4px 0 red, 2px 3px 0 red, 2px -3px 0 red, -2px -3px 0 red,
          -2px 3px 0 red, 2px 2px 0 red, 2px -2px 0 red, -2px -2px 0 red,
          -2px 2px 0 red, 2px 1px 0 red, 2px -1px 0 red, -2px -1px 0 red,
          -2px 1px 0 red, 2px 0px 0 red, 2px 0px 0 red, -2px 0px 0 red,
          -2px 0px 0 red, 1px 4px 0 red, 1px -4px 0 red, -1px -4px 0 red,
          -1px 4px 0 red, 1px 3px 0 red, 1px -3px 0 red, -1px -3px 0 red,
          -1px 3px 0 red, 1px 2px 0 red, 1px -2px 0 red, -1px -2px 0 red,
          -1px 2px 0 red, 1px 1px 0 red, 1px -1px 0 red, -1px -1px 0 red,
          -1px 1px 0 red, 1px 0px 0 red, 1px 0px 0 red, -1px 0px 0 red,
          -1px 0px 0 red, 0px 4px 0 red, 0px -4px 0 red, 0px -4px 0 red,
          0px 4px 0 red, 0px 3px 0 red, 0px -3px 0 red, 0px -3px 0 red,
          0px 3px 0 red, 0px 2px 0 red, 0px -2px 0 red, 0px -2px 0 red,
          0px 2px 0 red, 0px 1px 0 red, 0px -1px 0 red, 0px -1px 0 red,
          0px 1px 0 red, 0px 0px 0 red, 0px 0px 0 red, 0px 0px 0 red,
          0px 0px 0 red, 0 0 0 red;
      }
      .echarts_wapper_one {
        width: 100%;
        height: 300px;
      }
    }
  }
}

#app {
  // 分页器样式

  .ulList {
    padding-bottom: 20px;
    margin-left: 30px;

    li {
      cursor: pointer;
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
    .pointer_events {
      pointer-events: none;
      cursor: not-allowed;
    }
  }
}
</style>