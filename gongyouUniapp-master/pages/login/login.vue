<template>  
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码"
					password="true" />
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>
<<<<<<< HEAD
		<view style="text-align: center;">
			<view>------请您先授权微信登录------</view>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<u-button class="" @click="getUserProfile" size="medium" type="success" shape="circle">授权登录</u-button>
		</view>
=======
<!-- 		<view style="text-align: center;">
			<view>------请您先授权微信登录------</view>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<u-button class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" size="medium" withCredentials="true"
				type="success" shape="circle">授权登录</u-button>
		</view> -->
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
		<view class="agreenment">
			<navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">注册账户</navigator>
		</view>
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	//import * as request from '@/api/request.js'
	export default {
		data() {
			return {
				phone: '',
<<<<<<< HEAD
=======
				password: '',
				userId: '',
				username: '',
				token: '',
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
				sex: '',
				userinfo: {
					nickName: '',
					avatarUrl: '',
					gender: ''
				},
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				gender: null,
<<<<<<< HEAD
				canIUseGetUserProfile: false,
=======
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
			};
		},

		onLoad() {
<<<<<<< HEAD
			this.login();
			if (uni.getUserProfile()) {
				this.canIUseGetUserProfile = true;
			}
		},
		methods: {
			login() {
				//console.log("1111111111");
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("code===" + res.code)
=======
			this.init();
			this.login();
		},
		methods: {
			login() {
				console.log("1111111111");
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("code==="+res.code)
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
						api.request({
							url: '/userLogin/weChatLogin',
							method: 'GET',
							data: {
								code: res.code
							},
<<<<<<< HEAD
						}).then(res => {
=======
						}).then(res=>{
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
							this.OpenId = res.data.openid;
							this.SessionKey = res.data.session_key;
							console.log(res);
						});
					}
				})
			},
<<<<<<< HEAD
			getUserProfile: function(res) {
				let that = this
				uni.getUserProfile({
					desc: '注册登录',
					success: (res) => {
						console.log(res.userInfo)
						this.userinfo = res.userInfo;
						this.userinfo.nickname = res.userInfo.nickName;
						this.userinfo.avatarUrl = res.userInfo.avatarUrl;
						if (res.userInfo.gender == '1') {
							this.sex = '男'
						} else if (res.userInfo.gender == '0') {
							this.sex = '女'
						}
						this.userinfo.gender = this.sex;
						uni.request({
							url: 'https://xiaotang.top:2022/userinfo',
							method: "GET",
							data: {
								//userInfo:this.userinfo,
								openid: that.OpenId,
								nickName: this.userinfo.nickname,
								avatarUrl: this.userinfo.avatarUrl,
								gender: this.sex
							},
							success: (res) => {
								//console.log(res);
								uni.setStorage({
									key: 'userInfo',
									data: {
										openid: that.OpenId,
										nickName: that.userinfo.nickname,
										avatarUrl: that.userinfo.avatarUrl,
										gender: that.sex
									},
									success: (res) => {
										//console.log('登录成功')
									}
								})

								uni.reLaunch({
									url: '../quanzi/quanzi'
								})
							}
						})
					},
					fail: (res) => {
						this.$refs.uToast.show({
							title: '您取消了授权！',
							type: 'error'
						})
					}
				})

			},


			/* wxGetUserInfo: function(res) {
=======
			get() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
					},
					fail: function() {
						console.log('fail')
					}
				});
			},
			wxGetUserInfo: function(res) {
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
				let that = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,失败",
						icon: "none"
					});
					return false;
				}
				console.log('-------用户授权，并获取用户基本信息和加密数据------')
<<<<<<< HEAD
				console.log(res);
=======
				//console.log(res);
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
				this.userinfo = res.detail.userInfo;
				this.userinfo.nickname = res.detail.userInfo.nickName;
				this.userinfo.avatarUrl = res.detail.userInfo.avatarUrl;
				if (res.detail.userInfo.gender == '1') {
					this.sex = '男'
				} else if (res.detail.userInfo.gender == '0') {
					this.sex = '女'
				}
				this.userinfo.gender = this.sex;
				// console.log(this.userinfo.nickName);
				api.request({
					url: api.baseUrl + '/userinfo',
					method: "GET",
					data: {
						//userInfo:this.userinfo,
						openid: this.OpenId,
						nickName: this.userinfo.nickname,
						avatarUrl: this.userinfo.avatarUrl,
						gender: this.sex
					},
<<<<<<< HEAD
				}).then(res => {
=======
				}).then(res=>{
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
					//console.log(res);
					uni.setStorage({
						key: 'userinfo',
						data: {
							openid: that.OpenId,
							nickName: that.userinfo.nickname,
							avatarUrl: that.userinfo.avatarUrl,
							gender: that.sex
						},
						success: (res) => {
							console.log('登录成功')
						}
					})
<<<<<<< HEAD

					uni.reLaunch({
						url: '../quanzi/quanzi'
					})
				})

			}, */
=======
					
				/* 	uni.reLaunch({
						url: '../quanzi/quanzi'
					}) */
				})


			},
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239





			init() {
				uni.getStorage({
					key: 'phone',
					success: (res) => {
						//console.log(res);
						this.phone = res.data
					},
				});
			},

<<<<<<< HEAD
			//电话号码登录
=======
			//登录
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
			bindLogin() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				api.request({
					url: '/userLogin/login',
					data: {
						phone: this.phone,
						password: this.password
					},
					method: 'POST',
					//dataType: 'json',
				}).then(res => {
					console.log(res.data.data)
					if (!res.data.flag) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					} else {
						//成功后的逻辑
						let userInfo = {
							userId: res.data.data.userId,
							username: res.data.data.username,
							avatarUrl: res.data.data.avatarUrl,
							gender: res.data.data.gender,
							phone: res.data.data.phone,
							//token:res.data.data.token,
						}
						uni.setStorage({
							key: "userInfo",
							data: userInfo,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.setStorage({
							key: "token",
							data: res.data.data.token,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.setStorage({
							key: 'phone',
							data: userInfo.phone,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						uni.reLaunch({
							url: '../quanzi/quanzi'
						});
						//uni.navigateBack();
					}
				});


			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
