<template>
	<view>
		<view class="header-info d-f justify-start">
			<image :src="myDistributionInfo.image" class="header border rounded-50"></image>
			<view class="info-box">
				<view class="name">{{myDistributionInfo.name}}</view>
				<view class="code">推广码：668800{{myDistributionInfo.id}}</view>
				<view class="superior">推荐人：{{myDistributionInfo.storageName}}</view>

			</view>
		</view>
		<view class="level">推广员等级：{{ myDistributionInfo.levelName }}</view>
		<view class="qr-code-box">
			<view class="tip">推广二维码</view>
			<image :src="wechatDistributionCodeImg" class="qr-img"></image>
			<view class="mt-2 row" @click="saveQrCode">
				<view class="row bg-color font-s-5 rounded " style="width: 360rpx;height: 90rpx;">保存二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMyDistributionInfoUrl,
		getWechatDistributionCodeImgUrl
	} from '@/api/index'
	export default {
		data() {
			return {
				myDistributionInfo: {},
				wechatDistributionCodeImg: ''
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				this.getMyDistributionInfo()
				this.getWechatDistributionCodeImgUrl()
			},
			// 获取个人推广信息
			getMyDistributionInfo() {
				this.$R.get(getMyDistributionInfoUrl)
					.then(res => {
						console.log(res);
						this.myDistributionInfo = res.data
					})
			},
			getWechatDistributionCodeImgUrl() {
				this.$R.get(getWechatDistributionCodeImgUrl)
					.then(res => {
						console.log(res);
						this.wechatDistributionCodeImg = res.data
					})
			},
			// 保存二维码
			saveQrCode() {
				let that = this
				// 因为uniapp不支持网络图片直接保存到本地，所以先下载图片，生成一个临时路径，再保存
				uni.downloadFile({
					url: that.wechatDistributionCodeImg,
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '保存二维码成功',
									icon: 'none',
									duration: 3000
								});
							},
							fail: function() {
								uni.showToast({
									title: '保存二维码失败',
									icon: 'none',
									duration: 3000
								});
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.header-info {
		padding: 20rpx;

		.header {
			width: 150rpx;
			height: 150rpx;
			margin-right: 30rpx;
		}

		.info-box {

			.name {
				font-size: 26rpx;
				margin-bottom: 16rpx;
			}

			.code {
				font-size: 22rpx;
				margin-bottom: 16rpx;
			}

			.superior {
				font-size: 20rpx;
				padding: 6rpx 20rpx;
				border: 1px solid #dddddd;
				border-radius: 10rpx;
				color: #999999;
			}
		}
}
		.level {
			font-size: 20rpx;
			color: #999999;
			margin: 20rpx 30rpx;
		}

		.qr-code-box {
			margin-top: 80rpx;

			.tip {
				text-align: center;
				font-size: 26rpx;
				color: #666666;
			}

			.qr-img {
				width: 300rpx;
				height: 300rpx;
				display: block;
				margin: 30rpx auto;
			}

			.qr-code {
				display: block;
				width: 300rpx;
				height: 300rpx;
				margin: 30rpx auto;
			}
		}
</style>
