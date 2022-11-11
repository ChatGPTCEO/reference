<template>
	<view>
		<u-navbar :background="navbackground" :border-bottom="false"></u-navbar>
		<view class="logo">
			<!-- <u-image width="100%" height="500rpx" src="@/static/bg.png"></u-image> -->
			<text>{{appName}}</text>
		</view>
		<view class="form">
			<u-tabs :list="tabs" height="100" active-color="#f44c01" :is-scroll="false" :current="current"
				@change="changeTab"></u-tabs>
			<u-line color="#e4e7ed" />
			<u-form v-if="current==0" :model="model" ref="uForm" :errorType="errorType">
				<u-form-item :label-position="labelPosition" label="手机号码" prop="mobile" label-width="150">
					<u-input placeholder="请输入手机号"
						:custom-style="{background:'#f8f8f8',padding:'5rpx 20rpx',borderRadius:'50rpx',margin:'20rpx 0'}"
						v-model="model.mobile" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" :border-bottom="false" label="验证码" prop="code"
					label-width="150">
					<view class="putbox">
						<u-input style="flex: 1;" placeholder="请输入验证码"
							:custom-style="{background:'#f8f8f8',padding:'5rpx 20rpx',borderRadius:'50rpx',margin:'20rpx 0'}"
							v-model="model.captcha" type="text" :adjustPosition="false"></u-input>
						<view class="codebtn" @click="getCode()">
							<text>{{codeTips}}</text>
						</view>
					</view>
				</u-form-item>
			</u-form>
			<u-form v-else :model="model" ref="uForm" :errorType="errorType">
				<u-form-item :label-position="labelPosition" label="手机号码" prop="mobile" label-width="150">
					<u-input placeholder="请输入手机号"
						:custom-style="{background:'#f8f8f8',padding:'5rpx 20rpx',borderRadius:'50rpx',margin:'20rpx 0'}"
						v-model="model.mobile" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" :border-bottom="false" label="密码" prop="code"
					label-width="150">
					<view class="putbox">
						<u-input placeholder="请输入密码"
							:custom-style="{background:'#f8f8f8',padding:'5rpx 20rpx',borderRadius:'50rpx',margin:'20rpx 0'}"
							v-model="model.password" type="password" :adjustPosition="false"></u-input>
						<view class="codebtn" @click="getPass()">
							<text>找回密码</text>
						</view>
					</view>
				</u-form-item>
			</u-form>
			<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
			<view class="agreement">
				<u-checkbox v-model="model.agreement" @change="checkboxChange"></u-checkbox>
				<view class="agreement-text">
					勾选代表同意Hicity的<text style="color: #f44c01;" @click="$u.route('/pagesUser/textmain/textmain',{id:3})">《用户协议》</text>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button shape="circle" type="primary" @click="toLogin">登录</u-button>
		</view>
		<view class="otherlogin">
			<view class="appwx" @click="wxlogin">
				<u-image width="100rpx" height="100rpx" src="@/static/images/weixin.png"></u-image>
				<view style="color: #F44C01;font-size: 26rpx;">微信一键登录</view>
			</view>
			<view class="regbox" @click="$u.route('/pages/register/register')">
				<text>没有账号？</text>
				<text class="regtext">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		APP_NAME
	} from '../../env.js'
	export default {
		data() {
			return {
				appName: APP_NAME,
				tabs: [{
					name: '手机登录'
				}, {
					name: '密码登录'
				}],
				current: 0,
				navbackground: {
					background: 'transparent'
				},
				model: {
					mobile: '',
					captcha: '',
					password: '',
					agreement: true,
				},
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				isLogin: state => state.user.isLogin,
			})
		},
		methods: {
			...mapActions([
				'login',
			]),
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (this.model.mobile == '') {
						return this.$u.toast('请输入手机号');
					}
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					this.$u.get('/addons/hicity/sms/send', {
						mobile: this.model.mobile,
						event: 'mobilelogin'
					}).then(res => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
			changeTab(index) {
				this.current = index;
			},
			getPass() {

			},
			toLogin() {
				if (this.current == 0) {
					//手机号登录
					if (this.model.mobile == '') {
						return this.$u.toast('请输入手机号');
					}
					if (this.model.captcha == '') {
						return this.$u.toast('请输入验证码');
					}
					if (!this.model.agreement) {
						return this.$u.toast('请阅读勾选用户协议');
					}
					this.$u.get('/addons/hicity/user/mobilelogin', this.model).then(res => {
						this.login(res.userinfo);
						this.$u.toast('登录成功');
						uni.navigateBack({

						})
					})
				} else {
					//密码登录
					if (this.model.mobile == '') {
						return this.$u.toast('请输入手机号');
					}
					if (this.model.password == '') {
						return this.$u.toast('请输入密码');
					}
					if (!this.model.agreement) {
						return this.$u.toast('请阅读勾选用户协议');
					}
					this.$u.get('/addons/hicity/user/login', this.model).then(res => {
						this.login(res.userinfo);
						this.$u.toast('登录成功');
						uni.navigateBack({

						})
					})

				}
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			//微信登录
			wxlogin() {
				var that = this;
				uni.getUserProfile({
					desc: '需要获取您的微信头像以及昵称',
					lang: 'zh_CN',
					success: function(infoRes) {
						console.log(infoRes);
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes);
								that.$u.post('/addons/hicity/user/getMiniWxSessionKey', {
									code: loginRes.code
								}).then(sessionRes => {
									console.log(sessionRes)
									that.$u.post('/addons/hicity/user/wxlogin', {
										session_key: sessionRes.session_key,
										encryptedData: infoRes.encryptedData,
										iv: infoRes.iv,
										openid: sessionRes.openid,
										unionid: sessionRes.unionid ? sessionRes
											.unionid : ''
									}).then(res => {
										console.log(res)
										that.login(res);
										that.$u.toast('登录成功');
										uni.navigateBack({
										
										})
									})
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200rpx;
		width: 100%;
		font-size: 60rpx;
		font-weight: bold;

		background-image: linear-gradient(180deg, #FFA610, #F44C01);
		// background-image: -webkit-gradient(
		//       linear,
		//       0 0,
		//       0 bottom,
		//       from(rgb(25, 247, 228)),
		//       to(#d4fff7)
		//     );
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.form {
		margin: 20rpx;
		box-shadow: 0px 0px 20rpx #e6e6e6;
		background-color: white;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
	}

	.btn {
		margin: 40rpx 20rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 20rpx 0;

		.agreement-text {
			color: $u-tips-color;
		}
	}

	.otherlogin {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;

		.regbox {
			font-size: 30rpx;
			color: #333333;
			margin-top: 40rpx;

			.regtext {
				color: #f44c10;
			}
		}
	}

	.putbox {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
	}

	.codebtn {
		width: 150rpx;
		height: 70rpx;
		font-size: 22rpx;
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10rpx;
		justify-content: center;
		background-color: #F44C01;
		margin-left: 20rpx;
	}

	// 一键登录按钮
	.wx-logo-box {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F44C01;
		margin-bottom: 70rpx;
		background: none;
		display: block;

		&:hover {
			background: none;
		}

		.auto-login {
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			margin-bottom: 10rpx;
		}
	}

	.appwx {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
