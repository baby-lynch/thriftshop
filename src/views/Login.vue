<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/images/logoround.png">
        <h1 class="greeting">欢 迎 登 陆</h1>
      </div>
      <div class="login-dialog">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input  prefix-icon="el-icon-lock" placeholder="密码" @keydown.enter.native="login" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item>
            <el-button class="reset-btn" type="info" @click="resetLoginForm">重置</el-button>
            <el-button class="login-btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
          <div class="register-panel">
            <div class="register-question">没有账号？  请点击    <a href="#">立即注册</a> </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="footer">Developed by 软件工程第10小组</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'SWN',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    clearCookie () {
      var date = new Date()
      date.setTime(date.getTime())
      var keys = document.cookie.match(/[^ =;]+(?=)/g)
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie = keys[i] + '=0; expires=' + date.toGMTString() + '; path=/'
        }
      }
    },
    login () {
      this.clearCookie()
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('用户名或密码不能为空！')
        } else {
          // const { data: res } = await this.$http.post('login', this.loginForm)
          // if (res.meta.status !== 200) {
          // return this.$message.error('用户名或密码错误！')
          // this.$message.success('登陆成功！')
          // return this.$router.push('/shop')
          // } else {
          //   console.log(res)
          // }
          const { data: res } = await this.$http.post('/login', this.loginForm)
          if (res.valid) {
            document.cookie = res.reqUser.username + '=' + res.reqUser.id
            this.$message.success('登陆成功！')
            return this.$router.push('/shop')
          } else {
            return this.$message.error('用户名或密码错误！')
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container{
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color:rgb(245,245,245);
}
.login-box{
  display: inline-block;
  position: relative;
  top:80px;
  margin: auto;
  height: 500px;
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
.login-dialog{
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
}
.login-btn{
  float:right;
}
.reset-btn{
  float:left;
}
.register-panel{
  float: right;
}
.register-question{
  display:inline;
  font-size: 13px;
  font-family:Arial, Helvetica, sans-serif;
  color:#434d55;
}
.register-question a{
  display:inline;
  color: #2d8cf0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color .2s ease;
  display: inline;
  font-size: 13px;
}
.footer{
  position: fixed;
  width: 100%;
  bottom: 50px;
  height: 20px;
  text-align: center;
  font-family:Arial, Helvetica, sans-serif;
  font-size: 13px;
  color:#434d55;
}
</style>
