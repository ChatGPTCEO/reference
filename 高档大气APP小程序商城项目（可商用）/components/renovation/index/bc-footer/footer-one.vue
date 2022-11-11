<template>
	<view class="flex-1"  :style="modulMTop">
		<view class="flex-1 suck-top py-1" :style="suckTop">
			<view class="flex-1 row-ac" id="hhhheight">
				<view class="flex-1 row-a-j-fc" v-for="(item,index) in navList" :key="index"
					:class="{ active: navIndex == index }" @click="clickNav(item, index)" v-if="index < 4">
					<view class="font-s-5 nav-title">{{ item.titie }}</view>
					<view class="font-s-1 text-light-grey nav-promotion">{{ item.promotion }}</view>
					<view class="under-line mt-1"></view>
				</view>
			</view>
		</view>
		<view class="flex-1 mx-3 mt-2 row-ac-fw ">
			<view class="goods-item" :style="itemBox" v-for="(item,index) in goodsList" :key="index"
				@click="toProduct(item)">
				<view class="goods-img">
					<image :src="item.slide_list.img" :style="imgRadius" mode=""></image>
				</view>
				<view class="flex-1 mx-2 mt-1 pb-1">
					<view class="in2line flex-1" style="height: 90rpx;">
						<view class="font-s-5" :style="fontSize">{{ item.title }}</view>
						<view class="font-s-1 promotion-tetx mt-1">
							<text class="mr-2" v-if="footerInfo.footerInfo.mailType == 0">包邮</text>
							<text
								v-if="item.promotion !== '' && footerInfo.footerInfo.promotionType == 0">{{ item.promotion }}</text>
						</view>
					</view>
					<view class="row-ac pb-2 mt-1">
						<view class="font-s-6 font-w text-main-color" :style="priceSizeModify"><text
								class="font-s-2">￥</text>{{ item.price | num1Filter }}</view>
						<view class="text-light-grey font-s-2 text-de ml-2"
							v-if="footerInfo.footerInfo.marketpriceType == 0">￥{{ item.market_price | num1Filter }}
						</view>
					</view>
					<view class="row-ac-sb mt-2 pb-2"
						v-if="footerInfo.footerInfo.soldcountType == 0 || footerInfo.footerInfo.totalStockType == 0">
						<view class="text-light-grey font-s-2" v-if="footerInfo.footerInfo.soldcountType == 0">
							已售{{ item.sold_count }}件</view>
						<view class="text-light-grey font-s-2" v-if="footerInfo.footerInfo.totalStockType == 0">
							剩{{ item.total_stock }}件</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				navList: [],
				goodsList: [],
				newGoodslist: [],
				hotList: [],
				recommendGoodslist: [],
				yourLikelist: [],
				headerHeight:''
			}
		},
		props: {
			footerInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
		computed: {
			itemBox() {
				this.itemBgColor = this.footerInfo.footerInfo.itemBgColor
				this.borderShadow = this.footerInfo.footerInfo.borderShadow
				this.pictureRadius = this.footerInfo.footerInfo.pictureRadius
				return `box-shadow: 0 0 8rpx ${this.borderShadow};border-radius:${this.pictureRadius}rpx;background:${this.itemBgColor}`
			},
			fontSize() {
				this.titleColor = this.footerInfo.footerInfo.titleColor
				this.titleSize = this.footerInfo.footerInfo.titleSize
				this.titleThickness = this.footerInfo.footerInfo.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			priceSizeModify() {
				this.priceColor = this.footerInfo.footerInfo.priceColor
				this.priceSize = this.footerInfo.footerInfo.priceSize
				this.priceThickness = this.footerInfo.footerInfo.priceThickness
				return `font-size: ${this.priceSize}rpx;font-weight:${this.priceThickness};color:${this.priceColor};`
			},
			modulMTop() {
				this.modulMT = this.footerInfo.footerInfo.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			imgRadius() {
				this.pictureRadius = this.footerInfo.footerInfo.pictureRadius
				return `border-top-left-radius:${this.pictureRadius}rpx;border-top-right-radius:${this.pictureRadius}rpx;`
			},
			suckTop(){
				return `top: ${this.headerHeight}px;`
			}
		},
		filters: {
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		created() {
			this.navList = this.footerInfo.footerInfo.list
			uni.$on('yourLikelistEmit', res => {
				this.yourLikelist = res
				this.goodsList = res
			});
			uni.$on('recommendGoodslistEmit', res => {
				this.recommendGoodslist = res
				this.goodsList = res
			});
			uni.$on('hotGoodsList', res => {
				this.hotList = res
				this.goodsList = res
			});
			uni.$on('newGoodslistEmit', res => {
				this.newGoodslist = res
				this.goodsList = res
			});
			uni.$on('bcHeaderEmit', res => {
				this.headerHeight = res
			});
		},
		methods: {
			clickNav(item, index) {
				if (this.navIndex === index) {
					return
				}
				this.navIndex = index

				this.navIndex = item.id

				if (item.output == 'likeGoods') {
					this.goodsList = this.yourLikelist
				}
				if (item.output == 'hotGoods') {
					this.goodsList = this.hotList
				}
				if (item.output == 'newGoods') {
					this.goodsList = this.newGoodslist
				}
				if (item.output == 'recommendGoods') {
					this.goodsList = this.recommendGoodslist
				}
			},
			toProduct(item) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + item.id
				});
			}
		}
	}
</script>

<style lang="scss">
	.under-line {
		width: 88rpx;
		height: 9rpx;
		border-radius: 3rpx;

	}

	.active .nav-promotion,
	.active .nav-title {
		color: $main-color;
	}

	.active .under-line {
		background-color: $main-color;
	}

	.goods-item {
		width: 335rpx;
		margin-right: 20rpx;
		margin-bottom: 25rpx;

		.goods-img {
			width: 335rpx;
			height: 330rpx;

			image {
				width: 335rpx;
				height: 335rpx;
			}
		}

		.promotion-tetx {
			text {
				height: 22rpx;
				line-height: 22rpx;
				padding: 0 10rpx;
				border-radius: 4rpx;
				background-color: #FFE9EA;
				color: #D0594A;
			}
		}
	}

	.goods-item:nth-child(2n) {
		margin-right: 0;
	}

	/* .addLog {
		position: fixed;
		right: 0;
		bottom: calc(var(--window-bottom) + 100px);
		z-index: 1030;
		margin-bottom: 6;
	} */

	.suck-top {
		background-color: #fff;
		position: -webkit-sticky;
		position: sticky;
		z-index: 99;
		top: 0;
		// // 设置定位效果为“吸顶”
		//   position: sticky;
		//   // 吸顶的“位置”
		//   
		//   // 提高层级，防止被轮播图覆盖
		//   z-index: 999;
	}
</style>
