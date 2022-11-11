<template>
	<view class="container">
		<view class="title">这里显示的是文章的标题</view>
		<view class="row flex-row">
			<text class="text">来源：百度</text>
			<text class="text">2021-05-09</text>
		</view>
		<view class="content">这里显示的是文章的详情</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
.container{
	background-color: #FFF;
	
	.title{
		font-size: 32rpx;
		font-weight: bold;
		padding: 30rpx 30rpx 10rpx;
	}
	.row{
		padding: 0 30rpx;
	}
	.content{
		padding: 30rpx;
		font-size: 28rpx;
		line-height: 1.4;
	}
}
</style>
