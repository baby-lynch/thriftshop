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
          <el-form-item prop="account">
            <el-input prefix-icon="el-icon-user-solid" placeholder="账 号" v-model="loginForm.account"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input  prefix-icon="el-icon-lock" placeholder="密 码" @keydown.enter.native="login" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login">登 录</el-button>
          </el-form-item>
          <div class="register-panel">
            <div class="register-question">没有账号？ 请点击 <router-link :to="{path:'/register'}"><a>立即注册</a></router-link> </div>
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
        account: '',
        password: ''
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
          this.$message.error('账号或密码不能为空！')
        } else {
          const { data: res } = await this.$http.get('/LoginInfo', {
            params: {
              account: this.loginForm.account,
              password: this.loginForm.password
            }
          })
          console.log(res)
          if (res.account === this.loginForm.account) {
            document.cookie = res.username + '=' + res.id
            this.$message.success('登陆成功！')
            return this.$router.push('/shop')
          } else {
            return this.$message.error('账号或密码错误！')
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
  width:100%;
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
