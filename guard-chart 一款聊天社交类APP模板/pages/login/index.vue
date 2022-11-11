<template>
  <view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录Guard</view>
			<input class="u-border-bottom u-p-b-30" v-model="tel" placeholder="请输入账号" />
			<input class="u-border-bottom u-p-b-30" v-model="tel" placeholder="请输入密码" />
			<view class="alternative u-p-b-80">
				<view class="password">注册账号</view>
				<view class="issue">遇到问题</view>
			</view>
      	<button @tap="submit" class="getCaptcha">立即登录</button>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="zhiwen item">
					<view class="icon"><u-icon size="70" name="fingerprint" color="#087af0"></u-icon></view>
					指纹登录
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">Guard用户协议、隐私政策，</text>
				并授权使用您的Guard账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
@Component({
  name: 'Login'
}) // 装饰器
export default class LoginPage extends Vue {
	
}
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
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: #087af0;
			color: 
      #ffffff;
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
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content: center;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: #087af0;
			}
		}
	}
}
</style>