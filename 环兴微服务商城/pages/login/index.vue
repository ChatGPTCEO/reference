<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText" @tap="leftClick"></block>
			<block slot="content">登录</block>
		</cu-custom>


		<view class="flex padding justify-center">
			<!-- 登录页logo -->
			<img :src="logoUrl" style="width: 180rpx;height: 180rpx" />
		</view>
		<view class="flex padding justify-center">
			<!-- 登录页标题 -->
			<text class="text-black text-bold text-lg">HuanXing 商城</text>
		</view>
		<view class="flex justify-center margin-tb-xl">
			<codeLogin v-if="loginType =='2'" :redirectUrl="redirectUrl"></codeLogin>
			<pwdLogin v-if="loginType =='1'" :redirectUrl="redirectUrl"></pwdLogin>
		</view>

		<view class="flex padding justify-center">
			<view>其他登录方式</view>
		</view>
		<view class="flex padding justify-center">
			<text class="cuIcon-unlock xl" v-if="loginType != '1'" @tap="getLoginType('1')">
			</text>
			<text class="cuIcon-weixin text-green xl" v-if="loginType != '2'" @tap="getLoginType('2')">
			</text>
		</view>

		<view class="cu-bar foot flex padding justify-center">
			<text class="text-black text-center">环兴商城 版本所有</text>
		</view>
	</view>
</template>
<script>
	import config from 'config/env';
	import codeLogin from './codelogin.vue';
	import pwdLogin from './pwdLogin.vue';
	export default {
		components: {
			codeLogin,
			pwdLogin
		},
		data() {
			return {
				logoUrl: config.logoUrl,
				theme: getApp().globalData.theme,
				form: {},
				loginType: "2", // 1.密码登录 2.验证码登录 
				redirectUrl: '',
			};
		},
		onLoad(option) {
			this.redirectUrl = option.redirectUrl;
		},
		methods: {
			getLoginType(type) {
				this.loginType = type;
			},
			leftClick() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},

		}
	};
</script>
<style lang="scss">
</style>
