<template>
	<view class="verifi-box">
		<view class="box top-scan">
			<view class="radius-box" @click="openScanCode">
				<text>扫一扫</text>
			</view>
			<view class="u-padding-30">
				<text>扫一扫二维码以查询订单</text>
			</view>
		</view>
		<view class="box bot-write">
			<text class="text">询问客户并输入取货号:</text>
			<view class="u-margin-top-20">
				<u-input border v-model="writeText" placeholder="输入取货号"></u-input>
			</view>
			<view class="u-margin-top-20">
				<u-button type="warning" :custom-style="{color: '#333'}" @click="queryOrder">订单查询</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				writeText: ''
			};
		},
		methods: {
			openScanCode() {
				uni.scanCode({
					success: (e) => {
						this.writeText = e.result
						this.queryOrder()
					}
				})
			},
			queryOrder() {
				this.$u.route({
					url: 'pages/order/verifiDetails',
					params: {
						id: this.writeText
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

	.verifi-box {
		overflow: hidden;
	}

	.box {
		background-color: #fff;
		margin: $gutter;
		padding: $gutter;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
	}

	.top-scan {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;

		.radius-box {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 48rpx;
			color: #333;
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
			background: linear-gradient(to bottom, #ffdd00, #eaca0a);
			margin: 0 auto;
		}
	}

	.bot-write {
		padding: 50rpx $gutter;
		display: flex;
		flex-direction: column;
	}
</style>
