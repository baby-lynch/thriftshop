<template>
    <div class="item-container">
      <div class="header-nav">
        <el-row class="el-row" :gutter="20">
        <el-col class="el-col" :span="8">
          <div class="logo">
            <router-link :to="{ path:'/shop'}" >
            <img src="../assets/images/logo.png">
            </router-link>
            </div>
        </el-col>
        <el-col class="el-col" :span="12">
        </el-col>
        <el-col class="el-col" :span="4">
          <div class="account">
            <router-link :to="{ name: 'shop'}">
            <i class="el-icon-s-custom" @click="getUser">
              <div style="display:inline-block; font-size:15px">个人中心</div>
            </i>
            </router-link>
          </div>
        </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-card>
        <div class="image">
            <img :src="itemInfo.image" alt="..." style="width: 500px; height: 500px; border-radius:8px ; vertical-align: center;">
        </div>
        <div class="info-wrapper">
          <h4 style="font-family:Helvetica">{{itemInfo.name}}</h4>
          <h2 style="color:rgb(212,77,68)">¥ {{itemInfo.price}}</h2>
          <hr>
          <span style="font-family:'等线(中文正文)'">{{itemInfo.brief}}</span>
          <hr>
            <span style="font-family:'等线(中文正文)'"><i style="font-size:20px" class="el-icon-user-solid"></i> {{ itemInfo.seller}}</span>
            <span style="color:rgb(157,157,157); font-family:'等线(中文正文)'; float:right"> 浏览量 {{itemInfo.click}}</span>
            <hr>
            <div style="margin-bottom:20px;">
              <span style="color:rgb(102,102,102); font-family:'等线(中文正文)'">剩余数量： </span>
              <span>{{itemInfo.amount}}</span>
            </div>
            <div>
              <span style="color:rgb(102,102,102); font-family:'等线(中文正文)'">交易方式： </span>
              <span v-if="itemInfo.transaction === 0">当面交易</span>
              <span v-else>快递 邮费 ￥{{itemInfo.postage}}</span>
            </div>
            <router-link :to="{ name: 'purchase', query: {purchaseID :itemInfo.id} }" >
              <el-button type="primary" icon="el-icon-shopping-cart-2">立即购买</el-button>
            </router-link>
        </div>
      </el-card>
      </div>
</template>

<script>
export default {
  data () {
    return {
      itemID: this.$route.query.itemID,
      itemInfo: {}
    }
  },
  methods: {
    async getItem () {
      const { data: res } = await this.$http.post('/item', this.itemID)
      // console.log('response: \n' + JSON.parse(JSON.stringify(res)))
      this.itemInfo = JSON.parse(JSON.stringify(res))
      // console.log(this.itemInfo.seller.id)
      // console.log(document.cookie)
    },
    getUser () {
      // const saveUserInfo = document.cookie
      // console.log(saveUserInfo)
    }
  },
  created: function () {
    this.getItem()
  }
}
</script>

<style scoped>
.item-container{
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
.image{
  position: relative;
  display: inline-block;
  margin-top:10px;
  margin-left: 30px;
  margin-right: 30px;
  vertical-align: top;
}
.info-wrapper{
  display: inline-block;
  margin: auto;
  width: 450px;
  vertical-align: top;
}
.el-button{
  position: fixed;
  top:600px;
  width: 450px;
}
</style>
