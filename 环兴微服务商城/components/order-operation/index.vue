<template>
	<view class="flex align-center justify-center">
		<view v-if="orderInfo.status == '11' && orderInfo.payStatus == '0'">
			<button class="cu-btn round margin-xs line-black" @tap="onDel">删除订单</button>
		</view>
		<view v-if="orderInfo.status == '1' && orderInfo.payStatus == '0'">
			<button class="cu-btn round margin-xs line-black" @tap="onCancel">取消订单</button>
		</view>
		<view v-if="orderInfo.status == '1' && orderInfo.payStatus == '0'">
			<button class="cu-btn round margin-xs line-red" @tap="onPay">立即付款</button>
		</view>
		<view v-if="orderInfo.status == '3'">
			<button class="cu-btn round margin-xs line-red" @tap="onReceiver">确认收货</button>
		</view>
		<view v-if="orderInfo.status == '4' && orderInfo.appraiseStatus == '0'">
			<button class="cu-btn round margin-xs  line-green" @tap="onAppraise">评价</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			orderInfo: {
				type: Object,
				default: () => ({})
			},
			isPay: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				theme: getApp().globalData.theme,
			}
		},
		mounted() {
			setTimeout(() => {
				if (this.isPay) {
					this.toPay();
				}
			}, 1000);

		},
		methods: {
			/**
			 * 立即付款
			 */
			onPay() {
				this.toPay();
			},
			toPay() {
				uni.navigateTo({
					url: '/pages/order/order-pay/index?id=' + this.orderInfo.id
				})
			},
			/**
			 * 取消订单
			 */
			onCancel() {
				let _this = this;
				uni.showModal({
					content: '是否取消订单吗？',
					cancelText: '我再想想',
					success(res) {
						if (res.confirm) {
							let id = _this.orderInfo.id;
							uni.$myRequest.orderCancel(id).then(res => {
								let data = res.data;
								_this.$emit('orderCancel', data);
							});
						}
					}
				});
			},
			/**
			 * 删除订单
			 */
			onDel() {
				let _this = this;
				uni.showModal({
					content: '是否删除订单吗？',
					cancelText: '我再想想',
					success(res) {
						if (res.confirm) {
							let id = _this.orderInfo.id;
							uni.$myRequest.orderDel(id).then(res => {
								let data = res.data;
								_this.$emit('orderDel', data);
							});
						}
					}
				});
			},
			/**
			 * 确认收货
			 */
			onReceiver() {
				uni.showModal({
					content: '是否确认收货吗？',
					cancelText: '我再想想',
					success(res) {
						if (res.confirm) {
							let id = _this.orderInfo.id;
							uni.$myRequest.orderReceiver(id).then(res => {
								let data = res.data;
								_this.$emit('orderReceiver', data);
							});
						}
					}
				});
			},
			/**
			 * 评价
			 */
			onAppraise(item, index) {}
		}
	}
</script>

<style>
</style>
