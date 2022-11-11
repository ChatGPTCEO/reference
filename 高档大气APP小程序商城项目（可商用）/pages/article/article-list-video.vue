<template>
	<view class="">
		<view class="flex-1 video-header fixed-top">
			<view class="" :style="'height:' + statusBarheight + 'px'"></view>
			<view class="flex-1 mx-2 row-ac pb-2">
				<view class="iconf-box row iconfont icon-back2-01" @click="toBack"></view>
				<view class="flex-1 mx-3 search-box row-ac">
					<view class="iconfont icon-search-01 ml-2"></view>
					<view class="ml-1">搜索内容</view>
				</view>
				<view class="iconf-box row iconfont icon-share-01"></view>
			</view>
			<view class="flex-1 py-1">
				<view class="flex-1 mx-2 topic-box">
					<view class="flex-1 mx-2 row-ac" style="height: 80rpx;">
						<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
							<view class="scroll-row-item font-s-5" v-for="(item, index) in articleNavList"
								:key="item.id" :class="{ active: navIndex == index }" @click="clickNav(index, item)"
								:id="'tab' + index">
								<view class="nav-name mr-5">{{ item.title }}</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-1" :style="'height:' + headerHeight + 'px'"></view>
		<view class="flex-1" style="height: 528rpx;">
			<image src="https://demo.chunfengbuy.com/uploads/20220523/051b2fa77a4e688de6550d246d2a8879.jpg"
				mode="aspectFill"></image>
		</view>
		<view class="flex-1 mx-3 mt-3 d-f">
			<view class="article-box mr-2">
				<view class="article-item" v-for="(item,index) in articleAllList.leftArr" :key="index"
					v-if="item.productData.length > 0" @click="toArticleDetails(item)">
					<view class="article-img">
						<image :src="item.videoCover || item.image[0]" mode="widthFix"></image>
						<view class="icon-video row" v-if="item.videoCover !== ''">
							<text class="iconfont icon-bofang"></text>
						</view>
						<view class="user-info">
							<view class="row-ac flex-1 mx-2 mt-1">
								<image :src="item.userImage" class="user-image" mode=""></image>
								<view class="font-s-2 ml-1">{{ item.userName }}</view>
							</view>
						</view>
					</view>
					<view class="flex-1 mx-2 pt-1 pb-2 foot-box">
						<view class="font-s-2 in2line" :style="fontSize">{{ item.productData[0].title }}</view>
						<view class="row-ac-sb flex-1">
							<view class="text-main-color font-s-6 font-w mt-1"><text
									class="font-s-1">￥</text>{{ item.productData[0].price }}</view>
							<view class="font-s-1 text-de text-light-grey mr-3 mt-1">￥{{ item.productData[0].marketPrice }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="article-box">
				<view class="article-item" v-for="(item,index) in articleAllList.rightArr" :key="index"
					v-if="item.productData.length > 0" @click="toArticleDetails(item)">
					<view class="article-img">
						<image :src="item.videoCover || item.image[0]" mode="widthFix"></image>
						<view class="icon-video row" v-if="item.videoCover !== ''">
							<text class="iconfont icon-bofang"></text>
						</view>
						<view class="user-info">
							<view class="row-ac flex-1 mx-2 mt-1">
								<image :src="item.userImage" class="user-image" mode=""></image>
								<view class="font-s-2 ml-1">{{ item.userName }}</view>
							</view>
						</view>
					</view>
					<view class="flex-1 mx-2 pt-1 pb-2">
						<view class="font-s-2 in2line" :style="fontSize">{{ item.productData[0].title }}</view>
						<view class="row-ac-sb flex-1">
							<view class="text-main-color font-s-6 font-w mt-1"><text
									class="font-s-1">￥</text>{{ item.productData[0].price }}</view>
							<view class="font-s-1 text-de text-light-grey mr-3 mt-1">￥{{ item.productData[0].marketPrice }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import articleList from '@/components/common/article-list/article-list';
	import {
		getArticleClassificationUrl,
		getArticleListUrl
	} from '@/api/index';

	export default {
		components: {
			articleList
		},
		data() {
			return {
				headerHeight: '',
				statusBarheight: '',
				articleNavList: [],
				commonHeaderHeight: 50,
				navIndex: 0,
				scrollInto: '',
				swiperCurrent: '',
				swiperHeight: '',
				articleListTotal: 0,
				articleList: [],
				queryInfo: {
					articleTypeId: '',
					pageSize: 10,
					page: 1
				},
				categoryQueryInfo: {
					pid: 1,
					isOpen: 1,
				},
			};
		},
		created() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.statusBarheight = res.statusBarHeight; //获取顶部状态栏高度+3个像素
				}
			});
		},
		onLoad() {
			this.getArticleClassificationList();
			this.getArticleList();
		},
		mounted() {
			uni.createSelectorQuery()
				.in(this)
				.select('.video-header')
				.boundingClientRect(res => {
					this.headerHeight = res.height;
					uni.$emit('headerHeightEmit', this.headerHeight)
				})
				.exec();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.articleList = [];
			this.queryInfo.page = 1
			this.getArticleClassificationList();
			this.getArticleList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log(3);
			}, 1000);
		},
		// 上划加载
		onReachBottom() {
			this.onReachBottomHandle();
		},
		computed: {
			articleAllList() {
				let allArr = this.waterfallFlow(this.articleList)
				return allArr
			}
		},
		methods: {
			// 顶部菜单点击事件
			clickNav(index, classificationInfo) {
				if (this.navIndex === index) {
					return;
				}
				this.navIndex = index;
				this.scrollInto = 'tab' + index;
				this.queryInfo = {
					articleTypeId: classificationInfo.id,
					pageSize: 10,
					page: 1
				};
				this.articleList = [];
				this.getArticleList();
			},
			onReachBottomHandle() {
				// 触底事件
				if (this.articleListTotal != this.articleList.length) {
					this.queryInfo.page++;
					this.getArticleList();
				}
			},
			// 获取分类标签
			getArticleClassificationList() {
				this.$R.get(getArticleClassificationUrl, this.categoryQueryInfo).then(res => {
					this.articleNavList = [{
						id: 0,
						title: '推荐'
					}, ...res.data];
				});
			},
			// 获取文章列表
			getArticleList() {
				this.$R.get(getArticleListUrl, this.queryInfo).then(res => {
					this.articleList = [...this.articleList, ...res.data.list];
					this.articleListTotal = res.data.total;
					console.log(this.articleList);
				});
			},
			waterfallFlow(arr) {
				if (arr.length <= 0) {
					return false
				}
				let allArr = {
					leftArr: [],
					rightArr: []
				}
				let leftArr = []
				arr.forEach((item, index) => {
					if (index % 2 == 0) {
						allArr.leftArr.push(item)
					} else {
						allArr.rightArr.push(item)
					}
				})
				return allArr
			},
			toRelease() {
				uni.navigateTo({
					url: '/pages/article/article-release'
				});
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			toArticleDetails(item) {
				if (item.videoCover === '' && item.videoCover != 'null') {
					uni.navigateTo({
						url: '/pages/article/article-details?id=' + item.id
					});
				} else {
					uni.navigateTo({
						url: '/pages/article/article-video?id=' + item.id
					});
				}
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.video-header {
		background-color: #930B0F;
		color: #fff;

		.iconf-box {
			width: 65rpx;
			height: 65rpx;
		}

		.iconfont {
			font-size: 36rpx;
		}
	}

	.search-box {
		height: 60rpx;
		border-radius: 4rpx;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.topic-box {
		height: 80rpx;
		border-radius: 40rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.5);
		box-shadow: 0rpx 0rpx 30rpx rgba(255, 255, 255, 0.5);
	}

	.active .nav-name {
		font-size: 42rpx;
		font-weight: 900;
	}

	.article-box {
		width: 335rpx;

		.article-item {
			width: 335rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 20rpx;

			.article-img {
				width: 335rpx;
				position: relative;
				image{
					border-radius: 20rpx 20rpx 0 0;
				}
				.icon-video {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, .2);
					position: absolute;
					top: 20rpx;
					right: 20rpx;

					.iconfont {
						font-size: 18rpx;
						color: #FFFFFF;
					}
				}
				.user-info{
					position: absolute;
					bottom: 20rpx;
					left: 10rpx;
					color: #fff;
					.user-image {
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						border: 2rpx solid #FFFFFF;
					}
				}
			}
		}
	}
</style>
