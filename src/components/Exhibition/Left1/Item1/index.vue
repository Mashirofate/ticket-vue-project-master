<template>
  <div class="bgintraField">
    <h3 class="texthead"> 场馆内实时人数总量</h3>
    <div class="gutterheader">
      <el-row :gutter="20">
        <el-col :span="20" class="gutterheader1">
          <span class="textnumber"> {{ intraField }}</span>
          <span class="textheadline">场内总人数(人)</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" align="center">
        <el-col :span="10" class="gutterheader2">
          <span class="textnumber1"> {{ aTicketnumber }}</span><br>
          <span class="textheadline">票务总人数(人)</span>
        </el-col>
        <el-col :span="10">
          <span class="textnumber1"> {{ aEmployeenumber }}</span><br>
          <span class="textheadline">工作人员总人数(人)</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    intraField: {
      type: Number,
      default: 0
    },
    aTicketnumber: {
      type: Number,
      default: 0
    },
    aEmployeenumber: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

.bgintraField {
  /* background-image: url("../../../../assets/src_imgs/7.png"); */
  height: 15rem;
  border-bottom: 2px solid #2ba7c3;
  padding-left: 2rem;
}
.leftItem1[data-v-5093d2dd] {
    margin-bottom: 0rem;
}
.gutterheader{
  margin-left: 2rem;
}

.gutterheader1{
  border-bottom: 2px dashed rgb(126, 131, 134);
}

.gutterheader2{
  border-right: 2px dashed rgb(126, 131, 134);

}
.texthead{
  font-size: 1.5rem;
  color: #d4eaf8;
  font-weight: bolder;
}

.textnumber{
  font-size: 3rem;
  color: aliceblue;

}

.textnumber1{
  font-size: 2rem;
  color: aliceblue;
}

.textheadline{
  font-size: 0.8rem;
  color: aliceblue;

}

</style>
