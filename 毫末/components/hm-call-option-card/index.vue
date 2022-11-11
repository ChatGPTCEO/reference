<template>
  <div class="hm-call-option-card">
    <div class="box">
      <image class="yaoqingjiangli" :src="yaoqingjiangli" />
      <text class="title">{{ title }}</text>
      <div class="bd">
        <text class="help">{{ help }}</text>
        <text class="date">{{ date }}</text>
        <text class="phoneIcon">{{ phoneIcon }}</text>
        <text class="phone">{{ phone }}</text>
      </div>
      <div class="main" />
      <div class="ft">
        <div class="tagWrap">
          <text class="startChat">{{ startChat }}</text>
        </div>
        <div class="tagWrap_2">
          <text class="voiceCall">{{ voiceCall }}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yaoqingjiangli:
        './images/img_26361_0_0.png',
      title: '我们会给您回电话的',
      help: '帮助',
      date: '24/7',
      phoneIcon: 'phone',
      phone: '8 800 3254486',
      startChat: '发起聊天',
      voiceCall: '语音电话'
    };
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
