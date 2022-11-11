<template>
	<view>
		<view class="logo">
			<view class="img">
				<image mode="widthFix" src="../../static/a4.png"
					></image>
			</view>
		</view>

		<view class="form">
			<view class="username">
				<input placeholder="请输入手机号" v-model="mobile" placeholder-style="color: rgba(255,255,255,0.8);" />
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="password" password=true
					placeholder-style="color: rgba(255,255,255,0.8);" />
			</view>
			<view class="btn" @click="login()">登 录</view>
			<view class="res">
				<view @click="tiao1()">用户注册</view>
				<!-- <view @click="tiao2()">忘记密码</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				mobile: '',
				password: ''
			}
		},
		onLoad(option) {},
		methods: {
			tiao() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			login() {
				this.api.request({
					url: 'member/login',
					method: 'post',
					data: {
						mobile: this.mobile,
						password: this.password
					},
					success: (res) => {
						console.log(res)
					uni.setStorageSync('userinfo',res.data)
						uni.setStorageSync('token',res.token)
						if(res.status == 200){
						
							uni.showToast({
								title:'登录成功'
							})
							setTimeout(() => {
								this.tiao()
							},500)
							
						}
						// this.tiao()
					}
				})
			},
			tiao1() {
				uni.navigateTo({
				   url:"zhuce"
				});
			},
			tiao2() {
				uni.navigateTo({
				   url:"gaimi"
				});
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #9a9ae6;
		height: 100%;
	}

	.logo {
		width: 100%;
		height: 45vw;
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			width: 25%;
			height: 25vw;

			image {
				width: 100%;
				border-radius: 100%;
			}
		}
	}

	.form {
		width: 100%;
		padding: 0 7%;
		font-size: 30upx;

		.username,
		.password,
		.code {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			border-radius: 45upx;
			background-color: rgba($color: #ffffff, $alpha: 0.1);
			padding: 0 45upx;
			margin-bottom: 26upx;

			input {
				width: 100%;
				height: 50upx;
				color: rgba($color: #ffffff, $alpha: 0.8);
				font-weight: 200;
			}
		}

		.btn {
			color: #9a9ae6;
			width: 100%;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 45upx;
			background-color: #fff;
			font-size: 40upx;
		}
	}

	.res {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: rgba($color: #ffffff, $alpha: 0.8);

	}
</style>
