<template>
	<view class="content">
		<!-- container -->
		<view class="container">
			<view class="text-title"><text>绑定手机号</text></view>
			<view class="input-box">
				<view class="cinputbox">
					<u-icon name="account" color="#999" style="margin-right: 10rpx;"></u-icon>
					<u-input v-model="phone" type="number" placeholder="请输入手机号" maxlength="11" style="width: 100%" />
				</view>
				<view class="cinputbox">
					<u-icon name="account" color="#999" style="margin-right: 10rpx;"></u-icon>
					<u-input v-model="code" type="number" placeholder="验证码" style="width: 100%" />
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<u-button @click="getCode" size="mini">{{ tips }}</u-button>
				</view>
				<view class="oper-btn">
					<template>
						<u-button type="warning" ripple shape="circle" :custom-style="{color: '#333'}" @click="onLogin">绑定手机号</u-button>
					</template>
				</view>
				<view class="login-type" v-if="!type">
					<text @tap="toPass">跳过</text>
				</view>
			</view>
			<!-- 协议 -->
			<!-- <view class="vb-agreement">
        <u-checkbox size="30" shape="circle" v-model="chk">
          <text class="text"> 
            登录代表同意<text class="black" @tap="goLook">用户协议、隐私政策</text>，并授权使用您的账号信息 （如昵称、头像、收货地址）以便您统一管理
          </text>
        </u-checkbox>
      </view> -->
		</view>
		<!-- toast -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chk: true,
				phone: '',
				code: '',
				tips: '',
				seconds: 60,
				type: 0
			};
		},
		onLoad(options) {
			this.type = options.type || 0
		},
		methods: {
			goLook() {
				// this.$u.route({
				//   url: 'pages/user/policy'
				// })
			},
			/**
			 * 登录
			 */
			onLogin() {
				if (this.phone.length != 11) {
					return uni.showToast({
						title: '手机号输入有误!',
						icon: 'none'
					})
				}
				if (!this.code) {
					return uni.showToast({
						title: '请输入验证码!',
						icon: 'none'
					})
				}
				this.$u.post('/api/user/binding', {
					phone: this.phone,
					sms_code: this.code
				}).then((res) => {
					uni.showToast({
						title: res.message
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {

					uni.showLoading({
						title: '操作中...请稍后',
					});

					this.$u.post('/api/auth/verify', {
						phone: this.phone
					}).then((res) => {
						this.$refs.uCode.start();
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					})
				}
			},
			end() {},
			start() {
				this.$u.toast('获取成功');
			},
			/**
			 * 跳转 navigateTo
			 * @param {String} to - 需要跳转路径
			 */
			toPass(to) {
				uni.navigateBack()
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: white;
	}

	.isback {
		width: 48rpx;
		height: 48rpx;
		margin-left: 40rpx;
		z-index: 99;

		.icon {
			width: 100%;
			height: 100%;
		}
	}

	.cinputbox {
		border-bottom: 1rpx solid #eee;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
	}

	.container {
		padding: 86rpx 80rpx;
	}

	.text-title {
		font-size: 56rpx;
		color: #333;
	}

	.input-box {
		display: flex;
		flex-direction: column;
		margin-top: 96rpx;
	}

	.input-label {
		color: #505559;
		font-size: $uni-font-size-sm;
		margin-top: 8rpx;
	}

	.cinputbox {
		border-bottom: 1rpx solid #eee;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
	}

	.mt-ins {
		margin-top: 20rpx;
	}

	.areacode {
		font-size: $uni-font-size-base;
		color: #505559;
		margin-right: 14rpx;
	}

	.oper-btn {
		margin-top: 52rpx;
	}

	.login-type {
		padding: 50rpx 0;
		font-size: $uni-font-size-sm;
		color: #505559;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.vb-agreement {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 14rpx 14rpx 88rpx;
		text-align: center;
		width: 100%;
		background-color: #fff;

		.text {
			font-size: $uni-font-size-sm;
			color: #d2d2d2;
			padding-top: 42rpx;
			display: block;
		}

		.black {
			color: #999;
		}
	}
</style>
