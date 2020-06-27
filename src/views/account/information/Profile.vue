<template>
  <div class="profile-container">
    <div class="profile-dialog">
      <el-form :model="profile" label-width="80px">
        <el-form-item label="账 号">
          <el-input v-model="profile.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="profile.username" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱 ">
          <el-input v-model="profile.email" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="签 名">
          <el-input type="textarea" v-model="profile.bio" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="edit-btn" type="primary" @click="edit">编 辑</el-button>
          <el-button class="save-btn" type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        account: '',
        username: '',
        email: '',
        bio: ''
      },
      editable: true
    }
  },
  methods: {
    async getProfile () {
      // console.log('req: ' + this.userID)
      const { data: res } = await this.$http.get('ProfileRUView/', {
        params: {
          id: this.userID
        }
      })
      // console.log(res)
      this.profile.account = res.user.account
      this.profile.username = res.user.username
      this.profile.email = res.email
      this.profile.bio = res.bio
    },
    edit () {
      this.editable = false
    },
    async save () {
      this.editable = true
      // console.log(this.userID)
      const { data: res } = await this.$http.get('ProfileEdit/', {
        params: {
          userID: this.userID,
          username: this.profile.username,
          bio: this.profile.bio,
          email: this.profile.email
        }
      })
      this.$message.success('修改成功')
    }
  },
  // 接收从account父组件传过来的userID参数
  props: ['userID'],
  watch: {
    userID: function (val) {
      this.userID = val
    }
  },
  created: function () {
    this.getProfile()
  }
}
</script>

<style scoped>
.profile-container{
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 50px;
}
.profile-dialog{
  width: 400px;
  text-align: center;
}
.edit-btn{
  float: left;
}
.save-btn{
  float: right;
}
</style>
