<template>
	<view class="container">
		<image class="subject-cover" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350817201,1137116540&fm=26&gp=0.jpg" mode="widthFix"></image>
		<!--专题头部-->
		<view class="subject">
			<view class="title">这里是专题名称</view>
			<view class="summary">这是专题的介绍</view>
			<view class="info">
				<text class="text">章节数：10章</text>
				<text class="text">浏览量：100</text>
			</view>
		</view>
		<!--列表-->
		<view class="list">
			<card v-for="(item, index) in 20" :key="index"></card>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
.subject-cover{
	width: 100%;
}
.subject{
	margin-bottom: 20rpx;
	background-color: #FFF;
	padding: 20rpx 30rpx 30rpx;
	box-shadow: 0 8rpx 4rpx #F5F5F5;
	
	.title{
		font-size: 32rpx;
		font-weight: bold;
	}
	.summary{
		color: #777;
		margin: 10rpx 0;
		font-size: 24rpx;
	}
	.text{
		color: #999;
		font-size: 24rpx;
		margin-right: 40rpx;
	}
}
</style>
