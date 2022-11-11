<template>
	<view class="flex-1" :style="modulMTop">
		<scroll-view scroll-x class="scroll-row" style="height: 365rpx;" v-if="list.length > 0">
			<view class="scroll-row-item goods-item" :style="itemBox" v-for="(item,index) in list"
				:key="index" @click="toProduct(item)">
				<view class="goods-img">
					<image :src="item.slide_list.img" :style="imgRadius" mode=""></image>
					<view class="goods-stock font-s-3 text-white text-center"
						v-if="productInfo.productList.soldcountType == 0">
						<text class="font-s-small">已售{{ item.sold_count }}件</text>
					</view>
				</view>
				<view class="flex-1 mt-1 mx-1">
					<view class="font-s-5 in1line" :style="fontSize">{{ item.title }}</view>
					<view class="row-ac" style="line-height: 1.2;">
						<view class="text-main-color font-s-5 font-w" :style="priceSizeModify"><text
								class="font-s-1">￥</text>{{ item.price | num1Filter }}</view>
						<view class="text-light-grey text-de ml-1 font-s-1"
							v-if="productInfo.productList.marketpriceType == 0">
							￥{{ item.market_price | num1Filter }}</view>
					</view>
					<view class="text-light-grey font-s-1 flex-1 row-ac-sb mt">
						<view v-if="productInfo.productList.reviewCountType == 0">评论{{ item.review_count }}</view>
						<view v-if="productInfo.productList.totalStockType == 0">库存{{ item.total_stock }}件</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		props: {
			productInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			}
		},
		computed: {
			itemBox() {
				this.itemBgColor = this.productInfo.productList.itemBgColor
				this.borderShadow = this.productInfo.productList.borderShadow
				this.pictureRadius = this.productInfo.productList.pictureRadius
				return `box-shadow: 0 0 8rpx ${this.borderShadow};border-radius:${this.pictureRadius}rpx;background:${this.itemBgColor}`
			},
			fontSize() {
				this.titleColor = this.productInfo.productList.titleColor
				this.titleSize = this.productInfo.productList.titleSize
				this.titleThickness = this.productInfo.productList.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			priceSizeModify() {
				this.priceColor = this.productInfo.productList.priceColor
				this.priceSize = this.productInfo.productList.priceSize
				this.priceThickness = this.productInfo.productList.priceThickness
				return `font-size: ${this.priceSize}rpx;font-weight:${this.priceThickness};color:${this.priceColor};`
			},
			modulMTop() {
				this.modulMT = this.productInfo.productList.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			imgRadius() {
				this.pictureRadius = this.productInfo.productList.pictureRadius
				return `border-top-left-radius:${this.pictureRadius}rpx;border-top-right-radius:${this.pictureRadius}rpx;`
			}
		},
		filters: {
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		created() {
			uni.$on('hotGoodsList', res => {
				this.list = res
			})
		},
		methods: {
			toProduct(item) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + item.id
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		width: 212rpx;
		height: 360rpx;
		margin-right: 27rpx;
		.goods-img {
			width: 212rpx;
			height: 212rpx;
			image {
				width: 212rpx;
				height: 212rpx;
			}
			.goods-stock {
				width: 212rpx;
				height: 40rpx;
				position: absolute;
				margin-top: -50rpx;
				background: linear-gradient(to bottom, rgba(0, 0, 0, .01), rgba(0, 0, 0, .8));
				z-index: 2;
			}
		}
	}
</style>
