<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">


          <el-select v-model="value" placeholder="请选择活动"  @change ="getvaluemethod">
            <el-option
              v-for="item in this.page.records"
              :key="item.aId"
              :label="item.aName"
              :value="item.aId"
            />
          </el-select>
          
 

        <el-button  @click="onPosts">江门</el-button>
        <el-button  @click="onPosthuizou">惠州</el-button>
        <el-button  @click="onapplet">小程序</el-button>
        <el-button  @click="onEntryrecord">上传入场记录</el-button>
 

    </el-card>
  
  </div>
</template>

<script>
import { getByKeys ,getposts,gethuizou,  getapplet,getEntryrecord} from '@/api/fr'
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
        Image: ''

      },
      record: [],
      value: '',
      aid:null,
      
    }
  },
  created() {
    this.init()
  },
 
  methods: {
    init() {
      this.tabelLoading = false,
      getByKeys(1).then(res => {
        const { current, size, records, total } = res.data
        this.page.current = current
        this.page.size = size
        this.page.records = records
        this.page.total = total
        this.page.pagecount = Math.ceil(total / 10)
        this.tabelLoading = false
      })
    },

    getvaluemethod: function(event) {
				//获取当前选中的值，并重新赋值
      //console.log('value', event);
			this.aid = event;
		},
    
    onPosts() {
      this.tabelLoading = true
    
      this.record = []
      getposts(this.aid).then(response => {
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
      gethuizou(this.aid).then(response => {
        var list = response.data.items
        if (list != null) {
          this.record = records
         
        } else {
        
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
    },
  
    onapplet() {
      this.record = []
      var a= this.aid
      console.log("a :"+a )
      getapplet(a).then(response => {
        var list = response.data.items
        if (list != null) {
          this.record = records
         
        } else {
        
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
    },

    onEntryrecord() {
      this.record = []

      getEntryrecord(this.aid).then(response => {
        var list = response.data.items
        if (list != null) {
          this.record = records
         
        } else {
        
          this.worthys(1, 10, null, 0)
        }
        this.tabelLoading = false
      })
    },
  


  }
}

</script>

<style>
</style>
