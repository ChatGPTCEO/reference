<template>
	<view>
		<!--  #ifndef MP-WEIXIN -->
		<view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" class="text-left" v-model="form.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="请输入验证码" class="text-left" v-model="form.code"></input>
				<button class='cu-btn bg-green shadow'
					@tap="getCode">{{!captchaTime?'获取验证码':captchaTime+'秒重新获取'}}</button>
			</view>
			<view>
				<button class="cu-btn shadow-blur block margin-tb-sm bottom-btn bg-red" @tap="login">登录</button>
			</view>
		</view>
		<!--  #endif -->

		<!--  #ifdef MP-WEIXIN -->
		<view>
			<button class="cu-btn shadow-blur block margin-tb-sm bottom-btn bg-red" open-type="getPhoneNumber"
				@getphonenumber="getPhoneNumber">快速登录</button>
		</view>
		<!--  #endif -->
	</view>
</template>

<script>
	import validate from '@/utils/validate'
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				form: {},
				tips: '',
				captchaTime: 0,
				timer: null
			};
		},
		props: {
			redirectUrl: { //重定向页面
				type: String,
				default: '/pages/home/index'
			}
		},
		methods: {
			/**
			 * 发送验证码
			 */
			getCode() {
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}

				if (this.captchaTime > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: 'none'
					})
					return;
				} else {
					uni.$myRequest.smsCode(this.form).then(res => {
						uni.showToast({
							title: '验证码已发送',
							icon: 'none',
							duration: 3000
						});
						// 通知验证码组件内部开始倒计时
						this.form.code = res.data.code
						this.captchaTime = 60;
						this.timer = setInterval(() => {
							this.captchaTime--;
							console.log(this.captchaTime)
							if (this.captchaTime < 1) {
								clearInterval(this.timer);
								this.captchaTime = 0
							}
						}, 1000)
					});

				}
			},
			/**
			 * 登录方法
			 */
			login() {
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!validate.validateMobile(this.form.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!this.form.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				uni.$myRequest.smsLogin(this.form).then(res => {
					let userInfo = res.data;
					uni.setStorageSync('hxtoken', userInfo.hxToken);
					uni.setStorageSync('userInfo', userInfo);
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						duration: 3000
					});
					uni.reLaunch({
						url: this.redirectUrl ? decodeURIComponent(this.redirectUrl) : '/pages/home/index',
						success: () => {
							let page = getCurrentPages().pop();
							if (page) {
								page.onLoad(page.options); //执行上个页面的方法
							};
						}
					});
				});
			},
			/**
			 * 微信小程序手机号登录
			 */
			getPhoneNumber(e) {
				if (e.detail.code) {
					console.log("encryptedData" + e.detail.encryptedData)
					uni.$myRequest.maPhoneLogin(e.detail).then(res => {
						let userInfo = res.data;
						uni.setStorageSync('hxtoken', userInfo.hxToken);
						uni.setStorageSync('userInfo', userInfo);
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							duration: 3000
						});
						uni.reLaunch({
							url: this.redirectUrl ? decodeURIComponent(this.redirectUrl) :
								'/pages/home/index',
							success: () => {
								let page = getCurrentPages().pop();
								if (page) {
									page.onLoad(page.options); //执行上个页面的方法
								};
							}
						});
					})
				}

			},
			beforeDestroy() {
				console.log("beforeDestroy")
				if (this.timer) {
					console.log("beforeDestroy" + this.timer)
					clearInterval(this.timer);
				}

			},

		},
	}
</script>

<style>
</style>
