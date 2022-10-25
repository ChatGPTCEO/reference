<template>
	<view class="wrap">
		<view class="content">
			<view class="title u-content-color"><text style="font-size: 30rpx;color: #1296DB;">欢迎登录\n</text>悉地吧</view>
			<view class="u-border-bottom u-m-b-20 ">
				<u-icon name="account" color="#666" size="30" class="u-abso-icon"></u-icon>
				<u-input v-model="account" type="text" :focus="true" placeholder="请输入账户(手机号或用户名)"
					:custom-style="{paddingLeft:'40rpx'}" />
			</view>
			<view class="u-border-bottom u-m-b-80 ">
				<u-icon name="lock" color="#666" size="30" class="u-abso-icon"></u-icon>
				<u-input v-model="password" type="password" :password-icon="true" placeholder="请输入密码"
					:custom-style="{paddingLeft:'40rpx'}" />
			</view>

			<u-button :ripple="true" ripple-bg-color="rgba(0,0,0, 0.1)" :hair-line="false" :type="submitStyle"
				@click="login" :style="inputStyle">立即登录</u-button>

			<view class="u-flex u-row-between u-m-t-30 u-tips-color">
				<navigator class="password" url="./login">手机登录</navigator>
				<view class="issue">忘记密码</view>
			</view>
		</view>
		<view class="buttom">
			<view class="hint">
				登录代表同意<text class="link" @click="toProtocol">悉地吧《用户协议》</text>
				，并授权使用您的微信账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				repassword: '',
				submitStyle: 'info',
			}
		},
		computed: {
			inputStyle() {
				if (this.account && this.password) {
					this.submitStyle = 'primary';
				}
			}
		},

		methods: {
			async login() {
				if (!this.account) {
					this.$u.toast('账户不能为空')
					return
				}
				if (!this.password) {
					this.$u.toast('密码不能为空')
					return
				}
				const res = await this.$u.api.login({
					account: this.account,
					password: this.password
				})
				if (res.code == 0) {
					this.$u.toast(res.msg)
				}
				if (res.code == 1) {
					this.$u.vuex('vuex_token', res.data.userinfo.token)
					this.$u.vuex('vuex_user', res.data.userinfo)
					uni.showToast({
						title: res.msg
					})
					setTimeout(() => {
						this.$u.route({
							type: 'back',
						})
					}, 1500)
				}
			},
			toProtocol(){
				uni.navigateTo({
					url:'../other/protocol'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-abso-icon {
		position: absolute;
		bottom: 20rpx;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: auto;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

		}

		.buttom {
			position: absolute;
			bottom: 20rpx;

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
