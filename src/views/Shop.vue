<template>
    <div class="shop-container">
      <div class="header-nav">
        <el-row :gutter="20">
        <el-col :span="8">
          <div class="logo">
            <router-link :to="{ path:'/shop'}" >
            <img src="../assets/images/logo.png">
            </router-link>
            </div>
        </el-col>
        <el-col :span="12">
          <div class="search" >
            <el-input v-model="searchInput" placeholder="请输入内容">
              <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
            </el-input>
            </div>
        </el-col>
        <el-col :span="2">
          <div class="account">
            <router-link :to="{ path:'/login'}"><i class="el-icon-s-custom"></i></router-link>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="logout">
          </div>
        </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      searchInput: ''
    }
  },
  methods: {
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
}
.el-row {
  margin-bottom: 20px;
  height: 100%;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.active{
    border:1px solid black;
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
  padding-left: 20px;
  font-size:25px;
}
.logout{
  height: 100px;
  width: 100%;
  padding-top: 40px;
  padding-left: 20px;
  font-size:25px;
}

</style>
