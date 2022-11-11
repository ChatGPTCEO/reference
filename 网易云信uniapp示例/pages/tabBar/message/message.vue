<template>
  <view class="im-index-page">

    <div class="gray-line" style="height:24rpx"></div>
    <div class="content relative">
      <div v-if="!hasLogin" class="no-login flex-col-center" @click="gotoLogin">
        <div class="login-img flex-center-center">
          <img :src="emptyImg" alt="">
        </div>
        <div class="login-text flex-center-center">您尚未登录，无法查看聊天记录</div>
        <div class="flex-center-center" style="margin-top: 60rpx;">
          <div class="login-btn flex-center-center">
            登录查看历史消息
          </div>
        </div>

      </div>
      <div v-else-if="sessions.length==0" class="no-data flex-col-center">
        <div class="flex-row-start recent-contact">最近联系人
        </div>
        <div class="login-img flex-center-center">
          <img :src="emptyImg" alt="">
        </div>
        <div class="login-text flex-center-center">尚无联系人~</div>
        <div class="flex-center-center" style="margin-top: 60rpx;" @click="gotoIndexPage">
          <div class="login-btn flex-center-center">
            去添加
          </div>
        </div>
      </div>
      <div v-else-if="sessions.length>0" class="contact-list">
        <div style="font-size: 28rpx;font-weight: 600;      padding: 40rpx 30rpx;">最近联系人
        </div>
        <jk-im-contact-list :listData="sessions"></jk-im-contact-list>
      </div>
    </div>
  </view>
</template>

<script>
import config from '@/config'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      options: {},
      emptyImg: `${config.imgSrc}no-employ-img.png`,
      showAddGuid: false,
      contactList: []
    }
  },
  watch: {},
  computed: {
    ...mapState(['hasLogin']),
    ...mapState('im', { sessions: 'sessions', personList: 'personList', unreadTotalNum: 'unreadTotalNum' })
  },
  methods: {
    ...mapMutations(['setCurrentTabbar']),
    gotoLogin() {
      uni.switchTab({
        url: '/pages/tabBar/index/index'
      })
    },
    gotoIndexPage() {
      this.$router.push({ path: '/pages/tabBar/index/index' })
    }
  },
  onLoad(options) {
    this.options = options
  },
  onReady() {},
  onShow() {
    this.$store.commit('im/setUnreadTotalNum', this.unreadTotalNum)
  },
  onHide() {},
  onUnload() {},
  onReachBottom() {},
  onPullDownRefresh() {},
  onShareAppMessage() {}
}
</script>

<style lang="scss">
.im-index-page {
  .content {
    height: 70vh;
    .login-img {
      img {
        width: 550rpx;
        height: 400rpx;
      }
    }
    .login-text {
      margin-top: 40rpx;
      font-size: 28rpx;
      color: #b4b8b8;
    }
    .login-btn {
      width: 402rpx;
      height: 88rpx;
      background: #3cc3ff;
      border-radius: 44rpx;
      color: #ffffff;
    }
    .no-data,
    .no-login {
      height: 100%;
    }
    .recent-contact {
      position: absolute;
      top: 40rpx;
      left: 32rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
    }
    .contact-list {
      // padding: 40rpx 30rpx;
    }
  }
}
</style>
