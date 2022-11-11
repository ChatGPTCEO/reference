<template>
	<view class="flex-1 mx-2">
		<view class="product-tiem" v-for="(item, index) in list" :key="index" @click="toProduct(item.id)">
			<view class="product-img">
				<image :src="item.no_color_img || item.slide_list.img" mode="aspectFill"></image>
			</view>
			<view class="product-box">
				<view class="top-number">
					<view class="number-box font-w font-s-6">TOP{{ index + 1 }}</view>
				</view>
			</view>
			<view class="flex-1 mx-2 mt-3">
				<view class="flex-1 row-a-j-fc">
					<view class="font-w font-s-7 text-main-color">{{ item.promotion }}</view>
					<view class="font-s-5 mt">{{ item.title }}</view>
					<view class="row-ac mt">
						<view class="font-s-65 font-w">￥{{ item.price }}</view>
						<view class="ml-1 font-s-3 text-main-color">会员价</view>
					</view>
					<view class="font-s-4 font-w-200 text-de text-light-grey">市场价￥{{ item.market_price }}</view>
					<view class="buy-box row text-white bg-color mt-2">
						<view>立即购买</view>
						<view class="iconfont icon-next-01"></view>
					</view>
				</view>
				<!-- <view class="flex-1 row-ac-sb mt-1">
					<view class="text-main-color font-s-8 font-w"><text class="font-s-2">￥</text>{{ item.price }}
					</view>
					<view class="text-light-grey font-s-3">{{ item.sold_count }}人付款</view>
				</view>
				<view class="flex-1 mt-1">
					<view class="in1line font-s-65 flex-1 font-w">{{ item.title }}</view>
				</view>
				<view class="flex-1 row-ac-sb mt-3" style="z-index: 999;">
					<view class="row-ac text-light-grey">
						<view class="row-a-j-fc pinglun-box">
							<view class="iconfont icon-pinglun"></view>
							<view class="font-s-5">评价</view>
							<view class="unm-box bg-color row font-s-1">{{ item.review_count }}</view>
						</view>
						<view class="row-a-j-fc pinglun-box">
							<view class="iconfont icon-pinglun"></view>
							<view class="font-s-5">收藏</view>
							<view class="unm-box bg-color row font-s-1">{{ item.review_count }}</view>
						</view>
					</view>
					<view class="buy-box-item text-white row-ac">
						<view class="buy-box row font-s-3">加入购物车</view>
						<view class="buy-box row font-s-3">立即购买</view>
					</view>
				</view> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		methods: {
			toProduct(productId) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + productId
				});
			}
		}
	}
</script>

<style lang="scss">
	.product-tiem {
		width: 710rpx;
		height: 1080rpx;
		background-color: #fff;
		margin-bottom: 20rpx;

		.product-img {
			width: 710rpx;
			height: 710rpx;
			position: absolute;
		}

		.product-box {
			width: 710rpx;
			height: 710rpx;
			position: relative;
			top: 0;
			left: 0;
			overflow:hidden;

			.top-number {
				position: absolute;
				top: 10rpx;
				left: -90rpx;
				z-index: 9;
				transform:rotate(-45deg);
				.number-box{
					height: 88rpx;
					line-height: 88rpx;
					padding: 0 100rpx;
					background-color: #BA271B;
					color: #fff;
				}
			}
		}
		.buy-box{
			width: 560rpx;
			height: 66rpx;
			.iconfont{
				font-size: 26rpx;
			}
		}

	}
</style>
