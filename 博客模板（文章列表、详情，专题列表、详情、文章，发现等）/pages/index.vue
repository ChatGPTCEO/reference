<template>
	<view class="container">
		<!--轮播-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item>
				<view class="swiper-item">
					<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350817201,1137116540&fm=26&gp=0.jpg" class="banner-img"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3545834692,4156954932&fm=26&gp=0.jpg" class="banner-img"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=774373677,2313985244&fm=26&gp=0.jpg" class="banner-img"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--列表-->
		<view class="list">
			<card v-for="(item, index) in 10" :key="index"></card>
		</view>
	</view>
</template>

<script>
export default {
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
.swiper-item,
.banner-img{
	width: 100%;
	height: 100%;
}
</style>
