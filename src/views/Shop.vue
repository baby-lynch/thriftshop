<template>
    <div class="shop-container">
        <div class="header-nav">
            <div class=logo><a href="http://localhost:8080/#/shop"><img :class="{active:isActive}" @click="logoActive" src="../assets/images/logo.png"></a></div>
            <hr style="background-color:gray, width:1px">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    logoActive () {
      this.isActive = !this.isActive
    }
  }
}

</script>

<style scoped>
.shop-container{
    margin:auto;
    height: 100%;
    width: 80%;
}
.header-nav{
    width: 100%;
    height: 80px;
}
.logo{
    display: inline;
}
.active{
    border:1px solid black;
}
</style>
