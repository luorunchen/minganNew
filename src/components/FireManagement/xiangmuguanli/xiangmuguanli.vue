<template>
  <div id="xiangmuguanli">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <!-- <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="防火员">
        <el-input v-model="formInline.user" placeholder="防火员"></el-input>
      </el-form-item> -->
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="负责人"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getAllProjecForStateFun(10, 1)"
          >查询</el-button
        >

        <el-button type="primary" @click="addNewOpenFun('新增')"
          >新增项目
        </el-button>
        <el-button type="primary" @click="deletFun"
          >删除责任人和防火员</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tabs">
      <el-table
        ref="multipleTable"
        :data="getAllProjecForState_list"
        tooltip-effect="dark"
        style="width: 100%"
        height="650px"
        border
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="项目名称" width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="location" label="项目位置"> </el-table-column>
        <el-table-column prop="fireman" label="防火员" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="firemanPhone"
          label="防火员电话"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="legalman" label="责任人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="legalmanPhone"
          label="责任人电话"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="项目介绍" show-overflow-tooltip>
          无
        </el-table-column>
        <el-table-column prop="remark" label="说明" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="bj_map(scope.row.devId, scope.row)">编辑</span>
              <span @click="open(scope.row.pid, scope.row.name)">删除</span>
              <span @click="newClick(scope.row.pid, scope.row)">新增设备</span>
              <span @click="fenxiangClick(scope.row.pid)">分享</span>
            </div></template
          >
        </el-table-column>
      </el-table>
    </div>
    x
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

    <!-- 弹窗部分-------------------------------- -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-form-item label="项目名称">
          <el-input
            v-model="mapInfo.projectname"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="防火员">
          <!-- <el-input v-model="mapInfo.huilu" @focus="inputClick()">
           
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('防火员')"
            v-model="mapInfo.huilulist"
            filterable
            placeholder="号码搜索请输入4位及以上"
            @change="setq($event, '防火员')"
            remote
            :remote-method="filter_method_FangHuo"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="parseInt(item.pid)"
            >
              <!-- {{ item.user_name + item.phone }} -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('0')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="应用场所">
          <el-input v-model="mapInfo.type" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item label="责任人">
          <!-- <el-input v-model="mapInfo.shebei" placeholder="审批人">
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('责任人')"
            v-model="mapInfo.shebeilist"
            filterable
            placeholder="号码搜索请输入4位及以上"
            @change="setq($event, '责任人')"
            remote
            :remote-method="filter_method_ZeRen"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="parseInt(item.pid)"
              :label="item.user_name + item.phone"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('1')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="说明">
          <el-input
            v-model="mapInfo.changshan"
            placeholder="审批人"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="街道负责人">
          <!-- <el-input v-model="mapInfo.xintiao" placeholder="审批人">
            <el-button slot="append">新增</el-button>
          </el-input> -->
          <el-select
            @focus="inputClick('街道')"
            v-model="mapInfo.xintiaolist"
            filterable
            placeholder="号码搜索请输入4位及以上"
            @change="setq($event, '街道')"
            remote
            :remote-method="filter_method_JieDao"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="parseInt(item.pid)"
            >
              {{ item.user_name + item.phone }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="addNew('3')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="介绍">
          <el-input
            v-model="mapInfo.remak"
            :disabled="true"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="网格员">
          <!-- <el-input v-model="mapInfo.zhuche" placeholder="审批人">
            <el-button slot="append">新增</el-button></el-input
          > -->
          <el-select
            @focus="inputClick('网格员')"
            v-model="mapInfo.zhuchelist"
            filterable
            placeholder="号码搜索请输入4位及以上"
            @change="setq($event, '网格员')"
            remote
            :remote-method="filter_method_WangGe"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.user_name + item.phone"
              :value="parseInt(item.pid)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="addNew('2')">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="所在街道">
          <el-select
            v-model="mapInfo.where"
            @change="regionList_change"
            placeholder="填写项目位置后选择"
          >
            <el-option
              v-for="(item, index) in regionList_list"
              :key="index"
              :label="item.ad_Region"
              :value="item.ad_Code"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="mapInfo.where"></el-input> -->
        </el-form-item>
        <el-form-item label="所在社区">
          <el-select
            v-model="mapInfo.code"
            @change="regionList_code_change"
            placeholder="填写所在街道后选择"
          >
            <el-option
              v-for="(item, index) in regionList_code"
              :key="index"
              :label="item.ad_Region"
              :value="item.ad_Code"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="mapInfo.code"></el-input> -->
        </el-form-item>
      </el-form>

      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="项目位置">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="right"
          >
            <el-input
              id="tipinput"
              @input="clear"
              v-model="mapInfo.address"
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <div id="container"></div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), addProjectFun()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 添加人员弹窗 -->
    <el-dialog title="添加" :visible.sync="outerVisible" width="20%">
      用户名:<el-input v-model="mapInfo.addUser"></el-input> 手机号:<el-input
        v-model="mapInfo.addPhone"
      ></el-input>
      备注 :<el-input v-model="mapInfo.addReamrk"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="(outerVisible = false), addTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除防火员弹窗 -->
    <el-dialog title="删除" :visible.sync="deletVisible" width="20%">
      <p>删除责任人/防火员:</p>
      <el-select
        @focus="inputClick('防火员责任人')"
        v-model="mapInfo.delet"
        filterable
        placeholder="号码搜索请输入4位及以上"
        @change="setq"
        remote
        :remote-method="filter_method"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.pid"
          :label="item.user_name + item.phone"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(deletVisible = false), deletegalFireManFun()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增设备弹窗 -->
    <el-dialog title="新增设备" :visible.sync="addNewSheBeiVisible" width="40%">
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input
            v-model="mapInfo.bianhao"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="shebeiListValue" placeholder="请选择">
            <el-option
              v-for="item in shebeiList"
              :key="item.value"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <!-- </el-select> -->
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input v-model="mapInfo.name" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input
            v-model="mapInfo.lnglat"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="应用场所">
          <el-input
            v-model="mapInfo.changsuo"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信推送">
          <el-radio v-model="mapInfo.duanxin" label="0">开启</el-radio>
          <el-radio v-model="mapInfo.duanxin" label="1">关闭</el-radio>

          <!-- <el-input
            v-model="mapInfo.duanxin"
          
            placeholder="请填写备注"
          ></el-input> -->
        </el-form-item>
      </el-form>
      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="项目位置">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mapInfo.address"
            placement="right"
          >
            <el-input
              id="tipinput"
              @input="clear"
              v-model="mapInfo.address"
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="mapInfo.reamrk"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
        <div id="container2"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewSheBeiVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(addNewSheBeiVisible = false), addNewSheBeiTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProjecForState,
  getLegalFireMan,
  addLegalFireMan,
  addProject,
  deleDevice,
  deletegalFireMan,
  addDevice,
  newUpdateProjectSim,
  addRegisterProject,
  regionList,
  deleProject,
} from "@/api/index.js";
export default {
  data() {
    return {
      regionList_list: [],
      regionList_code: [],
      addNewSheBeiVisible: false,
      outerVisible: false,
      getAllProjecForState_list: [],
      dialogVisible: false,
      deletVisible: false,
      loading: false,
      formInline: {
        user: "",
        region: "",
      },
      total: 0,
      currentPage4: 1,
      handleSizeChangeValue: 10,
      mapInfo: {
        projectname: "",
        name: "",
        zeRenRen: "",
        zeRenRenPhone: "",
        wangGeYuan: "",
        wangGeYuanPhone: "",
        jieDao: "",
        jieDaoPhone: "",
        newType: "",
        code: "",
        where: "",
        address: "",

        zhuche: "",
        xintiao: "",
        shebei: "",
        huilu: "",
        huilulist: "",
        zhuchelist: "",
        xintiaolist: "",
        shebeilist: "",
        changsuo: "",
      },
      options: [],
      shebeiListValue: "",
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
      newType: "",
    };
  },
  mounted() {
    this.getAllProjecForStateFun(10, 1);
  },

  methods: {
    regionList_change(val) {
      // console.log(val.substring(0, 9));
      // console.log(val);
      regionList(val.substring(0, 9)).then((res) => {
        console.log(res);
        this.regionList_code = res.data.mess;
      });
    },
    regionList_code_change(val) {
      // console.log(val, 987);
      this.mapInfo.code = val;
    },
    //分享按钮
    fenxiangClick(pid) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10002007") != -1
      ) {
        this.$prompt("请输入分享的账号", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: "邮箱格式不正确",
        })
          .then(({ value }) => {
            addRegisterProject(pid, value, this.utils.userName).then(
              (res) => {
                if (res.data.list[0].status == "true") {
                  this.$message({
                    type: "success",
                    message: "分享成功,您分享的账号是: " + value,
                  });
                } else {
                  this.$message.error("分享失败");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
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
    //删除防火员和责任人
    deletegalFireManFun() {
      deletegalFireMan(this.mapInfo.delet).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        },
        (rej) => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    //删除防火员和责任人
    deletFun() {
      if (this.utils.powerId == 1000) {
        this.deletVisible = true;
        this.mapInfo.delet = "";
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //清空输入框方法
    clear(event) {
      console.log(event);
      this.mapInfo.address = event;
      // console.log(this.mapInfo.address);
      this.$forceUpdate();
    },
    // 添加项目函数
    addProjectFun() {
      if (this.lanlat == undefined || this.lanlat == null) {
        return this.$message.error("无法获取您的项目经纬度,请重新输入");
      }

      if (this.newType == "新增") {
        if (
          this.mapInfo.code == undefined ||
          this.mapInfo.code == null ||
          this.mapInfo.code == ""
        ) {
          return this.$message.error("请选择街道");
        }

        addProject(
          this.utils.userName,
          this.mapInfo.name, //项目名称
          this.mapInfo.address, //项目地址
          this.mapInfo.huilu, //防火员
          this.mapInfo.shebei, //责任人
          this.mapInfo.remak, //备注
          this.lanlat,
          this.mapInfo.type, //应用场所
          this.mapInfo.code, //街道
          this.mapInfo.zhuche, //网格员
          this.mapInfo.xintiao
        ).then(
          (res) => {
            if (res.data.list[0].status == "true") {
              this.$message.success("添加成功");
              this.getAllProjecForStateFun(
                this.handleSizeChangeValue,
                this.handleCurrentChangeValue
              );
            } else {
              this.$message.error(res.data.list[0].mess);
            }
          },
          (rej) => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      } else {
        // this.mapInfo.name = "";
        const fanghuoyuan = this.mapInfo.huilulist.split(",")[0];
        const fanghuoyuanPhone = this.mapInfo.huilulist.split(",")[1];
        newUpdateProjectSim(
          this.mapInfo.pid,
          this.mapInfo.address,
          fanghuoyuan,
          fanghuoyuanPhone,
          this.mapInfo.zeRenRen,
          this.mapInfo.zeRenRenPhone,
          this.lanlat,
          this.mapInfo.projectname,
          this.mapInfo.wangGeYuan,
          this.mapInfo.wangGeYuanPhone,
          this.mapInfo.jieDao,
          this.mapInfo.jieDaoPhone,
          this.lanlat
        ).then(
          (res) => {
            if (res.data.status == "true") {
              this.$message.success("编辑成功");
              this.getAllProjecForStateFun(
                this.handleSizeChangeValue,
                this.handleCurrentChangeValue
              );
            } else {
              this.$message.error(res.data.mess);
            }
          },
          (rej) => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
        this.$forceUpdate();
      }
      // if(this.mapInfo)
      // console.log(this.mapInfo);
    },
    //添加人员打开弹窗
    addNewOpenFun(type) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10002001") != -1
      ) {
        //判断新增还是编辑
        // console.log(type);
        this.newType = type;
        // console.log(this.mapInfo.newType);
        this.dialogVisible = true;
        this.mapInfo = [];
        this.mapFun();
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //新增人员
    addNew(state) {
      this.mapInfo = [];
      // console.log(123);
      this.outerVisible = true;

      this.state = state;
    },
    addTrue() {
      let long_lat;
      let long_latbai;
      let ftelephone;

      addLegalFireMan(
        this.state,
        this.mapInfo.addUser,
        this.utils.userName,
        this.mapInfo.addPhone,
        this.mapInfo.addReamrk,
        long_lat,
        long_latbai,
        ftelephone
      ).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("添加成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (rej) => {
          this.$message.error("添加失败");
        }
      );
    },

    //搜索功能
    filter_method(query) {
      if (/^\d{4,11}$/.test(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      } else if (isNaN(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
      this.$forceUpdate();
    },
    //网格员搜索
    filter_method_WangGe(query) {
      if (/^\d{4,11}$/.test(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      } else if (isNaN(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    //防火员搜索
    filter_method_FangHuo(query) {
      if (/^\d{4,11}$/.test(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      } else if (isNaN(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    //责任人搜索
    filter_method_ZeRen(query) {
      if (/^\d{4,11}$/.test(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      } else if (isNaN(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    //街道搜索
    filter_method_JieDao(query) {
      if (/^\d{4,11}$/.test(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      } else if (isNaN(query)) {
        if (query !== "") {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            this.options = this.optionsCopy.filter((item) => {
              return (
                item.user_name.toLowerCase().indexOf(query.toLowerCase()) >
                  -1 ||
                item.phone.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    //删除项目
    open(pid, name) {
      const powerId = sessionStorage.getItem("new_role");
      const rid = sessionStorage.getItem("power");
      if (powerId == 1000 || rid.indexOf("10002003") != -1) {
        this.$confirm(
          `此操作将永久删除 <span style='color:red'>${name}</span> 项目, 是否继续?`,

          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning",
          }
        )
          .then(() => {
            deleProject(pid, this.utils.userName).then((res) => {
              if (res.data.list[0].status == "true") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAllProjecForStateFun(
                  this.handleSizeChangeValue,
                  this.handleCurrentChangeValue
                );
              } else {
                this.$message.error(res.data.list[0].mess);
              }
            });
          })
          .catch((err) => {
            console.log(err);
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
    setq(value, name) {
      // String(value);
      console.log(value, name);
      let obj = {};
      obj = this.options.find((item) => {
        // console.log(item);
        return item.pid == value;
      });
      if (name == "责任人") {
        this.mapInfo.zeRenRen = obj.user_name;
        this.mapInfo.zeRenRenPhone = obj.phone;
        this.mapInfo.shebei = value;
        this.mapInfo.shebeilist = `${obj.user_name},${obj.phone}`;
      }
      if (name == "防火员") {
        this.mapInfo.fangHuoYuan = obj.user_name;
        this.mapInfo.fangHuoYuanPhone = obj.phone;
        this.mapInfo.huilu = value;
        this.mapInfo.huilulist = `${obj.user_name},${obj.phone}`;
      }
      if (name == "街道") {
        this.mapInfo.jieDao = obj.user_name;
        this.mapInfo.jieDaoPhone = obj.phone;
        this.mapInfo.xintiao = value;
        this.mapInfo.xintiaolist = `${obj.user_name},${obj.phone}`;
      }
      if (name == "网格员") {
        this.mapInfo.wangGeYuan = obj.user_name;
        this.mapInfo.wangGeYuanPhone = obj.phone;
        this.mapInfo.zhuche = value;
        this.mapInfo.zhuchelist = `${obj.user_name},${obj.phone}`;
      }

      // let getName = "";
      // getName = obj.locationName;
      // this.mapInfo
      console.log(obj.user_name + "," + obj.phone);
      // this.mapInfo.huilu = obj.user_name + "," + obj.phone;
      this.$forceUpdate();
    },

    //获取人员信息
    inputClick(name) {
      let status;
      let obj = "";
      this.options = [];
      if (name == "防火员") {
        status = 0;
      }
      if (name == "责任人") {
        status = 1;
      }
      if (name == "街道") {
        status = 3;
      }
      if (name == "网格员") {
        status = 2;
      }
      if (name == "防火员责任人") {
        obj = this.mapInfo.delet;
      }
      // console.log(event);
      getLegalFireMan(status, obj).then((res) => {
        // console.log(res.data.mess);

        let arr = res.data.list[0].mess;

        arr.map((element) => {
          String(element.pid);
        });

        this.optionsCopy = arr;

        this.options = arr.slice(0, 250);
      });
    },
    // 编辑弹窗点击函数
    bj_map(data, row) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10002001") != -1
      ) {
        this.dialogVisible = true;
        this.addNewOpenFun("编辑");
        console.log(row);
        this.mapInfo.projectname = row.name;
        // this.mapInfo.name = "123";
        this.mapInfo.pid = row.pid;
        this.mapInfo.type = row.dSName;
        // this.mapInfo.huilu = row.fireman + row.firemanPhone;
        this.mapInfo.shebeilist = row.legalman + row.legalmanPhone;
        this.mapInfo.zhuche = row.regdate;
        // this.mapInfo.address = row.location;
        this.mapInfo.xintiao = row.heartbeatTime;
        this.mapInfo.changshan = row.dVName;
        this.mapInfo.remak = row.remark;
        this.devID = data;
        // this.mapInfo.zeRenRen = row;
        // this.mapInfo.huilu = row.fireman;
        this.mapInfo.huilulist = row.fireman + "," + row.firemanPhone;
        this.mapInfo.xintiaolist = row.street_chargenanem + row.street_charge;
        this.mapInfo.zhuchelist = row.gridmanname + row.gridman;
        this.mapInfo.zeRenRen = row.legalman;
        this.mapInfo.zeRenRenPhone = row.legalmanPhone;
        this.mapInfo.wangGeYuan = row.gridmanname;
        this.mapInfo.wangGeYuanPhone = row.gridman;
        this.mapInfo.jieDao = row.street_chargenanem;
        this.mapInfo.jieDaoPhone = row.street_charge;
        this.lanlat = row.lat;
        this.mapInfo.address = row.location;
        this.mapFun();
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    mapFun() {
      this.$nextTick(() => {
        this.map = new AMap.Map("container", {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10,
          mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
        });
        this.map = new AMap.Map("container2", {
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
          this.mapInfo.lnglat = this.lanlat;
          this.mapInfo.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;
        });
      });
    },
    select(e) {
      console.log(e);
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
      this.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
      this.mapInfo.lnglat = this.lanlat;
      this.mapInfo.address =
        e.poi.district + "" + e.poi.address + "" + e.poi.name;

      regionList(e.poi.adcode).then((res) => {
        console.log(res);
        this.regionList_list = res.data.mess;
      });
    },
    //分页器函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getAllProjecForStateFun(val, this.handleCurrentChangeValue);
      console.log(this.handleCurrentChangeValue);
      this.handleSizeChangeValue = val;
    },
    //分页器函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.handleCurrentChangeValue = val;
      this.getAllProjecForStateFun(this.handleSizeChangeValue, val);
    },

    //展示数据方法接口
    getAllProjecForStateFun(ls, cp) {
      let col = "";
      let kw = "";
      let state = 0;
      // let ls = 10;
      // let cp = 1;
      getAllProjecForState(
        this.utils.userName,
        cp,
        col,
        state,
        kw,
        ls,
        this.formInline.user
      ).then((res) => {
        this.getAllProjecForState_list = res.data.list[0].allObj;
        console.log(this.getAllProjecForState_list);
        this.total = res.data.list[0].count;
      });
    },
    // 新增设备
    newClick(pid, row) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10002001") != -1
      ) {
        this.addNewSheBeiVisible = true;
        this.mapFun();
        this.addPid = pid;
        this.mapInfo = {};
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //新增设备确定按钮
    addNewSheBeiTrue() {
      let superiorEquipme = "";
      let loopNumber = "";
      let devId = "";
      let devRemark = "";
      // let sms = "0";
      if (
        this.lanlat == undefined ||
        this.lanlat == null ||
        this.lanlat == ""
      ) {
        return this.$message.error("无法获取您的项目经纬度,请重新输入");
      }
      // console.log(this.lanlat, 999999);

      addDevice(
        this.addPid,
        this.mapInfo.bianhao, //设备编号
        this.utils.userName,
        this.mapInfo.address, //安装地址
        this.mapInfo.lnglat, //经纬度
        this.shebeiListValue, //设备类型
        this.mapInfo.name, //设备名称
        this.mapInfo.changsuo, //应用场所
        superiorEquipme,
        loopNumber,
        devId,
        devRemark,
        this.mapInfo.duanxin //短信推送
      ).then(
        (res) => {
          if (res.data.list[0].status == "true") {
            this.$message.success("添加设备成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (rej) => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
  },
};
</script>
<style lang='less' scoped>
#xiangmuguanli {
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
  #container2 {
    height: 300px;
  }
}
</style>