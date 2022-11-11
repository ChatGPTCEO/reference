<template>
	<view class="goods-container padding-sm">
		<view class="goods-box" v-for="(item, index) in goodsList" :key="index">
			<navigator hover-class="none" :url="'/pages/goods/goods-detail/index?id=' + item.id">
				<view class="img-box">
					<image :src="item.spuUrls[0] ? item.spuUrls[0] : '/static/public/img/no_pic.png'"></image>
				</view>
				<view class="name">
					<view class="text-cut">{{item.name}}</view>
				</view>
				<view class="goods-bottom">
					<text class="text-price text-red">{{item.highPrice != item.lowPrice ? item.lowPrice+"起": item.highPrice}}</text>
					<view class="text-sale">已售{{getSalesVolume(item.salesVolume)}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/index'
	export default {
		data() {
			return {};
		},

		components: {},
		props: {
			goodsList: {
				type: Array,
				default: () => []
			}
		},
		computed: {

		},
		methods: {
			getSalesVolume(value) {
				return utils.numberToWan(value);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.goods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: content-box;
	}

	.goods-box {
		width: 349rpx;
		height: 500rpx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0px 10px 10px #e5e5e5;

		.name {
			margin-top: 10rpx;
			padding: 0rpx 10rpx;
		}

		.goods-bottom {
			display: flex;
			justify-content: space-between;
			padding: 0rpx 10rpx;
			margin-top: 20rpx;
			bottom: 0rpx;

			.text-sale {
				font-size: 24rpx;

			}
		}

		.shop {
			padding: 10rpx;
			font-size: 26rpx;
		}
	}

	.goods-box .img-box {
		width: 100%;
		height: 349rpx;
		overflow: hidden;
	}

	.goods-box .img-box image {
		width: 100%;
		height: 349rpx;
	}
</style>
