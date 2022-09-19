<template>
	<view class="wrap">
		<u-toast ref="uToast" />
		<view style="padding: 40rpx;">
			<u-input v-model="model.content" type="textarea" :border="border" height="100" :auto-height="autoHeight" />
		</view>
		<view class="img">
			<u-upload ref="uUpload" @on-success="bbb" @on-uploaded="aaa" @on-remove="removeFile" :file-list="l"
				:action="action" :auto-upload="false" max-count="9">
			</u-upload>
		</view>

		<view class="location" @click="locationTap">
			<view class="left">
				<image class="icon" src="../../static/didian.png"></image>
				<view class="name" v-model="model.location">{{model.location?model.location:"所在位置"}}</view>
			</view>

		</view>
		<view class="privacy" @click="actionSheetShow = true">
			<view class="left">
				<image class="icon" src="../../static/shetuan.png"></image>
				<view class="name">谁可以看</view>
				<view style="position: absolute;right: 0;" v-model="model.privacy">{{model.privacy}}</view>
			</view>

		</view>
		<view style="text-align: center;margin-top: 25rpx;">
			<u-button type="success" size="medium" class="btn" @click="submit">发表圈子</u-button>
		</view>

		<view style="padding: 20rpx;display: flex;justify-content: space-between;flex-wrap: wrap;">
			<image @click="previewImage(index1,list1)" v-for="(res1, index1) in list1" :src="res1.url" mode="aspectFill"
				style="margin-bottom: 10rpx;width:220rpx;height:220rpx;"></image>
		</view>

		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import * as api from '@/api/api.js'
	import http from '@/api/http.js'
	export default {
		data() {

			return {
				formData2: {
					longitude: '',
					latitude: ''
				},
				addressObj: '',
				fileName: [],
				imgList: [],
				category: 'image',
				l: [],
				list1: [],
				list2: [],
				u_id: '',
				u_name: '',
				u_ava: '',
				u_gender: '',
				model: {
					content: '',
					location: '',
					privacy: '公开'
				},
				action: http.baseUrl + '/upload/uploadCircleImg',
				list: [],
				autoHeight: true,
				border: false,
				actionSheetShow: false,
				location: '',
				privacy: '公开',
				actionSheetList: [{
						text: '公开'
					},
					{
						text: '仅关注'
					},
					{
						text: '仅自己'
					}
				],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			checkMes() {
				console.log("checkMes");
				api.request({
					url: '/mesCheck/getData',
					method: 'GET',
					data: {
						content: this.model.content,
					},
				}).then(res => {
					if (res.errmsg == 'ok') {
						console.log("内容检查成功");
					} else {
						this.$refs.uToast.show({
							title: '内容包含敏感词汇!请检查!',
							type: 'error'
						})
						return;
					}
				});


			},
			//初始化用户信息
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						//console.log(res+"sssssssss")
						this.u_id = res.data.userId;
						this.u_name = res.data.username;
						this.u_ava = res.data.avatarUrl;
						this.u_gender = res.data.gender;
					}
				})
			},

			/* 	//文件上传前执行
				beforeUpload(index, list) {
					// 只上传偶数索引的文件
						for (var i = 0; i < list.length; i++) {
							console.log(list[i].url);
							console.log(list[i].error);
							console.log(list[i].progress);
						} 
				}, */
			//index   图片在数组中索引  data  是上传成功后服务器的回调
			bbb(data, index, lists, name) {
				this.fileName.push(data)
				//	console.log(index + "index");
				//console.log(res.data + "data");
				//console.log(this.fileName + "fileName");
				//console.log("bbb执行"+data);
			},
			//用户删除了那些图片
			removeFile(index, lists, name) {
				//console.log("移除了第" + index + "张图片");
				//this.fileName.splice(index, 1)
				//console.log(this.fileName + "删除后的文件");
			},
			//图片全部上传完成后执行此方法  
			aaa() {
				//console.log("aaa执行" + this.fileName);
				uni.hideLoading();
				api.request({
					url: '/circle/publishCircle',
					method: 'POST',
					data: {
						pocUrl: this.fileName,
						uid: this.u_id,
						uname: this.u_name,
						uava: this.u_ava,
						ugender: this.u_gender,
						content: this.model.content,
						place: this.model.location,
						privacy: this.model.privacy
					},
				}).then(res => {
					if (res.data.flag) {
						uni.reLaunch({
							url: 'success'
						})
					} else {
						this.$refs.uToast.show({
							title: '发表失败',
							type: 'error'
						})
					}
				});
			},
			//图片上传
			submit() {
				//检查敏感词汇
				
				
				
				this.imgList = this.$refs.uUpload.lists;
				//console.log(this.imgList)
				if (this.model.content == '' && this.imgList.length == 0) {
					this.$refs.uToast.show({
						title: '内容不能都为空哦！',
						type: 'error'
					})
				} else {
					//console.log(this.imgList + "==============");
					api.request({
						url: '/mesCheck/getData',
						method: 'GET',
						data: {
							content: this.model.content,
						},
					}).then(res => {
						//console.log(res);
						
						if (res.data.errcode == 0) {
							console.log("内容检查成功");
							
							this.$refs.uUpload.upload();
							uni.showLoading({
								title: '发布中，请稍后'
							});
							
						} else {
							this.$refs.uToast.show({
								title: '内容包含敏感词汇!请检查!',
								type: 'error'
							})
							return;
						}
					});
				}
			},
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.privacy = this.actionSheetList[index].text;
			},
			//位置信息
			/* locationTap() {
				const that = this;
				uni.getSetting({
					success: res => {
						//console.log(res.authSetting['scope.address'])
						const isLocation = res.authSetting['scope.address'];
						if (isLocation) {
							that.openLocationPage();
						} else {
							uni.authorize({
								scope: 'scope.userLocagion',
								success: res => {
									//console.log(res);
									that.openLocationPage();
								}
							})
						}
					}
				})
			}, */
			locationTap() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						if (this.formData2.longitude && this.formData2.latitude) {
							uni.navigateTo({
								url: "/pages/map/map?lng=" + this.formData2.longitude + "&lat=" + this
									.formData2.latitude
							})
						} else {
							uni.navigateTo({
								url: "/pages/map/map?lng=" + res.longitude + "&lat=" + res.latitude
							})
						}
					},
					fail: () => {
						uni.getSetting({
							success: (res) => {
								console.log(res);
								var status = res.authSetting;
								if (!status['scope.userLocation']) {
									uni.showModal({
										title: "是否授权当前位置",
										content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
										success: (tip) => {
											if (tip.confirm) {
												uni.openSetting({
													success: (data) => {
														if (data
															.authSetting[
																'scope.userLocation'
															] === true
														) {
															uni.showToast({
																title: "授权成功",
																icon: "success",
																duration: 1000
															})
															uni.getLocation({
																type: 'wgs84',
																success: (
																	res
																) => {
																	console
																		.log(
																			'当前位置的经度：' +
																			res
																			.longitude
																		);
																	console
																		.log(
																			'当前位置的纬度：' +
																			res
																			.latitude
																		);
																	uni.navigateTo({
																		url: "/pages/map/map?lng=" +
																			res
																			.longitude +
																			"&lat=" +
																			res
																			.latitude
																	})
																}
															})
														} else {
															uni.showToast({
																title: "授权失败",
																icon: "none",
																duration: 1000
															})
														}
													}
												})
											}
										}
									})
								} else {
									uni.getLocation({
										type: 'wgs84',
										success: (res) => {
											console.log('当前位置的经度：' + res.longitude);
											console.log('当前位置的纬度：' + res.latitude);
											uni.navigateTo({
												url: "/pages/map/map?lng=" +
													res.longitude + "&lat=" +
													res.latitude
											})
										}
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: "调用授权窗口失败",
									icon: "none",
									duration: 1000
								})
							}
						})
					}
				})
			},

			openLocationPage() {
				uni.chooseLocation({
					success: res => {
						//console.log(res.name);
						if (res.name) {
							delete res['errMsg'];
							this.model.location = res.name;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		//padding: 40rpx 60rpx;
		width: 100%;
	}

	.img {
		padding: 20rpx;
	}

	.wrap .content {
		font-size: 30rpx;
		width: 100%;
		height: 200rpx;
	}

	.wrap .location {
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 40rpx;
		border-top: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.wrap .left {
		display: flex;
		font-size: 28rpx;
	}

	.wrap .left .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 40rpx;
	}

	.btn {
		margin-top: 40rpx;
	}

	.privacy {
		margin-left: 40rpx;
		margin-right: 40rpx;
		//margin-top: 40rpx;
		//border-top: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			font-size: 28rpx;
			width: 100%;
			position: relative;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 40rpx;
		}
	}
</style>
