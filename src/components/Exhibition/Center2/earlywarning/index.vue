<template>
  <div>
    <ve-liquidfill :data="chartData" style="margin-top:-80px" :settings="chartSettings" />
    <div style="padding-left:70px;color: #89d6fd;margin-top:-80px; text-align:cente; font-size:13px">
      场内入场人数预警
    </div>
  </div>
</template>

<script>

export default {
  props: {
    intraField: {
      type: Number,
      default: 0
    },
    aTicketnumber: {
      type: Number,
      default: 0
    },
    aEmployeenumber: {
      type: Number,
      default: 0
    }
  },

  data() {
    this.chartSettings = {
      //  wave: [0.5, 0.3, 0.1], 分层
      seriesMap: {
        '场内人数占预设总人数比': {
          color: ['green', 'yellow', 'red'],
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
          city: '场内人数占预设总人数比',
          percent: 0.00
        }]
      }
    }
  },

  watch: {
    intraField: function(val, oldVal) {
      this.drawChart(val)
    }
  },

  methods: {
    drawChart(val) {
      let c = val / (this.aTicketnumber + this.aEmployeenumber)
      if (isNaN(c)) {
        c = 0
      }
      console.log('C:' + c)
      if (c < 0) {
        c = 0
      }

      const list = []

      var myObj = {}

      myObj.columns = ['city', 'percent']
      myObj.rows = list
      var myObj1 = {}
      myObj1.city = '场内人数占预设总人数比'
      myObj1.percent = c
      list.push(myObj1)

      this.chartData = myObj

      if (c >= 0.9) {
        this.chartSettings = {
          seriesMap: {
            '场内人数占预设总人数比': {
              color: ['red', 'yellow'],
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
      }
      if (c < 0.9) {
        this.chartSettings = {
          //  wave: [0.5, 0.3, 0.1], 分层
          seriesMap: {
            '场内人数占预设总人数比': {
              color: ['green', 'yellow', 'red'],
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
      }
    }

  }
}
</script>
