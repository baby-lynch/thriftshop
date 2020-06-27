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
            <router-link :to="{ name: 'account'}">
            <i class="el-icon-s-custom">
              <div style="display:inline-block; font-size:15px">个人中心</div>
            </i>
            </router-link>
          </div>
        </el-col>
        </el-row>
      </div>
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
            <el-table-column label="操作" width="112">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="20">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <el-card>
        <table class="table table-bordered" id="table">
          <thead>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>商品价格</th>
          </thead>
          <tbody>
            <tr>
              <td><div class="thumbnail"><img :src="itemInfo.image" style="width: 100px; height: 100px"></div></td>
              <td>{{itemInfo.name}}</td>
              <td>￥{{itemInfo.price}}</td>
            </tr>
          </tbody>
        </table>
        <div class="order-form-wrapper">
        <el-form ref="orderFormRef" :rules="orderFormRules" :model="orderForm" label-width="80px">
           <el-form-item label="联系方式" prop="contact">
             <el-input v-model="orderForm.contact" placeholder="必填项，方便卖家与您联系"></el-input>
           </el-form-item>
          <el-form-item label="留言：">
            <el-input type="textarea" v-model="orderForm.message"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <div class="submit-btn-wrapper">
           <el-button type="success" @click="submitOrder">提交订单</el-button>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      /*
        从Cookie中获取的当前登录用户的userID，用来获取用户的地址
        从路由获取的当前购买商品的purchaseItemID,用来获取当前购买的商品
      */
      userID: 0,
      purchaseItemID: this.$route.query.purchaseID,
      /* 通过userID获取到的用户地址信息存放在addresInfo这个数组里 */
      addressInfo: [],
      /* 通过purchaseItem获取到的当前购买商品的信息存放在itemInfo这个对象里 */
      itemInfo: {},
      /* 控制折叠面板的打开或关闭，刚开始默认关闭 */
      activeName: '-1',
      /* 控制折叠面版的标题显示添加地址还是被选择的地址信息 */
      ifAddressSelected: false,
      /* 存放用户选中的地址信息 */
      selectedAddress: {},
      selectedAddressID: 0,
      orderForm: {
        contact: '',
        message: ''
      },
      orderFormRules: {
        contact: [
          { required: true, message: '请填写联系方式', trigger: 'blur' }
        ]
      },
      submitOrderInfo: {
        buyerID: 0,
        goodsID: Number(this.$route.query.purchaseID),
        addressID: this.selectedAddressID,
        contact: '',
        message: ''
      }
    }
  },
  methods: {
    getUser () {
      const userID = Number(document.cookie.match(/\d+/g))
      this.userID = userID
      this.submitOrderInfo.buyerID = userID
    },
    async getPurchaseItem () {
      const { data: res } = await this.$http.get('/GoodsDetail', {
        params: {
          itemID: this.purchaseItemID
        }
      })
      this.itemInfo = res[0]
    },
    async getAddress () {
      const { data: res } = await this.$http.get('/AddressList', {
        params: {
          userID: this.userID
        }
      })
      this.addressInfo = res
    },
    handleClick (rowInfo) {
      this.ifAddressSelected = true
      this.activeName = '-1'
      this.selectedAddress = rowInfo
      this.submitOrderInfo.addressID = this.selectedAddress.id
      // console.log(this.submitOrderInfo.addressID)
    },
    submitOrder () {
      this.$refs.orderFormRef.validate(async (valid) => {
        if (valid && this.ifAddressSelected) {
          this.$message.success('订单创建成功')
          this.submitOrderInfo.contact = this.orderForm.contact
          this.submitOrderInfo.message = this.orderForm.message
          this.$router.push('/checkout')
          console.log(this.submitOrderInfo)
          const { data: res } = await this.$http.post('OrderCreate/', {
            buyer: this.submitOrderInfo.buyerID,
            goods: this.submitOrderInfo.goodsID,
            address: this.submitOrderInfo.addressID,
            contact: this.submitOrderInfo.contact,
            message: this.submitOrderInfo.message
          })
        } else if (valid) {
          this.$message.error('请选择收货地')
        }
      })
    }
  },
  created: function () {
    this.getUser()
    this.getPurchaseItem()
    this.getAddress()
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
.el-card{
  background-color: rgb(250, 250, 250);
}
.table{
  text-align: center;
  border: 1px;
  vertical-align: center;
}
.table th tr td{
  border: 1px;
  text-align: center;
}
.order-form-wrapper{
  display: inline-block;
  width: 500px;
}
.submit-btn-wrapper{
  display: inline-block;
  margin-left: 50px;
}
</style>
