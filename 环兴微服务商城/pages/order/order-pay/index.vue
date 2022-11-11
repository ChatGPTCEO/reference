<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">订单支付</block>
		</cu-custom>
		<view class="bg-red">
			<view class="flex align-center justify-center" style="height: 300rpx;">
				<view class="text-white text-bold text-price text-xxl">{{orderInfo.payPrice}}</view>
			</view>
			<view class="flex align-center justify-center">
				<view class="text-white">请在30分钟内付款，超时订单自动取消</view>
			</view>
		</view>
		<view class="margin-sm">
			<radio-group class="block" @change="radioChange">
				<view class="cu-list menu text-left">
					<view class="cu-item">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">微信支付</view>
							<radio class="round" :class="paymentType=='1'?'checked':''"
								:checked="paymentType=='1'?true:false" value="1"></radio>
						</label>
					</view>
					<view class="cu-item">
						<label class="flex justify-between align-center flex-sub">
							<view class="flex-sub">支付宝支付</view>
							<radio class="round" :class="paymentType=='2'?'checked':''"
								:checked="paymentType=='2'?true:false" value="2"></radio>
						</label>
					</view>
				</view>
			</radio-group>
		</view>
		<button class="cu-btn shadow-blur block margin-sm round bottom-btn bg-red" @tap="paySub">立即付款</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				orderInfo: {},
				paymentType: '1',
			}
		},
		onLoad(option) {
			getApp().initPage().then(res => {
				this.getOrder(option.id)
			})
		},
		methods: {
			getOrder(id) {
				uni.$myRequest.orderById(id).then(res => {
					this.orderInfo = res.data;
				})
			},
			/**
			 * 选择支付方式
			 */
			radioChange(e) {
				this.paymentType = e.detail.value;
			},
			paySub() {
				let that = this;
				uni.$myRequest.unifiedOrder({
					id: this.orderInfo.id,
					paymentType: '1',
					// #ifdef MP-WEIXIN
					tradeType: 'JSAPI',
					// #endif
					// #ifdef H5
					tradeType: 'H5',
					// #endif
					// #ifdef APP-PLUS
					tradeType: 'APP',
					// #endif
				}).then(res => {
					let data = res.data;
					console.log("预支付回参==========" + JSON.stringify(data));

					// #ifdef MP-WEIXIN
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.packageValue,
						signType: data.signType,
						paySign: data.paySign,
						success: function(res) {
							uni.navigateTo({
								url: '/pages/order/order-pay-result/index?id=' + that.orderInfo
									.id
							})
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
					// #endif
					// #ifdef APP-PLUS
					let orderInfo = {
						"appid": data.appid,
						"noncestr": data.noncestr,
						"package": data.packageValue,
						"partnerid": data.partnerId,
						"prepayid": data.prepayId,
						"timestamp": data.timestamp,
						"sign": data.sign
					}
					console.log("支付数据" + JSON.stringify(orderInfo));
					uni.requestPayment({
						"provider": "wxpay",
						"orderInfo": JSON.stringify(orderInfo),
						success(res) {
							uni.navigateTo({
								url: '/pages/order/order-pay-result/index?id=' + that.orderInfo
									.id
							})
						},
						fail(e) {
							console.log("请求失败======" + JSON.stringify(e));
						}
					})
					// #endif
				})

			}
		}
	}
</script>

<style lang="scss">
</style>
