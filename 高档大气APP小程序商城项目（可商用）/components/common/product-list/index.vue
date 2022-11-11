<template>
	<view class="flex-1 bg-white">
		<view class="flex-1 mx-3 mt-2 row-ac-fw">
			<view class="product-item mr-1 mb-1" v-for="(item,index) in list" :key="index" @click="toProduct(item)">
				<view class="product-img">
					<image :src="item.slide_list.img" mode="aspectFill"></image>
				</view>
				<view class="product-info flex-1">
					<view class="product-title font-s-2 in2line flex-1 mx-2 pt-1">
						{{ item.title }}
					</view>
					<view class="flex-1 ml-2 font-s-1 font-w mt-1">会员价:<text class="font-s-6">￥{{ item.price }}</text>
					</view>
					<view class="flex-1 ml-2 font-s-1 text-de text-light-grey" style="line-height: 1;">
						市场价:￥{{ item.marketPrice }}</view>
					<view class="to-buy bg-color row mx-4 flex-1 mt-2 font-s-2">
						立即购买
						<text class="iconfont icon-next-01 ml-1"></text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'productList',
		data() {
			return {
				isSelectProd: ''
			}
		},
		props: {
			list: {
				item: Object,
				type: Array,
				default () {
					return []
				}
			},
			pageType: {
				type: String,
				default () {
					return ''
				}
			}
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
	.product-item {
		width: 340rpx;
		height: 588rpx;
		background-color: #F6F6F6;

		.product-img {
			width: 340rpx;
			height: 340rpx;
		}

		.product-info {
			height: 249rpx;
			background-color: #fff;

			.product-title {
				height: 70rpx;
			}

			.to-buy {
				height: 56rpx;

				.iconfont {
					font-size: 22rpx;
				}
			}
		}
	}

	.product-item:nth-child(2n) {
		margin-right: 0;
	}
</style>
