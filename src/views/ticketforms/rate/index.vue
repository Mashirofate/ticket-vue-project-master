<template>
  <div id="exhibition">
    <!--  活动名称 -->
    <div class="item1">
      <labels :activity="activity" />
    </div>
    <div class="item2">
      <rate :activity="activity" />
    </div>
    <div class="item3">
      <charts :activity="activity" />
    </div>
    <!-- <div class="item4">
      <totality :activity="activity" />
    </div> -->
    <!-- <div class="item5">
      <left2></left2>
    </div>-->
    <!-- <div class="item6">
      <right2 :va-id="activity.aId" class="mt-3" />
    </div> -->
    <div class="relation-img">
      <div class="relation">
        <span valign="bottom" style="vertical-align:bottom ">联系电话:  18617331132 &nbsp; &nbsp; &nbsp; &nbsp; 020-85827246  <br>
          &nbsp; &nbsp; &nbsp; &nbsp;
        </span>
      </div>
      <div class="demo-image__placeholder">
        <el-image :fit="fill" style="height: 150px;width:290px " :src="src" />
      </div>

    </div>
  </div>
</template>

<script>
import labels from '@/components/TicketForms/label/index'
import rate from '@/components/TicketForms/rate/index'
import charts from '@/components/TicketForms/charts/index'
// import totality from '@/components/TicketForms/totality/index'
// import Right1 from '@/components/Exhibition/Right1/index';
// import Right2 from '@/components/Exhibition/Right2/index';

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    labels,
    rate,
    charts
    // totality
    // // Left2,
    // Right1,
    // Right2
  },
  data() {
    return {
      activity: {},
      src: require('../../../assets/src_imgs/background/ze.png')
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

<style scoped>
.relation{
  margin:0;
  padding:0px 10px 0px 10px;
  font: 2em sans-serif;
  text-align: center;
  margin-right: 870px;
  margin-top: 100px;
}
.relation-img{
  display: flex;
  flex-direction: row ;
  height: 150px;

}

</style>
