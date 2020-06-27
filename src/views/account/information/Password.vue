<template>
  <div class="password-container">
    <div class="password-dialog">
      <el-form ref="passwordFormRef" status-icon label-width="80px" :model="passwordForm" :rules='passwordFormRules'>
        <el-form-item label="旧 密 码" prop='oldPassword'>
          <el-input placeholder="请输入旧密码" v-model="passwordForm.oldPassword" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新 密 码" prop='pass'>
          <el-input placeholder="输入新密码" v-model="passwordForm.pass" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='checkPass'>
          <el-input placeholder="确认新密码" v-model="passwordForm.checkPass" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" class='reset-btn' @click="reset('passwordFormRef')">重 置</el-button>
          <el-button type="primary" class='submit-btn' @click="changePass('passwordFormRef')">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.pass) {
        console.log('check:' + this.passwordForm.checkPass)
        console.log('new:' + this.passwordForm.pass)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        oldPassword: '',
        pass: '',
        checkPass: ''
      },
      passwordFormRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset (passwordFormRef) {
      this.$refs[passwordFormRef].resetFields()
    },
    changePass (passwordFormRef) {
      this.$refs.passwordFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请核对输入密码')
        } else {
          const { data: res } = await this.$http.get('ChangePassword/', {
            params: {
              userID: this.userID,
              oldpassword: this.passwordForm.oldPassword,
              newpassword: this.passwordForm.checkPass
            }
          })
          console.log(res)
          if (!res.account) {
            this.$refs[passwordFormRef].resetFields()
            this.$message.error('旧密码错误')
          } else {
            this.$refs[passwordFormRef].resetFields()
            this.$message.success('修改成功')
          }
        }
      })
    }
  },
  props: ['userID'],
  watch: {
    userID: function (val) {
      this.userID = val
    }
  }
}
</script>

<style scoped>
.password-container{
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 50px;
}
.password-dialog{
  width: 400px;
  text-align: center;
}
.reset-btn{
  float: left;
}
.submit-btn{
  float: right;
}
</style>
