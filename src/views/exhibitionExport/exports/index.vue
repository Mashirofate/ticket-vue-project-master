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

    <!-- <div class="item5">
      <left2></left2>
    </div>-->
    <!-- <div class="item6">
      <right2 :va-id="activity.aId" class="mt-3" />
    </div> -->
  </div>
</template>

<script>
import labels from '@/components/Exports/label/index'
import rate from '@/components/Exports/rate/index'
import charts from '@/components/Exports/chartsLine/index'

import { getVaByVaId } from '@/api/va'

export default {
  components: {
    labels,
    rate,
    charts
    // // Left2,
    // Right1,
    // Right2
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

