<template>
  <div id="exhibition" class="bg-img">

    <div class="item-top">
      <div class="logls">
        <el-image
          style="width: 200px; height: 62px; ;"
          :src="require('@/assets/src_imgs/background/ze1.png')"
        />
      </div>
      <div class="item-top11"><center1 :activity="activity" /></div>
    </div>
    <div class="item-content">
      <div class="item1">
        <Left1 :activity="activity" />
      </div>
      <div class="item2">
        <center2 :activity="activity" />
      </div>
      <div class="item3">
        <right1 :activity="activity" />
      </div>
    </div>
  </div>
</template>

<script>
import Center1 from '@/components/Exhibition/Center1/index'
import Center2 from '@/components/Exhibition/Center2/index'
import Left1 from '@/components/Exhibition/Left1/index'
import Right1 from '@/components/Exhibition/Right1/index'

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    Center1,
    Center2,
    Left1,
    Right1
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

.bg-img {
  background-image: url("../../assets/src_imgs/background/3.png");
  width: 120rem;
  height: 67.5rem;
  display: flex;
  flex-direction:column;
}

.item-top{
  height: 4.5rem;
}
.item-top11{
  padding-right: 600px;

}
.item-content{
display: flex;
}

.item1 {
  margin-left: 1rem;
}

.item2 {
 margin-left: 1rem;
 margin-right: 1rem;
}

.item3{
  margin-right: 1rem;
}
.logls{
  float: left;
  width: 600px;
  color: #74b5e1;;
  padding-left:16px;
  padding-bottom: 4px;
  padding-top: 4px;
}
</style>>
