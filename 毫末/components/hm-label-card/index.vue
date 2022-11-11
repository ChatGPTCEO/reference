<template>
  <div class="hm-label-card">
    <div class="lableClass">
      <div class="primary"><image class="img" :src="options.img" /></div>
      <div class="tagClass">
        <image class="pinglun" :src="options.pinglun" />
      </div>
      <div class="heartClass">
        <image class="xinImg" :src="options.xinImg" />
      </div>
      <div class="searchClass">
        <image class="dot" :src="options.dot" />
        <image class="play" :src="options.play" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmLabelCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-label-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          img:
            '/static/hm-label-card/images/img_24028_0_2.png',
          pinglun:
            '/static/hm-label-card/images/img_24028_0_0.png',
          xinImg:
            '/static/hm-label-card/images/img_24028_0_1.png',
          dot:
            '/static/hm-label-card/images/img_24028_0_3.png',
          play:
            '/static/hm-label-card/images/img_24028_0_4.png'
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
