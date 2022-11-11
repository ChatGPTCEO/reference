<template>
	<view>
		<view class="content">
			<!-- 头部 -->
			<view class="top_box">
				<text style="text-align: center;">Seven_Chat<br /><span>为您打造全新社交</span></text>
			</view>
			<!-- 填写 -->
			<view class="text-area">
				<view>
					<view class="flex size"><input type="text" placeholder="账号/手机号/邮箱" v-model="usernametxt"
							maxlength="6" /></view>
					<view class="flex size"><input password="true" placeholder="密码" type="text" v-model="passwordtxt"
							maxlength="6" /></view>
				</view>
			</view>
			<!-- 登录 -->
			<view class="login_flex">
				<view @click="Event_Login('login')" class="class_boxlogin"><text class="text-white cuIcon-right"
						style="font-size:88rpx;"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	var _;
	export default {
		data() {
			return {
				usernametxt: 'admin',
				passwordtxt: 'admin'
			};
		},

		onBackPress(e) {
			// return true 表示禁止默认返回
			return true
		},
		methods: {

			Event_Login(e) {
				/*账号验证*/
				let match = /[\u4E00-\u9FA5]/;
				let usernametxt = match.test(this.usernametxt);
				let passwordtxt = match.test(this.passwordtxt);
				if (this.usernametxt == "") {
					uni.showToast({
						icon: "none",
						title: "账号不能为空"
					})
					return;
				} else if (this.usernametxt.length <= 3) {
					uni.showToast({
						icon: "none",
						title: "账号最少不小于三位"
					})
					return;
				} else if (usernametxt) {
					uni.showToast({
						icon: "none",
						title: "不允许输入中文字符"
					})
					return;
				}

				/*密码验证*/
				if (this.passwordtxt == "") {
					uni.showToast({
						icon: "none",
						title: "密码不能为空"
					})
					return;
				} else if (this.passwordtxt.length <= 3) {
					uni.showToast({
						icon: "none",
						title: "账号最少不小于三位"
					})
					return;
				} else if (passwordtxt) {
					uni.showToast({
						icon: "none",
						title: "不允许输入中文字符"
					})
					return;
				}
				uni.setStorageSync("username","admin");
				uni.navigateTo({
					url:"../chatlist/chatlist"
				})
			},

			/*忘记密码*/
			// Forgetpassword() {
			// 	uni.showToast({
			// 		icon: "none",
			// 		title: "😜忘记密码不负责找回哦！"
			// 	})
			// },

			// showModal(e) {
			// 	this.empty();
			// 	this.modalName = e.currentTarget.dataset.target
			// },
			// hideModal(e) {
			// 	this.empty();
			// 	this.modalName = null
			// },

			empty() {
				this.usernametxt = '';
				this.passwordtxt = '';
			}
		},

		onLoad() {
			_ = this;
		}
	}
</script>

<style lang="less" scoped>
	.size {
		font-size: 40rpx;
	}

	.content {
		.top_box text{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 70rpx;
			height: 400rpx;
			background-color: #2E9AFE;
			border-radius: 0 0 25% 25%;
			color: white;
		}

		.text-area {
			width: 88%;
			margin: 0 auto;
			font-size: 40rpx;

			.flex {
				margin-top:40rpx;
				display: flex;
				width: 100%;
				justify-content: space-around;
				align-items: center;
			}

			input {
				height: 120rpx;
				width: 90%;
				border-radius: 30rpx;
				font-size: 40rpx;
				text-align: center;
				background-color: #ebebeb;
			}
		}

	}

	// 补
	.login_flex {
		margin-top: 77rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.class_boxlogin {
			width: 200rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			background-color: #2E9AFE;
			border-radius: 50%;
		}
	}

	.me {
		position: fixed;
		bottom: 1%;
		left: 0%;
		font-size: 28rpx;
		display: flex;
		width: 100%;

		justify-content: center;
		align-items: center;
	}
</style>
