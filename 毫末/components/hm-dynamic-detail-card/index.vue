<template>
  <div class="hm-dynamic-detail-card">
    <div class="box">
      <text class="minutesAgo">{{ options.minutesAgo }}</text>
      <div class="hd">
        <text class="name">{{ options.name }}</text>
        <image class="avator" :src="options.avator" />
        <text class="introduce">{{ options.introduce }}</text>
      </div>
      <text class="dynamicDetail">{{ options.dynamicDetail }}</text>
      <image class="dynamicImage" :src="options.dynamicImage" />
      <text class="submain">{{ options.submain }}</text>
      <div class="row" />
      <div class="ft">
        <image class="Heart" :src="options.Heart" />
        <image class="messagingspeechbub" :src="options.messagingspeechbub" />
        <image class="tiaozhuandaomulu" :src="options.tiaozhuandaomulu" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmDynamicDetailCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-dynamic-detail-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          minutesAgo: '5分钟前',
          name: '张三',
          avator:
            '/static/hm-dynamic-detail-card/images/img_25823_0_3.png',
          introduce: 'xx国际ceo',
          dynamicDetail: '一切尽在计划之中',
          dynamicImage:
            '/static/hm-dynamic-detail-card/images/img_25823_0_4.png',
          submain: '124 喜欢',
          Heart:
            '/static/hm-dynamic-detail-card/images/img_25823_0_2.png',
          messagingspeechbub:
            '/static/hm-dynamic-detail-card/images/img_25823_0_1.png',
          tiaozhuandaomulu:
            '/static/hm-dynamic-detail-card/images/img_25823_0_0.png'
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
