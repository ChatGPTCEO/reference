<template>
	<view class="details">
		<view class="info">
			<u-cell-group :border="false">
				<u-cell-item title="订单号" :value="info.order_sn" :arrow="false"></u-cell-item>
				<template v-if="info.status == 0">
					<u-cell-item title="订单状态" :value="info.order_type == 1 ? '待核销' : '待发货'" :value-style="{color: 'red'}" :arrow="false">
					</u-cell-item>
				</template>
				<template v-else>
					<u-cell-item title="订单状态" :value="statusText[info.status+1]" :value-style="{color: 'green'}" :arrow="false">
					</u-cell-item>
				</template>
				<u-cell-item title="有效期至" :value="info.verify_time || '-'" :arrow="false"></u-cell-item>
				<!-- <u-cell-item title="手机号" :value="info.user_phone" :arrow="false"></u-cell-item> -->
				<u-cell-item title="核销码" :value="info.verify_code" :arrow="false"></u-cell-item>
				<u-cell-item title="取货人" :value="info.user_phone" :arrow="false"></u-cell-item>
				<u-cell-item title="订单实付" :value="info.total_price" :arrow="false"></u-cell-item>
				<u-cell-item title="订单详情" :arrow="false">
					<view class="" slot="label">
						<view class="order-item" v-if="info.orderProduct">
							<view class="o-img">
								<u-image :src="info.orderProduct[0].cart_info.product.image" width="100%" height="100%">
								</u-image>
							</view>
							<view class="o-info">
								<text class="u-line-2">{{ info.orderProduct[0].cart_info.product.store_name }} </text>
								<text style="color:red; margin-left: 5upx; float: right;">(数量{{ info.total_num}})</text>
							</view>
						</view>
					</view>
				</u-cell-item>
				<u-cell-item title="商品规格" :value="info.orderProduct ? info.orderProduct[0].cart_info.productAttr.sku : ''" :arrow="false">
				</u-cell-item>


			</u-cell-group>
		</view>
		<view class="ubtn-box">
			<u-button type="warning" :custom-style="{color: '#333'}" @click="submit">商品已交付客户并确定</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: {},
				statusText: ['已为您退款', '', '待收货', '待评价', '已完成']
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getInfo()
		},
		methods: {
			submit() {
				uni.showModal({
					title: '是否确认提交？',
					success: () => {
						this.$u.post(`/api/verifier/${this.id}`)
							.then((res) => {
								uni.showToast({
									title: res.message || '商品订单完成!'
								})
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									})
								}, 1500)
							})
					}
				})
			},
			getInfo() {
				this.$u.get(`/api/verifier/order/${this.id}`)
					.then(({
						data
					}) => {
						this.info = data
					}).catch((e) => {
						uni.showToast({
							title: e.message || '订单不存在或查询失败!',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.details {
		padding: $gutter;
	}

	.info {
		overflow: hidden;
		border-radius: $uni-border-radius-lg;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
	}

	.order-item {
		display: flex;
		justify-content: space-between;
		width: 100%;

		.o-img {
			width: 100rpx;
			height: 100rpx;
			margin-right: $gutter;
		}

		.o-info {
			font-size: $uni-font-size-lg;
			color: #333;
			flex: 1;
			line-height: 1.5em;
		}
	}

	.ubtn-box {
		margin-top: 40rpx;
	}
</style>
