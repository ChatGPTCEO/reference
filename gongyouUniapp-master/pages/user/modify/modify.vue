<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-cell-item label="头像" prop="ava" @click='changeHead'>
				<u-avatar ref="uUpload" style="float: right;" :src="model.ava"></u-avatar>
			</u-cell-item>
			<u-cell-item label="昵称" prop="name">
				<u-input input-align="right" :border="border" placeholder="请输入姓名" v-model="model.name" type="text">
				</u-input>
			</u-cell-item>
			<u-cell-item label="性别" prop="sex">
				<u-input input-align="right" :border="border" type="select" :select-open="actionSheetShow"
					v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-cell-item>
			<u-cell-item label="生日" prop="birth">
				<u-input input-align="right" :border="border" type="select" :select-open="pickerShow"
					v-model="model.birth" placeholder="请选择生日" @click="pickerShow = true"></u-input>
			</u-cell-item>
			<view class="content" style="background: aquamarine;padding: 20rpx;">
				<view>
					<text>联系方式</text>
				</view>
			</view>
			<u-cell-item label="手机号码" prop="phone" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="手机号码" v-model="model.phone" type="text">
				</u-input>
			</u-cell-item>
			<u-cell-item label="微信号(选填)" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="微信号" v-model="model.wechat" type="text">
				</u-input>
			</u-cell-item>
			<u-cell-item label="QQ(选填)" label-width="200rpx">
				<u-input input-align="right" :border="border" placeholder="QQ" v-model="model.qq" type="text"></u-input>
			</u-cell-item>

		</u-form>
		<view class="submit" @click="submit">
			<view class="text">
				<text>保存资料</text>
			</view>
		</view>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="time" v-model="pickerShow" @confirm="timeConfirm"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				fileName: [],
				openid: '',
				model: {
					qq: '',
					wechat: '',
					name: '',
					sex: '',
					birth: '',
					ava: '',
					phone: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}, ],
					birth: [{
						required: true,
						message: '请选择生日',
						trigger: 'change'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}, ],
				},
				border: false,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				actionSheetShow: false,
				pickerShow: false,
				errorType: ['message'],
			};
		},
		onShow() {
			//this.get();
		},
		onLoad() {
			this.get();
		},
		methods: {

			changeHead() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.model.ava = res.tempFilePaths[0]
						this.fileName = res.tempFilePaths
						//console.log("头像上传"+this.model.ava);
					}
				});
			},
			//初始化
			get() {
				const that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {

						that.openid = res.data.userId;
						uni.showLoading({
							title: '获取信息中'
						})
						// that.model.birth = res.data.birth;
						// that.model.wechat = res.data.wechat;
						// that.model.phone = res.data.phone;
						// that.model.qq = res.data.qq;
					},
					complete() {
						that.userinfo();
					}
				});
			},
			//获取用户信息
			userinfo() {
				api.request({
					url: '/userInfo/findUserInfoById',
					method: 'GET',
					data: {
						userId: this.openid
					},
				}).then(res => {
					this.model.name = res.data.data.nickName;
					this.model.sex = res.data.data.gender;
					this.model.birth = res.data.data.birth;
					this.model.phone = res.data.data.phone;
					this.model.ava = res.data.data.avatarUrl;
					this.model.wechat = res.data.data.wechat;
					this.model.qq = res.data.data.qq;
					uni.hideLoading();
				})

			},
			//保存资料
			submit() {
				console.log("dsadasdsaw文件名" + this.fileName[0]);
				if (this.fileName[0] == undefined) {
					this.submitInfo(this.model.ava)
				} else(
					uni.uploadFile({
						url: http.baseUrl + '/upload/uploadChangdiImg', //仅为示例，非真实的接口地址
						filePath: this.fileName[0],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
							if (uploadFileRes.data != '') {
								this.submitInfo(uploadFileRes.data);
							} else {
								this.$refs.uToast.show({
									title: '更换头像失败',
									type: 'error'
								})
							}
						}
					})
				)
			},
			submitInfo(avaName) {
				let that = this;
				api.request({
					url: '/userInfo/updateUserInfoById',
					method: 'POST',
					data: {
						id: this.openid,
						//avatarUrl: this.model.ava,
						avatarUrl: avaName,
						nickName: this.model.name,
						gender: this.model.sex,
						birth: this.model.birth,
						phone: this.model.phone,
						wechat: this.model.wechat,
						qq: this.model.qq
					},
				}).then(res => {
					if (res.data.data == 1) {
						this.$refs.uToast.show({
							title: '保存信息成功',
							type: 'success',
							duration: '1000'
						})
						console.log(this.openid)
						uni.setStorage({
							key: 'userInfo',
							data: {
								userId: that.openid,
								username: that.model.name,
								avatarUrl: avaName,
								gender: that.model.sex,
								birth: that.model.birth,
								phone: that.model.phone,
								wechat: that.model.wechat,
								qq: that.model.qq
							}
						});
						uni.setStorage({
							key:'phone',
							data:that.model.phone,
							success: (res) => {
								//console.log("存放的值"+res.data);
							}
						});
						setTimeout(function() {
							uni.reLaunch({
								url:'../user'
							})
						}, 1000)
						

					} else {
						this.$refs.uToast.show({
							title: '保存信息失败',
							type: 'error'
						})
					}
				});
			},





			// 点击actionSheet回调	
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sex = this.actionSheetList[index].text;
			},
			timeConfirm(e) {
				this.model.birth = e.year + '-' + e.month + '-' + e.day;
			}
		}
	};
</script>

<style scoped lang="scss">
	.wrap {
		//padding: 30rpx;
	}

	.submit {
		text-align: center;
		background-image: linear-gradient(to bottom right, #81dde1, #88eec9);
		//position: fixed;
		//bottom: 0;
		z-index: 888;
		width: 100%;
		color: white;

		.text {
			padding: 25rpx;
		}
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
