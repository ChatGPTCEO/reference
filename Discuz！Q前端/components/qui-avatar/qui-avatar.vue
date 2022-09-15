<template>
  <view class="qui-avatar" @click="click">
    <!--<img v-if="avatarUrl" :src="user.avatarUrl" :class="'qui-avatar-' + size" />-->
    <image
      v-if="avatarUrl"
      :src="userInfo.username === usernameAt ? userInfo.avatarUrl : user.avatarUrl"
      :class="'qui-ava qui-avatar-' + size"
      @error="error"
    ></image>
    <view v-else-if="styleText" :class="'avatar' + ' qui-avatar-' + size" :style="styleText">
      {{ usernameAt }}
      <!--<view v-for="(group, index) in userRole" :key="index">
        <image :src="group.avatar"></image>
      </view>-->
    </view>
    <image v-if="isReal" src="@/static/auth.svg" class="auth-icon"></image>
  </view>
</template>

<script>
import stringToColor from '@/utils/stringToColor';

const sizes = {
  100: 'font-size: 24px;line-height: 80rpx;',
  // #ifdef H5-PLAY || MP-WEIXIN-PLAY
  90: 'font-size: 32px;line-height: 160rpx;',
  // #endif
  80: 'font-size: 24px;line-height: 80rpx;',
  70: 'font-size: 22px;line-height: 70rpx;',
  60: 'font-size: 20px;line-height: 60rpx;',
  50: 'font-size: 18px;line-height: 50rpx;',
};

export default {
  props: {
    user: {
      type: [Object, String],
      default() {
        return {};
      },
    },
    size: {
      type: [Number, String],
      default: 80,
    },
    isReal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      styleText: '',
      userInfo: '',
    };
  },
  computed: {
    avatarUrl() {
      return this.user.avatarUrl && this.user.avatarUrl.indexOf('/static/noavatar.gif') !== 0;
    },
    usernameAt() {
      return this.user.username
        ? this.user.username.charAt(0).toUpperCase()
        : this.i18n.t('core.noavatar');
    },
  },
  mounted() {
    this.styleText = this.style();
    const userId = this.$store.getters['session/get']('userId');
    if (userId) {
      const userInfo = this.$store.getters['jv/get'](`users/${userId}`);
      this.userInfo = userInfo;
    }
  },
  methods: {
    style() {
      const color = stringToColor(this.usernameAt);
      return `background-color: #${color};${sizes[this.size]}`;
    },
    error() {
      this.user.avatarUrl = false;
    },
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.qui-avatar {
  position: relative;
}
.qui-avatar .avatar,
.qui-ava {
  vertical-align: middle;
  border-radius: 50%;
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.qui-avatar-90 {
  width: 160rpx;
  height: 160rpx;
  line-height: 160rpx;
}
/* #endif */
.qui-avatar-100 {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
}
.qui-avatar-80 {
  width: 80rpx;
  height: 80rpx;
}
.qui-avatar-70 {
  width: 70rpx;
  height: 70rpx;
}
.qui-avatar-60 {
  width: 60rpx;
  height: 60rpx;
}
.qui-avatar-50 {
  width: 50rpx;
  height: 50rpx;
}

.qui-avatar .avatar {
  color: #fff;
  text-align: center;
  background-color: #e7edf3;
}
.auth-icon {
  position: absolute;
  right: 0;
  bottom: 4rpx;
  // z-index: 8;
  width: 22rpx;
  height: 26rpx;
}
</style>
