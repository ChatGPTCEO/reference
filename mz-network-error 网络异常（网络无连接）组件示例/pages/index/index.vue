<template>
	<view class="content">
		<mz-network-error @clickFn="hancleClick"></mz-network-error>
		<!-- 以下用法可以都试一下 -->
		<!-- <mz-network-error></mz-network-error>
		<mz-network-error icon="/static/warn.png" :showRightBtn="false" @fixed="true" @clickFn="hancleClick"></mz-network-error>
		<mz-network-error icon="mz-iconfont icon-wangluocuowu" message="无网络连接" @clickFn="hancleClick"></mz-network-error> -->
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import mzNetworkError from '@/components/mz-network-error/mz-network-error.vue'
	export default {
		components: {
			mzNetworkError
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			hancleClick() {
				uni.navigateTo({
					url: '../network/networkError'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
