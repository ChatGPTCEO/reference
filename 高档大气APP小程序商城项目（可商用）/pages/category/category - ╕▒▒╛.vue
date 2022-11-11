<template>
	<view class="content">
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus" />
		<!-- #ifdef MP-WEIXIN -->
		<view class="w-100 fixed-top top-search" style="background-color: #f5f5f5;">
			<view class="row text-muted py-1 mx-2 mt-1 mb-1"
				style="border-radius: 30rpx;background-color: rgba(223, 223, 223,1);" @tap="toSearch">
				<view class="iconfont icon-sousuo font-s-4"></view>
				<view class="ml-2">搜索商品</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="d-f">
			<!-- 左边 -->
			<view class="left-aside">
				<scroll-view scroll-y :scroll-into-view="scrollInto" scroll-with-animation class="left-scroll">
					<view class="category-list row" v-for="(item, index) in categorylist" :key="index"
						@click="leftMenuClick(index,item)" :id="'tab'+ index" :class="{active: tabarIndex == index}">
						<view class="underline"></view>
						<view class="category-name row font-s-5 flex-1">{{ item.cname }}</view>
					</view>
				</scroll-view>
			</view>
			<!-- 右边 -->
			<view class="right-aside">
				<view v-for="item in rightMenu" :key="item.id" class="pt-3 ml-2">
					<view class="font-s-5 font-w"> {{item.cname}}</view>
					<view class="row-ac-fw">
						<view class="category-top row-a-j-fc mt-2" v-for="items in item.children" :key="items.id"
							@click="navToList(items.id)">
							<view class="category">
								<view class="category-image">
									<image :src="items.cover || nopictures" mode=""></image>
								</view>
								<view class="category-item font-s-3 row">{{ items.cname }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getCategory
	} from '@/api/index'

	export default {
		data() {
			return {
				nopictures: this.$Management.nopictures,
				tabarIndex: 0,
				scrollInto: '',
				category: [],
				rightMenu: [],
				allRightMenu: [],
				categorylist: [],
				loadingStatus: true
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				await this.getCategorylist()
				// 异步延迟加载
				setTimeout(() => {
					this.loadingStatus = false
				}, 100)
			},
			//点击搜索前往搜索页面
			onNavigationBarSearchInputClicked() {
				uni.navigateTo({
					url: '/pages/index/search/search'
				})
			},
			getCategorylist() {
				this.$R.get(getCategory)
					.then((res) => {
						this.categorylist = res.data
						// 加入一个空对象，用来撑开左侧底部的高度
						this.categorylist.push({
							cname: '',
							id: 0,
						})
						this.rightMenu = this.categorylist[0].children
						console.log(this.categorylist)
					})
			},
			leftMenuClick(index, item) {
				// 如果点击的那个空对象，直接返回
				if (item.id === 0) {
					return
				}
				this.rightMenu = this.categorylist[index].children
				this.tabarIndex = index
				if (this.tabIndex === index) {
					return
				}
				// 滚动到指定位置
				this.scrollInto = 'tab' + index
			},
			// #ifdef MP-WEIXIN
			//微信跳转到搜索页面
			toSearch() {
				uni.navigateTo({
					url: '/pages/index/search/search'
				})
			},
			// #endif
			navToList(categoryId) {
				console.log(categoryId)
				uni.navigateTo({
					// url: '/pages/product/list?categoryId=' + categoryId,
					url: '/pages/product/list?type=category&id=' + categoryId,
				})
			}
		}
	}
</script>
<style lang="scss">
	page,
	.content {
		height: 100%;
	}

	.top-search {
		z-index: 3;
	}

	.left-aside {
		/* #ifdef MP-WEIXIN */
		margin-top: 80rpx;
		/* #endif */
		height: 100%;
		z-index: 99;
		position: fixed;
		width: 200rpx;

		.left-scroll {
			flex-shrink: 0;
			width: 200rpx;
			height: 100%;
			background-color: #f5f5f5;

			.category-list {
				width: 100%;
				height: 120rpx;

				.underline {
					width: 8rpx;
					height: 120rpx;
					border-radius: 4rpx;
					margin-right: 10rpx;
				}
			}
		}

		.active {
			background: #FFFFFF;
		}

		.active .category-name {
			color: $bg-main-color !important;
		}

		.active .underline {
			background-color: $main-color;
		}
	}

	.right-aside {
		overflow: hidden;
		position: relative;
		z-index: 2;
		padding-left: 215rpx;
		background-color: #FFFFFF;
		/* #ifdef MP-WEIXIN */
		margin-top: 80rpx;

		/* #endif */
		.category-top {
			.category {
				margin: 10rpx 18rpx;

				.category-image {
					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 3rpx;
					}
				}
			}
		}
	}
</style>
