<template>

  <div class="chart-container-canvas">
    <vue-particles
      color="#24CBFF"
      :particle-opacity="0.7"
      :particles-number="300"
      shape-type="star"
      :particle-size="4"
      lines-color="#dedede"
      :lines-width="0"
      :line-linked="false"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
      class="chart-container-canvas"
    />
  </div>

</template>

<script>

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.chart-container-canvas{
  width: 1900px;
  height: 105px;
  z-index: 10;
}
</style>
