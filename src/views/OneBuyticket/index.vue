<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">

        <!-- <el-form-item label="活动">
           <el-input v-model="page.aName" placeholder="活动名称" />
        </el-form-item> -->
        <el-form-item label="活动">
          <el-select v-model="page.value" placeholder="请选择">
            <el-option
              v-for="item in activity"
              :key="item.aId"
              :label="item.aName"
              :value="item.aId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="电话号码">
          <el-input v-model="page.telephone" placeholder="电话号码" />
        </el-form-item>
        <el-form-item label="二维码">
          <el-input v-model="page.tQrcard" placeholder="二维码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
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
        :data="page.records"
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column prop="aName" label="活动" />
        <el-table-column prop="autonym" label="真实姓名 " />
        <el-table-column prop="tIdentitycard" label="身份证" />
        <el-table-column prop="tQrcard" label="电话" />

        <div id="print_demo">
          <barcode
            :value="this.tQrcards"
            :options="{ widht:100,height:50,
                        background:'rgba(255,255,255,.0)'}"
          />
        </div>
        <el-table-column prop="tQrcard" label="二维码" />
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button
              v-print="'#print_demo'"
              size="mini"
              type="danger"
            >打印</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

import { getByKeys, getByNames } from '@/api/bk'
export default {
  data() {
    return {

      tabelLoading: true,
      selectData: [],
      activity: [],
      tQrcards: '',
      page: {
        records: [],

        value: '',
        tQrcard: '',
        telephone: ''
      },

      addFormrules: {
        telephone: [
          {
            required: true,
            message: '电话不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        tQrcard: [
          {
            required: true,
            message: '二维码不能为空',
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
      getByNames().then(res => {
        const { data } = res
        this.activity = data
        this.page.records = [{ aName: '选项1', autonym: '选项1', tIdentitycard: '选项1', tQrcard: '选项1' }]
      })
    },
    onSubmit() {
      const { value, tQrcard, telephone } = this.page
      getByKeys({ value, tQrcard, telephone }).then(res => {
        const { data } = res
        this.page.records = data

        for (var key in data[0]) {
          if (key === 'tQrcard') {
            this.tQrcards = data[0][key]
          }
        }

        //  = this.page.records.tQrcard
        console.log('测试this.tQrcards:' + this.tQrcards)
      })
    },
    handleDelete(index, row) {
      console.log('测试' + index, row)
      window.print()
    }
  }

}
</script>

