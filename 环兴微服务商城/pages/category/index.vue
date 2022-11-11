<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="false">
			<block slot="content">商品分类</block>
		</cu-custom>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:100vh">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list"
					:key="index" @tap="TabSelect" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:100vh"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top-xs padding-lr-xs" v-for="(item,index) in list" :key="index"
					:id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{item.name}}
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="flex flex-wrap">
							<view v-for="(childrenItem,childrenIndex)  in item.children" :key="childrenIndex"
								@tap="doGoods(childrenItem.id)" class="text-xs text-center padding-xs">
								<image style="width: 140rpx;height: 140rpx;"
									:src="childrenItem.categoryPic ? childrenItem.categoryPic : ''">
								</image>
								<view class="text-sm">{{childrenItem.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			this.getGoodsCategory();
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			/**
			 * 获取商品分类
			 * @param {Object} 
			 */
			getGoodsCategory() {
				uni.$myRequest.goodsCategoryList().then(res => {
					this.list = res.data
				});
			},
			/**
			 * 跳转商品列表
			 */
			doGoods(id) {
				uni.navigateTo({
					url: '/pages/goods/goods-list/index?categorySecondId=' + id
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (i - 1) * 50
						this.tabCur = i
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>

// <style lang="scss" scoped>
	// 	.u-wrap {
	// 		height: calc(100vh);
	// 		/* #ifdef H5 */
	// 		height: calc(100vh - var(--window-top));
	// 		/* #endif */
	// 		display: flex;
	// 		flex-direction: column;
	// 	}

	// 	.u-search-box {
	// 		padding: 18rpx 30rpx;
	// 	}

	// 	.u-menu-wrap {
	// 		flex: 1;
	// 		display: flex;
	// 		overflow: hidden;
	// 	}

	// 	.u-search-inner {
	// 		background-color: rgb(234, 234, 234);
	// 		border-radius: 100rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		padding: 10rpx 16rpx;
	// 	}

	// 	.u-search-text {
	// 		font-size: 26rpx;
	// 		color: $uni-color-primary;
	// 		margin-left: 10rpx;
	// 	}

	// 	.u-tab-view {
	// 		width: 200rpx;
	// 		height: 100%;
	// 	}

	// 	.u-tab-item {
	// 		height: 110rpx;
	// 		background: #f6f6f6;
	// 		box-sizing: border-box;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		font-size: 26rpx;
	// 		color: #444;
	// 		font-weight: 400;
	// 		line-height: 1;
	// 	}

	// 	.u-tab-item-active {
	// 		position: relative;
	// 		color: #000;
	// 		font-size: 30rpx;
	// 		font-weight: 600;
	// 		background: #fff;
	// 	}

	// 	.u-tab-item-active::before {
	// 		content: "";
	// 		position: absolute;
	// 		border-left: 4px solid $uni-color-primary;
	// 		height: 32rpx;
	// 		left: 0;
	// 		top: 39rpx;
	// 	}

	// 	.u-tab-view {
	// 		// height: 100vh;
	// 	}

	// 	.right-box {
	// 		background-color: rgb(250, 250, 250);
	// 	}

	// 	.page-view {
	// 		padding: 16rpx;
	// 	}

	// 	.class-item {
	// 		margin-bottom: 30rpx;
	// 		background-color: #fff;
	// 		padding: 16rpx;
	// 		border-radius: 8rpx;
	// 	}

	// 	.class-item:last-child {
	// 		// min-height: 100vh;
	// 	}

	// 	.item-title {
	// 		font-size: 26rpx;
	// 		color: $u-main-color;
	// 		font-weight: bold;
	// 	}

	// 	.item-menu-name {
	// 		font-weight: normal;
	// 		font-size: 24rpx;
	// 		color: $u-main-color;
	// 	}

	// 	.item-container {
	// 		display: flex;
	// 		flex-wrap: wrap;
	// 	}

	// 	.thumb-box {
	// 		width: 33.333333%;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		flex-direction: column;
	// 		margin-top: 20rpx;
	// 	}

	// 	.item-menu-image {
	// 		width: 120rpx;
	// 		height: 120rpx;
	// 	}
	// 
</style>
