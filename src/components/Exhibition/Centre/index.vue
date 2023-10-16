<template>
  <div class="centre-page">
    
    <div class="flip-number-tit-centre-sup">   
  
   

    <dv-border-box-1>
      <div  class="centreChart-bar1"  >
        <div id="mapChart" ref="mapChart" class="chinaecharts" ></div>
        <!-- <echars_china :a-id="this.aId" /> -->
        </div>

  </dv-border-box-1>
</div>

    <div class="centreBelowChart-bar">
      <dv-decoration-10 style="width:100%;height:5px;" />

     
          <div id="centreChart" class="centreChart-bar" />
       
    </div>
  </div>

</template>

<script>
import echars_china from './echars_china'

export default {
  components: {
    echars_china
  },
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
      GrandsList:[],
      listmap:[]
    }
  },
  watch: {
    activity: function(value, oldValue) {
      this.initWebSocket(value)
    },
    timelist: function(value, oldValue) {
      this.drawChart();
      this.mapFn();
    }

  },
  created() {

  },
  mounted() {
    
  },

  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },

    initWebSocket(value) {
     const wsuri = 'ws://127.0.0.1:8080/RealTimeEntranceServer/' + value.aId
     //   const wsuri = 'wss:///www.zeantong.com:8080/RealTimeEntranceServer/' + value.aId
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
    },
    websocketonerror() {
      this.initWebSocket()
    },
    websocketonmessage(e) {
      const redata = JSON.parse(e.data)
      this.enterlist = redata.enterlist
      this.outlist = redata.outlist
      this.timelist = redata.timelist
      this.eachexenterList = redata.EachexenterList
      this.eachexoutList = redata.EachexoutList
      this.SeatList =redata.SeatList
      this.GrandList =redata.GrandList
      this.GrandsList =redata.GrandsList
      this.listmap =redata.listmap

    },
    websocketclose(e) {
    },

    drawChart() {
      const echarts = require('echarts')

      const myChart = echarts.init(document.getElementById('centreChart'))

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
            // itemStyle: {
                  //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //     { offset: 0, color: "rgba(51,234,255,0) "}, 
                  //     { offset: 0.5, color:" rgba(51,234,255,0.5)" },
                  //     { offset: 1, color:" rgba(51,234,255,1)" }
                  //   ])
                  // },
            label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    formatter: '{c}人',//显示百分号
                    color: '#FF9F40'
                  },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            color: '#33EAFF'

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
                    color: '#33EAFF'
                  },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            
            color: '#FF9F40'
        
          }

        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      })
    },
  
    mapFn() {
            // 基于准备好的dom，初始化echarts实例
            // var mapChart = this.$echarts.init(this.$refs.mapChart);
            var mapChart = this.$echarts.init(
                document.getElementById("mapChart")
            );
            mapChart.setOption({
                backgroundColor: "", //背景颜色
                title: {
                    text: "",
                    subtext: "",
                    color: "aliceblue",
                    x: "center",
                },
                //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                visualMap: {
                    // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
                    type: "piecewise", // 类型为分段型
                    top: "bottom",
                    calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                    right: 10,
                    splitNumber: 6,
                    seriesIndex: [0],
                    itemWidth: 20, // 每个图元的宽度
                    itemGap: 2, // 每两个图元之间的间隔距离，单位为px
                    pieces: [
                        // 自定义每一段的范围，以及每一段的文字
                        { gte: 10000, label: "10000人以上", color: "#1890FF" }, // 不指定 max，表示 max 为无限大（Infinity）。
                        {
                            gte: 1000,
                            lte: 9999,
                            label: "1000-9999人",
                            color: "#83C2FF",
                        },
                        {
                            gte: 500,
                            lte: 999,
                            label: "500-999人",
                            color: "#CDE5FF",
                        },
                        {
                            gte: 100,
                            lte: 499,
                            label: "100-499人",
                            color: "#E6F1FF",
                        },
                        {
                            gte: 1,
                            lte: 99,
                            label: "1-99人",
                            color: "#EBF3FF",
                        },
                        { lte: 0, label: "无", color: "#FAFAFA" }, // 不指定 min，表示 min 为无限大（-Infinity）。
                    ],
                    textStyle: {
                        color: "#737373",
                    },
                },
                // 提示框，鼠标移入
                tooltip: {
                    show: true, //鼠标移入是否触发数据
                    trigger: "item", //出发方式
                    formatter: "{b}-人数：{c}人",
                },
                //配置地图的数据，并且显示
                series: [
                    {
                        name: "地图",
                        type: "map", //地图种类
                        map: "china", //地图类型。
                        data: this.listmap,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //默认是否显示省份名称
                                    color:"#525252",
                                    fontWeight:'bold'
                                },
                                areaStyle: {
                                    color: "#FAFAFA", //默认的地图板块颜色
                                },
                                borderWidth: 1,
                                borderColor: "#D9D9D9",
                            },
                            //地图区域的多边形 图形样式。
                            emphasis: {
                                label: {
                                    show: true, //选中状态是否显示省份名称
                                },
                                areaStyle: {
                                    color: "#FFD147", //选中状态的地图板块颜色
                                },
                            },
                        },
                        zoom: 1, //放大比例
                        label: {
                            //图形上的文本标签，可用于说明图形的一些数据信息
                            show: true,
                        },
                    },
                    {
                        type: "scatter",
                        showEffectOn: "render", //配置什么时候显示特效
                        coordinateSystem: "geo", //该系列使用的坐标系
                        symbolSize: 10, //标记的大小
                        data: [{ name: "宜昌", value: [111.3, 30.7, 130] }],
                        zlevel: 99999,
                    },
                ],
            }),
            window.addEventListener("resize", () => {
                    // 自动渲染echarts
                    mapChart.resize();
            });
        },
    },

}

</script>

<style>

.centre-page{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  display:flex;
  flex-direction:column;
}
.centreChart-bar1{
  width: 980px;
  height: 520px;

}
.centreChart-bar{
  width: 980px;
  height: 400px;

}
.centreBelowChart-bar{
  width:980px;
  height: 400px;
  display:flex;
  flex-direction:column;
}

.centreBelowChart-bar-pohio{
  width: 880px;
  height: 320px;
  display:flex;
  flex-direction:row;
}
.centreBelowChart-bar-enter{
  z-Index:15;
  width: 440px;
  height: 320px;
}
.centreBelowChart-bar-out{
   z-Index:15;
  height: 320px;
  width: 440px;
}
.centreBelowChart-bar-pohios{
  width: 880px;
  height: 320px;
  display:flex;
  flex-direction:row;
}

.sec-chars-enter{
  z-Index:15;
  width: 880px;
  height: 400px;
}


.flip-number-tit-centre-sup{
  font-size: 22px;
  color:aliceblue;
  font-weight: normal;
  align-items: center;
  padding-top: 10px;
}
.flip-number-tad{
  font-size: 22px;
  color:aliceblue;
  font-weight: normal;
}

.el-tabs__item{
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
.chinaecharts {
    width: 100%;
    height: 500px;
}

</style>
