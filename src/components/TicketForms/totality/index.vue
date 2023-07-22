
<template>
  <el-card style="margin-top:10px;">
    <span>总人数人流量面积图</span>
    <div id="Areacontainer" />
  </el-card>

</template>

<script>

import { getTotality } from '@/api/tf'
import { Area } from '@antv/g2plot'

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
      activitys: []

    }
  },
  watch: {
    activity: function(newVal, oldVal) {
      this.activitys = newVal
      newVal && this.drawChart()
    }
  },
  mounted() {

  },

  methods: {

    drawChart() {
      const { aId } = this.activity
      getTotality(aId).then(res => {
        const data = res.data.rows

        const areaPlot = new Area(document.getElementById('Areacontainer'), {
          height: 450,

          data,
          xField: '时间',
          xAxis: {
            visible: true,
            label: {
              visible: true,
              autoHide: true
            }
          },
          yField: '人数',
          yAxis: {
            label: {
              // 数值格式化为千分位
              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
            }
          },
          interactions: [
            {
              type: 'slider',
              cfg: {
                start: 0.4,
                end: 0.6
              }
            }
          ]
        })
        areaPlot.render()
      })
    }

  }
}
</script>

