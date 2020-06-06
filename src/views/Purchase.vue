<template>
    <div class="purchase-container">
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
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
         <template v-if="!ifAddressSelected" slot="title">
             <div class="address-panel-before"><i class="el-icon-circle-plus-outline"></i> 添加收货地址</div>
         </template>
         <template v-else slot="title">
             <div class="address-panel-after">
                 <i class="el-icon-location-outline"></i>
                 <span> {{selectedAddress.signer}} {{selectedAddress.mobile}} {{selectedAddress.location}}</span>
              </div>
         </template>
          <el-table :data="addressInfo" border style="width:100%">
            <el-table-column prop="signer" label="收件人" width="200"></el-table-column>
            <el-table-column prop="mobile" label="联系方式" width="250"></el-table-column>
            <el-table-column prop="location" label="收货地址" width="500"></el-table-column>
            <el-table-column label="操作" width="124">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="20">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
export default {
  data () {
    return {
      purchaseID: this.$route.query.purchaseID,
      purchaseInfo: {},
      addressInfo: [{
        owner: {
          id: 1,
          username: '余快乐！'
        },
        signer: '余快',
        location: '安徽省合肥市蜀山区九龙路118号安徽大学',
        mobile: '0551-0001'
      }],
      activeName: '-1',
      ifAddressSelected: false,
      selectedAddress: {}
    }
  },
  methods: {
    getUser () {
    },
    getPurchaseItem () {
      console.log(this.purchaseID)
    },
    handleClick (rowInfo) {
      // console.log(rowInfo.signer)
      this.ifAddressSelected = true
      this.activeName = '-1'
      this.selectedAddress = rowInfo
      console.log(this.selectedAddress)
    }
  },
  created: function () {
    this.getPurchaseItem()
  }
}
</script>

<style scoped>
.purchase-container{
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
.address-panel-before{
  height: 100%;
  font-size: 20px;
  font-family: Helvetica;
  color:rgb(103,194,58);
}
.address-panel-after{
  font-size: 18px;
  font-weight: 300
}
</style>
