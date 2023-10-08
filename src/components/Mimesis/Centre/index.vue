<template>
  <div class="centre-page">
    <div class="flip-number-tit-centre-sup"> 进出口人流量实时走势</div>
    <div id="centreChart" class="centreChart-bar" />
    <div class="centreBelowChart-bar">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="flip-number-tad" label="进出口人流量占比" name="first">
          <div class="centreBelowChart-bar-pohio">
            <div id="enter-chars" class="centreBelowChart-bar-enter" />
            <div id="out-chars" class="centreBelowChart-bar-out" />
          </div>
        </el-tab-pane>

        <el-tab-pane label="区域座位人数" name="second">
         <div class="centreBelowChart-bar-pohios">
          <div id="sec-chars" class="sec-chars-enter" />
        </div>
        </el-tab-pane>
      
      </el-tabs>
      
    </div>
  </div>

</template>

<script>

export default {
  props: {
    activity: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      enterlist: [],
      outlist: [],
      timelist: [],
      eachexenterList: [],
      eachexoutList: [],
      activeName: 'first',
      SeatList:[],
      GrandList:[],
      GrandsList:[]
    }
  },
  watch: {
    activity: function(value, oldValue) {
      this.initWebSocket(value)
    },
    timelist: function(value, oldValue) {
      this.drawChart()
      this.enterChars()
      this.outChars()
      this.secChars()
    }

  },
  created() {

  },
  mounted() {

  },

  methods: {


    formats(prventage){
          return  prventage + "一楼看台"
    },

    handleClick(tab, event) {
        console.log(tab, event);
    },

    initWebSocket(value) {
     // const wsuri = 'ws://172.127.1.200:8080/RealTimeEntranceServer/' + value.aId
       const wsuri = 'ws://localhost:8080/RealTimeEntranceServer/' + value.aId
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      // this.$notify({
      //   title: '成功',
      //   message: '实时设备状态连接成功',
      //   type: 'success'
      // })
    },
    websocketonerror() {
      // this.$notify({
      //   title: '警告',
      //   message: '实时设备状态连接失败',
      //   type: 'warning'
      // })
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // this.chartData.rows.push(JSON.parse(e.data));
      // if (this.chartData.rows.length >= 20) {
      //   this.chartData.rows.shift();
      // }
    
      const redata = JSON.parse(e.data)
      this.enterlist = redata.enterlist
      this.outlist = redata.outlist
      this.timelist = redata.timelist
      this.eachexenterList = redata.EachexenterList
      this.eachexoutList = redata.EachexoutList
      this.SeatList =redata.SeatList
      this.GrandList =redata.GrandList
      this.GrandsList =redata.GrandsList

    },
    websocketclose(e) {
      // this.$notify({
      //   title: '警告',
      //   message: 'centre连接已关闭',
      //   type: 'warning'
      // })
      // // 关闭
      // console.log('断开连接', e)
    },

    drawChart() {
      const echarts = require('echarts')

      const myChart = echarts.init(document.getElementById('centreChart'))

      // var xAxisData = []
      // var data1 = []
      // var data2 = []
      // for (var i = 0; i < 100; i++) {
      //   xAxisData.push('A' + i)
      //   data1.push((Math.sin(i / 5) * (i / 10 - 9) + i / 6) * 5)
      //   data2.push((Math.cos(i / 5) * (i / 10 - 9) + i / 6) * 5)
      // }

      myChart.setOption({
        tooltip: {
          trigger: 'axis'

        },

        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }

          }
        },
        legend: {
          data: ['入场', '出场'],
          bottom: 'bottom',
          textStyle: {
            color: '#cccccc'
          }

        },
        xAxis: [
          {
            type: 'category',
            data: this.timelist,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc'
              }

            }
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },

            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc'
              }

            }
          }

        ],
        series: [
          {
            name: '入场',
            type: 'bar',
            data: this.enterlist,
            symbol: 'none',
            label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    formatter: '{c}人',//显示百分号
                  },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            color: 'rgb(36, 203, 255)'

          },
          {
            name: '出场',
            type: 'bar',
            data: this.outlist,
            symbol: 'none',
            label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    formatter: '{c}人',//显示百分号
                  },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            color: 'rgb(144, 0, 255)'

          }

        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      })
    },
    enterChars() {
      const echarts = require('echarts')

      const myChart = echarts.init(document.getElementById('enter-chars'))

      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        series: [
          {
            name: '各个入口情况',
            type: 'pie',
            radius: [27, 70],
            center: ['50%', '50%'],
            roseType: 'radius',
            avoidLabelOverlap: true,
            label: {
              normal: {
                formatter: '{b}: {c}人',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
            },
            color: ['#24cbff', '#cb00ff', '#5c4ac9', '#7b1d8c', '#484cdc'],
            data: this.eachexenterList.sort(function(a, b) {
              return b.value - a.value
            })
          }
        ]
      })
    },
    outChars() {
      const echarts = require('echarts')

      const myChart = echarts.init(document.getElementById('out-chars'))

      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        series: [
          {
            name: '各个出口情况',
            type: 'pie',
            radius: [27, 70],
            center: ['50%', '50%'],
            roseType: 'radius',
            avoidLabelOverlap: true,
            label: {
              normal: {
                // formatter: '{b}: {d}%',
                formatter: '{b}: {c}人',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
            },
            color: ['#24cbff', '#cb00ff', '#5c4ac9', '#7b1d8c', '#484cdc'],
            data: this.eachexoutList.sort(function(a, b) {
              return b.value - a.value
            })
          }
        ]
      })
    },

    secChars() {
      const echarts = require('echarts')

      const myChart = echarts.init(document.getElementById('sec-chars'))

      myChart.setOption({
      

      series: [
        {
          type: 'treemap',
          data: this.GrandList,
          breadcrumb:{  //底层显示层级关系的面包屑,默认开启
            show:false
          },
        },
        
      ],
      tooltip: {
   formatter: function (GrandList) {
          var str = '';
          return str.concat(GrandList.name  + '：', GrandList.value+ '人');
      }
    },
    label: {
      formatter: function (a) {
          var str = '';
          return str.concat(a.name  + '：', a.value+ '人');
      }
   },
   color:['#00BBF9 ','#3185FC','#5DADE2',"#23C5BC ",'#0FFF0',"#2471A3"]
    })
    },
    
    colors(){
      var color = ''
        var mun = (entrance / sum) * 10000

        // console.log('id:' + id + ' entrance' + entrance + ' sum' + sum + ' mun' + mun)
        if (mun < 50) {
          color = '#0AE2A4'
          this.colors(id, color)
        } else if (mun < 70) {
          color = '#0DB0FF'
          this.colors(id, color)
        } else if (mun < 90) {
          color = '#1AE9F0'
          this.colors(id, color)
        } else if (mun < 100) {
          color = '#FFA340'
          this.colors(id, color)
        } else if (mun >= 100) {
          color = '#FF1801'
          this.colors(id, color)
        }
      },

      colorss(id, new_color) {
      var obj = document.getElementById(id)

      obj.setAttribute('style', 'fill:' + new_color)
    }
    },

    

    
    // outChars() {
    //   const echarts = require('echarts')

    //   const myChart = echarts.init(document.getElementById('out-chars'))

    //   myChart.setOption({

    //     title: {
    //       text: 'Customized Pie',
    //       left: 'center',
    //       top: 20,
    //       textStyle: {
    //         color: '#ccc'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     visualMap: {
    //       show: false,
    //       min: 80,
    //       max: 600,
    //       inRange: {
    //       }
    //     },
    //     series: [
    //       {
    //         name: 'Access From',
    //         type: 'pie',
    //         radius: '55%',
    //         center: ['50%', '50%'],
    //         data: [
    //           { value: 8244, name: '一号门' },
    //           { value: 4732, name: '二号门' },
    //           { value: 3453, name: '三号门' },
    //           { value: 1500, name: '四号门' },
    //           { value: 4000, name: 'Search Engine' }
    //         ].sort(function(a, b) {
    //           return b.value - a.value
    //         }),
    //         roseType: 'radius',
    //         label: {

    //         },
    //         labelLine: {
    //           lineStyle: {
    //           },
    //           smooth: 0.2,
    //           length: 10,
    //           length2: 20
    //         },

    //         color: ['#24cbff', '#cb00ff', '#5c4ac9', '#7e1d8c', '#484cdc'],
    //         animationType: 'scale',
    //         animationEasing: 'elasticOut',
    //         animationDelay: function(idx) {
    //           return Math.random() * 200
    //         }
    //       }
    //     ]
    //   })
    // }
  
}

</script>

<style>

.centre-page{
  display:flex;
  flex-direction:column;
}
.centreChart-bar{
  width: 880px;
  height: 406px;

}
.centreBelowChart-bar{
  width: 880px;
  height: 400px;
  display:flex;
  flex-direction:column;
}

.centreBelowChart-bar-pohio{
  width: 880px;
  height: 400px;
  display:flex;
  flex-direction:row;
}
.centreBelowChart-bar-enter{
  z-Index:15;
  width: 440px;
  height: 400px;
}
.centreBelowChart-bar-out{
   z-Index:15;
  height: 400px;
  width: 440px;
}
.centreBelowChart-bar-pohios{
  width: 880px;
  height: 400px;
  display:flex;
  flex-direction:row;
}

.sec-chars-enter{
  z-Index:15;
  width: 880px;
  height: 400px;
}



.sec-chars-top{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 12px;
  color: rgb(154, 168, 212);
  font-weight: normal;
  text-align: center;
  z-Index:15;
  width: 240px;
  height: 400px;
}

.flip-number-tit-centre-sup{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
}
.flip-number-tad{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
}

.el-tabs__item{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  
}
.grid-contents{
  margin-block-end:0rem;
  margin-block-start:0rem;
}
.grid-content-bg-purple{

  border-bottom: 2px solid rgb(154, 168, 212); 
}

.el-tabs__active-bar {
  border-bottom: 2px solid rgb(154, 168, 212);
}

.el-tabs__item.is-active {
  color: rgb(154, 168, 212);
}


</style>
