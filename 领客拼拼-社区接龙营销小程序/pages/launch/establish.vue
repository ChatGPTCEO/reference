<template>
	<view>
		<!-- 添加接龙图片 -->
		<view style="width: 750rpx;height: 200rpx;display: flex;justify-content: center;align-items: center;">
			<image style="width: 120rpx;height: 120rpx;" src="../../static/temp.png"></image>
		</view>
		<!-- 添加接龙图片 -->
		
		<view style="width: 750rpx;display: flex;align-items: center;flex-direction: column;">
			
			
			<view style="width: 720rpx;height: 150rpx;background-color: white;border-radius: 15px;margin-top: 15px;">
				<text style="font-size: 18px;">商品名称重要信息最多30个字</text>
				<textarea style="width: 100%;height: 100rpx;" placeholder="商品卖点"></textarea>
			</view>
			
			<view style="width: 720rpx;height: 100rpx;background-color: white;border-radius: 15px;margin-top: 15px;display: flex;align-items: center;justify-content: space-between;" @click="toPa1">
				<text style="font-size: 18px;">规格/数量</text>
				<image style="width: 45rpx;height: 45rpx;" src="../../static/go.png"></image>
			</view>
			
			<view style="width: 720rpx;height: 150rpx;background-color: white;border-radius: 15px;margin-top: 15px;">
				<view style="display: flex;width: 100%;justify-content: space-between;">
					<text style="font-size: 18px;">接龙人数</text>
					<view style="display: flex;">
						<input style="width: 120rpx;height: 60rpx;background-color: azure;border-radius: 25px;" />
						<text>-</text>
						<input style="width: 120rpx;height: 60rpx;background-color: azure;border-radius: 25px;" />
						<text>人</text>
					</view>
				</view>
				
				<view style="display: flex;width: 100%;justify-content: space-between;">
					<text style="font-size: 18px;">起止时间</text>
					<view style="display: flex;">
						<text style="font-size: 14px;color: #626262;">2022-03-12 10:00 ~ 2020-03-26 24:00</text>
					</view>
				</view>
			</view>
			
			
			<view style="width: 720rpx;height: 150rpx;background-color: white;border-radius: 15px;margin-top: 15px;display: flex;flex-direction: column;">
				<text style="font-size: 18px;">商品位置</text>
				<view style="width: 720rpx;;display: flex;justify-content: space-between;">
					<text style="font-size: 14px;color: #60BA62;">林肯公园二期8号楼</text>
					<image style="width: 45rpx;height: 45rpx;" src="../../static/go.png"></image>
				</view>
			</view>
			
			<view style="width: 720rpx;height: 110rpx;background-color: white;border-radius: 15px;margin-top: 15px;display: flex;align-items: center;">
				<text style="font-size: 18px;">配送方式</text>
				<view style="flex: 1;display: flex;justify-content:flex-end;">
					<view style="display: flex;align-items: center;margin-right: 15px;">
						<radio style="transform: scale(0.7);"></radio>
						<text style="font-size: 14px;">送货上门</text>
					</view>
					<view style="display: flex;align-items: center;">
						<radio style="transform: scale(0.7);"></radio>
						<text style="font-size: 14px;">自提</text>
					</view>
				</view>
			</view>
			
			<view style="width: 720rpx;background-color: white;border-radius: 15px;margin-top: 15px;display: flex;flex-direction: column;">
				<text style="font-size: 18px;">微信二维码</text>
				<text style="font-size: 14px;">上传微信二维码图片 方便买家与你取得联系</text>
				<view style="width: 720rpx;;display: flex;justify-content: space-between;">
					<view style="width: 150rpx;height: 150rpx;background-color: #e7e7e7cd;display: flex;justify-content: center;align-items: center;border-radius: 5px;">
						<image style="width: 50rpx;height: 50rpx;" src="../../static/add.png"></image>
					</view>
				</view>
			</view>
			
			<view style="width: 720rpx;display: flex;flex-direction: column;margin-bottom: 135rpx;">
				<text>注意事项：</text>
				<text>确保用户消费一致</text>
			</view>
			
			<!-- 底部功能按键 -->
			<view style="position: fixed;bottom: 0rpx;left: 0rpx;width: 750rpx;height: 120rpx;background-color: #FFFFFF;display: flex;justify-content: space-around;align-items: center;">
				
				<view style="width: 240rpx;height: 80rpx;border-radius: 25px;background-color: #ff7c1C;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;">预览</view>
				<view style="width: 400rpx;height: 80rpx;border-radius: 25px;background-color: #60BA62;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;" @click="toPay">发布接龙</view>
				
			</view>
			<!-- 底部功能按键 -->
			
			
			
			
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
			toPa1:function(){
				uni.navigateTo({
					url: 'specs'
				});
			},
			toPay:function(){
				uni.navigateTo({
					url: 'payment'
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: azure;
	}
</style>