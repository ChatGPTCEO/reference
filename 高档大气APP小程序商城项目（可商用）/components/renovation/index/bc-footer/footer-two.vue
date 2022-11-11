<template>
	<view class="flex-1"  :style="modulMTop">
		<view class="flex-1 mx-3 mt-2 row-ac-fw ">
			<view class="goods-item" :style="itemBox" v-for="(item,index) in recommendGoodslist" :key="index"
				@click="toProduct(item)">
				<view class="goods-img">
					<image :src="item.slide_list.img" :style="imgRadius" mode=""></image>
				</view>
				<view class="flex-1 mx-2 mt-1 pb-1">
					<view class="flex-1 row-a-j-fc">
						<view class="row-ac font-s-1 promotion-text pb-1">
							<text class="mr-2" v-if="item.promotion == ''">包邮</text>
							<text v-if="item.promotion !== '' && footerInfo.footerInfo.promotionType == 0">{{ item.promotion }}</text>
						</view>
						<view class="font-s-5 pb-1" :style="fontSize">{{ item.title }}</view>
						<view class="row-ac pb-1">
							<view class="font-s-6 font-w text-main-color" :style="priceSizeModify"><text
									class="font-s-2">￥</text>{{ item.price | num1Filter }}</view>
							<view class="text-light-grey font-s-2 text-de ml-2"
								v-if="footerInfo.footerInfo.marketpriceType == 0">￥{{ item.market_price | num1Filter }}
							</view>
						</view>
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
				recommendGoodslist: [],
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
			uni.$on('recommendGoodslistEmit', res => {
				this.recommendGoodslist = res
			});
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

		.promotion-text {
			text {
				height: 35rpx;
				line-height: 35rpx;
				padding: 0 10rpx;
				border-radius: 4rpx;
				background-color: #BA271B;
				color: #fff;
			}
		}
	}

	.goods-item:nth-child(2n) {
		margin-right: 0;
	}
</style>
