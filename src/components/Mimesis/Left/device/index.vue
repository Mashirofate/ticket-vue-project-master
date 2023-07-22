<template>
  <div class="mainpagess">
    <el-row :gutter="20">
      <el-col v-for="(item) in unitState" :key="item.classId" :span="7" :offset="1">
        <div class="grid-content bg-purple" style="margin-top:15px">

          <span :class="[item.dEnable== '在线' ? 'oranges': '', item.dEnable=='离线'? 'blue': '']">{{ item.eName }}: {{ item.dIp }}</span>
          <!-- <span :class="[item.state== '在线' ? 'oranges': '', item.state=='离线'? 'blue': '']">{{ item.messages }}: {{ item.message }}</span> -->

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { synchrodata } from '@/api/de'

export default {
  components: {
  },
  props: {
    aId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      unitState: [],
      loadingbut: false,
      loadingbuttext: '同步数据'
    }
  },

  watch: {
    aId: function(value, oldValue) {
      this.initWebSocket(value)
    }
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(value) {
      //  const wsuri = 'ws://120.25.155.42:8080/RealTimePeopleServer/' + value.aId;
      const wsuri = 'ws://localhost:8080/UnitTypeTimeService/' + value
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      this.$notify({
        title: '成功',
        message: '实时设备状态连接成功',
        type: 'success'
      })
    },
    websocketonerror() {
      this.$notify({
        title: '警告',
        message: '实时设备状态连接失败',
        type: 'warning'
      })
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // this.chartData.rows.push(JSON.parse(e.data));
      // if (this.chartData.rows.length >= 20) {
      //   this.chartData.rows.shift();
      // }
      const redata = JSON.parse(e.data)
      this.unitState = redata.unitState
    },
    websocketclose(e) {
      this.$notify({
        title: '警告',
        message: '各个入口设备状态连接已关闭',
        type: 'warning'
      })
      // 关闭
      console.log('断开连接', e)
    },
    handleCreate() {
      this.loadingbut = true
      this.loadingbuttext = '同步数据中...'
      synchrodata(this.unitState).then(res => {
        this.$message({
          showClose: true,
          message: '同步数据成功',
          type: 'success'

        })
        this.loadingbut = false
        this.loadingbuttext = '同步数据'
      })
    }
  }
}
</script>
<style>
  .el-col {
    border-radius: 4px;
  }

.mainpagess {
 width: 450px;
 height: 440px;
 margin-left: 20px;
 background-color: rgba(102,102,102, 0.2);

}

.time {
font-size: 13px;
color: #999;
}

.oranges {
	color: rgb(36, 203, 255);
}

.blue {
 color: rgb(203,0,255);
}
</style>
