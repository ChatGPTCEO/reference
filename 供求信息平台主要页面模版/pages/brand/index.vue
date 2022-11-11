<template>
	<view>
		<sub-tabnav :scrollTop="100" :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tabnav>
		<view class="pd16_15">
			<view class="brand-notice">
				由于平台本身不提供交易，品牌商家拥有自己独立的小程序。可前往品牌商家的小程序下单。
			</view>
			<view class="flex alcenter space mt16">
				
				<view class="flex alcenter">
					<text class="ft16 ftw600 cl-main">品牌商家小程序</text>
				</view>
				<view class="btn-small plan" :style="getBtnPlanStyle">制作小程序</view>
			</view>
			
			<view class="box noshadow mt16 pd16_15">
				<view class="flex">
					<view>
						<view class="company-logo-box">
							<image class="company-logo"></image>
							<image class="vip" :src="statics.vipImg[2]"></image>
						</view>
						<view class="mt10" style="color: #f44336;">
							<text class="iconfont icon-renqi ft14"></text>
							<text class="ft14 ftw500 ml4">500</text>
						</view>
					</view>
					<view class="ml10" style="width: calc(100% - 140rpx);">
						<view class="flex alcenter">
							<view class="tag-shop mr5">店铺</view><view class="ft14 cl-main ftw500 text-over" style="max-width: 380rpx;">合肥微小宝网络科技有限公司</view>
						</view>
						<view class="flex alcenter mt10">
							<view class="tag-shop-type">经销批发</view>
							<view class="tag-shop-type">一件代发</view>
							<view class="tag-shop-type">小程序订货</view>
						</view>
						<view class="flex alcenter space mt10">
							<view style="width: calc(100% - 160rpx);">
								<view class="ft12 cl-notice text-over">
									主营：童装|女装|男装
								</view>
								<view class="mt12 ft12 cl-notice">
									安徽 合肥
								</view>
							</view>
							<view class="btn-mini" :style="getBtnStyle">进店</view>
						</view>
					</view>
				</view>
				
				
			</view>
		
		<view class="box noshadow mt16 pd16_15 mt16">
			<view class="flex">
				<view>
					<view class="company-logo-box">
						<image class="company-logo"></image>
						<image class="vip" :src="statics.vipImg[2]"></image>
					</view>
					<view class="mt10" style="color: #f44336;">
						<text class="iconfont icon-renqi ft14"></text>
						<text class="ft14 ftw500 ml4">500</text>
					</view>
				</view>
				
				<view class="ml10" style="width: calc(100% - 140rpx);">
					<view class="flex alcenter">
						<view class="tag-factory mr5">工厂</view><view class="ft14 cl-main ftw500 text-over" style="max-width: 380rpx;">合肥微小宝网络科技有限公司</view>
					</view>
					<view class="flex alcenter mt10">
						<view class="tag-factory-type">生产加工</view>
						<view class="tag-factory-type">OEM</view>
						<view class="tag-factory-type">小程序订货</view>
					</view>
					<view class="flex alcenter space mt10">
						<view style="width: calc(100% - 160rpx);">
							<view class="ft12 cl-notice text-over">
								主营：童装|女装|男装
							</view>
							<view class="mt12 ft12 cl-notice">
								安徽 合肥
							</view>
						</view>
						<view class="btn-mini" :style="getBtnStyle">进店</view>
					</view>
				</view>
			</view>
			
			
		</view>
				
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				selectIndex:0,
				tabs:[
					'全部', '男装','女装','童装','内衣','玩具','配饰'
				],
			}
		},
	
		onLoad(){
			
		},
		methods:{
			changeIndex(e){
				this.selectIndex = e;
			}
		}
	}
</script>

<style>
	.brand-notice{
		padding: 20rpx;
		font-size: 28rpx;
		color:#000000;
		border-radius: 16rpx;
		line-height: 36rpx;
		background-color: #fffbe6;
		border: 1px solid #ffe58f;
	}
	.company-logo-box{
		width: 120rpx;
		height: 120rpx;
		position: relative;
	}
	.company-logo-box .company-logo{
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(197, 202, 219, 0.5);
	}
	.company-logo-box .vip{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
</style>