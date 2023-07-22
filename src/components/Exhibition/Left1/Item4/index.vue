<template>
  <el-carousel :interval="4000" type="card" height="268px">
    <el-carousel-item v-for="(item, index) in enterImgAbnormals" :key="index">

      <img v-image-preview :src="item.image" class="photo" alt>
      <div style="padding: 4px">
        <span class="orange">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:  {{ item.autonym }}</span><br>
        <span class="orange">身份证号:  {{ item.tIdentitycard }}</span><br>
        <span class="orange1">健&nbsp;&nbsp;康&nbsp;&nbsp;码:  {{ item.healthCode }}</span>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    enterImgAbnormals: {
      type: Array,
      default: null
    }
  }
}
</script>

<style >
.photo {width: 120%;}
.orange {
	font-size: 10px;
  color:aliceblue;
}
.orange1 {
	font-size: 10px;
  color:red;
}
  .el-carousel__item:nth-child(2n) {
  background-color: #909399;

  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #475669;
  }

</style>
