<template>
	<view class="">
		<common-transparent-top topTitle="美丽方案"></common-transparent-top>
		<view class="flex-1" style="height: 278rpx;">
			<image src="https://demo.chunfengbuy.com/uploads/20220520/5f3bb0be90461211f62381830479f219.jpg"
				mode=" aspectFill"></image>
		</view>
		<view class="flex-1 topic-box row-ac suck-top" :style="suckTop">
			<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
				<view class="scroll-row-item" v-for="(item, index) in articleNavList" :key="item.id"
					:class="{ active: navIndex == index }" @click="clickNav(index, item)" :id="'tab' + index">
					<view class="nav-name ml-3 font-s-4">{{ item.title }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 距离头部高度 -->
		<view class="mx-3 mt-2 flex-1">
			<view class="article-item" v-for="(item,index) in articleList" :key="index"
				v-if="item.productData.length > 0">
				<view class="flex-1 mx-3 py-4">
					<view class="flex-1 in1line font-w font-s-65">{{ item.title }}</view>
					<view class="flex-1 font-s-4 in2line mt" style="color: #4E7859;"
						v-if="item.subtitle !== null && item.subtitle !== ''">
						<text class="font-s-5 font-w mr-2">推荐理由:</text>
						{{ item.subtitle }}
					</view>
					<view class="product-box flex-1 mt-5" v-if="item.productData.length > 0">
						<view class="product-info row-ac">
							<view class="product-img">
								<image :src="item.productData[0].img.img" mode="aspectFill"></image>
							</view>
							<view class="flex-1 ml-3 product-content">
								<view class="product-title font-s-6 in1line font-w-300">{{ item.productData[0].title }}
								</view>
								<view class="product-promotion font-s-1 mt-1">{{ item.productData[0].promotion }}</view>
								<view class="font-s-65 font-w mt-2">￥{{ item.productData[0].price }}</view>
								<view class="font-s-4 text-de text-light-grey mt">￥{{ item.productData[0].marketPrice }}
								</view>
							</view>
						</view>
						<view class="d-f justify-end mt-4">
							<view class="purchase-box row" @click="toProduct(item.productData[0].productId)">立即购买</view>
							<view class="collection-box ml-2 text-white row">加入收藏</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonTransparentTop from '@/components/common/common-transparent-top';
	import articleList from '@/components/common/article-list/article-list';
	import {
		getArticleClassificationUrl,
		getArticleListUrl
	} from '@/api/index';

	export default {
		components: {
			commonTransparentTop,
			articleList
		},
		data() {
			return {
				articleNavList: [],
				topHeight: '',
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
		computed: {
			suckTop() {
				return `top: ${this.topHeight}px;`
			}
		},
		created() {
			//接收组件传送元素高度
			uni.$on('topHeightEmit', res => {
				this.topHeight = res;
			});
			uni.getSystemInfo({
				success: res => {
					this.swiperHeight = res.windowHeight - this.commonHeaderHeight - 10;
				}
			});

		},
		onReady() {
			this.queryInfo = {
				articleTypeId: this.articleId
			}
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
			uni.$emit('scrollTopEmit', this.scrollTop);
		},
		onLoad(options) {
			this.initData(options)
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
		methods: {
			initData() {
				this.getArticleClassificationList();
			},
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
				if (this.articleListTotal != this.articleList.length) {
					this.queryInfo.page++;
					this.getArticleList();
				}
			},
			// 获取分类标签
			getArticleClassificationList() {
				this.$R.get(getArticleClassificationUrl, this.categoryQueryInfo).then(res => {
					this.articleNavList = res.data;
					this.queryInfo = {
						articleTypeId: this.articleNavList[0].id,
						pageSize: 10,
						page: 1
					};
					this.getArticleList()
				});
			},
			// 获取文章列表
			getArticleList() {
				this.$R.get(getArticleListUrl, this.queryInfo).then(res => {
					this.articleList = [...this.articleList, ...res.data.list];
					this.articleListTotal = res.data.total;
				});
			},

			toRelease() {
				uni.navigateTo({
					url: '/pages/article/article-release'
				});
			},
			toProduct(id) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + id
				});
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #F3F4F6;
	}

	.topic-box {
		height: 73rpx;
		background-color: #202A22;
	}

	.suck-top {
		position: -webkit-sticky;
		position: sticky;
		z-index: 99;
		top: 0;
	}

	.nav-name {
		height: 42rpx;
		line-height: 42rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		color: #fff;
		margin-left: 20rpx;
	}

	.active .nav-name {
		background-color: #fff;
		color: #333;
	}

	.article-item {
		width: 690rpx;
		background-color: #fff;
		margin-bottom: 25rpx;

		.product-box {
			.product-info {
				height: 246rpx;

				.product-img {
					width: 246rpx;
					height: 246rpx;
				}

				.product-content {
					height: 200rpx;

					.product-promotion {
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 10rpx;
						border: 1rpx solid #ACACAC;
						color: #ACACAC;
						display: inline-block;
					}
				}
			}

			.purchase-box {
				width: 192rpx;
				height: 64rpx;
				color: #4E7859;
				border: 1rpx solid #4E7859;
			}

			.collection-box {
				width: 192rpx;
				height: 64rpx;
				background-color: #4E7859;
				border: 1rpx solid #4E7859;
			}
		}
	}
</style>
