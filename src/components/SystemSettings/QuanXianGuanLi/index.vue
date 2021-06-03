<template>
  <div id="QuanXianGuanLi">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="角色名称">
        <el-input v-model="formInline.user" placeholder="角色名称"></el-input>
      </el-form-item>
      <!-- 
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="状态">
          <el-option label="启用" value="shanghai"></el-option>
          <el-option label="禁用" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- <el-button type="primary" @click="onSubmit">新增</el-button> -->
        <el-button type="primary" @click="addNewPower">新增 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      border
      height="650px"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="name" label="角色名称"> </el-table-column>
      <el-table-column property="name" label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.staut == 0">启用</p>
          <p v-else>禁用</p>
        </template>
      </el-table-column>
      <el-table-column property="crDate" label="创建时间" sortable>
      </el-table-column>
      <el-table-column property="upDate" label="修改时间" sortable>
      </el-table-column>
      <el-table-column property="address" label="操作">
        <template slot-scope="scope">
          <div class="caozuo">
            <span @click="editPowerFun(scope.row)">编辑</span>
            <!-- <span v-if="scope.row.staut != 0">启用</span> -->
            <span @click="delPowerFun(scope.row.id, scope.row.name)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="addNewUser" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="区域权限">
          <el-cascader :props="props"></el-cascader>
        </el-form-item>
      </el-form>
      <h3 style="margin-bottom: 20px">模块选择</h3>
      <!-- 用户管理 -->
      <div class="model">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          ><h3>用户管理</h3></el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="(city, index) in cityOptions"
            :label="city.value"
            :key="index"
            >{{ city.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <!-- 项目管理 -->
      <div class="model">
        <el-checkbox
          :indeterminate="isIndeterminate1"
          @change="handleCheckAllChange1"
          v-model="XMAll"
          ><h3>项目管理</h3></el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          @change="handleCheckedCitiesChange1"
          v-model="checkedCities1"
        >
          <el-checkbox
            v-for="(city, index) in XMOptions"
            :label="city.value"
            :key="index"
            >{{ city.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <!-- 设备管理 -->
      <div class="model">
        <el-checkbox
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange2"
          v-model="sbkAll"
        >
          <h3>设备管理</h3>
        </el-checkbox>
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          @change="handleCheckedCitiesChange2"
          v-model="checkedCities2"
        >
          <el-checkbox
            v-for="(city, index) in SbOptions"
            :label="city.value"
            :key="index"
            >{{ city.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <!-- 权限管理 -->
      <div class="model">
        <el-checkbox
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange3"
          v-model="QXkAll"
        >
          <h3>权限管理</h3>
        </el-checkbox>
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          @change="handleCheckedCitiesChange3"
          v-model="checkedCities3"
        >
          <el-checkbox
            v-for="(city, index) in QXOptions"
            :label="city.value"
            :key="index"
            >{{ city.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogVisible = false), addNewTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  pushRole_infos,
  getRegon,
  givePowerRole,
  delPower,
  editPower,
} from "@/api/index.js";

export default {
  data() {
    return {
      title: "新增",
      addNewUser: "",
      formInline: {
        region: "",
        user: "",
      },
      region: "",
      props: {},
      dialogVisible: false,
      tableData: [],
      checkAll: false,
      QXkAll: false,
      sbkAll: false,
      XMAll: false,
      checkedCities: [],
      checkedCities1: [],
      checkedCities2: [],
      checkedCities3: [],

      // cityCities: [],
      // QXCities: [],
      // SBCities: [],
      // XMCities: [],
      cityOptions: [
        { name: "用户密码管理", value: 10001001 },
        { name: "用户修改", value: 10001002 },
        { name: "用户新增", value: 10001003 },
        { name: "用户删除", value: 10001004 },
      ],

      QXOptions: [
        { name: "角色权限查看", value: 10004001 },
        { name: "角色编辑", value: 10004002 },
        { name: "角色删除", value: 10004003 },
        { name: "角色新增", value: 10004004 },
      ],
      SbOptions: [
        { name: "设备消音", value: 10003001 },
        { name: "设备复位", value: 10003002 },
        { name: "设备断电", value: 10003003 },
        { name: "设备远程停电", value: 10003004 },
        { name: "设备修改", value: 10003005 },
        { name: "设备删除", value: 10003007 },
        { name: "设备新增", value: 10003006 },
      ],
      XMOptions: [
        { name: "项目新增", value: 10002001 },
        { name: "项目修改", value: 10002002 },
        { name: "项目删除", value: 10002003 },
        { name: "项目导入", value: 10002004 },
        { name: "app开通和关闭", value: 10002005 },
        { name: "项目分享", value: 10002007 },
        { name: "平台登录允许和关闭", value: 10002006 },
      ],
      isIndeterminate: true,
      isIndeterminate1: true,
    };
  },
  mounted() {
    this.action(1, 15);
    this.getRegonFun();
  },
  methods: {
    addNewPower() {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10004004") != -1
      ) {
        this.dialogVisible = true;
        // this.getRegonFun();
        this.title = "新增";
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //编辑按钮
    editPowerFun(data) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10004002") != -1
      ) {
        this.title = "编辑";

        this.dialogVisible = true;
        this.addNewUser = data.name;
        this.edit = data;
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    //删除按钮
    delPowerFun(id, name) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10004003") != -1
      ) {
        this.$confirm(
          `此操作将永久删除 <span style="color:red">${name}</span> , 是否继续?`,
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning",
          }
        )
          .then(() => {
            delPower(this.utils.userName, id, "only").then(
              (res) => {
                if (res.data.code == 200) {
                  this.$message.success("删除成功");
                  this.action(1, 15);
                } else {
                  this.$message.error("删除失败");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
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

    //新增/编辑确定按钮
    addNewTrue() {
      const p_id =
        this.checkedCities +
        (this.checkedCities.length <= 0 ? "" : ",") +
        this.checkedCities1 +
        (this.checkedCities1.length <= 0 ? "" : ",") +
        this.checkedCities2 +
        (this.checkedCities2.length <= 0 ? "" : ",") +
        this.checkedCities3;
      if (this.title == "新增") {
        givePowerRole(
          this.addNewUser,
          this.utils.userName,
          p_id,
          this.region
        ).then(
          (res) => {
            if (res.data.code == 200) {
              this.$message.success("添加成功");
              this.action(1, 15);
            } else {
              this.$message.error("添加失败");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      } else {
        const data = this.edit;
        editPower(
          data.id,
          data.name,
          p_id,
          this.utils.userName,
          this.region
        ).then(
          (res) => {
            if (res.data.code == 200) {
              this.$message.success("编辑成功");
              this.action(1, 15);
            } else {
              this.$message.error("编辑失败");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
    },
    //用户管理函数
    handleCheckAllChange(val) {
      let arr = [];
      this.cityOptions.forEach((element) => {
        arr.push(element.value);
      });
      this.checkedCities = val ? arr : [];

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      this.checkAll = value.length === this.cityOptions.length;
      console.log(this.checkAll);
    },
    //项目管理函数
    handleCheckAllChange1(val) {
      let arr = [];
      this.XMOptions.forEach((element) => {
        arr.push(element.value);
      });
      this.checkedCities1 = val ? arr : [];

      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      this.XMAll = value.length === this.XMOptions.length;
    },
    //设备管理函数
    handleCheckAllChange2(val) {
      let arr = [];
      this.SbOptions.forEach((element) => {
        arr.push(element.value);
      });
      this.checkedCities2 = val ? arr : [];

      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange2(value) {
      this.SbkAll = value.length === this.SbOptions.length;
    },
    //设备管理函数
    handleCheckAllChange3(val) {
      let arr = [];
      this.QXOptions.forEach((element) => {
        arr.push(element.value);
      });
      this.checkedCities3 = val ? arr : [];

      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange3(value) {
      this.QXkAll = value.length === this.QXOptions.length;
    },
    getRegonFun() {
      let _that = this;
      getRegon(this.utils.userName, "", "province").then((res) => {
        this.props = {
          lazy: true,
          // checkStrictly: true,
          lazyLoad(node, resolve) {
            // console.log(node, resolve);
            const { level } = node;
            // let getRegonList;
            // console.log(level);
            if (level == 0) {
              getRegon(_that.utils.userName, "", "province").then((res) => {
                // getRegonList = res.data;
                const getRegonList = res.data.map((item) => ({
                  value: item.ad_Code,
                  label: item.ad_Region,
                  // leaf: level >= 2,
                }));
                resolve(getRegonList);
              });
            } else {
              // console.log(node.value);
              let type;
              switch (level) {
                case 1:
                  type = "city";
                  break;
                case 2:
                  type = "area";
                  break;
                case 3:
                  type = "street";
                  break;
                case 4:
                  type = "community";
                  break;
              }

              getRegon(_that.utils.userName, node.value, type).then((res) => {
                _that.region = node.value;
                // console.log(this.region);
                if (res.data.length == 0 && level <= 4) {
                  return _that.$message.error("此地区暂无下级数据");
                }

                const getRegonList = res.data.map((item) => ({
                  value: item.ad_Code,
                  label: item.ad_Region,
                  leaf: level >= 4,
                }));
                resolve(getRegonList);
              });
            }
          },
        };
      });
    },
    onSubmit() {
      this.action(1, 15);
    },
    action(current, size) {
      pushRole_infos(
        this.utils.userName,
        this.formInline.user,
        current,
        size
      ).then((res) => {
        this.tableData = res.data.data;
        this.$emit("total", res.data.recordCount);
      });
    },
  },
};
</script>
<style lang='less' scoped>
#QuanXianGuanLi {
  .caozuo {
    span {
      cursor: pointer;
      color: blue;
      margin-right: 5px;
    }
  }
  .model {
    // margin: 0;
    margin-bottom: 30px;
  }
}
</style>