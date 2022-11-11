<template>
	<view>
		<view class="home-notice">
			<swiper :vertical="true" :circular="true" :autoplay="true" :interval="1000" :duration="300" class="home-notice-swiper">
				<swiper-item>
					<view class="swiper-item">
						<text class="ft12 cl-main">用户小李**发布求购信息</text>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<text class="ft12 cl-main">用户小李**发布求购信息</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.home-notice{
		width: 300rpx;
		height: 60rpx;
		background: rgba(255,255,255,.8);
		border-radius: 0rpx 40rpx 40rpx 0rpx;
		position: fixed;
		left: 0rpx;
		bottom: 200rpx;
		bottom: calc(200rpx +  constant(safe-area-inset-bottom));
		bottom: calc(200rpx +  env(safe-area-inset-bottom));
		color:#FFFFFF;
	}
	.home-notice-swiper{
		width: 100%;
		height: 60rpx;
	}
	.home-notice-swiper .swiper-item{
		line-height: 60rpx;
		padding: 0 10rpx;
	}
</style>