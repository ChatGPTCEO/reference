<template>
	<view class="">
		<uni-status-bar></uni-status-bar>
		<view class="mt-3 ml-3 iconfont icon-back2-01" style="font-size: 50rpx;" @click="toBcak"></view>
		<!-- 动态商城图标和商城名 -->
		<view class="row-a-j-fc" style="width: 100%;height: 300rpx;">
			<image :src="appConfigInfo.app_logo" class="" mode="" style="width: 320rpx;height: 90rpx;"></image>
			<!-- <view class="mt-3 font-s-7 font-w text-light-grey">{{ appConfigInfo.shop_name }}</view> -->
			<!--<view class="mt-2 font-s-4">{{ appConfigInfo.introduce }}</view>-->
		</view>
		<view class="p-5">
			<!--<view v-if="isScan">
				{{scanCode}}-&#45;&#45;{{scanKey}}
			</view>-->
			<view class="mb-4 d-f align-stretch">
				<view class="border-bottom row px-2">+86</view>
				<input type="text" placeholder="请输入手机号码" v-model="mobile" class="border-bottom p-3 flex-1 pl-0" placeholder-class="text-light-muted" />
			</view>
			<view class="d-f align-stretch mb-5">
				<input type="text" v-model="code" placeholder="输入验证码" class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />
				<view class="border row rounded" style="width: 180rpx;" @click="getCode" :class="codeTime > 0 ? 'bg-light-black' : 'bg-black'">
					{{ codeTime > 0 ? codeTime + 's' : '获取验证码' }}
				</view>
			</view>
			<view class="py-2 w-100 row bg-black rounded mb-4" :disabled="disabled" type="" :class="disabled ? 'bg-light-black' : 'bg-black'" @click="submit" :loading="loading">
				{{ loading ? '登陆中..' : '登陆' }}
			</view>
			<view class="text-light-muted w-100 row-ac" style="height: 30rpx;">
				<view class="check-box row iconfont icon-gouxuan mr-2  border text-white rounded-50 font-s-1" @click="clickCheck" :class="checkIndex == true ? 'bg-black' : ''"></view>
				<view>登陆表示已阅读并同意《{{ appConfigInfo.shop_name }}商城协议》</view>
			</view>
			<!-- 快捷登录图标 -->
			<view class="quilc-login-group w-100 row">
				<button class="bottom-btn" @click="userInfoBtnClick">
					<view  class="iconfont icon-weixin1 font-s-8 row text-white rounded-50"></view>
				</button>
			</view>
			<!-- 快捷登录图标 -->
		</view>
		<!-- 输入手机号弹窗 -->
		<view class="phone-login-pop" v-show="loginPopVisible" @click="loginPopVisible = false">
			<view class="login-pop-content rounded" @click.stop="">
				<input type="text" placeholder="请输入微信绑定的手机号码" v-model="mobile" class="p-3 flex-1 mt-0 mb-5 border rounded" placeholder-class="text-light-muted" />
				<button @click.stop="weChatQuickLogin">微信授权登录</button>
			</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'; //头部非原生组件
import { sendSms, getLogin, weChatGetUserPhoneUrl, weChatUserLoginUrl,
	userInfo as userInfoUrl, unionidLoginUrl, weChatAppLoginUrl,getWeChatOpenidUrl,getConfigUrl
} from '@/api/index';

export default {
	components: {
		uniStatusBar
	},
	data() {
		return {
			shopSlogan: '更优惠 更省钱',
			mobile: '',
			code: '',
			codeTime: 0,
			groupDisabled: true,
			distributionPid:0,
			loading: false,
			userHttpInfo: {
				code: '',
				phone: '',
				iv: '',
				pid:'',
				encryptedData: ''
			},
			checkIndex:true,
			phoneLoginCode: '',
			LoginmodeIndex: 0,
			Loginmode: [{ modename: '手机验证码登陆' }],
			// 手机号登录弹窗显示隐藏
			loginPopVisible: false,
			checkUnionidHttpObj:{
				unionid: '',
				// 类型。1是小程序登录，2是app登录
				type:''
			},
			appLoginHttpObj: {
				phone: '',
				openId: '',
				unionId: '',
				gender: '',
				avatarUrl: ''
			},
			appConfigInfo:{},
			isScan:false,
			scanKey:'',
			scanCode:''
		};
	},
	onLoad(options){
		this.initData(options)
	},
	computed: {
		// 验证用户是否输入账号和密码登陆样式颜色变化
		disabled() {
			if (this.mobile === '' || this.code === '') {
				return true;
			}
			return false;
		}
	},
	methods: {
		initData(options){
			this.getScanDistributionInfo(options)
			this.getAppConfig()
		},
		// 通过扫码进入的
		getScanDistributionInfo(options){
			this.scanKey = JSON.stringify(options)
			// 如果有参数
			if(options.scene){
				this.isScan = true
				this.scanCode = options.scene
				let token = uni.getStorageSync('token');
				// 有token，说明已经登陆过了，返回首页
				if(token){
					console.log(1)
					uni.switchTab({
					    url: '/pages/index/index'
					});
				}else{
					// 保存进来的参数
					console.log(2)
					this.distributionPid = options.scene
				}
			}
			// 如果vuex中的分销商id不是0，那么说明是需要绑定的
			if(this.$store.state.shareDistributeId !==0){
				this.distributionPid = this.$store.state.shareDistributeId
			}
		},
		// 获取app配置
		getAppConfig(){
			// 获取基本配置
			this.appConfigInfo = this.$store.state.appConfig
			console.log(this.appConfigInfo)
			if(JSON.stringify(this.appConfigInfo) == '{}'){
				this.$R.get(getConfigUrl).then(res => {
					console.log(res)
					this.$store.commit('setAppConfigMutations',res.data)
					this.appConfigInfo = res.data
					console.log(this.$store.state.appConfig)
				})
			}
		},
		//手机表单验证
		validata() {
			//手机号正则
			var mPattern = /^1[345789]\d{9}$/;
			//输出 true
			if (!mPattern.test(this.mobile)) {
				uni.showToast({
					title: '你输入的手机号不正确',
					icon: 'none'
				});
				return false;
			}
			return true;

			//return false
		},

		// 获取验证码
		getCode() {
			//防止重复获取
			if (this.codeTime > 0) {
				return;
			}
			//验证手机号
			if (!this.validata()) return;
			//
			this.$R
				.get(sendSms, {
					mobile: this.mobile,
					verify_code: this.code
				})
				.then(res => {
					//倒计时
					this.codeTime = 60;
					let timer = setInterval(() => {
						if (this.codeTime >= 1) {
							this.codeTime--;
						} else {
							this.codeTime = 0;
							clearInterval(timer);
						}
					}, 1000);
				})
				.catch(error => {
					uni.showToast({
						title: '发送手机验证码失败'
					});
				});
		},
		// 验证码登录
		submit() {
			if(!this.checkIndex){
				// 没勾选用户协议
				return uni.showToast({
					title: '请阅读并勾选用户协议',
					icon: 'none'
				})
			}
			//表单验证
			if (!this.validata()) return;
			//提交后端
			this.$R.post(getLogin+'?pid='+this.distributionPid, {
					mobile: this.mobile,
					verify_code: this.code,
				}).then(async res => {
					if (res.code == 200) {
						this.loading = false;
						uni.showToast({
							title: '登陆中...',
							icon: 'none',
							duration: 3000
						});
						// 把token保存到Storage中
						await uni.setStorage({
							key: 'token',
							data: res.data
						});
						await this.$store.commit('setUserToken', res.data);

						await this.$R.get(userInfoUrl).then(res => {
							console.log(res);
							let resUserInfo = res.data;
							uni.setStorage({ key: 'userInfo', data: resUserInfo });
							uni.setStorage({ key: 'weChatOpenId', data: resUserInfo.openid });
						});
						// 关闭当前页面，返回之前的页面
						setTimeout(() => {
							if(this.isScan){
								// 因为扫码进入无法返回上一页，所以要做个判断
								// 如果是扫码进入，登录后直接跳回首页
								uni.switchTab({
									url: '/pages/index/index'
								});
							}else{
								uni.navigateBack({
									delta: 1
								});
							}
						}, 1000);
					} else {
						// res.data = 'api_token_2e9a21d2ab5011ebae8d13be0a73ae8b'
						return uni.showToast({
							title: '登录失败或者' + res.msg,
							icon: 'none',
							duration: 3000
						});
					}
				});
		},
		toBcak() {
			if(this.isScan){
				// 如果是扫码进入，直接跳回首页
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}else{
				// 因为扫码进入无法返回上一页，所以要做个判断
				uni.navigateBack({
					delta: 1
				});
			}
		},
		tapLoginMode(index) {
			this.LoginmodeIndex = index;
		},
		clickCheck(){
			this.checkIndex = !this.checkIndex
		},
		// 第一次绑定手机号微信登录
		weChatQuickLogin() {
			if(!this.checkIndex){
				// 没勾选用户协议
				return uni.showToast({
					title: '请阅读并勾选用户协议',
					icon: 'none'
				})
			}
			//验证手机号
			if (!this.validata()) return;
			let that = this;
			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					that.userHttpInfo.code = loginRes.code;
				}
			});
			uni.getUserProfile({
				desc: '获取用户基本信息',
				success: function(infoRes) {
					console.log(infoRes);
					if (infoRes.encryptedData == undefined) {
						return uni.showToast({
							title: '未获得授权信息',
							icon: 'none',
							duration: 3000
						});
					}
					that.userHttpInfo.iv = infoRes.iv;
					that.userHttpInfo.encryptedData = infoRes.encryptedData;
					that.userHttpInfo.phone = that.mobile;
					that.$R.post(weChatUserLoginUrl+'?pid='+that.distributionPid, that.userHttpInfo).then(async res => {
						await that.commonLogin(res);
					});
				},
				fail: function(err) {
					console.log(err);
				}
			});
			// #endif

			// #ifdef APP-PLUS
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					that.userHttpInfo.code = loginRes.code;
					that.appLoginHttpObj.code = loginRes.code;
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							console.log(infoRes);
							that.appLoginHttpObj.phone = that.mobile;
							that.appLoginHttpObj.openId = infoRes.userInfo.openId;
							that.appLoginHttpObj.unionId = infoRes.userInfo.unionId;
							that.appLoginHttpObj.nickName = infoRes.userInfo.nickName;
							that.appLoginHttpObj.gender = infoRes.userInfo.gender;
							that.appLoginHttpObj.avatarUrl = infoRes.userInfo.avatarUrl;
							console.log(that.appLoginHttpObj);
							that.$R.post(weChatAppLoginUrl, that.appLoginHttpObj).then(res => {
								console.log(res);
								that.commonLogin(res);
							});
						}
					});
				}
			});

			// #endif
		},
		// 快捷登录
		async userInfoBtnClick() {
			let that = this;

			if(!this.checkIndex){
				// 没勾选用户协议
				return uni.showToast({
					title: '请阅读并勾选用户协议',
					icon: 'none'
				})
			}

			// #ifdef MP-WEIXIN
			await uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.userHttpInfo.code = loginRes.code;
					 // 获取用户信息
					that.$R.get(getWeChatOpenidUrl,{code:that.userHttpInfo.code}).then(res => {
						 that.checkUnionidHttpObj.unionid = res.data.unionid;
						 that.checkUnionidHttpObj.type = 1
						 // 后台验证unionid
						 that.$R.get(unionidLoginUrl, that.checkUnionidHttpObj).then(res => {
							 console.log("AAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBB");
							 console.log(res);
							 if (JSON.stringify(res.data) !== '{}') {
								 that.commonLogin(res);
								 return false;
							 } else {
								 that.loginPopVisible = true;
							 }
						 });
					});
				}
			});
			// #endif

			// #ifdef APP-PLUS
			await uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.checkUnionidHttpObj.unionid = loginRes.authResult.unionid;
					that.checkUnionidHttpObj.type = 2;
					that.$R.get(unionidLoginUrl, that.checkUnionidHttpObj).then(res => {
						if (JSON.stringify(res.data) !== '{}') {
							that.commonLogin(res);
							return false;
						} else {
							that.loginPopVisible = true;
						}
					});
				}
			});
			// #endif
		},
		async commonLogin(res) {
			uni.showToast({
				title: '登陆中...',
				icon: 'none',
				duration: 3000
			});
			console.log(res);
			// 把token保存到Storage中
			await uni.setStorage({
				key: 'token',
				data: res.data
			});
			await this.$store.commit('setUserToken', res.data);
			await this.$R.get(userInfoUrl).then(result => {
				console.log(result);
				let resUserInfo = result.data;
				uni.setStorage({ key: 'userInfo', data: resUserInfo });
				uni.setStorage({ key: 'weChatOpenId', data: resUserInfo.openid });
			});
			// 关闭当前页面，返回之前的页面
			setTimeout(() => {
				if(this.isScan){
					// 因为扫码进入无法返回上一页，所以要做个判断
					// 如果是扫码进入，登录后直接跳回首页
					uni.switchTab({
					    url: '/pages/index/index'
					});
				}else{
					uni.navigateBack({
						delta: 1
					});
				}

			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.phone-login-pop {
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.9);

	.login-pop-content {
		height: 230rpx;
		width: 480rpx;
		position: absolute;
		left: 100rpx;
		top: 500rpx;
		background: #ffffff;
		padding: 40rpx;
		button{
			background-color: #28A745;
			color: #FFFFFF;
		}
		button:after{
			border: none;
		}
	}
}
.check-box{
	width: 33rpx;
	height: 33rpx;
}
.quilc-login-group {
	height: 100rpx;
    margin-top: 180rpx;
	.iconfont {
		width: 100rpx;
		height: 100rpx;
		background-color: #00B10A;
	}
}
.active .mode-name {
	color: $main-color;
	font-weight: bold;
}
	.bottom-btn{
		border: none;
		background-color: transparent;
	}
.bottom-btn:after{
	border: none;
}
</style>
