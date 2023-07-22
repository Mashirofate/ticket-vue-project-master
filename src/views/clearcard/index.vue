<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="清楚卡信息">
          <el-input v-model="page.fCertificate" placeholder="清楚卡信息" />
        </el-form-item>
        <el-form-item label="清楚卡备注">
          <el-input v-model="page.fComment" placeholder="清楚卡备注" />
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
        >创建清楚卡</el-button>
        <!-- <el-button @click="toAddBatch()" type="success" size="mini" icon="el-icon-circle-plus">创建入口</el-button> -->
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>

      <!-- 创建场馆静态模态框 -->
      <el-dialog title="创建清楚卡" :visible.sync="dialogAddVisible">
        <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
          <el-form-item label="清楚卡信息" prop="fCertificate">
            <el-input v-model="addForm.fCertificate" />
          </el-form-item>
          <el-form-item label="清楚卡备注">
            <el-input v-model="addForm.fComment" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogStatus==='create'?addSubmit():updateData()">确认</el-button>

            <el-button @click="dialogAddVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>

    <div class="mt-3">
      <!-- 数据表格展示 -->
      <el-table
        v-loading="tabelLoading"
        :data="page.records"
        height="600"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="fCertificate" label="清楚卡信息" />
        <el-table-column prop="fComment" label="清楚卡备注" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <el-button
              v-if="scope.row.vEnable != '删除'"
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
  </div>
</template>

<script>
import { getByKeys, adddes, updatecc, desccId, delByIds } from '@/api/cc'
export default {
  data() {
    return {
      addForm: {
        fCertificate: '',
        fComment: '',
        fId: ''
      },
      dialogStatus: '',
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        pagecount: 1
      },

      addFormrules: {
        fCertificate: [
          {
            required: true,
            message: '清楚卡信息不能为空',
            trigger: 'blur'
          }
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
      const { current, size, fCertificate, fComment } = this.page
      getByKeys({ current, size, fCertificate, fComment }).then(res => {
        const { current, size, records, total } = res.data
        this.page.current = current
        this.page.size = size
        this.page.records = records
        this.page.total = total
        this.page.pagecount = Math.ceil(total / 10)
        this.tabelLoading = false
      })
    },

    handleEdit(i, e) {
      this.addForm.fCertificate = e.fCertificate
      this.addForm.fComment = e.fComment
      this.addForm.fId = e.fId
      this.dialogStatus = 'update'
      this.dialogAddVisible = true
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
    },

    resetTemp() {
      this.addForm = {
        fCertificate: '',
        fComment: '',
        fId: ''
      }
    },

    currentChange(e) {
      this.page.current = e
      this.init()
    },
    onSubmit() {
      this.init()
    },
    handleDel(e) {
      const { fId } = e
      this.tabelLoading = true
      desccId(fId).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功啦',
          type: 'success'
        })
        this.init()
      })
    },
    handleDels() {
      let ids = ''
      for (let index = 0; index < this.selectData.length; index++) {
        ids = ids + this.selectData[index].fId
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

    updateData() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }

        updatecc(this.addForm).then(res => {
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

    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        adddes(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false;
          (res)
        })
      })
    }

  }
}
</script>

