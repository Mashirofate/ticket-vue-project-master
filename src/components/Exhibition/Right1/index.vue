<template>
  <div class="right-item">
    <div class="rightItem1">
      <rightItem1 />
    </div>
    <div class="rightItem2">
      <el-tabs type="border-card">
        <el-tab-pane label="入口详细信息">
          <div>
            <!-- 入场人数展示 -->              <!-- 出场人数照片展示 -->
            <!-- <rightItem2 :enter-img="enterImg" :out-img="outImg" />-->

            <el-row v-for="(item, index) in enterImg" :key="index" :gutter="20" class="el-rowimg">
              <el-col :span="24" class="el-col1">

                <el-card class="el-cards" :body-style="{ padding: '0px' }">
                  <div class="container">
                    <div>
                      <img v-image-preview height="100%" :src="item.image" class="photo" alt>
                    </div>

                    <div class="content" style="padding: 14px">
                      <span>姓名:  {{ item.autonym }}</span><br>
                      <span>身份证号:  {{ item.tIdentitycard }}</span><br>
                      <span :class="[item.healthCode== '绿码' ? 'oranges': '', item.healthCode=='红码'? 'blue': '',item.healthCode=='异常码'? 'green': '']">健康码:  {{ item.healthCode }}</span>
                    </div>
                  </div>

                </el-card>

              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出入口简照">
          <div class="imageItem">
            <div class="enterImg">
              <div class="textimageTtem1"><span>入口</span></div>
              <el-row v-for="(item, index) in enterImg" :key="index" :gutter="24" class="el-rowimg">
                <el-col :span="24" class="el-colimg">
                  <img width="100%" height="100%" :src="item.image" alt>
                </el-col>
              </el-row>
            </div>
            <div class="outImg">
              <div class="textimageTtem1"><span>出口</span></div>
              <el-row v-for="(item, index) in outImg" :key="index" :gutter="24" class="el-rowimg1">
                <el-col :span="24" class="el-colimg1">
                  <img width="100%" height="100%" :src="item" alt>
                </el-col>
              </el-row>
            </div>

          </div>

        </el-tab-pane>
      </el-tabs>

    </div>
  </div>

</template>

<script>
import rightItem1 from './Item1/index'
// import rightItem2 from './Item2/index'
export default {
  name: 'Right1',
  components: {
    rightItem1
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
      outImg: []
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
      // const wsuri = 'ws://120.25.155.42:8080/RealTimeEnterServer/' + vaId;
      const wsuri = 'ws://172.127.1.200:8080/RealTimeEnterServer/' + vaId
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
  width: 25.7rem;
  display: flex;
  flex-direction:column;
  justify-content: center;
}

.rightItem1 {
  align-items: center;
  padding-left: 4.725rem;
}

.rightItem2 {
  height: 40.3rem;
 margin-top:20px;
}

.el-col1 {
    border-radius: 1px;
    margin-bottom: -4px;

  }

.el-cards{
 background-color:transparent;
 color:aliceblue;
 border-color: #89d6fd;
}
.container {width: 100%;height:50%}
.photo {float: left; width: 40%;}
.content {float: right; width: 60%;}
.textimageTtem{
//  color: #89d6fd;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 20px;
}

.oranges {
	color: green;
  font-size:24px;
}
.green {
	color:coral;
}
.blue {
 color: red;
}

.imageItem {
  background-size: 100% 100%;
  display: flex;

}

.enterImg{
  flex:1;
  width: 10.85rem;
  padding-left: 1rem;
  padding-right: 0.7rem;
  height: 39.7rem;

}
.outImg{
  flex:1;
  width: 10.85rem;
  padding-left: 0.7rem;
  padding-right: 1rem;
  height: 39.7rem;

}
.el-colimg{
  height: 7.5rem;
  padding: 0.25rem;
  border-right: 1px dashed rgb(126, 131, 134);
  border-top: 1px dashed rgb(126, 131, 134);
}
.el-colimg1{
  height: 7.5rem;
  padding: 0.25rem;
  border-top: 1px dashed rgb(126, 131, 134);
}

.textimageTtem1{
  color: #409EFF;
  text-align: center;
}

</style>
