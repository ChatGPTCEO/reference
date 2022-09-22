<template>
	<view class="orange-wrap" v-show="list">
		<view class="orange-title" v-if="config.title">
			<view class="al">
				<text>{{config.title}}</text>
			</view>
			<view class="ar" @tap="tapMore" v-if="config.titlemore">{{config.titlemore}}</view>
		</view>
		<swiper 
		v-if="list&&list.length>0"
		class="orange-content" 
		:display-multiple-items="config.multiple || 3" 
		:next-margin="config.nextMargin+'rpx'"
		>
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item" @tap="tapList" :data-id="item.id" :data-index="index" :style="{height:config.height+'rpx'}">
					<image class="img" :src="item.img" :style="{borderRadius:config.radius+'rpx'}" mode="aspectFill"></image>
					<view class="subject">{{item.subject}}</view>
				</view>
			</swiper-item>
			<swiper-item v-if="config.listmore">
				<view class="swiper-item lookmore" @tap="tapMore" :style="{height:config.height+'rpx',borderRadius:config.radius+'rpx'}">
					<view class="moretext">{{config.listmore}}</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			list: {},
			config: {},
		},
		data() {
			return {
				
			}
		},
		created(){
			
		},
		methods: {
			tapMore(e) {
				this.$emit("tapMore", this.config.moreurl)
			},
			tapList(e) {
				var id = e.currentTarget.dataset.id,
					index = parseInt(e.currentTarget.dataset.index) || 0;
				this.$emit("tapList", {
					id: id,
					index: index
				})
			}
		}
	}
</script>

<style scoped>
	.orange-wrap {
		position: relative;
		box-sizing: border-box;
		
	}
	.orange-title{
		display: flex;
		justify-content:space-between ;
		margin-bottom: 20rpx;
		padding-right: 30rpx;
	}
	.orange-title .al{
		font-weight: 700;
		font-size: 34rpx;
	}
	.orange-title .ar{
		font-size: 28rpx;
		color: #777;
		position: relative;
		top: 10rpx;
		
	}
	.orange-content{
		
	}
	.orange-content .swiper-item{
		height: 140rpx;
		margin-right: 14rpx;
	}
	.orange-content .swiper-item .img{
		width: 100%;
		height: 100%;
	}
	.orange-content .swiper-item .subject{
		font-size: 26rpx;
		width: 100%;
	}
	.lookmore{
		background-color: #e2e2e2;
		text-align: center;
		line-height: 140rpx;
	}
	.lookmore .moretext{
		color: #777;
		font-size: 28rpx;
	}


</style>
