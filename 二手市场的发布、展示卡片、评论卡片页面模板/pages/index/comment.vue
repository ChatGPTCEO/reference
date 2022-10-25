<template>
	<view class="container">
		<view class="status-bar"></view>
		<view class="list">
			<!--评论列表-->
			<comment :list="list" @comment="comment" @support="support"></comment>
		</view>
	</view>
</template>

<script>
import comment from '@/components/comment/index.vue'
export default {
	components: {comment},
	data() {
		return {
			list: [
				{
					id: 1,
				},
				{
					id: 2
				},
				{
					id: 3
				},
				{
					id: 4
				},
				{
					id: 5
				}
			]
		}
	},
	onLoad() {

	},
	methods: {
		// 评论
		comment(item){
			console.log('点击了评论', item)
		},
		// 点赞
		support(item){
			console.log('点击了点赞', item)
		}
	}
}
</script>

<style lang="scss" scoped>
.comment{
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: #FFF;
	
	.comment-head{
		height: 120rpx;
		align-items: flex-start;
		
		.face{
			position: relative;
			
			.icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			
			.gender{
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				bottom: 4rpx;
				right: 2rpx;
			}
		}
		
		.info{
			margin-left: 20rpx;
			
			.name{
				font-size: 32rpx;
				font-weight: bold;
			}
			
			.date{
				color: #999;
				font-size: 24rpx;
				margin-top: 8rpx;
			}
		}
		
		.oper .item{
			margin-left: 30rpx;
		}
	}

	.comment-body{
		.content{
			font-size: 28rpx;
		}
	}
}
</style>
