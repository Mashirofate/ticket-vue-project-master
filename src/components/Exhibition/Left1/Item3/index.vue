<template>
  <div class="bgintraField">
    <h3 class="texthead"> 场馆内实时出入场人数总量</h3>
    <div class="gutterheader">
      <el-row :gutter="20" align="center">
        <el-col :span="10" class="gutterheader2">
          <span class="textnumber1"> {{ countSum }}</span>
          <span class="textheadline">入场总人数</span>
        </el-col>
        <el-col :span="10" class="gutterheader1">
          <span class="textnumber1"> {{ typeOutCounts }}</span>
          <span class="textheadline">出场总人次</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" align="center">
        <el-col :span="10" class="gutterheader4">
          <span class="textnumber"> {{ count.realname }}</span><br>
          <span class="textheadline">实名入场人数</span>
        </el-col>
        <el-col :span="10" class="gutterheader5">
          <span class="textnumber"> {{ count.Norealname }}</span><br>
          <span class="textheadline">未实名入场人数</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {

    // 在js中 {} 表示对象  [] 表示数组
    count: {
      type: Object,
      default: () => {}
      // 或者 default: function () { return [] }
    },
    typeOutCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      countSum: 0,
      Norealname: 0,
      realname: 0,
      typeOutCounts: 0
    }
  },

  watch: {
    'count': {
      handler: function(newValue, oldValue) {
        this.doSomeThing(newValue)
      },
      deep: true
    },
    'typeOutCount': {
      handler: function(newValue, oldValue) {
        this.dotypeOutCount(newValue)
      },
      deep: true
    }
  },
  methods: {
    doSomeThing(newValue) {
      // if (newValue.Norealname == null) {
      //   this.countSum = newValue.ticketing
      //   this.Norealname = 0
      //   this.realname = newValue.realname
      // }
      // if (newValue.realname == null) {
      //   this.countSum = newValue.Norealname
      //   this.realname = 0
      //   this.Norealname = newValue.Norealname
      // }
      // if (newValue.Norealname != null & newValue.realname != null) {
      //   this.countSum = newValue.ticketing + newValue.staff
      //   this.Norealname = newValue.Norealname
      //   this.realname = newValue.realname
      // }
      this.countSum = newValue.Norealname + newValue.realname
    },
    dotypeOutCount(newValue) {
      this.typeOutCounts = newValue
    }

  }
}
</script>

<style scoped>
.bgintraField {
  height: 17rem;
  border-bottom: 2px solid #2ba7c3;
  padding-left: 2rem;

}

.gutterheader{
  margin-left: 2rem;
}

.gutterheader1{
  border-bottom: 2px dashed rgb(126, 131, 134);
}

.gutterheader2{
  border-bottom: 2px dashed rgb(126, 131, 134);
  border-right: 2px dashed rgb(126, 131, 134);
}

.gutterheader3{
  border-bottom: 2px dashed rgb(126, 131, 134);
}

.gutterheader4{
  border-right: 2px dashed rgb(126, 131, 134);
}

.texthead{
  font-size: 1rem;
  color: #74b5e1;
  font-weight: bolder;
}

.textnumber{
  font-size: 2rem;
  color: aliceblue;

}
.textnumber1{
  font-size: 2.5rem;
  color: aliceblue;

}

.textheadline{
  font-size: 0.8rem;
  color: aliceblue;

}
.leftItem2[data-v-5093d2dd] {
    margin-bottom: 0rem;
}
</style>
