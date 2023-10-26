<template>
  <div class="right-item">
      <div class="flip-number-t">
        <div class="flip-number-tit">人流量数据</div>
        <div class="flip-number-titts">People flow data</div>
      </div>
      <div class="right-item-matts">
        <div class="sup-up">
          <div class="sup-le">
            <div class="right-sup-image" :style="{'background': 'url('+require('../../../assets/入口人员.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ intraFieldsum }}</div>
              <div class="flip-number-suffix1">入场总人数</div>
            </div>
          </div>
          <div class="sup-le">
            <div class="right-sup-image" :style="{'background': 'url('+require('../../../assets/出口人员.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ typeOutCount }}</div>
              <div class="flip-number-suffix">出场总人数</div>
            </div>
          </div>
        </div>
        <div class="sup">
          <div class="sup-le">
            <div class="right-sup-image" :style="{'background': 'url('+require('../../../assets/身份证人员.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ realname }}</div>
              <div class="flip-number-suffix1">实名入场</div>
            </div>
          </div>
          <div class="sup-le">
            <div class="right-sup-image" :style="{'background': 'url('+require('../../../assets/无身份证人员.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ Norealname }}</div>
              <div class="flip-number-suffix">未实名入场</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flip-number-t"> 
        <div class="flip-number-tit">入口情况</div>
        <div class="flip-number-titts">Information by entry</div>
      </div>
      <div class="right-item-mattss">
          <div id="right-item-mattaxis" class="right-item-mattaxis"></div>
      </div>
      <div class="flip-number-t"> 
        <div class="flip-number-tit">入场年龄情况</div>
        <div class="flip-number-titts">Information by entry</div>
      </div>
      <div class="right-item-mattss">
          <div id="right-item-mattaxis-chu" class="right-item-mattaxis"></div>
      </div>
  </div>

</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Right',
  components: {
  },
  props: {
    activity: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      websock: null,
      enterImg: [],
      outImg: [],
      count: {},
      realname: null,
      Norealname: null,
      intraFieldsum: null,
      typeOutCount: null,
      enterListname:[],
      enterListvalue:[],
      outListname:[],
      outListvalue:[],
      ageListname:[],
      ageListvalue:[],

    }
  },
  computed: {
    ringDate: function() {
      const date = [
        {
        }

      ]
      return date
    }
  },
  watch: {
    activity: {
      handler: function(val, oldVal) {
        this.initWebSocket(val)
      },
      deep: true
    },
    intraFieldsum: function(value, oldValue) {
      this.remattaxis()
      this.remattaxischu()
    }


  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(value) {
       const wsuri = 'ws://172.127.1.200:8080/websocket/RealTimeEnterServer/' + value.aId
    //const wsuri = 'wss://www.zeantong.com:8080/RealTimeEnterServer/' + value.aId
      // console.log(wsuri);
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      // let actions = { test: "12345" };
      // this.websocketsend(JSON.stringify(actions));
      // this.$notify({
      //   title: '成功',
      //   message: '各个入口实时人数连接成功',
      //   type: 'success'
      // })
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data)
      this.enterImg = redata.enterImg
      this.outImg = redata.OutImg
      this.Norealname = redata.Norealname
      this.realname = redata.realname
      this.typeOutCount = redata.typeOutCount
      this.intraField = redata.intraField
      this.intraFieldsum = this.intraField + this.typeOutCount

      this.enterListname= redata.enterListname
      this.enterListvalue= redata.enterListvalue
      this.outListname= redata.outListname
      this.outListvalue= redata.outListvalue

      this.ageListname= redata.ageListname
      this.ageListvalue= redata.ageListvalue
    },
    websocketclose(e) {
    },

    remattaxis() {

          const myChart = echarts.init(document.getElementById('right-item-mattaxis'))
          let dataAxis = ['东门', '西门', '北门', '南门', '东门'];
let data = [220, 182, 191, 234, 290, ];
          myChart.setOption({
                        xAxis: {
                data: this.enterListname,
               
                axisTick: {
                  show: false
                },
                axisLine: {
                show: true,
                lineStyle: {
                    color: "rgb(165,230,230)",
                   
                    type: "solid"
                }
            },
              
                z: 20
              },
              yAxis: {
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {//y轴文字的配置
                textStyle: {
                     color: "rgb(165,230,230)",
                     margin: 15
                },
                },
                splitLine: {//分割线配置
                  show:true,
                  lineStyle: {
                    color:"rgba(207,207,207,0.1)"
                  }
                },

              },
              dataZoom: [
                {
                  type: 'inside'
                }
              ],
              series: [
                {
                  type: 'bar',
                  showBackground: true,
                  barWidth: '25%',
                  // itemStyle: {
                  //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //     { offset: 0, color: "rgba(51,234,255,0) "}, 
                  //     { offset: 0.5, color:" rgba(51,234,255,0.5)" },
                  //     { offset: 1, color:" rgba(51,234,255,1)" }
                  //   ])
                  // },
                  // emphasis: {
                  //   itemStyle: {
                  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //       { offset: 0, color: '#2378f7' },
                  //       { offset: 0.7, color: '#2378f7' },
                  //       { offset: 1, color: '#83bff6' }
                  //     ])
                  //   }
                  // },
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    formatter: '{c}人',//显示百分号
                    color: '#FF9F40'
                  },
                  itemStyle: {
                    normal: {
                //颜色渐变
               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#24F0E4"
              }, {
                offset: 1,
                color: "#1D82FF"
              }])
              }
                  },
                  data: this.enterListvalue
                }
              ]
          })

        },
remattaxischu() {

const myChart = echarts.init(document.getElementById('right-item-mattaxis-chu'))

myChart.setOption({
              xAxis: {
      data: this.ageListname,
     
      axisTick: {
        show: false
      },
      axisLine: {
      show: true,
      lineStyle: {
          color: "rgb(165,230,230)",
         
          type: "solid"
      }
  },
    
      z: 20
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {//y轴文字的配置
      textStyle: {
           color: "rgb(165,230,230)",
           margin: 15
      },
      },
      splitLine: {//分割线配置
        show:true,
        lineStyle: {
          color:"rgba(207,207,207,0.1)"
        }
      },

    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        barWidth: '25%',
        // itemStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     { offset: 0, color: "rgba(51,234,255,0) "}, 
        //     { offset: 0.5, color:" rgba(51,234,255,0.5)" },
        //     { offset: 1, color:" rgba(51,234,255,1)" }
        //   ])
        // },
        // emphasis: {
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: '#2378f7' },
        //       { offset: 0.7, color: '#2378f7' },
        //       { offset: 1, color: '#83bff6' }
        //     ])
        //   }
        // },
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          formatter: '{c}人',//显示百分号
          color: '#24F0E4'
        },
        itemStyle: {
          normal: {
      //颜色渐变
     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: "#FFFEC0"
    }, {
      offset: 1,
      color: "#FF9F40"
    }])
    }
        },
        data: this.ageListvalue
      }
    ]
})

},   
  }
}













</script>

<style lang="scss" scoped>
.right-item {
  display: flex;
  flex-direction:column;
  font-family: "Microsoft Yahei", Arial, sans-serif;
 
}

.right-item-matts {
  padding-left: 105px;
  padding-top: 50px;
  height: 260px;
}
.right-item-mattss {
  padding-left: 90px;
  width: 450px;
  height: 260px;
}
.right-item-mattaxis{
  height: 260px;
}



.rightItem2 {
  height: 540px;
}


.flip-number-t{
  display:flex;
  flex-direction:row;
  height: 60px;
  padding-left: 120px;
  align-items: center;
 

}
.flip-number-tit{
  display:flex;
  font-size: 20px;
  color: aliceblue;
  font-weight: normal;

 
}
.flip-number-titts{
  display:flex;
  font-size: 10px;
  color: #31484D;
  font-weight: normal;
  padding-left: 10px;
}


.right-sup-image{
  width: 55px; height: 55px;
}
.tit-chart-container{
  display: flex;
  flex-direction:column;
  padding-left: 10px;

}


.sup-up{
  display: flex;
  flex-direction:row;
}

.sup{
  display: flex;
  flex-direction:row;
}

.sup-le{
  display: flex;
  flex-direction:row;
  width: 175px;
  height: 83px;

}
.matts-tit{
   font-size: 20px;
   font-weight: bold;
    color: aliceblue;
    padding: 0px;

}


.flip-number-suffix1{
font-family: Microsoft Yahei;
 font-size: 12px;
  color:  rgb(165,230,230);
   align-self: flex-start;
   padding-top: 10px;
   text-align: start;
    
}


.flip-number-suffix{
font-family: Microsoft Yahei;
 font-size: 12px;
  color:  rgb(230,206,174);
   align-self: flex-start;
   padding-top: 10px;
}
</style>
