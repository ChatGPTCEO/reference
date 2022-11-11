<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus"></orange-fullloading>
		<view class="stores-header">
			<!-- #ifdef MP-WEIXIN -->
			<view class="to-back pt-2 pb-4 row-ac text-white" @click="toBack">
				<view class="iconfont icon-xiangqian"></view>
				<view class="ml-1">返回</view>
			</view>
			<!-- #endif -->
			<view class="header-info d-f justify-start">
				<image :src="myStoresInfo.image" class="header border rounded-50"></image>
				<view class="info-box">
					<view class="name">{{ myStoresInfo.store_name }}</view>
					<view class="level">{{ myStoresInfo.levelName }}</view>
				</view>
			</view>
			<view class="start-box clearfix">
				<view class="start-item fl">
					<view>1</view>
					<view>收藏</view>
				</view>
				<view class="start-item fl">
					<view>1</view>
					<view>点赞</view>
				</view>
				<view class="to-distribution fr" v-if="!distributionUserCenterInfo.isDistribute" @click="toApplyDistribution">成为推广员</view>
			</view>
		</view>
		<view v-show="topInfoStatus" class="category-box fix-menu w-100 mt-9">
			<view class="w-710 py-2">
				<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
					<view
						class="scroll-row-item category-item"
						v-for="(item, index) in categoryList"
						:key="index"
						@click="clickCategory(item, index)"
						:class="{ active: categoryIndex == index }"
						:id="'tab' + index"
					>
						<view class="mx-1 category-text mb-1">{{ item.cname }}</view>
						<view class="mx-1 category-bottom mt-1"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="category-box w-100 mt-9">
			<view class="w-710 py-2">
				<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
					<view
						class="scroll-row-item category-item"
						v-for="(item, index) in categoryList"
						:key="index"
						@click="clickCategory(item, index)"
						:class="{ active: categoryIndex == index }"
						:id="'tab' + index"
					>
						<view class="mx-1 category-text mb-1">{{ item.cname }}</view>
						<view class="mx-1 category-bottom mt-1"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="goods-list"><product-list :list="myShopGoodsList"></product-list></view>
	</view>
</template>

<script>
import productList from '@/components/common/product-list';
import { getCategory, myShopGoodsListUrl } from '@/api/index';

export default {
	components: {
		productList
	},
	data() {
		return {
			myShopGoodsList: [],
			myShopGoodsTotal: '',
			loadingStatus: true,
			categoryList: [],
			scrollInto: '',
			categoryIndex: 0,
			queryInfo: {
				categoryId: 0,
				pageSize: 10,
				page: 1,
				field: '',
				desc: ''
			},
			topInfoStatus: false,
			myStoresInfo: {},
			distributionUserCenterInfo: {},
			userInfo: {}
		};
	},
	onLoad() {
		this.initData();
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	// 页面往下滚动事件
	onPageScroll(res) {
		const scrollTop = res.scrollTop;
		if (scrollTop >= 152) {
			this.topInfoStatus = true;
		} else {
			this.topInfoStatus = false;
		}
	},
	methods: {
		initData() {
			this.getCategoryList();
			this.getMyShopGoodsList();
			this.getMyStoresInfo();
			// 异步延迟加载
			setTimeout(() => {
				this.loadingStatus = false;
			}, 100);
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.myShopGoodsTotal != this.myShopGoodsList.length) {
				this.queryInfo.page++;
				this.getMyShopGoodsList();
			}
		},
		// 获取我的小店信息
		getMyStoresInfo() {
			this.myStoresInfo = uni.getStorageSync('distributionUserInfo');
			this.distributionUserCenterInfo = uni.getStorageSync('distributionUserCenterInfo');
			this.userInfo = uni.getStorageSync('userInfo');
			console.log(this.userInfo);
		},
		// 获取我的分销商品列表
		getMyShopGoodsList() {
			this.$R.get(myShopGoodsListUrl, this.queryInfo).then(res => {
				this.myShopGoodsList = [...this.myShopGoodsList, ...res.data.list];
				this.myShopGoodsTotal = res.data.total;
			});
		},
		// 获取分类列表
		getCategoryList() {
			this.$R.get(getCategory).then(res => {
				this.categoryList = [{ id: 0, cname: '首页' }, ...res.data];
			});
		},
		// 分类点击事件
		clickCategory(item, index) {
			if (this.categoryIndex === index) {
				return;
			}
			this.myShopGoodsList = [];
			this.queryInfo.page = 1;
			this.categoryIndex = index;
			this.scrollInto = 'tab' + index;
			if (index == 0) {
				this.queryInfo.categoryId = 0;
				this.getMyShopGoodsList();
			} else {
				this.queryInfo.categoryId = item.id;
				this.getMyShopGoodsList();
			}
		},
		// 跳转到申请成为推广员页面
		toApplyDistribution() {
			uni.navigateTo({
				url: '/pages/distribution/apply-distribution/apply-distribution'
			});
		},
		toBack(){
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f2f2f2;
}
.stores-header {
	background: linear-gradient(#182432, #6b5b44);
	padding: 80rpx 20rpx 50rpx;
	.header-info {
		.header {
			width: 130rpx;
			height: 130rpx;
			margin-right: 30rpx;
		}
		.info-box {
			color: #ffffff;
			margin-top: 20rpx;
			.name {
				font-size: 36rpx;
				height: 50rpx;
				font-weight: bold;
				line-height: 50rpx;
				margin-bottom: 10rpx;
			}
			.level {
				font-size: 20rpx;
			}
		}
	}
	.start-box {
		margin: 30rpx 0 10rpx;
		.start-item {
			margin-right: 60rpx;
			margin-left: 20rpx;
			font-size: 24rpx;
			color: #ffffff;
			text-align: center;
		}
		.to-distribution {
			font-size: 24rpx;
			height: 60rpx;
			padding: 0 20rpx;
			line-height: 60rpx;
			background-color: rgba(255, 255, 255, 0.6);
			color: #333333;
			border-radius: 10rpx;
		}
	}
}
.category-box {
	height: 90rpx;
	margin-top: -20rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	background-color: #ffffff;
	&.fix-menu {
		top: 0;
		position: fixed;
		z-index: 9;
	}
	/* #ifdef H5 */
	&.fix-menu {
		top: 100rpx;
	}
	/* #endif */
	.category-bottom {
		width: 80rpx;
		height: 5rpx;
		border-radius: 3rpx;
		margin: auto;
	}

	.active .category-bottom {
		background: #ea4149;
	}
}
.goods-list {
	padding-top: 20rpx;
}
</style>
