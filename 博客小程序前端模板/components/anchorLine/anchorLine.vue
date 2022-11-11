<template>
	<view class="cu-bar bg-white margin-top-xs">
		<view class="action sub-title">
			<text class="text-xl text-bold text-blue text-shadow">{{leftText}}</text>
			<text class="text-ABC text-blue">{{leftEnglish}}</text>
		</view>
		<view style="flex-grow:1"></view>
		<view class="anchor-right" @click="moreClick">
			<u-icon :name="leftIconName" color="#999" size="24" v-if="leftIconName"></u-icon>
			<view class="right-text">{{rightText}}</view>
			<u-icon :name="iconName" color="#999" size="24" v-if="!leftIconName && rightText"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		// 锚点行
		name: "anchorLine",
		props: {
			leftText: {
				type: String
			},
			leftEnglish:{
				type: String
			},
			rightText: {
				type: String
			},
			iconName: {
				type: String,
				default: "arrow-right"
			},
			leftIconName: {
				type: String,
			}
		},
		methods: {
			moreClick() {
				this.$emit("moreClick")
			}
		}
	}
</script>

<style scoped>
	
	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}
	
	.margin-top-xs {
		margin-top: 10rpx;
	}
	
	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
	}
	
	.cu-bar .action.sub-title {
		position: relative;
		top: -0.2rem;
	}
	
	.cu-bar .action:last-child {
		margin-right: 30rpx;
	}
	
	.cu-bar .action:first-child {
		margin-left: 30rpx;
		font-size: 30rpx;
	}
	
	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
	}
	
	.cu-bar .action.sub-title text {
		position: relative;
		z-index: 1;
	}
	
	.text-shadow[class*="-blue"] {
		text-shadow: 6rpx 6rpx 8rpx rgba(0, 102, 204, 0.2);
	}
	
	.text-blue,
	.line-blue,
	.lines-blue {
		color: #0081ff;
	}
	
	.text-bold {
		font-weight: bold;
	}
	
	.text-xl {
		font-size: 36rpx;
	}
	
	.cu-bar .action.sub-title text[class*="text-"]:last-child {
		position: absolute;
		display: inline-block;
		bottom: -0.7rem;
		left: 0.5rem;
		opacity: 0.2;
		z-index: 0;
		text-align: right;
		font-weight: 900;
		font-size: 36rpx;
	}
	
	.text-blue,
	.line-blue,
	.lines-blue {
		color: #0081ff;
	}
	
	.text-ABC {
		text-transform: Uppercase;
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	.margin-top-xs {
		margin-top: 10rpx;
	}

	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
	}

	.cu-bar .action.sub-title {
		position: relative;
		top: -0.2rem;
	}

	.cu-bar .action:last-child {
		margin-right: 30rpx;
	}

	.cu-bar .action:first-child {
		margin-left: 30rpx;
		font-size: 30rpx;
	}

	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
	}

	.cu-bar .action.sub-title text {
		position: relative;
		z-index: 1;
	}

	.text-shadow[class*="-blue"] {
		text-shadow: 6rpx 6rpx 8rpx rgba(0, 102, 204, 0.2);
	}

	.text-blue,
	.line-blue,
	.lines-blue {
		color: #0081ff;
	}

	.text-bold {
		font-weight: bold;
	}

	.text-xl {
		font-size: 36rpx;
	}

	.cu-bar .action.sub-title text[class*="text-"]:last-child {
		position: absolute;
		display: inline-block;
		bottom: -0.7rem;
		left: 0.5rem;
		opacity: 0.2;
		z-index: 0;
		text-align: right;
		font-weight: 900;
		font-size: 36rpx;
	}

	.text-blue,
	.line-blue,
	.lines-blue {
		color: #0081ff;
	}

	.text-ABC {
		text-transform: Uppercase;
	}
	.anchor-right {
		margin-right: 30rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		font-size: 24rpx;
		color: #999;
	}

	.right-text {
		margin: 0 4rpx;
	}
</style>
