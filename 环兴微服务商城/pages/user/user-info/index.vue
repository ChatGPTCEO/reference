<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<form @submit="userInfoSub">
			<view class="cu-form-group">
				<view class="title">昵称</view>
				<input placeholder="请输入昵称" class="text-right" name="nickName" :value="userInfo.nickName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" class="text-right" name="phone" :value="userInfo.phone"
					@click="showPhone =true"></input><text class="cuIcon-right"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">头像</view>
				<view class="cu-avatar radius bg-gray" @tap="chooseImage"
					:style="'background-image:url(' + userInfo.avatarUrl + ')'"></view>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<view>
					<radio-group class="block" @change="sexChange">
						<radio class='red' :class="userInfo.sex=='1'?'checked':''"
							:checked="userInfo.sex=='1'?true:false" :value="userInfo.sex"></radio>男
						<radio class='red margin-left-sm' :class="userInfo.sex=='2'?'checked':''"
							:checked="userInfo.sex=='2'?true:false" :value="userInfo.sex"></radio>女
					</radio-group>
				</view>
			</view>
			<view>
				<button class="cu-btn shadow-blur block margin-sm round bottom-btn bg-red" formType="submit">保存</button>
				<button class="cu-btn  block margin-sm  bottom-btn line-gray round" @tap="logout">退出登录</button>
			</view>
		</form>
		<!-- 修改手机号 -->
		<view class="cu-modal" :class="showPhone==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">更换手机号</view>
					<view class="action" @tap="showPhone=false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group">
						<view class="title">新手机号</view>
						<input placeholder="请输入手机号" class="text-left" name="phone" :value="form.phone"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input placeholder="请输入验证码" class="text-left" name="phone" :value="form.code"></input>
						<button class='cu-btn bg-green shadow'>验证码</button>
					</view>
					<view>
						<button class="cu-btn shadow-blur block margin-sm round bottom-btn bg-red"
							@click="phoneSub">保存</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import config from 'config/env';
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				showPhone: false,
				showSex: false,
				picker: [{
						name: '男',
					},
					{
						name: '女',
					},
				],
				radio: '',
				userInfo: {},
				form: {},
				switchVal: false,
				tips: ''
			};
		},
		onLoad(options) {
			this.userInfo = JSON.parse(decodeURIComponent(options.userInfo));
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!uni.$u.test.mobile(this.form.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				uni.$myRequest.smsCode(this.form).then(res => {
					uni.showToast({
						title: '验证码已发送',
						icon: 'none',
						duration: 3000
					});
					// 通知验证码组件内部开始倒计时
					this.form.code = res.data.code
				});
			},
			/**
			 * 性别选择
			 */
			sexChange(e) {
				this.userInfo.sex = e.detail.value;
			},
			chooseImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						let rquestUrl = config.basePath + '/mallapi/file/upload'
						let _this = this
						uni.uploadFile({
							header: {
								'hx-token': uni.getStorageSync('hxtoken') ? uni.getStorageSync(
									'hxtoken') : null, // 请求token
								'timestamp': new Date().getTime(),
							},
							url: rquestUrl,
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'fileType': 'image'
							},
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data));
								let data = JSON.parse(uploadFileRes.data);
								_this.userInfo.avatarUrl = data.data
							}
						});
					}
				});
			},
			/**
			 * 修改个人信息
			 */
			userInfoSub() {
				if (!this.userInfo.nickName) {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				if (!this.userInfo.sex) {
					uni.showToast({
						title: '请选择性别',
						icon: 'none',
						duration: 3000
					});
					return;
				}

				uni.$myRequest.updateInfo(this.userInfo).then(res => {
					uni.navigateBack({
						success: () => {
							let page = getCurrentPages().pop();
							if (page) {
								page.onLoad(page.options); //执行上个页面的方法
							};
						}
					})
				})
			},
			/**
			 * 修改手机号
			 */
			phoneSub() {
				if (!this.form.phone) {
					uni.$u.toast('请输入手机号');
					return;
				}
				if (!uni.$u.test.mobile(this.form.phone)) {
					uni.$u.toast('请输入正缺的手机号');
					return;
				}
				if (!this.form.code) {
					uni.$u.toast('请输入验证码');
					return;
				}
				uni.$myRequest.updatePhone(this.form).then(res => {
					this.userInfo.phone = this.form.phone;
					this.form = {};
					this.showPhone = false;
				})
			},
			logout() {
				uni.$myRequest.logout({}).then(res => {
					let userInfo = res.data;
					uni.setStorageSync('hxtoken', userInfo.hxToken);
					uni.setStorageSync('userInfo', userInfo);
					uni.reLaunch({
						url: '/pages/home/index'
					});
				})
			}
		},
	}
</script>
<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
