<template>
  <div id="SheBeiAnZhuangQueRen">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="事件状态">
        <el-radio-group
          v-model="tabPosition"
          style="margin-right: 30px"
          size="mini"
          mini
        >
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="已确认">已确认</el-radio-button>
          <el-radio-button label="未确认">未确认</el-radio-button>
        </el-radio-group>
      </el-form-item>

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
      <el-table :data="tableData" style="width: 100%" height="650px">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="devno" label="订单编号"> </el-table-column>
        <el-table-column prop="install_time" label="安装时间">
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state == "0" ? "未确认" : "已确认" }}
          </template>
        </el-table-column>
        <el-table-column prop="confirm_time" label="确认时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <span
              style="color: blue"
              @click="seeState(scope.row.image, scope.row.state)"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="安装图片确认" :visible.sync="dialogVisible" width="30%">
      <img :src="images" alt="" />
      <p>{{ state == "0" ? "未确认" : "确认安装完成" }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceInstall } from "@/api/index.js";
export default {
  data() {
    return {
      currentPage4: 1,
      formInline: {
        user: "",
        region: "",
      },
      dialogVisible: false,
      tableData: [],
      tabPosition: "全部",
      images: "",
      state: "",
      total: 1,
    };
  },
  mounted() {
    this.getDeviceInstallFun(1, "", "");
  },
  watch: {
    tabPosition(val) {
      console.log(val);
      if (val == "全部") {
        this.getDeviceInstallFun("", "");
      } else if (val == "已确认") {
        this.getDeviceInstallFun(1, "", "1");
      } else {
        this.getDeviceInstallFun(1, "", "0");
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let state;
      if (this.tabPosition == "全部") {
        state = "";
      } else if (val == "已确认") {
        state = "1";
      } else {
        state = "0";
      }
      this.getDeviceInstallFun(1, "", state);
    },
    onSubmit() {
      let state;
      if (this.tabPosition == "全部") {
        state = "";
      } else if (val == "已确认") {
        state = "1";
      } else {
        state = "0";
      }
      this.getDeviceInstallFun(1, this.formInline.user, state);
    },
    seeState(img, state) {
      this.dialogVisible = true;
      this.state = state;
      this.images = ` http://fire.zhihuiwulian.net.cn/devPic/AZPic/${img}`;
    },
    getDeviceInstallFun(size, search, state) {
      getDeviceInstall(this.utils.userName, size, 10, search, state).then(
        (res) => {
          console.log(res.data);
          if (res.data.data.length > 0) {
            this.tableData = res.data.data;
            this.total = res.data.recordCount;
          } else {
            this.$message({
              showClose: true,
              message: "暂无信息",
              type: "warning",
            });
          }
        }
      );
    },
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__body {
  text-align: center;
  img {
    width: 260px;
    height: 260px;
  }
}

.block {
  position: absolute;
  right: 30px;
}
</style>