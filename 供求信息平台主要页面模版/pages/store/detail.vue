<template>
	<view>
		<view  :style="{background:tempColor}">
			<view class="pd16_15">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<view class="company-detail-logo-box">
							<image class="company-logo"></image>
							<image class="vip" :src="statics.vipImg[2]"></image>
						</view>
						<view class="ml10">
							<view class="ft14 cl-w ftw500 text-over" style="max-width: 380rpx;">合肥微小宝网络科技有限公司</view>
							
							<view class="flex alcenter mt10">
								<!-- <view class="tag-shop-type wt">经销批发</view>
								<view class="tag-shop-type wt">一件代发</view>
								<view class="tag-shop-type wt">小程序订货</view> -->
								
								<view class="tag-factory-type wt">生产加工</view>
								<view class="tag-factory-type wt">OEM</view>
								<view class="tag-factory-type wt">小程序订货</view>
							</view>
							<view class="mt10 ft14 cl-w">主营：女装|男装|内衣</view>
						</view>
					</view>
					
					<view>
						<view class="flex center mb10">
							<view class="company-share-btn">
								<text class="iconfont icon-fenxiang ft20"></text>
							</view>
						</view>
						<view class="btn-mini">+关注</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pd16_15 ">
			<view class="box pd24_15 noshadow">
				
				<view class=" flex alcenter">
					<text class="iconfont icon-shangpu ft18 cl-notice"></text>
					<text class="ft14 cl-notice ml5">商家名称：</text>
					<text class="ft14 cl-main ftw500">合肥微小宝网络科技有限公司</text>
					<text class="tag-shop ml5">店铺</text>
					
					<!-- <text class="tag-factory ml5">工厂</text> -->
				</view>
				<view class="mt12 flex alcenter">
					<text class="iconfont icon-dizhi ft18 cl-notice"></text>
					<text class="ft14 cl-notice ml5">所在城市：</text>
					<text class="ft14 cl-main ftw500">安徽 合肥</text>
				</view>
				<view class="mt12 flex alcenter">
					<text class="iconfont icon-lianxiren ft18 cl-notice"></text>
					<text class="ft14 cl-notice ml5">联系人：</text>
					<text class="ft14 cl-main ftw500">尤经理</text>
				</view>
				
				<view class="mt12 flex alcenter" @click="copyAct" data-txt="x1s4wwa">
					<text class="iconfont icon-weixin ft18 cl-notice"></text>
					<text class="ft14 cl-notice ml5">微信号码：</text>
					<text class="ft14 cl-main ftw500">x1s4wwa</text>
					<text class="tag-copy ml10">复制</text>
				</view>
				
				<view class="mt12 flex alcenter" @click="telAct" data-phone="0551-12345678">
					<text class="iconfont icon-dianhua ft18 cl-notice"></text>
					<text class="ft14 cl-notice ml5">联系电话：</text>
					<text class="ft14 cl-main ftw500">0551-12345678</text>
				</view>
				
			</view>
		
		</view>
		
		<view class="mb16 plr15">
			<view class="box noshadow pd16_15 flex alcenter space">
				<view class="flex alcenter">
					<text class="iconfont icon-xiaochengxu ft32" style="color: #00BA26;"></text>
					<text class="ml10 ft14 ftw500 cl-notice">商家已开通独立小程序</text>
				</view>
				<view class="btn-small" :style="getBtnStyle">去订货</view>
			</view>
		</view>
	
		<view class="plr15">
				
				<view class="flex alcenter space">
					<text class="ft16 cl-main ftw600">商品橱窗</text>
				</view>
				
				<view class="mt16 flex wrap space">
					<view class="product-list-item">
						<navigator url="/pages/product/detail">
						<image class="photo"></image>
						<view style="padding: 10rpx;">
							<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
							<view class="mt5 flex alcenter space">
								<text class="ft14 cl-price">面议</text> 
								<text class="ft12 cl-notice">安徽 合肥</text>
							</view>
						</view>
						</navigator>
					</view>
					<view class="product-list-item">
						<navigator url="/pages/product/detail">
						<image class="photo"></image>
						<view style="padding: 10rpx;">
							<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
							<view class="mt5 flex alcenter space">
								<text class="ft14 cl-price">面议</text> 
								<text class="ft12 cl-notice">安徽 合肥</text>
							</view>
						</view>
						</navigator>
					</view>
					<view v-for="a in 10" :key="a" class="product-list-item mt10">
						<navigator url="/pages/product/detail">
						<image class="photo"></image>
						<view style="padding: 10rpx;">
							<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
							<view class="mt5 flex alcenter space">
								<text class="ft14 cl-price">面议</text> 
								<text class="ft12 cl-notice">安徽 合肥</text>
							</view>
						</view>
						</navigator>
					</view>
					
				</view>
				
			</view>
		 <view style="height: 100rpx;"></view>
		 
		 
		 <view class="store-detail-footer-h">
			 <view class="store-detail-footer store-detail-footer-h">
				 <view class="flex">
					 <view class="store-detail-btn" style="background: linear-gradient(to right, #FF9900, #FF6700);"  @click="telAct" data-phone="0551-12345678"><text class="iconfont icon-dianhua1 mr5"></text>拨打电话</view>
					 <view class="store-detail-btn" style="background: #f00;">立即询价</view>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.company-tabs{
		height: 80rpx;
		border-top: 1px solid rgba(255,255,255,.2);
	}
	.company-detail-logo-box{
		width: 120rpx;
		height: 120rpx;
		position: relative;
	}
	.company-detail-logo-box .company-logo{
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(255, 255, 255, 0.5);
	}
	.company-detail-logo-box .vip{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.company-share-btn{
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		line-height: 80rpx;
		text-align: center;
		background: rgba(0,0,0,.1);
		color:#FFFFFF;
	}
	.product-list-item{
		width: calc(50% - 10rpx);
		height: 446rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.product-list-item .photo{
		width: 100%;
		height: 336rpx;
		background: #F2F2F2;
	}
	
	
	.store-detail-footer-h{
		height:100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}
	
	.store-detail-footer{
		width: 100%;
		position: fixed;
		z-index: 10;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow:0rpx -4rpx 16rpx 0rpx rgba(0,0,0,0.04);
	}
	.store-detail-btn{
		width: 50%;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color:#FFFFFF;
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}
</style>