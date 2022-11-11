<template>
  <!-- 表情 -->
  <swiper class="emoji-swiper" indicator-dots="true" duration="150">
    <swiper-item v-for="(page,pid) in faceList" :key="pid">
      <view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
        <image mode="widthFix" :src="'../../static/emoji/'+em.url"></image>
      </view>
    </swiper-item>
  </swiper>
</template>

<script setup lang="ts">
import {faceUtils} from './util'
import {ref} from "vue";

const faceList = ref(faceUtils.emojiList())


interface EmitsType {
  (e: 'addEmoji', em: string): void;
}

const emit = defineEmits<EmitsType>();

const addEmoji = (em: string) => {
  emit('addEmoji', em)
}
</script>

<style lang="scss" scoped>
.emoji-swiper {
  height: 290upx;

  swiper-item {
    display: grid;
    grid-template-columns: repeat(auto-fill, 12.5vw);

    view {
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 8.5vw;
        height: 8.5vw;
      }
    }
  }
}
</style>
