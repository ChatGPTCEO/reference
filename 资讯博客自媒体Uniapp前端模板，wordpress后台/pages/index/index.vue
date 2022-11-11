<template>
	<view class="content">
		<view class="status_bar"
			:style="'position:fixed;top:0;'+'padding-top:'+statusBarHeight+'px'+';'+'height:'+tabBarHeight+'px'+';'"
			v-if="!loading">
			<view class="statusBarMain" :style="'height:'+tabBarHeight+'px'+';'">
				<text class="siteName">{{siteInfo.name||'丸子团队'}}</text>
				<view @tap="jump" class="statusBarMainShare">
					<image mode="widthFix" class="statusBarMainShareIcon" src="/static/images/home_search.png"></image>
					搜索你感兴趣的
				</view>
			</view>
		</view>
		<view class="home-container">
			<swiper :autoplay="true" :circular="true" class="_swiper swiper" :duration="duration" :interval="interval">
				<swiper-item class="swiper-item" :key="index" v-for="(sticky,index) in stickyPost">
					<view @click="bindDetail(sticky.id)" class="bg"
						:style="'background-image:'+'url('+sticky.meta.thumbnail+')'+';'">
						<view class="title">{{sticky.title.rendered}}</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="list-wrapper">
				<block v-for="(item,index) in posts" :key="index">
					<view @click="bindDetail(item.id)" class="item-container">
						<view class="source-top">
							<image alt class="logo" :src="item.category[0].cover" v-if="item.category[0].cover">
							</image>
							<view class="categoryName">{{item.category[0].name}}</view>
						</view>
						<view class="centent-box">
							<view class="text-box">
								<view class="title-box">
									<label class="title">{{item.title.rendered}}</label>
								</view>
								<view class="content text-overflow--2">
									{{item.excerpt.rendered}}
								</view>
							</view>
							<view class="pic-box" v-if="item.meta.thumbnail">
								<image alt class="_image" mode="aspectFill" :src="item.meta.thumbnail">
								</image>
							</view>
						</view>
						<view class="footer">
							<view class="time">{{item.date}}</view>
							<view class="circle" v-if="item.meta.views"></view>
							<view class="comment">{{item.meta.views}}阅读</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<!--骨架屏 -->
		<view class="sk-container" v-if="loading">
			<view class="content">
				<view class="status_bar" style="position:fixed;top:0;padding-top:20px;height:40px;">
					<view class="statusBarMain" style="height:40px;">
						<text class="siteName sk-transparent sk-text-14-2857-631 sk-text">爱骇客</text>
						<view class="statusBarMainShare sk-transparent" data-event-opts="tap,jump,$event">
							<image class="statusBarMainShareIcon sk-image" mode="widthFix" style="height: 8px;"></image>
							搜索你感兴趣的
						</view>
					</view>
				</view>
				<view class="home-container">
					<swiper autoplay="false" circular="true" class="_swiper swiper" duration="300" interval="3000"
						current="0">
						<swiper-item class="swiper-item"
							style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
							<view class="bg sk-image" data-event-opts="tap,bindDetail,$0,stickyPost,,0,id"
								style="background-image:url(https://tva1.sinaimg.cn/crop.0.0.9999.9999.780/a183a0f1ly1gsczvqs6rsj20xc0kuad0.jpg);">
							</view>
						</swiper-item>
					</swiper>
					<view class="list-wrapper">
						<view class="item-container" data-event-opts="tap,bindDetail,$0,posts,,0,id"
							style="border: none;">
							<view class="source-top">
								<image class="logo sk-image"></image>
								<view class="categoryName sk-transparent sk-text-20-5882-124 sk-text">动漫星空</view>
							</view>
							<view class="centent-box">
								<view class="text-box">
									<view class="title-box">
										<label
											class="title sk-transparent sk-text-20-0000-748 sk-text">动漫中那些穿“和服”的女性角色，你最喜欢谁？</label>
									</view>
									<view class="content text-overflow--2 sk-transparent sk-text-14-2857-43 sk-text">
										大家在看日漫的时候肯定都见过这样的场景！ 男女主角相约一起逛庙会或者烟火大会时，女主一定会穿一身和服！ 每当这 …
										继续阅读“动漫中那些穿“和服”的女性角色，你最喜欢谁？”
									</view>
								</view>
								<view class="pic-box">
									<image class="_image sk-image" mode="aspectFill"></image>
								</view>
							</view>
							<view class="footer">
								<view class="time sk-transparent sk-text-20-5882-758 sk-text">2021-08-09 10:09:57</view>
								<view class="circle"></view>
								<view class="comment sk-transparent sk-text-20-5882-197 sk-text">591阅读</view>
							</view>
						</view>
						<view class="item-container" data-event-opts="tap,bindDetail,$0,posts,,1,id"
							style="border: none;">
							<view class="source-top">
								<image class="logo sk-image"></image>
		 					<view class="categoryName sk-transparent sk-text-20-5882-719 sk-text">动漫星空</view>
							</view>
							<view class="centent-box">
								<view class="text-box">
									<view class="title-box">
										<label
											class="title sk-transparent sk-text-20-0000-960 sk-text">小林家的龙女仆：托尔和艾露玛过去曝光，小林表示很羡慕</label>
									</view>
									<view class="content text-overflow--2 sk-transparent sk-text-14-2857-312 sk-text">
										托尔和艾露玛两人，一位是混沌势力的龙，一位是调和势力的龙，在《小林家的龙女仆》当中，几乎是见面就争吵的关系。那 …
										继续阅读“小林家的龙女仆：托尔和艾露玛过去曝光，小林表示很羡慕”
									</view>
								</view>
								<view class="pic-box">
									<image class="_image sk-image" mode="aspectFill"></image>
								</view>
							</view>
							<view class="footer">
								<view class="time sk-transparent sk-text-20-5882-584 sk-text">2021-08-09 09:50:49</view>
								<view class="circle"></view>
								<view class="comment sk-transparent sk-text-20-5882-870 sk-text">379阅读</view>
							</view>
						</view>
						<view class="item-container" data-event-opts="tap,bindDetail,$0,posts,,2,id"
							style="border: none;">
							<view class="source-top">
								<image class="logo sk-image"></image>
								<view class="categoryName sk-transparent sk-text-20-5882-496 sk-text">动漫星空</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				isloading: true,
				siteInfo: [],
				advert: [],
				stickyPost: [],
				indicatorDots: !1,
				autoplay: !0,
				interval: 3e3,
				circular: true,
				duration: 300,
				placeHolder: '输入你想知道的内容...',
				autoFocus: false,
				inputEnable: true,
				searchKey: '',
				posts: [],
				page: 1,
				isLastPage: false,
				isBottom: false,
				statusBarHeight: 0,
				tabBarHeight: 60,
				loading: true,
			}
		},
		onLoad() {
			let e = this;
			// #ifdef MP
			uni.getSystemInfo({
				success: function(t) {
					console.log(t);
					var n = uni.getMenuButtonBoundingClientRect(),
						a = n.bottom + n.top - t.statusBarHeight;
					e.customBar = a, e.statusBarHeight = t.statusBarHeight, e.tabBarHeight = a - e
						.statusBarHeight;
				}
			})
			// #endif
			// #ifdef APP-PLUS||H5
			this.statusBarHeight = 20;
			// #endif
			this.getSiteInfo();
			this.getAdvert();
			this.getStickyPosts();
			this.getPostList();
		},
		onReachBottom() {
			if (!this.isLastPage && !this.isloading) {
				this.getPostList({
					page: this.page
				})
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.posts = [];
			this.isLastPage = false;
			this.getPostList();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage() {
			return {
				title: this.siteInfo.name,
				path: '/pages/index/index',
				desc: this.siteInfo.description,
				imageUrl: this.siteInfo.cover,
			}
		},
		methods: {
			getSiteInfo: function() {
				API.getSiteInfo().then(res => {
						this.siteInfo = res;
						uni.setNavigationBarTitle({
							title: res.name
						})
						//console.log(res);
					})
					.catch(err => {
						console.log(err)
					})
			},
			getStickyPosts: function() {
				API.getStickyPosts().then(res => {
						this.stickyPost = res
					})
					.catch(err => {
						console.log(err)
					})
			},
			getAdvert: function() {
				API.indexAdsense().then(res => {
						console.log(res)
						if (res.status === 200) {
							this.advert = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
			},

			getPostList: function(data) {
				API.getPostsList(data).then(res => {
						console.log(res);
						if (res.length < 10) {
							this.isLastPage = true,
								this.loadtext = '到底啦',
								this.showloadmore = false

						}
						this.posts = this.posts.concat(res);
						this.page = this.page + 1;
						this.isloading = false;
						this.loading=false;
						uni.stopPullDownRefresh()
					})
					.catch(err => {
						console.log(err)
						uni.stopPullDownRefresh()
					})
			},
			getItem: function(url) {
				uni.navigateTo({
					url: url
				})

			},
			onInput: function(e) {
				this.searchKey = e.detail.value;

			},

			jump: function() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},

			onConfirm: function() {
				uni.navigateTo({
					url: '/pages/list/list?s=' + this.searchKey,
				})
			},
			bindDetail: function(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id,
				})
			}
		}
	}
</script>

<style>
	.status_bar {
		background-color: #fff;
		width: 100%;
		z-index: 10;
	}

	.status_bar .statusBarMain {
		-webkit-box-pack: start;
		justify-content: flex-start;
		flex-direction: row;
	}

	.status_bar .statusBarMain,
	.status_bar .statusBarMain .statusBarMainShare {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
	}

	.status_bar .siteName {
		font-size: 34rpx;
		font-weight: 700;
		margin: 0 30rpx;

	}

	.status_bar .statusBarMain .statusBarMainShare {
		height: 66rpx;
		font-size: 26rpx;
		border-radius: 50rpx;
		background: #f3f3f3;
		-webkit-box-pack: center;
		justify-content: center;
		flex-direction: row;
		color: #a8a8a8;
		-webkit-box-flex: 1;
		flex: 1;
		margin-right: 210rpx;
	}

	.status_bar .statusBarMain .statusBarMainShare .statusBarMainShareIcon {
		width: 20rpx;
		height: 20rpx;
		margin-right: 16rpx;
	}

	.home-container {
		padding-top: 60px;
	}

	.home-container .swiper {
		height: 340rpx;
	}

	.home-container .swiper .bg {
		height: 100%;
		width: 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
	}

	.home-container .swiper .title {
		position: absolute;
		bottom: 16rpx;
		color: #fff;
		padding: 0 30rpx;
		font-size: 34rpx;
		text-shadow: 2rpx 2rpx 4rpx #222;
	}

	.home-container .news-header {
		height: 32rpx;
		width: 166rpx;
		display: block;
		margin: 40rpx auto 0;
	}

	.home-container .list-wrapper {
		padding: 0 30rpx;
	}


	.search-wrapper {
		position: fixed;
		bottom: 60rpx;
		right: 60rpx;
	}

	.search-wrapper .search-icon {
		height: 100rpx;
		width: 100rpx;
		bottom: 26rpx;
		left: 30rpx;
	}
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-14-2857-631 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 45.9375rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-20-5882-124 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-748 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 46.8750rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-43 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.0938rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-758 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-197 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-719 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-960 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 46.8750rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-312 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.0938rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-584 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-870 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-496 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-image {
	    background: #EFEFEF !important;
	  }
	.sk-container {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: transparent;
	  }

</style>
