<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="入口名称">
          <el-input v-model="page.emName" placeholder="入口名称" />
        </el-form-item>

        <el-form-item label="场馆名称">
          <el-input v-model="page.vmName" placeholder="场馆名称" />
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="page.emEnable" placeholder="状态">
            <el-option
              v-for="(item, index) in uStartusing"
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
        >创建入口</el-button>
        <!-- <el-button @click="toAddBatch()" type="success" size="mini" icon="el-icon-circle-plus">创建入口</el-button> -->
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
        height="600"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="eName" label="入口名称" width="200" />
        <el-table-column prop="vName" label="所属场馆" width="180" />
        <el-table-column prop="eEnable" label="状态" width="180" />
        <el-table-column prop="eNote" label="备注" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row) ">编辑</el-button>
            <el-button
              type="text"
              size="small"
              :style="{color: scope.row.eEnable == '启用'?'#F56C6C':'#409EFF'}"
              @click="handeUpdateEnable(scope.row)"
            >{{ scope.row.eEnable=='启用'? '不启用':'启用' }}</el-button>
            <el-button
              v-if="scope.row.eEnable != '删除'"
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
    <el-dialog title="创建场馆入口" :visible.sync="dialogAddVisible">
      <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
        <el-form-item label="入口名称" prop="emName">
          <el-input v-model="addForm.emName" />
        </el-form-item>
        <el-form-item label="备注" prop="emNote">
          <el-input v-model="addForm.emNote" />
        </el-form-item>
        <el-form-item label="归属场馆" prop="emVmId">
          <el-cascader v-model="addForm.emVmId" :props="props" :show-all-levels="false" />
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="addForm.emEnable" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="不启用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogStatus==='create'?addSubmit():updateData()">确认</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getByKeys, updateEnable, addEm, updateEm, dekEmById, delByIds } from '@/api/em'

import { getVmSimples } from '@/api/vm'

export default {
  data() {
    return {
      addForm: {
        emName: '',
        emEnable: '1',
        emNote: '',
        vmName: '',
        emId: ''
      },
      dialogStatus: '',
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        pagecount: 1,
        size: 10,
        records: [],
        emName: '',
        emEnable: null,
        vmName: ''
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
      addFormrules: {
        emName: [
          {
            required: true,
            message: '场馆名称不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        emVmId: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        emNote: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      props: {
        lazy: true,
        emitPath: false,
        value: 'vId',
        label: 'vName',
        lazyLoad(node, resolve) {
          const { level } = node
          if (level === 0) {
            getVmSimples().then(res => {
              const { data } = res
              console.log(data)
              resolve(data)
              return
            })
          }
          resolve()
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tabelLoading = true
      const { current, size, emName, emEnable, vmName } = this.page
      getByKeys({ current, size, emName, emEnable, vmName }).then(res => {
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
      this.addForm.emName = e.eName
      this.addForm.emEnable = e.eEnable
      this.addForm.emNote = e.eNote
      this.addForm.vmName = e.vName
      this.addForm.emId = e.eId
      this.addForm.emVmId = e.vId
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
        emName: '',
        emEnable: '启用',
        emNote: '',
        emId: '',
        vmName: '',
        emVmId: ''
      }
    },

    updateData() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.addForm.emEnable === '不启用') {
          this.addForm.emEnable = 2
        } else if (this.addForm.emEnable === '启用') {
          this.addForm.emEnable = 1
        } else if (this.addForm.emEnable === '删除') {
          this.addForm.emEnable = 0
        }
        updateEm(this.addForm).then(res => {
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

    currentChange(e) {
      this.page.current = e
      this.init()
    },
    onSubmit() {
      this.init()
    },
    handleDel(e) {
      const { eId } = e
      this.tabelLoading = true
      dekEmById(eId).then(res => {
        this.init()
      })
    },
    handleDels() {
      let ids = ''
      for (let index = 0; index < this.selectData.length; index++) {
        ids = ids + this.selectData[index].eId
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
      const { eId, eEnable } = e
      const enableCode = eEnable === '启用' ? 2 : 1
      this.tabelLoading = true
      updateEnable(eId, enableCode).then(res => {
        this.$message({
          showClose: true,
          message: enableCode === 2 ? '不启用成功' : '启用成功',
          type: 'success'
        })
        this.init()
      })
    },
    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.addForm.emEnable === '不启用') {
          this.addForm.emEnable = 2
        } else if (this.addForm.emEnable === '启用') {
          this.addForm.emEnable = 1
        } else if (this.addForm.emEnable === '删除') {
          this.addForm.emEnable = 0
        }
        addEm(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
        })
      })
    }
  }
}
</script>

<style>
</style>
