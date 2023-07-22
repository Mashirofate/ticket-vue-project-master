<template>
  <div>
    <ve-liquidfill :data="chartData" style="margin-top:-80px" :settings="chartSettings" />
    <div style="padding-left:50px;color: #89d6fd;margin-top:-80px; text-align:cente; font-size:13px">
      入场温度异常人数：{{ tempint }} (人次)
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tempchartInt: {
      type: Array,
      default: () => []
    }
  },

  data() {
    this.chartSettings = {
      //  wave: [0.5, 0.3, 0.1], 分层
      seriesMap: {
        '占总入场人次比': {
          color: ['red', 'green', 'yellow'],
          itemStyle: {
            opacity: 0.6

          },
          emphasis: {
            itemStyle: {
              opacity: 0.9
            }
          },
          center: ['50%', '50%'],
          radius: '60%',

          outline: {
            show: true,
            itemStyle: { borderColor: '#299bf1' },
            borderDistance: 10
          }
        }

      }
    }

    return {
      date: 0,
      liquidPlot: null,
      tempint: 0,
      tempnumber: 0,
      chartData: {
        columns: ['city', 'percent'],
        rows: [{
          city: '占总入场人次比',
          percent: 0.00
        }]
      }
    }
  },

  watch: {
    tempchartInt: function(val, oldVal) {
      this.drawChart(val)
    }
  },

  methods: {
    drawChart(val) {
      let c = val[0]['temp'] / val[0]['headcount']
      this.tempint = val[0]['temp']
      if (isNaN(c)) {
        c = 0
      }

      const list = []

      var myObj = {}

      myObj.columns = ['city', 'percent']
      myObj.rows = list
      var myObj1 = {}
      myObj1.city = '占总入场人次比'
      myObj1.percent = c
      list.push(myObj1)

      this.chartData = myObj
    }

  }
}
</script>
<style scoped>
</style>
