<template>
	<view class="content">
		<view class="topic-detail-container" v-if="!loading">
			<view class="topic-head">
				<image alt class="_image" mode="aspectFill" :src="category.cover"></image>
				<view class="topic-name">{{category.name}}</view>
			</view>
			<view class="_div">
				<view class="desc-box">
					<view class="desc">
						{{category.description}}
					</view>
				</view>
			</view>
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
		
		<!-- 骨架屏  -->
		<view class="sk-container" v-if="loading">
			<view>
				<view class="topic-detail-container">
					<view class="topic-head">
						<image class="_image sk-image" mode="aspectFill"></image>
						<view class="topic-name sk-transparent sk-text-7-5000-453 sk-text">动漫星空</view>
					</view>
					<view class="_div">
						<view class="desc-box">
							<view class="desc sk-transparent sk-text-17-6471-794 sk-text">
								漫星空是以动漫资讯、动漫壁纸、动漫音乐、动漫周边产品等内容为主打的综合动漫内容</view>
						</view>
					</view>
					<view class="list-wrapper">
						<view class="item-container" data-event-opts="tap,bindDetail,$0,posts,,0,id"
							style="border: none;">
							<view class="source-top">
								<image class="logo sk-image"></image>
								<view class="categoryName sk-transparent sk-text-20-5882-321 sk-text">动漫星空</view>
							</view>
							<view class="centent-box">
								<view class="text-box">
									<view class="title-box">
										<label
											class="title sk-transparent sk-text-20-0000-844 sk-text">动漫中那些穿“和服”的女性角色，你最喜欢谁？</label>
									</view>
									<view class="content text-overflow--2 sk-transparent sk-text-14-2857-653 sk-text">
										大家在看日漫的时候肯定都见过这样的场景！ 男女主角相约一起逛庙会或者烟火大会时，女主一定会穿一身和服！ 每当这 …
										继续阅读“动漫中那些穿“和服”的女性角色，你最喜欢谁？”
									</view>
								</view>
								<view class="pic-box">
									<image class="_image sk-image" mode="aspectFill"></image>
								</view>
							</view>
							<view class="footer">
								<view class="time sk-transparent sk-text-20-5882-925 sk-text">2021-08-09 10:09:57</view>
								<view class="circle"></view>
								<view class="comment sk-transparent sk-text-20-5882-684 sk-text">591阅读</view>
							</view>
						</view>
						<view class="item-container" data-event-opts="tap,bindDetail,$0,posts,,1,id"
							style="border: none;">
							<view class="source-top">
								<image class="logo sk-image"></image>
								<view class="categoryName sk-transparent sk-text-20-5882-211 sk-text">动漫星空</view>
							</view>
							<view class="centent-box">
								<view class="text-box">
									<view class="title-box">
										<label
											class="title sk-transparent sk-text-20-0000-642 sk-text">小林家的龙女仆：托尔和艾露玛过去曝光，小林表示很羡慕</label>
									</view>
									<view class="content text-overflow--2 sk-transparent sk-text-14-2857-79 sk-text">
										托尔和艾露玛两人，一位是混沌势力的龙，一位是调和势力的龙，在《小林家的龙女仆》当中，几乎是见面就争吵的关系。那 …
										继续阅读“小林家的龙女仆：托尔和艾露玛过去曝光，小林表示很羡慕”
									</view>
								</view>
								<view class="pic-box">
									<image class="_image sk-image" mode="aspectFill"></image>
								</view>
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
				id: '',
				page: 1,
				posts: [],
				isLastPage: false,
				category: '',
				loading:true
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getPostList({
					categories: options.id,
					page: this.page
				});
				this.getCategoryByID(options.id);
			}
			if (options.s) {
				this.key = options.s
				this.getPostList({
					search: options.s,
					page: this.page
				});
				uni.setNavigationBarTitle({
					title: '关键词:' + options.s
				})
			}
		},
		onShareAppMessage() {
			return {
				title: this.cattitle,
				path: '/pages/list/list?id=' + this.id,
			}
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getPostList({
					page: this.page
				})
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.posts = [],
				this.getPostList();
			uni.stopPullDownRefresh();
		},
		methods: {

			getCategoryByID: function(id) {
				API.getCategoryByID(id).then(res => {
						this.cattitle = res.name;
						this.category = res;
						this.loading=false;
						uni.setNavigationBarTitle({
							title: res.name
						})
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
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						uni.stopPullDownRefresh()
					})
					.catch(err => {
						console.log(err)
						uni.stopPullDownRefresh()
					})
			},
			bindDetail: function(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id,
				})
			}
		}
	}
</script>

<style>
	.topic-detail-container .topic-head {
		height: 432rpx;
		width: 100%;
		position: relative;
	}

	.topic-detail-container .topic-head image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.topic-detail-container .topic-head .topic-name {
		font-size: 40rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #fff;
		line-height: 48rpx;
		position: absolute;
		left: 40rpx;
		bottom: 64rpx;
		z-index: 2;
	}

	.topic-detail-container .desc-box {
		display: flex;
		background: #f2f6f9;
	}

	.topic-detail-container .desc-box .desc-date {
		margin-top: 44rpx;
		margin-left: 30rpx;
	}

	.topic-detail-container .desc-box .desc-date ._div {
		font-size: 24rpx;
		font-family: Helvetica;
		color: #ed3b2e;
		line-height: 24rpx;
	}

	.topic-detail-container .desc-box .desc {
		margin: 40rpx 48rpx 52rpx 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5e656c;
		line-height: 40rpx;
	}

	.topic-detail-container .article-box {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.list-wrapper {
		padding: 0 30rpx;
	}
	
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-7-5000-453 {
	    background-image: linear-gradient(transparent 7.5000%, #EEEEEE 0%, #EEEEEE 92.5000%, transparent 0%) !important;
	    background-size: 100% 46.8750rpx;
	    position: absolute !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-17-6471-794 {
	    background-image: linear-gradient(transparent 17.6471%, #EEEEEE 0%, #EEEEEE 82.3529%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-321 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-844 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 46.8750rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-653 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.0938rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-925 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-684 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-5882-211 {
	    background-image: linear-gradient(transparent 20.5882%, #EEEEEE 0%, #EEEEEE 79.4118%, transparent 0%) !important;
	    background-size: 100% 39.8438rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-642 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 46.8750rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-79 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.0938rpx;
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
