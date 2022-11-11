<template>
	<view class="container">
		<view @tap="$toPage('index')" class="item" v-for="(item, index) in 20" :key="index">
			<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350817201,1137116540&fm=26&gp=0.jpg" mode="widthFix" class="cover"></image>
			<view class="info">
				<view class="title">这里显示的是专题的标题</view>
				<view class="summary">这里是专题的介绍信息</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
.container{
	background-color: #FFF;
}
.item{
	margin: 30rpx 30rpx 0;
	min-height: 200rpx;
	border-radius: 10rpx;
	box-shadow: 0 6rpx 4rpx 2rpx #F2F2F2;
	
	&:last-child{
		margin-bottom: 30rpx;
	}
	
	.cover{
		width: 100%;
		border-radius: 10rpx;
	}
	
	.info{
		padding: 0 20rpx 20rpx;
		
		.title{
			font-size: 28rpx;
			font-weight: bold;
			margin: 10rpx 0 6rpx;
		}
		.summary{
			color: #777;
			font-size: 24rpx;
		}
	}
}
</style>
