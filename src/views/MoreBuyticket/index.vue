<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">

        <el-form-item label="活动">
          <el-input v-model="page.aName" placeholder="活动名称" />
        </el-form-item>
        <el-form-item label="场馆">
          <el-input v-model="page.vName" placeholder="场馆名称" />
        </el-form-item>
        <el-form-item label="入口">
          <el-input v-model="page.eName" placeholder="入口名称" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="page.autonym" placeholder="真实姓名" />
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="page.tIdentitycard" placeholder="身份证号" />
        </el-form-item>
        <el-form-item label="二维码">
          <el-input v-model="page.tQrcard" placeholder="二维码" />
        </el-form-item>

        <el-checkbox v-model="page.temp" label="温度大于37.5℃" border size="small" />
        <el-checkbox v-model="page.healthCode" label="异常健康码" border size="small" />

        <el-form-item label="入场时间">
          <el-date-picker
            v-model="eDates"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />

        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <!-- <el-button type="success" size="mini" icon="el-icon-plus" @click="toAddBatch">添加</el-button> -->
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
        height="630"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="fImage" label="票务头像">
          <template slot-scope="scope">
            <img v-if="scope.row.fImage" width="100" height="100" :src="scope.row.fImage">
          </template>
        </el-table-column>
        <el-table-column prop="aName" label="活动" />
        <el-table-column prop="vName" label="场馆" />
        <el-table-column prop="eName" label="入口" />
        <el-table-column prop="tSeatingarea" label="座位区域" />
        <el-table-column prop="tRownumber" label="座位牌号" />
        <el-table-column prop="tSeat" label="座位号" />
        <el-table-column prop="tGrandstand" label="看台信息" />
        <el-table-column prop="temp" label="温度/℃ " />
        <el-table-column prop="healthCode" label="健康码状态 " />
        <el-table-column prop="autonym" label="真实姓名 " />
        <el-table-column prop="tIdentitycard" label="身份证" />
        <el-table-column prop="tQrcard" label="二维码" />
        <el-table-column prop="eDate" label="入场时间" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button> -->
            <el-button
              v-if="scope.row.vmEnable != '删除'"
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

    <!-- 创建场馆静态模态框 -->
    <el-dialog title="创建场馆" :visible.sync="dialogAddVisible">
      <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
        <el-form-item label="场馆名称" prop="vmName">
          <el-input v-model="addForm.vmName" />
        </el-form-item>
        <el-form-item label="场馆名称" prop="vmName">
          <el-input v-model="addForm.vmName" />
        </el-form-item>
        <el-form-item label="备注" prop="vmNote">
          <el-input v-model="addForm.vmNote" />
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="addForm.vmEnable" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="不启用" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="clearAddFrom()">默认</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { getByKeys, dekEnById, delByIds } from '@/api/es'
export default {
  data() {
    return {

      value6: '',
      startTime: '',
      addForm: {
        vName: '',
        eName: '',
        temp: '',
        healthCode: '',
        autonym: '',
        tIdentitycard: '',
        tQrcard: '',
        eDate: ''
      },
      eDates: '',
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        pagecount: 1,

        aName: '',
        vName: '',
        eName: '',
        temp: '',
        healthCode: '',
        autonym: '',
        tIdentitycard: '',
        tQrcard: '',
        eDate1: '',
        eDate2: ''
      },

      addFormrules: {
        vmName: [
          {
            required: true,
            message: '场馆名称不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        vmNote: [
          {
            required: true,
            message: '备注不能为空',
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
      this.page.eDate1 = this.eDates[0]
      this.page.eDate2 = this.eDates[1]
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

    handleClick(row) {
      console.log(row.aName)
    },

    handleDel(i, e) {
      const { eId } = e
      this.tabelLoading = true
      // eslint-disable-next-line no-undef
      dekEnById(eId).then(res => {
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
        ids = ids + this.selectData[index].eId
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
    clearAddFrom() {
      this.$refs.addForm.resetFields()
    },
    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false
        }
        // eslint-disable-next-line no-undef
        addVm(this.addForm).then(res => {
          this.init()
          this.dialogAddVisible = false
          console.log(res)
        })
      })
    },
    toAddBatch() {
      this.$router.push('/data/addticketingBatch')
    }
  }
}
</script>

