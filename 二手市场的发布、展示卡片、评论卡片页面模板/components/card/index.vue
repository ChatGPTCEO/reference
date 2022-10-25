<template>
	<view>
		<view class="card" v-for="(item, index) in list" :key="index">
			<view class="card-head flex-row">
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
				<view class="more">
					<uni-icons type="more-filled" size="18" color="#666"></uni-icons>
				</view>
			</view>
			<view class="card-body">
				<view class="price flex-row">
					<view class="value">￥200.00</view>
					<view class="label">标签</view>
				</view>
				<view class="content">内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域内容显示区域</view>
				<view class="images" :class="{single: item.images.length == 1, four: item.images.length == 4}">
					<image v-for="(image, index) in item.images" :key="index" src="../../static/img/test.png" class="image"></image>
				</view>
				<view class="tags">
					<view class="tag" v-for="(tag, index) in item.tags" :key="index">标签</view>
				</view>
				<view class="comment flex-row">
					<input class="input" type="text" placeholder="留言问问卖家" />
					<view class="flex-row">
						<uni-icons type="chat" size="18" color="#777"></uni-icons>
						<text class="text">留言</text>
					</view>
					<view class="flex-row">
						<uni-icons type="star" size="18" color="#777"></uni-icons>
						<text class="text">收藏</text>
					</view>
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

	}
}
</script>

<style lang="scss" scoped>
.card{
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: #FFF;
	
	.card-head{
		height: 120rpx;
		
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
		
		.more{
			height: 60rpx;
			padding-left: 20rpx;
		}
	}

	.card-body{
		.price{
			margin: 10rpx 0 20rpx;
			
			.value{
				color: #F57931;
				font-size: 36rpx;
				font-weight: bold;
			}
			
			.label{
				color: #fff;
				font-size: 20rpx;
				padding: 4rpx 20rpx;
				border-radius: 10rpx;
				background-color: #F57931;
			}
		}
		
		.content{
			font-size: 28rpx;
		}
		
		.images{
			margin: 20rpx 0;
			overflow: hidden;
			
			.image{
				float: left;
				margin: 0 20rpx 20rpx 0;
				width: calc((100vw - 100rpx) / 3);
				height: calc((100vw - 100rpx) / 3);
				
				&:nth-child(3n){
					margin-right: 0;
				}
			}
			
			&.single .image{
				width: 100%;
				height: 400rpx;
			}
			
			&.four .image{
				width: calc((100vw - 80rpx) / 2);
				height: calc((100vw - 80rpx) / 2);
				
				&:nth-child(2n){
					margin-right: 0;
				}
				&:nth-child(3n){
					margin-right: 20rpx;
				}
			}
		}
	
		.tags{
			overflow: hidden;
			
			.tag{
				float: left;
				color: #fff;
				font-size: 20rpx;
				padding: 4rpx 20rpx;
				border-radius: 10rpx;
				margin: 0 20rpx 12rpx 0;
				background-color: #F57931;
			}
		}
		
		.comment{
			padding: 20rpx 0 10rpx;
			
			.input{
				width: 40vw;
				height: 70rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				border-radius: 60rpx;
				background-color: #F7F7F7;
			}
			
			.text{
				color: #777;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}
	}
}
</style>

