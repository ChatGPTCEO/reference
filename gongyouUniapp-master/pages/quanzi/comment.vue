<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<view class="comment" v-for="(res, index) in commentList">
			<view class="right">
				<view class="top" @click="userinfo(res.uid)">
					<u-avatar :src="res.uava"></u-avatar>
					<view class="name">{{ res.uname }}
						<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '男'" size="30"
							name="../../../static/boy.png"></u-icon>
						<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '女'" size="30"
							name="../../../static/girl.png"></u-icon>
					</view>

				</view>
				<view class="content" @click="reply(res)">{{ res.content }}</view>
				<view class="reply-box">
					<view v-if="res.pocUrl.length == 1"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width: 100%;"></image>
					</view>
					<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.upocUrlrl)" v-for="(res1, index1) in res.pocUrl"
							:src="res1" mode="aspectFill" style="width:334rpx;height:334rpx;margin-bottom: 10rpx;">
						</image>
					</view>
					<view v-if="res.pocUrl.length == 3 || res.pocUrl.length == 6 || res.pocUrl.length == 7"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width:220rpx;height:220rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="res.pocUrl.length == 5 || res.pocUrl.length == 8"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width:220rpx;height:220rpx;margin-bottom: 10rpx;"></image>
						<view style="width:220rpx;height:220rpx;"></view>
					</view>
					<view v-if="res.pocUrl.length == 9"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="margin-bottom: 10rpx;width:220rpx;height:220rpx;"></image>
					</view>
				</view>
				<view class="bottom">
					{{ res.pubDate }} <!-- 定位信息 -->
					<view class="place">
						<u-icon name="map" color="#2979ff" size="28"></u-icon>{{res.place}}
					</view>
				</view>

				<view style="padding: 10rpx;">
					<view style="display: flex;">
						<view style="margin-right: 25rpx;">评论</view>
						<view>{{res.comNum}}条</view>
					</view>
				</view>
				<view>
				</view>
			</view>
		</view>
		<!-- 回复信息 -->
		<view style="margin-bottom: 150rpx;margin-left: 15rpx;margin-right: 15rpx;">
			<view class="reply" v-for="(ies,idx) in replyList">
				<view class="left" @click="userinfo(ies.uid)">
					<image :src="ies.rava" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{ies.rname}}
						</view>
						<view class="time">{{ies.rdate}}</view>
					</view>
					<!-- 点击回复 -->
					<view class="content" @click="reply1(ies)">{{ies.rcont}}</view>
					<view class="reply-box">

					</view>
					<view class="bottom">
						<view style="background: #ececec;height:100%;width: 100%;color: #000000;border-radius: 15rpx;">

							<view v-if="inx.rid == ies.id" @click="reply2(inx)" v-for="(inx,index) in replys"
								style="margin-left: 10rpx;">

								<text style="margin-right: 10rpx;color: #007AFF;">{{inx.name}}</text> 回复 <text
									style="margin-left: 10rpx;">{{inx.rname}}</text>
								：
								{{inx.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="text-align: center;font-size: 20rpx;color: #d0d0d0;margin-top: 50rpx;">
				<text>我也是有底线的~</text>
			</view>
		</view>

		<view class="input">
			<view style="width: 85%;">
				<u-input v-model="value" :placeholder="'回复：'+placeholder" :type="type" height="100" :border="border">
				</u-input>
			</view>
			<view @click="submit"
				style="width: 100rpx;position: absolute;height: 75rpx;right: 3px;padding: 20rpx;color: white;background: #554d84;border-radius: 25rpx;">
				<text>发布</text>
			</view>
		</view>
		<u-action-sheet :list="list" @click="shanchu1" v-model="show"></u-action-sheet>
		<u-action-sheet :list="list2" @click="shanchu2" v-model="show2"></u-action-sheet>
	</view>



</template>

<script>
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				time: '',
				id: null, //用户图片的id
				list: [{
					text: '删除'
				}],
				list2: [{
					text: '删除'
				}],
				show2: false,
				show: false,
				u_id: '', //当前登录人的id
				r_id: null,
				m_id: '', //图片发布人的id
				res_id: null,
				type: 0,
				name: 'kristen',
				rename: null,
				ava: '',
				placeholder: '',
				value: '',
				type: 'text',
				border: true,
				commentList: [],
				replyList: [],
				replys: [],
				com_num: ''
			}
		},


		onLoad(res) {
			this.id = res.id; //用户图片的id
			this.placeholder = res.name;
			//console.log(res.id+"==="+res.name);
			this.get();
			this.init();
		},
		onShow() {
			this.init();
		},
		methods: {
			//用户信息初始化
			init() {
				uni.getStorage({
					key: 'userInfo',
					/* fail: (res) => {
						uni.navigateTo({
							url: '../login/login'
						})
					} */
				})
			},
			//删除评论
			shanchu1(res) {
				if (res == 0) {
					api.request({
						url: '/reply/deleteReplyAndMes',
						method: 'GET',
						data: {
							id: this.r_id, //评论列表id
							tid: this.id, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							this.get();
						} else {
							console.log('删除失败')
						}
					});
				}
			},
			//删除回复
			shanchu2(res) {
				if (res == 0) {
					api.request({
						url: '/replys/deleteReplysAndMes',
						method: 'GET',
						data: {
							id: this.res_id,
							tid: this.id, //图片id
							time: this.time
						},
					}).then(res => {
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '删除回复成功',
								type: 'success',
							})
							this.get();
						} else {
							console.log('删除失败')
						}
					})
				}
			},
			//初始化评论信息
			get() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.name = res.data.username;
						this.ava = res.data.avatarUrl;
						this.u_id = res.data.userId;
						//console.log(this.u_id)
					}
				})
				api.request({
					url: '/circle/getCommentById/' + this.id,
					method: 'GET',
				}).then(res => {
					//console.log(res.data);
					this.commentList = res.data
					this.m_id = res.data[0].uid;
				});
				//读取回复
				api.request({
					url: '/reply/getReplyByTopicId/' + this.id,
					method: 'GET',
				}).then(res => {
					this.replyList = res.data
					//console.log(res.data)
				});
				//
				api.request({
					url: '/replys/getReplyByTopicId/' + this.id,
					method: 'GET',
				}).then(res => {
					this.replys = res.data
					//console.log(res.data)
				})
			},
			//提交评论或回复
			submit() {
				if (this.type == 2 || this.type == 1) {
					if (this.value == '') {
						this.$refs.uToast.show({
							title: '内容不能为空',
							type: 'error'
						})
					} else {
						api.request({
							url: '/mesCheck/getData',
							method: 'GET',
							data: {
								content: this.value,
							},
						}).then(res => {
							//console.log(res);

							if (res.data.errcode == 0) {
								console.log("内容检查成功");
								api.request({
									url: '/replys/insertReplysInfo/' + this.m_id,
									method: 'POST',
									data: {
										uid: this.u_id, //当前登录人的id
										tid: this.id, //当前图片文章id
										rid: this.r_id, //当前评论的id
										//m_id: this.m_id,//发布当前图片用户的id
										uava: this.ava, //当前人头像
										name: this.name, //当前人用户名
										rname: this.rename, //被回复人的用户名
										content: this.value //当前内容
									},
								}).then(res => {
									if (res.data.data == 1) {
										//console.log("评论成功")
										this.get();
										this.$refs.uToast.show({
											title: '评论成功',
											type: 'success'
										})
										this.value = '';
									} else if (res.data.code == 0) {
										console.log("评论失败")
									}
								});

							} else {
								this.$refs.uToast.show({
									title: '内容包含敏感词汇!请检查!',
									type: 'error'
								})
								return;
							}
						});

					}
				} else {
					if (this.value == '') {
						this.$refs.uToast.show({
							title: '内容不能为空',
							type: 'error'
						})
					} else {
						api.request({
							url: '/mesCheck/getData',
							method: 'GET',
							data: {
								content: this.value,
							},
						}).then(res => {
							//console.log(res);

							if (res.data.errcode == 0) {
								console.log("内容检查成功");
								api.request({
									url: '/reply/insertReplyInfo/' + this.m_id,
									method: 'POST',
									data: {
										uid: this.u_id, //当前登录人的id
										rname: this.name, //当前登录人的用户名
										rava: this.ava, //当前登录人的头像
										//	m_id: this.m_id,//发布当前图片的用户id
										rcont: this.value, //文本内容
										tid: this.id //图片以及文章的id
									},
								}).then(res => {
									if (res.data.data == 1) {
										console.log("评论成功")
										this.get();
										this.$refs.uToast.show({
											title: '评论成功',
											type: 'success'
										})
										this.value = '';
									} else if (res.data.data == 0) {
										console.log("评论失败")
									}

								});

							} else {
								this.$refs.uToast.show({
									title: '内容包含敏感词汇!请检查!',
									type: 'error'
								})
								return;
							}
						});

					}

				}


			},
			//回复评论
			reply1(res) {
				//等于自己就删除  不等于自己就回复他人
				if (this.u_id == res.uid) {
					this.r_id = res.id;
					this.time = res.rdate;
					this.show = true;
					console.log(this.time)
					//console.log(this.r_id)
				} else {
					this.placeholder = res.rname;
					this.rename = res.rname;
					this.r_id = res.id;
					this.m_id = res.uid;
					this.type = 1;
					/* 	this.$refs.uToast.show({
							title: '当前回复：' + this.placeholder,
							type: 'success',
						}) */
				}


			},
			reply2(res) {
				if (this.u_id == res.uid) {
					this.r_id = res.rid;
					this.res_id = res.id;
					this.time = res.rdate;
					this.show2 = true;
					//console.log(this.r_id)
				} else {
					this.placeholder = res.name;
					this.rename = res.name;
					this.r_id = res.rid;
					this.m_id = res.uid;
					this.type = 2;
					/* this.$refs.uToast.show({
						title: '当前回复：' + this.placeholder,
						type: 'success',
					}) */
				}


			},
			reply(res) {
				this.placeholder = res.uname //图片用户的用户名
				this.m_id = res.uid //图片用户的id
				this.time = res.rdate //评论日期
				this.type = 0
				/* 	this.$refs.uToast.show({
						title: '当前回复：' + this.placeholder,
						type: 'success',
					}) */
			},
			//图片预览
			previewImage(current, photos) {
				uni.previewImage({
					current,
					urls: photos
				})
			},
			//个人中心跳转
			userinfo(res) {
				//console.log(res)
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		//padding: 10rpx;
		height: 100%;
		width: 100%;
	}

	.place {
		margin-left: 15upx;
	}

	.button {
		position: absolute;
		top: 35rpx;
		right: 30rpx;

	}

	.input {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 999;
		//background: red;
		left: 0;
		background: #fff;
		align-items: center;
		//padding: 20rpx;
	}

	.num {
		display: inline;
	}

	.comment {
		display: flex;
		//padding: 30rpx;
		margin-top: 10rpx;
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
				margin-left: 10rpx;
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
				margin-left: 10rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				margin-bottom: 10rpx;
				position: relative;


				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

				.weibo-handle {
					display: flex;
					position: absolute;
					right: 0;
					//padding-top: 15rpx;
					font-size: 28rpx;
					padding-bottom: 25rpx;
				}

				.weibo-handle image {
					width: 40rpx;
					height: 40rpx;
					//margin-right: 20rpx;
					margin-left: 20rpx;
				}

				.weibo-handle view {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}


	.reply {
		display: flex;
		//padding: 30rpx;
		margin-top: 10rpx;

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
				display: inline;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					position: relative;
					left: 10rpx;
					color: #5677fc;
				}

				.time {
					position: relative;
					left: 10rpx;
					font-size: 20rpx;
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
				margin-left: 10rpx;
				margin-top: 10rpx;
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
				margin-top: 20rpx;
				margin-left: 10rpx;
				display: flex;
				font-size: 24rpx;
				color: #eeeeee;
				margin-bottom: 10rpx;
				line-height: 50rpx;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}

			}
		}
	}
</style>
