<template>
  <div class="app-container">
    <el-card class="box-card">
      <h4>导入产品</h4>
      <el-divider />
      <h5>导入步骤</h5>
      <ul>
        <li>
          下载模板文件
          <el-button type="text" @click="downloadModel()">下载</el-button>，根据模板填写信息，头的顺序不可改变。
        </li>
        <li>
          上传填写后的数据文件
          <p>
            <!-- action="http://localhost:8080/ts/addBatch" -->
            <el-upload
              ref="upload"
              action="http://localhost:8080/ts/addBatch"
              在headers中设置写入token
              :headers="headers"
              :multiple="false"
              :auto-upload="false"
              :limit="1 "
              :data="{ aId: aId}"
              name="file"
              :on-success="onSuccess"
              :on-error="onError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </p>
        </li>
      </ul>
      <el-divider />
      <el-select v-model="aId" placeholder="请选择所属活动">
        <el-option
          v-for="(item, index) in openActivies"
          :key="index"
          :label="item.aName"
          :value="item.aId"
        />
      </el-select>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始导入</el-button>
    </el-card>
  </div>
</template>

<script>
import { getOpenActivies } from '@/api/va'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      openActivies: [],
      aId: '0',
      headers: {
        Token: getToken() // 获取token 需要 引入import { getToken } from '@/utils/auth';
      }
    }
  },
  watch: {
    openActivies: function(val, oldVal) {
      const first = this.openActivies[0]
      if (first) {
        this.aId = first.aId
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    onSuccess(esponse, file, fileList) {
      this.$message({
        message: '导入成功',
        type: 'success'
      })
    },
    // eslint-disable-next-line handle-callback-err
    onError(err, file, fileList) {
      this.$message.error('导入失败')
    },
    downloadModel() {
      window.location.href = 'http://127.0.0.1:8080/ts/model/download'
    },
    init() {
      getOpenActivies().then(res => {
        const { data } = res
        this.openActivies = data.list
      })
    }
  }
}
</script>

<style>
</style>
