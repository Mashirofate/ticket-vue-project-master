<template>
  <div class="imageItem">
    <div class="enterImg">
      <div class="textimageTtem"><span>入口</span></div>
      <el-row v-for="(item, index) in enterImg" :key="index" :gutter="24" class="el-rowimg">
        <el-col :span="24" class="el-colimg">
          <img width="100%" height="100%" :src="item" alt>
        </el-col>
      </el-row>
    </div>
    <div class="outImg">
      <div class="textimageTtem"><span>出口</span></div>
      <el-row v-for="(item, index) in outImg" :key="index" :gutter="24" class="el-rowimg1">
        <el-col :span="24" class="el-colimg1">
          <img width="100%" height="100%" :src="item" alt>
        </el-col>
      </el-row>
    </div>
    <!-- 遍历map集合，先遍历集合，在遍历map -->
    <!-- <p v-for="(item, index) in outImg" :key="index">
        <span v-for="(value, key) in item" :key="key">
          <div v-if="key =='image'">
            <el-image fit="cover" :src="value" alt />
          </div>
          <div v-if="key == 'date'">
            <span>{{ value }}</span>
          </div>

        </span>
      </p> -->

  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    enterImg: {
      type: Array,
      default: () => []
    },
    outImg: {
      type: Array,
      default: () => []
    }
  }

};
</script>

<style scoped>
.imageItem {
  background-image: url("../../../../assets/src_imgs/background/5.png");
  background-size: 100% 100%;
  display: flex;

}

.enterImg{
  flex:1;
  padding-top: 3.45rem;
  width: 10.85rem;
  padding-left: 1rem;
  padding-right: 0.7rem;
  height: 44.3rem;

}

.outImg{
  flex:1;
  padding-top: 3.45rem;
  width: 10.85rem;
  padding-left: 0.7rem;
  padding-right: 1rem;
  height: 44.3rem;

}
.el-colimg{
  height: 7.9rem;
  padding: 0.45rem;
  border-right: 1px dashed rgb(126, 131, 134);
  border-top: 1px dashed rgb(126, 131, 134);
}
.el-colimg1{
  height: 7.9rem;
  padding: 0.45rem;
  border-top: 1px dashed rgb(126, 131, 134);
}

.textimageTtem{
  color: #89d6fd;
  text-align: center;
}
</style>
