<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<u-tabs :list="list" :is-scroll="false" height="100" bg-color="white" :current="current" @change="change">
		</u-tabs>
		<!-- 动态 -->
		<view class="comment" v-if="res.privacy == '公开' && current==0" v-for="(res, index) in commentList">
			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">
					<u-avatar @click="userinfo(res)" :src="res.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
						<view style="    display: flex;     align-items: center;">
										{{res.uname}}
							<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '男'" size="30"
								name="http://mrliblog.work/boy.png"></u-icon>
							<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '女'" size="30"
								name="http://mrliblog.work/girl.png"></u-icon>
						</view>
						<view style="display: flex;">
							<view>{{res.pubDate}}</view>

						</view>
						<!-- 定位信息 -->
						<view>
							<u-icon name="map" color="#2979ff" size="28"></u-icon>{{res.place}}

						</view>
					</view>

				</view>
				<!-- 文本内容 -->
				<view class="content" @click="comment(res)">{{ res.content }}</view>
				<!-- 图片显示区域 -->
				<view class="reply-box" v-if="res.pocUrl.length != 0">
					<view v-if="res.pocUrl.length == 1"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width: 100%;"></image>
					</view>
					<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width:334rpx;height:334rpx;margin-bottom: 10rpx;"></image>
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
				<!-- 最新回复 -->
				<view style="margin-left: 20rpx;font-size: 25rpx;color: gray;margin-bottom: 10rpx;">

					<view> 
						最新回复于{{res.repDate}}
					</view>

				</view>

				<view class="bottom">
					<view class="weibo-handle">
						<!-- 评论数量 -->
						<view class="comment-group" @click="comment(res)">
							<image src="../../static/comment.png" />{{res.comNum}}
						</view>
						<!-- 点赞数量 -->
						<view class="praise-group">
							<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)" src="../../static/good.png" />
							<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/goods.png" />
							{{res.likeNum}}

						</view>
						<!-- 收藏次数 -->
						<view class="favor">
							<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)" src="../../static/shoucang.png"></image>
							<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/shoucangs.png"></image>
						</view>
					</view>

				</view>

			</view>

		</view>



		<!-- 关注 -->
		<view class="comment"
			v-if="res.privacy == '公开' && current==1  || res.privacy=='仅关注' && current==1 "
			v-for="(res, index) in commentListFollow">

			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">
					<u-avatar @click="userinfo(res)" :src="res.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;">
						<view style="    display: flex; align-items: center;">
									{{res.uname}}
							<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '男'" size="30"
								name="../../../static/boy.png"></u-icon>
							<u-icon style="margin-left: 10rpx;" v-if="res.ugender == '女'" size="30"
								name="../../../static/girl.png"></u-icon>
						</view>
						<view style="display: flex;">
							<view>{{res.pubDate}}</view>
						</view>
							<!-- 定位信息 -->
							<view>
								<u-icon name="map" color="#2979ff" size="28"></u-icon>{{res.place}}
							
							</view>
					</view>

				</view>
				<view class="content" @click="comment(res)">{{ res.content }}</view>
				<view class="reply-box" v-if="res.pocUrl.length != 0">
					<view v-if="res.pocUrl.length == 1"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width: 100%;"></image>
					</view>
					<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4"
						style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1"
							mode="aspectFill" style="width:334rpx;height:334rpx;margin-bottom: 10rpx;"></image>
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

				<!-- 图片下半部分 -->
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
						<view class="praise-group">
							<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)" src="../../static/good.png" />
							<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../static/goods.png" />
							{{res.likeNum}}

						</view>
						<view class="favor">
							<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)" src="../../static/shoucang.png"></image>
							<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../static/shoucangs.png"></image>
						</view>
					</view>

				</view>

			</view>

		</view>

		<u-loadmore :status="status" />

	</view>
</template>

<script>
	//import api from '@/api/api.js'
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				//总条数
				topiccount: '',
				followtopiccount: '',
				status: 'loadmore',
				isLike: false,
				isSc: false,
				u_id: '',
				Page: '1',
				Fpage: '1',
				urls: [],
				windowswidth: '',
				newwidth: '',
				two: '',
				scrollTop: 0,
				commentList: [],
				commentListFollow:[],
				list: [{
						name: '圈内动态'
					},
					{
						name: '关注'
					}

				],
				flag: true,
				flag2: true,
				current: 0,
				noClick:true,
			}
		},
		onLoad() {
			//获取动态列表
			this.init();
		},
		onShow() {
			this.init();
		
		},
		onPullDownRefresh: function() {
			this.Page = '1'
			this.Fpage = '1'
			//	this.init();
			this.getComment();
			//	this.get();
		},
		//触底事件
			onReachBottom() {
				let a = (this.topiccount / 10)
				let b = (this.followtopiccount / 10)
				//console.log(b)
				//console.log(a)
				if (this.current == 0 && this.Page < a) {
					this.Page++
					//console.log(this.Page)
					setTimeout(() => {
						if (this.flag) {
							api.request({
								url: '/circle/getCircle',
								method: 'GET',
								data: {
									userId: this.u_id,
									pageNum: this.Page
								},
							}).then(res => {
								//console.log(res.data)
								this.commentList = res.data.records;
								this.topiccount = res.data.total;
								if (this.Page >= a) {
									this.status = 'nomore'
									return
								}
							});
						}

						this.status = 'loading';
					}, 1000)
					//关注页面
				} else if (this.current == 1 && this.Fpage < b) {
					this.Fpage++
					console.log(this.Fpage)
					setTimeout(() => {

						api.request({
							url: '/circle/getFollow',
							method: 'GET',
							data: {
								userId: this.u_id,
								pageNum: this.Fpage
							},
						}).then(res=>{
							this.commentList = res.data.records
							this.followtopiccount = res.data.total
							if (this.Fpage >= b) {
								this.status = 'nomore'
							}
						})
						this.status = 'loading';
					}, 1000)
				}

			},
		//返回顶层
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.u_id = res.data.userId;
						this.getComment(); //初始化获取页面信息

					},
					fail: (res) => {
						this.getComment(); //初始化获取页面信息
					/* 	uni.showToast({
							title: '您尚未登录'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../login/login'
							})
						}, 1500) */
					}
				})
			},
		
			//点击收藏
			getSc(res) {
				let t_id = res
				api.request({
					url: '/shouCang/addSc',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					},
				}).then(res=>{
					if (res.data.data == 1) {
						this.getComment();
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
							duration: '1000'
						})
					}
				});
			},
			//取消收藏
			unSc(res) {
				let t_id = res
				api.request({
					url: '/shouCang/deleteSc',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					},
				}).then(res=>{
					if (res.data.data == 1) {
						this.getComment();
						this.$refs.uToast.show({
							title: '取消收藏',
							type: 'warning',
							duration: '1000'
						})
					}
					
				})
			},
			//取消点赞
			unLike(res) {
				//console.log('取消点赞')
				let t_id = res
				api.request({
					url: '/dianzan/cancelDianzan',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					}, 
				}).then(res=>{
					if (res.data.data == 1) {
						this.getComment();
						// this.$refs.uToast.show({
						// 	title: '取消点赞',
						// 	type: 'warning',
						// 	duration: '1000'
						// })
					}
					
				})
			},
			//点赞
			getLike(res) {
				let t_id = res
				api.request({
					url: '/dianzan/addDianzan',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.u_id
					},
				}).then(res=>{
					if (res.data.data == 1) {
						this.getComment();
						// this.$refs.uToast.show({
						// 	title: '点赞成功',
						// 	type: 'success',
						// 	duration: '1000'
						// })
					}
				});
			},
			//标签切换
			change(index) {
				this.current = index;
				//this.status = 'loading';
				if (this.current == 1) {

					api.request({
					url: '/circle/getFollow',
					method: 'GET',
						data: {
							userId: this.u_id,
							pageNum: this.Fpage
						},
					}).then(res=>{
						this.commentListFollow = res.data.records
						this.followtopiccount = res.data.total
					})
				} else if (this.current == 0) {
					api.request({
						url: '/circle/getCircle',
						method: 'GET',
						data: {
							userId: this.u_id,
							pageNum: this.Page
						},
					}).then(res=>{
						this.commentList = res.data.records;
						this.topiccount = res.data.total;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						uni.hideLoading();
					})
				}
			},
			//图片预览
			previewImage(current, photos) {
				// const urls = 
				uni.previewImage({
					current,
					urls: photos
				})
			},
			//个人中心
			userinfo(res) {
			//console.log(res.uid+"页面跳转过来的值")
				uni.navigateTo({
					url: '../user/userinfo/userinfo?uid=' + res.uid
				})
			},

			//评论详情
			comment(res) {

				uni.navigateTo({
					url: './comment?id=' + res.id + '&name=' + res.uname
				})
			},
			//信息初始化			
			getComment() {
				//console.log(this.u_id + "aaaaaaaaaa");
				//关注页面
				if (this.current == 1) {
					api.request({
						url: '/circle/getFollow',
						method: 'GET',
							data: {
								userId: this.u_id,
								pageNum: this.Fpage
							},
					}).then(res=>{
						this.commentListFollow = res.data.records
						this.followtopiccount = res.data.total
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						uni.hideLoading();
					})
					//动态页面
				} else if (this.current == 0) {

					api.request({
						url: '/circle/getCircle',
						method: 'GET',
						data: {
							userId: this.u_id,
							pageNum: this.Page
						},
					}).then(res => {
						//console.log(res.data)
						this.commentList = res.data.records;
						this.topiccount = res.data.total;
						//console.log(this.commentList)
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						uni.hideLoading();

					})
				}

		/* 		uni.showLoading({
					title: '加载中'
				}) */

			}

		}
	}
</script>


<style lang="scss" scoped>
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
