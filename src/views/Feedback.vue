<template>
  <div class="feedback-container">
    <div class="feedback-box">
      <div class="checker">
        <img src="../static/check.png">
        <h1 class="greeting">注 册 成 功</h1>
      </div>
      <div class="feedback-msg">
        <span style="font-family:'等线(中文正文)' ">您的账号为： <h4 style="display: inline"> {{account}}</h4></span>
        <p style="margin-top:10px; font-family:'等线(中文正文)' ">请使用该账号登录平台</p>
      </div>
      <el-form>
        <el-form-item>
          <router-link :to="{ name: 'login'}" ><el-button type="primary" plain>返回登录</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '10007'
    }
  },
  methods: {
    getAccount () {
      this.account = this.$route.params.account
      // console.log(this.account)
    }
  },
  created: function () {
    this.getAccount()
  }
}
</script>

<style scoped>
.feedback-container{
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color:rgb(245,245,245);
}
.feedback-box{
  display: inline-block;
  position: relative;
  top:80px;
  margin: auto;
  width: 430px;
  height: 500px;
  border-radius: 15px;
  background-color:rgb(255, 255, 255);
  box-shadow: 1px 1px 20px #888888;
  text-align: center;
}
.checker{
  margin-top: 20px;
}
.feedback-msg{
  margin-top: 40px;
  width: 100%;
  /* background-color:aquamarine; */
}
.el-button{
  position: relative;
  width: 80%;
  padding-left: 40px;
  padding-right: 40px;
  bottom: -100px;
}
</style>
