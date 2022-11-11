<template>
	<view>
		<form @submit="login">
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入昵称" class="text-left" name="phone" :value="form.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入昵称" class="text-left" name="password" :value="form.phone"></input>
			</view>

			<view>
				<button class="cu-btn shadow-blur block margin-tb-sm bottom-btn bg-red" formType="submit">登录</button>
			</view>
		</form>
	</view>
</template>
<script>
	import validate from '@/utils/validate'
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				form: {},
			};
		},
		props: {
			redirectUrl: { //重定向页面
				type: String,
				default: '/pages/home/index'
			}
		},
		methods: {
			login(e) {
				let form = e.detail.value;
				if (!form.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!validate.validateMobile(form.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!form.password) {
					uni.showToast({
						title: '请输入登录密码',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				uni.showToast({
					title: '暂未开放，敬请期待',
					icon: 'none',
					duration: 3000
				});

			},
		},
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
