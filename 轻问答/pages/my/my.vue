<template>
	<view class="Qin-question-my">
		<view class="qin_header">
			<img src="/static/img/user.png" alt="">
			<text>用户名</text>
		</view>
		<view class="qin_content">
			<view>
				<text class="count_num">25</text>
				<text>回答</text>
			</view>
			<view>
				<text class="count_num">105</text>
				<text>提问</text>
			</view>
			<view>
				<text class="count_num">89</text>
				<text>收藏</text>
			</view>
		</view>
		<view class="qin_logout">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Qin-question-my',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.Qin-question-my{
		background-color: #fff;
		padding: 60rpx;
		.qin_header{
			display: flex;
			align-items: center;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #f0f0f0;
			&>img {
				width: 100rpx;
				height: 100rpx;
			}
			&>text {
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}
		.qin_content {
			margin-top: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&>view{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.count_num{
					font-weight: bold;
					font-size: 35rpx;
					color: #00965e;
				}
			}
		}
		.qin_logout{
			margin-top: 120rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #fff;
			background-color: #00965e;
		}
	}

</style>
