<template>
  <div class="hm-information-card">
    <div class="box">
      <div class="hd">
        <div class="container">
          <div class="tagWrap">
            <text class="tag">{{ options.tag }}</text>
          </div>
          <div class="nameClass">
            <div class="wrap">
              <text class="alexander">{{ options.alexander }}</text>
            </div>
            <div class="dataClass">
              <text class="data">{{ options.data }}</text>
            </div>
          </div>
        </div>
        <image class="titleImg" :src="options.titleImg" />
      </div>
      <div class="summaryClass">
        <text class="summary">{{ options.summary }}</text>
        <text class="word">{{ options.word }}</text>
      </div>
      <div class="ft">
        <image class="shoucang" :src="options.shoucang" />
        <text class="num">{{ options.num }}</text>
        <text class="like">{{ options.like }}</text>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmInformationCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-information-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          tag: '阿杰',
          alexander: '阿雷',
          data: '星期三',
          titleImg:
            '/static/hm-information-card/images/img_24030_0_1.png',
          summary:
            '全息用户界面提供输入到电子或机电设备通过通过手指通过复制全息图像什么',
          word: '…',
          shoucang:
            '/static/hm-information-card/images/img_24030_0_0.png',
          num: '783',
          like: '喜欢'
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
