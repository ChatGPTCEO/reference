<template>
	<view>
		<view style="display: flex;">
			<!-- 模拟头像 -->
			<view style="width: 150rpx;height: 150rpx;background-color: #dedede;border-radius: 50%;"></view>
			<!-- 模拟头像 -->

			<view style="display: flex;flex-direction: column;">
				<text style="font-size: 25px;font-weight: 700;">Name</text>
				<view style="display: flex;align-content: center;height: 60rpx;">
					<view style="width: 200rpx;;height: 35rpx;border-radius: 25px;background-color: #dedede;">
					</view>
					<view
						style="margin-left: 15rpx;width: 200rpx;;height: 35rpx;border-radius: 25px;background-color: #dedede;">
					</view>
				</view>
			</view>
		</view>


		<!-- 订单 -->
		<view style="width: 750px;display: flex;" @click="goPartake()">
			
			<text style="font-size: 18px;font-weight: 700;">我参与的</text>
			
			<view style="display: flex;flex-direction: column;align-items: center;">
				<text>0</text>
				<text>代发货</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<text>0</text>
				<text>待收货</text>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<text>0</text>
				<text>已退款</text>
			</view>
		</view>
			<!-- 订单 -->

		<view style="width: 750px;">

			<view style="display: flex;" @click="goLaunch()">
				<text style="font-size: 18px;font-weight: 700;">我发起的</text>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text>0</text>
					<text>已发起</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text>0</text>
					<text>进行中</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text>0</text>
					<text>已完成</text>
				</view>
			</view>

			<view style="width: 750px;height: 260rpx;background-color: #dedede;border-radius: 5px;"></view>

		</view>

		<view style="width: 750px;display: flex;">
			
			<view style="display: flex;flex-direction: column;">
				<text style="font-size: 18px;font-weight: 700;">我的账户</text>
				<text>完成接龙金额可转出/提现</text>
			</view>

			<text style="font-size: 25px;font-weight: 800;">+00.0</text>

		</view>
		
		
		<!-- 功能菜单 -->
		
		<view style="width: 750px;;display: flex;flex-direction: column;">
			<!-- 第一行 -->
			<view style="width: 100%;display: flex;flex-direction: row;">
				
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>收货地址</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>我的收藏</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>关于我们</text>
				</view>
				
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>联系客服</text>
				</view>
				
			</view>
			<!-- 第一行 -->
			
			<!-- 第二行 -->
			<view style="display: flex;flex-direction: row;align-items: center;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>分享好友</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;" src="../../static/temp.png"></image>
					<text>新人有礼</text>
				</view>
			</view>
			<!-- 第二行 -->


		</view>
		<!-- 功能菜单 -->


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
			goPartake:function(){
				uni.navigateTo({
					url: 'partake'
				});
			},
			goLaunch:function(){
				uni.navigateTo({
					url: 'launch'
				});
			}
		}
	}
</script>

<style>
</style>
