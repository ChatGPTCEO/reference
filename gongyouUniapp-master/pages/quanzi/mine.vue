<template>
	<view class="wrap">
		<view class="comment" v-for="(res, index) in commentList">
			<u-modal v-model="show" :show-cancel-button="true" :content="content" @confirm="confirm" @cancel="cancel"></u-modal>
			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;" @click="userinfo">
					<u-avatar @click="userinfo(res)" :src="res.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;justify-content: space-between;">
						<view>{{res.uname}}</view>
						<view style="display: flex;justify-content: space-between;">
							<view>{{res.pubDate}}
							</view>

						</view>


					</view>

				</view>
				<view class="content" @click="comment(res)">{{ res.content }}</view>
				<view class="reply-box" v-if="res.pocUrl.length != 0">
					<view v-if="res.pocUrl.length == 1" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width: 100%;"></image>
					</view>
					<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width:334rpx;height:334rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="res.pocUrl.length == 3 || res.pocUrl.length == 6 || res.pocUrl.length == 7" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width:220rpx;height:220rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="res.pocUrl.length == 5 || res.pocUrl.length == 8" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width:220rpx;height:220rpx;margin-bottom: 10rpx;"></image>
						<view style="width:220rpx;height:220rpx;"></view>
					</view>
					<view v-if="res.pocUrl.length == 9" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="margin-bottom: 10rpx;width:220rpx;height:220rpx;"></image>
					</view>
				</view>
				<view class="bottom">
					<view class="weibo-handle">

						<view class="comment-group" @click="comment(res)">
							<image src="../../static/comment.png" />{{res.comNum}}
						</view>
						<view>
							<u-button type="error" size="medium" shape="circle" @click="shanchu(res.id)">删除</u-button>
						</view>

					</view>

				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				u_id: '',
				scrollTop: 0,
				commentList: [],
				show: false,
				t_id: '',
				content: '您确认要删除该内容吗？'
			}
		},
		onLoad(res) {
			//获取动态列表
			this.u_id = res.id;
			this.getComment();
		},
		onShow() {
			this.getComment();
		},
		onPullDownRefresh: function() {
			this.getComment();
		},
		//返回顶层
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			//删除圈子
			shanchu(res) {
				this.t_id = res
				this.show = true;
				//console.log(this.t_id)
			},
			//删除圈子
			confirm() {
				//let that = this;
				api.request({
					url:'/circle/delTopicById',
					method: 'GET',
					data: {
						tid: this.t_id
					},
				})
				this.getComment();
			},
			//取消事件
			cancel() {
				uni.showToast({
					title: '您已取消！'
				})
			},
			//跳转个人中心
			userinfo(res) {
				//console.log(res)
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res.uid
				})
			},
			//跳转评论详情
			comment(res) {
				//console.log(res);
				uni.navigateTo({
					url: './comment?id=' + res.id
				})
			},
			//图片预览
			previewImage(current, photos) {
				uni.previewImage({
					current,
					urls: photos
				})
			},
          //信息初始化
			getComment() {
				uni.showLoading({
					title: '加载中'
				})
				api.request({
					url: '/circle/getCircleByUserId',
					method: 'GET',
					data: {
						userId: this.u_id
					},
				}).then(res=>{
					this.commentList = res.data.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background: #e3e3e3;
	}

	.comment {
		background: #ffffff;
		display: flex;
		border-radius: 20rpx;
		//padding: 30rpx;
		//margin-top: 10rpx;
		margin-bottom: 20rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;

		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}

		.pic {
			.img_wrapper {
				width: 220upx;
				height: 150upx;
				margin-right: 15upx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			//padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					position: absolute;
					left: 110rpx;

				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				//margin-bottom: 10rpx;
				margin-left: 10rpx;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
			}

			.reply-box {
				//background-color: rgb(242, 242, 242);
				//border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.test {
				float: left;
				padding: 15rpx;
			}

			.img {
				display: flex;
			}

			.bottom {
				//margin-top: 20rpx;
				// margin-left: 10rpx;
				// display: flex;
				// font-size: 24rpx;
				// color: #9a9a9a;
				// margin-bottom: 10rpx;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

				.weibo-handle {
					display: flex;
					//padding-top: 15rpx;
					font-size: 28rpx;
					padding-bottom: 25rpx;
				}

				.weibo-handle image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}

				.weibo-handle view {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.weibo-handle .comment-group {
					background: #ffffff;
				}

				.weibo-handle .praise-group {
					background: #ffffff;
				}
			}
		}
	}
</style>
