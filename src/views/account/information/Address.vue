<template>
  <div class="address-container">
    <div class="address-wrapper">
      <el-table :data="addressList" border style="width:100%">
        <el-table-column prop="signer" label="收件人" width="80"></el-table-column>
        <el-table-column prop="mobile" label="联系方式" width="100"></el-table-column>
        <el-table-column prop="location" label="收货地址" width="350"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="editAddress(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteAddress(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class='add-btn' type="warning" round @click="addAddress">+ 新 增 地 址 </el-button>
      <!-- 新增地址对话框 -->
      <el-dialog title="新增地址" :visible.sync="addDialogVisible" width="30%">
        <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="80px">
          <el-form-item label="收件人" prop="signer">
            <el-input v-model="addressForm.signer"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile">
            <el-input v-model="addressForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="location">
            <el-input v-model="addressForm.location"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddress">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 编辑地址对话框 -->
      <el-dialog title="编辑地址" :visible.sync="editDialogVisible" width="30%">
        <el-form :model="editForm" :rules="addressFormRules" ref="addressFormRef" label-width="80px">
          <el-form-item label="收件人" prop="signer">
            <el-input v-model="editForm.signer"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="location">
            <el-input v-model="editForm.location"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addressList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      // 新增地址的表单
      addressForm: {
        user: this.userID,
        signer: '',
        mobile: '',
        location: ''
      },
      addressFormRules: {
        signer: [
          { required: true, message: '请填写收件人姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写收件人联系方式', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请填写收件人详细地址', trigger: 'blur' }
        ]
      },
      // 编辑地址的表单
      editForm: {}
    }
  },
  methods: {
    async getAddressList () {
      const { data: res } = await this.$http.get('/AddressList', {
        params: {
          userID: this.userID
        }
      })
      this.addressList = res
      // console.log(this.addressList)
    },
    editAddress (row) {
      this.editForm = row
      this.editDialogVisible = true
    },
    deleteAddress (row) {
      // console.log(row)
      this.$confirm('是否确认删除地址?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.editForm = row
        const url = 'AddressRUD/' + this.editForm.id + '/'
        const { data: res } = await this.$http.delete(url)
        this.getAddressList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    addAddress () {
      this.addDialogVisible = true
    },
    async submitAddress () {
      this.$refs.addressFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请完善地址信息！')
        } else {
          const { data: res } = await this.$http.post('AddressCreate/', this.addressForm)
          this.$message.success('添加地址成功')
          this.addDialogVisible = false
          this.getAddressList()
        }
      })
    },
    async submitEdit () {
      // console.log(this.editForm)
      this.$refs.addressFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请完善地址信息！')
        } else {
          const url = 'AddressRUD/' + this.editForm.id + '/'
          const { data: res } = await this.$http.put(url, {
            user: this.userID,
            signer: this.editForm.signer,
            mobile: this.editForm.mobile,
            location: this.editForm.location
          })
          this.editDialogVisible = false
          this.$message.success('修改成功')
          this.getAddressList()
        }
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
    this.getAddressList()
  }
}
</script>

<style>
.el-table .cell{
  text-align: center;
}
</style>
<style scoped>
.address-container{
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 50px;
}
.address-wrapper{
 border: rgb(210,210,210) 1px ridge;
}
.add-btn{
  margin-top: 20px;
  float:right;
}
</style>
