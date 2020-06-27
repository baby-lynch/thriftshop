<template>
  <div class="order-container">
    <div class="order-wrapper">
      <el-table :data="orderList" border :cell-style="cellStyle" style="width:100%">
        <el-table-column prop="goods.name" label="订购商品" width="340"></el-table-column>
        <el-table-column prop="cost" label="订单金额(元)" width="150"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="150"></el-table-column>
        <el-table-column prop="id" width="150" label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'detail', query:{orderID: scope.row.id} }" ><el-button type="text">查 看</el-button></router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('/OrderList', {
        params: {
          sellID: this.userID
        }
      })
      this.orderList = res
      // console.log(this.orderList)
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      // console.log(row)
      if (row.column.label === '订单状态' && row.row.status === '待处理') {
        return 'color:orange'
      } else if (row.column.label === '订单状态' && row.row.status === '已完成') {
        return 'color:rgb(0,194,151)'
      } else if (row.column.label === '订单状态' && row.row.status === '已取消') {
        return 'color:rgb(238,0,13)'
      }
    }
  },
  props: ['userID'],
  watch: {
    userID: function (val) {
      this.userID = val
    }
  },
  created: function () {
    this.getOrderList()
  }
}
</script>

<style scoped>
.order-container{
  width: 100%;
  height: 100%;
  text-align: center;
  /* padding: 50px; */
}
.order-wrapper{
  border: rgb(210,210,210) 1px ridge;
}
</style>
