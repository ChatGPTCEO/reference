<template>
	<view>
		<sub-tabnav :scrollTop="100" :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tabnav>
		<!--如果有下级分类的时候显示可以筛选-->
		<view class="mt16 plr15">
			<scroll-view :scroll-x="true" class="child-category">
				<view class="item">全部</view>
				<view class="item" :style="{background:tempColor,color:'#ffffff'}">子分类</view>
				<view class="item">子分类</view>
				<view class="item">子分类</view>
				<view class="item">子分类</view>
				<view class="item">子分类</view>
			</scroll-view>
		</view>
		
		<view class="mt16 plr15">
			<view class="search-box flex alcenter">
				<text class="iconfont icon-search_gray cl-info"></text>
				<input class="search-input ft14 cl-main" type="text" confirm-type="search" @confirm="searchAct" :maxlength="32" placeholder-class="cl-info"  placeholder="请输入关键字搜索商家" />
			</view>
		</view>
		
		<view class="mt16 plr15 flex alcenter space">
			<view class="ft16 ftw500 cl-main">共为您找到<text class="ft16 ftw500  ml5 mr5" :style="{color:tempColor}">100</text>个商家</view>
			<navigator url="/pages/store/apply">
			<view class="btn-small" :style="getBtnStyle">免费入驻</view>
			</navigator>
		</view>
		
		<view class="pd16_15">
			
			
			<view class="box noshadow pd16_15">
				
				<view class="flex">
					<view>
						<navigator url="/pages/store/detail">
						<view class="company-logo-box">
							<image class="company-logo"></image>
							<image class="vip" :src="statics.vipImg[2]"></image>
						</view>
						<view class="mt10" style="color: #f44336;">
							<text class="iconfont icon-renqi ft14"></text>
							<text class="ft14 ftw500 ml4">500</text>
						</view>
						</navigator>
					</view>
					<view class="ml10" style="width: calc(100% - 140rpx);">
						<navigator url="/pages/store/detail">
						<view class="flex alcenter">
							<view class="tag-shop mr5">店铺</view><view class="ft14 cl-main ftw500 text-over" style="max-width: 380rpx;">合肥微小宝网络科技有限公司</view> <text class="iconfont ft14 cl-main icon-gengduo"></text>
						</view>
						</navigator>
						<view class="flex alcenter mt10">
							<view class="tag-shop-type">经销批发</view>
							<view class="tag-shop-type">一件代发</view>
							<view class="tag-shop-type">小程序订货</view>
						</view>
						<view class="flex alcenter space mt10">
							<view class="ft12 cl-notice text-over" style="width: calc(100% - 160rpx);">
								主营：童装|女装|男装
							</view>
							<view class="ft12 cl-notice">
								安徽 合肥
							</view>
						</view>
						
						<view class="flex mt12">
							<scroll-view :scroll-x="true" class="store-product-scroll">
								<view class="item">
									<navigator url="/pages/product/detail">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
									</navigator>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
				
			</view>
					
			
			<view class="box noshadow pd16_15 mt16">
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
							<view class="tag-factory mr5">工厂</view><view class="ft14 cl-main ftw500 text-over" style="max-width: 380rpx;">合肥微小宝网络科技有限公司</view> <text class="iconfont ft14 cl-main icon-gengduo"></text>
						</view>
						<view class="flex alcenter mt10">
							<view class="tag-factory-type">生产加工</view>
							<view class="tag-factory-type">OEM</view>
							<view class="tag-factory-type">小程序订货</view>
						</view>
						<view class="flex alcenter space mt10">
							<view class="ft12 cl-notice text-over" style="width: calc(100% - 160rpx);">
								主营：童装|女装|男装
							</view>
							<view class="ft12 cl-notice">
								安徽 合肥
							</view>
						</view>
						
						<view class="flex mt12">
							<scroll-view :scroll-x="true" class="store-product-scroll">
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
								<view class="item">
									<image></image>
									<view class="mt5 ft12 cl-main text-over">
										武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源 
									</view>
									<view class="flex alcenter mt5">
										<text class="ft12 cl-price">面议</text>
										<text class="ft12 cl-notice">/件</text>
										<!--单位和分类对应好 一个分类对应多个单位，然后添加产品的时候只需要选择对应分类-->
									</view>
								</view>
							</scroll-view>
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
			},
			searchAct(){
				
			}
		}
	}
</script>

<style>
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
	.child-category{
		white-space: nowrap;
	}
	.child-category .item{
		height: 64rpx;
		display: inline-block;
		margin-right: 20rpx;
		border-radius: 32rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		line-height:64rpx;
		color: #656A75;
		background: #FFFFFF;
	}
	.store-product-scroll{
		white-space: nowrap;
	}
	.store-product-scroll .item{
		height: 246rpx;
		display: inline-block;
		width: 160rpx;
		margin-right: 20rpx;
	}
	.store-product-scroll .item image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	
	.search-box{
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		background: #FFFFFF;
		padding: 0 30rpx;
	}
	.search-input{
		width: calc(100% - 40rpx);
		padding-left: 20rpx;
	}
</style>