<template>
	<view>
		<view class="logo">
			<view class="img">
				<image mode="widthFix" src="../../static/a4.png"
					></image>
			</view>
		</view>

		<view class="form re">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入注册手机号" v-model="mobile" placeholder-style="color: rgba(255,255,255,0.8);" />
			</view>
			<!-- <view class="code">
				<input placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view> -->
			<view class="password">
				<input placeholder="请输入注册密码" v-model="password" password=true
					placeholder-style="color: rgba(255,255,255,0.8);" />
			</view>
			<view class="btn" @click="zhuze()">立即注册</view>
			<view class="res">
				<view @click="tiao()">已有账号立即登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: ''

			}
		},
		methods: {
			zhuze() {
				this.api.request({
					url: 'Member/add',
					method: 'post',
					data: {
						mobile: this.mobile,
						password: this.password
					},
					success: (res) => {
						if(res.status == 200){
							uni.showToast({
								title:'注册成功'
							})
							setTimeout(() => {
								uni.navigateTo({
									url:'denglu'
								})
							},500)
							
						}
					}
				})
			},
			tiao() {
				uni.navigateTo({
				   url:"denglu"
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
		justify-content: center;
		align-items: center;
		height: 100upx;
		color: rgba($color: #ffffff, $alpha: 0.8);
	}
</style>
