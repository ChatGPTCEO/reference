<template>
	<view>
		<view class="info">
		  <text class="text">账户余额</text>
      <text class="strong">
        <text class="small">¥</text>
        {{ userInfo.now_money }}
      </text>
      <view class="smallbox" @click="toRoute({url: 'pages/wallet/bill'})">
        <text>查看明细</text>
        <u-icon name="arrow-right" size="24" color="#666"></u-icon>
      </view>
		</view>
    <view class="wallet-oper">
      <view class="u-padding-top-30">
        <u-button type="warning" ripple :custom-style="{color: '#333'}"
          @click="toRoute({
            url: 'pages/wallet/recharge'
          })">充值</u-button>
      </view>
      <view class="u-padding-top-30">
        <u-button type="default" disabled ripple @click="toRoute({
          url: 'pages/wallet/withdrawal',
          params: {
            type: 1
          }
        })">提现</u-button>
      </view>
      <view class="u-padding-20" 
        style="display: flex; justify-content: center; color: #999; font-size: 24rpx;">
        <text>暂不支持提现余额</text>
      </view>
    </view>
    <view class="serfoot">
      <u-icon name="integral-fill" size="32" color="#999" label="支付安全保障中" label-color="#999"></u-icon>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      toRoute (params) {
        this.$u.route(params)
      }
    }
	}
</script>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $gutter;
  .text {
    font-size: $uni-font-size-lg;
    color: #333;
  }
  .strong {
    font-size: 68rpx;
    font-weight: bold;
    padding: $gutter;
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
.wallet-oper {
  padding: $gutter;
  display: flex;
  flex-direction: column;
}
.serfoot {
  position: absolute;
  left: 0;
  bottom: $gutter;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $gutter;
}
</style>
