<template>
	<view class="content">
		<u-navbar :title="title" :is-back="false" :border-bottom="false" :background="background" title-color="#fff"
			v-if="option"></u-navbar>
		<view class="top">
			<image src="@/static/images/top-bg.png" mode="widthFix" class="header-background-pic"></image>
			<image class="logo-pic" mode="widthFix" src="@/static/images/logo@2x.png"></image>
			<view class="search-bar" @tap="gotoSearch">
				<view class="search-bar__icon"></view>
				<input id="key" placeholder="搜索你喜欢的内容" placeholder-style="color:#f9f9f9"
					class="search-bar__placeholder"></input>
			</view>
			<view class="swiper-content">
				<u-swiper :list="swiperList" :effect3d="true" :bg-color="swiperColor" @click="gotoBanner" height="300">
				</u-swiper>
			</view>
			<view class="sticky-content">
				<u-section font-size="36" :show-line="false" title="热门资讯" sub-title="查看更多" @click="moreSticky">
				</u-section>
				<scroll-view  :scrollX="true" class="pending-scroll-view">
					<view class="pending-cards">
						<view @tap="gotoDetail(sticky.id)" class="pending-card" v-for="(sticky,index) in stickyList"
							:key="index">
							<view class="pending-date-label">
								<view class="date-label-title">热门推荐</view>
								<view class="date-label-date">{{sticky.time}}</view>
							</view>
							<image class="pending-thumb" mode="aspectFill" :src="sticky.meta.thumbnail"></image>
							<view class="pending-article">
								<view class="pending-title text-truncate">{{sticky.title.rendered}}</view>
								<view class="pending-reserve-info">
									<view class="reserve-info-count">{{sticky.meta.views}} 人查看</view>
									<view class="reserve-info-button">
										<view>查看+1</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="articleList">
			<!-- #ifdef APP-PLUS||H5 -->
			<u-sticky @fixed="showNav" @unfixed="hiddenNav">
				<!-- #endif -->
				<!-- #ifdef MP -->
				<u-sticky @fixed="showNav" @unfixed="hiddenNav" :offset-top="offset">
					<!-- #endif -->
					<u-tabs :list="cats" :is-scroll="true" :current="current" @change="change" count="cate_count"
						inactive-color="#999" :active-item-style="activeStyle" active-color="#434343"></u-tabs>
				</u-sticky>
				<view class="article-content" :style="'min-height:'+(systemHeight-80)+'px'">
					<article-list :posts="posts" :advert="advert"></article-list>
					<u-loadmore :status="status" />
				</view>

		</view>

	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				advert:[],
				swiperColor: 'rgba(0,0,0,0)',
				swiperList: [],
				stickyList: [],
				posts: [],
				current: 0,
				page: 1,
				option: false,
				cats: [{
					id: 0,
					name: '全部',
					except: true
				}],
				activeStyle: {
					'font-size': '38rpx',
					'color': '#434343'
				},
				showNavs: false,
				background: {
					backgroundColor: '#50cc99',

				},
				isLastPage: false,
				status: "loading",
				offset: 44,
				title: '',
				systemHeight: 400,
			}
		},
		onLoad() {
			this.getPostsList();
			this.getSiteInfo();
			this.offset = (uni.getSystemInfoSync().statusBarHeight + 44) * (750 / uni.getSystemInfoSync().windowWidth);
			this.systemHeight = uni.getSystemInfoSync().windowHeight;
			this.getBanner();
			this.getStickyPosts();
			this.getCategories();
		},
		onReady() {
			

		},
		onPageScroll(res) {
			if (res.scrollTop > 80) {
				this.title = "丸子资讯";
				this.option = true
			} else {
				this.title = " ";
				this.option = false
			}

		},
		onShareAppMessage: function() {
			let title = '丸子小程序资讯自媒体 - 基于 WordPress 创建的资讯平台'
			let thumb = this.bloginfo.cover ? this.bloginfo.cover : '../../images/default.jpg'
			if (this.bloginfo) {
				title = this.bloginfo.name + ":" + this.bloginfo.description
			}
			return {
				title: title,
				imageUrl: thumb,
				path: '/pages/index/index'
			}
		},
		onShareTimeline: function(res) {
			let title = '丸子小程序资讯自媒体 - 基于 WordPress 创建的资讯平台'
			let thumb = this.bloginfo.cover ? this.bloginfo.cover : '../../images/default.jpg'
			if (this.bloginfo) {
				title = this.bloginfo.name + ":" + this.bloginfo.description
			}
			return {
				title: title,
				query:'',
				imageUrl: thumb //图片地址
			}
		},
		onReachBottom() {
			if (this.current != 0 && !this.isLastPage) {
				this.getPostsList({
					categories: this.id,
					page: this.page
				})
			} else if (!this.isLastPage) {
				this.getPostsList({
					page: this.page
				})
				
			}
		},
		methods: {
			getBanner: function() {
				API.getBanner().then(res => {
						if (res.status === 200) {
							this.swiperList = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getSiteInfo: function() {
				API.getSiteInfo().then(res => {
						this.bloginfo = res
					})
					.catch(err => {
						console.log(err)
					})
			},
			gotoBanner: function(e) {
				let url = this.swiperList[e].url;
				if (this.swiperList[e].type == 'app') {
					let urls = url.split("|");
					let appid = urls[0];
					let path = urls[1] || 'pages/index/index';
					uni.navigateToMiniProgram({
						appId: appid,
						path: path,
					})
				} else {
					uni.navigateTo({
						url: url,
					})
				}
			},

			getIndexAds: function() {
				API.indexAdsense().then(res => {
						if (res.status === 200) {
							this.posts = this.posts.concat(res.data)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},

			getStickyPosts: function() {
				API.getStickyPosts().then(res => {
						this.stickyList = res
					})
					.catch(err => {
						console.log(err)
					})
			},

			getCategories: function(args) {
				API.getCategories(args).then(res => {
						//console.log(res)
						this.cats = this.cats.concat(res);
					})
					.catch(err => {
						console.log(err)
					})
			},

			getPostsList: function(args) {
				API.getPostsList(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					}).then(res => {
						this.getTags({
							per_page: 1,
							page: this.page
						})
						// #ifdef MP
						this.getIndexAds();
						// #endif
					})
					.catch(err => {
						console.log(err)
					})
			},
			gotoDetail: function(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},

			change: function(e) {
				this.current = e;
				this.id = this.cats[e].id;
				this.posts = [];
				this.page = 1;
				this.isLastPage = false;
				this.status = "loading";
				if (this.current == 0) {
					this.getPostsList({
						page: this.page
					})
				} else {
					this.getPostsList({
						categories: this.id,
						page: this.page
					})
				}
			},


			getTags: function(args) {
				API.getTags(args).then(res => {
						this.posts = this.posts.concat(res)
						console.log(this.posts);
					})
					.catch(err => {

					})
			},
			moreSticky: function() {
				uni.navigateTo({
					url: '../sticky/sticky'
				})
			},
			showNav: function() {
				let that = this;
				setTimeout(function() {
					that.showNavs = true;
				}, 1000);


			},
			hiddenNav: function() {
				let that = this;
				setTimeout(function() {
					that.showNavs = false;
				}, 1000);
			},
			gotoSearch: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		padding-top: 100rpx;
		font-size: 28rpx;
		color: #333;
		position: relative;
		font-family: Helvetica Neue, Helvetica, sans-serif;

		.header-background-pic {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}

		.logo-pic {
			position: relative;
			width: 328rpx;
			min-height: 52rpx;
			margin-left: 40rpx;
		}

		.search-bar {
			position: relative;
			margin: 30rpx 40rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: row nowrap;
			height: 72rpx;
			border-radius: 38rpx;
			background: rgba(255, 255, 255, 0.15);

			.search-bar__icon {
				width: 32rpx;
				height: 32rpx;
				background-image: url("https://cloud-minapp-16269.cloud.ifanrusercontent.com/product-search.svg");
				background-size: contain;
				opacity: 0.8;
				filter: brightness(2);
			}

			.search-bar__placeholder {
				margin-left: 10rpx;
				font-size: 28rpx;
				color: white;
				opacity: 0.8;
			}

		}

		.swiper-content {
			padding: 30rpx 0rpx;
		}

		.sticky-content {
			padding: 30rpx;

			.pending-scroll-view {
				height:425rpx;
				.pending-cards{
				white-space: nowrap;
				overflow-x: scroll;
				margin: 26rpx 0rpx;
				.pending-card {
					position: relative;
					overflow: hidden;
					display: inline-block;
					margin-right: 20rpx;
					width: 324rpx;
					border-radius: 18rpx;
					box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, 0.04);
					border: 1rpx solid rgba(236, 236, 236, 1);
					vertical-align: bottom;

					.pending-date-label {
						position: absolute;
						left: 10rpx;
						top: 10rpx;
						padding: 12rpx;
						padding-bottom: 8rpx;
						border-radius: 12rpx;
						background: rgba(0, 0, 0, 0.6);
						z-index: 1;

						.date-label-title {
							font-size: 18rpx;
							color: rgba(255, 255, 255, 0.6);
						}

						.date-label-date {
							margin: 0 4rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: white;
						}
					}

					.pending-thumb {
						display: block;
						width: 100%;
						height: 240rpx;
					}

					.pending-article {
						position: relative;
						padding: 20rpx;
						background: white;
						line-height: 1;

						.pending-title {
							font-size: 28rpx;
							color: #121212;
							font-weight: bold;
							line-height: 36rpx;
						}

						.text-truncate {
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.pending-reserve-info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-flow: row nowrap;
							margin-top: 18rpx;
							font-size: 24rpx;
							color: #7d7d7d;

							.reserve-info-button {
								padding: 10rpx 20rpx;
								border-radius: 28rpx;
								background-color: #ffcd46;
								color: #333333;
								box-shadow: 0 4rpx 12rpx 0 rgba(255, 229, 68, 0.5);
							}
						}
					}

				}
			}
			}
		}
	}

	.articleList {
		padding-bottom: 30rpx;
	}
</style>
