<template>
  <view v-if="type===0" style="display: flex;justify-content: center;width: 100vw;background: #FFFFFF;">
    <view class="userItem">
      <view>
        <image :src="userInfo.avatarUrl"></image>
      </view>
      <view>
        <text>用户ID</text>
        <text>{{ userInfo.username }}</text>
      </view>
      <view>
        <text>昵称</text>
        <text>{{ userInfo.nickName }}</text>
      </view>
      <view>
        <text>性别</text>
        <text>{{ userInfo.sex }}</text>
      </view>
      <view>
        <text>用户介绍</text>
        <view>{{ userInfo.description }}</view>
      </view>
      <view>
        <text>注册时间</text>
        <text>{{ userInfo.createdAt }}</text>
      </view>
      <view>
        <text>最近登录</text>
        <text>{{ userInfo.lastLoginTime }}</text>
      </view>
      <view style="margin-top: 10rpx;padding-bottom: 10rpx;">
        <button @click="delFriendUser" type="warn">移除聊天列表</button>
      </view>
    </view>
  </view>

  <!-- 群信息 -->
  <view v-if="type===1">
    <i-cell @click="open()" title="群昵称" :value="groupInfo.nickName"></i-cell>
    <button @click="quitGroupHandle" type="warn" style="margin: 10rpx;">退出群聊</button>
    <view class="groupList">
      <view @click="openGroupUser(item)" :key="item.id" v-for="item in groupList">
        <image :src="item.avatarUrl"></image>
        <text>{{ item.nickName }}</text>
      </view>
      <view @click="inviterGroup">
        <uni-icons type="plus-filled" size="43"></uni-icons>
        <text>邀请好友进群</text>
      </view>
    </view>
  </view>
  <view v-if="type===2" style="display: flex;justify-content: center;width: 100vw;background: #FFFFFF;">
    <view class="userItem">
      <view>
        <text>系统客服</text>
        <view>登录PC管理端客服可以进行与客户进行会话，可以切换多个客服账号进行聊天</view>
      </view>
      <view style="margin-top: 10rpx;padding-bottom: 10rpx;">
        <button @click="delFriendUser" type="warn">移除客服出聊天列表</button>
      </view>
    </view>
  </view>
  <!-- 输入框示例 -->
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog mode="input" title="输入内容" :value="popupValue" placeholder="请输入内容"
                      @confirm="dialogInputConfirm"></uni-popup-dialog>
  </uni-popup>

  <!-- 输入框示例 -->
  <uni-popup ref="groupMenu" type="dialog">
    <view class="userItem">
      <view>
        <image :src="groupSelectUser.avatarUrl"></image>
      </view>
      <view>
        <text>用户ID</text>
        <text>{{ groupSelectUser.username }}</text>
      </view>
      <view>
        <text>昵称</text>
        <text>{{ groupSelectUser.nickName }}</text>
      </view>
      <view>
        <text>入群日期</text>
        <text>{{ groupSelectUser.createdAt }}</text>
      </view>
      <view>
        <text>邀请人ID</text>
        <text>{{ groupSelectUser.inviter }}</text>
      </view>
      <view v-if="userName!==groupSelectUser.username" style="margin-top: 10rpx;padding-bottom: 10rpx;">
        <button @click="kickGroupItem" type="warn" plain>踢出群聊</button>
        <button type="primary" @click="goToChat" plain>发起聊天</button>
      </view>
    </view>
  </uni-popup>

</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {computed, ref} from "vue";
import {
  deleteFriend,
  getGroupInfo,
  groupUpdateName,
  groupUserList,
  kickGroup,
  queryUser,
  quitGroup
} from "../../api/chat";
import {IGroupInfo} from "../../api/types/chat";
import Image from "../../pages/poster/image.vue";
import {IUserInfo} from "../../types/store/user";
import {store} from "../../store";

const type = ref(0)
const groupList = ref<Array<IGroupInfo>>([])
const groupInfo = ref<IGroupInfo>({})
const username = ref('')
const userInfo = ref<IUserInfo>({username: ''})
const userName = computed(() => { //当前登录账号
  return store.state.user.info?.username
})
onLoad(async (option) => {
  username.value = option.username!
  // 角色
  if (username.value?.startsWith('group_')) {
    type.value = 1
    groupInfo.value = await getGroupInfo(username.value) as IGroupInfo
    groupList.value = await groupUserList(username.value) as Array<IGroupInfo>
  } else if (username.value?.startsWith('customer_')) {
    //客服
    type.value = 2
  } else {
    // 普通用户
    userInfo.value = await queryUser(username.value) as IUserInfo
  }
})

// 群更新
const popup = ref()
const popupValue = ref('')
const open = () => {
  popupValue.value = groupInfo.value?.nickName!
  popup.value.open('top')
}
// 更新信息
const dialogInputConfirm = async (val: string) => {
  await groupUpdateName(username.value, val)
  groupInfo.value.nickName = val
  uni.showToast({title: '群昵称更新成功！', icon: 'none'});
}

/**
 * 群用户信息
 */
const groupMenu = ref()
const groupSelectUser = ref<IGroupInfo>({})
const openGroupUser = (item: IGroupInfo) => {
  groupSelectUser.value = item
  groupMenu.value.open('center')
}
//踢出群聊
const kickGroupItem = () => {
  uni.showModal({
    title: '提示',
    content: '是否踢出群聊？',
    success: function (res) {
      if (res.confirm) {
        kickGroup(username.value, groupSelectUser.value.username!).then(() => {
          const index = groupList.value.findIndex((i) => {
            return i.username === groupSelectUser.value.username!
          })
          if (index > -1) {
            groupList.value.splice(index, 1)
            groupMenu.value.close()
          }
        })
      }
    }
  });
}
// 退出群聊
const quitGroupHandle = () => {
  uni.showModal({
    title: '提示',
    content: '是否退出群聊？',
    success: function (res) {
      if (res.confirm) {
        quitGroup(username.value).then(() => {
          uni.switchTab({
            url: '/pages/friendList/friendList'
          });
        })
      }
    }
  });
}
const goToChat = () => {
  uni.navigateTo({
    url: `/pagesChat/chatView/chatView?nickName=${groupSelectUser.value.nickName}&username=${groupSelectUser.value.username}`
  });
}
const inviterGroup = () => {
  uni.navigateTo({
    url: `/pagesChat/groupList/groupList?groupId=${username.value}`
  });
}


/**
 * 好友
 */
const delFriendUser = () => {
  deleteFriend(username.value)
  uni.showToast({title: '删除成功！', icon: 'none'});
  uni.switchTab({
    url: '/pages/friendList/friendList'
  });
}
</script>

<style lang="scss" scoped>
.groupList {
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  display: grid;
  grid-template-columns: repeat(auto-fill, 25vw);
  width: 100vw;
  height: 200rpx;

  & > view {
    margin: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #FFFFFF;
    padding: 5rpx;

    image {
      width: 24vw;
      height: 22vw;
    }
  }
}

text {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  color: #555555;
}

.userItem {
  width: 90vw;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 10rpx;

  & > view {
    border-bottom: 1px silver solid;

    image {
      width: 200rpx;
      height: 200rpx;
      margin-left: calc(50% - 100rpx);
      margin-bottom: 10rpx;
    }

    display: flex;
    justify-content: flex-start;

    // details
    & > view {
      min-height: 70rpx;
      word-break: break-all;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;

    }

    & > text {
      height: 50rpx;
      padding-bottom: 20rpx;
      padding-top: 20rpx;
      font-size: 26rpx;

      &:nth-child(1) {
        width: 230rpx;
        font-weight: bold;
        text-align: right;
        flex-shrink: 0;

        &:after {
          content: '：';
        }
      }

      &:nth-child(2) {
        flex: 1;
        text-align: left;
      }
    }
  }
}
</style>
