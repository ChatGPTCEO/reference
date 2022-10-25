<template>
	<view class="container">
		<view class="status-bar"></view>
		<view class="list">
			<view class="comment" v-for="(item, index) in list" :key="index">
				<view class="comment-head flex-row">
					<view class="user flex-row">
						<view class="face">
							<image src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3870465781,1802572159&fm=26&gp=0.jpg" class="icon"></image>
							<image src="../../static/img/female.png" class="gender"></image>
						</view>
						<view class="info">
							<view class="name">张三</view>
							<view class="date">03/12 10:54 | 烟台大学</view>
						</view>
					</view>
					<view class="oper flex-row">
						<uni-icons @tap="comment(item)" class="item" type="chat" size="18" color="#666"></uni-icons>
						<uni-icons @tap="support(item)" class="item" type="hand-thumbsup" size="18" color="#666"></uni-icons>
					</view>
				</view>
				<view class="comment-body">
					<view class="content">内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: ()=>{}
		}
	},
	data() {
		return {
			
		}
	},
	onLoad() {

	},
	methods: {
		// 评论
		comment(item){
			this.$emit('comment', item)
		},
		// 点赞
		support(item){
			this.$emit('support', item)
		}
	}
}
</script>

<style lang="scss" scoped>
.comment{
	padding: 30rpx;
	margin-bottom: 20rpx;
	padding-bottom: 40rpx;
	background-color: #FFF;
	border-bottom: 2rpx solid #F2F2F2;
	
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
