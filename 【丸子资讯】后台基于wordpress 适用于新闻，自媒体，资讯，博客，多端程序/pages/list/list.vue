<template>
	<view class="content">
		<view class="info-banner-wrapper" style="height:494rpx;">
			<image class="banner" mode="aspectFill" :src="cover"></image>
			<view class="banner-cover"></view>
			<view class="info-wrapper">
				<view class="base-wrapper">
					<image class="avatar" mode="aspectFill" :src="cover"></image>
					<view class="text-wrapper">
						<view class="name">{{category}}</view>
						<view bindtap="showIntrofun" class="detail-wrapper" v-if="description">
							<view class="introduction">
								<label class="introduction-title">简介</label>
								<label class="introduction-detail">{{description}}</label>
							</view>
							<image class="arrow img" src="/image/common-arrow-right-white.png"></image>
						</view>
					</view>
				</view>
				<view class="other-wrapper">
					<view class="count">{{count+'条内容'}}</view>
					<view class="controls">

						<button class="share-button" openType="share">
							<image class="icon img" src="@/static/images/common-share-white.png"></image>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="article-List">
			<article-list :posts="posts"></article-list>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				id:'',
				description: '',
				cover: '',
				category: '',
				count: '',
				page:1,
				posts:[],
				status: "loading",
			}
		},
		onLoad(options) {
			this.getCategoryByID(options.id)
			this.id=options.id;
			this.getPostsList({
				categories:options.id,
				page: this.page
			})
		},
		onReachBottom() {
			if(!this.isLastPage){
				this.getPostsList({
					categories:this.id,
					page:this.page
				})
			}
		},
		methods: {

			getCategoryByID: function(id) {
				API.getCategoryByID(id).then(res => {
						this.cover = res.cover
						this.category = res.name
						this.description = res.description
						this.count = res.count
						uni.setNavigationBarTitle({
							title: res.name
						})
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
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.info-banner-wrapper {
		position: relative;
		width: 100%;
	}

	.info-banner-wrapper .banner {
		width: 100%;
		height: 100%;
	}

	.info-banner-wrapper .banner-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .88));
	}

	.info-banner-wrapper .info-wrapper {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 20rpx;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .avatar {
		margin-left: 32rpx;
		-webkit-box-flex: 0;
		flex: 0 0 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper {
		margin: 0 32rpx 0 20rpx;
		-webkit-box-flex: 1;
		flex: 1;
		width: 0;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .name {
		color: #fff;
		font-size: 34rpx;
		font-weight: 500;
		line-height: 50rpx;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .detail-wrapper {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .detail-wrapper .introduction {
		width: 0;
		-webkit-box-flex: 1;
		flex: 1;
		color: #fff;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .detail-wrapper .introduction .introduction-title {
		border: 2rpx solid #fff;
		border-radius: 4rpx;
		padding: 0rpx 6rpx;
		color: #fff;
		font-size: 22rpx;
		line-height: 26rpx;
		display: inline-block;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .detail-wrapper .introduction .introduction-detail {
		margin-left: 4rpx;
		color: #fff;
		font-size: 26rpx;
		line-height: 36rpx;
	}

	.info-banner-wrapper .info-wrapper .base-wrapper .text-wrapper .detail-wrapper .arrow {
		margin-left: 4rpx;
		margin-bottom: 16rpx;
		-webkit-box-flex: 0;
		flex: 0 0 16rpx;
		height: 16rpx;
		align-self: flex-end;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper {
		margin-top: 24rpx;
		margin-bottom: 34rpx;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .count {
		margin-left: 32rpx;
		color: hsla(0, 0%, 100%, .8);
		font-size: 26rpx;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls {
		margin: 0 32rpx 0 auto;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .join-button {
		background-color: #f8f8f8;
		width: 168rpx;
		height: 56rpx;
		line-height: 56rpx;
		border-radius: 30rpx;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .join-button .icon {
		width: 20rpx;
		height: 20rpx;
		margin-right: 8rpx;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .join-button .text {
		color: #434343;
		font-size: 28rpx;
		font-weight: 500;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .join-button.already {
		background-color: #9f9f9f;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .join-button.already .text {
		color: #fff;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .share-button {
		margin: 0 0 0 24rpx;
		padding: 0;
		width: 84rpx;
		height: 52rpx;
		border: 2rpx solid hsla(0, 0%, 100%, .9);
		background-color: hsla(0, 0%, 100%, .25);
		border-radius: 30rpx;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .share-button .icon {
		width: 40rpx;
		height: 40rpx;
	}

	.info-banner-wrapper .info-wrapper .other-wrapper .controls .share-button:after {
		border: none;
	}

	.article-List {
		background-color: #fff;
		position: absolute;
		left: 0;
		width: 100%;
		margin-top: -24rpx;
		border-radius: 24rpx 24rpx 0 0;
	}
</style>
