<template>
  <div class="item-center2">
    <el-card class="centerItem11">
      <div class="centerItem1">
        <div class="enterpiechart">
          <div>
            <Enterpiechart :eachexenter-list="eachexenterList" />
          </div>
        </div>
        <div class="earlywarning">
          <Early :intra-field="intraField" :a-employeenumber="aEmployeenumber" :a-ticketnumber="aTicketnumber" />
        </div>
        <div class="tempchart">
          <div>
            <Tempchart :tempchart-int="tempchartInt" />
          </div>
        </div>
        <div class="outpiechart">
          <div>
            <Outpiechart :eachexout-list="eachexoutList" />
          </div>
        </div>
      </div>
    </el-card>
    <el-tabs type="border-card" class="centerItem22">
      <el-tab-pane label="人流图">

        <div class="centerItem2">
          <div class="broken">
            <div class="enterlint">
              <div class="textimageTtem"><span>入口</span></div>
              <div>
                <broken :brokenlist="brokenlist" />
              </div>
            </div>
            <div class="outlint">
              <div class="textimageTtem"><span>出口</span></div>
              <div>
                <broken1 :brokenlist1="brokenlist1" />
              </div>
            </div>

          </div>
          <div class="lintchart">

            <div class="enterlint">
              <div>
                <EachexenterList :eachexenter-list="eachexenterList" /></div>
            </div>
            <div class="outlint">
              <div>
                <EachexoutList :eachexout-list="eachexoutList" />
              </div>
            </div>
          </div>
        </div>

      </el-tab-pane>

      <el-tab-pane label="人员分布图">
        <svgchart :number-o-farea="numberOFarea" />
      </el-tab-pane>
      <el-tab-pane label="设备信息分布图">
        <Device :a-id="aId" />
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import broken from './broken/index'
import broken1 from './broken1/index'
import EachexenterList from './EachexenterList/index'
import EachexoutList from './EachexoutList/index'
import Enterpiechart from './enterpiechart/index'
import Outpiechart from './outpiechart/index'
import Tempchart from './tempchart/index'
import Early from './earlywarning/index'
import svgchart from './svgchart/index'
import Device from './DeviceDisplay/index'
export default {
  name: 'Center2',
  components: {
    broken1,
    broken,
    EachexenterList,
    EachexoutList,
    Enterpiechart,
    Outpiechart,
    Tempchart,
    Early,
    svgchart,
    Device
  },
  props: {
    activity: {
      type: Object,
      default: () => {}
    },
    broken
  },
  data() {
    return {
      websock: null,
      brokenlist: [],
      brokenlist1: [],
      eachexenterList: [],
      eachexoutList: [],
      tempchartInt: [],
      aTicketnumber: null,
      aEmployeenumber: null,
      intraField: null,
      numberOFarea: [],
      aId: null
    }
  },
  watch: {
    activity: function(value, oldValue) {
      this.initWebSocket(value)
    }
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket(value) {
      //  const wsuri = 'ws://120.25.155.42:8080/RealTimePeopleServer/' + value.aId;
      const wsuri = 'ws://172.127.1.200:8080/RealTimePeopleServer/' + value.aId
      console.log(wsuri)
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose

      // 工作证总数和票务总数
      this.aEmployeenumber = value.aEmployeenumber
      this.aTicketnumber = value.aTicketnumber
      this.aId = value.aId
    },
    websocketonopen() {
      this.$notify({
        title: '成功',
        message: '实时（图表数据）连接成功',
        type: 'success'
      })
    },
    websocketonerror() {
      this.$notify({
        title: '警告',
        message: '实时（图表数据）连接失败',
        type: 'warning'
      })
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // this.chartData.rows.push(JSON.parse(e.data));
      // if (this.chartData.rows.length >= 20) {
      //   this.chartData.rows.shift();
      // }
      const redata = JSON.parse(e.data)
      this.brokenlist = redata.brokenlistrows
      this.brokenlist1 = redata.brokenlistrows1
      this.eachexenterList = redata.EachexenterList
      this.eachexoutList = redata.EachexoutList
      this.tempchartInt = redata.tempchartList
      const array = redata.intraFields
      this.intraField = array[0]['intraField']
      this.numberOFarea = redata.numberOFareas
    },
    websocketclose(e) {
      this.$notify({
        title: '警告',
        message: '各个入口实时人数连接已关闭',
        type: 'warning'
      })
      // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>

<style>
.item-center2 {
  display: flex;
  flex-direction:column;
  width: 64.6rem;
  height: 61.5rem;
}
.centerItem1{

  height: 18.5rem;
  width: 64.6rem;
  display: flex;
}
.el-card {
    border: 0px solid #EBEEF5;

    -webkit-transition: .3s;
    transition: .3s;
}
.centerItem11{
  background-color:transparent;
  height: 18.5rem;
  width: 64.6rem;
  display: flex;
}
.enterpiechart{
  width: 15.3rem;
}
.earlywarning{
  width: 15rem;
}
.tempchart{
  width: 15rem;
}

.outpiechart{
  width: 15.3rem;
}
.centerItem22{
  background-color:transparent;
  margin-top: 1rem;
  height: 42rem;
  width: 64.6rem;
  background-image: url("../../../assets/src_imgs/background/6.png");
  background-size:100% 100%;
  display: flex;
  flex-direction:column;
}
.el-tabs--border-card {
    background: transparent;
    border: 0px solid #DCDFE6;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
     background-color:transparent;
    border-right-color: #DCDFE6;
    border-left-color: #DCDFE6;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: 0px solid transparent;
    margin-top: -1px;
    color: #909399;
}
.el-tabs--border-card>.el-tabs__header {
    background-color: transparent;
     border-bottom: 0px solid #DCDFE6;
    margin: 0;
}
.broken{
  height: 19rem;
  display: flex;

}
.lintchart{
  height: 20rem;
  display: flex;
}
.enterlint{
  width: 32.3rem;
}
.outlint{
  width: 32.3rem;
}

.textimageTtem{
  color: #89d6fd;
  text-align: center;
}
.el-tabs--border-card>.el-tabs__header {
    background-color: transparent;
}
</style>
