<template>
  <div class="page-item1">
    <div class="Top-Item">
      <!-- <TopItem :activity="activity" /> -->
      <strong>{{ activity.aName }}</strong>
    </div>
    <div class="Bottom-item">
      <div class="Left-Item">
        <LeftItem :activity="activity" />
      </div>
      <div class="Centre-Item">
        <CentreItem :activity="activity" />
      </div>
      <div class="Right-item">
        <RightItem :activity="activity" />
      </div>
    </div>

  </div>

</template>

<script>
import LeftItem from '@/components/Exhibition/Left/index'
import RightItem from '@/components/Exhibition/Right/index'
import CentreItem from '@/components/Exhibition/Centre/index'

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    LeftItem,
    RightItem,
    CentreItem
  },
  data() {
    return {
      activity: {}
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      const vaId = this.$route.params.id
      getVaByVaId(vaId).then(res => {
        const { data } = res
        this.activity = data
      })
    }
  }
}
</script>

<style>



.page-item1{
   
    flex-direction: column;
    /* background-image: url("../../assets/背景.png"); */
    background-image: url("../../assets/pejing.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width:fit-content;
    height: 1080px;
    width:-webkit-fit-content;
    width:-moz-fit-content;
}
.page-item1 > .Top-Item{
  display: flex;
  height: 90px;
  width: 1920px;
  color: aliceblue;
  font-size: 27px;
  display: table-cell;
    vertical-align: middle;
    text-align: center;

    
}
.page-item1 > .Bottom-item {
   display: flex;
   flex-direction: row;
  
}
.page-item1 > .Bottom-item > .Left-Item{
 
   width: 470px;
}
.page-item1 > .Bottom-item > .Centre-Item{
   width: 980px;
}
.page-item1 > .Bottom-item > .Right-item{
   width: 470px;
 
}

</style>
