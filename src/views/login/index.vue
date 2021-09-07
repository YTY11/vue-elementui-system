<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <h1>登录</h1>
      <el-form-item prop="userName">
        <el-input
          prefix-icon="el-icon-user-solid"
          type="text"
          v-model="ruleForm.userName"
          autocomplete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPass">
        <el-input
        prefix-icon="el-icon-unlock"
          :type='type'
          v-model="ruleForm.userPass"
          autocomplete="off"
          placeholder="密码"
          @keyup.native.enter="submitForm('ruleForm')"
      
        >
       <svg-icon @click="clickEye" slot="suffix" :icon-class="type=='password' ? 'eye2' : 'eye' "></svg-icon>
        </el-input>
         
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    //校验输入数据是否为空
    var userName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var userPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        userPass: "",
      },
      rules: {
        userName: [{ validator: userName, trigger: "blur" }],
        userPass: [{ validator: userPass, trigger: "blur" }],
      },
      type:'password'
    };
  },
  methods: {
    //登录方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm);
        if (valid) {
          this.$store.dispatch('login',this.ruleForm).then(resolve=>{
            this.$router.push(resolve)
          },err=>{
            console.log(err);
          })
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //密码显示方法
    clickEye(){
      if(this.type == 'password'){
        this.type = 'text'
        return  this.type
      }
      else{
        this.type = 'password'
        return this.type
      }
       
    }
  },
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$fontColor: #fff;

.login {
  background: $bg;
  min-height: 100vh;
  width: 100vw;
  color: $fontColor;
  .demo-ruleForm {
    text-align: center;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
    box-sizing: border-box;
    input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #E8E8E8;
      height: 50px;
    }
  }
  
}
</style>