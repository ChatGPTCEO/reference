<template>
	<view class="store-box">
    <!-- info -->
    <view class="shop-info">
      <view class="shop-top">
        <u-avatar :src="userInfo.service.avatar" size="100"></u-avatar>
        <view class="s-name">
          <text>{{ userInfo.service.nickname }}</text>
        </view>
        <!-- <view class="s-content">
          <text>店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</text>
        </view> -->
      </view>
    </view>
    <!-- <view class="shop-info">
      <view class="info">
        <text class="text">收入金额</text>
        <text class="strong">
          <text class="small">¥</text>
          {{ userInfo.now_money }}
        </text>
      </view>
      <view class="u-padding-20">
        <u-button type="warning" size="medium" ripple :custom-style="{color: '#333'}"
          @click="toRoute({
            url: 'pages/wallet/withdrawal'
          })">提现</u-button>
      </view>
    </view> -->
    <!-- oper -->
		<view class="gird-box">
		  <u-grid :col="2">
        <u-grid-item @click="toRoute({
          url: 'pages/goods/store',
          params: {
            id: userInfo.service.mer_id
          }
        })">
          <u-icon name="home" :size="66" color="#666"></u-icon>
          <view class="grid-text">店铺</view>
        </u-grid-item>
        <u-grid-item @click="toRoute({
          url: 'pages/order/verification'
        })">
          <u-icon name="scan" :size="66" color="#666"></u-icon>
          <view class="grid-text">核销</view>
        </u-grid-item>
        <u-grid-item @click="toRoute({
          url: 'pages/store/qrcode',
          params: {
            id: id
          }
        })">
          <u-icon name="calendar" :size="66" color="#666"></u-icon>
          <view class="grid-text">二维码</view>
        </u-grid-item>
        <u-grid-item @click="toRoute({
          url: 'pages/store/account'
        })">
          <u-icon name="man-delete" :size="66" color="#666"></u-icon>
          <view class="grid-text">账号</view>
        </u-grid-item>
      </u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			};
		},
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    onLoad(options) {
      this.id = options.id
    },
    methods: {
      toRoute (params) {
        this.$u.route(params)
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.store-box {
  overflow: hidden;
}
.shop-info {
  margin: $gutter;
  background-color: #fff;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
  padding: $gutter;
  box-shadow: 0 6rpx 10rpx rgba($color: #000000, $alpha: 0.1);
}
.gird-box {
  margin: $gutter;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
  box-shadow: 0 6rpx 10rpx rgba($color: #000000, $alpha: 0.1);
  .grid-text {
    font-size: 36rpx;
    padding-top: 16rpx;
  }
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $gutter $gutter 0;
  .text {
    font-size: $uni-font-size-lg;
    color: #333;
  }
  .strong {
    font-size: 68rpx;
    font-weight: bold;
  }
  .small {
    font-size: $uni-font-size-base;
    margin-left: -10rpx;
    margin-right: 10rpx;
  }
  .smallbox {
    font-size: $uni-font-size-sm;
    color: #666;
    display: flex;
    align-items: center;
  }
}
.shop-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .s-name {
    font-size: 32rpx;
    padding: $gutter / 2;
  }
}
</style>
