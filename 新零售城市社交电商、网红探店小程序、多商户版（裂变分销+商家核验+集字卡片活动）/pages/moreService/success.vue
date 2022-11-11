<template>
	<view class="settledSuccessMain">
		<view class="settledSuccessful">
			<view class="chk-icon">
				<u-icon name="checkmark" size="100" color="#ffdd00"></u-icon>
			</view>
			<view class="title">恭喜，您的资料提交成功！</view>
			<view class="info">预计3个工作日内审核完毕，平台客服会及时与您联系！</view>
			<view class="goHome" hover-class="none" @click="goHome">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goHome() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.settledSuccessMain {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.settledSuccessful {
		flex: 1;
		width: 100%;
		padding: 0 108rpx;
		height: auto;
		background: #fff;
		text-align: center;
	}

	.settledSuccessful .image {
		width: 378rpx;
		height: 314rpx;
		margin-top: 132rpx;
	}

	.settledSuccessful .title {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.chk-icon {
		border-radius: 50%;
		padding: 20rpx;
		border: 2rpx solid $uni-color-warning;
		width: 200rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30rpx auto;
	}

	.settledSuccessful .info {
		color: #A0A0A0;
		font-size: 26rpx;
		margin-top: 24rpx;
	}

	.settledSuccessful .goHome {
		margin: 120rpx auto 0;
		width: 496rpx;
		height: 86rpx;
		line-height: 86rpx;
		color: #282828;
		font-size: 30rpx;
		border: 1rpx solid #B4B4B4;
		border-radius: 120rpx;
	}
</style>
