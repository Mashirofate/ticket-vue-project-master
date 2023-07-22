<template>
  <div class="chart-item__content">
    <div class="logls-chart-item">
      <el-image
        style="width: 200px; height: 62px; ;"
        :src="require('@/assets/src_imgs/background/ze1.png')"
      />
    </div>

    <div class="image-chart-container">
      <div class="simple-text-chart-container">
        <div class="">{{ activity.aName }}</div>

      </div>
    </div>

    <div class="d-chart-item">
      <div class="chart-item animate__animated">
        <div class="time-chart-container" style="font-family: &quot;Microsoft Yahei&quot;, Arial, sans-serif; font-size: 20px; color: rgb(255, 255, 255); font-weight: normal; justify-content: center;">
          {{ this.Time }}
        </div>
      </div>
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
      Time: ''
    }
  },
  watch: {

  },
  created() {
    this.currentTime()
  },

  methods: {
    currentTime() {
      setInterval(this.getTime, 500)
    },
    getTime() {
      var _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      _this.data = yy + '/' + mm + '/' + dd
      _this.time = hh + ':' + mf + ':' + ss
      var week
      if (new Date().getDay() === 0) week = '星期日'
      if (new Date().getDay() === 1) week = '星期一'
      if (new Date().getDay() === 2) week = '星期二'
      if (new Date().getDay() === 3) week = '星期三'
      if (new Date().getDay() === 4) week = '星期四'
      if (new Date().getDay() === 5) week = '星期五'
      if (new Date().getDay() === 6) week = '星期六'
      _this.week = week

      this.Time = _this.data + ' ' + _this.time
    }
  }
}

</script>

<style>
.chart-item__content{
  text-align: center;
  display: flex;
  justify-content: center;
}
.image-chart-container{
  width: 1631px;
  height: 146px;
  z-index: 10;
  margin-left: 7px;
  padding-right:27px;
  line-height: 126px;
  background-image: url("../../../assets/src_imgs/background/pic-2.png");
  opacity: 1;
  transform: rotate(0deg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
}
.simple-text-chart-container{
  width: 700px;
  height: 125px;
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 36px;
  color: rgb(255, 255, 255);
  text-shadow: rgb(255, 255, 255) 0px 0px 15px;
  font-weight: bold;
  justify-content: center;
  z-index: 15;
}
.d-chart-item{
  margin-left: -100px;
  height: 48px;
  margin-top: 35px;
  z-index: 10;
  pointer-events: auto;
}
.logls-chart-item{
  margin-right: -100px;

  margin-top: 35px;
  z-index: 10;
  pointer-events: auto;
}
</style>
