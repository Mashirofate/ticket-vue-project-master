<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :theme="theme" :padding="padding">
      <v-tooltip />
      <v-axis />
      <v-bar position="type*value" />
    </v-chart>
  </div>
</template>

<script>
import json from '../custom.json'
const scale = [{
  dataKey: 'sales',
  tickInterval: 20
}]

export default {
  props: {
    eachexoutList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      scale,
      height: 290,
      theme: json,
      padding: { top: 20, right: 30, bottom: 45, left: 60 }
    }
  },
  watch: {
    eachexoutList: function(newVal) {
      this.doSomeThing(newVal)
    }
  },
  methods: {
    doSomeThing(newVal) {
      this.data = newVal
    }
  }
}
</script>
