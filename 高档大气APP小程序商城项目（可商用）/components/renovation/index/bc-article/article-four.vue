<template>
	<view class="flex-1" :style="modulMTop">
		<swiper autoplay :interval="3000" class="swiper-box flex-1" @change="changeSwiper" :current="swiperCurrent">
			<swiper-item class="swiper-box flex-1" v-for="(item,index) in articleList" :key="index">
				<view class="flex-1 swiper-box">
					<image :src="item.image[0] || item.videoCover" mode="aspectFill"></image>
				</view>
				<view class="info-box w-100">
					<view class="w-100" style="height: 268rpx;">
						<view class="flex-1 mx-2">
							<view class="row-ac py-2">
								<view class="iconfont icon-fuhao- mr-1"></view>
								<view class="font-s-65 in1line">{{ item.title }}</view>
							</view>
							<view class="in2line font-s-3 flex-1 subtitle-box mx-1">{{ item.subtitle }}</view>
							<view class="row-ac count-box font-s-1 mt-2 ml-1">
								<view class="read-count">{{ item.readCount }}</view>
								<view class="ml-1">次浏览</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="flex-1 row" style="height: 60rpx;">
			<view class="dicator-item " v-for="(item,index) in articleList.length" :key="item" :class="index == swiperCurrent ? ' active' : ''">
				<view class="dicator-box"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArticleListUrl
	} from '@/api/index.js';
	export default {
		data(){
			return{
				swiperCurrent: 0,
				articleList:[]
			}
		},
		props: {
			articleInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			}
		},
		computed: {
			itemBox() {
				this.itemBgColor = this.articleInfo.articleList.itemBgColor
				this.borderShadow = this.articleInfo.articleList.borderShadow
				this.pictureRadius = this.articleInfo.articleList.pictureRadius
				return `box-shadow: 0 0 8rpx ${this.borderShadow};border-radius:${this.pictureRadius}rpx;background:${this.itemBgColor}`
			},
			fontSize() {
				this.titleColor = this.articleInfo.articleList.titleColor
				this.titleSize = this.articleInfo.articleList.titleSize
				this.titleThickness = this.articleInfo.articleList.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			priceSizeModify() {
				this.priceColor = this.articleInfo.articleList.priceColor
				this.priceSize = this.articleInfo.articleList.priceSize
				this.priceThickness = this.articleInfo.articleList.priceThickness
				return `font-size: ${this.priceSize}rpx;font-weight:${this.priceThickness};color:${this.priceColor};`
			},
			modulMTop() {
				this.modulMT = this.articleInfo.articleList.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			imgRadius() {
				this.pictureRadius = this.articleInfo.articleList.pictureRadius
				return `border-top-left-radius:${this.pictureRadius}rpx;border-top-right-radius:${this.pictureRadius}rpx;`
			},
		},
		created() {
			this.articleTypeId = this.articleInfo.articleTypeId
			this.articleQueryInfo = {
				articleTypeId: this.articleTypeId
			}
			this.quantityUum = this.articleInfo.articleList.quantity
		},
		mounted() {
			this.initData()
		},
		methods:{
			initData(){
				this.getArticleList()
			},
			getArticleList(){
				this.$R.get(getArticleListUrl, this.articleQueryInfo).then(res=>{
					this.articleList = res.data.list
				})
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			toArticleDetails(item) {
				if (item.videoCover === '' && item.videoCover != 'null') {
					uni.navigateTo({
						url: '/pages/article/article-details?id=' + item.id
					});
				} else {
					uni.navigateTo({
						url: '/pages/article/article-video?id=' + item.id
					});
				}
			},
			//计算属性
			containProduct(item){
				if(this.articleInfo.showProduct == 0){
					return item.productData.length > 0
				}else{
					return true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-box{
		height: 690rpx;
	}
	.info-box{
		background-color: rgba(245,245,245,.98);
		position: absolute;
		bottom: 0;
		left: 0;
		.iconfont{
			font-size: 38rpx;
			color: #000;
		}
		.subtitle-box{
			height: 80rpx;
			font-weight: 300;
		}
		.count-box{
			font-weight: 300;
			.read-count{
				color: #C4997A;
			}
		}
		
	}
	.dicator-item{
		width: 36rpx;
		height: 5rpx;
		transition: all .6s;
		background: #DBDBDB;
		margin-right: 8rpx;
	}
	.active .dicator-box{
		width: 36rpx;
		height: 5rpx;
		background: red;
	}
</style>