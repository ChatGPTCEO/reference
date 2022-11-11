<template>
  <view class="content">
    <i-card>
      <view @click="updateUserInfo" class="title">
        <i-image mode="aspectFill" width="150rpx" height="150rpx" borderRadius="20rpx" :src="user.avatarUrl"></i-image>
        <view>
          <text style="font-size: 40rpx;font-weight: bold">{{ user.nickName }}</text>
          <text style="color: #007aff">
            账号： {{ user.username }}
          </text>
        </view>
      </view>
    </i-card>
    <i-card>
      <view class="selectAvatar" >
        <i-image  @click="selectAvatar" mode="aspectFill" width="150rpx" height="150rpx" borderRadius="20rpx" :src="user.avatarUrl"></i-image>
      </view>
      <i-cell @click="open('nickName')" title="昵称" :value="user.nickName"></i-cell>
      <i-cell @click="open('sex')" title="性别" :value="user.sex"></i-cell>
      <i-cell @click="open('mobile')" title="手机" :value="user.mobile"></i-cell>
      <i-cell @click="open('email')" title="邮箱" :value="user.email"></i-cell>
      <i-cell @click="open('description')" title="介绍" :value="user.description"></i-cell>

    </i-card>

    <i-card>
      <button type="primary" @click="logout">退出登录</button>
    </i-card>
  </view>

  <!-- 输入框示例 -->
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog mode="input" title="输入内容" :value="popupValue" placeholder="请输入内容"
                      @confirm="dialogInputConfirm"></uni-popup-dialog>
  </uni-popup>
</template>

<script setup lang="ts">
import {store} from "../../store";
import {computed, ref} from "vue";
import {IUserInfo} from "../../types/store/user";
import {updateUser, getUserInfo, uploadImage} from "../../api/common";
import ICell from "../../components/i-cell/i-cell.vue";
import {login} from "../../common/request";
import {onPullDownRefresh} from "_@dcloudio_uni-app@3.0.0-alpha-3040520220413002@@dcloudio/uni-app";

//
const popup = ref()
const popupType = ref('')
const popupValue = ref('')

//用户信息
const user = computed<IUserInfo>(() => {
  return store.state.user.info!;
})
const open = (type: string) => {
  popupType.value = type
  popupValue.value = (user.value as any)[type] || ''
  popup.value.open('top')
}

// 更新用戶信息
const dialogInputConfirm = (val: string) => {
  const userInfo = (store.state.user.info as any)
  userInfo[popupType.value] = val
  updateUser(userInfo)
}

//下来刷新列表
onPullDownRefresh(async () => {
  const userInfo = await getUserInfo()
  store.commit('user/setUser', userInfo?.user)
  uni.stopPullDownRefresh();
})


//更新登录用户
const updateUserInfo = () => {
  uni.showModal({
    title: '温馨提示',
    content: '你好，授权微信登录后才能正常使用小程序功能',
    success: (res) => {
      if (res.confirm) {
        uni.getUserProfile({
          lang: 'zh_CN',
          desc: '获取用户个人信息',
          success: async (detail) => {
            console.log(detail)
            await updateUser(detail.userInfo)
            await login()
          },
          fail: (msg) => {
            console.log(msg)
          }
        })
      }
    }
  })
}

const selectAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: async (res) => {
      const data = await uploadImage(res.tempFilePaths[0])
      store.state.user.info!.avatarUrl = data!.path
      store.commit('user/setUser', store.state.user.info)
      await updateUser(store.state.user.info)
    }
  });
}

const logout=()=>{
  //退出登录
  store.commit('user/userLogout')
  uni.redirectTo({url: '/pages/index/login'});
}

</script>

<style lang="scss" scoped>

// 对话框居中
::v-deep uni-popup-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

view.title {
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 150rpx;
  padding: 30rpx;

  & > view {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90%;
    margin-left: 20rpx;
  }

  text {
    font-size: 30rpx;
  }
}

.selectAvatar{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
</style>
