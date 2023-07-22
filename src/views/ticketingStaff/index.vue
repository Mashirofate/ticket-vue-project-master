<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="所属活动">
          <el-input v-model="page.tsVaName" placeholder="活动名称" />
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="page.tsIdentiycard" placeholder="身份证号" />
        </el-form-item>
        <el-form-item label="二维码">
          <el-input v-model="page.tsQrcard" placeholder="二维码" />
        </el-form-item>
        <el-form-item label="IC码">
          <el-input v-model="page.tsIccard" placeholder="IC码" />
        </el-form-item>
        <el-form-item label="座位区域">
          <el-input v-model="page.tsSeatingArea" placeholder="座位区域" />
        </el-form-item>
        <el-form-item label="座位牌号">
          <el-input v-model="page.tsRownumber" placeholder="座位牌号" />
        </el-form-item>
        <el-form-item label="座位号">
          <el-input v-model="page.tsSeat" placeholder="座位号" />
        </el-form-item>
        <el-form-item label="实名">
          <el-input v-model="page.tsRealName" placeholder="实名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="success" size="mini" icon="el-icon-plus" @click="toAddBatch">导入票务</el-button>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-plus"
          @click="handleCreate()"
        >创建票务</el-button>
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>

      <!-- 创建场馆静态模态框 -->
      <el-dialog title="创建票务" :visible.sync="dialogAddVisible">
        <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
          <el-form-item label="活动名称" prop="tsVaId">
            <el-cascader v-model="addForm.tsVaId" :props="props" :show-all-levels="false" />
          </el-form-item>
          <el-form-item label="座位区域" prop="tsSeatingArea">
            <el-input v-model="addForm.tsSeatingArea" />
          </el-form-item>
          <el-form-item label="座位排号" prop="tsRownumber">
            <el-input v-model="addForm.tsRownumber" />
          </el-form-item>
          <el-form-item label="座位号" prop="tsSeat">
            <el-input v-model="addForm.tsSeat" />
          </el-form-item>
          <el-form-item label="看台信息" prop="tsGrandstand">
            <el-input v-model="addForm.tsGrandstand" />
          </el-form-item>
          <el-form-item label="身份证" prop="tsIdentiycard">
            <el-input v-model="addForm.tsIdentiycard" />
          </el-form-item>
          <el-form-item label="实名" prop="tsRealName">
            <el-input v-model="addForm.tsRealName" />
          </el-form-item>
          <el-form-item label="二维码" prop="tsQrcard">
            <el-input v-model="addForm.tsQrcard" />
          </el-form-item>
          <el-form-item label="IC卡" prop="tsIccard">
            <el-input v-model="addForm.tsIccard" />
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addForm.phone" />
          </el-form-item>
          <el-form-item label="备注" prop="tsNote">
            <el-input v-model="addForm.tsNote" />
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
        height="630"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="tSeatingarea" label="座位区域" width="100" />
        <el-table-column prop="tRownumber" label="座位牌号" width="100" />
        <el-table-column prop="tSeat" label="座位号" width="100" />
        <el-table-column prop="tGrandstand" label="看台信息" width="100" />
        <el-table-column prop="tQrcard" label="二维码" width="230" />
        <el-table-column prop="tIccard" label="IC卡" width="230" />
        <el-table-column prop="aName" label="活动名" width="200" />
        <el-table-column prop="tIdentitycard" label="身份证" width="180" />
        <el-table-column prop="tRealname" label="实名" width="180" />
        <el-table-column prop="tNote" label="人员备注" width="180" />
        <el-table-column prop="phone" label="电话" width="180" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row) ">编辑</el-button>
            <el-button
              type="text"
              size="small"
              style="color:#F56C6C"
              @click="handleDel(scope.$index,scope.row)"
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
// eslint-disable-next-line no-unused-vars
import { getByKeys, addTs, dekTsById, updateTs, delByIds } from '@/api/ts'
import { getVaSimples } from '@/api/va'
export default {
  data() {
    return {
      addForm: {
        tsId: '',
        tsVaId: '',
        tsSeatingArea: '',
        tsRownumber: '',
        tsSeat: '',
        tsGrandstand: '',
        tsIdentiycard: '',
        tsRealName: '',
        tsQrcard: '',
        tsIccard: '',
        phone: '',
        tsNote: ''
      },
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        pagecount: 1,

        tsId: '',
        tsVaId: '',
        tsSeatingArea: '',
        tsRownumber: '',
        tsSeat: '',
        tsGrandstand: '',
        tsIdentiycard: '',
        tsRealName: '',
        tsQrcard: '',
        tsIccard: '',
        phone: '',
        tsNote: ''
      },

      dialogStatus: '',

      addFormrules: {
        tsVaId: [
          {
            required: true,
            message: '活动名称不能为空',
            trigger: 'blur'
          }
        ],
        tsNote: [
          {
            required: true,
            message: '备注不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
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
      const page = this.page
      delete page.records
      delete page.total
      getByKeys(page).then(res => {
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

    // handleClick(row) {
    //   console.log(row.aName);
    // },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
    },

    handleEdit(i, e) {
      this.addForm.tsId = e.tId
      this.addForm.tsVaId = e.aId
      this.addForm.tsSeatingArea = e.tSeatingarea
      this.addForm.tsRownumber = e.tRownumber
      this.addForm.tsSeat = e.tSeat
      this.addForm.tsGrandstand = e.tGrandstand
      this.addForm.tsIdentiycard = e.tIdentitycard
      this.addForm.tsRealName = e.tRealname
      this.addForm.tsQrcard = e.tQrcard
      this.addForm.tsIccard = e.tIccard
      this.addForm.phone = e.phone
      this.addForm.tsNote = e.tNote
      this.dialogStatus = 'update'
      this.dialogAddVisible = true
    },

    resetTemp() {
      this.addForm = {
        tsVaId: '',
        tsSeatingArea: '',
        tsRownumber: '',
        tsSeat: '',
        tsGrandstand: '',
        tsIdentiycard: '',
        tsRealName: '',
        tsQrcard: '',
        tsIccard: '',
        phone: '',
        tsNote: ''
      }
    },

    handleDel(i, e) {
      // console.log('e: ' + e.tId, 'i: ' + i)
      const { tId } = e
      // console.log('vmId: ' + vmId)
      this.tabelLoading = true
      dekTsById(tId).then(res => {
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
        ids = ids + this.selectData[index].tId
        if (this.selectData.length !== index + 1) {
          ids = ids + ','
        }
      }
      this.tabelLoading = true
      // eslint-disable-next-line no-undef
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

    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        addTs(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
          console.log(res)
        })
      })
    },
    toAddBatch() {
      this.$router.push('/data/addticketingBatch')
    },
    updateData() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        updateTs(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
          this.$message({
            showClose: true,
            message: '更新成功啦',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

<style>
</style>
