<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <!--
        https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/
        https://jsonplaceholder.typicode.com/posts/

        上面的只是测试用的用于你自己没有后端的时候使用的，如果你有后端，就就换成后端接受文件的后端
      -->
      <el-form :inline="true" :rules="addFormrules" class="demo-form-inline" :size="'small'">
        <el-form-item label="上传照片">

          <el-upload
            action="http://192.168.31.68:8080/fr/search"
            list-type="picture-card"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="page.Image" :src="page.Image" class="avatar" width="148" height="148">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>

        </el-form-item>

        <el-form-item label="相似度" prop="similar">
          <el-select v-model="page.similar" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
          
        </el-form-item>

        <el-button  @click="onPosts">江门</el-button>
        <el-button  @click="onPosthuizou">惠州</el-button>
      </el-form>

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
        <el-table-column prop="fImage" label="照片">
          <template slot-scope="scope">
            <img v-if="scope.row.fImage" width="100" height="100" :src="scope.row.fImage">
          </template>
        </el-table-column>
        <el-table-column prop="aName" label="活动名称" width="100" />
        <el-table-column prop="vName" label="场馆名称" width="100" />
        <el-table-column prop="tSeatingarea" label="座位区域" width="100" />
        <el-table-column prop="tRownumber" label="座位牌号" width="100" />
        <el-table-column prop="tSeat" label="座位号" width="100" />
        <el-table-column prop="tGrandstand" label="看台信息" width="100" />
        <el-table-column prop="tQrcard" label="二维码信息" />
        <el-table-column prop="tIdentitycard" label="身份证信息" />
        <el-table-column prop="similar" label="相似度" />
        <el-table-column prop="temp" label="温度/℃ " />
        <el-table-column prop="eDate" label="创建时间" />

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
import { getByKeys ,getposts,gethuizou} from '@/api/fr'
export default {
  data() {
    return {

      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        similar: 0,
        Image: ''

      },
      record: [],
      options: [{
        value: '0',
        label: '0'
      }, {
        value: '0.1',
        label: '10%'
      }, {
        value: '0.2',
        label: '20%'
      }, {
        value: '0.3',
        label: '30%'
      }, {
        value: '0.4',
        label: '40%'
      }, {
        value: '0.5',
        label: '50%'
      }, {
        value: '0.6',
        label: '60%'
      }, {
        value: '0.7',
        label: '70%'
      }, {
        value: '0.8',
        label: '80%'
      }, {
        value: '0.9',
        label: '90%'
      }, {
        value: '1',
        label: '100%'
      }],
      addFormrules: {
        similar: [
          {
            required: true,
            message: '活动名称不能为空',
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
      this.tabelLoading = false
    },

    handleAvatarSuccess(res, file) {
      this.getBase64(file.raw).then(res => {
        this.page.Image = res
      })
    },

    worthys(current, size, newList, total) {
      this.page.current = current
      this.page.size = size
      this.page.records = newList
      this.page.total = total
      this.page.pagecount = Math.ceil(total / 10)
    },
    beforeAvatarUpload(file) {
      return true
    },

    currentChange(e) {
      const a = Math.ceil(this.page.total / this.page.size)
      if (e < a) {
        const newList = this.record.slice((e - 1) * this.page.size, this.page.size * e)
        console.log('c: ' + (e - 1) * this.page.size)
        this.worthys(e, this.page.size, newList, this.page.total)
      }
      if (e === a) {
        const c = (((e - 1) * this.page.size) + (this.page.total % this.page.size)) + 1
        const newList = this.record.slice((e - 1) * this.page.size, c)

        this.worthys(e, this.page.size, newList, this.page.total)
      }

      this.tabelLoading = false
    },
    onSubmit() {
      this.tabelLoading = true
      const { current, size, similar, Image } = this.page
      const form = {
        current: current,
        size: size,
        similar: similar,
        Image: Image
      }
      this.record = []
      getByKeys(form).then(res => {
        const { current, size, records, total } = res.data
        if (records != null) {
          this.record = records
          // slice() 方法可从已有的数组中返回选定的元素。
          // length：
          // length是js的原生方法，用于获取元素的个数和对象的长度
          // var length = $(obj).length;
          // size():
          // size()属于方法，只能作用于对象上，获取元素的个数
          // var size = $(obj).size();
          // 注：如果想要获取字符串的长度只能用length属性
          const newList = records.slice(current, size)
          this.worthys(current, size, newList, total)
        } else {
          // 该方法强迫浏览器刷新当前页面。
          // window.location.reload();
          // Object.assign(this.$data, this.$options.data())
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
    },
    onPosts() {
      this.tabelLoading = true
    
      this.record = []
      getposts(1).then(response => {
        var list = response.data.items
        if (list != null) {
          this.record = records
         
        } else {
        
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
    },
    onPosthuizou() {
      this.tabelLoading = true
    
      this.record = []
      gethuizou(1).then(response => {
        var list = response.data.items
        if (list != null) {
          this.record = records
         
        } else {
        
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
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

<style>
</style>
