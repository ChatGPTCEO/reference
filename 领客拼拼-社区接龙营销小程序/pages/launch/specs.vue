<template>
	<!-- 规格详情页 -->
	<view>
	
		<!-- TAB -->
		<view style="width: 750rpx;height: 150rpx;background-color: white;display: flex;align-items: center;">
			<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: antiquewhite;color: burlywood;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">产品包装</view>
			<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: antiquewhite;color: burlywood;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">规格类型</view>
			<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: aliceblue;color: black;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">口味</view>
			<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: aliceblue;color: black;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">颜色</view>
		</view>
		<!-- TAB -->
		
		<view style="display: flex;width: 750rpx;display: flex;flex-direction: column;align-items: center;margin-top: 15px;">
			
			<view style="width: 720rpx;height:150rpx;display: flex;flex-direction: column;justify-content: space-between;background-color: white;border-radius: 15px;">
				<view style="width: 720rpx;height:70rpx;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
					<text style="font-size: 16px;">产品包装</text>
					<text style="font-size: 14px;color: chartreuse;">添加</text>
				</view>
				<view style="width: 720rpx;height: 100rpx;display: flex;align-items: center;">
					<input  style="width: 150rpx;height: 60rpx;border-radius: 25px;background-color: aliceblue;"/>
				</view>
			</view>
			
			<view style="width: 720rpx;display: flex;flex-direction: column;justify-content: space-between;background-color: white;border-radius: 15px;margin-top: 15px;">
				<view style="width: 720rpx;height:70rpx;display: flex;flex-direction: row;align-items: center;">
					<text style="font-size: 16px;">规格类型</text>
				</view>
				<view style="width: 720rpx;display: flex;align-items: center;flex-direction: column;">
					<view style="width: 720rpx;display: flex;flex-direction: row;justify-content: space-between;">
						<text style="font-size: 14px;">每/G</text>
						<text style="font-size: 14px;">每/斤</text>
						<text style="font-size: 14px;">每/件</text>
						<text style="font-size: 14px;">每/个</text>
					</view>
					<view style="width: 720rpx;height:70rpx;display: flex;flex-direction: row;justify-content: space-between;">
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
					</view>
					<view style="width: 720rpx;height:70rpx;display: flex;flex-direction: row;justify-content: space-between;">
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
					</view>
					<view style="width: 720rpx;height:70rpx;display: flex;flex-direction: row;justify-content: space-between;">
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
						<view style="display: flex;align-items: center;height: 60rpx;">
							<text style="font-size: 14px;color: #cdcdcd;">重量:</text>
							<input type="digit" style="border-bottom: 1px solid #aaa;width: 85rpx;"/>
							<text style="font-size: 14px;color: #cdcdcd;">g</text>
						</view>
					</view>
					<view style="width: 720rpx;display: flex;">
						<text>添加</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 底部功能按键 -->
		<view style="position: fixed;bottom: 0rpx;left: 0rpx;width: 750rpx;height: 120rpx;background-color: #FFFFFF;display: flex;justify-content: space-around;align-items: center;">
			
			<view style="width: 320rpx;height: 80rpx;border-radius: 25px;background-color: #dedede;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;">清除内容</view>
			<view style="width: 320rpx;height: 80rpx;border-radius: 25px;background-color: #60BA62;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;">确定</view>
			
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