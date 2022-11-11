<template>
	<view class="flex-1" :style="modulMTop">
		<view class="brand-box mb-2" v-for="(item,index) in brandList" :key="item.id">
			<view class="brand-info">
				<view class="brand-cover">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="brand-content">
					<view class="flex-1 mx-3">
						<view class="flex-1 font-s-6 font-w mt-3">{{ item.brandName }}</view>
						<view class="flex-1 row-ac-sb mt-2">
							<view class="flex-1">
								<view class="brand-logo">
									<image :src="item.longLog" mode="aspectFill"></image>
								</view>
								<view class="font-s-2 text-light-grey">{{ item.introduce }}</view>
							</view>
							<view class="font-s-2 to-brand row" @click="toBrandGoods(item)">进入品牌<text class="iconfont icon-next-01 ml"></text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex-1 mt-2" v-if="brandInfo.brandInfo.brandGoodsType == 0 && item.productCount > 0">
				<scroll-view scroll-x class="scroll-row flex-1 brand-goods">
					<view class="scroll-row-item goods-item mr-2" :style="itemBox" v-for="(items, index1) in item.brandGoods" :key="index1" @click="toProduct(items)">
						<view class="goods-img-box">
							<image :src="items.slide_list.img" mode="aspectFill" :style="imgRadius"></image>
						</view>
						<view class="flex-1 goods-info mx-2 row-a-j-fc">
							<view class="goods-promotion font-s-1" v-if="items.promotion !== ''">{{ items.promotion }}</view>
							<view class="goods-postage font-s-1" v-else>包邮</view>
							<view class="font-s-6 mt-1" :style="fontSize">{{ items.title  }}</view>
							<view class="row-ac">
								<view class="font-s-6 font-w" :style="priceSizeModify"><text class="font-s-2" >￥</text>{{ items.price }}</view>
								<view class="font-s-2 text-light-grey text-de ml-2">￥{{ items.marketPrice }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBrandListUrl,
		getBrandGoodsByBrandIdUrl
	} from '@/api/index.js';
	export default {
		data() {
			return {
				brandListQueryInfo: {
					pageSize: 6,
					page: 1
				},
				brandList: [],
				brandListTotal: 0,
				brandGoodsListQueryInfo: {
					pageSize: 5,
					page: 1
				}
			}
		},
		props: {
			brandInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
		computed: {
			itemBox() {
				this.itemBgColor = this.brandInfo.brandInfo.itemBgColor
				this.borderShadow = this.brandInfo.brandInfo.borderShadow
				this.pictureRadius = this.brandInfo.brandInfo.pictureRadius
				return `box-shadow: 0 0 5rpx ${this.borderShadow};border-radius:${this.pictureRadius}rpx;background:${this.itemBgColor}`
			},
			fontSize() {
				this.titleColor = this.brandInfo.brandInfo.titleColor
				this.titleSize = this.brandInfo.brandInfo.titleSize
				this.titleThickness = this.brandInfo.brandInfo.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			priceSizeModify() {
				this.priceColor = this.brandInfo.brandInfo.priceColor
				this.priceSize = this.brandInfo.brandInfo.priceSize
				this.priceThickness = this.brandInfo.brandInfo.priceThickness
				return `font-size: ${this.priceSize}rpx;font-weight:${this.priceThickness};color:${this.priceColor};`
			},
			modulMTop() {
				this.modulMT = this.brandInfo.brandInfo.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			imgRadius() {
				this.pictureRadius = this.brandInfo.brandInfo.pictureRadius
				return `border-top-left-radius:${this.pictureRadius}rpx;border-top-right-radius:${this.pictureRadius}rpx;`
			}
		},
		filters: {
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				this.getBrandList()
			},
			// 获取品牌列表
			async getBrandList() {
				await this.$R.get(getBrandListUrl, this.brandListQueryInfo).then(async res => {
					if (res.data.list.length > 0) {
						// 先根据品牌id获取对应的商品
						await res.data.list.forEach(item => {
							this.$R.get(getBrandGoodsByBrandIdUrl + item.id, this
								.brandGoodsListQueryInfo).then(brandGoodsRes => {
								this.$set(item, 'brandGoods', brandGoodsRes.data.list);
							});
						});
					}
					this.brandList = [...this.brandList, ...res.data.list];
					this.brandListTotal = res.data.total;
				});
			},
			// 跳转到品牌对应的商品页面
			toBrandGoods(brandInfo) {
				let newBrandInfo = JSON.parse(JSON.stringify(brandInfo));
				// 删除品牌对应的商品
				delete newBrandInfo.brandGoods;
				uni.navigateTo({
					url: `/pages/brand/brand-goods?brandId=${brandInfo.id}`
				});
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
	.brand-box {
		width: 690rpx;

		.brand-info {
			width: 690rpx;
			height: 690rpx;

			.brand-cover {
				width: 690rpx;
				height: 690rpx;
			}

			.brand-content {
				width: 690rpx;
				height: 248rpx;
				position: absolute;
				margin-top: -248rpx;
				background-color: rgba(255, 255, 255, .95);
				.brand-logo{
					width: 200rpx;
					height: 75rpx;
				}
				.to-brand{
					width: 130rpx;
					height: 46rpx;
					padding: 0 20rpx;
					border: 1rpx solid #333;
					.iconfont{
						font-size: 18rpx;
					}
				}
			}
		}
		.brand-goods{
			height: 458rpx;
			.goods-item{
				width: 268rpx;
				height: 445rpx;
				box-shadow: 0 0 5px red;
				.goods-img-box{
					width: 268rpx;
					height: 268rpx;
				}
				.goods-info{
					height: 159rpx;
					.goods-promotion{
						height: 35rpx;
						line-height: 35rpx;
						padding: 0 12rpx;
						background-color: #BA271B;
						color: #fff;
					}
					.goods-postage{
						height: 35rpx;
						line-height: 35rpx;
						padding: 0 12rpx;
						border: 1rpx solid #BA271B;
						color: #BA271B;
					}
				}
				
			}
		}
	}
</style>
