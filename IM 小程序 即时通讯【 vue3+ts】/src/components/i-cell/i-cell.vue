<template>
  <view @click="click" class="cell">
    <slot></slot>
    <view>{{ title }}</view>
    <view v-if="!slotDefault">
      {{ value }}
    </view>
  </view>
</template>

<!--
//定义
<slot name="test"/>
//使用
<template v-slot:test>test内容</template>
-->

<script setup lang="ts">
import {useSlots} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  }, value: {
    type: String,
    default: () => ''
  }
});

//判断<slot/>是否有传值
const slotDefault = !!useSlots().default;
//判断<slot name="test"/>是否有传值
//const slotTest = !!useSlots().test;


interface EmitsType {
  (e: 'click'): void;
}
const emit = defineEmits<EmitsType>();

const click = () => {
  console.log(222222222)
  emit('click')
}

</script>

<style lang="scss" scoped>
view.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90rpx;
  border-bottom: 2rpx solid #cccaca;
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;

  & > view:nth-child(1) {
    color: #1e1e1e;
    font-size: 35rpx;
    font-weight: bold;
    min-width: 110rpx;
  }
  & > view:nth-child(2) {
    width: 0;
    flex: 1;
    color: #818181;
  }
}
</style>
