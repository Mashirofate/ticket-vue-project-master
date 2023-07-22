
<template>
  <div>
    <div id="linesE" />

  </div>
</template>

<script>

import { Line } from '@antv/g2plot'

export default {
  props: {
    dataLine: {
      type: Array,
      default() {
        return [
          null
        ]
      }
    }
  },
  data() {
    return {
      linePlotE: null
    }
  },

  watch: {
    dataLine: function(val, oldVal) {
      if (this.linePlotE) { // 如果存在的话就删除图表再重新生成
        this.linePlotE.destroy()
      }
      this.drawChartE(val)
    }
  },

  methods: {

    drawChartE(val) {
      const dataL = val
      this.linePlotE = new Line('linesE', {

        forceFit: true,
        height: 370,
        smooth: true,

        data: dataL,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        legend: {
          position: 'top-right'
        },
        yAxis: {
          label: {
            // 数值格式化为千分位
            formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
          }
        }

      })

      this.linePlotE.render()
    }

  }
}
</script>

