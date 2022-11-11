<template>
  <view class="chat-time" v-if="showTime">
    <text>{{ formatSimpleDateTime(item.createTime) }}</text>
  </view>
  <view class="chat-body" :class="leftFlag(item)?'chat-left':'chat-right'">
    <view class="chat-header">
      <i-image borderRadius="20rpx" :src="item.avatar"></i-image>
      <view>
        <text v-if="leftFlag(item)&&item.from.startsWith('customer_')" style="color: #007aff">[客服]</text>
        <text v-if="leftFlag(item)&&(groupFlag||item.from.startsWith('customer_'))">{{item.nickName}}</text>
      </view>
    </view>
    <view class="box" :class="leftFlag(item)?'left':'right'"/>
    <view class="msg">
      <rich-text v-if="item.type===0" :nodes="contentReplace(item.message)"></rich-text>
      <image-text v-if="item.type===1" :message="item.message"></image-text>
      <video-text v-if="item.type===2" :message="item.message"></video-text>
      <audio-text v-if="item.type===3" :Audio="Audio" :item="item" :leftFlag="leftFlag(item)"></audio-text>
    </view>
    <view class="readType" v-if="!leftFlag(item)&&!props.groupFlag">
      <text v-if="item.status===1" style="color: #8f949f">已读</text>
      <text v-else>未读</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type {PropType} from '@vue/runtime-core';
import {IChatMessage} from "../../api/types/chat";
import {formatSimpleDateTime, getDateDiff} from "../../common/utils";
import IImage from "../../components/i-image/i-image.vue";
import {faceUtils} from "./components/util";
import videoText from './components/video-text.vue'
import audioText from './components/audio-text.vue'
import ImageText from './components/image-text.vue'
import {store} from "../../store";

const props = defineProps({
  item: {
    // 页码
    type: Object as PropType<IChatMessage>,
    default: {},
  },
  //当前聊天用户
  username: {
    type: String,
    default: () => ''
  },
  //是否组聊天
  groupFlag: {
    type: Boolean,
    default: false
  },
  showTime: {
    type: Boolean,
    default: false
  },
  Audio: {
    type: Object as PropType<UniApp.InnerAudioContext>
  }
})

//是否他人消息
const leftFlag=(item:IChatMessage):boolean=>{
  if(item.from!.startsWith('customer_')){
    return true
  }
  if(props.groupFlag){
    return item.from!==store.state.user.info?.username
  }else {
    return  item.from===props.username
  }
}

const contentReplace = (content: string): string => {
  const fa = faceUtils.faces() as any;
  content = content
      // 转义表情
      .replace(/\[([^\s\[\]]+?)]/g, function (face) {
        let alt = face.replace(/^/g, '')
        return '<img class="emoji" style="width:28rpx;height:28rpx;"  src="' + fa[alt] + '"/>'
      })
  return content
}
</script>

<style lang="scss" scoped>
$leftColor: #0A98D5;
$rightColor: #c3d0d5;

view.chat-time {
  text-align: center;
  margin-bottom: 5upx;

  text {
    background: #acb5c0;
    color: #fdfdfd;
    padding: 5upx 15upx 5upx 15upx;
    border-radius: 15upx;
    font-size: 22upx;
  }
}

view.chat-body {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .box {
    width: 0px;
    height: 0px;
    border-width: 10upx;
    border-style: solid;
    margin-top: 5upx;

    &.left {
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }

    &.right {
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
  }

  .msg {
    min-height: 60upx;
    max-width: 480upx;
    font-size: 28upx;
    line-height: 30upx;
    padding: 10upx 20upx;
    display: flex;
    align-items: center;
    border-radius: 20upx;

    image {
      min-width: 250upx;
      max-width: 100%;
    }

  }

  view.readType {
    margin-right: 10upx;
    color: #b07474;
  }

  view.chat-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: #3F536E;

    &>view{
      white-space: nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      max-width: 130rpx;
      height: 30rpx;
      font-size: 22rpx;
      line-height: 30rpx;
    }
  }

  &.chat-left {
    color: #ffffff;
    margin-left: 15upx;

    & > .msg {
      background: $leftColor;
    }

    & > .box {
      border-right-color: $leftColor;
    }
  }

  &.chat-right {
    flex-direction: row-reverse;
    margin-right: 15upx;

    & > .msg {
      background: $rightColor;
      word-break: break-all
    }

    & > .box {
      border-left-color: $rightColor;
    }
  }

  view.chat-content {
    background: #007aff;
    max-width: 80vw;
  }
}
</style>
