<template>
	<view>
		<view class="swiper-content">
			<u-swiper :list="swiperList" :effect3d="true" :bg-color="swiperColor" @click="gotoBanner" height="300">
			</u-swiper>
		</view>
		<view class="category-content">
			<u-section font-size="36" :show-line="false" title="栏目分类" :right="false"></u-section>
			<view class="section-content">
				<view @tap="gotoList(item.id)" class="card" v-for="(item,index) in cats" :key="index">
					<view class="cover-container">
						<image class="cover" mode="aspectFill" :src="item.cover"></image>
						<view class="cover-mask"
							:style="'background: linear-gradient(to bottom, transparent 0%,'+item.color?item.color:'#333'+'100%)'">
						</view>
						<view class="cover-info">
							<view class="serial">{{item.count}}篇文章</view>
						</view>
					</view>
					<view class="infos">
						<view class="title">{{item.name}}</view>
						<view class="description">
							<text>{{item.description}}</text>
						</view>
					</view>
				</view>
				<view class="normal-more show-all-testing" bindtap="moreSeticon">
					<text class="normal-more-text">{{isEndScroll?'已加载全部栏目':'加载更多栏目'}}</text>
					<image class="normal-more-icon" :lazyLoad="true" mode="aspectFill"
						src="https://cloud-minapp-16269.cloud.ifanrusercontent.com/1h92iYsyLhfQUy48.svg"></image>
				</view>
			</view>
		</view>
		<view class="ad" v-if="advert.code">
			<view class="adview" v-if="advert.type=='unit'">
				<ad :unit-id="advert.code"></ad>
			</view>
			<view @tap="gotoAD(advert.type,advert.code)" class="adview" v-else>
				<view class="adtext">
					<text>广告</text>
				</view>
				<image :src="advert.thumbnail" mode="aspectFill"></image>
			</view>
		</view>
		<view class="more-news">
			<u-section font-size="36" :show-line="false" title="精选资讯" sub-title="查看更多"  @click="moreArticle"></u-section>
		</view>
		<article-list :posts="posts"></article-list>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				swiperColor: 'rgba(0,0,0,0)',
				swiperList: [],
				cats: [],
				cate: 1,
				isEndScroll: false,
				posts:[],
				advert:[],
			}
		},
		onLoad() {
			this.getBanner();
			this.getCategories();
			this.getRandPosts();
			// #ifdef MP
			this.getListAds();
			// #endif
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
			gotoList:function(id){
				uni.navigateTo({
					url:"../list/list?id="+id
				})
			},

			getCategories: function(args) {
				API.getCategories(args).then(res => {
						let data = {}
						if (res.length < 10) {
							this.isEndScroll = true
						}
						this.cate = this.cate + 1
						this.cats = this.cats.concat(res)

					})
					.catch(err => {

					})
			},
			getListAds: function() {
				API.listAdsense().then(res => {
						if (res.status === 200) {
							this.advert = res.data
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			moreArticle:function(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			
				getRandPosts: function () {
					API.getRandPosts().then(res => {
						this.posts= res
                      })
					.catch(err => {
						console.log( err )
					})
				}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-content {
		padding: 30rpx 0rpx;
	}

	.category-content {
		padding: 30rpx;
	}

	.section-content {
		padding-top:30rpx;

		.card {
			display: inline-block;
			margin-top: 20rpx;
			border-radius: 16rpx;
			width: 330rpx;
			background-color: rgba(255, 255, 255, 1);
			box-shadow: 0 4rpx 20rpx 0 #e9e9e9;
			height: 420rpx;
			vertical-align: bottom;
			overflow: hidden;

			&:nth-of-type(2n) {
				margin-left: 25rpx;
			}

			.cover-container {
				position: relative;
				width: 100%;
				height: 260rpx;

				.cover {
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}

				.cover-mask {
					position: absolute;
					bottom: 0;
					left: 0;
					height: 130rpx;
					width: 100%;
				}

				.cover-info {
					position: absolute;
					box-sizing: border-box;
					width: 100%;
					bottom: 0;
					left: 0;
					padding: 20rpx;
					display: -webkit-flex;
					display: flex;
					-webkit-justify-content: space-between;
					justify-content: space-between;
					-webkit-align-items: center;
					align-items: center;
					-webkit-flex-flow: row nowrap;
					flex-flow: row nowrap;
					color: rgba(255, 255, 255, 1);
					font-size: 24rpx;
					font-weight: 500;
				}
			}

			.infos {
				position: relative;
				padding: 20rpx;

				.title {
					margin-top: 12rpx;
					color: #121212;
					font-size: 30rpx;
					font-weight: 500;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.description {
					color: #a8a8a8;
					margin-top: 10rpx;
					font-size: 24rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					line-height: 40rpx;
				}
			}
		}

		.normal-more {
			position: relative;
			height: 72rpx;
			width: 346rpx;
			background-color: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;
			margin-left: 50%;
			transform: translateX(-50%);

			&::after {
				content: '';
				display: block;
				position: absolute;
				width: 200%;
				height: 200%;
				transform: scale(0.5);
				border-top-width: 0.5px;
				border-right-width: 0.5px;
				border-bottom-width: 0.5px;
				border-left-width: 0.5px;
				border-top-style: solid;
				border-right-style: solid;
				border-bottom-style: solid;
				border-left-style: solid;
				border-top-color: rgb(231, 231, 231);
				border-right-color: rgb(231, 231, 231);
				border-bottom-color: rgb(231, 231, 231);
				border-left-color: rgb(231, 231, 231);
				border-image-source: initial;
				border-image-slice: initial;
				border-image-width: initial;
				border-image-outset: initial;
				border-image-repeat: initial;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;
				border-bottom-right-radius: 30px;
				border-bottom-left-radius: 30px;
			}

			.normal-more-text {
				height: 24rpx;
				line-height: 1;
				color: rgba(168, 168, 168, 1);
				font-size: 24rpx;
			}

			.normal-more-icon {
				transform: rotate(0);
				width: 24rpx;
				height: 24rpx;
				margin-left: 14rpx;

			}
		}
	}
	
	.more-news{
		padding: 30rpx;
	}
	.adview {
		position: relative;
		padding:30rpx;
		.adtext {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			padding: 5rpx 20rpx;
			background: #333;
			color: #fff;
			font-size: 24rpx;
		}
	
		image {
			width: 690rpx;
			height: 200rpx;
		}
	}
</style>
