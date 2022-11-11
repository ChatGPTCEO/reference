<template>
	<view class="fixed-nav" :class="fixedPosition ? 'fixed-right' : 'fixed-left'">

		<view class="fixed-circular row flex-column" v-if="showService">
			<view class="iconfont icon-kefu"></view>
			<button class="font-s-1" open-type="contact">客服</button>
		</view>

		<view class="fixed-circular row flex-column" v-if="showTelephone" @click="toPhone">
			<view class="iconfont icon-dianhua"></view>
			<view class="font-s-1">电话</view>
		</view>
	</view>
</template>

<script>
	//<!-- #ifdef MP-WEIXIN -->
	//<!-- #endif -->
	export default {
		props: {
			fixedPosition: {
				type: Boolean,
				default: true
			},
			showCustomized: {
				type: Boolean,
				default: false
			},
			showService: {
				type: Boolean,
				default: true
			},
			showTelephone: {
				type: Boolean,
				default: true
			}
		},
		created() {
			uni.$on('shopConfigInfo', res => {
				this.serverPhone = res.server_phone
			});
		},
		methods: {
			toRelease() {
				uni.navigateTo({
					url: '/pages/article/article-release',
				});
			},
			toPhone() {
				uni.makePhoneCall({
					phoneNumber: this.serverPhone //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	.fixed-nav {
		width: 120rpx;
	}

	.fixed-left {
		position: fixed;
		left: 20rpx;
		bottom: 55rpx;
		z-index: 999;
	}

	.fixed-right {
		position: fixed;
		right: 10rpx;
		bottom: 85rpx;
		z-index: 999;
	}

	.fixed-circular {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-color: rgba(215,28,37, 0.88);
		margin-bottom: 30rpx;
		color: #FFFFFF;
		box-shadow: 0px 0px 5px #333;

		.iconfont {
			font-size: 35rpx;
		}

		button {
			border: none;
			background-color: rgba(215,28,37, 0);
			border-radius: none;
			box-sizing: none;
			color: #FFFFFF;
			cursor: pointer;
			display: inline-block;
			line-height: 1.5;
			margin-left: auto;
			margin-right: auto;
			overflow: hidden;
			padding-left: 0;
			padding-right: 0;
			position: relative;
			text-align: center;
			text-decoration: none;
			padding: 0;
		}
		button::after {
			border: none;
		}
	}
</style>
