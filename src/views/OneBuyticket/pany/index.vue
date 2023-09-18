<template>
  <div class="app-container">

  <div v-for=" (item,i)  in this.records"  class="text item">
    <el-card class="box-card" >
      <!-- ID：{{item.aId}} -->
      <!-- <el-button type="text"  @click='add(i)'> 活动：{{item.aName }}</el-button> -->
      <el-button type="text"  @click='handleClick(item.aId)'> 活动：{{item.aName }}</el-button>

      <company  :aIdValue='item.aId' ref="company" @children="parentCompany"></company>

    </el-card>
  </div>


 


  </div>
</template>

<script>
import { getByKeys,  desccId, } from '@/api/bt';

import company from "./company.vue";

export default {

  components:{
    company,
  },

  data() {
    return {

 

      dialogStatus: '',
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      aName:'',
      aid:'',

     
      records: [],

      
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tabelLoading = true
      getByKeys().then(res => {
        const { } = res.data
        this.records = res.data
      })

    },


    currentChange(e) {
      this.page.current = e
      this.init()
    },
    onSubmit() {
      this.init()
    },

    // 弹出对话框
    add(i) {
      this.$refs.company[i].showDialog()
    },
      // 子组件传值给父组件-公司
    parentCompany(obj) {
      // 打印子组件传递的值
      console.log("parentCompany",obj)
    },

    handleClick(i){
      this.$router.push({ 
        path: "/buyticket/crs",
        query:{
          aId:i,
        }
      });
    }

  },




  
}
</script>


<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 300px;
  }
  
</style>