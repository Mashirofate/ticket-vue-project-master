<template>
  <div class="left-item">

    <div class="div-item">
      <el-card class="centerIt">
        <leftItem1 :intra-field="intraField" :a-employeenumber="aEmployeenumber" :a-ticketnumber="aTicketnumber" class="leftItem1" />
      </el-card>
    </div>

    <div class="div-item">
      <el-card class="centerIt">
        <leftItem2 :count="count" :type-out-count="typeOutCount" class="leftItem2" />
      </el-card>
    </div>
    <div class="div-item">
      <el-card class="centerIt">
        <leftItem3 :enter-img-abnormals="enterImgAbnormals" class="leftItem3" />
      </el-card>
    </div>
  </div>
</template>

<script>
import leftItem1 from './Item1/index'
import leftItem2 from './Item3/index'
import leftItem3 from './Item4/index'
export default {
  name: 'Left1',
  components: {
    leftItem1,
    leftItem2,
    leftItem3
  },
  props: {
    activity: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      websock: null,
      count: {},
      intraField: null,
      typeOutCount: null,
      aTicketnumber: null,
      aEmployeenumber: null,
      enterImgAbnormals: null
    }
  },

  watch: {
    activity: {
      handler: function(val, oldVal) {
        this.initWebSocket(val)
      },
      deep: true
    }
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(val) {
      // const wsuri = 'ws://120.25.155.42:8080/RealTimeOtherServer/' + val.aId;
      const wsuri = 'ws://172.127.1.200:8080/RealTimeOtherServer/' + val.aId
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
      // 工作证总数和票务总数
      this.aEmployeenumber = val.aEmployeenumber
      this.aTicketnumber = val.aTicketnumber
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      // let actions = { test: "12345" };
      // this.websocketsend(JSON.stringify(actions));
      this.$notify({
        title: '成功',
        message: '各个入口实时人数连接成功',
        type: 'success'
      })
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data)
      // console.log(redata);
      this.count = redata.typeenterCount
      this.typeOutCount = redata.typeOutCount
      this.intraField = redata.intraField
      this.enterImgAbnormals = redata.enterImgAbnormal
    },
    websocketclose(e) {
      this.$notify({
        title: '警告',
        message: '各个入口实时人数已关闭',
        type: 'warning'
      })
      // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>

<style scoped>
.left-item {
/* background-image: url("../../../assets/src_imgs/background/4.png"); */
  background-size: 100% 100%;
  display: flex;
  width: 25.7rem;
  flex-direction:column;
}
.leftItem1{
  margin-bottom: 1rem;
}
.leftItem2{
  margin-bottom: 1rem;
}
.leftItem3{
  margin-top: 1rem;
}

.centerIt{
  background-color:transparent;
}

</style>
