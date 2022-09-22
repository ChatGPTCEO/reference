<template>
	<view class="content">
		<view class="header">
			<view class="photo" @tap="uploadImage">
				<image :src="userImage"
					mode="aspectFill" class="avatar"></image>
				<view class="upload">
					<image class="img" src="@/static/images/camera.png"></image>
				</view>
			</view>
		</view>
		<view class="forms">
			<view class="form-item">
				<view class="label">昵称<label class="count void ">{{'（'+(nicksName?nicksName.length:0)+'/20）'}}</label>
				</view>
				<view class="box">
					<input class="text" maxlength="20" placeholder="请输入昵称" v-if="!popupShow"  v-model="nicksName"></input>
				</view>
			</view>
			<view class="form-item">
				<view class="label">简介<label class="count">{{'（'+(description?description.length:0)+'/120）'}}</label>
				</view>
				<view class="box">
					<textarea :autoHeight="true" class="area high" :holdKeyboard="false" maxlength="120" placeholder="请输入..."  v-if="!popupShow"  v-model="description"></textarea>
					<view :class="!description?'gray':''" v-else>
						<rich-text :nodes="descText"></rich-text>
					</view>
				</view>
			</view>
		</view>
		<view class="submit">
			<button @tap="saveInfo" class="btn" :disabled="!nicksName">保存</button>
		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	var app = getApp();
	export default {
		data() {
			return {
				popupShow: false,
				nicksName: '',
				descText: '',
				description: '',
				userImage:'',
			}
		},
		onShow() {
			let user = app.globalData.user
			    if (!user) {
			      uni.showToast({
			        title: '未登录,请登录',
			      })
			      uni.navigateTo({
			        url: '/pages/login/login',
			      })
			    }
				else{
					this.userImage=user.avatarUrl;
					this.description=user.description;
					this.nicksName=user.nickName;
				}
		},
		methods: {
			uploadImage: function() {
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						uni.showLoading({
							title: '图片上传中...'
						})
						API.upLoadImage(res.tempFilePaths[0]).then(data => { 
							console.log(data.url);
							uni.hideLoading();
							if (data.status == 200) {
								uni.showToast({
									title: "上传成功"
								})
								that.userImage=data.url;
								
								
							}
						}).catch(err=>{
							if(err.message=="未授权登录用户,不能上传"){
								uni.navigateTo({
									url:'/pages/login/login'
								})
							}
						})
					}
				});
			},
			saveInfo:function(){
			     let args = {
			       description: this.description,
			       nickname: this.nicksName,
			       avatar:this.userImage,
			     }
			     API.updataUsers(args).then(res => {
			       console.log(args);
			       console.log(res);
			       uni.setStorageSync('user', res.user);
			       if (res.access_token) {
			         wx.showToast({
			           title: '用户信息更新成功',
			         })
			         wx.setStorageSync('token', res.access_token);
			         wx.setStorageSync('expired_in', Date.now() + parseInt(res.expired_in, 10) * 100000 - 60000);
			         wx.navigateBack({
			   
			         })
			       }
			     })
			   

			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 60rpx 0;
		text-align: center;
		margin-bottom: 20rpx;

		.photo {
			width: 200rpx;
			height: 200rpx;
			margin: auto;
			position: relative;

			.avatar {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				margin-bottom: 10rpx;
				background-size: cover;
			}

			.upload {
				width: 48rpx;
				height: 48rpx;
				padding: 10rpx;
				background: #3e3e3f;
				border-radius: 50%;
				position: absolute;
				right: 0;
				bottom: 0;

				.img {
					width: 100%;
					height: 100%;

				}
			}
		}

	}

	.forms {
		padding: 0 30rpx;

		.form-item {
			width: 100%;

			.label {
				margin: 28rpx 0 10rpx;
				color: #4a4a4a;

				.count {
					font-size: 24rpx;
					color: #999;
				}
			}

			.box {
				width: 100%;
				padding: 4rpx 0;
				position: relative;
				z-index: 1;

				.text {
					display: block;
				}

				.area {
					width: calc(100% - 60rpx);
					height: 80rpx;
					line-height: 40rpx;
					display: block;
					background: #f8f8f9;
					border-radius: 12rpx;
					padding: 20rpx 30rpx;
					border: 0;
					font-size: 32rpx;
					vertical-align: middle;
				}

				.high {
					min-height: 300rpx;
					max-height: 560rpx;
					margin-bottom: 40rpx;
					overflow: hidden;
				}

				.text {

					width: calc(100% - 60rpx);
					height: 100rpx;
					line-height: 100rpx;
					background: #f8f8f9;
					border-radius: 12rpx;
					padding: 0 30rpx;
					font-weight: 400;
					font-size: 32rpx;

				}

				.gray {
					color: #888;
				}

			}

		}
	}

	.submit {
		width: 100%;
		background-color: #fff;
		padding: 20rpx 50rpx;
		box-sizing: border-box;
		z-index: 9;

		.btn {
			width: 80%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 50rpx;
			background: #3e3e3f;
			color: #fff;
			font-size: 32rpx;
		}
	}
</style>
