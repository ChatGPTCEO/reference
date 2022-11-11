<template>
	<view>
		<view class="brand-header w-750">
			<image :src="brandInfo.cover" class="brand-cover w-750" mode=""></image>
			<view class="brand-store w-750">
				<view :style="{ paddingTop: statusBarheight + 'px' }"></view>
				<view class="row-ac mx-2">
					<!-- #ifdef MP-WEIXIN -->
					<view class="iconfont icon-back2-01 text-white" @click="toBack"></view>
					<!-- #endif -->
					<view class="search-box row-ac text-white" @click="toSearch">
						<view class="iconfont icon-sousuo ml-2" style="font-size: 30rpx;"></view>
						<view class="font-s-3 ml-1">搜索商品</view>
					</view>
				</view>
				<view class="row-ac-sb brand-info mx-3 flex-1 mt-5">
					<view class="row-ac text-white">
						<view class="brand-squareLog">
							<image :src="brandInfo.squareLog" class="brand-squareLog" mode=""></image>
						</view>			
						<view class="ml-2">
							<view class="row-ac">
								<view class="brand-name font-s-5">{{ brandInfo.brandName }}</view>
								<view class="iconfont icon-xiangxia ml-1 " style="font-size: 26rpx;"></view>
							</view>
							<view class="font-s-1 mt">{{ brandCollectInfo.count }}人关注</view>
						</view>
					</view>
					<view class="brand-follow row text-white" @click="handleCollectBrand">
						<view class="iconfont icon-guanzhu" v-if="brandCollectInfo.staue === 0"></view>
						<view class="iconfont icon-guanzhu1" v-else style="font-size: 26rpx;"></view>
						<view class="font-s-1 ml-1" v-if="brandCollectInfo.staue === 0">关注</view>
						<view class="font-s-1 ml" v-else>已关注</view>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-list"><index-product-list :list="brandGoodsList"></index-product-list></view>
	</view>
</template>

<script>
import { getBrandGoodsByBrandIdUrl, changeCollectBrandUrl, getCollectBrandInfoUrl,getBrandInfoByBrandUrl } from '@/api/index.js';
import indexProductList from '@/components/common/product-list/index-product-list';

export default {
	data() {
		return {
			brandInfo: {},
			brandGoodsQueryInfo: {
				brandId: '',
				pageSize: 10,
				page: 1
			},
			brandGoodsList: [],
			brandGoodsTotal: 0,
			statusBarheight: '80',
			brandCollectInfo: {}
		};
	},
	components: {
		indexProductList
	},
	onLoad(options) {
		this.getBrandInfo(options.brandId);
		this.getBrandGoodsList(options.brandId);
		this.getCollectBrandInfo(options.brandId);
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	//获取屏幕信息
	created() {
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif

		uni.getSystemInfo({
			success: res => {
				this.width = obj.left || res.windowWidth;
				this.statusBarheight = res.statusBarHeight + 5; //获取顶部状态栏高度+3个像素

				//微信右上角胶囊按纽占比
				// #ifdef MP-WEIXIN
				this.watchButtonWidth = ((obj.width + 10) / res.windowWidth) * 100;
				this.appPussWidth = 100 - this.watchButtonWidth;
				// #endif
			}
		});
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: this.brandInfo.brandName,
			path: '/pages/brand/brand-goods?brandId=' + this.brandGoodsQueryInfo.brandId
		};
	},
	methods: {
		// 获取上个页面传递过来的品牌信息
		getBrandInfo(brandId) {
          this.$R.get(getBrandInfoByBrandUrl + brandId).then(res => {
            console.log(res);
            this.brandInfo = res.data
          });
		},
		// 根据品牌id获取品牌对应的商品列表
		getBrandGoodsList(brandId) {
			if (brandId) {
				this.brandGoodsQueryInfo.brandId = brandId;
			}
			this.$R.get(getBrandGoodsByBrandIdUrl + brandId, this.brandGoodsQueryInfo).then(res => {
				this.brandGoodsList = [...this.brandGoodsList, ...res.data.list];
				this.brandGoodsTotal = res.data.total;
			});
		},

		// 查看品牌被关注信息
		getCollectBrandInfo(brandId) {
			this.$R.get(getCollectBrandInfoUrl, { brandid: brandId }).then(res => {
				this.brandCollectInfo = res.data;
			});
		},

		// 关注、取消品牌收藏
		handleCollectBrand() {
			console.log(this.brandCollectInfo);
			let httpObj = {
				brandid: this.brandInfo.id,
				state: 0
			};
			if (this.brandCollectInfo.staue === 0) {
				httpObj.state = 1;
			}
			this.$R.post(changeCollectBrandUrl, httpObj).then(res => {
				console.log(res);
				if (httpObj.state === 1) {
					uni.showToast({
						title: '关注品牌成功',
						icon: 'none'
					});
					this.brandCollectInfo.staue = 1;
					this.brandCollectInfo.count++;
				} else {
					uni.showToast({
						title: '已取消关注',
						icon: 'none'
					});
					this.brandCollectInfo.staue = 0;
					this.brandCollectInfo.count--;
				}
			});
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.brandGoodsTotal != this.brandGoodsList.length) {
				this.brandGoodsQueryInfo.page++;
				this.getBrandGoodsList();
			}
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/index/search/search'
			});
		},
		toBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}

.brand-header {
	height: 352rpx;

	.brand-cover {
		height: 352rpx;
		position: absolute;
	}

	.brand-store {
		height: 352rpx;
		position: relative;
		z-index: 1;
		background: linear-gradient(to right, rgba(9, 12, 28, 0.7), rgba(53, 19, 41, 0.7));

		.search-box {
			/* #ifdef MP-WEIXIN */
			width: 60%;
			margin-left: 20rpx;
			/* #endif */
			/* #ifndef MP-WEIXIN */
			width: 80%;
			margin-left: 80rpx;
			/* #endif */
			height: 60rpx;
			border-radius: 30rpx;
			background: #706974;
		}

		.brand-info {
			.brand-squareLog {
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
				background-color: #fff;
			}

			.brand-follow {
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
				background: linear-gradient(to right, #f20200, #fe4915);
			}
		}
	}
}

.goods-list {
	padding-top: 15rpx;
}
</style>
