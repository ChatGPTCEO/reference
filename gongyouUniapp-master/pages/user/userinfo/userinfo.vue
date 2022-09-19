<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="user-wrap">
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="ava"></image>
				<view class="nickname">{{username}}
					<u-icon style="margin-left: 10rpx;" v-if="gender == '男'" size="30"
						name="../../../static/boy.png"></u-icon>
					<u-icon style="margin-left: 10rpx;" v-if="gender == '女'" size="30"
						name="../../../static/girl.png"></u-icon>
				</view>
			</view>
			<view class="info4" v-if="m_id != u_id"> 
				<u-button v-if="mode == 0" type="primary" shape="circle" size="mini" @click="focus(u_id)">关注</u-button>
				<u-button v-if="mode == 1" type="success" shape="circle" size="mini" @click="ufocus(u_id)">已关注</u-button>
			</view>
		</view>
		<u-gap height="10" bg-color="#ececec"></u-gap>
		<u-row gutter="16">
			<u-col span="6">
				<view class="contents">
					<view>{{fans}}</view>
					<view>粉丝</view>
					<view v-if="fans == 0">0</view>
				</view>
			</u-col>
			<u-col span="6">
				<view class="contents">
					<view>{{follow}}</view>
					<view>关注</view>
					<view v-if="follow == 0">0</view>
				</view>
			</u-col>
		</u-row>
		<u-gap height="10" bg-color="#ececec"></u-gap>
		<!-- 列表 -->
		<u-tabs active-color="#554d84" :list="list1" :is-scroll="false" :current="current" @change="change"></u-tabs>
		
		<!-- 圈子动态 -->
		<view v-if="current == 0" class="comment" v-for="(res, index) in commentList">

			<view class="right">
				<view style="display: flex;margin-left: 15rpx;margin-top: 15rpx;">
					<u-avatar :src="res.uava"></u-avatar>
					<view style="flex: 1;margin-left: 20rpx;display: flex;flex-direction: column;justify-content: space-between;">
						<view>{{res.uname}}</view>
						<view style="display: flex;">
							<view>{{res.pubDate}}
							</view>
						</view>
					<!-- 定位信息 -->
						<view>
							<u-icon name="map" color="#2979ff" size="28"></u-icon>{{res.place}}

						</view>
					</view>

				</view>
				<view class="content" @click="comment(res)">{{ res.content }}</view>
				<!-- 图片 -->
				<view class="reply-box">
					<view v-if="res.pocUrl.length == 1" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width: 100%;"></image>
					</view>
					<view v-if="res.pocUrl.length == 2 || res.pocUrl.length == 4" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<image @click="previewImage(index1,res.pocUrl)" v-for="(res1, index1) in res.pocUrl" :src="res1" mode="aspectFill"
						 style="width:334rpx;height:334rpx;margin-bottom: 10rpx;"></image>
					</view>
					<view v-if="res.pocUrl.length == 3  || res.pocUrl.length == 6 || res.pocUrl.length == 7" style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
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
							<image src="../../../static/comment.png" />{{res.comNum}}
						</view>
						<view class="praise-group">
							<image v-if="res.price==null" @click="$noMultipleClicks(getLike,res.id)" src="../../../static/good.png" />
							<image v-else @click="$noMultipleClicks(unLike,res.id)" src="../../../static/goods.png" />
							{{res.likeNum}}

						</view>
						<view class="favor">
							<image v-if="res.collect==null" @click="$noMultipleClicks(getSc,res.id)" src="../../../static/shoucang.png"></image>
							<image v-else @click="$noMultipleClicks(unSc,res.id)" src="../../../static/shoucangs.png"></image>
						</view>
					</view>

				</view>

			</view>

		</view>
		


		<!-- 读取约拍列表 -->
		<view v-if="current == 1" class="comment2" v-for="(res, index) in yuepaiList">
			<view class="left">
				<image :src="res.pava" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.pname }}
						<u-icon v-if="res.pgender == '男'" size="40" name="../../../static/boy.png"></u-icon>
						<u-icon v-if="res.pgender == '女'" size="40" name="../../../static/girl.png"></u-icon>
					</view>
					<view class="identity" @click="console(res)">{{res.identity}}</view>
				</view>
				<view class="title" @click="console(res)">{{res.title}}</view>
				<view class="content" @click="console(res)">
					{{ res.content }}</view>
				<view class="reply-box">
					<view style="margin-top: 20upx;display: grid;">
						<scroll-view scroll-x="true" class="pic" style="width: 100%;overflow:hidden;white-space:nowrap;">
							
						<!-- 	<image @click="previewImage(index1,res.urlsList)" v-for="(res1, index1) in res.urlsList" :src="res1" mode="aspectFill"
							 style="width:220rpx;height:220rpx;margin-bottom: 10rpx;margin-right: 10rpx;"></image> -->
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
						<view style="margin-top: 10rpx;display: flex;">
							<view class="tip" style="margin-left: 10rpx;" v-for="(inss,indess) in res.ptagsList">
								<u-tag class="tag" shape="circle" :text="inss" mode="plain" />
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 个人作品 -->
		<view v-if="current==2" class="content1">
			<WaterfallsFlow :wfList='list' @itemTap="detail" />
		</view>
			<!-- 显示加载更多 -->
			<u-loadmore :status="status" />
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import WaterfallsFlow from '@/components/WaterfallsFlow/WaterfallsFlow.vue'
	export default {
		components: {
			WaterfallsFlow
		},
		data() {
			return {
				noClick:true,
				u_id: '',//点击用户头像,他人的id
				m_id: '',//自己的id
				m_ava: '',
				m_gender: '',
				m_name: '',
				mode: 0,
				ava: '',
				username: '',
				gender: '',
				fans: '',
				follow: '',
				urls: [],
				windowswidth: '',
				newwidth: '',
				two: '',
				scrollTop: 0,
				commentList: [],//圈子动态
				yuepaiList: [],//约拍作品
				list: [],//个人作品
				list1: [{
						name: '圈子动态'
					},
					{
						name: '约拍动态'
					},
					{
						name: '个人作品'
					}

				],
				status: 'loadmore',
				current: 0,
				aPage: '1',
				bPage: '1',
				cPage: '1',
				topicCount:'',
				yuepaiCount:'',
				userCount:'',
				scrollTop: 0,
			}
		},
		onLoad(res) {
			//获取动态列表
			//console.log(res.uid+"页面跳转过来的值")
			this.u_id = res.uid;
			this.getUser();
			//this.getTopic();
		},
		onPullDownRefresh: function() {
			this.aPage = '1'
			this.bPage = '1'
			this.cPage = '1'
			this.getUser();
			//this.getTopic();

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		//触底事件
		onReachBottom() {
			let a = (this.topicCount / 10)
			let b = (this.yuepaiCount / 10)
			let c = (this.userCount / 10)
			//圈子动态
			if (this.current == 0 && this.aPage < a) {
				this.aPage++
				//console.log(this.Page)
				setTimeout(() => {
						api.request({
							url: '/userInfo/findPageByUserId',
							method: 'GET',
							data: {
								userId: this.u_id,
								myId: this.m_id,
								currentPageNum:this.aPage
							},
						}).then(res => {
							//console.log(res.data)
							this.commentList = res.data.records
							this.topicCount = res.data.total
							if (this.aPage >= a) {
								this.status = 'nomore'
								return
							}
						});
					
					this.status = 'loading';
				}, 1000)
				//约拍动态
			} else if (this.current == 1 && this.bPage < b) {
				this.bPage++
				//console.log(this.Fpage)
				setTimeout(() => {
					api.request({
						url: '/yuePai/getYuepaiById',
						method: 'GET',
						data: {
							uid: this.u_id,
							currentPage: this.bPage,
						},
					}).then(res=>{
						//console.log(res.data)
						this.yuepaiList = res.data.records;
						this.yuepaiCount = res.data.total;
						if (this.bPage >= b) {
							this.status = 'nomore'
						}
					})
					this.status = 'loading';
				}, 1000)
				//个人作品
			}else if (this.current == 2 && this.cPage < c) {
				this.cPage++
				//console.log(this.Fpage)
				setTimeout(() => {
					api.request({
						url: '/zuopin/getZuopinById',
						method: 'GET',
						data: {
							uid: this.u_id,
							currentPage: this.cPage,
						},
					}).then(res=>{
						//console.log(res.data)
						this.list = res.data.records;
						this.userCount = res.data.total;
						if (this.cPage >= c) {
							this.status = 'nomore'
						}
					})
					this.status = 'loading';
				}, 1000)
			}
		
		},
		methods: {
			//作品详情
			detail(res){
				uni.navigateTo({
					url:'../../yuepai/photo/detail?id='+res.id
				})
			},
			//约拍详情
			console(res) {
				uni.navigateTo({
					url: '../../yuepai/detail/detail?id=' + res.id
				})
			},
			//收藏
			getSc(res) {
				let t_id = res
				api.request({
					url: '/shouCang/addSc',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.m_id
					},
				}).then(res=>{
					if (res.data.data == '1') {
						this.getUser();
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
						uid: this.m_id
					},
				}).then(res=>{
					if (res.data.data == '1') {
						this.getUser();
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
				let t_id = res
				api.request({
					url: '/dianzan/cancelDianzan',
					method: 'POST',
					data: {
						tid: t_id,
						uid: this.m_id
					},
				}).then(res=>{
					if (res.data.data == '1') {
						this.getUser();
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
						uid: this.m_id
					},
				}).then(res=>{
					if (res.data.data == '1') {
						this.getUser();
						// this.$refs.uToast.show({
						// 	title: '点赞成功',
						// 	type: 'success',
						// 	duration: '1000'
						// })
					}
				})
			},
			//评论详情
			comment(res) {
				//console.log(res);
				uni.navigateTo({
					url: '../../quanzi/comment?id=' + res.id + '&name=' + res.uname
				})
			},
	        //关注
			focus(res) {
				api.request({
					url: '/follow/FollowYuePaiById',
					method: 'POST',
					data: {
						uid: this.m_id,
						fid: this.u_id,//发布圈子的人的id
						fava: this.ava,
						fname: this.username,
						fgender: this.gender,
						uava: this.m_ava,
						uname: this.m_name,
						ugender: this.m_gender
					}
				}).then(res=>{
					if (res.data.flag) {
						this.$refs.uToast.show({
							title: '关注成功',
							type: 'success'
						})
						this.mode = 1
					}
				});
			},
			//取消关注
			ufocus(res) {
				this.mode = 0
				api.request({
					url: '/follow/cancelFollowYuePaiById',
					method: 'GET',
					data: {
						fid: this.u_id,//发布圈子用户的id
						uid: this.m_id//自己的id
					}
				}).then(res=>{
					if (res.data.flag) {
						this.$refs.uToast.show({
							title: '您已取消关注',
							type: 'warning'
						})
						this.mode = 0
					}
				});
			},
			//列表切换
			change(index) {
				this.current = index;
				if (this.current == 0) {
					this.getUser();
				/* 	uni.request({
						url: api.baseUrl+'/users/gettopic',
						method: 'GET',
						data: {
							u_id: this.u_id
						},
						success: (res) => {
							this.commentList = res.data
						}
					}) */
				} else if (this.current == 1) {
					api.request({
						url: '/yuePai/getYuepaiById',
						method: 'GET',
						data: {
							uid: this.u_id,//用户id
							currentPage:this.bPage
						},
					}).then(res=>{
						this.yuepaiList = res.data.records;
						this.yuepaiCount = res.data.total;
					})
				} else if (this.current == 2) {
					this.getZuopin();
				}
			},
			getZuopin(){
				api.request({
					url: '/zuopin/getZuopinById',
					method: 'GET',
					data: {
						uid: this.u_id,
						currentPage:this.cPage
					},
				}).then(res=>{
					this.list = res.data.records;
					this.userCount = res.data.total;
				});
			},
			//图片预览
			previewImage(current, photos) {
				uni.previewImage({
					current,
					urls: photos
				})
			},
			//发布
			btnClick() {
				uni.navigateTo({
					url: './pub'
				})
			},
			//信息初始化
			getUser() {
				/* uni.showLoading({
					title: '加载中'
				}) */
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.m_id = res.data.userId
						this.m_ava = res.data.avatarUrl
						this.m_name = res.data.username
						this.m_gender = res.data.gender
						//console.log(this.m_id)
						//读取圈子列表
						api.request({
							url: '/userInfo/findPageByUserId',
							method: 'GET',
							data: {
								userId: this.u_id,
								myId: this.m_id,
								currentPageNum:this.aPage
							},
						}).then(res=>{
							this.commentList = res.data.records
							this.topicCount = res.data.total
						});
						//读取是否已经关注
						api.request({
							url: '/follow/isFollowByUserId',
							method: 'GET',
							data: {
								userId: this.u_id,
								myId: this.m_id,
							},
						}).then(res=>{
							//console.log(res)
							if (res.data.data) {
								this.mode = 1
							} else {
								this.mode = 0
							}
						});

					}
				})

				api.request({
					url:'/userInfo/findUserInfoById',
					method: 'GET',
					data: {
						userId: this.u_id,
					},
				}).then(res=>{
					this.username = res.data.data.nickName;
					this.ava = res.data.data.avatarUrl;
					this.gender = res.data.data.gender;
					this.fans = res.data.data.fans;
					this.follow = res.data.data.follow;
					
					
				//	console.log(res.data.data.fans+"res.data.fans")
				//	console.log(this.fans+"this.fans")
					
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					uni.hideLoading();
					
					
				})
			},


		}
	}
</script>

<style lang="scss" scoped>
	.comment2 {
		display: flex;
		padding: 30rpx;

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

	.content1 {
		padding: 10px;
		background: #eeeeee;

		.cnt {
			padding: 10px;
			position: relative;

			.title {
				font-size: 15px;
			}

			.text {
				font-size: 15px;
				margin-top: 5px;
				display: flex;
				position: relative;
			}


		}
	}


	.contents {
		text-align: center;
		font-size: 32upx;
		color: #6b6b6b;
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



	.user-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50vw;
		padding: 30rpx;
		z-index: 9;
		//border-radius: 0 0 20% 20%;
		//background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
		//background-image: linear-gradient(to top right, #f7797d, #fbd786);
		background: #554d84;
		background-size: cover;
		//background-image: url(../../../static/xiaoyuan1.png);

		.info2 {
			position: absolute;
			top: 250rpx;

			.identity {
				//color: #fff;
				font-size: 28rpx;
			}
		}

		.info4 {
			position: absolute;
			top: 300rpx;
		}

		.setting {
			color: #fff;
			position: absolute;
			top: 60rpx;
			left: 60rpx;
			font-size: 50rpx;
		}

		.info {
			position: absolute;
			text-align: center;
			top: 85rpx;
			

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			.nickname {
				color: #fff;
				font-size: 28rpx;
			}
		}

	}
</style>
