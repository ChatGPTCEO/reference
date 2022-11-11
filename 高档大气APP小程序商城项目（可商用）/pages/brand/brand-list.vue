<template>
	<view>
		<view class="brand-list">
			<view class="brand-box" v-for="item in brandList" :key="item.id">
				<view class="brand-info clearfix">
					<image class="brand-img fl" :src="item.squareLog"></image>
					<view class="brand-title fl">{{ item.es || item.brandName }}</view>
					<view class="brand-option fr"><view class="more-option bg-color font-s-3" @click="toBrandGoods(item)">更多</view></view>
				</view>
				<view class="w-100 mt-2" style="height: 368rpx;">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<scroll-view scroll-x>
					<view class="brand-goods-list">
						<view class="goods-item" v-for="goodsItem in item.brandGoods" :key="goodsItem.id">
							<image class="goods-img" :src="goodsItem.slide_list.img"></image>
							<view class="flex-1 row-a-j-fc">
								<view class="goods-title font-s-2">{{ goodsItem.title }}</view>
								<view class="goods-price font-s-4 font-w mt-1"><text class="font-s-1">￥</text>{{ goodsItem.price }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { getBrandListUrl, getBrandGoodsByBrandIdUrl } from '@/api/index.js';

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
		};
	},
	onLoad() {
		this.initData();
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	methods: {
		initData() {
			this.getBrandList();
		},
		// 获取品牌列表
		async getBrandList() {
			await this.$R.get(getBrandListUrl, this.brandListQueryInfo).then(async res => {
				console.log(res);
				if (res.data.list.length > 0) {
					// 先根据品牌id获取对应的商品
					await res.data.list.forEach(item => {
						this.$R.get(getBrandGoodsByBrandIdUrl + item.id, this.brandGoodsListQueryInfo).then(brandGoodsRes => {
							console.log(brandGoodsRes);
							this.$set(item, 'brandGoods', brandGoodsRes.data.list);
						});
					});
				}
				this.brandList = [...this.brandList, ...res.data.list];
				this.brandListTotal = res.data.total;
			});
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.brandListTotal != this.brandList.length) {
				this.brandListQueryInfo.page++;
				this.getBrandList();
			}
		},
		// 跳转到品牌对应的商品页面
		toBrandGoods(brandInfo) {
			let newBrandInfo = JSON.parse(JSON.stringify(brandInfo));
			// 删除品牌对应的商品
			delete newBrandInfo.brandGoods;
			uni.navigateTo({
				url: `/pages/brand/brand-goods?brandId=${brandInfo.id}`
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}

.brand-list {
	margin: 10rpx 20rpx;

	.brand-box {
		border-radius: 10rpx;
		background-color: #ffffff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.brand-info {
			.brand-img {
				width: 40rpx;
				height: 40rpx;
				display: block;
				padding: 10rpx;
				border: 1rpx solid #dddddd;
				border-radius: 50%;
				background-color: #ffffff;
			}

			.brand-title {
				margin-left: 20rpx;
				height: 62rpx;
				line-height: 62rpx;
				font-size: 32rpx;
				color: #333333;
			}

			.brand-option {
				.more-option {
					height: 50rpx;
					line-height: 50rpx;
					width: 100rpx;
					text-align: center;
					border-radius: 25rpx;
				}
			}
		}

		.brand-goods-list {
			display: flex;
			justify-content: start;
			margin-top: 20rpx;
			height: 348rpx;
			.goods-item {
				margin-right: 24rpx;

				.goods-img {
					display: block;
					width: 198rpx;
					height: 198rpx;
					padding: 10rpx;
					border-radius: 10rpx;
					background-color: #ffffff;
				}
			}
		}
	}
}
</style>
