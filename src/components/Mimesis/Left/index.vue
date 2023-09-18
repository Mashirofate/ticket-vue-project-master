<template>
  <div class="page">
    <div class="flip-number" style="flex-direction: column;">
      <div class="flip-number-tit">场内实时总人数</div>
      <div class="flip-number-number" style="align-self: center;">

        <div v-for="(item,index) of this.intraFieldString" :key="index">
          <div class="flip-single-number"> {{ item }}</div>
        </div>

      </div>
      <div class="flip-numbers-number">
        <div class="flip-number-tits">工作证入场人数</div>
        <div class="flip-numbers-numbers" style="align-self: center;">
            <div v-for="(item,index) of this.workString" :key="index">
            <div class="flip-single-numbers"> {{ item }}</div>
          </div>
        </div>
      </div>


      <div class="flip-number-number-picture">
        <div class="flip-number-tit">场内入场人数预警</div>
        <div id="echartsBar" style="width: 448px;height: 70px" class="flip-number-number-picture-bar" />
      </div>
      <div class="flip-number-number-device">
        <div class="flip-number-tit">人员区域分布情况</div>
        <div class="rightItem1">
          <dev :a-id="this.aId" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import dev from './device/index'

export default {
  components: {
    dev
  },
  props: {
    activity: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      aId: null,
      intraField: 0,
      anumber: 0,
      intraFieldString: '0000000',
      numList: [],
      work:0,
      workString: '00000',
    }
  },

  watch: {
    activity: function(value, oldValue) {
      this.initWebSocket(value)
    },
    intraField: function(value, oldValue) {
      let excessive = this.intraField.toString()
      if (excessive.length < 7) {
        let index = excessive.length
        for (index; index < 7; index++) {
          excessive = '0' + excessive
        }
      }

      this.intraFieldString = excessive

      let alist = (this.intraField / this.anumber) * 100
      alist = alist.toFixed(0)
      const Listsum = [alist]
      this.echartsBarInit(Listsum)
    },
    work: function(value, oldValue) {
      let excessive = this.work.toString()
      if (excessive.length < 5) {
        let index = excessive.length
        for (index; index < 5; index++) {
          excessive = '0' + excessive
        }
      }

      this.workString = excessive


    }

  },
  mounted() {
    // this.$nextTick(function() {
    //   this.echartsBarInit()
    // })

  },
  methods: {
    echartsBarInit(val) {
      this.chart = Echarts.init(document.getElementById('echartsBar'))// 初始化echarts实例

      this.chart.setOption(// 通过setOption来生成柱状图
        {
          grid: { // 直角坐标系内绘图网格
            left: '0', // grid 组件离容器左侧的距离,
            // left的值可以是80这样具体像素值，
            // 也可以是'80%'这样相对于容器高度的百分比
            top: '20',
            right: '0',
            bottom: '0',
            containLabel: true // gid区域是否包含坐标轴的刻度标签。为true的时候，
            // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
            // 所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
          },
          xAxis: { // 直角坐标系grid中的x轴,
            // 一般情况下单个grid组件最多只能放上下两个x轴,
            // 多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
            type: 'value', // 坐标轴类型,分别有：
            // 'value'-数值轴；'category'-类目轴;
            // 'time'-时间轴;'log'-对数轴
            splitLine: { show: false }, // 坐标轴在 grid 区域中的分隔线
            axisLabel: { show: false }, // 坐标轴刻度标签
            axisTick: { show: false }, // 坐标轴刻度
            axisLine: { show: false }// 坐标轴轴线
          },
          yAxis: {
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: 'black',
              fontSize: 36
            },
            data: ['']// 类目数据，在类目轴（type: 'category'）中有效。
            // 如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
          },
          series: [// 系列列表。每个系列通过 type 决定自己的图表类型
            {
              name: '%', // 系列名称
              type: 'bar', // 柱状、条形图
              barWidth: 10, // 柱条的宽度,默认自适应
              data: val, // 系列中数据内容数组
              label: { // 图形上的文本标签
                show: true,
                position: 'right', // 标签的位置
                offset: [0, -20], // 标签文字的偏移，此处表示向上偏移40
                formatter: '{c}{a}', // 标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                color: 'rgb(255, 255, 255)', // 标签字体颜色
                fontSize: 24, // 标签字号
                fontWeight: 'bold',
                fontFamily: 'Microsoft Yahei'
              },
              itemStyle: {// 图形样式
                normal: { // normal 图形在默认状态下的样式;
                  // emphasis图形在高亮状态下的样式
                  barBorderRadius: 10, // 柱条圆角半径,单位px.
                  // 此处统一设置4个角的圆角大小;
                  // 也可以分开设置[10,10,10,10]顺时针左上、右上、右下、左下
                  color: new Echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [{
                      offset: 0,
                      color: 'rgb(36, 203, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(144, 0, 255)'
                    }
                    ]
                  )
                }
              },
              zlevel: 1// 柱状图所有图形的 zlevel 值,
              // zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
            },
            {
              name: '进度条背景',
              type: 'bar',
              barGap: '-100%', // 不同系列的柱间距离，为百分比。
              // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
              // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
              // 并且是对此坐标系中所有 'bar' 系列生效。
              barWidth: 10,
              data: [100],
              color: 'rgba(255, 255, 255, 0.04)', // 柱条颜色
              itemStyle: {
                normal: {
                  barBorderRadius: 10
                }
              }
            }
          ]
        }
      )
    },
    initWebSocket(value) {
       const wsuri = 'ws://172.127.1.200:8080/RealTimeOtherServer/' + value.aId
      // const wsuri = 'ws://localhost:8080/RealTimeOtherServer/' + value.aId
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
      // 活动预设工作证总数和票务总数
      this.anumber = value.aEmployeenumber + value.aTicketnumber

      this.aId = value.aId
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
      this.intraField = redata.intraField
      this.work = redata.work
    },
    websocketclose(e) {
      // this.$notify({
      //   title: '警告',
      //   message: 'centre连接已关闭',
      //   type: 'warning'
      // })
      // // 关闭
      // console.log('断开连接', e)
    }

  }
}

</script>

<style>

.flip-number{
  display:flex;
  flex-direction: row;
  font-family: "Microsoft Yahei", Arial, sans-serif;
}
.flip-number-number{
  display:flex;
  flex-direction: row;
}

.flip-numbers-numbers{
  display:flex;
  flex-direction: row;
  margin-left: 90px;

}

.flip-numbers-number{
  display:flex;
  flex-direction: row;
  margin-top: 30px;

}
.flip-number-tit{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
  margin-left: 20px;
  margin-bottom: 10px;
}
.flip-number-tits{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
  margin-left: 20px;
  margin-top: 20px;
}
.flip-number-number-picture{
  margin-top: 50px;

}
.flip-number-number-picture-bar{
font-family: "Microsoft Yahei", Arial, sans-serif;
margin-left: 20px;
}

.flip-number-number-device{
font-family: "Microsoft Yahei", Arial, sans-serif;
}
.flip-single-number{
  font-family: Microsoft Yahei, Arial, sans-serif;
  font-size: 62px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  margin-left: 3.1px;
  margin-right: 3.1px;
  padding: 0px 0.1em;
  box-sizing: content-box;
  width: 0.6em;
  text-align: center;
  background-color: rgb(15, 57, 107);
}

.flip-single-numbers{
  font-family: Microsoft Yahei, Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  margin-left: 3.1px;
  margin-right: 3.1px;
  padding: 0px 0.1em;
  box-sizing: content-box;
  width: 0.6em;
  text-align: center;
  background-color: rgb(15, 57, 107);
}

</style>
