<template>
	<view>
		<view class="wx-auth" v-if="canIUse">
			<view class="top">
				<view class="header"><image src="../../static/logo.png"></image></view>
				<!-- <view class="content2">
					<view class="text-size-max">申请获取以下权限</view>
					<text>获得您的公开信息(昵称，头像等)</text>
				</view> -->
				<view class="btn">
					<!-- <button  class='cancel-login' type='default' lang="zh_CN" @click="cancle()">
						暂不登录
					</button> -->
					<button class="btn-get-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="isGetPhone == true">一键绑定手机号登录</button>
					<!-- <button class="btn-auth" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" v-else>微信一键登录/注册</button> -->
					<button class="btn-auth" @click="wxGetUserInfo" withCredentials="true" v-else>微信一键登录/注册</button>
				</view>
			</view>
			<view class="bottom">
				<view class="other-login">
					<text class="title">其他登录方式</text>
					<text class="yzb yzb-shoujisel" @click="phoneLogin()"></text>
				</view>
				<view class="agreement">
					<radio-group @change="radioGroup"><radio color="#12ae85" :value="1" :checked="radioValue" style="transform:scale(0.72);"></radio></radio-group>
					<view class="agreement2">
						已阅读并同意
						<text class="agreement-text"  @click="toTerms">用户协议</text>
						和
						<text class="agreement-text" @click="toPrivacy">隐私政策</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//判断小程序的API，回调，参数，组件等是否在当前版本可用。
			canIUse: uni.canIUse('button.open-type.getUserInfo'),
			bindUserInfo: null,

			radioValue: 0,
			isGetPhone: false
		};
	},

	onShow: function() {},

	methods: {
		
		// 小程序微信登录
		wxGetUserInfo: function(res) {
			const that = this;
			uni.getUserProfile({
				desc:'完善用户信息',
				success:(ress)=>{
					let datas = '';
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							that.bindUserInfo=JSON.parse(ress.rawData);
							that.getOpenId(loginRes.code);
						}
					});
				},
				fail:(res)=>{
					console.log(res);
					uni.showToast({
						title: '您取消了授权,登录失败',
						icon: 'none'
					});
				}
			});
		},

		async getOpenId(code) {
			let res = await this.$apis.getOpenId({ code: code });
			this.openid = res.openid;
			this.session_key = res.session_key;
			this.$store.commit('SET_OPENID', res.openId);
			uni.setStorage({
				key: 'session_key',
				data: res.session_key
			});
			if (res != null) {
				this.xcxLogin(res.openId);
			}
		},

		bindGetUserInfo(e) {
			if (this.radioValue != 1) {
				uni.showToast({
					title: '请勾选用户协议',
					icon: 'none',
					position: 'bottom'
				});
				return false;
			}
			if (e.detail.userInfo) {
				var that = this;
				this.bindUserInfo = e.detail.userInfo;
				that.isHide = true;
				that.isPhoneShow = true;
				uni.showLoading({
					title: '授权登录中···'
				});
				this.wxAuth();
			} else {
				//用户按了拒绝按钮
				uni.showModal({
					title: '警告',
					content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
					showCancel: false,
					confirmText: '返回授权',
					success: function(res) {
						// 用户没有授权成功，不需要改变 isHide 的值
						if (res.confirm) {
							console.log('用户点击了“返回授权”');
						}
					}
				});
			}
		},

		async xcxLogin(openid) {
			var that = this;
			let param = {
				openid: openid,
				avatar: this.bindUserInfo.avatarUrl,
				nickName: this.bindUserInfo.nickName
			};
			let res = await this.$apis.xcxUserLogin(param);
			console.log('xcxUserLogin===', res);
			if (res != '账号不存在' && res != '未绑定手机号') {
				this.$store.commit('SET_USERINFO', res.currMember || {});
				// 前端自动登录
				this.$store.commit('SET_TOKEN', res.token);
				uni.navigateBack({
					delta: 1
				});
			} else {
				console.log('绑定手机号');
				this.isGetPhone = true;
			}
		},

		//绑定手机号并登录
		async bindPhoneForWx(ivStr, encDataStr) {
			let param = {
				openid: uni.getStorageSync('openId'),
				keyStr: uni.getStorageSync('session_key'),
				ivStr: ivStr,
				encDataStr: encDataStr,
				avatar: this.bindUserInfo.avatarUrl,
				nickName: this.bindUserInfo.nickName
			};
			let res = await this.$apis.bindPhoneForWx(param);
			if (res) {
				this.$store.commit('SET_USERINFO', res.currMember || {});
				// 前端自动登录
				this.$store.commit('SET_TOKEN', res.token);
				uni.navigateBack({
					delta: 1
				});
			}
			console.log('bindPhoneForWx', res);
		},

		// 获取微信手机号码
		getPhoneNumber(params) {
			console.log('getPhoneNumber', params);
			var that = this;
			this.bindPhoneForWx(params.detail.iv, params.detail.encryptedData);
		},

		phoneLogin() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.loginPwd
			});
		},

		cancle() {
			uni.navigateBack({
				delta: 1
			});
		},

		updateMember() {
			if (this.bindUserInfo != null) {
				var member = {
					avatar: this.bindUserInfo.avatarUrl,
					name: this.bindUserInfo.nickName,
					sex: this.bindUserInfo.gender,
					nickName: this.bindUserInfo.nickName
				};
				api.getUpdateMemberInfo(member, res => {
					if (res.data.code == 200) {
						uni.showToast({ title: res.data.message });
					}
				});
			}
		},

		radioGroup(e) {
			this.radioValue = e.detail.value;
		},
		
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
/* 微信授权 */

.wx-auth {
	// height: calc(100vh);
	width: 100%;

	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 100%;
		height: 450rpx;
	}

	.header image {
		width: 260upx;
		height: 260upx;
	}

	.content2 {
		padding: 30upx 80upx;
	}

	.content2 text {
		display: block;
		color: $font-color-666;
		margin-top: 40rpx;
	}

	.btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btn-auth {
		border-radius: 20rpx;
		margin-top: 50upx;
		font-size: 35rpx;
		width: 90%;
		background-color: $main-color;
		color: #ffffff;
	}

	.btn-get-phone {
		border-radius: 20rpx;
		margin-top: 50upx;
		font-size: 35rpx;
		width: 90%;
		background-color: $main-color;
		color: #ffffff;
	}

	.cancel-login {
		border-radius: 15rpx;
		margin: 70rpx 20rpx 50rpx 50rpx;
		font-size: 35rpx;
		background-color: #eeeeee;
		width: 30%;
	}
}

.bottom {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 20upx;

	.other-login {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			color: $font-color-666;
		}

		.yzb-shoujisel {
			font-size: 100upx;
			color: $main-color;
		}
	}
	.agreement {
		margin-top: 50upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.agreement2{
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
}
</style>
