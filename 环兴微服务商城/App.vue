<script>
	import Vue from 'vue'
	export default {
		globalData: {
			theme: {
				themeColor: '#dd6161', //主题颜色
				matchColor: '#ff9900', //配色颜色
				bottomColor: '#FFFFFF', //底色颜色
			},
			isLoadding: false, //防止多个接口token过期 静默登录 
		},
		onLaunch: function() {
			//获取商城主题
			this.getMobileTheme();
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initPage() {
				let that = this;
				return new Promise((resolve, reject) => {
					if (!uni.getStorageSync('hxtoken')) {
						//无token，进行登录
						// #ifdef MP-WEIXIN
						that.loginWxMa().then(res => {
							resolve("success");
						});
						// #endif
						// #ifndef MP-WEIXIN
						that.userAppAuth().then(res => {
							resolve("success");
						});
						// #endif
					} else {
						// #ifdef MP-WEIXIN
						wx.checkSession({
							success() {
								//session_key 未过期，并且在本生命周期一直有效
								console.log("session_key未过期")
							},
							fail() {
								console.log("session_key已过期")
								// session_key 已经失效，需要重新执行登录流程
								that.loginWxMa().then(res => {
									resolve("success");
								});
							}
						})
						// #endif

						resolve("success");
					}
				});
			},
			userAppAuth() {
				return new Promise((resolve, reject) => {
					let that = this;
					uni.$myRequest.userAppAuth({}).then(res => {
						uni.hideLoading();
						let userInfo = res.data;
						uni.setStorageSync('hxtoken', userInfo.hxToken);
						console.log("静默登录成功" + JSON.stringify(userInfo));
						that.globalData.isLoadding = false
						resolve();
					});
				});
			},
			/**
			 * 获取主题
			 */
			getMobileTheme() {
				return new Promise((resolve, reject) => {
					let that = this;
					uni.$myRequest.mobileTheme().then(res => {
						let data = res.data;
						that.globalData.theme.themeColor = data.themeColor
						that.globalData.theme.matchColor = data.matchColor
						that.globalData.theme.bottomColor = data.bottomColor
						resolve("success");
					});
				});
			},
			//微信小程序登录
			// #ifdef MP-WEIXIN
			loginWxMa() {
				return new Promise((resolve, reject) => {
					let that = this;
					uni.login({
						success: function(res) {
							console.log("res++++++++++" + JSON.stringify(res));
							if (res.code) {
								let wxUserDTO = {
									wxCode: res.code
								};
								uni.$myRequest.userAppAuth({
									wxUserDTO: wxUserDTO
								}).then(res => {
									uni.hideLoading();
									let userInfo = res.data;
									uni.setStorageSync('hxtoken', userInfo.hxToken);
									console.log("小程序登录成功" + JSON.stringify(userInfo));
									that.globalData.isLoadding = false
									resolve("success");
								});
							}
						}
					});
				});
			},
			// #endif
		}
	}
</script>
<style lang="scss">
	@import "./components/colorui/main.css";
	@import "./components/colorui/icon.css";
</style>
