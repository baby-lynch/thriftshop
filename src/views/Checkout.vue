<template>
    <div class="checkout-container">
      <div class="header-nav">
        <el-row class="el-row" :gutter="20">
        <el-col class="el-col" :span="8">
          <div class="logo">
            <router-link :to="{ name: 'shop'}" >
            <img src="../assets/images/logo.png">
            </router-link>
            </div>
        </el-col>
        <el-col class="el-col" :span="12">
        </el-col>
        <el-col class="el-col" :span="4">
          <div class="account">
            <router-link :to="{ name: 'shop'}">
            <i class="el-icon-s-custom">
              <div style="display:inline-block; font-size:15px">个人中心</div>
            </i>
            </router-link>
          </div>
        </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-card>
          <div class="success">
              <img src="../static/check.png">
              <div>您的订单已成功创建，请耐心等待卖家与您取得联系</div>
          </div>
      </el-card>
     </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.checkout-container{
    margin:auto;
    height: 100%;
    width: 70%;
}
.header-nav{
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
.el-card{
  background-color: rgb(250, 250, 250);
}
.el-row {
  margin-bottom: 20px;
  height: 100%;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.account{
  height: 100px;
  width: 100%;
  padding-top: 40px;
  padding-left: 30px;
  font-size:25px;
}
.success{
    margin: auto;
    height: 300px;
    width: 300px;
    text-align: center;
}
</style>
