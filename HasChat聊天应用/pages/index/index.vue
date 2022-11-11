<template>
	<view class="container">
		<view class="bg bg-color-base margin-b20"></view>
		<!-- 顶部登录/注册 -->
		<view class="tab vs-row vs-align-center">
			<!-- <image class="tab-bg"
				src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/banner-icon.png?sign=d63f6b91aed3733b261cc0127d2cf702&t=1604049324"
				mode=""></image> -->
			<image class="rocket rocket-sussuspension" src="../../static/img/login_top3.png" mode="widthFix"></image>

			<view class="vs-row vs-align-center">
				<view class="vs-column vs-align-center margin-r40" @click="tiggerSelect(0)">
					<text class="font-50 margin-b20" :class="[cur ? 'color-black-3': 'color-base']">登录</text>
					<view class="line bg-color-base" v-if="!cur"></view>
				</view>
				<view class="vs-column vs-align-center" @click="tiggerSelect(1)">
					<text class="font-46 margin-b20" :class="[cur ? 'color-base': 'color-black-3']">注册</text>
					<view class="line bg-color-base" v-if="cur"></view>
				</view>
			</view>
		</view>
		<!-- 登录input输入框 -->
		<view class="login margin-b80" v-if="!cur">
			<view class="input vs-row vs-align-center margin-b40">
				<!-- <image class="input-icon margin-r20"
					src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/account.png?sign=599d8600e2d55f39ebd1cbc159a04729&t=1604049340"
					mode=""></image> -->
				<input class="vs-flex-item color-base font-30" v-model="form.email" type="text" value=""
					placeholder="请输入QQ邮箱" placeholder-class="input-placeholder" />
			</view>
			<view class="input vs-row vs-align-center margin-b40">
				<!-- <image class="input-icon margin-r20"
					src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/password.png?sign=9f8fdd0ae0a1ae530a9226de8917ebbd&t=1604049354"
					mode=""></image> -->
				<input class="vs-flex-item color-base font-30" v-model="form.password" type="text" password value=""
					placeholder="请输入登录密码" placeholder-class="input-placeholder" />
			</view>
		</view>
		<!-- 注册input输入框 -->
		<view class="register margin-b80" v-if="cur">
			<view class="input vs-row vs-align-center margin-b40">
				<!-- <image class="input-icon margin-r20"
					src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/account.png?sign=599d8600e2d55f39ebd1cbc159a04729&t=1604049340"
					mode=""></image> -->
				<input class="vs-flex-item color-base font-30" type="text" value="" placeholder="请输入QQ邮箱"
					v-model="registerForm.email" placeholder-class="input-placeholder" />
			</view>
			<!-- <view class="input vs-row vs-align-center margin-b40">
				<image class="input-icon margin-r20" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/password.png?sign=9f8fdd0ae0a1ae530a9226de8917ebbd&t=1604049354"
				 mode=""></image>
				<input class="vs-flex-item color-base font-30" type="text" password value="" placeholder="请输入您的登录密码"
				 placeholder-class="input-placeholder" />
			</view> -->
		</view>

		<view class="button bg-color-base vs-row vs-align-center vs-space-center margin-b20" @click="toLogin">
			<text class="color-white font-34">立即{{ cur ? '注册': '登录' }}</text>
		</view>
		<view v-if="!cur" class="button bg-color-base vs-row vs-align-center vs-space-center margin-b20"
			@click="getRandom">
			<text class="color-white font-34">随机获取</text>
		</view>
		<view class="vs-row vs-align-center vs-space-center margin-b100">
			<text class="color-base font-28">忘记密码？</text>
		</view>
		<!-- 验证码弹窗 -->
		<view v-show="showModal" class="cover">
			<view v-if="step == 1" class="register-box">
				<view class="close-btn" @click="showModal=false">
					X
				</view>
				<view class="margin-auto input vs-row vs-align-center margin-b40">
					<input class="vs-flex-item color-base font-30" type="text" value="" :maxlength="6"
						placeholder="请输入您的验证码" placeholder-class="input-placeholder" v-model="verificationCode" />
				</view>
				<view class="option">
					<view v-if="!sendVerificationCodeState" class="btn" @click="toSendVerificationCode">
						发送验证码
					</view>
					<view v-else class="disabled-btn">
						已发送({{ countdown }})
					</view>
					<view :class="(verificationCode.length == 6 && hasSendVerificationCode) ? 'btn':'disabled-btn'"
						@click="toCheckVerificationCode">
						下一步
					</view>
				</view>
			</view>
			<view v-if="step == 2" class="register-box">
				<view class="close-btn" @click="showModal=false">
					X
				</view>
				<view class="margin-auto input vs-row vs-align-center margin-b40">
					<input class="vs-flex-item color-base font-30" type="text" value="" placeholder="请输入用户名"
						v-model="registerForm.name" placeholder-class="input-placeholder" />
				</view>
				<view class="margin-auto input vs-row vs-align-center margin-b40">
					<input class="vs-flex-item color-base font-30" type="password" value="" placeholder="请输入密码"
						v-model="registerForm.password" placeholder-class="input-placeholder" />
				</view>
				<view class="margin-auto input vs-row vs-align-center margin-b40">
					<input class="vs-flex-item color-base font-30" type="password" value="" placeholder="请确认密码"
						v-model="registerForm.surePassword" placeholder-class="input-placeholder" />
				</view>
				<view class="option">
					<view class="btn" @click="toRegister">
						注册
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0,
				showModal: false,
				form: {
					email: '',
					password: '',
				},
				registerForm: {
					name: "",
					email: "",
					password: "",
					surePassword: "",
					avatar: "",
				},
				step: 1,
				timestamp: +new Date(),
				verificationCode: "",
				sendVerificationCodeState: false, // 验证码倒计时状态
				hasSendVerificationCode: false, //是否发送验证码
				countdown: 60,
				timer: null,
				loading: false
			}
		},
		methods: {
			tiggerSelect(state) {
				this.cur = state;
				this.initChangeStage(state)
			},
			toRegister() {
				if (!this.registerForm.name) {
					this.$Common.tipMsg("用户名不能为空");
					return;
				}
				if (!this.registerForm.password) {
					this.$Common.tipMsg("密码不能为空");
					return;
				}
				if (this.registerForm.password !== this.registerForm.surePassword) {
					this.$Common.tipMsg("两次密码不一致");
					return;
				}
				this.$Request.post(this.$Config.APIURL + "/api/register", this.registerForm).then(res => {
					if (res?.code == 200) {
						this.$Common.tipMsg(res?.message);
						this.showModal = false;
						this.initChangeStage(0);
					} else {
						this.$Common.tipMsg(res?.message);
					}
				});
			},
			toCheckVerificationCode() {
				if (!(this.verificationCode.length == 6 && this.hasSendVerificationCode)) {
					return;
				}
				let query = {
					verificationCode: this.verificationCode,
					timestamp: this.timestamp,
				};
				this.$Request.post(this.$Config.APIURL + "/api/checkVerificationCode", query).then(res => {
					if (res?.code == 200) {
						if (this.timer != null) {
							clearInterval(this.timer);
							this.timer = null;
						}
						this.step = 2;
						this.countdown = 60;
						this.sendVerificationCodeState = false;
					} else {
						this.$Common.tipMsg(res?.message);
					}
				})
			},
			toSendVerificationCode() {
				let query = {
					email: this.registerForm.email,
					timestamp: this.timestamp,
				};
				this.$Request.post(this.$Config.APIURL + "/api/sendVerificationCode", query).then(res => {
					if (res?.code == 200) {
						this.$Common.tipMsg(res?.message);
						this.sendVerificationCodeState = true;
						this.hasSendVerificationCode = true;
						this.timer = setInterval(() => {
							if (this.countdown < 1) {
								if (this.timer != null) {
									clearInterval(this.timer);
									this.timer = null;
								}
								this.countdown = 60;
							} else {
								this.countdown--;
							}
						}, 1000);
					} else {
						this.$Common.tipMsg(res?.message);
					}
				})
			},
			initChangeStage(state) {
				this.cur = state;
				this.step = 1;
				this.verificationCode = "";
				this.sendVerificationCodeState = false;
				this.hasSendVerificationCode = false;
				this.registerForm.email = "";
				this.registerForm.name = "";
				this.registerForm.password = "";
				this.registerForm.surePassword = "";
				this.form.email = "";
				this.form.password = "";
				this.countdown = 60;
				this.timer = null;
			},
			// 登陆
			toLogin() {
				if (this.cur == 0) {
					if (!this.form.email) {
						this.$Common.tipMsg("请输入用户邮箱")
						return;
					}
					if (!this.form.password) {
						this.$Common.tipMsg("请输入用户密码")
					}
					this.$Request.post(this.$Config.APIURL + "/api/login", this.form).then(res => {
						if (res?.code == 200) {
							this.$Common.initSetInfo(res?.data);
							this.initChangeStage(0);
							this.$Common.reLaunch("/chatUser/chatUser");
						} else {
							this.$Common.tipMsg(res?.message)
							this.$Common.logout();
						}
					})
				} else {
					this.registerOperate()
				}
			},
			async registerOperate() {
				try {
					if (this.registerForm.email.indexOf("@qq.com") == -1) {
						this.$Common.tipMsg("请输入正确的QQ邮箱");
						return;
					}
					let opt = this.registerForm.email.split("@");
					if (opt.length != 2) {
						this.$Common.tipMsg("请输入正确的QQ邮箱");
						return;
					}
					let res = await this.getQQUserInfo(opt[0]);
					this.registerForm.name = res.name;
					this.registerForm.avatar = res.imgurl;
					this.showModal = true;
				} catch (err) {
					this.$Common.tipMsg(err);
				}
			},
			getQQUserInfo(qq) {
				return new Promise((resolve, reject) => {
					this.loading = true;
					this.$Request.get("https://tenapi.cn/qqname/?qq=" + qq).then(res => {
						if (res?.code == 200) {
							resolve(res);
						} else {
							let msg = res.msg || "查询的QQ号不存在";
							reject(msg);
						}
					}).finally(() => {
						this.loading = false;
					});
				});
			},
			getRandom() {
				console.log("获取随机用户密码")
				this.$Request.post(this.$Config.APIURL + "/api/getRandomUser").then(res => {
					if (res?.code == 200) {
						this.form.email = res?.data?.Email;
						this.form.password = res?.data?.Password;
					} else {
						this.$Common.tipMsg(res?.message)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.rocket-sussuspension {
		animation: suspension 3s ease-in-out infinite;
	}

	@keyframes suspension {

		0%,
		100% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(-0.8rem, 1rem);
		}
	}

	.rocket {
		margin: 50rpx 28%;
		width: 400rpx;
		will-change: transform;
		position: absolute;
		top: -170px;
		right: -130px;
		width: 220px;
	}

	.register-box {
		padding: 10px;
		width: 92%;
		background: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		min-height: 400rpx;

		.option {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			width: 100%;

			.btn {
				width: 40%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border-radius: 4px;
				color: #fff;
				background-color: #292D32;
				font-size: 13px;
			}

			.disabled-btn {
				width: 40%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border-radius: 4px;
				color: #888;
				background-color: #DEDEDE;
				font-size: 13px;
			}
		}
	}

	.close-btn {
		position: absolute;
		left: 50%;
		top: -50px;
		transform: translateX(-50%);
		height: 30px;
		width: 30px;
		font-size: 12px;
		color: #fff;
		background-color: #000;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
	}

	.container {
		position: relative;
	}

	.bg {
		position: relative;
		width: 750rpx;
		height: 400rpx;
	}

	.tab {
		position: absolute;
		top: 250rpx;
		left: 20rpx;
		right: 20rpx;
		height: 150rpx;
		padding: 0 50rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		&-bg {
			position: absolute;
			top: -200rpx;
			right: -50rpx;
			width: 440rpx;
			height: 285rpx;
		}
	}

	.line {
		width: 25rpx;
		height: 7rpx;
	}

	.login,
	.register {
		padding: 0 60rpx;
	}

	.input {
		width: 580rpx;
		height: 90rpx;
		padding: 0 30rpx;
		background-color: rgba(80, 100, 235, 0.1);
		border-radius: 100rpx;

		&-icon {
			width: 30rpx;
			height: 38rpx;
		}

		&-placeholder {
			color: #5064eb;
		}
	}

	.button {
		width: 630rpx;
		height: 90rpx;
		margin-left: 60rpx;
		border-radius: 100rpx;
	}

	.separator {
		height: 2rpx;
		margin: 0 30rpx;
		background-color: #f5f5f5;
	}

	.other {
		&-items {
			padding: 0 200rpx;
		}

		&-icon {
			width: 50rpx;
			height: 50rpx;
		}
	}

	// 下边距
	.margin-b5 {
		margin-bottom: 5rpx;
	}

	.margin-b10 {
		margin-bottom: 10rpx;
	}

	.margin-b15 {
		margin-bottom: 15rpx;
	}

	.margin-b20 {
		margin-bottom: 20rpx;
	}

	.margin-b25 {
		margin-bottom: 25rpx;
	}

	.margin-b30 {
		margin-bottom: 30rpx;
	}

	.margin-b40 {
		margin-bottom: 40rpx;
	}

	.margin-b60 {
		margin-bottom: 60rpx;
	}

	.margin-b80 {
		margin-bottom: 80rpx;
	}

	.margin-b100 {
		margin-bottom: 100rpx;
	}

	// 右边距
	.margin-r5 {
		margin-right: 5rpx;
	}

	.margin-r10 {
		margin-right: 10rpx;
	}

	.margin-r15 {
		margin-right: 15rpx;
	}

	.margin-r20 {
		margin-right: 20rpx;
	}

	.margin-r25 {
		margin-right: 25rpx;
	}

	.margin-r30 {
		margin-right: 30rpx;
	}

	.margin-r40 {
		margin-right: 40rpx;
	}

	.margin-r60 {
		margin-right: 60rpx;
	}

	// 字体大小
	.font-18 {
		font-style: normal;
		font-size: 18rpx;
		font-family: Droid Sans Fallback;
	}

	.font-20 {
		font-style: normal;
		font-size: 20rpx;
		font-family: Droid Sans Fallback;
	}

	.font-22 {
		font-style: normal;
		font-size: 22rpx;
		font-family: Droid Sans Fallback;
	}

	.font-24 {
		font-style: normal;
		font-size: 24rpx;
		font-family: Droid Sans Fallback;
	}

	.font-26 {
		font-style: normal;
		font-size: 26rpx;
		font-family: Droid Sans Fallback;
	}

	.font-28 {
		font-style: normal;
		font-size: 28rpx;
		font-family: Droid Sans Fallback;
	}

	.font-30 {
		font-style: normal;
		font-size: 30rpx;
		font-family: Droid Sans Fallback;
	}

	.font-32 {
		font-style: normal;
		font-size: 32rpx;
		font-family: Droid Sans Fallback;
	}

	.font-34 {
		font-style: normal;
		font-size: 34rpx;
		font-family: Droid Sans Fallback;
	}

	.font-36 {
		font-style: normal;
		font-size: 36rpx;
		font-family: Droid Sans Fallback;
	}

	.font-38 {
		font-style: normal;
		font-size: 38rpx;
		font-family: Droid Sans Fallback;
	}

	.font-40 {
		font-style: normal;
		font-size: 40rpx;
		font-family: Droid Sans Fallback;
	}

	.font-46 {
		font-style: normal;
		font-size: 46rpx;
		font-family: Droid Sans Fallback;
	}

	.font-50 {
		font-style: normal;
		font-size: 50rpx;
		font-family: Droid Sans Fallback;
	}

	.font-60 {
		font-style: normal;
		font-size: 60rpx;
		font-family: Droid Sans Fallback;
	}

	.font-80 {
		font-style: normal;
		font-size: 80rpx;
		font-family: Droid Sans Fallback;
	}

	// 字体对齐
	.text-left {
		text-align: left;
	}

	.text-center {
		text-align: center;
	}

	.text-right {
		text-align: right;
	}

	// color相关
	.color-white {
		color: #FFFFFF;
	}

	.color-red {
		color: #dc0000;
	}

	// 黑色色阶向下
	.color-black {
		color: #000;
	}

	.color-black-3 {
		color: #333;
	}

	.color-black-6 {
		color: #666;
	}

	.color-black-9 {
		color: #999;
	}

	// 字体宽度
	.font-weight-400 {
		font-weight: 400;
	}

	.font-weight-500 {
		font-weight: bold;
	}

	// 间隔
	.spacing-20 {
		width: 750rpx;
		height: 20rpx;
		background-color: #f8f8f8;
	}

	// 圆角
	.radius-10 {
		border-radius: 10rpx;
	}

	.radius-20 {
		border-radius: 20rpx;
	}

	.radius-30 {
		border-radius: 30rpx;
	}

	.radius-circle {
		border-radius: 50%;
	}

	.radius-height {
		border-radius: 10000px;
	}

	// flex相关
	.vs-flex-item {
		flex: 1;
	}

	.vs-space-between {
		justify-content: space-between;
	}

	.vs-space-around {
		justify-content: space-around;
	}

	.vs-space-center {
		justify-content: center;
	}

	.vs-space-end {
		justify-content: flex-end;
	}

	.vs-row {
		flex-direction: row;
	}

	.vs-column {
		flex-direction: column;
	}

	.vs-align-end {
		align-items: flex-end;
	}

	.vs-align-center {
		display: flex;
		align-items: center;
	}

	.vs-align-start {
		align-items: flex-start;
	}

	.vs-item-hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.vs-btn-hover {
		opacity: 0.8;
	}

	.color-base {
		color: #292D32;
	}

	.input-placeholder {
		color: #292D32;
	}

	.bg-color-base {
		background-color: #292D32;
	}
</style>
