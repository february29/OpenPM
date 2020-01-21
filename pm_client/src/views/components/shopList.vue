<template>
  <div class="shop-list">
    <el-row :gutter="15">
      <el-col :span="4">
        <el-input v-model="searchList.name" placeholder="名称查询"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        label="商品图片"
        width="80">
        <template slot-scope="scope">
          <img width="45" height="30" :src="filterImgPath(scope.row)" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="category"
        sortable
        label="类别">
      </el-table-column>
      <el-table-column
        prop="model"
        sortable
        label="型号">
      </el-table-column>

      <el-table-column
        prop="mark"
        label="备注"
        width="180">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.isShow ? '是':'否'}}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="chaining(tableData.list, 'length', false)"
      background
      @current-change="handleCurrentChange"
      :page-size="searchList.size"
      layout="prev, pager, next, jumper"
      :total="tableData.total"
      style="margin: 20px 0">
    </el-pagination>

    <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
      <el-form ref="form" :rules="rules" :model="formList" label-width="80px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="formList.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://localhost:3000/upload/upload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :file-list="formList.fileList"
              :headers="headers"
              name="GOODS"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="formList.price"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="category">
            <el-col :span="11">
            <el-select v-model="value" placeholder="商品类别" >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
             </el-select>
             </el-col >
          </el-form-item>
          <el-form-item label="型号" prop="model">
            <el-input v-model="formList.model"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="mark">
            <el-input v-model="formList.mark"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </div>
    </el-dialog>



  </div>

</template>
<script>
import { findGood, deleteGood ,addGood} from '@/api/products'
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formList: {
        fileList: [],
        name: '',
        price: '',
        category: '',
        model: '',
        mark: ''
      },
      headers: {
        Authorization: Cookie.get('uut')
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ]
      },
      tableData: [],
      searchList: {
        start: 1,
        size: 5,
        name: ''
      }
    }
  },
  methods: {
    init (search = {}) {
      findGood(search).then(res => {
        this.tableData = res.data.data
      })
    },
    handleCurrentChange (current) {
      this.searchList.start = current
      this.init(this.searchList)
    },
    handleClick (row) {
      deleteGood({id: row._id}).then(res => {
        this.$message.warning(`被删除的商品是:${row.name}----${row._id}`)
        this.init()
      })
    },
    filterImgPath (row) {
      const base = `http://localhost:3000/`
      if (row.fileList.length > 0) {
        return base + row.fileList[0].path
      } else {
        return ''
      }
    },
    search () {
      this.init(this.searchList)
    },
    shopAdd () {
      //  this.$router.push({name: 'shop-add'})
    },
    cancel (formName) {
      // this.$refs[formName].resetFields()
    },
    add (formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.formList.date = this.format('HH-MM-DD hh:mm:ss', this.formList.date)
      //     addGood(this.formList).then(res => {
      //       this.$message.info(res.data.message)
      //       this.$refs[formName].resetFields()
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (response, file, fileList) {
      this.dialogFormVisible = false;
      // this.formList.fileList.push({
      //   name: response.data.originalname,
      //   path: response.data.path
      // })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500kb!')
      }
      return isJPG && isLt2M
    }
    

  },
  created () {
    this.init(this.searchList)
  }
}
</script>

<style lang="scss">
  .dashboard{
    height: 100%;
  }
</style>
