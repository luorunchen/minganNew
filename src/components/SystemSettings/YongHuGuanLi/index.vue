<template>
  <div id="YongHuGuanLi">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="姓名:">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="负责人:">
        <el-input v-model="formInline.user" placeholder="负责人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- <el-button type="primary" @click="onSubmit">新增</el-button> -->
        <el-button type="primary" @click="addNew">新增 </el-button>
      </el-form-item>
    </el-form>
    <div class="tabs">
      <el-table
        :data="gridSource_list"
        height="650px"
        border
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="userName" label="姓名"> </el-table-column>
        <el-table-column prop="company_phone" label="固定电话">
        </el-table-column>
        <el-table-column prop="address" label="公司地址"> </el-table-column>
        <el-table-column prop="company" label="公司名称(所属单位)">
        </el-table-column>
        <el-table-column prop="mobile" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="手机号码"> </el-table-column>
        <el-table-column prop="new_role" label="角色">
          <template slot-scope="scope">
            <p
              v-if="
                scope.row.new_role == '36d4264f-ce5c-4b2c-9882-c4d5beb5d7f1'
              "
            >
              增删改查
            </p>
            <p v-if="scope.row.new_role == '1000'">超级管理员</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="childMethod(scope.row)">编辑</span>
              <!-- <span>禁用</span>
              <span>删除</span> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 用户管理新增弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <template>
        <el-form label-width="200px" class="demo-ruleForm" :inline="true">
          <el-form-item label="账号(必填)">
            <el-input v-model="addPrope.username"></el-input>
          </el-form-item>

          <el-form-item label="密码(必填)">
            <el-input v-model="addPrope.password"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input v-model="addPrope.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="addPrope.name"></el-input>
          </el-form-item>

          <el-form-item label="地址">
            <el-input v-model="addPrope.address"></el-input>
          </el-form-item>
          <el-form-item label="公司名称(所属单位)">
            <el-input v-model="addPrope.danwei"></el-input>
          </el-form-item>
          <el-form-item label="固定电话">
            <el-input v-model="addPrope.gudingphone"></el-input>
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="addPrope.type" placeholder="请选择">
              <el-option
                v-for="item in powerList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="邮箱" prop="region">
            <el-input v-model="addPrope.mobile"></el-input>
          </el-form-item>
          <el-form-item label="下级单位可选择使用角色" prop="type_down">
            <el-select v-model="addPrope.type_down" placeholder="请选择">
              <el-option
                v-for="item in powerList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogVisible_bianji" width="50%">
      <template>
        <el-form
          :model="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码" prop="region">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item> -->

          <el-form-item label="手机号码" prop="delivery">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <!-- <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item> -->
          <el-form-item label="单位地址" prop="region">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="name">
            <el-input v-model="ruleForm.gudingphone"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="region">
            <el-input v-model="ruleForm.danwei"></el-input> </el-form-item
          ><el-form-item label="选择角色">
            <!-- <strong v-for="(item, index) in powerList" :key="index">
              <el-radio v-model="ruleForm.type" :label="item.id">{{
                item.name
              }}</el-radio>
            </strong> -->

            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in powerList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="region">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="下级单位可选择使用角色" prop="type_down">
            <el-select v-model="ruleForm.type_down" placeholder="请选择">
              <el-option
                v-for="item in powerList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_bianji = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  gridSource,
  getPowerOther,
  updateUser,
  addUserRole,
} from "@/api/index.js";
export default {
  props: ["size", "current"],
  data() {
    return {
      formInline: {
        name: "",
        user: "",
        phone: "",
      },
      ruleForm: {
        name: "",
        password: "",
        phone: "",
        username: "",
        address: "",
        gudingphone: "",
        type: "",
        danwei: "",
        type_down: "",
        mobile: "",
      },
      addPrope: {
        name: "",
        password: "",
        phone: "",
        username: "",
        address: "",
        gudingphone: "",
        type: "",
        danwei: "",
        type_down: "",
        mobile: "",
      },
      powerList: [],
      dialogVisible_bianji: false,
      dialogVisible: false,
      gridSource_list: [],
    };
  },
  methods: {
    addNew() {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10001003") != -1
      ) {
        this.dialogVisible = true;
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    onSubmit() {
      this.action(1, 10);
    },
    // 新增用户函数
    submitForm() {
      let role = sessionStorage.getItem("role");
      // if(this.addPrope.username)
      const reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(this.addPrope.username) && this.addPrope.username == "") {
        return this.$message.error("账号必须为数字且不为空");
      }
      if (this.addPrope.password == "") {
        return this.$message.error("密码不能为空");
      }

      // console.log(this.addPrope.name, "我是log");
      if (this.addPrope.name == "") {
        this.addPrope.name = this.addPrope.username;
      }

      if (this.addPrope.phone == "") {
        this.addPrope.phone = this.addPrope.username;
      }
      if (this.addPrope.address == "") {
        this.addPrope.address = this.addPrope.username;
      }
      if (this.addPrope.gudingphone == "") {
        this.addPrope.gudingphone = this.addPrope.username;
      }
      if (this.addPrope.danwei == "") {
        this.addPrope.danwei = this.addPrope.username;
      }

      addUserRole(
        this.addPrope.username,
        this.addPrope.password,
        this.addPrope.name,
        this.addPrope.phone,
        this.addPrope.address,

        this.addPrope.gudingphone,
        this.addPrope.danwei,
        this.addPrope.mobile,
        role,
        this.addPrope.type,
        this.addPrope.type_down
      ).then(
        (res) => {
          if (res.data.list[0].status == true) {
            this.$message.success("新增成功");
          } else {
            this.$message.error(res.data.list[0].mess);
          }
        },
        (err) => {
          console.log(err);
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    childMethod(data) {
      if (
        this.utils.powerId == 1000 ||
        this.utils.rid.indexOf("10001002") != -1
      ) {
        this.dialogVisible_bianji = true;
        // console.log(data);
        this.ruleForm.name = data.userName;
        this.ruleForm.gudingphone = data.company_phone;
        this.ruleForm.address = data.address;
        this.ruleForm.danwei = data.company;
        this.ruleForm.mobile = data.mobile;
        this.ruleForm.phone = data.phone;
      } else {
        return this.$message({
          showClose: true,
          message: "暂无权限，请向上级申请",
          type: "error",
        });
      }
    },
    // 编辑用户弹窗
    edit() {
      this.dialogVisible_bianji = false;
      updateUser(
        this.ruleForm.phone,
        this.ruleForm.name,
        this.ruleForm.address,
        this.ruleForm.phone,
        this.ruleForm.gudingphone,
        this.ruleForm.danwei,
        this.ruleForm.mobile,
        this.ruleForm.type,
        this.ruleForm.type_down
      ).then(
        (res) => {
          // console.log(res.data.list[0].status);
          if (res.data.list[0].status == true) {
            this.$message.success("编辑成功");
            this.action(this.current, this.size);
          } else {
            this.$message.error("编辑失败");
          }
        },
        () => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    action(current, size) {
      const obj =
        this.formInline.user || this.formInline.phone || this.formInline.name;
      gridSource(this.utils.userName, current, size, obj).then((res) => {
        this.gridSource_list = res.data.role;
        // this.$emit("gridSource", this.gridSource_list);
        this.$emit("total", res.data.total);
      });
      const role = sessionStorage.getItem("role");
      getPowerOther(this.utils.userName, role, "").then((res) => {
        this.powerList = res.data;
        // console.log(res.data);
      });
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
  },
  mounted() {
    this.action(1, 10);
  },
};
</script>
<style lang='less' scoped>
#YongHuGuanLi {
  .caozuo {
    span {
      color: blue;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>