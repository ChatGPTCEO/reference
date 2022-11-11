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
				<input class="search-input ft14 cl-main" type="text" confirm-type="search" @confirm="searchAct" :maxlength="32" placeholder-class="cl-info"  placeholder="请输入关键字搜索产品" />
			</view>
		</view>
		
		<view class="mt16 plr15 flex alcenter space">
			<view class="ft16 ftw500 cl-main">共为您找到<text class="ft16 ftw500  ml5 mr5" :style="{color:tempColor}">100</text>条供应商品</view>
			<view class="btn-small" :style="getBtnStyle">免费发布</view>
		</view>
		
		<view class="pd16_15">
			
			
			<view class="flex wrap space">
				<view class="product-list-item">
					<navigator url="/pages/product/detail">
					<image class="photo"></image>
					<view style="padding: 10rpx;">
						<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
						<view class="mt5 flex alcenter space">
							<view class="flex alcenter">
								<text class="ft14 cl-price">面议</text>
								<text class="ft12 ml5 cl-notice">/件</text>
							</view>
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
							<view class="flex alcenter">
								<text class="ft14 cl-price">面议</text>
								<text class="ft12 ml5 cl-notice">/件</text>
							</view>
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
							<view class="flex alcenter">
								<text class="ft14 cl-price">面议</text>
								<text class="ft12 ml5 cl-notice">/件</text>
							</view>
							<text class="ft12 cl-notice">安徽 合肥</text>
						</view>
					</view>
					</navigator>
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