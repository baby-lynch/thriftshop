<template>
    <div class="register-container">
      <div class="register-box">
         <div class="logo">
           <img src="../assets/images/logoround.png">
           <h1 class="greeting">用 户 注 册</h1>
         </div>
        <div class="register-dialog">
         <el-form status-icon  ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
           <el-form-item prop="username">
             <el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="registerForm.username" ></el-input>
           </el-form-item>
           <el-form-item prop="pass">
             <el-input  prefix-icon="el-icon-lock"  placeholder="输入密码" v-model="registerForm.pass" type="password" autocomplete="off" show-password></el-input>
           </el-form-item>
           <el-form-item prop="checkPass">
             <el-input prefix-icon="el-icon-key" placeholder="确认密码" v-model="registerForm.checkPass" type="password" autocomplete="off" show-password></el-input>
           </el-form-item>
           <el-form-item prop="phone">
             <el-input prefix-icon="el-icon-phone" placeholder="电话" v-model="registerForm.phone"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button class="register-btn" type="primary" @click="submitRegisterInfo">立即注册</el-button>
            </el-form-item>
            <el-form-item>
              <router-link :to="{ name: 'login'}" ><el-button type="text">返回登录</el-button></router-link>
            </el-form-item>
         </el-form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'))
      }
    }
    return {
      registerForm: {
        username: '',
        pass: '',
        checkPass: '',
        phone: ''
      },
      registerFormRules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
      // registerInfo: {
      //   username: this.registerForm,
      //   password: this.registerForm.checkPass,
      //   phone: this.registerForm.phone
      // }
    }
  },
  methods: {
    async submitRegisterInfo () {
      const { data: res } = await this.$http.post('UserCreate/', {
        username: this.registerForm.username,
        password: this.registerForm.checkPass,
        mobile: this.registerForm.phone
      })
      this.$message.success('注册成功！')
      return this.$router.push('/login')
      // console.log(res)
    }
  }
}
</script>

<style scoped>
.register-container{
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color:rgb(245,245,245);
}
.register-box{
  display: inline-block;
  position: relative;
  top:40px;
  margin: auto;
  width: 430px;
  border-radius: 15px;
  background-color:rgb(255, 255, 255);
  box-shadow: 1px 1px 20px #888888;
  text-align: center;
}
.logo{
  margin-top: 20px;
}
.greeting{
  margin: 0;
  font-size: 50px;
  font-family: "黑体";
  font-weight: 100;
  color: #333333;
}
.register-dialog{
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
}
.register-btn{
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
