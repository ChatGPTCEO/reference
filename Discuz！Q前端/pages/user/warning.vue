<template>
  <view class="page-message">
    <view class="page-message--inner">
      <view class="page-message--icon">
        <qui-icon
          name="icon-userLocking"
          color="#ddd"
          size="120"
          v-if="auditInfo.errorCode === 'validate_reject'"
        ></qui-icon>
        <qui-icon name="icon-userWait" color="#008df0" size="120" v-else></qui-icon>
      </view>
      <view class="page-message--title">
        {{
          auditInfo.errorCode === 'validate_reject'
            ? i18n.t('user.validateReject')
            : i18n.t('user.registerValidate')
        }}
      </view>
      <view class="page-message--des">
        {{
          auditInfo.errorCode === 'validate_reject'
            ? i18n.t('user.validateRejectDes', {
                user: auditInfo.username,
                reason: auditInfo.reason,
              })
            : i18n.t('user.registerValidateDes', { user: auditInfo.username })
        }}
      </view>
      <view>
        <!-- #ifdef H5 -->
        <qui-button size="medium" @click="handleLoginClick" class="page-message--btn" v-if="isShow">
          {{ i18n.t('user.exitLogin') }}
        </qui-button>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <qui-button
          size="medium"
          @click="handleLoginClick"
          class="page-message--btn"
          v-if="registerType !== 2"
        >
          {{ i18n.t('user.exitLogin') }}
        </qui-button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script>
import forums from '@/mixin/forums';
// #ifdef H5
import appCommonH from '@/utils/commonHelper';
// #endif
import loginModule from '@/mixin/loginModule';

export default {
  mixins: [
    forums,
    // #ifdef H5
    appCommonH,
    // #endif
    loginModule,
  ],
  data() {
    return {
      isShow: true,
      // #ifdef H5
      isWeixin: false,
      // #endif
      registerType: 0,
    };
  },
  computed: {
    auditInfo() {
      const { auditInfo } = this.$store.state.session;
      return auditInfo;
    },
  },
  onShow() {
    // 隐藏待审核页面首页图标, 防止用户点击图标可以进入首页
    // #ifdef MP-WEIXIN
    uni.hideHomeButton();
    // #endif
  },
  mounted() {
    const registerType = uni.getStorageSync('register_type');
    this.registerType = registerType;
    if (this.auditInfo === 'validate_reject') {
      uni.setNavigationBarTitle({
        title: '账号未通过审核',
      });
    } else {
      uni.setNavigationBarTitle({
        title: '账号审核中',
      });
    }
  },
  created() {
    // #ifdef H5
    this.isWeixin = appCommonH.isWeixin().isWeixin;
    // 在微信无感模式下，微信内不显示退出登录
    if (this.registerType !== 2) {
      this.isShow = true;
    } else if (!this.isWeixin) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    // #endif
  },
  methods: {
    handleLoginClick() {
      const _this = this;
      // #ifdef MP-WEIXIN
      this.$store.dispatch('session/logout').then(() => {
        uni.clearStorage();
        uni.reLaunch({
          url: '/pages/home/index',
          success() {
            _this.getForum();
          },
        });
      });
      // #endif
      // #ifdef H5
      this.$store.dispatch('session/logout').then(() => {
        uni.clearStorage();
        // this.$router.push('/');
        uni.redirectTo({
          url: '/pages/home/index',
          success() {
            _this.getForum();
          },
        });
      });
      // #endif
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';

.page-message {
  display: flex;
  align-items: center;
  justify-content: center;
  &--inner {
    position: relative;
    padding-bottom: 20rpx;
    margin-top: 140rpx;
    text-align: center;
  }
  &--title {
    max-width: 510rpx;
    margin: 58rpx auto 20rpx;
    font-size: $fg-f5;
    font-weight: bold;
    line-height: 45rpx;
    color: rgba(51, 51, 51, 1);
  }
  &--des {
    max-width: 510rpx;
    margin: 0 auto 50rpx;
    font-size: $fg-f3;
    line-height: 40rpx;
    color: #aaa;
  }
  &--btn {
    color: #7d7979;
    border: 2rpx solid #ededed;
  }
}
</style>
