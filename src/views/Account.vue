<template>
    <div class="account-container">
      <div class="header-nav">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="logo">
              <router-link :to="{ name: 'shop'}" >
                <img src="../assets/images/logo.png">
              </router-link>
            </div>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="4">
            <div class="home">
              <router-link :to="{ name: 'shop'}">
                <i class="el-icon-s-home"><div style="display:inline-block; font-size:15px">  返回商城</div></i>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-card>
        <el-container>
          <el-aside width="200px">
            <el-menu default-active="stall" class="el-menu-vertical-demo" :default-openeds="openedMenuItem" router>
              <el-submenu index="stall">
                  <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">我的货架</span>
                </template>
                  <el-menu-item-group>
                    <el-menu-item index="mystall"><i class="el-icon-price-tag"></i>我出售的</el-menu-item>
                    <el-menu-item index="mybargain"><i class="el-icon-shopping-cart-full"></i>我购买的</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
              <!-- <el-menu-item index="stall">
                <i class="el-icon-menu"></i>
                <span slot="title">我的货架</span>
              </el-menu-item> -->
              <el-submenu index="information">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">个人信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="profile"><i class="el-icon-document"></i>基本信息</el-menu-item>
                  <el-menu-item index="password"><i class="el-icon-edit"></i>修改密码</el-menu-item>
                  <el-menu-item index="address"><i class="el-icon-location-information"></i>收货地址</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="transaction">
                  <template slot="title">
                  <i class="el-icon-s-finance"></i>
                  <span slot="title">我的交易</span>
                </template>
                  <el-menu-item-group>
                    <el-menu-item index="sell"><i class="el-icon-sell"></i>我要卖货</el-menu-item>
                    <el-menu-item index="order"><i class="el-icon-s-order"></i>我的订单</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view :userID='userID'></router-view>
          </el-main>
        </el-container>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      openedMenuItem: ['stall', 'information', 'transaction'],
      userID: 0
    }
  },
  methods: {
    getUser () {
      const userID = Number(document.cookie.match(/\d+/g))
      this.userID = userID
      // console.log(userID)
    }
  },
  created: function () {
    this.getUser()
  }
}
</script>

<style scoped>
.account-container{
    margin:auto;
    height: 100%;
    width: 70%;
}
.header-nav{
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
.el-row {
  margin-bottom: 20px;
  height: 100%;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.home{
  height: 100px;
  width: 100%;
  padding-top: 40px;
  padding-left: 30px;
  font-size:25px;
}
.el-aside{
    background-color:royalblue;
}
.el-main{
  /* background-color: rgb(245,245,245) */
}
.el-menu{
  border-right: none;
  height: 100%;
}
.el-card{
  height:600px
}
</style>
