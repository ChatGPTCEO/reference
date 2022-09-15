<template>
  <view class="qui-chapter-pay">
    <view class="qui-chapter-pay__title">
      {{ i18n.t('discuzq.post.chapterPay') }}
    </view>
    <view class="qui-chapter-pay__on-off" ref="onOff" @click="switchOnOff">
      <view class="qui-chapter-pay__on-off__circular">圆</view>
    </view>
  </view>
</template>

<script>
import { i18n } from '@/locale';

export default {
  name: 'QuiChapterPay',
  mixins: {
    i18n,
  },
  props: {},
  data() {
    return {};
  },
  watch: {
    // 监听得到的数据
  },
  created() {},
  methods: {
    switchOnOff() {
      const nodeOnOff = uni.createSelectorQuery().select('.qui-chapter-pay__on-off__circular');
      console.log(nodeOnOff);
    },
  },
};
</script>

<style scoped lang="scss">
.qui-chapter-pay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100rpx;
  color: #636363;

  &__on-off {
    position: relative;
    width: 91rpx;
    height: 40rpx;
    padding: 5rpx 0;
    background: #e5e5e5;
    background: pink;
    border-radius: 25rpx;

    &__circular {
      position: absolute;
      left: 4rpx;
      width: 40rpx;
      height: 40rpx;
      background: #fff;
      border-radius: 50%;
    }
  }
}
</style>
