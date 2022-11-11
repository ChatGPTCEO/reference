<template>
  <view v-if="!flag" class="hideImg">
    <uni-icons type="spinner-cycle" size="30"></uni-icons>
  </view>
  <image @click="showImage" v-show="flag" @load="success" :lazy-load="true" mode="heightFix" :src="message"></image>
</template>

<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
})


//是否加载完成
const flag = ref<Boolean>(false)
//图片加载完成
const success = () => {
  flag.value = true
}

const showImage = () => {
  uni.previewImage({
    urls: [props.message],
  });
}
</script>

<style lang="scss" scoped>
.hideImg{
  width: 400upx;
  height: 400upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
image {
  max-width: 400upx;
  max-height: 400upx;
}
</style>