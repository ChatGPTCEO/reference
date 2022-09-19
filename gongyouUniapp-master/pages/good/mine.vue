<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="comment" v-if="res.privacy == '公开' && current==0" v-for="(res, index) in commentList">

			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">
					<u-avatar @click="userinfo(res)" :src="res.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;justify-content: space-between;">
						<view>{{res.uname}}</view>
						<view style="display: flex;">
							<view @click="comment(res)">{{res.pubDate}}
							</view>
						</view>

					</view>

				</view>
				<view class="content" @click="comment(res)">{{ res.content }}</view>
				<view class="reply-box" v-if="res.pocUrl != false">
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

				<view style="margin-left: 20rpx;font-size: 25rpx;color: gray;margin-bottom: 10rpx;">
					<view>
						最新回复于{{res.repDate}}
					</view>
				</view>
				<view class="bottom">
					<view class="weibo-handle">
						<view class="comment-group" @click="comment(res)">
							<image src="../../static/comment.png" />{{res.comNum}}
						</view>
						<view>
							<u-button type="warning" size="mini" shape="circle" @click="shanchu(res)">删除收藏</u-button>
						</view>
					</view>

				</view>

			</view>

		</view>

		<view v-if="current==1" class="comment1" v-for="(res, index) in yuepaiList">
			<view class="left" @click="userinfo(res.pid)">
				<image :src="res.pava" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.pname }}
						<u-icon v-if="res.pgender == '男'" size="25" name="../../../static/boy.png"></u-icon>
						<u-icon v-if="res.pgender == '女'" size="25" name="../../../static/girl.png"></u-icon>
					</view>
					<view class="identity">{{res.identity}}</view>
				</view>
				<view class="title"  @click="console(res)">{{res.title}}·{{res.payment}}</view>
				<view class="content" @click="console(res)">
					{{ res.content }}</view>
				<view class="reply-box">
					<view style="margin-top: 20upx;display: grid;">
						<scroll-view scroll-x="true" class="pic" style="width: 100%;overflow:hidden;white-space:nowrap;">
							
							
						<!-- 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList" :src="res1" mode="aspectFill"
							 style="width:220rpx;height:220rpx;margin-bottom: 10rpx;margin-right: 10rpx;"></image>
							 -->
							 <view v-if="res.urlsList.length == 1"
							 	style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList"
							 		:src="res1" mode="aspectFill" style="width: 100%;"></image>
							 </view>
							 <view v-if="res.urlsList.length == 2 || res.urlsList.length == 4"
							 	style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList"
							 		:src="res1" mode="aspectFill"
							 		style="width:280rpx;height:334rpx;margin-bottom: 10rpx;"></image>
							 </view>
							 <view v-if="res.urlsList.length == 3 || res.urlsList.length == 6"
							 	style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList"
							 		:src="res1" mode="aspectFill"
							 		style="width:180rpx;height:220rpx;margin-bottom: 10rpx;"></image>
							 </view>
							 <view v-if="res.urlsList.length == 5"
							 	style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
							 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList"
							 		:src="res1" mode="aspectFill"
							 		style="width:180rpx;height:220rpx;margin-bottom: 10rpx;"></image>
							 	<view style="width:180rpx;height:220rpx;"></view>
							 </view>
							 
						</scroll-view>
					</view>
				</view>
				<view class="bottom">
					<view class="time">{{res.pubDate}}
						<view style="margin-top: 10rpx;display: flex;align-items: center;">
							<view>
								<u-tag style="margin-left: 10rpx;" v-for="(inss,indess) in res.ptagsList" class="tag" shape="circle" :text="inss"
								 mode="plain" />
							</view>
							<view style="position: absolute;right: 0;font-size: 30rpx;">
								<u-button type="warning" size="mini" shape="circle" @click="shanchu2(res)">删除收藏</u-button>
							</view>
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
				yuepaiList: [],
				list: [{
					name: '圈子'
				}, {
					name: '约拍'
				}],
				current: 0
			}
		},
		onLoad() {
			//获取动态列表
			this.init();
		},
		methods: {
			//跳转个人中心
			userinfo(res) {
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res
				})
			},
			//点击详情页
			console(res) {

				uni.navigateTo({
					url: '../yuepai/detail/detail?id=' + res.id
				})

			},
			change(index) {
				this.current = index;
				if (this.current == 0) {
					this.init();
				} else if (this.current == 1) {
					this.yuepaiSC();
				}
			},
			yuepaiSC() {
				api.request({
					url: '/yuePai/getYuepaiByShoucangYId',
					method: 'GET',
					data: {
						userId: this.u_id
					},
				}).then(res=>{
					this.yuepaiList = res.data
				})
			},
			//删除约拍
			shanchu2(res) {
				let id = res.id//约拍主键id
				api.request({
					url: '/shoucangY/cancelShoucangY',
					method:'GET',
					data: {
						yId: id,
						userId:this.u_id
					},
				}).then(res=>{
					if (res.data.data == 1) {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'error'
						})
						this.yuepaiSC();
					}
				})
			},
			//删除圈子
			shanchu(res) {
				let id = res.id//topic主键id
				api.request({
					url: '/shouCang/deleteSc',
					method:'POST',
					data: {
						tid: id,
						uid:this.u_id
					},
				}).then(res=>{
					if (res.data.data == 1) {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'error'
						})
						this.init();
					}
				})
			},
			//跳转到评论详情
			comment(res) {

				uni.navigateTo({
					url: '../quanzi/comment?id=' + res.id + '&name=' + res.uname
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
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId
						api.request({
							url: '/circle/getTopicByShoucangId',
							method: 'GET',
							data: {
								userId: this.u_id
							},
						}).then(res=>{
							this.commentList = res.data
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment1 {
		display: flex;
		padding: 30rpx;
		background: white;
		margin-bottom: 20rpx;

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
			padding-left: 20rpx;
			font-size: 30rpx;

			.title {
				margin-bottom: 20rpx;
				margin-top: 15rpx;
				font-size: 35rpx;
				color: gray;
			}

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
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
				margin-bottom: 10rpx;
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
				position: relative;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}

	.num {
		display: inline;
	}

	.wrap {
		background: #eeeeee;
		height: 100%;
		width: 100%;
	}

	.comment {
		margin-top: 15rpx;
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
				margin-left: 20rpx;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
				margin-right: 20rpx;
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

				// .weibo-handle .favor{
				// 	background: #ffffff;
				// }
			}
		}
	}
</style>
