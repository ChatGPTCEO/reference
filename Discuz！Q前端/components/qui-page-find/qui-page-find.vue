<template>
  <view class="find">
    <!-- #ifdef MP-WEIXIN -->
    <uni-nav-bar
      :title="i18n.t('home.find')"
      fixed="true"
      :color="navTheme === $u.light() ? '#000000' : '#ffffff'"
      :background-color="navTheme === $u.light() ? '#ffffff' : '#2e2f30'"
      status-bar
    ></uni-nav-bar>
    <!-- #endif -->
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <view class="find-item">
      <navigator url="/pages/site/search" hover-class="none">
        <qui-cell-item :title="i18n.t('profile.search')" arrow></qui-cell-item>
      </navigator>
      <navigator url="/pages/topic/list" hover-class="none">
        <qui-cell-item :title="i18n.t('topic.topic')" arrow :border="false"></qui-cell-item>
      </navigator>
    </view>
    <!-- 权限购买 -->
    <!-- <view class="find-item" v-if="purchasedisplay && system">
      <navigator url="/pages/modify/right" hover-class="none">
        <qui-cell-item
          :title="i18n.t('topic.permissionPurchase')"
          arrow
          :border="false"
        ></qui-cell-item>
      </navigator>
    </view> -->
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <view class="find-item">
      <navigator url="/pages/site/search" hover-class="none">
        <image src="../../static/h5-play/find_search@2x.png" class="find-item-icon"></image>
        <view class="find-weixin-padding">
          <qui-cell-item :title="i18n.t('profile.search')" arrow></qui-cell-item>
        </view>
      </navigator>
    </view>
    <view class="find-item">
      <navigator url="/pages/topic/list" hover-class="none">
        <image src="../../static/h5-play/find_topic@2x.png" class="find-item-icon"></image>
        <view class="find-weixin-padding">
          <qui-cell-item :title="i18n.t('topic.topic')" arrow :border="false"></qui-cell-item>
        </view>
      </navigator>
    </view>
    <!-- <view class="find-item" v-if="purchasedisplay && system">
      <navigator url="/pages/modify/right" hover-class="none">
        <image src="../../static/h5-play/authority_purchase@2x.png" class="find-item-icon"></image>
        <view class="find-weixin-padding">
          <qui-cell-item
            :title="i18n.t('topic.permissionPurchase')"
            arrow
            :border="false"
          ></qui-cell-item>
        </view>
      </navigator>
    </view> -->
    <!-- #endif -->
  </view>
</template>

<script>
import forums from '@/mixin/forums';
import loginModule from '@/mixin/loginModule';

export default {
  mixins: [forums, loginModule],
  props: {
    navTheme: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchValue: '',
      system: false,
      purchasedisplay: false,
      checked: false,
    };
  },
  watch: {
    forums: {
      handler(newValue) {
        if (newValue) {
          if (this.forums.set_site) {
            if (this.forums.set_site.site_pay_group_close === '1') {
              this.purchasedisplay = true;
            } else {
              this.purchasedisplay = false;
            }
          }
          const res = uni.getSystemInfoSync();
          // #ifndef H5
          if (res.platform === 'ios') {
            this.system = this.forums.paycenter.wxpay_ios;
          } else {
            this.system = true;
          }
          // #endif
          // #ifdef H5
          this.system = true;
          // #endif
        }
      },
      deep: true,
    },
  },
  methods: {
    jump2BuyPermission() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: '/pages/home/index',
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
        return;
      }
      uni.navigateTo({ url: '/pages/modify/right' });
    },
    ontrueGetList() {
      //
    },
    toSearch() {
      uni.navigateTo({
        url: '/pages/site/search',
      });
    },
    clearSearch() {
      this.searchValue = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.find /deep/ {
  .cell-item {
    padding-right: 40rpx;
  }
}
.find-item {
  padding-left: 40rpx;
  margin-bottom: 30rpx;
  background-color: --color(--qui-BG-2);
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.find /deep/ {
  .cell-item {
    padding-right: 40rpx;
    text-indent: 66rpx;
  }
}
.find-item {
  position: relative;
}
.find-item-icon {
  position: absolute;
  top: 22rpx;
  left: 26rpx;
  width: 60rpx;
  height: 60rpx;
}
/* #endif */
/* #ifdef  MP-WEIXIN-PLAY */
.find-weixin-padding {
  padding-right: 40rpx;
  padding-left: 60rpx;
}
/* #endif */
</style>
