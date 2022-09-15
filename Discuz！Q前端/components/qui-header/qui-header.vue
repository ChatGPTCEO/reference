<template>
  <view>
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <view
      :class="['header', headerH5]"
      :style="
        backgroundHeadFullImg
          ? `background-image: url(${backgroundHeadFullImg});`
          : `background: ${color ? color : '--color(--qui-FC-FFF)'}`
      "
    >
      <view class="logoBox" @click="logoClick">
        <image
          class="logo"
          :src="headImg != '' && headImg != null ? headImg : '/static/admin-logo-x2.png'"
          mode="aspectFit"
          lazy-load
        ></image>
      </view>
      <view class="circleDet">
        <text>
          <text class="circleDet-txt">{{ t.theme }}</text>
          <text class="circleDet-num">{{ themeNum }}</text>
        </text>
        <text>
          <text class="circleDet-txt">{{ t.homecontent }}</text>
          <text class="circleDet-num">{{ postNum }}</text>
        </text>

        <view class="circleDet-share" @click="open">
          <qui-icon class="qui-icon" name="icon-share1" size="26" :color="iconcolor"></qui-icon>
          {{ t.share }}
        </view>
        <view class="mask" v-if="shareShow" @click="closeShare">
          <view class="wxShareTip">
            <img src="/static/sharePoint.png" alt class="sharePoint" />
            <img src="/static/shareKnow.png" alt class="shareKnow" />
          </view>
        </view>
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <view
      :class="backgroundHeadFullImg ? ['header', headerH5] : ['header', 'headerCopy', headerH5]"
      :style="
        backgroundHeadFullImg
          ? `background-image: url(${backgroundHeadFullImg})`
          : `background: ${color ? color : '#ea3d5a'}`
      "
    >
      <view class="logoBox" @click="logoClick">
        <view class="header-title">
          <!-- <image class="close" src="./../../static/h5-play/close@2x.png"></image>
          <view class="">
            ayawawa 官方支持论坛
          </view>
          <image class="ellipse" src="./../../static/h5-play/ellipse@2x.png"></image> -->
        </view>
        <!--   <image
          class="logo"
          src="./../../static/h5-play/ayawawa@2x.png"
          mode="aspectFit"
          lazy-load
        ></image> -->
        <image
          class="logo"
          :src="headImg != '' && headImg != null ? headImg : '../../static/admin-logo-x2.png'"
          mode="aspectFit"
          lazy-load
        ></image>
      </view>
      <view class="circleDet">
        <view class="circleDet_box">
          <image class="top" src="./../../static/h5-play/Members@2x.png"></image>
          <view class="bottom">
            <text class="circleDet-txt">{{ t.theme }}</text>
            <text class="circleDet-num">{{ themeNum }}</text>
          </view>
        </view>
        <view class="circleDet_box">
          <image class="top" src="./../../static/h5-play/content@2x.png"></image>
          <view class="bottom">
            <text class="circleDet-txt">{{ t.homecontent }}</text>
            <text class="circleDet-num">{{ postNum }}</text>
          </view>
        </view>
        <view class="circleDet-share" @click="open">
          <image class="top" src="./../../static/h5-play/share@2x.png"></image>
          <view>
            {{ t.share }}
          </view>
        </view>
        <view class="mask" v-if="shareShow" @click="closeShare">
          <view class="wxShareTip">
            <img src="/static/sharePoint.png" alt class="sharePoint" />
            <img src="/static/shareKnow.png" alt class="shareKnow" />
          </view>
        </view>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>
<script>
let headerH5 = 'header-h5';
/* #ifdef MP-WEIXIN */
headerH5 = '';
/* #endif */
export default {
  name: 'QuiHeader',
  props: {
    headImg: {
      type: String,
      default: '',
    },
    backgroundHeadFullImg: {
      type: String,
      default: '',
    },
    themeNum: {
      type: [Number, String],
      default: 0,
    },
    homecontent: {
      type: String,
      default: '',
    },
    iconcolor: {
      type: String,
      default: '#fff',
    },
    postNum: {
      type: [Number, String],
      default: 0,
    },
    share: {
      type: String,
      default: '',
    },
    shareBtn: {
      type: String,
      default: '',
    },
    shareShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    isShowBack: {
      type: Boolean,
      default: true,
    },
    isShowHome: {
      type: Boolean,
      default: true,
    },
    isShowMore: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      headerH5,
    };
  },
  computed: {
    // 语言包
    t() {
      return this.i18n.t('home');
    },
  },
  onLond() {},
  methods: {
    open(evt) {
      this.$emit('click', evt);
    },
    closeShare(evt) {
      this.$emit('closeShare', evt);
    },
    logoClick(evt) {
      this.$emit('logoClick', evt);
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
/* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
.header {
  position: relative;
  width: 100%;
  height: 400rpx;
  // background: #1878f3;
  background-size: cover;
  .logo {
    display: block;
    // width: 100%;
    max-height: 88rpx;
    padding-top: 159rpx;
    margin: 0 auto;
  }
  /deep/ .qui-back {
    background: transparent;
  }
  .circleDet {
    display: flex;
    justify-content: space-between;
    padding: 69rpx 30rpx 47rpx;
    line-height: 37rpx;
    text-align: center;
    text {
      // padding: 0 15rpx;
      // font-size: $fg-f3;
      line-height: 37rpx;
      text-align: center;
    }
  }
  .circleDet-txt {
    font-size: $fg-f3;
    color: --color(--qui-FC-FFF);
    opacity: 0.5;
  }
  .circleDet-num {
    padding-left: 15rpx;
    font-size: $fg-f4;
    color: --color(--qui-FC-FFF);
  }
  .circleDet-share {
    font-size: $fg-f3;
    color: --color(--qui-FC-FFF);
  }
  .qui-icon {
    padding-right: 18rpx;
  }
  .bar-sticky {
    position: sticky;
    // position: -webkit-sticky;
    top: 0;
    z-index: 101;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 17;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.6);
  }
  .wxShareTip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2222222222222;
    width: 100%;
    height: 100%;
    text-align: right;
    .sharePoint {
      display: inline-block;
      width: 70%;
      margin-top: 10rpx;
      margin-right: 30rpx;
    }
    .shareKnow {
      display: block;
      width: 35%;
      margin: 20vh auto 30rpx;
    }
  }
}
.header-h5 {
  height: 256rpx;
  background-size: cover;
  .logo {
    max-height: 74rpx;
    padding-top: 58rpx;
  }
  .circleDet {
    padding: 49rpx 20rpx 47rpx;
  }
}
/* #endif */
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.headerCopy {
  position: relative;
  width: 100%;
  height: 390rpx !important;
  background: url(./../../static/h5-play/bei@2x.png) no-repeat !important;
  background-position: 0rpx -36rpx !important;
  background-size: cover;
  background-size: 100% 100% !important;
}
.header {
  position: relative;
  width: 100%;
  height: 390rpx !important;
  background-size: cover;

  .logo {
    display: block;
    // width: 100%;
    max-height: 88rpx;
    padding-top: 159rpx;
    /* #ifdef MP-WEIXIN-PLAY */
    padding-top: 30rpx;
    /* #endif */
    margin: 0 auto;
    margin-bottom: 36rpx;
    /* #ifdef MP-WEIXIN-PLAY */
    margin-bottom: 15rpx;
    /* #endif */
  }
  /deep/ .qui-back {
    background: transparent;
  }
  .logoBox {
    .header-title {
      display: flex;
      width: calc(100% - 64rpx);
      height: 60rpx;
      padding: 0 32rpx;
      /* #ifdef MP-WEIXIN-PLAY */
      padding: 100rpx 45rpx 20rpx;
      /* #endif */
      padding-top: 40rpx;
      font-family: 'PingFang SC';
      font-size: 28rpx;
      font-weight: 400;
      color: #fef9fa;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      .close {
        width: 29rpx;
        height: 29rpx;
      }
      .ellipse {
        width: 40rpx;
        height: 10rpx;
      }
    }
  }
  .circleDet {
    display: flex;
    width: calc(100% - 100rpx);
    padding: 30rpx;
    margin: 0 auto;
    margin-top: 44rpx;
    justify-content: space-around;
    // padding-top: 0rpx;
    line-height: 37rpx;
    text-align: center;
    background: --color(--qui-BG-2);
    border-radius: 20rpx;
    .circleDet_box {
      line-height: 37rpx;
      text-align: center;
      .top {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .circleDet-txt {
    font-size: $fg-f3;
    color: var(--qui-FC-333);
    opacity: 0.5;
  }
  .circleDet-num {
    padding-left: 15rpx;
    font-size: $fg-f4;
    color: var(--qui-FC-333);
  }
  .circleDet-share {
    font-size: $fg-f3;
    color: var(--qui-FC-333);
    .top {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .qui-icon {
    padding-right: 18rpx;
  }
  .bar-sticky {
    position: sticky;
    // position: -webkit-sticky;
    top: 0;
    z-index: 101;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 17;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.6);
  }
  .wxShareTip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 222222;
    width: 100%;
    height: 100%;
    text-align: right;
    .sharePoint {
      display: inline-block;
      width: 70%;
      margin-top: 10rpx;
      margin-right: 30rpx;
    }
    .shareKnow {
      display: block;
      width: 35%;
      margin: 20vh auto 30rpx;
    }
  }
}
.header-h5 {
  height: 378rpx;
  background-size: cover;
  .logo {
    max-height: 54rpx;
    padding-top: 26rpx;
  }
  .circleDet {
    padding: 28rpx 20rpx 47rpx;
  }
}
/* #endif */
</style>
