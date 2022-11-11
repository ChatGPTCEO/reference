<template>
	<view style="margin: 20rpx;">
		<view class="formbox">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item label="手机号" prop="mobile" label-width="150">
					<u-input v-model="form.mobile" placeholder="请输入手机号" :disabled="userInfo.mobile?true:false" />
				</u-form-item>
				<u-form-item v-if="!userInfo.mobile" label="验证码" :border-bottom="false" prop="captcha"
					label-width="150">
					<view class="putbox">
						<u-input style="flex: 1;" placeholder="请输入验证码"
							v-model="form.captcha" type="text"></u-input>
						<view class="codebtn" @click="getCode()">
							<text>{{codeTips}}</text>
						</view>
					</view>
				</u-form-item>
			</u-form>
			<text style="color: #999999;font-size: 22rpx;" v-if="userInfo.mobile">您已绑定手机号，暂不支持换绑!</text>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<view class="btnbox">
			<u-button type="primary" :disabled="userInfo.mobile?true:false" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					captcha: ''
				},
				codeTips: '',
				rules: {
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					captcha: [{
						required: true,
						message: '请输入验证码',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.form.mobile = this.userInfo.mobile;
		},
		methods: {
			...mapActions([
				'upUserInfo'
			]),
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							title: '提交中'
						})
						this.$u.get('/addons/hicity/user/changemobile', this.form).then(info => {
							uni.hideLoading()
							this.upUserInfo(info);
							this.$u.toast('修改成功')
							setTimeout(() => {
								uni.navigateBack({

								})
							}, 1500)
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (this.form.mobile == '') {
						return this.$u.toast('请输入手机号');
					}
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					this.$u.get('/addons/hicity/sms/send', {
						mobile: this.form.mobile,
						event: 'changemobile'
					}).then(res => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.formbox {
		background-color: white;
		border-radius: 10rpx;
		padding: 5rpx 20rpx;
	}

	.btnbox {
		margin-top: 30rpx;
	}

	.putbox {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
	}

	.codebtn {
		width: 150rpx;
		height: 70rpx;
		font-size: 22rpx;
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10rpx;
		justify-content: center;
		background-color: #F44C01;
		margin-left: 10rpx;
	}
</style>
