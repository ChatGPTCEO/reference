<template>

	<view>
		<view style="text-align: center;">
			<image src="../../static/logo.png" mode="aspectFit"></image>
		</view>
		<view style="text-align: center;">
			<view>------请您先授权微信登录------</view>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<u-button class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" size="medium" withCredentials="true"
				type="success" shape="circle">授权登录</u-button>
		</view>
	</view>





</template>
<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
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
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		onLoad() {
			this.login();
		},
		methods: {
			login() {
				
				uni.login({
					provider: 'weixin',
					success: (res) => {
						//console.log(res.code)
						uni.request({
							url: api.baseUrl + '/openid',
							method: 'POST',
							data: {
								js_code: res.code
							},
							success: (res) => {
								//console.log(res)
								this.OpenId = res.data.openid;
								this.SessionKey = res.data.session_key;
							}
						})
					}
				})
			},
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
				let that = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,失败",
						icon: "none"
					});
					return false;
				}
				console.log('-------用户授权，并获取用户基本信息和加密数据------')
				//console.log(res);
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
				uni.request({
					url: api.baseUrl + '/userinfo',
					method: "GET",
					data: {
						//userInfo:this.userinfo,
						openid: this.OpenId,
						nickName: this.userinfo.nickname,
						avatarUrl: this.userinfo.avatarUrl,
						gender: this.sex
					},
					success: (res) => {

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

						uni.reLaunch({
							url: '../quanzi/quanzi'
						})
					}
				})


			}


		}
	}
</script>
<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		line-height: 80upx;
		border-radius: 80upx;
		margin: 70rpx 50rpx;
		height: 80upx;
		font-size: 35rpx;
	}
</style>
