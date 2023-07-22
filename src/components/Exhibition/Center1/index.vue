<template>
  <div id="title" class="text-white text-center">
    <h1 style="text-center ; color:aliceblue; padding-top: 0px; ">
      <strong>{{ activity.aName }}</strong>
    </h1>

  </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Object,
      default: () => []
    }
  }
}
</script>
<style scoped>

</style>
