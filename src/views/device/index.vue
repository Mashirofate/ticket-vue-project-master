<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="所在位置名称">
          <el-input v-model="page.eName" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="设备IP">
          <el-input v-model="page.dIp" placeholder="设备IP" />
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
        >创建设备</el-button>
        <!-- <el-button @click="toAddBatch()" type="success" size="mini" icon="el-icon-circle-plus">创建入口</el-button> -->
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>

      <el-dialog title="创建场馆入口" :visible.sync="dialogAddVisible">
        <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
          <el-form-item label="所在位置" prop="eName">
            <el-input v-model="addForm.eName" />
          </el-form-item>
          <el-form-item label="设备IP" prop="dIp">
            <el-input v-model="addForm.dIp" />
          </el-form-item>
          <el-form-item label="归属活动" prop="aId">
            <el-cascader v-model="addForm.aId" :props="props" :show-all-levels="false" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogStatus==='create'?addSubmit():updateData()">确认</el-button>
            <el-button @click="dialogAddVisible = false">取消</el-button>
          </el-form-item></el-form>
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
        <el-table-column prop="aName" label="活动名称" />
        <el-table-column prop="eName" label="所在位置" />
        <el-table-column prop="dIp" label="设备IP" />
        <!-- <el-table-column style="color: green" prop="dEnable" label="状态">
          <template scope="scope">
            <span v-if="scope.row.dEnable==='在线'" style="color: green">{{ scope.row.dEnable }}</span>
            <span v-else style="color: red">{{ scope.row.dEnable }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="dCreationtime" label="创建时间" />
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
import { getByKeys, updateEnable, adddes, updateDe, dekdesById, delByIds } from '@/api/de'
import { getVaSimples } from '@/api/va'
export default {
  data() {
    return {
      addForm: {
        eName: '',
        dIp: '',
        aId: '',
        aName: ''
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
      props: {
        lazy: true,
        emitPath: false,
        value: 'aId',
        label: 'aName',
        lazyLoad(node, resolve) {
          const { level } = node
          if (level === 0) {
            getVaSimples().then(res => {
              const { data } = res
              console.log(data)
              resolve(data)
              return
            })
          }
          resolve()
        }
      },
      addFormrules: {
        eName: [
          {
            required: true,
            message: '位置名称不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        dIp: [
          {
            required: true,
            message: '设备IP不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
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
      const { current, size, eName, dIp, dEnable } = this.page
      getByKeys({ current, size, eName, dIp, dEnable }).then(res => {
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
      this.addForm.eName = e.eName
      this.addForm.dIp = e.dIp
      this.addForm.dId = e.dId
      this.addForm.aId = e.aId
      this.addForm.aName = e.aName
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
        eName: '',
        dIp: '',
        dId: '',
        aId: ''
      }
    },

    updateData() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }

        updateDe(this.addForm).then(res => {
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
      const { dId } = e
      this.tabelLoading = true
      dekdesById(dId).then(res => {
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
        ids = ids + this.selectData[index].dId
        if (this.selectData.length !== index + 1) {
          ids = ids + ','
        }
      }
      console.log('11' + ids)

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
      const { vId, vEnable } = e
      const enableCode = vEnable === '启用' ? 2 : 1
      this.tabelLoading = true
      updateEnable(vId, enableCode).then(res => {
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

