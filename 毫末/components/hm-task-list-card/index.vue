<template>
  <div class="hm-task-list-card">
    <div class="box">
      <div class="primary">
        <div class="outer">
          <text class="text">{{ options.text }}</text>
        </div>
        <div class="block_2">
          <div class="wrap">
            <text class="projectMeeting">{{ options.projectMeeting }}</text>
            <text class="word">{{ options.word }}</text>
          </div>
          <div class="block">
            <text class="num">{{ options.num }}</text>
            <text class="year">{{ options.year }}</text>
            <text class="num_2">{{ options.num_2 }}</text>
            <text class="month">{{ options.month }}</text>
            <text class="num_3">{{ options.num_3 }}</text>
            <text class="dayAfternoon">{{ options.dayAfternoon }}</text>
            <text class="text_2">{{ options.text_2 }}</text>
          </div>
          <div class="group">
            <text class="loremIpsumPrev">{{ options.loremIpsumPrev }}</text>
            <text class="loremIpsum">{{ options.loremIpsum }}</text>
          </div>
        </div>
        <text class="isPlaceholder">{{ options.isPlaceholder }}</text>
      </div>
      <text class="characterText">{{ options.characterText }}</text>
      <image class="side" :src="options.side" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmTaskListCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-task-list-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          text: 'P',
          projectMeeting: '项目会议',
          word: '…',
          num: '2019',
          year: '年',
          num_2: '2',
          month: '月',
          num_3: '26',
          dayAfternoon: '日下午',
          text_2: '2:29',
          loremIpsumPrev: '在出版和设计中，',
          loremIpsum: 'lorem ipsum',
          isPlaceholder: '是一个占位',
          characterText: '符文本。',
          side:
            './images/img_25847_0_0.png'
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
