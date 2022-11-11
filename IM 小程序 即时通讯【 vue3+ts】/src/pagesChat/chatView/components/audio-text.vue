<template>
  <view class="voiceBody" @click="handleAudio"
        :style="{width:`${80+msg[1]*5}rpx`}">
    <view class="voice_icon" :class="[
										{ voice_icon_right: !leftFlag },
										{ voice_icon_left: leftFlag },
										{ voice_icon_right_an: item.anmitionPlay && !leftFlag },
										{ voice_icon_left_an: item.anmitionPlay && leftFlag }
									]"></view>
    <view class="">{{ msg[1] }}</view>
  </view>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {IChatMessage} from "../../../api/types/chat";
import {store} from "../../../store";

const props = defineProps({
  item: {
    type: Object as PropType<IChatMessage>,
    default: {},
  },
  leftFlag: { //是否左边消息
    type: Boolean,
    default: true
  },
  Audio:{
    type: Object as PropType<UniApp.InnerAudioContext>
  }
})

//消息
const msg = props.item.message?.split(',')

//播放声音
const handleAudio = () => {
  props.item.anmitionPlay = !props.item.anmitionPlay
  if(props.item.anmitionPlay){
    playAudio()
  }else {
    stopAudio();
  }

}




//播放音频
const playAudio=()=> {
  let src=store.state.chat.tempFilePath[msg![0]]
  if(src){
    props.Audio!.src = src;
    props.Audio!.play();
  }else {
    // 将文件下载至本地后用本地连接播放
    uni.downloadFile({
      url: msg![0],
      success: (res) => {
        if (res.tempFilePath) {
          console.log('下载成功-'+res.tempFilePath)
          store.state.chat.tempFilePath[msg![0]] = res.tempFilePath;
          props.Audio!.src = res.tempFilePath;
          props.Audio!.play();
        }
      },
      fail: (err) => {
        console.log("err", err);
      },
    });
  }
}
//停止音频
const stopAudio=()=> {
  props.Audio!.src = '';
  props.Audio!.stop();
}

</script>

<style lang="scss" scoped>

.voiceBody{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.voice_icon {
  height: 34rpx;
  width: 34rpx;
  background-repeat: no-repeat;
  background-size: 100%;
}

.voice_icon_right {
  background-image: url(../../static/voice-left-3.png);
  margin-left: 10rpx;
}

.voice_icon_left {
  background-image: url(../../static/voice-right-3.png);
  margin-right: 10rpx;
}

.voice_icon_right_an {
  animation: voiceAn_right 0.5s linear  infinite;
}

.voice_icon_left_an {
  animation: voiceAn_left 0.5s linear  infinite;
}

@keyframes voiceAn_right {
  0% {
    background-image: url(../../static/voice-left-1.png);
  }
  50% {
    background-image: url(../../static/voice-left-2.png);
  }
  100% {
    background-image: url(../../static/voice-left-3.png);
  }
}

@keyframes voiceAn_left {
  0% {
    background-image: url(../../static/voice-right-1.png);
  }
  50% {
    background-image: url(../../static/voice-right-2.png);
  }
  100% {
    background-image: url(../../static/voice-right-3.png);
  }
}


</style>