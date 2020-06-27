<template>
  <div v-if="bargainList[0]" class="bargain-container">
    <div class="bargain-box" v-for="item in bargainList" :key="item.id" @mouseover="isHover=item.id" @mouseout="isHover=-1" :class="{hover: item.id === isHover}">
      <div class="image-wrapper">
        <div class="thumbnail">
            <img :src="item.goods.image" alt="..." class="image">
          </div>
      </div>
      <el-button class="cancel-btn" type="warning" plain  @click="cancelOrder(item.id)"><i class="el-icon-circle-close"></i> 取消购买</el-button>
    </div>
  </div>
  <div v-else class="empty-hint" id="empty">
    <div class="hint-wrapper">
      <p class="hint-msg">什么都没有 ...</p>
      <img src="../../../static/empty.png" alt="..." class="empty-box">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHover: -1,
      bargainList: []
    }
  },
  methods: {
    async getBargainList () {
      const { data: res } = await this.$http.get('/MyBuyGoods', {
        params: {
          buyerID: this.userID
        }
      })
      this.bargainList = res
    },
    async cancelOrder (orderID) {
      this.$confirm('是否确认取消购买?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = 'OrderRUD/' + orderID + '/'
        const { data: res } = await this.$http.delete(url)
        this.getBargainList()
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  props: ['userID'],
  watch: {
    userID: function (val) {
      this.userID = val
    }
  },
  created: function () {
    this.getBargainList()
  }
}
</script>
<style scoped>
.bargain-container{
  width: 100%;
  height: 100%;
  /* background-color: skyblue; */
}
.empty-hint{
  width: 100%;
  height: 100%;
  text-align: center;
}
.hint-wrapper{
  position: relative;
  top:100px;
  margin:auto;
}
.hint-msg{
  font-size:25px;
  font-family: "等线(中文正文)";
  font-weight: lighter;
}
.empty-box{
  margin-top: 30px;
  height: 150px;
  width: 200px;
}
.bargain-box{
  display: inline-block;
  position: relative;
  margin: 20px;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  background-color:rgb(245,245,245);
  box-shadow: 1px 1px 3px #888888;
  text-align: center;
  vertical-align: top;
}
.hover{
  box-shadow: 2px 2px 10px #888888;
}
.image-wrapper{
  width: 100%;
  height: 150px;
  border-radius: 10px 10px 0px 0px;
  /* background-color: aqua; */
}
.image{
  width: 150px;
  height: 155px;
  border-radius: 10px 10px 0px 0px;
}
.cancel-btn{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 45px;
  transform: translateX(-50%);
  border-radius: 0px 0px 10px 10px;
}
</style>
