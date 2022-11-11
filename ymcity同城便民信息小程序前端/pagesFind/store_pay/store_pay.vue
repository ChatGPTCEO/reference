<template>
	<view>
		<view class="order">
			<view class="head">
				<text>套餐选择</text>
			</view>
			<view class="pay" v-for="(item,index) in config" :key="index" @click="selConfig(item)"
				style="border-bottom: 1rpx solid #e6e6e6;">
				<view class="leftbox">
					<text style="margin-left: 10rpx;">{{item.name}}</text>
					<text style="color: #F44C01;" v-if="item.price!='0.00'">￥{{item.price}}</text>
					<text style="color: #F44C01;" v-else>限时免费</text>
				</view>
				<u-icon name="checkmark-circle-fill" :color="config_id==item.id?'#f44c01':'#999999'" size="40"></u-icon>
			</view>
		</view>
		<view class="order">
			<view class="head">
				<text>支付方式</text>
			</view>
			<view class="pay" @click="selPay(1)">
				<view class="left">
					<u-image src="/static/images/pay_wx.png" width="30rpx" height="30rpx"></u-image>
					<text style="margin-left: 10rpx;">微信支付</text>
				</view>
				<u-icon name="checkmark-circle-fill" :color="pay_type==1?'#f44c01':'#999999'" size="40"></u-icon>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="pay" @click="selPay(2)">
				<view class="left">
					<u-image src="/static/images/pay_ali.png" width="30rpx" height="30rpx"></u-image>
					<text style="margin-left: 10rpx;">支付宝支付</text>
				</view>
				<u-icon name="checkmark-circle-fill" :color="pay_type==2?'#f44c01':'#999999'" size="40"></u-icon>
			</view>
			<!-- #endif -->
		</view>
		<view class="paybtn">
			<u-button type="primary" @click="toPay" shape="circle">立即支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay_type: 1,
				order: null,
				type: "",
				config_id: '',
				config: [],
				store_id: '',
			}
		},
		onLoad(e) {
			this.store_id = e.id;
			this.$u.get('/addons/hicity/store/getSettleinConfig', {

			}).then(res => {
				this.config = res;
			})
		},
		methods: {
			selPay(index) {
				this.pay_type = index;
			},
			selConfig(e) {
				this.config_id = e.id;
			},
			toPay() {
				if (this.config_id == '') {
					return this.$u.toast('请先选择套餐')
				}
				if (this.store_id == '') {
					return this.$u.toast('店铺不存在')
				}
				var that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.$u.post('/addons/hicity/store/openStore', {
							code: loginRes.code,
							id: that.store_id,
							config_id: that.config_id,
							pay_type: that.pay_type,
							//#ifdef MP-WEIXIN
							platform: 'mini_app_wx',
							//#endif
						}).then(payRes => {
							if (payRes.status == '1') {
								//#ifdef MP-WEIXIN
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: payRes.prepay.timeStamp,
									nonceStr: payRes.prepay.nonceStr,
									package: payRes.prepay.package,
									signType: payRes.prepay.signType,
									paySign: payRes.prepay.paySign,
									success: function(res) {
										// console.log('success:' + JSON.stringify(res));
										that.$u.toast('支付成功')
										setTimeout(() => {
											uni.navigateBack({

											})
										}, 1500)
									},
									fail: function(err) {
										// console.log('fail:' + JSON.stringify(err));
										that.$u.toast('支付取消')
									}
								});
								//#endif
							} else if (payRes.status == '2') {
								that.$u.toast('入驻成功，请耐心等待审核！')
								setTimeout(() => {
									uni.navigateBack({

									})
								}, 1500)
							} else {
								that.$u.toast('订单失效，请重试！')
							}
						}).catch(err => {
							that.$u.toast('支付错误')
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		margin: 20rpx;
		background-color: white;
		padding: 20rpx;

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx 10rpx;
			font-size: 30rpx;

			.title {
				width: 180rpx;
				color: #666666;
			}

			.cont {
				display: flex;
				flex: 1;
				flex-direction: row;
				justify-content: flex-end;
				color: #F44C01;
				color: 32rpx;
			}
		}

		.head {
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}

		.pay {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 25rpx 20rpx;

			.left {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.leftbox {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				flex: 1;
				margin-right: 20rpx;
			}
		}
	}

	.paybtn {
		margin: 30rpx 20rpx;
	}
</style>
