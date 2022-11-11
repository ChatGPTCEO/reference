<template>
	<view class="wrap">
		<view class="content">
			<view class="title">用户授权</view>
			<view class="text">该程序将获得以下授权：</view>
			<view class="tips">获得您的公开信息（昵称和头像等）</view>
			<view>
				<u-button type="warning" :custom-style="{color: '#333'}" ripple @click="getuserinfo">确定授权</u-button>
			</view>
			<view class="u-margin-top-30">
				<u-button type="info" ripple @click="back">暂不授权</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				spread_id: '',
				spread_code: '',
				code: ''
			}
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			}
		},
		onLoad() {
			this.spread_id = uni.getStorageSync('spread_id') || ''
			this.spread_code = uni.getStorageSync('spread_code') || ''
			uni.login({
				provider: 'weixin',
				success: ({
					code
				}) => {
					this.code = code
				}
			})
		},
		onShow() {
			if (this.hasLogin) {
				uni.navigateBack()
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			getuserinfo() {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let params = res
						params.code = this.code;
						params.spread_id = this.spread_id; // 获取推广人ID
						params.spread_code = this.spread_code; // 获取推广人分享二维码ID
						// 登录
						params.cache_key = uni.getStorageSync('cache_key') || ''
						this.$u.post('/api/auth/mp', params)
							.then(({
								data
							}) => {
								this.$store.commit('login', data.token)
								uni.setStorage({
									key: 'cache_key',
									data: data.cache_key
								})
								this.$u.get('/api/user')
									.then(({
										data
									}) => {
										uni.showToast({
											title: '授权成功!'
										})
										this.$store.commit('writeInfo', data)
										uni.removeStorage({
											key: 'spread'
										})
										setTimeout(() => {
											if (data.phone) {
												uni.navigateBack()
											} else {
												uni.redirectTo({
													url: './bindPhone'
												})
											}
										}, 1500)
									})
							})
					},
					fail: (err) => {
						uni.openSetting({
							success: (res) => {
								//console.log(res.authSetting)
								if (!res.authSetting) {
									uni.showToast({
										title: '授权失败!',
										icon: 'none'
									})
								}
							}
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.text {
				color: #333;
				font-size: $uni-font-size-base;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}
	}
</style>
