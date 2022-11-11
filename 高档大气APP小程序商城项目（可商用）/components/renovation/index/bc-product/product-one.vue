<template>
	<view class="flex-1 row-ac-fw" :style="modulMTop">
		<view class="routine" :style="itemBox" v-for="(item,index) in list" :key="index"
			v-if="index < productInfo.productList.quantity" @click="toProduct(item)">
			<view class="product-img">
				<image :src="item.slide_list.img" :style="imgRadius" mode="aspectFill"></image>
			</view>
			<view class="flex-1 mx-2 mt-1">
				<view class="font-s-6 in1line" :style="fontSize">{{ item.title }}</view>
				<view class="flex-1 pb-2">
					<view class="text-main-color font-s-6" :style="priceSizeModify">￥{{ item.price | num1Filter }}</view>
					<view class="text-de text-light-grey font-s-2" v-if="productInfo.productList.marketpriceType == 0">￥{{ item.market_price | num1Filter }}</view>
				</view>
				<view class="flex-1 row-ac-sb pb-2">
					<view class="text-light-grey font-s-2" v-if="productInfo.productList.soldcountType == 0">已售{{ item.sold_count }}件</view>
					<view class="text-light-grey font-s-2" v-if="productInfo.productList.reviewCountType == 0">评论{{ item.review_count }}条</view>
				</view>
			</view>
		</view>
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
	.routine {
		width: 332rpx;
		margin-right: 26rpx;
		margin-bottom: 20rpx;
		.product-img {
			width: 100%;
			height: 332rpx;
			image {
				width: 100%;
				height: 332rpx;
			}
		}
	}
	.routine:nth-child(2n) {
		margin-right: 0;
	}
</style>
