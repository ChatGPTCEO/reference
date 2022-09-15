<template>
  <button
    class="qui-button--button"
    :type="type"
    :size="size"
    :plain="plain"
    :disabled="disabled"
    :loading="loading"
    :form-type="formType"
    :open-type="openType"
    :hover-stop-propagation="hoverStopPropagation"
    :app-parameter="appParameter"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="handleGetPhoneNumber"
    @getuserinfo="handleGetUserInfo"
    @error="handleError"
    @opensetting="handleOpenSetting"
    @launchapp="handleLaunchApp"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      default: 'default',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
      default: '',
    },
    openType: {
      type: String,
      default: '',
    },
    appParameter: {
      type: String,
      default: '',
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'zh_CN',
    },
    sessionFrom: {
      type: String,
      default: '',
    },
    sendMessageTitle: {
      type: String,
      default: '',
    },
    sendMessagePath: {
      type: String,
      default: '',
    },
    sendMessageImg: {
      type: String,
      default: '',
    },
    showMessageCard: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleGetPhoneNumber(evt) {
      this.$emit('getphonenumber', evt);
    },
    handleGetUserInfo(evt) {
      this.$emit('getuserinfo', evt);
    },
    handleError(evt) {
      this.$emit('error', evt);
    },
    handleOpenSetting(evt) {
      this.$emit('opensetting', evt);
    },
    handleLaunchApp(evt) {
      this.$emit('launchapp', evt);
    },
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
// css
$default-bg-color: --color(--qui-BG-F9F);
$primary-bg-color: rgba(24, 120, 243, 1);
$success-bg-color: #07c160;
$danger-bg-color: #ee0a24;
$plain-bg-color: #fff;
$watch-bg-color: #fc9324;
$ask-bg-color: #fa5151;
$answer-bg-color: --color(--qui-BG-777);

/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
$txt-color-red: #ea3d5a;
/* #endif */
$txt-color-grey: --color(--qui-FC-TAG);
$txt-color-white: #fff;
$text-color-333: #333;
$txt-color-aaa: --color(--qui-FC-AAA);

$font-size-sm: 24rpx;
$font-size-md: 26rpx;
$font-size-lg: 28rpx;
$font-size-post: 40rpx;
.qui-button--button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $txt-color-grey;
  background: #f4f4f4;
  background-color: $default-bg-color;
  border-radius: 7rpx;
  &[type='primary'] {
    color: $txt-color-white;
    /* #ifdef MP-WEIXIN-PLAY || H5-PLAY */
    color: #fff;
    /* #endif */
    background-color: $primary-bg-color;
    /* #ifdef MP-WEIXIN-PLAY || H5-PLAY */
    background-color: #ea3d5a;
    border: none;
    /* #endif */
  }
  &[type='warn'] {
    color: $txt-color-white;
    background-color: $danger-bg-color;
  }
  &[type='success'] {
    color: $txt-color-white;
    background-color: $success-bg-color;
  }
  &[type='watch'] {
    font-size: $font-size-lg;
    color: $txt-color-white;
    background-color: $watch-bg-color;
  }
  &[type='answer'] {
    color: $txt-color-aaa;
    background-color: $answer-bg-color;
  }
  &[type='ask'] {
    color: $txt-color-white;
    background-color: $ask-bg-color;
  }
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  &[type='second_level'] {
    color: $txt-color-white;
    background-color: #fff;
    /* #ifdef MP-WEIXIN-PLAY */
    border: none;
    // background: #fff;
    /* #endif */
  }
  &[type='myradcolor'] {
    color: $txt-color-red;
    background-color: $plain-bg-color;
    border: $txt-color-red 1px solid;
  }
  &[type='QandAstyle'] {
    background: #ea3d5a;
    border-radius: 90rpx;
  }
  &[size='QandAstyle'] {
    width: 359rpx;
    height: 80rpx;
    font-size: $font-size-lg;
    color: #fff;
  }
  /* #endif */
  &[size='large'] {
    width: 670rpx;
    height: 90rpx;
    margin-bottom: 10rpx;
    font-size: $font-size-lg;
    border-radius: 0;
  }
  &[size='max'] {
    width: 100%;
    height: 90rpx;
    font-size: $font-size-lg;
  }
  &[size='medium'] {
    width: 510rpx;
    height: 90rpx;
    font-size: $font-size-lg;
  }
  &[size='small'] {
    width: 230rpx;
    height: 90rpx;
    font-size: $font-size-sm;
  }
  &[size='smalls'] {
    width: 250rpx;
    height: 90rpx;
    margin: 0 40rpx;
    font-size: $font-size-md;
  }
  &[size='default'] {
    height: 70rpx;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    height: 55rpx;
    min-width: 150rpx;
    /* #endif */
    padding: 18rpx 20rpx;
    font-size: $font-size-sm;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    color: #666;
    border-radius: 28rpx;
    /* #endif */
  }
  &[size='post'] {
    width: 200rpx;
    height: 100rpx;
    font-size: $font-size-post;
  }
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  &[size='minpink'] {
    width: 300rpx;
    height: 88rpx;
    font-family: 'PingFang SC';
    font-size: 32rpx;
    font-weight: 400;
    color: #333;
    background: #eee;
    border-radius: 44rpx;
    &:hover {
      color: #fff;
      background: #ea3d5a;
    }
  }
  /* #endif */
  &[plain][type='primary'] {
    color: $primary-bg-color;
    /* #ifdef MP-WEIXIN-PLAY */
    color: #fff;
    /* #endif */
    background-color: $plain-bg-color;
    /* #ifdef MP-WEIXIN-PLAY */
    background-color: #ea3d5a;
    border: none;
    /* #endif */
    border-color: currentColor;
  }
  &[plain][type='warn'] {
    color: $danger-bg-color;
    background-color: $plain-bg-color;
    border-color: currentColor;
  }
  &[plain][type='success'] {
    color: $success-bg-color;
    background-color: $plain-bg-color;
    border-color: currentColor;
  }
  &[plain][type='post'] {
    color: $text-color-333;
    background-color: $plain-bg-color;
    border: none;
    border-radius: 7rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  // &[plain][type='watch'] {
  //   border-color: currentColor;
  // }
}
</style>
