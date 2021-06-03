<template>
  <div id="SheBeiGuanLi">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="optionsValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ExportDeviceDataVisible = true"
          >导出设备数据</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="BatchDelete">批量删除</el-button>
      </el-form-item>
    </el-form>
    <div class="tabs">
      <el-table
        ref="multipleTable"
        :data="getAllDeviceWeb_list"
        tooltip-effect="dark"
        style="width: 100%"
        height="650px"
        border
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="installLocation" label="项目位置">
          <template slot-scope="scope">
            <p v-if="scope.row.dSName == '智能重合闸'">智能重合闸</p>
            <p v-else>{{ scope.row.installLocation }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="dSName" label="设备类型"> </el-table-column>
        <el-table-column prop="productNumber" label="设备号"> </el-table-column>
        <el-table-column prop="regdate" label="注册时间"> </el-table-column>
        <el-table-column prop="heartbeatTime" label="心跳时间">
        </el-table-column>
        <el-table-column prop="dVName" label="设备厂商"> </el-table-column>
        <el-table-column prop="address" label="是否授权">
          <template slot-scope="scope">
            <p v-if="scope.row.authorize == 1">已授权</p>
            <p v-else>未授权</p>
          </template></el-table-column
        >
        <el-table-column prop="address" label="保险单号">
          <template slot-scope="scope">
            <p v-if="scope.row.policy == 0">暂无保险单号</p>
            <p v-else>{{ scope.row.policy }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="是否开启流量">
          <template slot-scope="scope">
            <p v-if="scope.row.flow == 0">未开启流量</p>
            <p v-else>已开启流量</p></template
          >
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="bj_map(scope.row.devId, scope.$index)">编辑</span>
              <span @click="open(scope.row.name, scope.row.devId)">删除</span>
              <span @click="fenPei(scope.row.pid)">分配</span>
              <span
                @click="
                  (dialogVisible_set = true), set(scope.row.productNumber)
                "
                >设置</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹窗---------------------------------------------- -->
    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-form-item label="项目名称">
          <el-input
            v-model="mapInfo.name"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <!-- <el-input
            v-model="mapInfo.type"
            placeholder="审批人"
            :disabled="true"
          ></el-input> -->
          <el-select v-model="mapInfo.type" placeholder="请选择">
            <el-option
              v-for="item in shebeiList"
              :key="item.value"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="回路号">
          <el-input v-model="mapInfo.huilu" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备号">
          <el-input
            v-model="mapInfo.shebei"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="设备厂商">
          <el-input
            v-model="mapInfo.changshan"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="心跳时间">
          <el-input
            v-model="mapInfo.xintiao"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="备注">
          <el-input v-model="mapInfo.remak" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <!-- <el-input v-model="mapInfo.zhuche" placeholder="审批人"></el-input> -->

          <!-- <span class="demonstration">默认</span> -->
          <el-date-picker
            v-model="mapInfo.zhuche"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="安装地址">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="right"
          >
            <el-input id="tipinput" v-model="mapInfo.address"></el-input>
          </el-tooltip>
        </el-form-item>
        <div id="container"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogVisible = false), trueON()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 设置弹窗------------------------------------------------ -->
    <el-dialog
      title="设置"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible_set"
      width="40%"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备开关</span>
        </div>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="7">
            <el-button @click="shebeiBtn('4')">开启蜂鸣器</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('5')">关闭蜂鸣器</el-button></el-col
          >
          <el-col :span="7">
            <el-button @click="shebeiBtn('6')">远程消音</el-button></el-col
          >
        </el-row>
        <el-row
          type="flex"
          class="row-bg"
          justify="space-around"
          style="margin-top: 10px"
        >
          <el-col :span="7">
            <el-button @click="shebeiBtn('8')">远程复位</el-button></el-col
          >
          <el-col :span="7"> </el-col>
          <el-col :span="7"> </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span>设备设置</span>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="阀值设置" class="tabs_one" name="first">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>剩余电流/mA</p>
                  <el-input
                    v-model="fazhishezhi.SYDL"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
                <el-col :span="12"
                  ><p>A相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.AXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>B相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.BXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
                <el-col :span="12"
                  ><p>C相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.CXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>N相温度/℃</p>
                  <el-input
                    v-model="fazhishezhi.NXWD"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
                <el-col :span="12"
                  ><p>A相电流/A</p>
                  <el-input
                    v-model="fazhishezhi.AXDL"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>B相电流/A</p>
                  <el-input
                    v-model="fazhishezhi.BXDL"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
                <el-col :span="12"
                  ><p>C相电流/A</p>
                  <el-input
                    v-model="fazhishezhi.CXDL"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>A相电压/V</p>
                  <el-input
                    v-model="fazhishezhi.AXDY"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
                <el-col :span="12"
                  ><p>B相电压/V</p>
                  <el-input
                    v-model="fazhishezhi.BXDY"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input
                ></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p>C相电压/V</p>
                  <el-input
                    v-model="fazhishezhi.CXDY"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top: 20px">
                <el-col :span="4"
                  ><el-button size="mini">取消</el-button></el-col
                >
                <el-col :span="4"
                  ><el-button
                    type="primary"
                    size="mini"
                    @click="SetParameterApiFun"
                    >保存</el-button
                  ></el-col
                >
              </el-row>
            </el-tab-pane>
            <el-tab-pane
              label="报警推送方式"
              name="second"
              style="text-align: center"
            >
              <p>设备状态</p>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="App">App</el-checkbox>
                <el-checkbox label="短信">短信</el-checkbox>
                <el-checkbox label="电话">电话</el-checkbox>
              </el-checkbox-group>
              <el-row type="flex" justify="center">
                <el-col :span="4"
                  ><el-button size="mini">取消</el-button></el-col
                >
                <el-col :span="4"
                  ><el-button type="primary" size="mini" @click="baojingtuisong"
                    >确定</el-button
                  ></el-col
                >
              </el-row></el-tab-pane
            >
            <el-tab-pane label="设备历史故障" name="third">
              <el-form
                size="mini"
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item label="日期:">
                  <el-date-picker
                    v-model="DeviceHistory"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="deviceHistory"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
              <template>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="180">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="设置操作记录" name="fourth">
              <el-form
                size="mini"
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item label="日期:">
                  <el-date-picker
                    v-model="DeviceHistory"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="deviceHistory"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
              <template>
                <el-table :data="caozuojilv" style="width: 100%">
                  <el-table-column type="index" width="50"> </el-table-column>
                  <el-table-column prop="user_name" label="用户账号">
                  </el-table-column>
                  <el-table-column prop="date" label="操作时间">
                  </el-table-column>
                  <el-table-column prop="info" label="操作内容">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_set = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_set = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 导出设备数据弹窗------------------------------------------------ -->
    <el-dialog title="导出" :visible.sync="ExportDeviceDataVisible" width="30%">
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item label="设备状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">在线</el-radio>
            <el-radio label="0">离线</el-radio>
            <el-radio label="3">报警</el-radio>
            <el-radio label="4">所有状态</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="设备类型">
          <el-radio-group v-model="form.desc">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ExportDeviceDataVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(ExportDeviceDataVisible = false), ExportDeviceData()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- //分页器-------------------------------------- -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getAllDeviceWeb,
  updateDeviceSims,
  deleDevice,
  ReadParameterApi,
  getHistoryFault,
  putMessToDeviceOn,
  resetclose,
  resetclosefuwei,
  UpdateDevicePush,
  SetParameterApi,
  addRegisterDevice,
  getUserInfo,
} from "@/api/index.js";
export default {
  data() {
    return {
      handleSelectionChangeValue: [],
      shebeiList: [
        {
          value: "",
          label: "",
        },
        {
          value: "网关",
          label: "0",
        },
        {
          value: "烟感",
          label: "2",
        },
        {
          value: "电气",
          label: "3",
        },
        {
          value: "水压",
          label: "4",
        },
        {
          value: "消防主机",
          label: "5",
        },
        {
          value: "无线气感",
          label: "6",
        },
        {
          value: "粉尘设备",
          label: "7",
        },
        {
          value: "液位",
          label: "8",
        },
        {
          value: "录像",
          label: "9",
        },
        {
          value: "消防门磁",
          label: "10",
        },
        {
          value: "工业燃气",
          label: "11",
        },
        {
          value: "电气火灾探测器",
          label: "12",
        },
        {
          value: "声光报警器",
          label: "15",
        },
        {
          value: "手动报警",
          label: "16",
        },
        {
          value: "水浸报警",
          label: "18",
        },
        {
          value: "紧急报警",
          label: "19",
        },
        {
          value: "燃气瓶压力探测",
          label: "42",
        },
      ],
      form: {
        resource: "4",
        desc: "",
      },
      ExportDeviceDataVisible: false,
      caozuojilv: [],
      handleSizeChangeValue: 10,
      activeName: "second",
      DeviceHistory: "",
      dialogVisible_set: false,
      currentPage4: 1,
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      options: [
        {
          value: "",
          label: "",
        },
        {
          value: "网关",
          label: "0",
        },
        {
          value: "烟感",
          label: "2",
        },
        {
          value: "电气",
          label: "3",
        },
        {
          value: "水压",
          label: "4",
        },
        {
          value: "消防主机",
          label: "5",
        },
        {
          value: "无线气感",
          label: "6",
        },
        {
          value: "粉尘设备",
          label: "7",
        },
        {
          value: "液位",
          label: "8",
        },
        {
          value: "录像",
          label: "9",
        },
        {
          value: "消防门磁",
          label: "10",
        },
        {
          value: "工业燃气",
          label: "11",
        },
        {
          value: "电气火灾探测器",
          label: "12",
        },
        {
          value: "声光报警器",
          label: "15",
        },
        {
          value: "手动报警",
          label: "16",
        },
        {
          value: "水浸报警",
          label: "18",
        },
        {
          value: "紧急报警",
          label: "19",
        },
        {
          value: "燃气瓶压力探测",
          label: "42",
        },
      ],
      optionsValue: "",
      getAllDeviceWeb_list: [],
      total: 1,
      mapInfo: {
        name: "",
        type: "3",
        huilu: "",
        shebei: "",
        zhuche: "",
        xintiao: "",
        remak: "",
        changshan: "",
        address: "",
      },
      fazhishezhi: {},
      checkList: [],
    };
  },
  mounted() {
    // console.log(123123);
    this.getAllDeviceWebFun(10, 1);
    // this.bj_map();
  },
  methods: {
    //批量删除
    BatchDelete() {
      if (this.handleSelectionChangeValue.length <= 0) {
        return this.$message({
          showClose: true,
          type: "error",
          message: "请选择要删除的设备!",
        });
      }
      const powerId = sessionStorage.getItem("new_role");
      const rid = sessionStorage.getItem("power");
      if (powerId == 1000 || rid.indexOf("10003007") != -1) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleDevice(this.handleSelectionChangeValue.toString()).then(
              (res) => {
                if (res.data.list[0].status == "true") {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "删除成功!",
                  });
                  this.getAllDeviceWebFun(
                    this.handleSizeChangeValue,
                    this.handleCurrentChangeValue
                  );
                }
              }
            );
          })
          .catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //复选框
    handleSelectionChange(val) {
      this.handleSelectionChangeValue = [];
      console.log(val, "-----------------");
      let arr = [];
      val.forEach((element) => {
        this.handleSelectionChangeValue.push(element.devId);
      });
    },
    ExportDeviceData() {
      let online;
      let alarm;
      if (this.form.resource == "4") {
        online = "";
        alarm = "";
      } else if (this.form.resource == "3") {
        // online = ''
        alarm = 1;
      } else {
        alarm = "";
      }

      window.open(
        `http://fire.zhihuiwulian.net.cn/earlyWarn/newdevice/PoiRegionDevice.action?username=${this.utils.userName}&online=${online}&alarm=${alarm}&region=1&reName=&type=&s_date=&e_date=`
      );
    },
    fenPei(pid) {
      this.$prompt("请输入分配的账号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          addRegisterDevice(pid, this.utils.userName, value).then(
            (res) => {
              if (res.data.list[0].status == "true") {
                this.$message.success(res.data.list[0].mess);
              } else {
                this.$message.error(res.data.list[0].mess);
              }
            },
            () => {
              this.$message.error("请稍后重试或联系管理员");
            }
          );
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    trueON() {
      updateDeviceSims(
        this.devID,
        this.mapInfo.remak,
        this.utils.userName,
        this.mapInfo.address,
        this.mapInfo.zhuche,
        this.mapInfo.type,
        this.lanlat
      ).then((res) => {
        if (res.data.code == "200") {
          this.$message.success("设备更新成功");
          this.dialogVisible = false;
          this.getAllDeviceWebFun(
            this.handleSizeChangeValue,
            this.handleCurrentChangeValue
          );
        }
      });
    },
    set(data) {
      //获取设备号
      this.setValue = data;
      // console.log(this.setValue);
      ReadParameterApi(data).then(
        (res) => {
          console.log(res.data.row);
          if (res.data.row == undefined) {
            return this.$message.error("请稍后重试或联系管理员");
          }

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
          this.$forceUpdate();
        },
        (rej) => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },

    //设备设置按钮
    shebeiBtn(num) {
      const role = sessionStorage.getItem("role");
      const power = sessionStorage.getItem("power");
      switch (num) {
        //远程断电
        case "1":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclose(this.setValue, 0).then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.$message.error("暂无权限");
          }

          break;

        //远程开机
        case "2":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setValue, "shutdown").then((res) => {
              if (res.data.message == "请求成功") {
                alert("远程开机成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
        //远程关机
        case "3":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setValue, "startup").then((res) => {
              if (res.data.message == "请求成功") {
                alert("远程开机成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //开启蜂鸣器
        case "4":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setValue, "voiceon").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("开启蜂鸣器成功");
              } else {
                this.$message.error("开启蜂鸣器失败");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //关闭蜂鸣器
        case "5":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setValue, "voiceoff").then((res) => {
              if (res.data.message == "请求成功") {
                this.$message.success("关闭蜂鸣器成功");
              } else {
                this.$message.error("关闭蜂鸣器失败");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //远程消音
        case "6":
          if (role == "1000" || power.indexOf("10003001") != -1) {
            resetclose(this.setValue, 2)
              .then((res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success("远程消音成功");
                } else {
                  this.$message.error("关闭远程消音失败");
                }
              })
              .catch((rej) => {
                this.$message.error("请稍后重试或联系管理员");
              });
          } else {
            this.$message.error("暂无权限");
          }

          break;
        //开启流量
        case "7":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(this.setValue, "openflow").then((res) => {
              if (res.data.message == "请求成功") {
                alert("开启流量成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程复位
        case "8":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclosefuwei(this.setValue, 2).then(
              (res) => {
                if (res.status == "1") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              (rej) => {
                return this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //授权
        case "9":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            insertClouddog(this.setValue).then((res) => {
              if (res.list[0].status == "true") {
                this.$message.success(
                  "授权成功.工作日一天后将授权生效,非工作日将延期"
                );
              } else {
                this.$message.error("授权失败");
              }
            });
          }
          break;
        //开启屏蔽器
        case "10":
          if (role == "1000" || power.indexOf("10003013") != -1) {
            updateShutdown(this.setValue, this.utils, userName).then((res) => {
              if (res.status == "true") {
                layer.open({
                  content: res.mess,
                });
                this.$message.success(res.mess);
              } else {
                this.$message.error(res.mess);
              }
            });
          }
          break;
        //下发保险单
        case "11":
          // console.log(6554654);
          // console.log(this.setValue, 789789);
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDevice(this.setValue, this.baoxiandanhao).then((res) => {
              if (res.data.message == "请求成功") {
                alert("下发保险单号成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
          }
          // var res = JSON.parse(result);
          // console.log(res);

          break;
      }
    },

    bj_map(data, index) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10003005") != -1
      ) {
        this.dialogVisible = true;
        this.mapInfo.name = this.getAllDeviceWeb_list[index].name;
        // this.mapInfo.type = this.getAllDeviceWeb_list[index].dSName;
        this.mapInfo.shebei = this.getAllDeviceWeb_list[index].productNumber;
        this.mapInfo.zhuche = this.getAllDeviceWeb_list[index].regdate;
        this.mapInfo.xintiao = this.getAllDeviceWeb_list[index].heartbeatTime;
        this.mapInfo.changshan = this.getAllDeviceWeb_list[index].dVName;
        this.mapInfo.remak = this.getAllDeviceWeb_list[index].remark;
        this.devID = data;
        this.$nextTick(() => {
          this.map = new AMap.Map("container", {
            center: [116.397428, 39.90923],
            resizeEnable: true,
            zoom: 10,
            mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
          });
          //输入提示
          var autoOptions = {
            input: "tipinput",
          };
          var auto = new AMap.Autocomplete(autoOptions);
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
          }); //构造地点查询类

          AMap.event.addListener(auto, "select", this.select); //注册监听，当选中某条记录时会触发
          AMap.event.addListener(this.placeSearch, "markerClick", (e) => {
            // console.log(e.data.location.lng, e.data.location.lat); // 经纬度
            // console.log(e, 654);
            this.lanlat = e.data.location.lng + "," + e.data.location.lat;
            this.mapInfo.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;
          });
        });
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //报警推送
    baojingtuisong() {
      console.log(this.checkList);
      let app = 0;
      let sms = 0;
      let phone = 0;
      // if(this.checklist.length==3){
      //   app = 1
      // }
      // if(this.checklist.length==2){
      //   sms = 1
      // }
      this.checkList.forEach((index, element) => {
        console.log(index, element);
        if (index === "短信") {
          sms = 1;
        }
        if (index === "电话") {
          phone = 1;
        }
        if (index === "App") {
          app = 1;
        }
      });
      UpdateDevicePush(
        "undefined",
        app,
        this.utils.userName,
        sms,
        this.setValue,
        phone
      ).then((res) => {
        this.$message.success("修改成功");
      });
    },
    SetParameterApiFun() {
      SetParameterApi(
        this.setValue,
        this.fazhishezhi.SYDL,
        this.fazhishezhi.AXWD,
        this.fazhishezhi.BXWD,
        this.fazhishezhi.CXWD,
        this.fazhishezhi.NXWD,
        this.fazhishezhi.AXDL,
        this.fazhishezhi.BXDL,
        this.fazhishezhi.CXDL,
        this.fazhishezhi.AXDY,
        this.fazhishezhi.BXDY,
        this.fazhishezhi.CXDY
      ).then((res) => {
        if (res.data.status == 1) {
          this.$message.success("设置成功");
        } else {
          this.$message.error("设置失败");
        }
      });
    },
    //设备历史
    deviceHistory() {
      console.log(this.DeviceHistory);
      getHistoryFault(
        this.setValue,
        this.DeviceHistory[0],
        this.DeviceHistory[1]
      ).then((res) => {
        if (res.data.length <= 0) {
          return this.$message.error("暂无历史数据");
        }
      });
    },

    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
      this.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
      this.mapInfo.address =
        e.poi.district + "" + e.poi.address + "" + e.poi.name;
    },
    //分页器函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getAllDeviceWebFun(val, this.handleCurrentChangeValue);
      console.log(this.handleCurrentChangeValue);
      this.handleSizeChangeValue = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.handleCurrentChangeValue = val;
      this.getAllDeviceWebFun(this.handleSizeChangeValue, val);
    },

    handleClick(tab, event) {
      // console.log(tab.label);
      if (tab.label === "设置操作记录") {
        // console.log(123);
        getUserInfo("", "", this.setValue, "", "").then((res) => {
          this.caozuojilv = res.data;
        });
      }
    },

    //展示数据方法接口
    getAllDeviceWebFun(ls, cp) {
      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllDeviceWeb(
        this.utils.userName,
        cp,
        col,
        state,
        kw,
        ls,
        this.formInline.user,
        this.optionsValue
      ).then((res) => {
        this.getAllDeviceWeb_list = res.data.list[0].allObj;
        console.log(this.getAllDeviceWeb_list);
        this.total = res.data.list[0].count;
      });
    },
    newClick() {},
    // 项目管理删除
    delClick() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {
      this.getAllDeviceWebFun(
        this.handleSizeChangeValue,
        this.handleCurrentChangeValue
      );
    },
    open(name, devID) {
      const powerId = sessionStorage.getItem("new_role");
      const rid = sessionStorage.getItem("power");

      if (powerId == 1000 || rid.indexOf("10003007") != -1) {
        this.$confirm(
          `此操作将永久删除 <span style='color:red'>${name}</span> 设备, 是否继续?`,

          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning",
          }
        )
          .then(() => {
            deleDevice(devID).then((res) => {
              if (res.data.list[0].status == "true") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAllDeviceWebFun(
                  this.handleSizeChangeValue,
                  this.handleCurrentChangeValue
                );
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    indexMethod() {},
  },
};
</script>
<style lang='less' scoped>
#SheBeiGuanLi {
  .caozuo {
    span {
      color: blue;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .block {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
  #container {
    height: 300px;
  }
  .amap-sug-result {
    z-index: 99999999999999999;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }
  /deep/.el-card__body {
    /deep/.el-button {
      width: 100%;
    }
  }
}
</style>