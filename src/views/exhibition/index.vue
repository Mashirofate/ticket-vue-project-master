<template>
  <div class="page-item">
    <div class="Top-Item">
      <TopItem :activity="activity" />
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
    <div class="Bottom-cavar">
      <BottomItem />
    </div>
  </div>

</template>

<script>
import TopItem from '@/components/Mimesis/Top/index'
import LeftItem from '@/components/Mimesis/Left/index'
import RightItem from '@/components/Mimesis/Right/index'
import CentreItem from '@/components/Mimesis/Centre/index'
import BottomItem from '@/components/Mimesis/Bottom/index'

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    TopItem,
    LeftItem,
    RightItem,
    CentreItem,
    BottomItem
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

body {
  margin: initial !important;
}

.page-item{
    display: flex;
    flex-direction: column;
    background-size:contain;
    background-image: url("../../assets/src_imgs/background/background-2.png");
    background-repeat: no-repeat;
    width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
}
.page-item > .Top-Item{
   flex: auto;
   width: 100%;
   height: 150px;
}
.page-item > .Bottom-item {
   flex: auto;
   width: 100%;
   display: flex;
   height: 930px;
   flex-direction: row;
}
.page-item > .Bottom-item > .Left-Item{
   width: 490px;
}
.page-item > .Bottom-item > .Centre-Item{
   width: 920px;
}
.page-item > .Bottom-item > .Right-item{
   width: 490px;
}
.page-item > .Bottom-cavar{
  margin-top: -125px;
}
</style>
