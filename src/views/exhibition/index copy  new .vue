<template>
  <div class="page-item">
    <div class="Top-Item">
      <TopItem />
    </div>
    <div class="Bottom-item">
      <div class="Left-Item">
        <LeftItem />
      </div>
      <div class="Centre-Item">
        <CentreItem />
      </div>
      <div class="Right-item">
        <RightItem />
      </div>
    </div>
  </div>
</template>

<script>
import TopItem from '@/components/Mimesis/Top/index'
import LeftItem from '@/components/Mimesis/Left/index'
import RightItem from '@/components/Mimesis/Right/index'
import CentreItem from '@/components/Mimesis/Centre/index'

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    TopItem,
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
body {
  margin: initial !important;
}

.page-item{
    display: flex;
    flex-direction: column;
    background-size:contain;
    background-image: url("../../assets/src_imgs/background/background-2.png");
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
   width: 500px;
}
.page-item > .Bottom-item > .Centre-Item{
   width: 920px;
}
.page-item > .Bottom-item > .Right-item{
   width: 500px;
}
</style>>
