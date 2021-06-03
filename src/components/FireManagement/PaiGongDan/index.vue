  <template>
  <div id="paigongdan">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="内容"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" style="width: 100%" border height="650px">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="orderNo" label="订单编号"> </el-table-column>
        <el-table-column prop="policyNo" label="保险单号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="dateTime" label="发送时间"> </el-table-column>
        <el-table-column prop="paytime" label="付款时间"> </el-table-column>
        <el-table-column prop="address" label="是否发送">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? "未发送" : "已发送" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <span
              style="color: blue; margin-right: 10px"
              @click="(outerVisible = true), devState(scope.row.orderNo)"
              >设备明细</span
            >
            <span style="color: blue" @click="sendWGDFun(scope.row.orderNo)"
              >发送</span
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
      <el-dialog title="设备明细" :visible.sync="outerVisible">
        <el-table
          :data="getOderDevice_list"
          style="width: 100%"
          border
          height="300px"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="deviceNo" label="设备型号"> </el-table-column>
          <el-table-column prop="orderNo" label="订单编号"> </el-table-column>

          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <span
                style="color: blue; margin-right: 10px"
                @click="(innerVisible = true), mapFun(scope.row)"
                >安装信息</span
              >
            </template>
            <!-- <span style="color: blue" @click="innerVisible = true">发送</span> -->
          </el-table-column>
        </el-table>
        <el-dialog
          width="40%"
          title="安装明细"
          :visible.sync="innerVisible"
          append-to-body
        >
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="订单编号">
              <el-input
                v-model="Dispatch.name"
                placeholder="订单编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="Dispatch.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="设备型号">
              <el-input
                v-model="Dispatch.type"
                placeholder="设备型号"
              ></el-input>
            </el-form-item>
            <el-form-item label="电工姓名">
              <el-input
                v-model="Dispatch.ElectricianName"
                placeholder="负责人"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="所属公司">
              <el-input
                v-model="Dispatch.Company"
                placeholder="所属公司"
              ></el-input>
            </el-form-item>
            <el-form-item label="电工电话">
              <el-input
                v-model="Dispatch.ElectricianPhone"
                placeholder="电工电话"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="接单时间">
              <el-input
                v-model="Dispatch.receivingTime"
                placeholder="接单时间"
              ></el-input>
            </el-form-item>
            <el-form-item label="安装回执号">
              <el-input
                v-model="Dispatch.InstallationReceiptNumber"
                placeholder="安装回执号"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="发货人姓名">
              <el-input
                v-model="Dispatch.consignorName"
                placeholder="发货人姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备IMEI号">
              <el-input
                v-model="Dispatch.imeiNumbei"
                placeholder="设备IMEI号"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="安装位置">
              <el-input
                id="tipinput"
                v-model="Dispatch.address"
                placeholder="安装位置"
              ></el-input>
            </el-form-item>
            <el-form-item label="安装经纬度">
              <el-input
                v-model="Dispatch.lnglat"
                placeholder="安装经纬度"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="安装完成时间">
              <el-input
                v-model="Dispatch.InstallationCompletionTime"
                placeholder="安装完成时间"
              ></el-input>
            </el-form-item>
            <el-form-item label="安装确认">
              <el-radio v-model="Dispatch.InstallationConfirmation" label="是"
                >是</el-radio
              >
              <el-radio v-model="Dispatch.InstallationConfirmation" label="否"
                >否</el-radio
              >
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="200px">
            <el-form-item label="设备属性">
              <el-radio v-model="Dispatch.deviceProperties" label="初装"
                >初装</el-radio
              >
              <el-radio v-model="Dispatch.deviceProperties" label="换货"
                >换货</el-radio
              >
              <el-radio v-model="Dispatch.deviceProperties" label="拆除"
                >拆除</el-radio
              >
            </el-form-item>
            <el-form-item label="安装状态">
              <el-radio v-model="Dispatch.InstallationStatus" label="待装"
                >待装</el-radio
              >
              <el-radio v-model="Dispatch.InstallationStatus" label="已转"
                >已装</el-radio
              >
              <el-radio v-model="Dispatch.InstallationStatus" label="异常"
                >异常</el-radio
              >
            </el-form-item>
          </el-form>
          <el-form :inline="true" class="demo-form-inline" label-width="200px">
            <el-form-item label="保险单号是否下发">
              <el-radio v-model="Dispatch.policyNumberIssued" label="是"
                >已下发</el-radio
              >
              <el-radio v-model="Dispatch.policyNumberIssued" label="否"
                >未下发</el-radio
              >
            </el-form-item>
            <el-form-item label="安装图片是否上传">
              <el-radio v-model="Dispatch.uploaded" label="是">已上传</el-radio>
              <el-radio v-model="Dispatch.uploaded" label="否">未上传</el-radio>
            </el-form-item>
          </el-form>
          <el-form
            :inline="true"
            class="demo-form-inline"
            v-if="Dispatch.uploaded == '是'"
            label-width="200px"
          >
            <el-form-item label="经营模式">
              <el-radio v-model="Dispatch.managementModel" label="自营"
                >自营</el-radio
              >
              <el-radio v-model="Dispatch.managementModel" label="联营"
                >联营</el-radio
              >
              <el-radio
                style="visibility: hidden"
                v-model="Dispatch.managementModel"
                label="联营"
                >占位用的</el-radio
              >
              <el-radio
                style="visibility: hidden"
                v-model="Dispatch.managementModel"
                label="联营"
                >占位用的</el-radio
              >
            </el-form-item>
            <el-form-item label="上传图片">
              <el-upload
                class="upload-demo"
                action="http://fire.zhihuiwulian.net.cn/earlyWarn/WebProject/saveWdImage.action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :data="{ orderid: this.Dispatch.name }"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div id="container"></div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="(innerVisible = false), updateOrderDeciveFun()"
              >确定</el-button
            >
          </div>
        </el-dialog>
      </el-dialog>
    </template>
  </div>
</template>
  </div>
</template>

<script>
import {
  getOrder,
  getOderDevice,
  updateOrderDecive,
  sendWGD,
} from "@/api/index.js";
export default {
  data() {
    return {
      fileList: [],
      getOderDevice_list: [],
      outerVisible: false,
      innerVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      Dispatch: {
        //经营模式
        managementModel: "",
        //订单编号
        name: "",
        //项目位置
        address: "",
        //
        Fireman: "",
        PersonCharge: "",
        //设备类型
        type: "",
        //电工姓名
        ElectricianName: "",
        //电工电话
        ElectricianPhone: "",
        //所属公司
        Company: "",
        //接单时间
        receivingTime: "",
        //安装回执号
        InstallationReceiptNumber: "",
        //设备IMEI号
        imeiNumbei: "",
        //发货人姓名
        consignorName: "",
        //备注
        remark: "",
        //金纬度
        lnglat: "",
        //安装完成时间
        InstallationCompletionTime: "",
        // 安装确认
        InstallationConfirmation: "",
        //设备属性
        deviceProperties: "",
        //安装状态
        InstallationStatus: "",
        //保险单下发
        policyNumberIssued: "",
        // 图片上传
        uploaded: "",
      },
      mapState: true,
    };
  },
  mounted() {
    this.getOrderFun();
    // this.map();
  },
  watch: {
    innerVisible(val) {
      console.log(val);
      if (val == false) {
        this.Dispatch = {
          //订单编号
          name: "",
          //项目位置
          address: "",
          //
          Fireman: "",
          PersonCharge: "",
          //设备类型
          type: "",
          //电工姓名
          ElectricianName: "",
          //电工电话
          ElectricianPhone: "",
          //所属公司
          Company: "",
          //接单时间
          receivingTime: "",
          //安装回执号
          InstallationReceiptNumber: "",
          //设备IMEI号
          imeiNumbei: "",
          //发货人姓名
          consignorName: "",
          //备注
          remark: "",
          //金纬度
          lnglat: "",
          //安装完成时间
          InstallationCompletionTime: "",
          // 安装确认
          InstallationConfirmation: "",
          //设备属性
          deviceProperties: "",
          //安装状态
          InstallationStatus: "",
          //保险单下发
          policyNumberIssued: "",
          // 图片上传
          uploaded: "",
        };
      }
    },
  },
  methods: {
    //发送
    sendWGDFun(orderNo) {
      sendWGD(orderNo).then(
        (res) => {
          if (res.data.status == "true") {
            this.$message({
              showClose: true,
              message: "发送成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "发送失败",
              type: "error",
            });
          }
        },
        () => {
          this.$message({
            showClose: true,
            message: "请稍后重试或联系管理员",
            type: "error",
          });
        }
      );
    },
    // 确定按钮
    updateOrderDeciveFun() {
      updateOrderDecive(
        //dataid
        this.Dispatch.dataid,
        //订单编号
        this.Dispatch.name,
        //设备类型
        this.Dispatch.type,
        //电工姓名
        this.Dispatch.ElectricianName,
        //电工手机号
        this.Dispatch.ElectricianPhone,
        //所属公司
        this.Dispatch.Company,
        //接单时间
        this.Dispatch.receivingTime,
        //安装回执号
        this.Dispatch.InstallationReceiptNumber,
        //发货人姓名
        this.Dispatch.consignorName,
        //设备IMEI号
        this.Dispatch.imeiNumbei,
        //设备属性
        this.Dispatch.deviceProperties,
        //安装状态
        this.Dispatch.InstallationStatus,
        // ycyy/
        "",
        //保险单下发
        this.Dispatch.policyNumberIssued,
        //安装图片
        this.Dispatch.uploaded,
        //status
        1,
        //安装位置
        this.Dispatch.address,
        //经纬度
        this.Dispatch.lnglat,
        //完成时间
        this.Dispatch.InstallationCompletionTime,
        //备注
        this.Dispatch.remark,
        //url
        this.response,
        //安装确认
        this.Dispatch.InstallationConfirmation,
        //经营模式
        this.Dispatch.managementModel
      ).then(
        (res) => {
          if (res.data.status == "true") {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
              type: "error",
            });
          }
        },
        () => {
          this.$message({
            showClose: true,
            message: "请稍后重试或联系管理员",
            type: "error",
          });
        }
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList, 6666);
      this.response = response.image_file;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    mapFun(scope) {
      // this.Dispatch.address = "";
      console.log(scope, 99999);
      //经营模式
      this.Dispatch.managementModel = scope.yyms;
      this.Dispatch.dataid = scope.dataid;
      //订单编号
      this.Dispatch.name = scope.orderNo;
      //经纬度
      this.Dispatch.lnglat = scope.azjwd;
      //安装位置
      this.Dispatch.address = scope.azsj;
      //电工姓名
      this.Dispatch.ElectricianName = scope.dgxm;
      //电工手机号
      this.Dispatch.ElectricianPhone = scope.dgsjhm;
      //设备型号
      this.Dispatch.type = scope.deviceNo;
      //所属公司
      this.Dispatch.Company = scope.ssgs;
      //接单时间
      this.Dispatch.receivingTime = scope.jdsj;
      //完成时间
      this.Dispatch.InstallationCompletionTime = scope.azwcsj;
      //发货人姓名
      this.Dispatch.consignorName = scope.fhrxm;
      //设备IMEI号
      this.Dispatch.imeiNumbei = scope.imsi;
      //安装回执号
      this.Dispatch.InstallationReceiptNumber = scope.azhzdh;
      //备注
      this.Dispatch.remark = scope.bz;
      //设备属性
      this.Dispatch.deviceProperties = scope.sbsx;
      //安装状态
      this.Dispatch.InstallationStatus = scope.azzt;
      //保险单下发
      this.Dispatch.policyNumberIssued = scope.bxdsfxf;
      //安装图片
      this.Dispatch.uploaded = scope.aztpsjsc;
      //安装确认
      this.Dispatch.InstallationConfirmation = scope.azqr;
      // if (this.map != undefined) {
      //   this.map.setMap(null);
      // }
      if (this.mapState == true) {
        this.mapState = false;
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
            this.Dispatch.lnglat =
              e.data.location.lng + "," + e.data.location.lat;
            // console.log(e, 654);
            this.Dispatch.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;
          });
        });
      }
    },

    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
      this.Dispatch.lnglat = e.poi.location.lng + "," + e.poi.location.lat;
      this.Dispatch.address =
        e.poi.district + "" + e.poi.address + "" + e.poi.name;
    },
    devState(orderNo) {
      getOderDevice(orderNo).then(
        (res) => {
          console.log(res);
          this.getOderDevice_list = res.data;
        },
        () => {
          this.$message({
            showClose: true,
            message: "请稍后重试或联系管理员",
            type: "error",
          });
        }
      );
    },
    getOrderFun() {
      getOrder().then((res) => {
        console.log(res.data.data, "----------");
        this.tableData = res.data.data;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__header {
  background: #1071e2;
}
/deep/.el-dialog__title {
  color: #fff;
}
#container {
  height: 300px;
}
</style>