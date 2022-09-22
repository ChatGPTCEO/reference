<template>
	<view>
		<view class="order" v-if="order">
			<view class="cell">
				<view class="title">
					<text>订单编号：</text>
				</view>
				<text>{{order.order_no}}</text>
			</view>
			<view class="cell">
				<view class="title">
					<text>标题：</text>
				</view>
				<text>{{order.title}}</text>
			</view>
			<view class="cell">
				<view class="title">
					<text>信息发布费：</text>
				</view>
				<view class="cont">
					<text>￥{{order.push_price}}</text>
				</view>
			</view>
			<view class="cell">
				<view class="title">
					<text>信息置顶费：</text>
				</view>
				<view class="cont">
					<text>￥{{order.top_price}}</text>
				</view>
			</view>
			<view class="cell" v-if="order.top_day>0">
				<view class="title">
					<text>置顶天数：</text>
				</view>
				<view class="cont">
					<text>{{order.top_day}}天</text>
				</view>
			</view>
			<view class="cell" v-if="order.discount_price>0">
				<view class="title">
					<text>信息折扣：</text>
				</view>
				<view class="cont">
					<text>￥{{order.discount_price}}</text>
				</view>
			</view>
			<view class="cell">
				<view class="title">
					<text>支付总金额：</text>
				</view>
				<view class="cont">
					<text>￥{{order.total_price}}</text>
				</view>
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
				type: ""
			}
		},
		onLoad(e) {
			if (e.type && e.order_no) {
				this.type = e.type;
				this.$u.get('/addons/hicity/' + e.type + '/getOrder', {
					order_no: e.order_no
				}).then(res => {
					this.order = res;
				})
			}
		},
		methods: {
			selPay(index) {
				this.pay_type = index;
			},
			toPay() {
				var that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						that.$u.post('/addons/hicity/' + that.type + '/payOrder', {
							code: loginRes.code,
							order_no: that.order.order_no,
							pay_type: that.pay_type,
							//#ifdef MP-WEIXIN
							platform: 'mini_app_wx',
							//#endif
						}).then(payRes => {
							console.log(payRes)
							//#ifdef MP-WEIXIN
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: payRes.timeStamp,
								nonceStr: payRes.nonceStr,
								package: payRes.package,
								signType: payRes.signType,
								paySign: payRes.paySign,
								success: function(res) {
									// console.log('success:' + JSON.stringify(res));
									that.$u.route({
										type: 'redirectTo',
										url: '/pagesPush/push_result/push_result',
										params: {
											type: 'push'
										}
									});
								},
								fail: function(err) {
									// console.log('fail:' + JSON.stringify(err));
									that.$u.toast('支付取消')
								}
							});
							//#endif
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
			padding: 20rpx;

			.left {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}

	.paybtn {
		margin: 30rpx 20rpx;
	}
</style>
