<template>
  <div class="date-img">
    <div class="time">
      <strong>{{ time }}</strong>
    </div>
    <div class="data">
      <strong>{{ data }}</strong>
    </div>
    <div class="week">
      <strong>{{ week }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      time: '',
      week: ''
    }
  },
  created() {
    this.currentTime()
  },
  methods: {
    currentTime() {
      setInterval(this.getTime, 500)
    },
    getTime: function() {
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
    }
  }
}
</script>

<style scoped>

.date-img {
  background-image: url("../../../../assets/src_imgs/date_01.png");
  height: 16.25rem;
  width: 16.25rem;
  z-index: 1;
  display: flex;
  flex-direction:column;
  text-align:center;
}

.time {
  z-index: 10;
  font-size: 2rem;
  color: aliceblue;
  padding-top: 6.5rem;
}

.data {
  background-image: url("../../../../assets/src_imgs/date_02.png");
  background-repeat:no-repeat;
  background-position:top;
  z-index: 10;
  height: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align:center;
  color: aliceblue;
}

.week {
  font-size: 1.5rem;
  color: aliceblue;
  z-index: 10;
  padding-top: 1.5rem;
}

</style>
