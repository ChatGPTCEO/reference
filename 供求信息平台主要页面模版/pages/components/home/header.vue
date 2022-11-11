<template>
	<view>
		<view class="home-header-bg" :style="{background:tempColor}"></view>
		<view class="home-header-main pd16_15">
			<view class="search-box flex alcenter">
				<text class="iconfont icon-search_gray cl-info"></text>
				<input class="search-input ft14 cl-main" v-model="keyword" type="text" confirm-type="search" @confirm="searchAct" :maxlength="32" placeholder-class="cl-info"  placeholder="请输入关键字搜索产品或商家" />
			</view>
			<view class="mt12 over-hide" style="height: 30rpx;">
				<text class="ft12 cl-w">推荐：</text>
				<text class="ml10 ft12 cl-w">女装新品</text>
				<text class="ml10 ft12 cl-w">男装新品</text>
				<text class="ml10 ft12 cl-w">母婴奶粉</text>
				<text class="ml10 ft12 cl-w">绘画童书</text>
				<text class="ml10 ft12 cl-w">儿童座椅</text>
			</view>
			<view class="mt16">
				<swiper class="swiper-banner" :interval="3000" :duration="500" :autoplay="true">
					<swiper-item v-for="(item,index) in banners" :key="index">
						<view class="swiper-item-box">
							<image :src="item.photo"></image>
							<view v-if="item.isAd" class="ad-tag">广告</view>
						</view>
					</swiper-item>
					
					
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				banners:[
					{photo:this.$config.staticUrl + 'banner.jpg',link:'',isAd:0},
					{photo:this.$config.staticUrl + 'banner.jpg',link:'',isAd:0}
				],
				keyword:'',
			}
		},
		created(){
			
		},
		methods:{
			searchAct(){
				if(this.keyword == ''){
					uni.showToast({
						icon:'none',
						title:'请输入要搜索的关键字'
					});
				}else{
					uni.navigateTo({
						url:'/pages/search/index?keyword='+encodeURI(this.keyword)
					});
				}
			}
		}
	}
</script>

<style>
	.home-header-bg{
		height: 280rpx;
		width: 100%;
		position: relative;
		border-radius: 0rpx 0rpx 32rpx 32rpx;
	}
	.home-header-main{
		width: 100%;
		position: relative;
		margin-top: -280rpx;
		overflow: hidden;
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
	.swiper-banner{
		height: 280rpx;
	}
	.swiper-item-box{
		width: 100%;
		height: 280rpx;
		border-radius: 24rpx;
		overflow: hidden;
		position: relative;
	}
	.swiper-item-box image{
		width: 100%;
		height: 280rpx;
	}
	.swiper-item-box .ad-tag{
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		border:1px solid #FFFFFF;
		color:#FFFFFF;
		font-size: 24rpx;
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
	}
</style>