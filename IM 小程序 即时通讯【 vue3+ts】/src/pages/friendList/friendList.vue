<template>
  <view  class="friendList">
    <uni-list v-if="list.length>0">
      <uni-list-chat
          v-for="(item, i) in list" :key="item.username+i"
          :rightText="item.message"
          :avatar="item.avatarUrl"
          :time="getDateDiff(item.createTime)"
          :title="item.nickName"
          :note="noteMessage(item.message,item.type)"
          badge-positon="right"
          :clickable="true"
          @click="clickItem(item)"
          :badge-text="item.count">
      </uni-list-chat>
    </uni-list>
    <view v-else class="noMore">
      暂无聊天记录
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from "vue";
import { friendList} from "../../api/chat";
import {IChatFriend} from "../../types/store/chat";
import {getDateDiff} from "../../common/utils";
import {onPullDownRefresh, onShow} from "@dcloudio/uni-app";
import {IUserInfo} from "../../types/store/user";
import {store} from "../../store";


const list = computed(() => {
  return store.state.chat.friendList
})


const noteMessage = (msg: string, type: number) => {
  switch (type) {
    case 0:
      return msg
    case 1:
      return '【图片】'
    case 2:
      return '【视频】'
    case 3:
      return '【语音】'
  }
}

//下来刷新列表
onPullDownRefresh(async () => {
  await updateFriendList()
  uni.stopPullDownRefresh();
})

onShow(() => {
  updateFriendList()
})

//跳转聊天页面
const clickItem = (item: IUserInfo) => {
  uni.navigateTo({
    url: `/pagesChat/chatView/chatView?nickName=${item.nickName}&username=${item.username}`
  });
}

//更新数据
const updateFriendList = async () => {
  const list = await friendList() as Array<IChatFriend>
  store.commit('chat/setFriendList', list)
}

</script>

<style lang="scss" scoped>
.friendList {
  width: 750rpx;
}
view.noMore {
  text-align: center;
  margin-top: 100rpx;
  color: #8f949f;
}


::v-deep {
  .uni-list-chat__content-note {
  }

  .uni-list-chat__header-warp {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uni-list-chat__container {
    padding-top: 10rpx;
    padding-bottom: 10rpx;
  }
}
</style>
