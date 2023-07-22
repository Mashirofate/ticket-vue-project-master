
<template>
  <div id="title">
    <h1 align="center" class="headerel-cardTITLE">
      <strong style="text-center">{{ activity.aName }}</strong>
    </h1>
  </div>
</template>

<script>
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
  }
}
</script>
<style scoped>
.headerel-cardTITLE{
  margin:0;
  padding:10px 10px 10px 10px;
}
</style>
