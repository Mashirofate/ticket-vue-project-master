<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" renderer="svg" :theme="theme" :padding="padding">
      <v-tooltip :crosshairs="crosshairs" />
      <!-- <v-legend /> -->
      <v-axis data-key="amount" :label="label" />
      <v-line position="time*amount" color="open" />
      <v-point position="time*amount" color="open" size="4" shape="circle" :style="style" />
    </v-chart>
  </div>
</template>

<script>
import json from '../custom.json'

const scale = [{
  dataKey: 'time',
  tickCount: 10

}]

const crosshairs = {
  type: 'line'
}

const label = {
  formatter: function formatter(val) {
    return val
  }
}

const style = {
  stroke: '#fff',
  lineWidth: 1
}

export default {
  props: {
    brokenlist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      scale,
      height: 320,
      crosshairs,
      label,
      style,
      theme: json,
      padding: { top: 20, right: 30, bottom: 100, left: 60 }
    }
  },
  watch: {
    brokenlist: function(newVal) {
      this.doSomeThing(newVal)
    }
  },
  methods: {
    doSomeThing(newVal) {
      //   console.info('newVal' + newVal);
      //   for (var i = 0; i < newVal.length; i++) {
      //     for (var key in newVal[i]) {
      //       console.info(key + ':' + newVal[i][key]);
      //     }
      //   }
      this.data = newVal
    }
  }
}
</script>
