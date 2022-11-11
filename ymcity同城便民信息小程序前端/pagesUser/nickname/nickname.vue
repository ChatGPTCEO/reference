<template>
	<view style="margin: 20rpx;">
		<view class="formbox">
			<u-form :model="form" ref="uForm" :border-bottom="false">
				<u-form-item label="昵称" :border-bottom="false" prop="nickname">
					<u-input v-model="form.nickname" placeholder="请输入昵称" />
				</u-form-item>
			</u-form>
		</view>
		<view class="btnbox">
			<u-button type="primary" @click="submit">提交</u-button>
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
					nickname: '',
				},
				rules: {
					nickname: [{
						required: true,
						message: '请输入昵称',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}, {
						min: 2,
						max: 8,
						message: '长度在2-8个字符之间',
						trigger: 'change'
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
			this.form.nickname = this.userInfo.nickname;
		},
		methods: {
			...mapActions([
				'upUserInfo'
			]),
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							title:'提交中'
						})
						this.$u.get('/addons/hicity/user/profile', this.form).then(info => {
							uni.hideLoading()
							this.upUserInfo(info);
							this.$u.toast('修改成功')
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},1500)
						})
					} else {
						console.log('验证失败');
					}
				});
			}
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
</style>
