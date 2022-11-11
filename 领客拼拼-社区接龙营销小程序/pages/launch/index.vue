<template>
	<view style="width: 750rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
		
		<view style="display: flex;justify-content: space-between;width: 720rpx;background-color: white;border-radius: 5px;margin-top: 15px;" @click="toPa">
			<view style="width: 180rpx;height: 180rpx;display: flex;align-items: center;justify-content: center;">
				<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
			</view>
			<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;">
				<text style="font-size: 15px;font-weight: 700;">农副产品</text>
				<text>应季新鲜蔬菜果实惠选</text>
			</view>
			<view style="width: 80rpx;;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			</view>
		</view>
		
		<view style="display: flex;justify-content: space-between;width: 720rpx;background-color: white;border-radius: 5px;margin-top: 15px;" @click="toPa1">
			<view style="width: 180rpx;height: 180rpx;display: flex;align-items: center;justify-content: center;">
				<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
			</view>
			<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;">
				<text style="font-size: 15px;font-weight: 700;">农副产品</text>
				<text>应季新鲜蔬菜果实惠选</text>
			</view>
			<view style="width: 80rpx;;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			</view>
		</view>
		
		<view style="display: flex;justify-content: space-between;width: 720rpx;background-color: white;border-radius: 5px;margin-top: 15px;">
			<view style="width: 180rpx;height: 180rpx;display: flex;align-items: center;justify-content: center;">
				<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
			</view>
			<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;">
				<text style="font-size: 15px;font-weight: 700;">农副产品</text>
				<text>应季新鲜蔬菜果实惠选</text>
			</view>
			<view style="width: 80rpx;;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			</view>
		</view>
		
		<view style="display: flex;justify-content: space-between;width: 720rpx;background-color: white;border-radius: 5px;margin-top: 15px;">
			<view style="width: 180rpx;height: 180rpx;display: flex;align-items: center;justify-content: center;">
				<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
			</view>
			<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;">
				<text style="font-size: 15px;font-weight: 700;">农副产品</text>
				<text>应季新鲜蔬菜果实惠选</text>
			</view>
			<view style="width: 80rpx;;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			</view>
		</view>
		
		<view style="display: flex;justify-content: space-between;width: 720rpx;background-color: white;border-radius: 5px;margin-top: 15px;">
			<view style="width: 180rpx;height: 180rpx;display: flex;align-items: center;justify-content: center;">
				<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
			</view>
			<view style="height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;">
				<text style="font-size: 15px;font-weight: 700;">农副产品</text>
				<text>应季新鲜蔬菜果实惠选</text>
			</view>
			<view style="width: 80rpx;;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
			</view>
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
			toPa:function(){
				uni.navigateTo({
					url: 'details'
				});
			},
			toPa1:function(){
				uni.navigateTo({
					url: 'establish'
				});
			}
		}
	}
</script>

<style>
	
	page{
		background-color: aliceblue;
	}

</style>