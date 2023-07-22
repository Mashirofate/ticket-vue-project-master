<template>
  <div class="right-item">
    <div class="right-bgintraField">
      <div class="flip-number-tit"> 人流量数据</div>

      <div class="matts">
        <div class="sup-up">
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/src_imgs/background/pic-7.png')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ intraFieldsum }}</div>
              <div class="flip-number-suffix">入场总人数(人次)</div>
            </div>
          </div>
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/src_imgs/background/pic-6.png')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ typeOutCount }}</div>
              <div class="flip-number-suffix">出场总人数(人次)</div>
            </div>
          </div>
        </div>
        <div class="sup">
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/src_imgs/background/pic-4.png')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ count.realname }}</div>
              <div class="flip-number-suffix">实名入场(人次)</div>
            </div>
          </div>
          <div class="sup-le">
            <div class="sup-image" :style="{'background': 'url('+require('../../../assets/src_imgs/background/pic-4.png')+') no-repeat center center', 'background-size': '100% 100%'} " />
            <div class="tit-chart-container">
              <div class="matts-tit">{{ count.Norealname }}</div>
              <div class="flip-number-suffix">未实名入场(人次)</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="rightItem2">
      <div class="flip-number-tit-picture"> 出入口最新出入人员</div>
      <el-tabs class="border-card">
        <div class="imageItem">
          <div class="enterImg">
            <div class="textimageTtem1"><span>入口</span></div>
            <el-row v-for="(item, index) in enterImg" :key="index" :gutter="24" class="el-rowimg">
              <el-col :span="24" class="el-colimg">
                <img class="imageprevies" width="100%" height="100%" :src="item.image" alt>
              </el-col>
            </el-row>
          </div>
          <div class="outImg">
            <div class="textimageTtem1"><span>出口</span></div>
            <el-row v-for="(item, index) in outImg" :key="index" :gutter="24" class="el-rowimg1">
              <el-col :span="24" class="el-colimg1">
                <img class="imageprevies" width="100%" height="100%" :src="item" alt>
              </el-col>
            </el-row>
          </div>

        </div>

      </el-tabs>

    </div>
  </div>

</template>

<script>
export default {
  name: 'Right',
  components: {
  },
  props: {
    activity: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      websock: null,
      enterImg: [],
      outImg: [],
      count: {},
      intraFieldsum: null,
      typeOutCount: null
    }
  },
  computed: {
    ringDate: function() {
      const date = [
        {
        }

      ]
      return date
    }
  },
  watch: {
    activity: {
      handler: function(val, oldVal) {
        this.initWebSocket(val.aId)
      },
      deep: true
    }
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(vaId) {
      // const wsuri = 'ws://175.24.189.222:8080/RealTimeEnterServer/' + vaId
      const wsuri = 'ws://localhost:8080/RealTimeEnterServer/' + vaId
      // console.log(wsuri);
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      // let actions = { test: "12345" };
      // this.websocketsend(JSON.stringify(actions));
      this.$notify({
        title: '成功',
        message: '各个入口实时人数连接成功',
        type: 'success'
      })
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data)
      this.enterImg = redata.enterImg
      this.outImg = redata.OutImg

      this.count = redata.typeenterCount
      this.typeOutCount = redata.typeOutCount
      this.intraField = redata.intraField
      this.intraFieldsum = this.intraField + this.typeOutCount
    },
    websocketclose(e) {
      this.$notify({
        title: '警告',
        message: '各个入口实时人数已关闭',
        type: 'warning'
      })
      // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-item {
  display: flex;
  flex-direction:column;
}

.matts {
  align-items: center;

  height: 220px;
}

.rightItem2 {
  height: 540px;
}

.border-card{
  background-color: transparent!important;
}

.imageItem {
  background-size: 100% 100%;
  display: flex;

}

.enterImg{
  flex:1;
  padding-left: 1rem;
  padding-right: 0.7rem;
  height: 500px;

}
.outImg{
  flex:1;
  padding-left: 0.7rem;
  padding-right: 1rem;
  height: 500px;

}
.el-colimg{
  height: 7.5rem;
  padding: 0.25rem;
  border-right: 1px dashed rgb(176, 194, 249);
  border-top: 1px dashed rgb(176, 194, 249);
}
.el-colimg1{
  height: 7.5rem;
  padding: 0.25rem;
  border-top: 1px dashed rgb(176, 194, 249);
}

.textimageTtem1{
  color: rgb(154, 168, 212);
  text-align: center;
}
.el-tabs--border-card{
  border: 0px solid #DCDFE6;
}

.flip-number-tit{
  font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
  margin-left: 0px;
  margin-bottom: 30px;
}
.flip-number-tit-picture{
   font-family: "Microsoft Yahei", Arial, sans-serif;
  font-size: 22px;
  color: rgb(154, 168, 212);
  font-weight: normal;
  margin-left: 0px;
  margin-bottom: 10px;
}
.sup-image{
  width: 75px; height: 75px;
}
.tit-chart-container{
  display: flex;
  flex-direction:column;
  margin-left: 20px;
}
.matts{
display: flex;
  flex-direction:column;

}

.sup-up{
  display: flex;
  flex-direction:row;
  margin-bottom: 20px;
}

.sup{
  display: flex;
  flex-direction:row;
}

.sup-le{
  display: flex;
  flex-direction:row;
  width: 225px;
  height: 85px;

}
.matts-tit{
  font-family: Microsoft Yahei, Arial, sans-serif;
   font-size: 32px;
   font-weight: bold; color: rgb(255, 255, 255); margin-left: 0px;
    margin-right: 0px; padding: 0px;
     box-sizing: content-box;
     width: 0.6em;
      text-align: center;

}

.flip-number-suffix{
font-family: Microsoft Yahei;
 font-size: 14px;
  color: rgb(176, 194, 249);
   align-self: flex-start;
    margin-left: 0px;
     margin-top: 0px;
}

</style>
