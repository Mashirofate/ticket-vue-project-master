<template>
  <div  class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="场馆名称">
          <el-input v-model="page.aName" placeholder="场馆名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="page.aEnable" placeholder="状态">
            <el-option
              v-for="(item, index) in uStartusing"
              :key="index"
              :label="item.key"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="page.aType" placeholder="类型">
            <el-option
              v-for="(item, index) in aTypeusing"
              :key="index"
              :label="item.key"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-plus"
          @click="handleCreate()"
        >创建活动</el-button>
        <!-- <el-button @click="toAddBatch()" type="success" size="mini" icon="el-icon-circle-plus">批量添加</el-button> -->
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>
    </el-card>
    <div class="mt-3">
      <!-- 数据表格展示 -->
      <el-table
        v-loading="tabelLoading"
        :data="page.records"
        max-height="700"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="aImage" label="海报">
          <template slot-scope="scope">
            <img v-if="scope.row.aImage" width="100" height="100" :src="scope.row.aImage">
          </template>
        </el-table-column>
        <el-table-column prop="aId" label="活动ID" />
        <el-table-column prop="aName" label="活动名称" />
        <el-table-column prop="aEnable" label="状态" />
        <el-table-column prop="aType" label="活动类型" />
        <el-table-column prop="aCreationtime" label="创建时间" />
        <el-table-column prop="aTicketnumber" label="票务数量" />
        <el-table-column prop="aEmployeenumber" label="工作证总数" />
        <el-table-column prop="aNote" label="备注" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              :style="{color: scope.row.aEnable == '启用'?'#F56C6C':'#409EFF'}"
              @click="handeUpdateEnable(scope.row)"
            >{{ scope.row.aEnable=='启用'? '不启用':'启用' }}</el-button>
            <el-button
              v-if="scope.row.aEnable != '删除'"
              type="text"
              size="small"
              style="color:#F56C6C"
              @click="handleDel(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row type="flex" justify="space-between" class="mt-3">
      <div />
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="page.pagecount"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="page.current"
        @current-change="currentChange"
      />
    </el-row>

    <!-- 创建场馆静态模态框 -->
    <el-dialog title="创建活动" :visible.sync="dialogAddVisible">
      <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
        <el-form-item label="活动名称" prop="aName">
          <el-input v-model="addForm.aName" />
        </el-form-item>
        <el-form-item label="备注" prop="aNote">
          <el-input v-model="addForm.aNote" />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select v-model="addForm.aEnable" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="不启用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="addForm.aType" placeholder="请选择活动类型">
            <el-option label="演唱会" value="演唱会" />
            <el-option label="展会" value="展会" />
          </el-select>
        </el-form-item>
        <el-form-item label="票务总数" prop="aTicketnumber">
          <el-input v-model.number="addForm.aTicketnumber" />
        </el-form-item>
        <el-form-item label="工证总数" prop="aEmployeenumber">
          <el-input v-model.number="addForm.aEmployeenumber" />
        </el-form-item>
        <el-form-item label="活动海报">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >

            <img v-if="addForm.aImage" :src="addForm.aImage" class="avatar" width="148" height="148">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogStatus==='create'?addSubmit():updateData()">确认</el-button>
          <el-button @click="clearAddFrom()">默认</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getByKeys, updateEnable, addVa, updateVa, delVaById, delByIds } from '@/api/va'

export default {
  data() {
    return {
      addForm: {
        // vaName: '',
        // vaEnable: '1',
        // vaNote: '',
        // vaTicketnumber: '',
        // vaEmployeenumber: '',
        // aImage: '',
        aEmployeenumber: '',
        aEnable: 1,
        aId: '',
        aImage: '',
        aName: '',
        aNote: '',
        aType: '',
        aTicketnumber: ''

      },
      dialogStatus: '',
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        pagecount: 1,
        records: [],
        aName: '',
        aEnable: null,
        aType: null
      },
      uStartusing: [
        {
          key: '全部',
          value: null
        },
        {
          key: '启用',
          value: 1
        },
        {
          key: '不启用',
          value: 2
        },
        {
          key: '删除',
          value: 0
        }

      ],
      aTypeusing: [
        {
          key: '全部',
          value: null
        },
        {
          key: '展会',
          value: '展会'
        },
        {
          key: '演唱会',
          value: '演唱会'
        }

      ],

      addFormrules: {
        aName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        aNote: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        aTicketnumber: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        aEmployeenumber: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tabelLoading = true
      const { current, size, aName, aEnable, aType } = this.page
      const form = {
        current: current,
        size: size,
        aName: aName,
        aEnable: aEnable,
        aType: aType
      }
      getByKeys(form).then(res => {
        const { current, size, records, total } = res.data
        this.page.current = current
        this.page.size = size
        this.page.records = records
        this.page.total = total
        this.page.pagecount = Math.ceil(total / 10)
        this.tabelLoading = false
      })
    },
    currentChange(e) {
      this.page.current = e
      this.init()
    },
    onSubmit() {
      this.init()
    },

    handleEdit(i, e) {
      this.addForm = Object.assign({}, e) // copy obj 用于将一个或多个源对象的所有自身枚举属性的值复制到目标对象。
      this.dialogStatus = 'update'

      this.dialogAddVisible = true
    },

    handleDel(e) {
      const { aId } = e
      this.tabelLoading = true
      delVaById(aId).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功啦',
          type: 'success'
        })
        this.init()
      })
    },

    resetTemp() {
      this.addForm = {
        aEmployeenumber: null,
        aEnable: '',
        aImage: '',
        aName: null,
        aNote: null,
        aTicketnumber: null }
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'

      this.dialogAddVisible = true
    },

    handleDels() {
      let ids = ''
      for (let index = 0; index < this.selectData.length; index++) {
        ids = ids + this.selectData[index].aId
        if (this.selectData.length !== index + 1) {
          ids = ids + ','
        }
      }
      this.tabelLoading = true
      delByIds(ids).then(res => {
        this.$message({
          showClose: true,
          message: '批量删除成功啦',
          type: 'success'
        })
        this.init()
      })
    },
    handleSelectionChange(e) {
      this.selectData = e
    },

    handeUpdateEnable(e) {
      const { aId, aEnable } = e
      const enableCode = aEnable === '启用' ? 2 : 1
      this.tabelLoading = true
      updateEnable(aId, enableCode).then(res => {
        this.$message({
          showClose: true,
          message: enableCode === 2 ? '不启用成功' : '启用成功',
          type: 'success'
        })
        this.init()
      })
    },
    clearAddFrom() {
      this.$refs.addForm.resetFields()
    },
    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        addVa(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
        })
      })
    },

    updateData() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.addForm.aEnable === '不启用') {
          this.addForm.aEnable = 2
        } else if (this.addForm.aEnable === '启用') {
          this.addForm.aEnable = 1
        } else if (this.addForm.aEnable === '删除') {
          this.addForm.aEnable = 0
        }
        updateVa(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
          this.$message({
            showClose: true,
            message: '更新成功啦',
            type: 'success'
          })
        })
      })
    },

    handleAvatarSuccess(res, file) {
      this.getBase64(file.raw).then(res => {
        this.addForm.aImage = res
      })
    },
    beforeAvatarUpload(file) {
      return true
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>

