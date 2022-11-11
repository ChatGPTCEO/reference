<template>
  <view class="content">
    <view class="menu">
      <view style="flex: 1">已选择：
        <text style="color: #007aff;font-weight: bold">{{ select.length }}</text>
      </view>
      <button size="mini" type="primary" @click="createGroup" :disabled="select.length===0">创建</button>
    </view>
    <uni-indexed-list :options="obj.options" :showSelect="true" @click="bindClick"></uni-indexed-list>
  </view>
</template>

<script setup lang="ts">

import {get, post} from "../../common/request";
import {onMounted, ref} from "vue";

type objType = { options: Array<string>, users: Array<string> }
const obj = ref<objType>({options: [], users: []})

onMounted(async () => {
  obj.value = await get<objType>('system/user/groupUsers', {}) as objType
})

const select = ref<Array<string>>([])
const bindClick = (item: { select: Array<{ itemIndex: number }> }) => {
  if (item.select.length <= 0) {
    select.value = []
  } else {
    const list = Array<string>()
    for (const s of item.select) {
      list.push(obj.value.users[s.itemIndex])
    }
    select.value = list
  }
}

//创建组
const createGroup = async () => {
  await post('system/user/groupCreate', select.value)
  uni.showToast({title: '创建成功！', icon: 'none'});
  //跳转朋友页面
  uni.reLaunch({
    url: '/pages/friendList/friendList'
  });
}
</script>

<style lang="scss" scoped>
.content {
  background: #ffffff;

  .menu {
    height: 100upx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 30upx;
    padding-right: 30upx;

    button {
      width: 140 rpx;
    }
  }

  ::v-deep .uni-indexed-list {
    margin-top: 100upx;
  }
}
</style>
