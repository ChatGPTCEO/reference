<template>
	<view class="contact-box">
		<view class="contact-info">
      <view class="c-title">
        <text class="c-warning">·</text>
        <text class="c-text"> 在线咨询 </text>
        <text class="c-warning">·</text>
      </view>
      <view class="c-qrcode">
        <u-image src="/static/wechat.jpg" width="200rpx" height="200rpx"></u-image>
      </view>
      <view class="us-info">
        <text class="us-bold u-padding-bottom-10">{{ weAccount }}</text>
        <u-button type="default" ripple size="mini" @click="copy">复制微信号</u-button>
        <text class="text u-margin-top-10">截图保存二维码或者复制微信号</text>
        <text class="text">添加客服微信</text>
        <text class="text">我们会最快时间回复你</text>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weAccount: '柘城吃喝玩乐'
			};
		},
    methods: {
      copy () {
        uni.setClipboardData({
          data: this.weAccount,
          success: () => {
            uni.showToast({
              title: '复制成功'
            })
          },
          fail: () => {
            uni.showToast({
              title: '复制失败',
              icon: 'none'
            })
          }
        })
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.contact-box {
  padding: $gutter;
  .contact-info {
    border-radius: $uni-border-radius-base;
    background-color: #fff;
    text-align: center;
    padding: $gutter;
    .c-title {
      display: flex;
      align-items: center;
      justify-content: center;
      .c-text {
        font-size: $uni-font-size-base;
        color: #333;
        margin: 0 10rpx;
      }
      .c-warning {
        color: $uni-color-warning;
        font-size: 80rpx;
      }
    }
    .c-qrcode {
      padding: 15rpx;
      border: 1rpx solid $uni-color-warning;
      width: 230rpx;
      height: 230rpx;
      border-radius: $uni-border-radius-base;
      margin: $gutter auto;
    }
    .us-info {
      display: flex;
      flex-direction: column;
      padding-bottom: $gutter;
      .us-bold {
        font-size: $uni-font-size-xl;
      }
      .text {
        font-size: $uni-font-size-sm;
        color: #666;
      }
    }
  }
}
</style>
