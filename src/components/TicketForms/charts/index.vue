
<template>
  <div class="headerel-card">
    <el-card class="box-card1">
      <div slot="header">
        <div slot="header" class="clearfix1">
          每天各个时间段入场人流量图
        </div>

        <lines :data-line="dataLine" />

      </div></el-card>
  </div>

</template>

<script>
import lines from '@/components/TicketForms/charts/line'
import { getSum } from '@/api/tf'

export default {
  components: {
    lines
  },
  props: {
    activity: {
      type: Object,
      default: () => {
        return {
          aId: ''
        }
      }
    }
  },
  data() {
    return {
      dataLine: [],
      activitys: [],
      value: ''

    }
  },
  watch: {
    activity: function(newVal, oldVal) {
      this.activitys = newVal
      newVal && this.changehandle()
    }
  },
  methods: {
    changehandle(val) {
      getSum(this.activity.aId).then(res => {
        this.dataLine = res.data
      })
    }
    // drawChart() {
    //   const { aId } = this.activity;
    //   getSum(aId).then(res => {
    //     const { data } = res;
    //     console.log('data' + data);
    //     this.dataLine = data;
    //   });
    // }

  }
}
</script>
<style scoped>
.headerel-card{
  margin:0;
  padding:10px 10px 5px 10px;
}

.clearfix1{
 border-bottom: 1px solid #EBEEF5;
}
</style>
