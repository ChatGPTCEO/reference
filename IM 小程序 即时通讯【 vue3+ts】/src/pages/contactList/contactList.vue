<template>
  <view class="contact">
    <view class="title">
      <uni-search-bar @confirm="onRefresh" v-model="param.username" @blur="onRefresh" @cancel="cancel">
      </uni-search-bar>
      <button size="mini" @click="groupList" plain type="primary">创建群聊</button>
    </view>
    <scroll-view class="scroll_list" refresher-enabled="true" :lower-threshold="100"
                 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="scrolltolower" scroll-y>
      <uni-list>
        <uni-list-item v-for="(item, index) in userList"
                       :key="item.id"
                       :index="index"
                       :title="item.nickName"
                       :note="item.description"
                       :thumb="item.avatarUrl"
                       :clickable="true"
                       @click="clickItem(item)"
                       thumb-size="lg">
        </uni-list-item>
        <uni-load-more v-if="total>20" :status="loadStatus"></uni-load-more>
      </uni-list>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {contactList} from "../../api/chat";
import {IParams} from "../../api/types/common";
import {IUserInfo} from "../../types/store/user";
import {store} from "../../store";

const param = reactive<IParams>({
  pageNum: 1,
  pageSize: 20,
  username: ''
})

const userList = ref<Array<IUserInfo>>([])
const total = ref<number>(0)
const triggered = ref<boolean>(false)

onMounted(() => {
  getUserList()
})

// 加载状态
const loadStatus = computed(() => {
  if (triggered.value) {
    return 'loading'
  }
  if (userList.value.length === total.value) {
    return 'no-more'
  }
  return 'more'
})

//列表加载
const getUserList = async () => {
  triggered.value = true
  const data = await contactList({...param, hide: true})
  // TODO 插入客服在头部
  if (userList.value.length === 0) {
    userList.value.push({
      avatarUrl: "https://im.idb.com.cn/fs/static/customer.png",
      description: "测试客服-PC端回复消息",
      id: -1,
      nickName: "系统客服",
      username: "customer_system"
    })
  }
  userList.value.push(...data!.rows)
  total.value = data!.total
  triggered.value = false
}

const cancel = () => {
  if (param.username) {
    setTimeout(() => {
      onRefresh()
    }, 200)
  }
}

const clickItem = (item: IUserInfo) => {
  uni.navigateTo({
    url: `/pagesChat/chatView/chatView?nickName=${item.nickName}&username=${item.username}`
  });
}

const groupList = () => {
  uni.navigateTo({
    url: `/pagesChat/groupList/groupList`
  });
}

//下拉刷新
const onRefresh = () => {
  userList.value = []
  param.pageNum = 1
  getUserList()
}

//触底
const scrolltolower = () => {
  if (param.pageSize * (param.pageNum - 1) < total.value) {
    param.pageNum++
    getUserList()
  }
}


</script>

<style lang="scss" scoped>
view.contact {
  display: block;
  width: 100vw;
  overflow: hidden;

  & > uni-search-bar {
    height: 100upx;

    ::v-deep .uni-searchbar {
      background: #ffffff;
    }
  }

  & > scroll-view {
    height: calc(100vh - 100upx);
  }
  &>view.title{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    uni-search-bar{
      flex: 1;
    }

    button{
      margin-right: 20rpx;
    }
  }
}
</style>
