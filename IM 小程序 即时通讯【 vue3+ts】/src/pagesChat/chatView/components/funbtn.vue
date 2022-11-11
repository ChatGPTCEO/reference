<template>
  <view class="funBox">
    <view @click="change(1)" class="grid-item-box">
      <uni-icons type="camera-filled" :size="40" color="#777"/>
      <text class="text">拍照</text>
    </view>
    <view @click="change(2)" class="grid-item-box">
      <uni-icons type="image-filled" :size="40" color="#777"/>
      <text class="text">图片</text>
    </view>
    <view @click="change(3)" class="grid-item-box">
      <uni-icons type="videocam" :size="40" color="#777"/>
      <text class="text">视频</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {upload} from "../../../common/request";
import {uploadImage, uploadMedia} from "../../../api/common";
import {sendChatMessage} from "../../../store/chat/utils";

const change = (index: number ) => {
  if (index === 1) {
    uni.chooseImage({
      count: 6, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //从相册选择
      success: async (res)=> {
        for (const path of res.tempFilePaths) {
          const data = await uploadImage(path)
          console.log(data)
          sendChatMessage({
            message: data!.path,
            type: 1
          })
        }
      }
    });
  }
  if (index === 2) {
    uni.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: async (res) => {
        for (const path of res.tempFilePaths) {
          const data = await uploadImage(path)
          console.log(data)
          sendChatMessage({
            message: data!.path,
            type: 1
          })
        }
      }
    });
  }

  if (index === 3) {
    uni.chooseVideo({
      sourceType: ['camera', 'album'],
      success: async (res)=> {
        const data = await uploadMedia(res.tempFilePath)
        sendChatMessage({
          message: data!.path+','+data!.image,
          type: 2
        })
      }
    })
  }

}


</script>

<style lang="scss">

view.funBox {
  width: 100vw;
  height: 300rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.grid-item-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 200rpx;
  width: 250rpx;

  &:active{
    background: #d8d8d9
  }
}


</style>
