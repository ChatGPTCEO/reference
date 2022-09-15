<template>
	<cl-page>
		<view class="page-about">
			<image class="logo" src="/static/logo.png" />

			<text class="name">{{ app.info.name }}</text>
			<text class="desc">{{ app.info.desc }}</text>
			<text class="version">v{{ app.info.version }}</text>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { useStore } from "/@/cool";

const { app } = useStore();
</script>

<style lang="scss">
page {
	background-color: #fff;
}

.page-about {
	padding: 64rpx 34rpx;

	.logo {
		display: block;
		height: 188rpx;
		width: 188rpx;
		margin: 0 auto;
		border-radius: 16rpx;
	}

	.name {
		display: block;
		color: $cl-color-primary;
		font-size: 36rpx;
		font-weight: bold;
		margin: 30rpx 0 20rpx 0;
		text-align: center;
		letter-spacing: 1rpx;
	}

	.desc {
		font-size: 26rpx;
		color: #666;
	}

	.version {
		display: block;
		position: fixed;
		left: 0;
		bottom: 50rpx;
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
	}
}
</style>
