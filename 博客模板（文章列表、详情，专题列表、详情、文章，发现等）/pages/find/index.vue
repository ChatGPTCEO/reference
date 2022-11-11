<template>
	<view class="container">
		<!--检索-->
		<view class="search flex-row" :class="{input: query.keywords}">
			<uni-icons class="icon" type="search" size="16" color="#777"></uni-icons>
			<input @input="listenInput" class="input" type="text" value="" placeholder="请输入关键词"/>
			<view class="btn flex-column">检索</view>
		</view>
		<!--列表-->
		<scroll-view v-show="!query.keywords" class="body" scroll-y>
			<view class="card">
				<view class="title flex-row">
					<text class="text">历史搜索</text>
					<uni-icons type="trash" size="16"></uni-icons>
				</view>
				<view class="history flex-flow">
					<view v-for="(item, index) in 8" :key="index" class="item flex-column text-ellipsis">关键词</view>
				</view>
			</view>
			<view class="card">
				<view class="title flex-row">
					<text class="text">热门文章</text>
				</view>
				<view class="list">
					<view v-for="(item, index) in 10" :key="index" class="item flex-row text-ellipsis">
						<view class="name text-ellipsis">这里是标题这里是标题这里是标题这里是标题这里是标题</view>
						<view class="views">100</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view v-show="query.keywords" class="body" scroll-y>
			<card v-for="(item, index) in 10" :key="index"></card>
		</scroll-view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			query: {
				keywords: ''
			}
		}
	},
	methods: {
		listenInput(e){
			this.query.keywords = e.detail.value
		}
	}
}
</script>

<style lang="scss" scoped>
/*列表*/
.body{
	background-color: #FFF;
	height: calc(100vh - 100rpx);
}
/* #ifdef H5 */
.container{
	height: calc(100vh - 44px - 50px - var(--status-bar-height));
	min-height: initial;
}
.body{
	height: calc(100vh - 100rpx - 44px - 50px - var(--status-bar-height));
}
/* #endif */

.card{
	padding: 30rpx 30rpx 0;
	
	.title{
		margin-bottom: 30rpx;
		
		.text{
			font-size: 32rpx;
		}
	}
	
	/*列表*/
	.list{
		.item{
			margin-bottom: 20rpx;
			
			&:nth-child(1){
				.name, .views{
					color: red;
				}
			}
			&:nth-child(2){
				.name, .views{
					color: $main-color;
				}
			}
			&:nth-child(3){
				.name, .views{
					color: green;
				}
			}
			
			.name{
				width: calc(100% - 200rpx);
			}
			
			.views{
				color: #777;
			}
		}
	}
	
	/*历史搜索*/
	.history{
		.item{
			color: #777;
			height: 60rpx;
			width: calc(25% - 20rpx);
			border-radius: 40rpx;
			margin: 0 10rpx 30rpx;
			background-color: #F5F5F5;
		}
	}
}

/*检索区域*/
.search{
	height: 100rpx;
	padding: 0 30rpx;
	position: relative;
	
	.icon{
		position: absolute;
		top: 30rpx;
		left: 60rpx;
	}
	
	.input{
		width: 100%;
		height: 72rpx;
		font-size: 28rpx;
		border-radius: 60rpx;
		background-color: #FFF;
		padding: 0 30rpx 0  80rpx;
		transition: width 0.2s ease;
	}
	
	.btn{
		color: #FFF;
		width: 0;
		opacity: 0;
		height: 72rpx;
		border-radius: 40rpx;
		background-color: $main-color;
		transition: all 0.2s ease;
	}
	
	&.input{
		.input{
			width: calc(100% - 140rpx);
		}
		.btn{
			opacity: 1;
			width: 120rpx;
		}
	}
}
</style>
