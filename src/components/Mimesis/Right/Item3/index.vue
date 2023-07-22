<template>
  <div>
    <!-- <item1 class /> -->
    <ve-histogram
      id="char"
      :legend-visible="false"
      :grid="grid"
      :theme="custheme"
      :data="chartData"
      width="400px"
      height="440px"
      :extend="extend"
      :title="title"
    />
  </div>
</template>

<script>

export default {
  props: {
    eachexportCount: {
      type: Array,
      default: null
    }
  },
  data() {
    this.title = {
      text: '出场时每个出口的人数图'
    };
    this.colors = ['#0AE2A4', '#217CC6'];
    this.grid = {
      top: 40,
      left: 50,
      right: 40,
      borderWidth: 0,
      show: 'true'
    };
    this.extend = {
      series: {
        label: { show: true, position: 'top' }
      }
    };
    return {
      websock: null,
      chartData: {
        columns: ['出口', '数量'],
        rows: []
      },
      custheme: require('../../../../styles/customed.json')
    };
  },

  watch: {
    eachexportCount: {
      immediate: true, // 这句重要
      handler(val) {
        this.chartData.rows = this.eachexportCount;
      }
    }
  },
  methods: {}
};
</script>

<style scoped>

#char {
  position: absolute;
  top: 0px;
}
</style>
