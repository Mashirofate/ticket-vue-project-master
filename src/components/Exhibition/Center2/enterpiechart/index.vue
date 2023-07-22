
<template>
  <div>
    <v-chart style="margin-left:-30px;" :force-fit="true" :height="height" :data="data" :scale="scale" :theme="theme">
      <v-tooltip :show-title="false" data-key="type*percent" />
      <v-axis />
      <v-legend data-key="type" :offset-y="-60" />
      <v-pie position="percent" color="type" :v-style="pieStyle" :label="labelConfig" />
      <v-coord type="theta" :radius="0.75" :inner-radius="0.6" />
      <v-stack-bar position="value" :color="color" :opacity="1" />
    </v-chart>
  </div>
</template>

<script>
import json from '../custom.json'
const DataSet = require('@antv/data-set')

const color = ['type', ['#f9cb34', '#2593fc', '#43ccb0', '#38c060', '#27c1c1', '#705dc8']]
const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
export default {
  props: {
    eachexenterList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      data: [],
      scale,
      color,
      theme: json,
      height: 320,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return val
        }
      }]
    }
  },
  watch: {
    eachexenterList: function(newVal) {
      this.doSomeThing(newVal)
    }
  },
  methods: {
    doSomeThing(newVal) {
      const dv = new DataSet.View().source(newVal)
      dv.transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      })
      this.data = dv.rows
    }
  }
}
</script>
