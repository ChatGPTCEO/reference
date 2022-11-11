<template>
  <view class="card">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  view.card{
    background: #ffffff;
    box-sizing: border-box;
    width: 710rpx;
    margin-left: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    padding-bottom: 5rpx;
  }
</style>
