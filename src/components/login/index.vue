<template>
  <div id="app">
    <div class="title">
      <img class="titleIMG" src="../../assets/images/juxing4.png" alt="" />
    </div>
    <div class="titleFZ">智慧安全系统平台</div>
    <div class="loginIMGLeft">
      <img
        src="@/assets/images/fengmian.png"
        width="100%"
        height="100%"
        alt=""
      />
    </div>
    <div class="loginImg">
      <img
        src="@/assets/images/juxing5.png"
        width="100%"
        height="100%"
        alt=""
      />

      <div class="formLI">
        <p>欢迎登录</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="pass">
            <el-input
              placeholder="请输入登录ID"
              prefix-icon="el-icon-user"
              v-model="ruleForm.pass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              placeholder="请输入登录密码"
              prefix-icon="el-icon-goods"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      // alert("22");

      // let username = JSON.parse(this.ruleForm.pass);
      // let password = JSON.parse(this.ruleForm.checkPass);
      let username = this.ruleForm.pass;
      let password = this.ruleForm.checkPass;

      login(username, password).then((res) => {
        console.log(res);
        if (res.data.status === true) {
          var role = res.data.role[0]; //权限
          this.utils.userName = username;
          if (res.data.region == "null" || res.data.region == null) {
            res.data.region = "";
          }

          sessionStorage.setItem("userName", username);
          sessionStorage.setItem("role", res.data.role[0]);
          sessionStorage.setItem("new_role", res.data.new_role);
          sessionStorage.setItem("region", res.data.region);
          sessionStorage.setItem("power", res.data.power);
          this.utils.powerId = res.data.new_role;
          this.utils.rid = res.data.power;
          this.$router.push({ path: "/" });
          return this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
          });
        } else {
          return this.$message({
            showClose: true,
            message: "账号或密码不正确",
            type: "error",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // mounted() {
  //   this.$message.warning("您还未登录");
  // },
};
</script>

<style lang='less' scoped>
#app {
  // width: 1920px;
  height: calc(100vh);
  background: rgb(3, 5, 66);
  .title {
    transform: translateX(-50%);
    margin: 0 auto;
    width: 240px;
    // height: 34px;
  }
  .titleFZ {
    font-size: 30px;
    color: #fff;
    /* margin: 0 auto; */
    text-align: center;
    position: relative;
    /* margin: -26px; */
    top: -60px;
  }
  .loginIMGLeft {
    top: 20%;
    left: 20%;
    width: 500px;
    height: 500px;
    position: absolute;
  }
  .loginImg {
    width: 440px;
    height: 400px;
    position: relative;
    /* bottom: 53%; */
    margin-top: 130px;
    left: 59%;
    p {
      color: #fff;
      /* margin: 0 auto; */
      text-align: center;
      margin: -51px 0 20px 85px;

      font-size: 30px;
    }
    .formLI {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 25%;
      left: -11%;
      /deep/.el-button--primary {
        width: 100%;
      }
      /deep/.el-input__inner {
        background: rgb(9, 58, 114);
        color: #fff;
        border: 1px solid #0ba1f8;
      }
    }
  }
}
</style>