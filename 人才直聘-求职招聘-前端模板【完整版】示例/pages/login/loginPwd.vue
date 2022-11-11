<template>
	<view class="login">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="content">
			<view class="top_click martop_app">
				<view style="display: flex;align-items: center;width: 40%;height: 80upx;flex-direction: column;" @click="typeLogin(0)">
					<text style="font-size: 40upx;">验证登录</text>
					<view :class="currentIndex == 0 ? 'bottom-select-line' : ''"></view>
				</view>
				<view style="display: flex;align-items: center;width: 40%;height: 80upx;flex-direction: column;" @click="typeLogin(1)">
					<text style="font-size: 40upx;">密码登录</text>
					<view :class="currentIndex == 1 ? 'bottom-select-line' : ''"></view>
				</view>
			</view>
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="passData" type="password" placeholder="密码" v-if="currentIndex == 1"></wInput>
				<wInput
					v-model="verCode"
					type="number"
					placeholder="验证码"
					isShowCode
					codeText="获取验证码"
					ref="runCode"
					@setCode="getVerCode()"
					v-if="currentIndex == 0"
				></wInput>
			</view>
			<wButton text="登 录" bgColor="#12ae85" :rotate="isRotate" @click.native="startLogin()"></wButton>
			<!-- 其他登录 -->
			<!-- <view class="auth-login">
				<view class="auth-log-login">
					<image src="/static/login_wx.png" style="width: 80upx;height: 80upx;"></image>
					<button v-if="isWeiXin == 1" class="btn-wx" @click="wechatH5Login" :disabled="logining">微信授权登录</button>
				</view>
			</view> -->
			<view class="footer">
				<navigator url="/pages/login/forgetPwd" open-type="navigate">找回密码</navigator>
				<!-- <text>|</text> -->
				<!-- <navigator url="/pages/public/reg" open-type="navigate">注册账号</navigator> -->
			</view>
			<!-- 底部信息 -->
			<view class="bottom_pact">
				<radio-group @change="radioGroup"><radio color="#12ae85" :value="1" :checked="radioValue" style="transform:scale(0.72);"></radio></radio-group>
				<view class="agreement">
					已阅读并同意
					<text class="agreement-text"  @click="toTerms">用户协议</text>
					和
					<text class="agreement-text" @click="toPrivacy">隐私政策</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _this;
import wInput from '@/components/watch-login/watch-input.vue'; //input
import wButton from '@/components/watch-login/watch-button.vue'; //button
import { mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			//logo图片 base64
			logoImage: '',
			phoneData: '', //用户/电话
			passData: '', //密码
			isRotate: false, //是否加载旋转
			checked: false,
			radioValue: 0,
			currentIndex: 0,
			isWeiXin: 0,
			isGetPhone: false,
			verCode: '',
			code: null
		};
	},
	components: {
		wInput,
		wButton
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	onLoad() {
		// let isWeiXin = this.$common.isWeiXinBrowser();
		// if (isWeiXin) {
		// 	this.isWeiXin = 1;
		// }
	},
	mounted() {
		_this = this;
	},
	methods: {
		...mapMutations(['login']),

		// H5微信登录
		wechatH5Login() {
			if (this.radioValue != 1) {
				uni.showToast({
					title: '请勾选用户协议',
					icon: 'none'
				});
				return false;
			}
			const that = this;
			let href = window.location.origin;
			let page = that.$api.prePage();
			let prePath = '/pages/index/index';
			if (page) {
				prePath = page.__page__.path;
			}
			window.location =
				'https://open.weixin.qq.com/connect/oauth2/authorize?' +
				'appid=' +
				Api.h5Appid +
				'&redirect_uri=' +
				escape(href) +
				'&response_type=code&scope=snsapi_userinfo&state=mallplus#wechat_redirect';
		},

		// 登录
		async startLogin() {
			//用户来源：0->Android；1->IOS 2->h5 3->微信小程序 4->支付宝小程序
			let sourceType = 0;
			//#ifdef MP-WEIXIN
			sourceType = 3;
			//#endif
			//#ifdef APP-PLUS
			if (plus.os.name == 'Android') {
				sourceType = 0;
			} else {
				sourceType = 1;
			}
			//#endif
			// 验证码登录
			if (this.currentIndex == 0) {
				let phoneReg = /^1[1-9][0-9]\d{8}$/;
				try {
					if (this.phoneData == '') {
						throw '请填写手机号';
					}
					if (!phoneReg.test(this.phoneData)) {
						throw '手机号格式有误';
					}
					if (this.verCode == '') {
						throw '请填写验证码';
					}
					if (this.radioValue != 1) {
						throw '请勾选用户协议';
					}
				} catch (err) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: err
					});
					return;
					return;
				}
				let params = {
					phone: this.phoneData,
					code: this.verCode,
				};
				let data = await this.$apis.memberLoginForCode(params);
				if (data) {
					this.$store.commit('SET_USERINFO', data.currMember || {});
					// 前端自动登录
					this.$store.commit('SET_TOKEN', data.token);
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						position: 'bottom'
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/user/user'
						});
					}, 1000);
				}
			} else {
				let phoneReg = /^1[1-9][0-9]\d{8}$/;
				try {
					if (this.phoneData == '') {
						throw '请填写手机号';
					}
					if (!phoneReg.test(this.phoneData)) {
						throw '手机号格式有误';
					}
					if (this.passData == '') {
						throw '请填写密码';
					}
					if (this.radioValue != 1) {
						throw '请勾选用户协议';
					}
				} catch (err) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: err
					});
					return;
					return;
				}
				let params = {
					phone: this.phoneData,
					password: this.passData
				};
				let data = await this.$apis.memberLogin(params);
				if (data) {
					console.log(data);
					this.$store.commit('SET_USERINFO', data.currMember || {});
					// 前端自动登录
					this.$store.commit('SET_TOKEN', data.token);

					uni.showToast({
						title: '登录成功',
						icon: 'none',
						position: 'bottom'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/user/user'
						});
					}, 1000)
					if (this.isRotate) {
						//判断是否加载中，避免重复点击请求
						return false;
					}
					_this.isRotate = true;
					setTimeout(function() {
						_this.isRotate = false;
					}, 3000);
				}
			}
		},

		//获取验证码
		async getVerCode() {
			var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (!myreg.test(this.phoneData)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号码',
					position: 'bottom'
				});
				return false;
			}
			//触发倒计时（一般用于请求成功验证码后调用）
			this.$refs.runCode.$emit('runCode');
			let params = {
				phone: this.phoneData
			};
			let data = await this.$apis.getVerifyCode(params);
			console.log('getVerCode===', data);
			if (data) {
				uni.showToast({
					title: '获取成功',
					icon: 'none',
					position: 'bottom'
				});
			}
			//终止倒计时（用于突然需要终止倒计时的场景）
			this.$refs.runCode.$emit('runCode',0);
		},

		// 登录方式切换
		typeLogin(index) {
			this.currentIndex = index;
		},

		radioGroup(e) {
			this.radioValue = e.detail.value;
		},

		// 返回
		navBack() {
			uni.navigateBack({
				delta: 1
			});
			// uni.switchTab({ url: '/pages/index/index' });
		},

		isLogin() {},

		toTerms() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.terms
			});
		},
		
		toPrivacy() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.privacy
			});
		},
	}
};
</script>

<style lang="scss">
/* @import url('../../components/watch-login/css/icon.css'); */
.bottom_pact {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 70upx;
	line-height: 70upx;
	width: 100%;
	// margin-top: 50upx;
	position: fixed;
	bottom: 40upx;
	.agreement{
		font-size: 28upx;
		color: #9B9B9B;
	}
	.agreement-text {
		text-decoration: underline;
		color: #12ae85;
		padding: 0 10upx;
		font-size: 28upx;
	}
}

.confirm-btn {
	width: 100%;
	padding: 3%;
	display: flex;
	flex-direction: column;
	// height: 100upx;
	// line-height: 100upx;
}

.confirm-btn-wx {
	width: 600upx;
	height: 100upx;
	line-height: 100upx;
	border-radius: 50px;
	margin-top: 45upx;
	background: #3fa041;
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 100px;
	}
}

.confirm-btn-wx2 {
	width: 98%;
	height: 75upx;
	line-height: 75upx;
	border-radius: 10upx;
	margin-top: 45upx;
	background: #3fa041;
	color: #fff;
	font-size: $font-lg;
}

.confirm-btn-phone {
	width: 98%;
	height: 75upx;
	line-height: 75upx;
	border-radius: 10upx;
	margin-top: 30upx;
	background: #fff;
	color: #333;
	font-size: $font-lg;
}

.confirm-btn-cancel {
	width: 40%;
	height: 100upx;
	line-height: 100upx;
	border-radius: 50px;
	margin-top: 45upx;
	background: #ffffff;
	border: 1upx solid #3fa041;
	color: #3fa041;
	font-size: $font-lg;

	&:after {
		border-radius: 100px;
	}
}

.auth-login {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 100upx;
}

.auth-log-login {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	width: 80upx;
	height: 80upx;
	position: relative;
	margin: 0 35upx;
}

.btn-wx {
	position: fixed;
	opacity: 0;
	border-radius: 50px;
	background: #2ba245;
	color: #fff;
	font-size: $font-lg;
}

.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	// top: 40upx;
	top: 20upx;
	font-size: 40upx;
	color: $font-color-dark;
}

.top_click {
	display: flex;
	width: 100%;
	height: 120upx;
	align-items: center;
	justify-content: center;
	margin-bottom: 20upx;
}

.top_click_xcx {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	margin-bottom: 20upx;
}

.martop_app {
	margin-top: 200upx;
}

.martop_xcx {
	margin-top: 180upx;
	display: flex;
	flex-direction: column;
}

.header {
	margin: 50upx 0 50upx 0;
	// border-bottom: 1px solid #eee;
	text-align: center;
	width: 100%;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200upx;
	height: 200upx;
}

.content2 {
	padding: 30upx 80upx;
}

.content2 text {
	display: block;
	color: #9d9d9d;
	margin-top: 40rpx;
}

.bottom-select-line {
	width: 50upx;
	height: 8upx;
	// margin-top: 10upx;
	border-radius: 15upx;
	background: $main-color;
	color: $main-color;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* margin-top: 128upx; */
}

/* 主体 */
.main {
	display: flex;
	flex-direction: column;
	padding-left: 70upx;
	padding-right: 70upx;
}

.tips {
	color: #999999;
	font-size: 28upx;
	margin-top: 64upx;
	margin-left: 48upx;
}

/* 其他登录方式 */
.other_login {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 256upx;
	text-align: center;
}

.login_icon {
	border: none;
	font-size: 64upx;
	margin: 0 64upx 0 64upx;
	color: rgba(0, 0, 0, 0.7);
}

.wechat_color {
	color: #83dc42;
}

.weibo_color {
	color: #f9221d;
}

.github_color {
	color: #24292e;
}

/* 底部 */
.footer {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	width: 88%;
	font-size: 28upx;
	margin-top: 30upx;
	color: #999;
	text-align: center;
	height: 40upx;
	line-height: 40upx;
}

.footer text {
	font-size: 24upx;
	margin-left: 15upx;
	margin-right: 15upx;
}
</style>
