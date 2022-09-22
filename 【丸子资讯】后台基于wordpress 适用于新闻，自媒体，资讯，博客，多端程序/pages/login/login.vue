<template>
	<view class="content">
		<view class="back-button" @tap="cancelLogin">
			<image src="/static/images/back.png" mode="widthFix"></image>
		</view>
		<view class="logo-bg-box">
			<view class="logo-bg-box-first">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
			<view class="logo-bg-box-second">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
		</view>
		<view class="logo-box">
			<image class="logo-item" src="@/static/images/logo@2x.png"></image>
			<!-- #ifdef MP-WEIXIN -->
			<button class="logo-btn" @tap="getProfile">
				<view class="weixin iconfont iconweix"></view>微信授权
			</button>
			<!-- #endif -->
			<!-- #ifdef MP-TOUTIAO -->
			<button class="logo-btn" @tap="getTtProfile">
				<view class="weixin iconfont iconweix"></view>微信授权
			</button>
			<!-- #endif -->
			<!-- #ifdef MP-QQ || MP-BAIDU-->
			<button class="logo-btn" @getuserinfo="getProfile" openType="getUserInfo">
				<view class="weixin iconfont iconweix"></view>授权登陆
			</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view @tap="cancelLogin" class="cancel-login">暂不登录，返回首页</view>
			<view class="login-title-info">登录即代表您同意《用户协议》和《隐私政策》</view>
			<!-- #endif -->


		</view>
		<!-- #ifdef APP-PLUS||H5 -->
		<view class="login-form logpos">
			<u-form-item label="手机 :" label-width="120">
				<u-input placeholder="请输入手机号码" v-model="rephone" />
			</u-form-item>
			<u-form-item label="验证码 :" label-width="120">
				<u-input placeholder="请输入验证码" v-model="recode" />
				<button class="codebutton" :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
					@tap="sendPhoneCode">{{codeBtn.text}}</button>
			</u-form-item>
			<button type="primary" style="border-radius: 60rpx;" @tap="phoneLogin">登录</button>
			<view class="links">已有账号？<view class="link-highlight" @tap="goLogin">点此登陆</view>
			</view>
			<view class="login-bottom">
				<view class="login-title-info">登录即代表您同意<text>《用户协议》</text>和<text>《隐私政策》</text></view>
			</view>


		</view>
		<!-- #endif -->
		<u-popup v-model="show" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="账号 :">
						<u-input placeholder="请输入账号" v-model="username" />
					</u-form-item>
					<u-form-item label="密码 :">
						<u-input type="password" placeholder="请输入密码" v-model="password" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="login">登陆</button>
				<view class="links">
					<view @tap="userphonelogin">手机登录</view>
					<view>|</view>
					<view @tap="gotoForgetPassword">忘记密码？</view>
					<view>|</view>
					<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
				</view>
			</view>

		</u-popup>
		<u-popup v-model="passShow" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="邮箱 :">
						<u-input placeholder="请输入找回密码的邮箱" v-model="emails" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="getPassWords">找回密码</button>
				<view class="links">
					<view @tap="goLogin">立即登陆</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="registShow" mode="bottom" :closeable="true">
			<view class="login-form">
				<u-form ref="uForm" :label-style="labelStyle">
					<u-form-item label="邮箱 :" label-width="120">
						<u-input placeholder="请输入邮箱" v-model="reemail" />
					</u-form-item>
					<u-form-item label="验证码 :" label-width="120">
						<u-input placeholder="请输入验证码" v-model="recode" />
						<button class="codebutton" :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
							@tap="sendCode">{{codeBtn.text}}</button>
					</u-form-item>
					<u-form-item label="账号 :" label-width="120">
						<u-input placeholder="请输入账号" v-model="reusername" />
					</u-form-item>
					<u-form-item label="密码 :" label-width="120">
						<u-input type="password" placeholder="请输入密码" v-model="repassword" />
					</u-form-item>
				</u-form>
				<button type="primary" @tap="registra">注册</button>
				<view class="links">已有账号？<view class="link-highlight" @tap="goLogin">点此登陆</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				show: false,
				passShow: false,
				registShow: false,
				labelStyle: {
					color: "#434343",
				},
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				username: '',
				password: '',
				emails: '',
				reemail: '',
				rephone: '',
				recode: '',
				reusername: '',
				repassword: '',
				disableCodeBtn: false,
				captchaImg: '',
				seconds: 60,

			}
		},
		methods: {

			userphonelogin: function() {
				this.show = false;
				this.registShow = false;
				this.passShow = false;
			},
			goLogin: function() {
				this.show = true;
				this.registShow = false;
				this.passShow = false;

			},
			cancelLogin: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			gotoForgetPassword: function() {
				this.show = false;
				this.passShow = true;
			},
			gotoRegistration: function() {
				this.show = false;
				this.registShow = true;
			},
			login: function() {
				if (this.username == '') {
					uni.showToast({
						title: '请输入用户名'
					})
					return;
				} else if (this.password == '') {
					uni.showToast({
						title: '请输入密码'
					})
					return;
				} else if (this.password.length < 6) {
					uni.showToast({
						title: '密码应大于6位'
					})
					return;
				} else {
					let data = {
						login: this.username,
						password: this.password,
					}
					API.acountlogin(data).then(res => {
						API.storageUser(res);
						uni.showToast({
							title: '登陆成功',
						})
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

					}).catch(err => {
						uni.showToast({
							title: err.message
						})
					})
				}
			},
			phoneLogin: function() {
				if (this.rephone == '') {
					uni.showToast({
						title: '请输入手机号码'
					})
					return;
				} else if (this.recode == '') {
					uni.showToast({
						title: '请输入验证码'
					})
					return;
				} else {
					let data = {
						phone: this.rephone,
						code: this.recode,
					}
					API.phoneLogin(data).then(res => {
						API.storageUser(res);
						uni.showToast({
							title: '登陆成功',
						})
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

					}).catch(err => {
						uni.showToast({
							title: err.message
						})
					})
				}
			},
			getPassWords: function() {
				let data = {
					login: this.emails,
				}
				API.getPassWord(data).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: '重置邮箱已发送'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.message
					})
				})
			},
			registra: function() {
				if (this.reemail == '') {
					uni.showToast({
						title: '请输入邮箱'
					})
					return;
				} else if (this.recode == '') {
					uni.showToast({
						title: '请输入验证码'
					})
					return;
				} else if (this.repassword == '') {
					uni.showToast({
						title: '请输入密码'
					})
					return;
				} else if (this.reusername == '') {
					uni.showToast({
						title: '请输入用户名'
					})
					return;
				} else if (this.repassword.length < 6) {
					uni.showToast({
						title: '密码应大于6位'
					})
					return;
				} else {
					let data = {
						login: this.reusername,
						email: this.reemail,
						code: this.recode,
						password: this.repassword,
					}
					API.getRegistra(data).then(res => {
						console.log(res);
						uni.showToast({
							title: '注册成功',
						})
						API.storageUser(res);
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}
					}).catch(err => {
						uni.showToast({
							title: err.message
						})
					})
				}

			},
			isemail: function(text) {
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				return reg.test(text);
			},

			isphone: function(text) {
				var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(text);
			},
			sendPhoneCode: function() {
				if (this.rephone == '' || !this.isphone(this.rephone)) {
					uni.showToast({
						title: '请输入正确的手机号码'
					})
					return;
				}

				if (this.codeBtn.waitingCode == false) {
					API.getPhoneCode({
						phone: this.rephone
					}).then(res => {
						console.log(res);
						if (res.status === 200) {
							uni.showToast({
								title: "验证码已发送"
							})
						}
					})
				}
				this.disableCodeBtn = true;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
						this.disableCodeBtn = false;
					}
				}, 1000);
			},
			sendCode: function() {
				if (this.reemail == '' || !this.isemail(this.reemail)) {
					uni.showToast({
						title: '请输入正确的邮箱'
					})
					return;
				}

				if (this.codeBtn.waitingCode == false) {
					API.getEmailCode({
						email: this.reemail
					}).then(res => {
						console.log(res);
						if (res.status === 200) {
							uni.showToast({
								title: "验证码已发送"
							})
						}
					})
				}
				this.disableCodeBtn = true;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
						this.disableCodeBtn = false;
					}
				}, 1000);
			},

			getTtProfile: function(e) {
				uni.showLoading({
					title: '正在登录...',
				})
				API.getTtProfile().then(res => {
						//console.log(res)
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}
						tt.hideLoading()
					})
					.catch(err => {
						console.log(err)
						tt.hideLoading()
					})
			},


			getProfile: function(e) {
				uni.showLoading({
					title: '正在登录!',
					mask: true
				})
				// #ifdef MP-WEIXIN
				API.getProfiles().then(res => {
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif
				// #ifdef MP-BAIDU || MP-QQ
				API.getUserInfos(e).then(res => {
						if (this.isDetail) {
							uni.navigateBack({
								delta: 1,
							})
						} else {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}

						uni.hideLoading()
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
				// #endif

			},
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #49b44a;

	.content {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #000;
	}

	.logo-bg-box {
		width: 100%;
		height: 9482rpx;
		opacity: .5;
		animation: move 60s linear infinite;

		.logo-bg-box-first,
		.logo-bg-box-second {
			width: 100%;
			height: 50%;
		}

		.login-bg-item-top {
			width: 100%;
			height: 50%;
			background: url(https://wx4.sinaimg.cn/bmiddle/e448bca1ly1gz9dh4shsmj20ku1voajp.jpg);
			background-size: 100% 100%;
		}

		.login-bg-item-bottom {
			width: 100%;
			height: 50%;
			background: url(https://wx4.sinaimg.cn/bmiddle/e448bca1ly1gz9dh4shsmj20ku1voajp.jpg);
			background-size: 100% 100%;
		}

		@-webkit-keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

		@keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.logo-box {
		padding-top: 115rpx;
		position: fixed;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;

		.logo-item {
			display: block;
			width: 400rpx;
			height: 66rpx;
			margin: 0 auto 120rpx;
		}

		.logo-btn {
			width: 418rpx;
			height: 88rpx;
			background-color: #fff;
			box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, .08);
			border-radius: 88rpx;
			font-size: 28rpx;
			line-height: 88rpx;
			color: #93b1b1;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;

			.iconfont {
				font-size: 40rpx;
				margin-right: 20rpx;
			}

			.weixin {
				width: 10rpx;
				height: 10rpx;
				padding-left: 2rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				color: #fff;
				background-color: #49b44a;
			}
		}

		.cancel-login {
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			margin-top: 20rpx;
			z-index: 5;
		}

		.login-title-info {
			font-size: 20rpx;
			color: #fff;
			width: 500rpx;
			margin-top: 100rpx;
			text-align: center;
		}
	}

	.logpos {
		background: #fff;
		width: 750rpx;
		height: 800rpx;

		position: fixed;
		border-radius: 30rpx 30rpx 0 0;
		bottom: 0;
		left: 0;
	}

	.login-form {

		padding: 40rpx;

		.codebutton {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}

	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #434343;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}

		.link-highlight {
			color: #434343;
		}
	}

	.login-bottom {
		position: absolute;
		bottom: 60rpx;
		width: 750rpx;
		text-align: center;

		.login-title-info {
			text {
				color: #18B566;
			}
		}
	}

	.back-button {
		position: fixed;
		top: 80rpx;
		left: 40rpx;
		z-index: 10000;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}
</style>
