<template>
	<view>
		<view>
			<swiper class="product-swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="300">
				<swiper-item>
					<image class="photo"></image>
				</swiper-item>
				<swiper-item>
					<image  class="photo"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="pd16_15 bg-w">
			<view class="ft16 ftw600 cl-main">
				临沂工作服-临沂工作服厂家-套装男女透气排汗耐磨春夏薄款物业电工长袖汽修劳保服-小功服品牌
			</view>
			<view class="flex alcenter space mt12">
				<view>
					<view>
						<text class="ft14 cl-notice">产品价格：</text>
						<text class="ft16 cl-price ftw500 ml10">面议</text>
						<text class="ft12 cl-notice">/件</text>
					</view>
					<view class="mt12">
						<text class="ft14 cl-notice">产品类别：</text>
						<text class="ft14 cl-notice ml10">女装-内衣</text>
					</view>
				</view>
				<view>
					<view class="flex alcenter">
<!-- 						<text class="iconfont icon-shoucang cl-red ft20"></text>
 -->						<text class="iconfont icon-shoucang1 cl-red ft20"></text>
						<text class="iconfont icon-fenxiang ft20 ml20"></text>
					</view>
					<view class="mt12">
						<text class="iconfont icon-fangwen1 cl-notice"></text>
						<text class="ml5 ft12 cl-notice">2000</text>
					</view>
				</view>
			</view>
		</view>
	
		<view class="mt16 pd16_15 bg-w">
			<view class="flex alcenter space">
				<view class="ft16 ftw600 cl-main">
					联系方式
				</view>
				<navigator url="/pages/store/detail">
				<view class="btn-mini" :style="getBtnStyle">进店</view>
				</navigator>
			</view>
			<view class="mt16 flex alcenter">
				<text class="iconfont icon-shangpu ft18 cl-notice"></text>
				<text class="ft14 cl-notice ml5">商家名称：</text>
				<text class="ft14 cl-main ftw500">合肥微小宝网络科技有限公司</text>
				<text class="tag-shop ml5">店铺</text>
				
				<!-- <text class="tag-factory ml5">工厂</text> -->
			</view>
			<view class="mt16 flex alcenter">
				<text class="iconfont icon-dizhi ft18 cl-notice"></text>
				<text class="ft14 cl-notice ml5">所在城市：</text>
				<text class="ft14 cl-main ftw500">安徽 合肥</text>
			</view>
			<view class="mt16 flex alcenter">
				<text class="iconfont icon-lianxiren ft18 cl-notice"></text>
				<text class="ft14 cl-notice ml5">联系人：</text>
				<text class="ft14 cl-main ftw500">尤经理</text>
			</view>
			
			<view class="mt16 flex alcenter" @click="copyAct" data-txt="x1s4wwa">
				<text class="iconfont icon-weixin ft18 cl-notice"></text>
				<text class="ft14 cl-notice ml5">微信号码：</text>
				<text class="ft14 cl-main ftw500">x1s4wwa</text>
				<text class="tag-copy ml10">复制</text>
			</view>
			
			<view class="mt16 flex alcenter" @click="telAct" data-phone="0551-12345678">
				<text class="iconfont icon-dianhua ft18 cl-notice"></text>
				<text class="ft14 cl-notice ml5">联系电话：</text>
				<text class="ft14 cl-main ftw500">0551-12345678</text>
			</view>
			
		
		</view>
		
		
		<view  class="mt16 pd16_15 bg-w">
			<view class="ft16 ftw600 cl-main">
				产品详情
			</view>
			
			<view class="mt16 ft14 cl-info">
				<rich-text :nodes="detail"></rich-text>
			</view>
			
		</view>
		
		<view class="product-footer-h">
			<view class="product-footer-h product-footer">
				
				<view class="flex  space">
					<view class="pl15 pt5 text-center">
						<navigator url="/pages/store/detail">
						<view class="iconfont icon-dianpu ft20"></view>
						<view class="ft12 cl-info ftw500 m5">进店看看</view>
						</navigator>
					</view>
					<view class="product-btn">
						<view class="tel" @click="telAct" data-phone="0551-12345678"><text class="iconfont icon-dianhua1 mr5"></text>拨打电话</view>
						<view class="apply">立即询价</view>
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
				detail:'...今日，<em class="highlight">微信</em>官方发布<em class="highlight">微信</em>X.Y.Z版本...'
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.product-swiper{
		height: 750rpx;
	}
	.product-swiper image{
		width: 100%;
		height: 750rpx;
		background: #F2F2F2;
	}
	.highlight{
		color: red;
	}
	
	
	.product-footer-h{
		height:100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}
	
	.product-footer{
		width: 100%;
		position: fixed;
		z-index: 10;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow:0rpx -4rpx 16rpx 0rpx rgba(0,0,0,0.04);
	}
	.product-btn{
		width: 500rpx;
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
		display: flex;
	}
	.product-btn .tel,.product-btn .apply{
		width: 50%;
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
	.product-btn .tel{
		background: linear-gradient(to right, #FF9900, #FF6700);
	}
	.product-btn .apply{
		background: #f00;
	}
	
	
</style>