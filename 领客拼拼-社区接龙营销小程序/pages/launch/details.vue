<template>
	<!-- 商品详情页 -->
	<view>
		<!-- 轮播图 -->
		<view style="width: 750px;height: 300rpx;background-color: aquamarine;">
			<swiper style="width: 750px;height: 300rpx;background-color: #FFFFFF;" :autoplay="true"
				:indicator-dots="true">
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

		<view style="width: 750rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">

			<!-- 商品简介 -->
			<view
				style="display: flex;flex-direction: column;width: 720rpx;border-radius: 10px;background-color: #FFFFFF;margin-top: 15px;">
				<text style="color: #f39242;font-size: 18px;font-weight: 700;">￥29</text>
				<text>优质鲜橙但单果130g以上5斤装</text>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<text style="font-size: 18px;font-weight: 700">距结束</text>
					<view style="display: flex;flex-direction: row;">
						<text style="font-size: 13px;margin-right: 10rpx;">距离</text>
						<text style="font-size: 13px;color: #60BA62;">367m</text>
					</view>
				</view>
			</view>
			<!-- 商品简介 -->


			<!-- 商品服务 -->
			<view
				style="display: flex;flex-direction: column;width: 720rpx;border-radius: 10px;background-color: #FFFFFF;margin-top: 15px;">

				<text>服务</text>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<text style="font-size: 18px;font-weight: 700">免费送货上门 * 不成团自动退款 * 团长质量把控</text>
				</view>
			</view>
			<!-- 商品服务 -->

			<view
				style="display: flex;flex-direction: column;width: 720rpx;border-radius: 10px;background-color: #FFFFFF;margin-top: 15px;">

				<text>送至</text>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<text style="font-size: 18px;font-weight: 700">林肯公园二期8号楼</text>
					<text style="font-size: 18px;font-weight: 700">请核实收货地址，接龙结束后1小时内送货</text>
				</view>
			</view>


			<!-- 接龙详情 -->
			<view
				style="display: flex;flex-direction: column;width: 720rpx;border-radius: 10px;background-color: #FFFFFF;margin-top: 15px;">

				<text>已接龙人 22/30</text>

				<view style="display: flex;flex-direction: row;width: 720rpx;justify-content: space-between;">
					<view style="display: flex;flex-direction: row;">
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
						<image style="width: 60rpx;height:60rpx;border-radius: 50%;margin-right: 10px;"
							src="../../static/temp.png"></image>
					</view>
					<view style="display: flex;align-content: center;">
						<image @click="toPa" style="width: 40rpx;height: 45rpx;" src="../../static/location.png">
						</image>
					</view>
				</view>
			</view>
			<!-- 接龙详情 -->

		</view>

		<!-- 底部功能按键 -->
		<view
			style="position: fixed;bottom: 0rpx;left: 0rpx;width: 750rpx;height: 120rpx;background-color: #FFFFFF;display: flex;justify-content: space-around;align-items: center;">

			<view
				style="width: 240rpx;height: 80rpx;border-radius: 25px;background-color: #ff7c1C;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;" @click="open">
				收藏</view>
			<view
				style="width: 400rpx;height: 80rpx;border-radius: 25px;background-color: #60BA62;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;">
				参与接龙</view>

		</view>
		<!-- 底部功能按键 -->


		<uni-popup ref="popup" type="bottom">

			<view style="width: 750rpx;height: auto;background-color: #FFFFFF;border-top-left-radius: 25px;border-top-right-radius: 25px;">
				
				<view style="width: 720rpx;display: flex;">
					<image style="width: 120rpx;height: 120rpx;margin-top: -15rpx;" src="../../static/temp.png"></image>
					<view style="display: flex;flex-direction: column;">
						<text>￥29</text>
						<text>已选择：5斤</text>
					</view>
				</view>
				
				<view style="width: 720rpx;">
					<text style="font-size: 15px;font-weight: 700;">产品包装</text>
					<view style="width: 750rpx;height: 120rpx;background-color: white;display: flex;align-items: center;">
						<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: #60BA62;color: burlywood;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">产品包装</view>
						<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: aliceblue;color: black;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">颜色</view>
					</view>
				</view>
				
				<view style="width: 720rpx;">
					<text style="font-size: 15px;font-weight: 700;">规格类型</text>
					<view style="width: 750rpx;height: 120rpx;background-color: white;display: flex;align-items: center;">
						<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: antiquewhite;color: burlywood;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">5斤</view>
						<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: aliceblue;color: black;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">8斤</view>
						<view style="width: auto;height:45rpx;padding: 10rpx 20rpx;background-color: aliceblue;color: black;display: flex;justify-content: center;align-items: center;border-radius: 25px;margin-right: 15rpx;">10斤</view>
					</view>
				</view>
				
				<view style="width: 720rpx;display: flex;justify-content: space-between;margin-bottom: 120rpx;">
					<text>购买数量</text>
					<uni-number-box @change="changeValue" />
				</view>
				
				<view style="width: 720rpx;height: 100rpx;">
					<view style="width: 700rpx;height: 80rpx;border-radius: 25px;background-color: #60BA62;color: #FFFFFF;font-size: 14px;display: flex;align-items: center;justify-content: center;" @click="toPay">确定</view>
				</view>
				
				
			</view>
			
		</uni-popup>

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
						changeValue(value) {
							console.log('返回数值：', value);
						},
			toPa: function() {
				uni.navigateTo({
					url: 'jielong'
				});
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			}
		}
	}
</script>

<style>
	page {
		background-color: azure;
	}
</style>
