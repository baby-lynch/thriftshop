<template>
  <div class="sell-container">
    <div class="sell-dialog">
      <el-form ref="uploadFormRef" :model="uploadForm" :rules="uploadFormRules" label-width="80px" :show-message=showMessage>
        <el-form-item prop="category" label="商品分类">
          <el-select v-model="uploadForm.category" placeholder="选择分类">
            <el-option label="闲置课本" value='1'></el-option>
            <el-option label="日用百货" value='2'></el-option>
            <el-option label="鞋帽服饰" value='3'></el-option>
            <el-option label="文体数码" value='4'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="uploadForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="uploadForm.price"></el-input>
        </el-form-item>
        <el-form-item  prop="amount" label="商品数量">
          <el-input-number v-model="uploadForm.amount" @change="handleNumChange" :min="1" label="商品数量"></el-input-number>
        </el-form-item>
        <el-form-item  prop="image" label="商品图片">
          <el-upload
           :limit="1"
           accept="image/jpeg,image/gif,image/png"
           :on-change="onUploadChange"
           :auto-upload="false"
           action="fakeAction"
           list-type="picture">
          <el-button size="small" type="success">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item  prop="brief" label="商品描述">
          <el-input type="textarea" v-model="uploadForm.brief"></el-input>
        </el-form-item>
        <el-form-item  prop="transaction" label="交易方式">
          <el-row>
            <el-col :span="10"><el-radio v-model="uploadForm.transaction" label="0" @change="handleTransChange">当面交易</el-radio></el-col>
            <el-col :span="8"><el-radio v-model="uploadForm.transaction" label="1" @change="handleTransChange">快递</el-radio></el-col>
            <el-col :span="6"><el-input placeholder="运费" size="medium" v-model="uploadForm.postage" :disabled="inputable"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="upload-btn" type="primary" @click="upload">提 交 商 品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputable: true,
      showMessage: false,
      uploadForm: {
        seller: this.userID,
        category: '',
        name: '',
        price: '',
        brief: '',
        image: '',
        amount: 0,
        transaction: '',
        postage: '',
        payment: ''
      },
      uploadFormRules: {
        category: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur' }
        ],
        price: [
          { required: true, trigger: 'blur' }
        ],
        amount: [
          { required: true, trigger: 'blur' }
        ],
        image: [
          { required: true, trigger: 'blur' }
        ],
        brief: [
          { required: true, trigger: 'blur' }
        ],
        transaction: [
          { required: true, trigger: 'blur' }
        ],
        postage: [
          { required: true, trigger: 'blur' }
        ]
      },
      uploadImage: {
        image: ''
      }
    }
  },
  methods: {
    upload () {
      // console.log(this.uploadForm.category)
      // console.log(this.uploadForm.transaction)
      // const { data: res } = await this.$http.post('ImageUpload/', this.uploadImage)
      this.$refs.uploadFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请完善商品信息！')
        } else {
          const submitForm = {
            seller: this.userID,
            category: Number(this.uploadForm.category),
            name: this.uploadForm.name,
            price: Number(this.uploadForm.price),
            brief: this.uploadForm.brief,
            amount: this.uploadForm.amount,
            transaction: Number(this.uploadForm.transaction),
            postage: Number(this.uploadForm.postage),
            code: this.uploadForm.image
          }
          console.log(submitForm)
          // console.log(this.uploadImage)
          const { data: res } = await this.$http.post('GoodsCreate/', submitForm)
          this.$message.success('提交成功！')
          return this.$router.push('/success')
        }
      })
    },
    onUploadChange (file) {
      var that = this
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function (e) {
        // console.log(this.result)// 图片的base64数据
        // that.uploadImage.image = this.result
        // console.log(that.uploadImage)
        that.uploadForm.image = this.result
      }
    },
    handleNumChange () {
      // console.log(this.uploadForm.amount)
    },
    handleTransChange () {
      // console.log(this.uploadForm.transaction)
      if (this.uploadForm.transaction === '1') {
        this.inputable = false
      } else if (this.uploadForm.transaction === '0') {
        this.inputable = true
      }
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

<style>
.el-upload.el-upload--picture{
  float: left;
}
</style>
<style scoped>
.sell-container{
  width: 100%;
  height: 100%;
  text-align: center;
  padding-left: 50px;
}
.sell-dialog{
  height: 100%;
  width: 400px;
  text-align: center;
}
.el-form-item{
  margin-bottom: 10px;
}
.el-select{
  width: 100%;
}
.upload-btn{
  float: right;
  width:100%;
}
.el-input-number{
  float: left;
}
</style>
