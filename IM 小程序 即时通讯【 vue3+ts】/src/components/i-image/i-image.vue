<template>
  <view class="header" @click="clickItem" :style="'width:'+width+';height:'+height">
    <view v-if="!flag" class="hideImg"></view>
    <image v-show="flag" @load="success" :mode="mode" :src="src"></image>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  src: {
    type: String,
    default: () => ''
  }, width: {
    type: String,
    default: () => '100rpx'
  }, height: {
    type: String,
    default: () => '100rpx'
  }, borderRadius: {
    type: String,
    default: () => '0rpx'
  }, mode: {
    type: String,
    default: () => 'aspectFill'
  }
});

//是否加载完成
const flag = ref<Boolean>(false)
//图片加载完成
const success = () => {
  flag.value = true
}

// 定义点击事件
interface EmitsType {
  (e: 'click', src: string): void;
}

const emit = defineEmits<EmitsType>();
const clickItem = () => {
  emit('click', props.src)
}

</script>

<style lang="scss" scoped>
// 动态绑定参数
$borderRadius: v-bind('props.borderRadius');

view.header {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;

  & > view {
    width: 100%;
    height: 100%;
    border-radius: $borderRadius;

  }

  & > image {
    width: 100%;
    height: 100%;
    border-radius: $borderRadius;
  }
}

view.hideImg {
  background: #8f949f;
}
</style>
