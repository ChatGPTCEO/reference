<template>
	<view class="contens">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title">
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search @click="gotoSearch" v-model="keyword" :show-action="showAction" :disabled="true" height="64" :clearabled="true">
					</u-search>
				</view>
			</view>
		</u-navbar>
		<view class="tabs">
			<u-tabs :list="tabs" :active-color="activeColor" :is-scroll="false" :current="current" @change="change">
			</u-tabs>
		</view>
		<view class="taglist" v-if="current==0">
			<block v-for="(item,index) in tags" :key="index">
				<tag-list :taglist="item"></tag-list>
			</block>
			<view class="loading">
				<u-loadmore :status="status" />
			</view>
		</view>
		<view class="ranklist" v-if="current==1">
			<view class="rankMenu">
				<view class="menuItem" @tap="munuTape(index)" :class="cut==index?'active':''"
					v-for="(item,index) in menu" :key="index">
					{{item.name}}
				</view>
			</view>
			<view class="rank">
				<article-list :posts="posts"></article-list>
			</view>
		</view>
		<view class="videolist" v-if="current==2">
			<view class="video">
				<article-list :posts="posts"></article-list>
			</view>
			<u-loadmore :status="status" />
		</view>
		<view class="videolist" v-if="current==3">
			<view @tap="onItemClick(item.id)" class="item-container" v-for="(item,index) in messageList" :key="index">
				<view style="width: 100%; height: 0.5px; background: #EDEDED"></view>
				<view class="item">
					<image class="item-avatar" mode="aspectFill" src="@/static/images/msgmsg.png"></image>
					<view class="item-middle">
						<text class="item-middle-name">{{item.type}}</text>
						<rich-text :nodes="item.title" class="item-middle-content"></rich-text>
						<text class="item-middle-time">查看详情></text>
						<text class="item-middle-time">{{item.date}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				isBack: false,
				title: " ",
				tabs: [{
					name: '专题'
				}, {
					name: '排名'
				}, {
					name: '视频',
				}, {
					name: '通知',
				}],
				menu: [{
					name: '热门阅读'
				}, {
					name: '热门点赞'
				}, {
					name: '热门收藏',
				}, {
					name: '热评文章',
				}],
				current: 0,
				showAction: true,
				isFixed: true,

				keyword: '',
				background: {
					backgroundColor: '#fff',

				},
				tags: [],
				posts: [],
				messageList: [],
				pages: 1,
				activeColor: '#434343',
				cut: 0,
				status: "loading",
			}
		},
		onLoad() {
			this.getTags()
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user;
		},
		onReachBottom() {
			if(this.current==0&&!this.isLastPage){
				this.getTags({
					page:this.pages
				})
			}else if(this.current==2&&!this.isLastPage){
				this.getVideoList({
					page:this.pages
				})
			}
			else if(this.current==3&&!this.isLastPage){
				this.getMessages({
					type: 'system',
					page: this.pages,
				});
			}
			
		},
		methods: {

			getTags: function(args) {
				API.getTagsList(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"
						}
						this.pages = this.pages + 1
						this.tags = this.tags.concat(res)
					})
					.catch(err => {})
			},
			gotoSearch: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			change: function(e) {
				this.current = e;
				this.tags = [];
				this.pages = 1;
				this.messageList=[];
				this.status = "loading";
				this.cut = 0;
				this.posts = [];
				this.isLastPage=false;
				switch (e) {
					case 0:
						this.getTags();
						break;
					case 1:
						this.getMostViewsPosts();
						break;
					case 2:
						this.getVideoList();
						break;
					case 3:
						this.getMessages({
							type: 'system',
							page: this.pages,
						});

				}
			},

			getMostViewsPosts: function(data) {
				API.getMostViewsPosts(data).then(res => {
						this.posts = this.posts.concat(res);
						this.pages = this.pages + 1;
					})
					.catch(err => {})
			},

			getMostLikePosts: function() {
				API.getMostLikePosts().then(res => {
						this.posts = this.posts.concat(res);
						this.pages = this.pages + 1;
					})
					.catch(err => {})
			},

			getMostFavPosts: function() {
				API.getMostFavPosts().then(res => {
						this.posts = this.posts.concat(res);
						this.pages = this.pages + 1;
					})
					.catch(err => {

					})
			},

			getMostCommentPosts: function() {
				API.getMostCommentPosts().then(res => {
						this.posts = this.posts.concat(res);
						this.pages = this.pages + 1;
					})
					.catch(err => {

					})
			},
			getVideoList: function() {
				API.getVideoList().then(res => {
					if (res.length < 10) {
						this.isLastPage = true;
						this.status = "nomore"
					}
					this.posts = this.posts.concat(res);
					this.pages = this.pages + 1;
				}).catch(err => {

				})
			},


			getMessages: function(args) {
				let that = this;
				if (!this.user) {
					uni.navigateTo({
						url: '../login/login',
					})
					return
				}
				API.getMessage(args).then(res => {
					if (res.length < 10) {
						this.isLastPage= true
					}
					this.messageList = this.messageList.concat(res)
					this.pages = this.pages + 1
				}).catch(err => {

				})
			},
			munuTape: function(index) {
				this.cut = index;
				this.pages = 1;
				this.posts = [];
				switch (index) {
					case 0:
						this.getMostViewsPosts();
						break;
					case 1:
						this.getMostLikePosts();
						break;
					case 2:
						this.getMostFavPosts();
						break;
					case 3:
						this.getMostCommentPosts();
						break;
				}
			},
			onItemClick:function(id){
				uni.navigateTo({
					url:'../message/message?id='+id
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.taglist {
		padding: 80rpx 30rpx;
	}
	
	.loading{
		padding-top:30rpx;
	}

	.slot-wrap {
		padding:20rpx 30rpx;
		width:100%;
	}

	.tabs {
		position: fixed;
		z-index: 999;
		width: 100%;
		box-shadow: 0px 10px 50px #f9f9f9;
	}

	.ranklist {
		padding: 60rpx 0rpx;

		.rankMenu {
			padding: 60rpx 30rpx 30rpx 30rpx;
			position: fixed;
			width: 100%;
			background: #fff;
			z-index: 99;

			.active {
				color: #fff !important;
				background: #586d72 !important;
			}

			.menuItem {
				min-width: 10vw;
				padding: 0 20rpx;
				background-color: #f0f3f7;
				color: #97a9ac;
				height: 60rpx;
				border-radius: 60rpx;
				margin-right: 12rpx;
				font-size: 24rpx;
				display: inline-block;
				line-height: 60rpx;
				text-align: center;
			}
		}

		.rank {
			padding-top: 120rpx;
		}
	}

	.videolist {
		padding: 60rpx 0rpx;
	}
	
	.item-container {
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	  box-sizing: border-box;
	  
	  .item {
	    position: relative;
	    width: 100%;
	    min-height: 216rpx;
	    display: flex;
	    flex-direction: row;
	    justify-content: flex-start;
	    align-items: flex-start;
	    box-sizing: border-box;
	    padding: 0 32rpx;
	    padding-top: 34rpx;
	    padding-bottom: 32rpx;
	    background: #FFFFFF;
		
		.item-avatar {
		  width: 80rpx;
		  height: 80rpx;
		  border-radius: 40rpx;
		}
		
		.item-middle {
		  width: 480rpx;
		  display: flex;
		  flex-direction: column;
		  justify-content: flex-start;
		  align-items: flex-start;
		  box-sizing: border-box;
		  margin-left: 24rpx;
		  
		  .item-middle-name {
		    font-size: 28rpx;
		    color: #576B95;
		  }
		  
		  .item-middle-content {
		    font-size: 28rpx;
		    color: #333333;
		    margin-top: 8rpx;
		    font-weight: 500;
		  }
		  
		  .item-middle-time {
		    font-size: 24rpx;
		    color: #999999;
		    margin-top: 26rpx;
		  }
		  
		  .item-right-text {
		    position: absolute;
		    width: 100rpx;
		    right: 32rpx;
		    line-height: 40rpx;
		    text-align: center;
		    align-self: center;
		    font-size: 24rpx;
		    color: #999999;
		  }
		  
		  .item-right {
		    position: absolute;
		    right: 32rpx;
		    width: 32rpx;
		    height: 34rpx;
		    align-self: center;
		  }

		}
	  }
	}
</style>
