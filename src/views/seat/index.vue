<template>
  <el-tabs type="border-card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <div class="ceshi">

        <span>cccccccccccccccccc</span>

        <span>11111111111111111111</span>
        <div class="mainpagess">
          <H1> 测试视频播放   rtspd地址  rtsp://admin:Aa123456@172.127.1.7:554/h264/ch1/main/av_stream</H1>
          <iframe
            id="ysOpenDevice"
            src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/E07820358/1.live&autoplay=1&accessToken=at.2phz7hjs19l47rp76ltawo5d7ikptwtu-7095o34rf4-1rw3ccn-gjktvdmyp"
            width="600"
            height="400"
            allowfullscreen
          />

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>

import Logout from '@/assets/src_imgs/background/stadium.svg'
/* eslint-disable */

export default {

  props: {

  },
  data() {
    return {
      
    }
  },
  methods:{
    getFrame(url){
      console.log("url:",url);
      return '/rtsp-frame.html?stc='+url
    }
  }
  

  
}
</script>

<style>
  .ceshi {
    /* background-color:aqua; */
  }
  .playWnd{
    width: 1000px;
    height: 500px;
   
  }

</style>
