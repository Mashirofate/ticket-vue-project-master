<template>
  <div class="page1">
    <div class="flip-number">
      <div class="flip-number-t">
        <div class="flip-number-tit">场内实时总人数</div>
        <div class="flip-number-titts">Real-time total</div>
      </div>
     
      <div class="matts">
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/监控大屏.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ intraField }}</div>
              <div class="flip-number-suffix1">入场总人数</div>
            </div>
          </div>
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/工作证人员.svg')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ work }}</div>
              <div class="flip-number-suffix"> 工作证人数</div>
            </div>
          </div>
      </div>

      <div class="flip-number-t">
          <div class="flip-number-tit">场内实时人数预警</div>
          <div class="flip-number-titts">Attendance warning</div>
       
      </div>
        <div class="matts">
          <div class="sup-l-dv">
          <dv-decoration-9 class="dv-decoration-9y" :dur="60" :color="['#FF9F40','#33EAFF']" >{{ alist }} % </dv-decoration-9>
     
        </div>
        </div>

      <div class="flip-number-t">
          <div class="flip-number-tit">入场人员性别比例</div>
          <div class="flip-number-titts">Sex quantity distribution</div>
 
        
      </div>
      <div class="mattsws">
        <div class="sup-hg-dv" id="sup-hg-dv" ></div>
        </div>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
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
      aId: null,
      intraField: 0,
      anumber: 0,
      numList: [],
      work:0,
      alist:0,
      gender: [],
    }
  },

  watch: {
    activity: function(value, oldValue) {
      this.initWebSocket(value)
    },
    gender: function(value, oldValue) {
      this.drawChart1()
    }

  },
  mounted() {
    // this.$nextTick(function() {
    //   this.echartsBarInit()
    // })
  

  },
  methods: {
    
    initWebSocket(value) {
    const wsuri = 'ws://10.5.2.100:8080/RealTimeOtherServer/' + value.aId
      //   const wsuri = 'wss://www.zeantong.com:8080/RealTimeOtherServer/' + value.aId
    //  console.log(wsuri)
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
      const redata = JSON.parse(e.data)
      this.intraField = redata.intraField
      this.work = redata.work
      this.gender =redata.gender
     
      var number=this.intraField / this.anumber;
      number = String(number*100).replace(/^(.*\..{2}).*$/,"$1");
    number = Number(number); // number = 12.3321
      this.alist= number;

    },
    websocketclose(e) {
     
    },

    drawChart1() {

      const myChart = echarts.init(document.getElementById('sup-hg-dv'))

      myChart.setOption({
   
        color:['#FF9F40','#33EAFF'],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 30,
        borderColor: '#0C171F',
        borderWidth: 5
      },
      label: {
        show: true,
        position: 'center',
        normal: {
                formatter: '{b}: {c}人',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 40,
      //     fontWeight: 'bold'
      //   }
      // }, 
      labelLine: {
        show: false
      },
      data:this.gender
    }
  ]
      })

    }

  }

}



</script>

<style>

.flip-number{
  display:flex;
  flex-direction: row;
  flex-direction: column;
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
.flip-number-t{
  display:flex;
  flex-direction:row;
  height: 60px;
  padding-left: 70px;
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
.flip-number-tits{
  font-size: 22px;
  color: aliceblue;
  font-weight: normal;
  margin-left: 20px;
  margin-top: 40px;
}
.flip-number-number-picture{
  display:flex;
  flex-direction: row;
  flex-direction: column;
  height: 60px;
  padding-left: 70px;
  align-items: center;
}
.flip-number-number-device{
  display:flex;
  flex-direction:row;
  height: 60px;
  padding-left: 70px;
  display: flex;
  align-items: center;
}






.flip-number >.matts {
  padding-left: 50px;
  padding-top: 30px;
  height: 260px;
}

.sup-up{
  display: flex;
  flex-direction:row;
  margin-bottom: 20px;
}

.sup{
  display: flex;
  flex-direction:row;
}

.flip-number >.matts > .sup-le{
  display: flex;
  flex-direction:row;
  width: 300px;
  margin-bottom: 20px;

}
.sup-image{
  width: 80px; 
  height: 80px; 
}
.tit-chart-container{
  display: flex;
  flex-direction:column;
  padding-left: 20px;
  padding-bottom: 10px;
}
.matts-tit{
  font-family: Microsoft Yahei, Arial, sans-serif;
   font-size: 32px;
   font-weight: bold; color:aliceblue; margin-left: 0px;
    margin-right: 0px; padding: 0px;
    box-sizing: content-box;
    text-align: center;

}
.flip-number-suffix1{
font-family: Microsoft Yahei;
 font-size: 14px;
  color:  rgb(165,230,230);
   align-self: flex-start;
   padding-top: 15px;
    
}


.flip-number-suffix{
font-family: Microsoft Yahei;
 font-size: 14px;
  color:  rgb(230,206,174);
   align-self: flex-start;
   padding-top: 15px;
}

.sup-l-dv{
  padding-left: 50px;
}
.dv-decoration-9y{
  width:220px;
  height:200px;
  color: aliceblue;
  font-size: 25px;
  Font-weight:bold;
  
}
.mattsws {
  height: 260px;
}
.mattsws >.sup-hg-dv{
  width: 400px;
  height: 260px;
}
</style>
