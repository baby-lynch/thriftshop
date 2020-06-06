<template>
    <div class="shop-container">
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
          <div class="search" >
            <el-input v-model="searchInput" placeholder="请输入内容">
              <el-button slot="append" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-input>
            </div>
        </el-col>
        <el-col :span="4">
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
      <el-tabs type="border-card" class="goods-panel">
        <el-tabs v-model="activeCate" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部"></el-tab-pane>
          <el-tab-pane v-for="category in categories" :key="category.id" :label="category.name"></el-tab-pane>
        </el-tabs>
        <div class="item-box" v-for="item in showGoods" :key="item.id" @mouseover="isHover=item.id" @mouseout="isHover=-1" :class="{hover: item.id === isHover}">
          <div class="thumbnail">
            <img :src="item.image" alt="..." style="width: 180px; height: 180px">
          </div>
          <div>
            <div class="item-name">
              <div style="text-align:center;display:inline-block"><p class="item-name-display;font-family:'等线(中文正文)'">{{ item.name }}</p></div>
            </div>
            <div class="bottom-footer">
              <div class="sellerinfo">
                <el-avatar class="seller-avtr" :size="25" icon="el-icon-user-solid"></el-avatar>
                <div class="seller-name" ><span>{{ item.seller.username}}</span></div>
              </div>
              <div class="detail-btn"><router-link :to="{ name: 'item', query: {itemID :item.id} }" ><el-button type="text">商品详情</el-button></router-link></div>
            </div>
          </div>
        </div>
      </el-tabs>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      isHover: -1,
      searchInput: '',
      activeCate: '0',
      categories: [{
        id: 1,
        name: '闲置课本'
      }, {
        id: 2,
        name: '日用百货'
      }, {
        id: 3,
        name: '鞋帽服饰'
      }, {
        id: 4,
        name: '文体数码'
      }],
      goods: [],
      showGoods: []
    }
  },
  methods: {
    async getGoods () {
      const { data: res } = await this.$http.get('/shop')
      this.goods = res
      this.showGoods = this.goods
    },
    handleClick () {
      const selectID = Number(this.activeCate)
      if (selectID) {
        this.showGoods = this.goods.filter(function (item) {
          return item.category.id === selectID
        })
      } else {
        this.showGoods = this.goods
      }
    },
    search () {
      this.showGoods = []
      for (let i = 0; i < this.goods.length; i++) {
        if ((this.goods[i].name).search(this.searchInput) > 0) {
          this.showGoods.push(this.goods[i])
        }
      }
    },
    getUser () {
      const saveUserInfo = document.cookie
      console.log(saveUserInfo)
    }
  },
  created: function () {
    this.getGoods()
  }
}
</script>

<style scoped>
.shop-container{
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
.search{
  height: 100%;
  width: 100%;
  padding-top: 40px;
}
.account{
  height: 100px;
  width: 100%;
  padding-top: 40px;
  padding-left: 30px;
  font-size:25px;
}
.logout{
  height: 100px;
  width: 100%;
  padding-top: 40px;
  padding-left: 20px;
  font-size:25px;
}
.item-box{
  display: inline-block;
  margin: 20px;
  height: 300px;
  width: 300px;
  border-radius: 10px;
  padding-top: 10px;
  background-color:rgb(245,245,245);
  box-shadow: 1px 1px 3px #888888;
  text-align: center;
}
.hover{
  box-shadow: 2px 2px 10px #888888;
}
.picture{
  margin: auto;
  height:200px;
  width:200px;
  border-radius: 10px;
  background-color: red;
}
.item-name{
  height: 50px;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
.item-name-display{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottom-footer{
  height: 50px;
  padding-left:20px;
  padding-right:20px;
}
.sellerinfo{
  height: 45px;
  width: 100px;
  padding-top: 5px;
  display: inline-block;
  float: left;
}
.seller-avtr{
  display: inline-block;
  float: left;
}
.seller-name{
  padding: 2px;
  display: inline-block;
  height: 21px;
  font-family:'Georgia';
  font-size: 14px;
  color:#303133;
}
.detail-btn{
  height: 50px;
  display: inline-block;
  float: right;
}
</style>
