<template>
	<view class="wrap">
		<view style="position: absolute;">
			<u-navbar @leftClick="onBack" leftIconColor="#fff" bgColor="unset" :border-bottom="false"></u-navbar>
		</view>
		<view class="head">
			<image mode="aspectFill" class="bg" :src="topicInfo.bg_image"></image>
			<view class="head-c">
				<view class="name">{{ topicInfo.name }}</view>
				<view class="count">
					<text>{{ topicInfo.user_num }}人已加入</text>
					<text>{{ topicInfo.post_num }}篇内容</text>
					<view class="tool-menu-wrap">
						<navigator class="m-item" :url="'/pages/topic/setting?id=' + topicId">
							<u-icon name="/static/set.png" :size="18"></u-icon>
						</navigator>
						<view class="m-item" @click="showShare = true">
							<u-icon name="/static/share_1.png" :size="18"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 简介 -->
		<view class="member-wrap">
			<view class="member-wrap-head">
				<text class="notice-txt u-line-1">{{ topicInfo.description | replace }}</text>
			</view>
		</view>
		<!-- 置顶 -->
		<view class="post-top-box" v-if="topicInfo.top_post.length > 0">
			<navigator @longpress="onTopDel(item, index)" class="post-item" :url="'/pages/post/detail?id=' + item.id"
				v-for="(item, index) in topicInfo.top_post" :key="index">
				<view class="tag">置顶</view>
				<view class="title">{{ item.title || item.content.substring(0, 15) }}</view>
			</navigator>
		</view>
		<!-- 分类tab -->
		<view class="tabs-box u-skeleton-rect">
			<view class="tab-left">
				<u-tabs :list="tabList" lineColor="#000" :is-scroll="false" :current="current" @change="tabsChange">
				</u-tabs>
			</view>
		</view>
		<view v-show="current == 0">
			<q-post-list :showTopic="false" :handle="true" :uid="topicInfo.uid" :list="postNews"
				:loadStatus="loadStatus" :admin="topicInfo.is_admin"></q-post-list>
		</view>
		<view v-show="current == 1">
			<q-post-list :showTopic="false" :handle="true" :uid="topicInfo.uid" :list="postHot" :loadStatus="loadStatus"
				:admin="topicInfo.is_admin"></q-post-list>
		</view>
		<!-- 加入圈子弹窗 -->
		<u-modal :show="joinTopicModel" :show-cancel-button="true" @cancel="joinTopicModel = false" confirm-text="加入圈子"
			:content="'是否加入【' + topicInfo.name + '】?'" @confirm="joinTopic"></u-modal>
		<!-- 选择分享弹窗 -->
		<u-popup :show="showShare" mode="bottom" border-radius="20" @close="showShare = false">
			<view class="share-type">
				<button open-type="share" class="type-item u-reset-button">
					<u-icon class="icon" name="weixin-fill" color="#00b33c"></u-icon>
					<text>发给微信好友</text>
				</button>
			</view>
		</u-popup>
		<!-- 发布按钮 -->
		<view @click="handelAdd" class="plus-box u-skeleton-circle">
			<u-icon name="plus" color="#fff"></u-icon>
		</view>
		<!-- 发布弹窗 -->
		<u-popup :show="showPlusPost" mode="bottom" border-radius="20" width="80%">
			<view class="post-add-popup">
				<view @click="onTrigger(1)" class="p-item">
					<image mode="widthFix" class="icon" src="/static/h_2.png"></image>
					<text class="txt">发布帖子</text>
				</view>
				<view @click="onTrigger(2)" class="p-item">
					<image mode="widthFix" class="icon" src="/static/h_3.png"></image>
					<text class="txt">发布视频</text>
				</view>
				<view @click="onTrigger(3)" class="p-item">
					<image mode="widthFix" class="icon" src="/static/h_1.png"></image>
					<text class="txt">发布投票</text>
				</view>
			</view>
			<view class="handle-close">
				<u-icon @click="showPlusPost = false" name="close"></u-icon>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				showPlusPost: false,
				showShare: false,
				joinTopicModel: false,
				current: 0,
				tabList: [{
						name: '最新'
					},
					{
						name: '最热'
					}
				],
				topicId: 0,
				topicInfo: {
					member_list: [],
					discuss_list: [],
					top_post: [],
					description: '',
					userInfo: {
						username: ''
					}
				},
				postHot: [],
				postNews: [],
				loadStatus: 'loading',
				page1: 1,
				page2: 1
			};
		},
		onLoad(options) {
			this.topicId = options.id;

			if (options.scene) {
				this.topicId = options.scene;
			}

			this.getTopicInfo();
			this.getPostList();
		},
		onReachBottom() {
			if (this.current == 0) {
				this.page1++;
			}

			if (this.current == 1) {
				this.page2++;
			}

			this.getPostList();
		},
		onPullDownRefresh() {
			if (this.current == 0) {
				this.page1 = 1;
				this.postNews = [];
			}

			if (this.current == 1) {
				this.page2 = 1;
				this.postHot = [];
			}

			this.getPostList();
			this.getTopicInfo();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: this.topicInfo.name + '-' + this.topicInfo.description,
				path: '/pages/topic/detail?id=' + this.topicId,
				imageUrl: this.topicInfo.bg_image
			};
		},
		onShareTimeline() {
			return {
				title: this.topicInfo.name + '-' + this.topicInfo.description,
				imageUrl: this.topicInfo.bg_image,
				query: 'id=' + this.topicId
			};
		},
		filters: {
			substr: function(e) {
				return e.substr(0, 5);
			},
			replace(str) {
				str = str.replace(/\n/g, '');
				return str;
			}
		},
		methods: {
			onTopDel(e, index) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否解除置顶?',
					success: function(res) {
						if (res.confirm) {
							that.$H
								.post('post/topPostDel', {
									post_id: e.id,
									topic_id: e.topic_id
								})
								.then(res => {
									if (res.code == 200) {
										that.topicInfo.top_post.splice(index, 1);
									}
								});
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			onBack() {
				let pages = getCurrentPages();
				if (pages.length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},
			tabsChange(e) {
				let index = e.index;
				this.current = index;
				if (index == 1 && this.postHot.length == 0) {
					this.getPostList();
				}
			},
			onTrigger(type) {
				if (!this.topicInfo.is_join) {
					this.joinTopicModel = true;
					return;
				}

				this.showPlusPost = false;
				if (type == 3) {
					uni.navigateTo({
						url: '/pages/post/vote?topic_id=' + this.topicId
					});
				} else {
					uni.navigateTo({
						url: '/pages/post/add?topic_id=' + this.topicId + '&topic_name=' + this.topicInfo
							.name + '&type=' + type
					});
				}
			},
			handelAdd() {
				if (this.$store.state.hasLogin) {
					if (this.topicInfo.is_join) {
						this.showPlusPost = true;
					} else {
						this.joinTopicModel = true;
					}
				} else {
					uni.navigateTo({
						url: '/pages/user/login'
					});
				}
			},
			joinTopic() {
				this.$H
					.post('topic/joinTopic', {
						id: this.topicId
					})
					.then(res => {
						if (res.code === 200) {
							this.topicInfo.is_join = true;
							this.joinTopicModel = false;
						}
					});
			},
			getTopicInfo() {
				this.$H
					.get('topic/detail', {
						id: this.topicId
					})
					.then(res => {
						this.topicInfo = res.result;
						this.loading = false;
					});
			},
			getPostList() {
				this.loadStatus = 'loading';
				let page = this.page1;
				let order = 'id desc';

				if (this.current == 1) {
					page = this.page2;
					order = 'see_num desc';
				}

				this.$H
					.get('post/list', {
						topic_id: this.topicId,
						page: page,
						order: order
					})
					.then(res => {
						if (this.current == 0) {
							this.postNews = this.postNews.concat(res.result.data);
						}

						if (this.current == 1) {
							this.postHot = this.postHot.concat(res.result.data);
						}

						if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
						}
					});
			}
		}
	};
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.wrap {
		height: calc(100vh);
	}

	.mg-left-20 {
		margin-left: 20rpx;
	}

	.tabs-box {
		margin-top: 20rpx;
		background-color: #ffffff;

		.tab-left {
			width: 30%;
		}
	}

	/*  */
	.notice-txt {
		color: #999;
		font-size: 12px;
	}

	.grid-text {
		font-size: 12px;
		color: #616161;
		margin-bottom: 30rpx;
	}

	.head {
		position: relative;
		height: 380rpx;
	}

	.head-c {
		position: absolute;
		top: 200rpx;
		left: 30rpx;
		right: 30rpx;
		display: flex;
		flex-direction: column;
		color: #fff;
	}

	.head-c .count {
		font-size: 10px;
		display: flex;
		align-items: center;
	}

	.head-c .count text {
		margin: 0 5rpx;
		color: #e6e6e6;
	}

	.head-c .name {
		font-size: 20px;
		font-weight: bold;
		display: block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		white-space: pre-wrap;
		overflow: hidden;
	}

	.margin-left {
		margin-left: auto;
		margin-right: 20rpx;
	}

	.head .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* 管理员 */
	.member-wrap {
		padding: 30rpx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.member-wrap .avatar {
		margin-bottom: 10rpx;
	}

	.member-wrap .member-wrap-head {
		display: flex;

		.user-num {
			margin-left: auto;
			color: #999;
		}

		.icon {
			margin-left: auto;
			color: #999;
		}
	}

	// 置顶
	.post-top-box {
		background-color: #fff;
		padding: 20rpx;
	
	.post-item {
			display: flex;
			align-items: center;
			padding: 20rpx;
			font-size: 28rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.tag {
				background-color: #333;
				color: #fff;
				padding: 0 10rpx;
				border-radius: 10rpx;
				font-size: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}

	// 分享类型弹窗
	.share-type {
		padding: 50rpx 30rpx;
	
	.type-item {
			background-color: #f5f5f5;
			padding: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			&:nth-child(2) {
				margin: 20rpx 0;
			}
		}
	}

	// 发布弹窗
	.post-add-popup {
		display: flex;
		padding: 50rpx 0;

		.p-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 20rpx 0;
			border-radius: 20rpx;

			.icon {
				width: 100rpx;
				margin-bottom: 20rpx;
			}

			.txt {
				font-size: 28rpx;
			}
		}
	}

	.handle-close {
		display: flex;
		justify-content: center;
		margin-bottom: 50rpx;
	}

	.tool-menu-wrap {
		margin-left: auto;
		display: flex;

		.m-item {
			padding: 15rpx;
			background-color: rgba(0, 0, 0, 0.4);
			margin: 0 10rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
