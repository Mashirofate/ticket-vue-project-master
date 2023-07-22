<template>
  <div id="rate" class="headerel-card1">
    <el-row :gutter="12">
      <el-col :span="6" style="  width:380px">
        <el-card class="box-card1">
          <div slot="header" class="clearfix">
            总入场人数： {{ page.sum }} 人
          </div>
          <div class="text-item">
            <el-table :data="page.sumList" height="500px" style=" font-size: 17px;">
              <el-table-column prop="time" label="日期" width="200px" />
              <el-table-column prop="total" label="人数" width="140px" />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="width:460px">
        <el-card class="box-card1">
          <div slot="header" class="clearfix">
            活动每天入场数占总人数比
          </div>
          <div id="donutenter" />
        </el-card>
      </el-col>
      <el-col :span="12" style="width:1000px">
        <el-card class="box-card1">
          <div slot="header" class="clearfix">
            <span>活动全时间段入场人数</span>
          </div>
          <div id="area" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { Bar } from '@antv/g2plot'
import { getNumber } from '@/api/tf'

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
      page: {
        sum: 0,
        sumList: []
      },
      activitys: []
    }
  },
  watch: {
    activity: function(newVal, oldVal) {
      this.activitys = newVal
      newVal && this.drawChart()
    }
  },
  // 处于loading结束后，还做一些初始化，实现函数自执行（data数据已经初始化，但是DOM结构渲染完成，组件没有加载）
  // 没有这一步init不会执行
  created() {
    this.init()
  },
  methods: {
    init() {
    },

    drawChart() {
      const { aId } = this.activity
      getNumber(aId).then(res => {
        const dataDonut = res.data.headcountList

        const dataArea = res.data.rows
        const exitcountList = res.data.ExitcountList
        let nums = 0
        for (let index = 0; index < dataDonut.length; index++) {
          for (var key in dataDonut[index]) {
            console.log(key + ':' + dataDonut[index][key])
            if (key === 'value') {
              nums += dataDonut[index][key]
            }
          }
        }
        const echarts = require('echarts')
        // const myChart = echarts.init(document.getElementById('donutenter'), null, {
        //   width: 600,
        //   height: 270
        // })
        const myChart = echarts.init(document.getElementById('donutenter'))
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            top: 'bottom'

          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              clockWise: true,
              radius: ['40%', '70%'],
              avoidLabelOverlap: true,
              itemStyle: {
                borderRadius: 20,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                formatter: '{d}%',
                show: true,
                fontSize: '20',
                position: 'top',
                rich: {
                  a: {
                    fontSize: 10,
                    color: '#999',
                    lineHeight: 20,
                    align: 'center'
                  },
                  b: {
                    fontSize: 10,
                    lineHeight: 200
                  }
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              data: dataDonut
            }
          ]
        })

        const stackedColumnPlot = new Bar('area', {
          data: dataArea,
          isStack: true,
          xField: 'value',
          yField: 'time',
          seriesField: 'Names',
          label: {
            // 可手动配置 label 数据标签位置
            position: 'middle', // 'top', 'bottom', 'middle'
            // 可配置附加的布局方法
            layout: [
              // 柱形图数据标签位置自动调整
              { type: 'interval-adjust-position' },
              // 数据标签防遮挡
              { type: 'interval-hide-overlap' },
              // 数据标签文颜色自动调整
              { type: 'adjust-color' }
            ]
          }
        })

        stackedColumnPlot.render()

        this.page.sum = nums
        this.page.sumList = exitcountList
      })
    }

  }
}
</script>

<style>
.box-card1 {
  font-size: 27px;
  font-weight: bold;

}
#donutenter{
  height: 500px;
  width: 420px;
}
#area{
  height: 500px;
  width: 900px;
}
.el-card__header {
  margin:0;
  padding:5px 0px 5px 10px;
}
.el-card__body{
padding:5px 0px 5px 10px;
}

.headerel-card1{
  margin:0;
  padding:0px 10px 0px 10px;
}
</style>
