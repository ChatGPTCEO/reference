<template>
	<view>
		<navigationBar text="完蛋了..." backgroundColor="#5af">
		</navigationBar>
		<view :style="'height: calc(100vh - '+topBarHeight+'px)'" class="not-container">
			<image class="not-img" src="../../../static/404.png"></image>
			<view class="tip-container">
				<view class="tip1">程序居然奔溃了</view>
				<view class="tip">莫奇怪，这是家常便饭了</view>
				<view class="tip-button" @click="toIndex">点我，点我</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				topBarHeight: 88,
			}
		},
		onLoad() {
			this.topBarHeight = util.getTopBarHeight()
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style scope>
	.not-container {
		position: relative;
	}

	.not-img {
		height: 200rpx;
		width: 200rpx;
		top: 50%;
		left: 50%;
		margin-top: -300rpx;
		margin-left: -100rpx;
		display: block;
		position: absolute;
	}

	.tip-container {
		position: absolute;
		height: 200rpx;
		width: 400rpx;
		top: 50%;
		left: 50%;
		margin-top: -100rpx;
		margin-left: -200rpx;
		position: absolute;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
	}


	.tip1 {
		margin-top: 20rpx;
		font-size: 28rpx;
		font-weight: 600;

	}

	.tip-button {
		width: 160upx;
		height: 65upx;
		color: #868d91;
		font-size: 24upx;
		margin-top: 34upx;
		border-radius: 36upx;
		border: 1upx solid #d4d4d4;

	}
</style>
