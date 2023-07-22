
<template>
  <div class="headerel-card">
    <el-card class="box-card1">
      <div slot="header" class="clearfix1">
        <span>每天各个时间段出场人流量图</span>

        <div id="lines" />
      </div></el-card>
  </div>

</template>

<script>

import { Line } from '@antv/g2plot'
import { getExportSum } from '@/api/tf'

export default {

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
      value: ''

    }
  },
  watch: {
    activity: function(newVal, oldVal) {
      newVal && this.changehandle()
    }
  },

  methods: {

    changehandle(val) {
      getExportSum(this.activity.aId).then(res => {
        this.dataLine = res.data
        this.linePlot = new Line('lines', {
          padding: 'auto',
          forceFit: true,
          height: 350,
          smooth: true,

          xAxis: {
            tickCount: 20
          },
          data: this.dataLine,
          xField: 'date',
          yField: 'value',
          yAxis: {
            label: {
            // 数值格式化为千分位
              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
            }
          },
          legend: {
            position: 'top-right'
          },
          seriesField: 'type',
          responsive: true

        })
        this.linePlot.render()
      })
    }
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
