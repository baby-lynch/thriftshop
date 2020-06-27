<template>
  <div class="detail-container">
    <div class="detail-dialog" id="order">
      <div class="detail-item">
        <div class="label">订单编号: </div>
        <div class="detail-info">{{orderDetail.order_sn}}</div>
      </div>
      <div class="detail-item">
        <div class="label">创建时间: </div>
        <div class="detail-info">{{orderDetail.add_time | dateFormat}}</div>
      </div>
      <div class="detail-item">
        <div class="label">商品信息: </div>
        <div v-if="orderDetail.goods" class="detail-info">{{orderDetail.goods.name}}</div>
      </div>
      <div class="detail-item">
        <div class="label">买家信息: </div>
        <div v-if="orderDetail.buyer" class="detail-info">{{orderDetail.buyer.username}}</div>
      </div>
      <div class="detail-item">
        <div class="label">联系买家: </div>
        <div class="detail-info">{{orderDetail.contact}}</div>
      </div>
      <div class="detail-item">
        <div class="label">收货地址: </div>
        <div v-if="orderDetail.address" class="detail-info">{{orderDetail.address.location}}</div>
      </div>
      <div class="detail-item">
        <div class="label">买家留言: </div>
        <div class="detail-info">{{orderDetail.message}}</div>
      </div>
      <div class="detail-item">
        <div class="label">订单状态: </div>
        <div class="detail-info">{{orderDetail.status}}</div>
      </div>
      <div class="footer-btn-group">
        <el-button class="cancel-btn" type="danger" :disabled="changable" @click="cancel">关闭交易</el-button>
        <el-button class="finish-btn" type="primary" :disabled="changable"  @click="finish">完成交易</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderID: this.$route.query.orderID,
      orderDetail: {
        order_sn: '111',
        add_time: '2020-06-25T16:32:25',
        goods: {
          name: 'test'
        }
      },
      changable: false
    }
  },
  methods: {
    async getOrderDetail () {
      const { data: res } = await this.$http.get('/OrderDetail', {
        params: {
          orderID: this.orderID
        }
      })
      // console.log(res)
      this.orderDetail = res
      document.getElementById('order').style.display = 'block'
      if (this.orderDetail.status !== '待处理') {
        this.changable = true
      }
    },
    async cancel () {
      const url = 'OrderRUD/' + this.orderID + '/'
      const { data: res } = await this.$http.put(url, {}, {
        params: {
          operation: 'cancel'
        }
      })
      this.getOrderDetail()
    },
    async finish () {
      const url = 'OrderRUD/' + this.orderID + '/'
      const { data: res } = await this.$http.put(url, {}, {
        params: {
          operation: 'finish'
        }
      })
      this.getOrderDetail()
    }
  },
  filters: {
    dateFormat: function (val) {
      if (val) {
        const ret = val.slice(0, 10) + ' ' + val.slice(11, 19)
        return ret
      }
    }
  },
  created: function () {
    this.getOrderDetail()
  },
  mounted () {
    document.getElementById('order').style.display = 'none'
  }
}
</script>

<style scoped>
.detail-container{
  width: 500px;
  height: 100%;
  text-align: center;
  padding-left: 50px;
}
.detail-dialog{
  height: 100%;
  width: 100%;
  text-align: left;
  min-width: 500px;
  /* background-color: skyblue; */
}
.detail-item{
  height:40px;
  width: 100%;
  margin-bottom: 5px;
  white-space: nowrap;
  /* background-color: aquamarine; */
}
.label{
  display: inline-block;
  height: 100%;
  width: 100px;
  /* background-color:bisque; */
  text-align: center;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  box-sizing: border-box;
}
.detail-info{
  display: inline-block;
  height: 100%;
  min-width: 300px;
  /* background-color:azure; */
  text-align: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  box-sizing: border-box;
}
.footer-btn-group{
  height: 40px;
  width: 100%;
  margin-top: 10px;
  white-space: nowrap;
}
.cancel-btn{
  margin-left: 20px;
}
.finish-btn{
  float: right;
}
</style>
