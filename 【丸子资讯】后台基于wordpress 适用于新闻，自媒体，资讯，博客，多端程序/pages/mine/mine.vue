<template>
	<view class="content">
		<view class="my-topbg">
			<view class="user-card">
				<view class="my-top" v-if="UserInfo!==''">
					<view bindtap="toHome" class="my-head">
						<image mode="aspectFill"
							:src="UserInfo.avatarUrl?UserInfo.avatarUrl:require('@/static/images/user.png')"></image>
					</view>
					<view class="my-top-cell">
						<view class="my-name">
							<view class="name">{{UserInfo.nickName}}</view>
							<view class="pag">{{honour.title}}</view>
						</view>
						<view class="my-post">
							{{UserInfo.description?UserInfo.description:'这个人很懒什么都没写'}}
						</view>
					</view>
					<view @tap="goMyEdit" class="pick-code">
						编辑资料
					</view>
				</view>
				<view @tap="toAuthorized" class="my-top" v-else>
					<view class="my-top-cell">
						<view class="my-name">
							<view class="name">点击登录</view>
						</view>
						<view class="my-post">
							暂无
						</view>
					</view>
					<view class="my-head">
						<image mode="aspectFill" src="@/static/images/user.png"></image>
					</view>
				</view>
				<view class="my-other">
					<view class="my-hbox">
						<view class="item">
							<view @tap="toFavs" class="item-box">
								<view class="cell">
									<view class="num">{{account.favs?account.favs:0}}</view>
									<view class="name">收藏</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view @tap="toLikes" class="item-box">
								<view class="cell">
									<view class="num">{{account.likes?account.likes:0}}</view>
									<view class="name">点赞</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view @tap="toComment" class="item-box">
								<view class="cell">
									<view class="num">{{account.comments?account.comments:0}}</view>
									<view class="name">评论</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view @tap="toUserPoints" class="item-box">
								<view class="cell">
									<view class="num">{{credit.credits?credit.credits:0}}</view>
									<view class="name">积分</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-card">
			<view class="fix-header">
				<view class="name">常用功能</view>
				<view bindtap="toOrder" class="actions">
				</view>
			</view>
			<view class="fix-content">
				<view class="flex-wrp">
					<view @tap="toRank" class="flex-item t-item">
						<image src="@/static/images/icon1.png"></image>
						<text>排行</text>
					</view>
					<!-- #ifdef APP-PLUS||H5 -->
					<view @tap="toContact" class="flex-item t-item">
						<image src="@/static/images/icon2.png"></image>
						<text>客服</text>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<view class="flex-item t-item">
						<button class="contact" type="default" open-type="contact"></button>
						<image src="@/static/images/icon2.png"></image>
						<text>客服</text>
					</view>
					<!-- #endif -->
					<view @tap="sign" class="flex-item t-item">
						<image src="@/static/images/icon3.png"></image>
						<text>签到</text>
					</view>
					<view @tap="gotoAbout" class="flex-item t-item">
						<image src="@/static/images/icon4.png"></image>
						<text>关于</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-card">
			<view class="flex-wrp flex-other">
				<view @tap="gotoHistory" class="flex-item">
					<text>阅读记录</text>
					<view class="value">查看历史记录</view>
					<image src=""></image>
				</view>
			</view>
		</view>
		<view class="fix-card">
			<view class="flex-wrp flex-other">
				<view @tap="feedBack" class="flex-item">
					<text>我要反馈</text>
					<view class="value">给我们提个意见或建议</view>
					<image src="@/static/images/icon-link.png"></image>
				</view>
				<view @tap="gotoPrivacy" class="flex-item">
					<text>隐私政策</text>
					<view class="value">隐私政策</view>
					<image src="@/static/images/icon-link.png"></image>
				</view>
				<view @tap="gotoVesion" class="flex-item" data-type="投诉">
					<text>版本说明</text>
					<view class="value">版本说明</view>
					<image src="@/static/images/icon-link.png"></image>
				</view>
				<view @tap="bindLogout" class="flex-item" data-type="意见">
					<text>清除缓存</text>
					<view class="value">清除缓存</view>
					<image src="@/static/images/icon-link.png"></image>
				</view>
			</view>
		</view>
		<view class="copyright-footer">
			<image src=""></image>
			<view class="text" v-if="company_title">{{company_title}}</view>
			<view class="text">丸子科技平台技术支持</view>
		</view>
		<u-popup v-model="show" mode="center" :mask="true" :closeable="true" border-radius="20">
			<view class="kefu-justify-center">
				<view class="title">
					关注我们
				</view>
				<view class="image">
					<image src="http://uploadfile.yunnangateway.com/s2/c19/2020/0225/20200225112817823.png"
						mode="widthFix"></image>
				</view>
				<view class="save" @tap="save">
					保存图片
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				UserInfo: '',
				show: false,
				privacyid: 707, //隐私政策页面id
				about: 846, //关于我们页面id
				vesion: 848, //版本说明页面id
				company_title: '丸子小程序',
				honour: '',
				account: '',
				credit: '',

			}
		},
		onShow() {
			if (API.token()) {
				this.getMineInfo()
			}
		},
		methods: {

			feedBack: function() {
				uni.navigateTo({
					url: '../feedback/feedback'
				})
			},
			gotoHistory: function() {
				uni.navigateTo({
					url: '../history/history'
				})
			},
			gotoPrivacy: function() {
				uni.navigateTo({
					url: '../page/page?id=' + this.privacyid
				})
			},

			toUserPoints: function() {
				uni.navigateTo({
					url: './integral/integral'
				})
			},

			toRank: function() {
				uni.navigateTo({
					url: '../rank/rank',
				})
			},
			
			toContact:function(){
				// #ifdef APP-PLUS || H5
				 this.show=true;
				// #endif
				
			},


			sign: function() {
				API.updateCredit({
						action: "sign"
					}).then(res => {
						this.getMineInfo()
						uni.showToast({
							title: res.message,
							icon: 'success',
							duration: 900
						})
						if (res.status == 201) {
							uni.navigateTo({
								url: '/pages/credits/rank'
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},

			gotoAbout: function() {
				uni.navigateTo({
					url: '../page/page?id=' + this.about
				})
			},
			gotoVesion: function() {
				uni.navigateTo({
					url: '../page/page?id=' + this.vesion
				})
			},
			goMyEdit: function() {
				uni.navigateTo({
					url: '../editme/editme'
				})
			},
			toFavs: function() {
				if (this.UserInfo == '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: './myfav/myfav'
					})
				}
			},
			toLikes: function() {
				if (this.UserInfo == '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: './mylike/mylike'
					})
				}
			},
			toComment: function() {
				if (this.UserInfo == '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: './mycomment/mycomment'
					})
				}
			},
			save: function() {
				uni.downloadFile({
					url: 'http://uploadfile.yunnangateway.com/s2/c19/2020/0225/20200225112817823.png',
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePaths,
								success: function() {
									uni.showToast({
										title: "保存成功"
									})
								}
							});
						}
					}
				});
			},
			getMineInfo: function() {
				let that=this;
				API.checkUser().then(res => {
						if (res.status == 200) {
							API.getMineInfo().then(res => {
									console.log(res);
									this.UserInfo = res.user,
										this.account = res.account,
										this.credit = res.credit,
										this.subscribe = res.subscribe
									this.honour = res.honour
								})
								.catch(err => {
									console.log(err)
								})
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否注销授权?',
								success: function(res) {
									if (res.cancel) {
										uni.showToast({
											title: '取消注销',
											icon: 'success',
											duration: 900
										})
									} else {
										that.bindLogout()
									}
								},
								fail: function(err) {
									console.log(err)
								}
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			bindLogout: function() {
				API.Loginout()
				uni.showToast({
					title: '正在注销!',
					icon: 'loading',
					duration: 1500
				})
				this.user = ""
				uni.removeStorageSync('videoAdLogs')
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			toAuthorized: function() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}

		},
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #f4f6f6;
	}

	.my-topbg {
		position: relative;
		background: linear-gradient(136deg, #ebfcfa, #f4f6f6);
		padding-bottom: 140rpx;
		margin-bottom: -140rpx;



		.my-top {
			padding: 200rpx 0 40rpx 35rpx;
			margin-bottom: 20rpx;
			position: relative;
			display: flex;
			align-items: center;

			.my-head {
				margin-right: 30rpx;
				position: relative;
				display: flex;
				align-items: center;

				image {
					width: 102rpx;
					height: 102rpx;
					border-radius: 999rem;
					overflow: hidden;
				}
			}

			.pick-code {
				height: 60rpx;
				text-align: center;
				position: relative;
				width: 171rpx;
				background: linear-gradient(311deg, #55aa7f, #5fbf8e);
				font-size: 26rpx;
				color: #f7fffe;
				line-height: 60rpx;
				box-sizing: border-box;
				border-radius: 999rem;
				margin-right: 20rpx;

			}

			.my-top-cell {
				flex: 1;
				overflow: hidden;
				white-space: nowrap;

				.my-name {
					font-size: 42rpx;
					color: #333;
					line-height: 60rpx;
					font-weight: 700;
					display: flex;
					align-items: center;

					.name {
						overflow: hidden;
						white-space: nowrap;
						margin-right: 7rpx;
						width:300rpx;
						overflow:hidden;
						text-overflow:ellipsis;
						
					}

					.pag {
						height: 33rpx;
						background: linear-gradient(293deg, #37e2ca, #06d58b);
						border-radius: 4rpx;
						padding: 0 8rpx;
						margin-left: 12rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 8rpx;
						line-height: 33rpx;
						font-size: 24rpx;
						color: #fff;
						font-weight: 400;
					}
				}


				.my-post {
					display: flex;
					align-items: center;

					.tag {
						background: #fba117;
						border-radius: 4rpx;
						font-size: 22rpx;
						color: #fff;
						padding: 0 10rpx;
						line-height: 32rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-right: 20rpx;

					}
				}
			}
		}

		.my-other {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.my-hbox {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				flex: 1;

				.item {
					position: relative;
					flex: 1;

					.item-box {
						height: 118rpx;
						border-radius: 10rpx;
						display: flex;
						align-items: center;

						.cell {
							flex: 1;
							text-align: center;

							.num {
								font-size: 38rpx;
								color: #333;
								font-family: DINAlternate-Bold, DINAlternate;
								font-weight: 700;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.name {
								font-size: 24rpx;
								color: #a0acaa;
								margin-top: 7rpx;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}


	}

	.fix-card {
		position: relative;
		background: #fff;
		border-radius: 20rpx;
		margin: 20rpx;

		.fix-header {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 32rpx 0;

			.name {
				font-size: 32rpx;
				color: #384645;
				font-weight: 700;
			}

			.actions {
				font-size: 26rpx;
				color: #a0acaa;
				display: flex;
				align-items: center;

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}

		.flex-wrp {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 10rpx 0 20rpx;

			.t-item {
				
				position: relative;
				text-align: center;
				width: 25%;
				padding: 30rpx 0;

				image {
					width: 56rpx;
					height: 56rpx;
					display: block;
					margin: 0 auto;
				}

				text {
					font-size: 26rpx;
					color: #333;
					margin-top: 20rpx;
					display: block;
				}
				.contact{
					position: absolute;
					width: 100%;
					height: 120rpx;
					top:0;
					left:0;
					opacity: 0;
				}
			}
		}

		.flex-other {
			flex-direction: column;
			padding: 0;
			display: flex;
			align-items: center;

			.flex-item {
				position: relative;
				padding: 34rpx 26rpx;
				width: 100%;
				box-sizing: border-box;
				line-height: 42rpx;
				display: flex;
				align-items: center;

				text {
					font-size: 30rpx;
					color: #333837;
				}

				.value {
					font-size: 26rpx;
					color: #a0acaa;
					margin-left: auto;
				}
				

				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}
		}
	}

	.copyright-footer {
		text-align: center;
		font-size: 24rpx;
		color: #b6b9bb;
		padding: 40rpx 0;
		line-height: 36rpx;

		image {
			width: 60rpx;
			height: 60rpx;
			display: block;
			margin: 0 auto 8rpx;
		}
	}

	.kefu-justify-center {
		flex-grow: 1;
		flex-direction: column;
		display: flex;
		width: 500rpx;
		height: 700rpx;
		text-align: center;

		.title {
			padding: 20rpx 30rpx;
			font-size: 30rpx;
		}

		.image {
			width: 400rpx;
			margin: 0 auto;

			image {
				width: 400rpx;
			}
		}

		.save {
			width: 200rpx;
			margin: 20rpx auto;
			padding: 20rpx 30rpx;
			border: 1px solid #00aa7f;
			background: #00aa7f;
			border-radius: 5px;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>
