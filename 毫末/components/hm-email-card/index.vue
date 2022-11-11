<template>
  <div class="hm-email-card">
    <div class="box">
      <div class="titleClass">
        <image class="icon" :src="options.icon" />
        <div class="color" />
        <div class="wrap">
          <text class="num">{{ options.num }}</text>
          <text class="newMessages">{{ options.newMessages }}</text>
        </div>
      </div>
      <div class="content">
        <text class="summary">{{ options.summary }}</text>
        <text class="word">{{ options.word }}</text>
      </div>
      <div class="ft">
        <div class="block">
          <image class="avator" :src="options.avator" />
          <text class="alexander">{{ options.alexander }}</text>
        </div>
        <image class="statimg" :src="options.statimg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmEmailCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-email-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          icon:
            '/static/hm-email-card/imagesimg_25353_0_2.png',
          num: '1',
          newMessages: '条新消息',
          summary:
            '摄影是通过记录光线或其他电磁辐射，或通过图像传感器以电子方式，或通过化学方式，通过',
          word: '…',
          avator:
            '/static/hm-email-card/imagesimg_25353_0_0.png',
          alexander: '王二',
          statimg:
            '/static/hm-email-card/imagesimg_25353_0_1.png'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
