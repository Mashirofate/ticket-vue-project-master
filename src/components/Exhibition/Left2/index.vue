
<template>
  <div class="bg-img">
    <ve-histogram
      id="char"
      :legend-visible="false"
      :grid="grid"
      :theme="custheme"
      :data="chartData"
      width="370px"
      height="292px"
      :extend="extend"
      :title="title"
    />
  </div>
</template>

<script>
export default {

  props: {
    vaId: {
      type: String,
      default: 'null'
    }
  },
  data() {
    this.colors = ['#0AE2A4', '#217CC6']
    this.title = {
      text: '入场时各个入口的人数图'
    }
    this.grid = {
      top: 60,
      left: 40,
      right: 20,
      bottom: 37,
      borderWidth: 0,
      show: 'true'
    }
    this.extend = {
      series: {
        label: { show: true, position: 'top' }
      }
    }
    return {
      websock: null,
      chartData: {
        columns: ['入口', '数量'],
        rows: []
      },
      custheme: require('../../../styles/customed.json')
    }
  },
  watch: {
    vaId: function(value, oldValue) {
      this.initWebSocket(value)
    }
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(vaId) {
      //  const wsuri = 'ws://120.25.155.42:8080/RealTimeEntranceServer/' + vaId;
      const wsuri = 'ws://172.127.1.200:8080/RealTimeEntranceServer/' + vaId
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
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
      this.chartData.rows = redata
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
.bg-img {
  background-image: url("../../../assets/src_imgs/fr_04.png");
  height: 18.7rem;
  width: 24.5rem;
  margin: 0 auto;
  background-size:100% 100%;
  background-repeat:no-repeat;
  background-position: center;
  -webkit-font-smoothing: antialiased
}

#char {
  position: absolute;
  top: 12px
}
</style>
