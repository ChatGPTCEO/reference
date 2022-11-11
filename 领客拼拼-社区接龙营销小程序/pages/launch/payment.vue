<template>
	<!-- 支付页 -->
	<view>
		
		<view style="width: 750rpx;display: flex;justify-content: center;">
			
			<view style="width: 750rpx;display: flex;align-items: center;background-color: white;">
				
				<view style="width: 180rpx;height: 180rpx;display: flex;justify-content: center;align-items: center;">
					<image style="width: 150rpx;height: 150rpx;" src="../../static/temp.png"></image>
				</view>
				
				<view style="display: flex;flex-direction: column;height: 100rpx;justify-content: space-between;">
					<text>优质鲜橙单果130g</text>
					<text style="font-size: 18px;font-weight: 700;">￥29</text>
					<view style="display: flex;flex-direction: row;">
						<text style="font-size: 12px;color: #CDCDCD;">包装：袋装/重量：5斤 / 数量x1</text>
					</view>
				</view>
			</view>
		
		</view>
		
		<view style="width: 750rpx;display: flex;flex-direction: column;align-items: center;">
			
			<view style="width: 720rpx;height: auto;background-color: white;">
				
				<view>
					<text style="font-size: 14px;">请选择配送方式</text>
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;align-items: center;margin-right: 15px;">
						<radio style="transform: scale(0.7);"></radio>
						<text style="font-size: 14px;">送货上门</text>
					</view>
					<text style="font-size: 12px;color: #CDCDCD;">接龙结束后1小时内送货上门</text>
				</view>
				
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;align-items: center;margin-right: 15px;">
						<radio style="transform: scale(0.7);"></radio>
						<text style="font-size: 14px;">自提</text>
					</view>
					<text style="font-size: 12px;color: #CDCDCD;">接龙结束后1小时内送货上门</text>
				</view>
				
				
			</view>
		</view>
		
		<view style="width: 750rpx;display: flex;flex-direction: column;align-items: center;margin-top: 15px;">
			
			<view style="width: 720rpx;height: auto;background-color: white;">
				
				<view style="width: 720rpx;display: flex;">
					<image style="width: 45rpx;height: 45rpx;" src="../../static/location.png"></image>
					<text style="margin-left: 15rpx;font-size: 16px;">苏西</text>
				</view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<text style="font-size: 14px;">阿斯顿发顺丰大师风范大师8号楼2011</text>
					<image style="width: 45rpx;height: 45rpx;" src="../../static/go.png"></image>
				</view>
				<view>
					<text style="font-size: 14px;">188888888888</text>
				</view>
				
				
			</view>
			
		</view>
		
		<view style="width: 750rpx;display: flex;flex-direction: column;align-items: center;margin-top: 15px;">
			
			<view style="width: 720rpx;height:110rpx;background-color: white;display: flex;align-items: center;">
				<image style="width: 45rpx;height: 45rpx;" src="../../static/temp.png"></image>
				<text style="font-size: 16px;margin-left: 15rpx;">微信支付</text>
			</view>
			
		</view>
		
		
		<!-- 底部功能按键 -->
		<view style="position: fixed;bottom: 0rpx;left: 0rpx;width: 750rpx;height: 120rpx;background-color: #FFFFFF;display: flex;justify-content: space-around;align-items: center;">
			
			<view style="width: 240rpx;height: 80rpx;display: flex;align-items: center;justify-content: center;">
				<text style="font-size: 16px;font-weight: 700;">实付款：</text>
				<text style="font-size: 18px;font-weight: 700;">￥29</text>
			</view>
			<view style="width: 400rpx;height: 80rpx;border-radius: 25px;background-color: #60BA62;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;" @click="toPay">立即支付</view>
			
		</view>
		<!-- 底部功能按键 -->

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
	page{
		background-color: azure;
	}
</style>