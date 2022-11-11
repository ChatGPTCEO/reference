<template>
  <scroll-view id="scrollId" :scroll-into-view="intoView" @scrolltoupper="scrollToUpper" :upper-threshold="50"
               :scroll-y="true" :scroll-top="scrollTop">
    <uni-load-more v-if="store.state.chat.chatList.length>9" :contentText="contentText"
                   :status="loadMore"></uni-load-more>
    <view class="item" :id="'item_'+item.id" :key="item.id" v-for="(item,index) in store.state.chat.chatList">
      <chat-item :groupFlag="chatType===1" :Audio="Audio" :showTime="showTime(index)" :username="username"
                 :item="item"></chat-item>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {IChatMessage, IChatParams} from "../../api/types/chat";
import {customerUnReadCount, queryMessage, unReadCount} from "../../api/chat";
import {store} from "../../store";
import chatItem from './chatItem.vue'
import {get} from "../../common/request";

const props = defineProps({
  username: {
    type: String,
    default: () => ''
  }
});
//音频实例
const Audio: UniApp.InnerAudioContext = uni.createInnerAudioContext()

//音频停止事件
Audio.onStop(e => {
  closeAudioAnmition();
});

//音频播放结束事件
Audio.onEnded(e => {
  closeAudioAnmition();
});

//是否组聊天
const chatType = computed<number>(() => {
  if(!!props.username?.startsWith('group_')){
    return 1;
  }
  if(!!props.username?.startsWith('customer_')){
    return 2;
  }
  return 0
})

const intoView = ref('')
const scrollTop = ref<number>(0)
const loadMore = ref<string>('more')
const contentText = ref<any>({contentdown: "下拉加载历史消息", contentrefresh: "正在加载...", contentnomore: "没有更多历史消息了"})

//参数
const param = reactive<IChatParams>({
  to: props.username,
  from: store.state.user.info?.username!,
  time: ''
})

// 聊天数据
// const messageList = computed<Array<IChatMessage>>(() => {
//   return store.state.chat.chatList
// })

//是否展示时间
const showTime = (index: number): boolean => {
  if (index === 0) {
    return true
  }
  if (index === store.state.chat.chatList.length - 1) {
    return true
  }
  if (index > 0) {
    const time = store.state.chat.chatList[index].createTime! - store.state.chat.chatList[index - 1].createTime!
    if (time > 60) {
      return true
    }
  }
  return false
}

//TODO 聊天窗口初始化
onMounted(async () => {
  param.to = props.username
  //设置当前聊天用户信息
  store.commit('chat/setActive', props.username)
  let unread
  switch (chatType.value){
    case 0:{
      //加载历史未读消息
      unread = await unReadCount({to: props.username, from: param.from})
    }break
    case 1:{
      //已读群消息
      await get('chat/groupUnReadCount', {hide: true, groupId: props.username})
    }break
    case 2:{
      //确认已读客服消息
      unread = await customerUnReadCount()
    }break
  }
  //加载消息
  store.state.chat.chatList = await queryMessage({
    to: props.username,
    from: param.from,
    unread: unread
  }, chatType.value) as unknown as Array<IChatMessage>
  if (store.state.chat.chatList.length > 0) {
    //设置最新时间
    param.time = store.state.chat.chatList[0].createTime + ''
    setTimeout(() => {
      scrollTop.value = 9999
    }, 300)
  }
  if (store.state.chat.chatList.length < 10) {
    loadMore.value = 'noMore'
  }
})

onUnmounted(() => {
  console.log('onUnmounted...')
  Audio.destroy();
  store.state.chat.chatList = []
  store.state.chat.activeName = '' //很重要
})

//關閉動畫
const closeAudioAnmition = () => {
  for (const item of store.state.chat.chatList) {
    if (item.anmitionPlay) {
      item.anmitionPlay = false
    }
  }
}

watch(() => store.state.chat.updateId, () => {
  const id = store.state.chat.chatList[store.state.chat.chatList.length - 1].id
  nextTick(() => {
    intoView.value = 'item_' + id
  })
})

//触底顶加载历史消息
const scrollToUpper = async () => {
  if (loadMore.value === 'more') {
    loadMore.value = 'loading'
    //加载消息
    const list = await queryMessage(param, chatType.value) as unknown as Array<IChatMessage>
    if (list.length > 0) {
      store.state.chat.chatList.unshift(...list)
      //设置最新时间
      param.time = list[0].createTime + ''
      //设置滚动条位置
      intoView.value = 'item_' + list[list.length - 1].id
      //设置状态
      loadMore.value = 'more'
    } else {
      console.log('没有更多消息')
      loadMore.value = 'noMore'
    }
  }

}
</script>

<style lang="scss" scoped>
scroll-view {
  height: 100%;
}

.item {
  width: 100vw;
  margin-bottom: 20upx;
}
</style>
