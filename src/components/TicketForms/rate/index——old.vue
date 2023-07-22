<template>
  <div id="rate">

    <el-row :gutter="24">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总人数</span>
          </div>
          <div class="text item">

            票&ensp;&ensp;务： {{ page.ticket }}<br>
            工作证： {{ page.work }}<br>
            总&ensp;&ensp;数： {{ page.sum }}
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>入场人数</span>
          </div>
          <div class="text item">
            票&ensp;&ensp;务： {{ page.ticket1 }}<br>
            工作证： {{ page.work1 }}<br>
            总&ensp;&ensp;数： {{ page.sum1 }}
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>未入场人数</span>
          </div>
          <div class="text item">
            票&ensp;&ensp;务： {{ page.ticket2 }}<br>
            工作证： {{ page.work2 }}<br>
            总&ensp;&ensp;数： {{ page.sum2 }}
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import { getNumber } from '@/api/tf';

export default {
  props: {
    activity: {
      type: Object,
      default: () => {
        return {
          aId: ''
        };
      }
    }
  },
  data() {
    return {
      page: {
        ticket: 0,
        work: 0,
        sum: 0,
        ticket1: 1,
        work1: 1,
        sum1: 1,
        ticket2: 2,
        work2: 2,
        sum2: 2
      },
      activitys: []
    }
  },
  watch: {
    // 正确给 cData 赋值的 方法
    activity: function(newVal, oldVal) {
      this.activitys = newVal; // newVal即是chartData
      newVal && this.drawChart(); // newVal存在的话执行drawChar函数
    }
  },
  // 处于loading结束后，还做一些初始化，实现函数自执行（data数据已经初始化，但是DOM结构渲染完成，组件没有加载）
  // 没有这一步init不会执行
  created() {
    this.init();
  },
  methods: {
    init() {
    },

    drawChart() {
      const { aId } = this.activity;
      getNumber(aId).then(res => {
        const { data } = res;
        this.page.ticket = data.aTicketnumber;
        this.page.work = data.aEmployeenumber;
        this.page.sum = data.aEmployeenumber + data.aTicketnumber;
        this.page.ticket1 = data.ticket;
        this.page.work1 = data.work;
        this.page.sum1 = data.work + data.ticket;
        this.page.ticket2 = data.aTicketnumber - data.ticket;
        this.page.work2 = data.aEmployeenumber - data.work;
        this.page.sum2 = (data.aEmployeenumber + data.aTicketnumber) - (data.work + data.ticket);
      });
    }

  }
};
</script>

