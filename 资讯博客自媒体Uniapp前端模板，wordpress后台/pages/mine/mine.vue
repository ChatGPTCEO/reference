<template>
	<view>
		<view class="container whitebg page">
			<view class="user-container" :style="'min-height: 100vh; padding-top:'+customBarHeight+'px;'">
				<view class="user-information card-cell-wrap">
					<view class="card-cell" v-if="!user">
						<view class="card-cell-icon">
							<image lazyLoad class="image" src="/static/images/avatar.png"></image>
						</view>
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">游客</view>
								<view class="card-cell-label">点击登录</view>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<button v-if="user==''" class="userLogin" @tap="getProfile"></button>
						<!-- #endif -->
						<!-- #ifdef MP-BAIDU||MP-TOUTIAO||MP-QQ -->
						<button v-if="user==''" class="userLogin" @getuserinfo="getProfile"
							openType="getUserInfo">登录</button>
						<!-- #endif -->
						<!-- #ifdef APP || H5 -->
						<button v-if="user==''" class="userLogin" @tap="gotologin" openType="getUserInfo"></button>
						<!-- #endif -->
					</view>
					<view class="card-cell" v-else>
						<view class="card-cell-icon">
							<image lazyLoad class="image" :src="user.avatarUrl"></image>
						</view>
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">{{user.nickName}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="card user-items card-cell-wrap">
					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">我点赞的</view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN-->
						<button v-if="user==''" class="userLogin" @tap="getProfile"></button>
						<!-- #endif -->
						<!-- #ifdef MP-BAIDU||MP-TOUTIAO||MP-QQ -->
						<button v-if="user==''" class="userLogin" @getuserinfo="getProfile"
							openType="getUserInfo">登录</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
						<button v-if="user==''" class="userLogin" @tap="gotologin" openType="getUserInfo"></button>
						<!-- #endif -->
						<button @tap="bindHandler('/pages/posts/posts?id=1')" class="button card-cell-btn"
							wx:else></button>
					</view>
					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">我的收藏</view>
								<view class="card-cell-label"></view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN-->
						<button v-if="user==''" class="userLogin" @tap="getProfile"></button>
						<!-- #endif -->
						<!-- #ifdef MP-BAIDU||MP-TOUTIAO||MP-QQ -->
						<button v-if="user==''" class="userLogin" @getuserinfo="getProfile"
							openType="getUserInfo">登录</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
						<button v-if="user==''" class="userLogin" @tap="gotologin" openType="getUserInfo"></button>
						<!-- #endif -->
						<button v-else class="userLogin" @tap="bindHandler('/pages/posts/posts?id=2')"></button>
					</view>
					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">我的评论</view>
								<view class="card-cell-label"></view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN-->
						<button v-if="user==''" class="userLogin" @tap="getProfile"></button>
						<!-- #endif -->
						<!-- #ifdef MP-BAIDU||MP-TOUTIAO||MP-QQ -->
						<button v-if="user==''" class="userLogin" @getuserinfo="getProfile"
							openType="getUserInfo">登录</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
						<button v-if="user==''" class="userLogin" @tap="gotologin" openType="getUserInfo"></button>
						<!-- #endif -->
						<button v-else class="userLogin"
							@tap="bindHandler('/pages/posts/posts?id=3')"></button>
					</view>
				</view>
				<view class="card user-items card-cell-wrap">
					<!-- #ifdef MP-WEIXIN -->
					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">订阅更新</view>
								<view class="card-cell-label">新内容发布后自动通知</view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<button v-if="!user" class="userLogin" @tap="getProfile"></button>
						<button v-else class="userLogin" @tap="bindSubscribe"></button>
					</view>
					<!-- #endif -->

					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">联系客服</view>
								<view class="card-cell-label">在线解答您的咨询</view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<button class="card-cell-btn button" openType="contact"></button>
					</view>
					<view class="card-cell">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">清除缓存</view>

							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<button @tap="loginOut" class="userLogin card-cell-btn button"></button>
					</view>
					<view class="card-cell" v-if="user">
						<view class="card-cell-msg">
							<view class="card-cell-base">
								<view class="card-cell-title">退出</view>
							</view>
							<view class="card-cell-more">
								<icon class="icon"></icon>
							</view>
						</view>
						<button @tap="loginOut" class="card-cell-btn button"></button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				user: [],
				unreadMessageCount: 0,
				customBarHeight: 10,
			}
		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
			}
			this.user = user
		},
		methods: {
			getProfile: function(e) {
				console.log(e)
				uni.showLoading({
					title: '正在登录...',
				})
				// #ifdef MP-WEIXIN
				API.getProfiles().then(res => {
						console.log(res)
						this.user = res
						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif
				// #ifdef MP-BAIDU||MP-QQ||MP-TOUTIAO
				API.getProfile(e).then(res => {
						console.log(res)
						this.user = res
						uni.showToast({
							title: '登陆成功'
						})
						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif
			},

			bindHandler: function(url) {
				uni.navigateTo({
					url: url
				})
			},

			loginOut: function() {
				API.Loginout()
				uni.clearStorageSync();
				uni.showToast({
					title: '清除完毕',
				})
			},
			gotologin: function() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			bindSubscribe: function() {
				let that = this
				let templates = API.template().subscribe
				wx.requestSubscribeMessage({
					tmplIds: templates,
					success(res) {
						if (res.errMsg == "requestSubscribeMessage:ok") {
							for (let i = 0; i < templates.length; i++) {
								let template = templates[i]
								that.subscribeMessage(template, "accept")
							}
						}
					},
					fail: function(res) {
						console.log(res)
					}
				})
			},
			subscribeMessage: function(template, status) {
				let args = {}
				args.openid = this.data.user.openId
				args.template = template
				args.status = status
				args.pages = getCurrentPages()[0].route
				args.platform = wx.getSystemInfoSync().platform
				args.program = 'WeChat'
				API.subscribeMessage(args).then(res => {
						console.log(res)
						wx.showToast({
							title: res.message,
							icon: 'success',
							duration: 1000
						})
					})
					.catch(err => {
						console.log(err)
						wx.showToast({
							title: err.message,
							icon: 'success',
							duration: 1000
						})
					})
			},
		}
	}
</script>

<style>
	.user-information {
		margin: 40rpx;
	}

	.user-information .card-cell-base .card-cell-title {
		font-weight: 500;
		font-size: 44rpx;
	}

	.user-items {
		margin: 40rpx;
		padding: 0 40rpx;
	}

	.rssmsg {
		height: 600rpx;
	}

	.rssmsg,
	.rssmsg .codeimg {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.rssmsg .codeimg {
		text-align: center;
		line-height: 40rpx;
	}

	.rssmsg .codeimg .image {
		width: 200rpx;
		height: 200rpx;
	}

	.rssmsg .codeimg .text {
		opacity: .6;
		display: block;
	}

	.rssmsg .codeimg .text.small {
		font-size: 24rpx;
	}

	.rssmsg .codeimg .text.strong {
		font-weight: 700;
	}


	.card-cell {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-cell .button {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: none !important;
		opacity: 0;
		z-index: 15;
	}

	.card-cell-icon {
		display: flex;
		position: relative;
		margin-right: 20rpx;
		overflow: hidden;
		border-radius: 22.5%;
		width: 100rpx;
		height: 100rpx;
	}

	.card-cell-icon::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 22.5%;
		z-index: 11;
	}

	.card-cell-icon .image {
		width: 100rpx;
		height: 100rpx;
	}

	.card-cell-msg {
		display: flex;
		flex: auto;
		height: 140rpx;
		align-items: center;
		justify-content: space-between;

	}

	.card-cell-wrap .card-cell:first-child .card-cell-msg {
		border-top: none !important;
	}

	.card-cell-msg .card-cell-base {
		display: flex;
		flex-flow: column;
		height: 140rpx;
		justify-content: center;
	}

	.card-cell-msg .card-cell-base .card-cell-title {
		font-weight: 500;
		font-size: 30rpx;
		line-height: 38rpx;
	}

	.card-cell-msg .card-cell-base .card-cell-label {
		font-size: 26rpx;
		opacity: .4;
	}

	.card-cell-msg .card-cell-more .text {
		font-size: 28rpx;
		opacity: .6;
	}

	.card-cell-msg .card-cell-more .icon {
		align-self: center;
		margin-left: 20rpx;
	}

	.card-cell-msg .card-cell-more .icon:after {
		content: "";
		display: block;
		width: 10rpx;
		height: 10rpx;
		border-width: 2rpx 2rpx 0 0;
		border-style: solid;
		transform: rotate(45deg);
	}


	.card {
		border-radius: 32rpx;
		box-shadow: 10rpx 16rpx 60rpx 10rpx rgba(168, 168, 168, 0.15);
	}

	.card,
	.detailhead .card {
		position: relative;
		overflow: hidden;
		z-index: 10;
	}

	.detailhead .card {
		border-radius: 0rpx;
		box-shadow: none;
	}





	.card .cardbody {
		overflow: hidden;
	}

	.card .cardcell {
		height: 100rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card .cardcell:last-child {
		border-bottom: none !important;
	}

	.userLogin {
		position: absolute;
		top: 0;
		left: 0;
		width: 620rpx;
		height: 100rpx;
		opacity: 0;
	}
</style>
