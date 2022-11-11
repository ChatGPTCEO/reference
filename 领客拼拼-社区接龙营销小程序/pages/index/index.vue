<template>
	<view>
		<view style="width: 750px;height: 60rpx;background-color: antiquewhite;display: flex;align-items: center;">	
			<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			<text>当前位置</text>
		</view>
		
		<!-- 轮播图 -->
		<view style="width: 750px;height: 300rpx;background-color: aquamarine;">
			<swiper style="width: 750px;height: 300rpx;background-color: #FFFFFF;" :autoplay="true" :indicator-dots="true">
				<swiper-item style="background-color: aqua;">
					<text>轮播1</text>
				</swiper-item>
				<swiper-item style="background-color: aquamarine;">
					<text>轮播2</text>
				</swiper-item>
				<swiper-item style="background-color: bisque;">
					<text>轮播3</text>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 -->
		
		<!-- 商品展示列表TAB -->
		<view style="width: 750px;height: 100rpx;display: flex;align-content: center;">
			<text>当前最热</text>
			<text>鲜果蔬菜</text>
			<text>农副产品</text>
			<text>地方特产</text>
		</view>
		<!-- 商品展示列表TAB -->
		
		
		<!-- 商品展示列表 -->
		<view style="width: 750px;height: auto;">
			
			<view style="display: flex;">
				<image style="width: 300rpx;height: 300rpx;" src="https://img.alicdn.com/imgextra/i1/662690198/O1CN01vZk9Tb1DKjBs2zeQv_!!0-saturn_solar.jpg_468x468q75.jpg_.webp"></image>
				<view style="display: flex;flex-direction: column;">
					<text style="font-size: 18px;">标题名称标题名称标题名称标题名称</text>
					<text>￥0</text>
					<view style="display: flex;align-items: center;">
						<text>已接龙27/30</text>
						<text>距离 000m</text>
					</view>
					
				</view>
			</view>
			
			<view style="display: flex;">
				<image style="width: 300rpx;height: 300rpx;" src="https://img.alicdn.com/imgextra/i1/662690198/O1CN01vZk9Tb1DKjBs2zeQv_!!0-saturn_solar.jpg_468x468q75.jpg_.webp"></image>
				<view style="display: flex;flex-direction: column;">
					<text style="font-size: 18px;">标题名称标题名称标题名称标题名称</text>
					<text>￥0</text>
					<view style="display: flex;align-items: center;">
						<text>已接龙27/30</text>
						<text>距离 000m</text>
					</view>
					
				</view>
			</view>
			
			<view style="display: flex;">
				<image style="width: 300rpx;height: 300rpx;" src="https://img.alicdn.com/imgextra/i1/662690198/O1CN01vZk9Tb1DKjBs2zeQv_!!0-saturn_solar.jpg_468x468q75.jpg_.webp"></image>
				<view style="display: flex;flex-direction: column;">
					<text style="font-size: 18px;">标题名称标题名称标题名称标题名称</text>
					<text>￥0</text>
					<view style="display: flex;align-items: center;">
						<text>已接龙27/30</text>
						<text>距离 000m</text>
					</view>
					
				</view>
			
			
		</view>
		<!-- 商品展示列表 -->
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

<style>

</style>
