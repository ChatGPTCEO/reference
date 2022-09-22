<template>
	<view class="content">

		<view class="index">
			<view class="total-balance">
				<view class="total-balance-title">总积分</view>
				<view class="total-balance-score">
					<view class="">通用积分<text class="number"> :{{credit.credits}}</text>
					</view>
				</view>
			</view>
			<view class="balance-list">
				<view class="balance-item" v-for="(item,index) in creditlist">
					<view class="balance-icon">
						<image class="balance-icon-image" mode="widthFix" :src="images.common_icon"></image>
					</view>
					<view class="balance-item-name">
						<view class="description">{{item.description}}</view>
						<view class="balance-item-score">{{item.balance}}</view>
					</view>
					<view class="balance-item-date">{{item.date}}</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import API from '@/api/api.js'
	var app = getApp();
	export default {
		data() {
			return {
				credit: [],
				creditlist: [],
				images: {
					"common_icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAbCAMAAAAqGX2oAAAAk1BMVEUAAADZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfrZyfqJXvWmh/dnJvPAqvh5RfSYdPbTwvrHsvmzmfeBU/TNuvmffvZwN/ORavWtkPewqRLvAAAAIXRSTlMA5fcv88mHb1YT3NXCtKmhkE89Gw4K+c2ZawTw6bV4KCRnAj+EAAABMElEQVQoz32T2ZKCMBBFm01w3HXcZr9J2MRl/v/r7IQEpBDPU6ruqdzQCfTAdrWcer7/tZ/HAfXZLEO0TOJtN35f7tDFSx7z4A19Dh9Nvg7xjLkzgk+UWQpANFyMMbL9vH9xUydAWm6qFrA2wsisczZYrC5FIa+8NEx1Pg5RGzmYUmSZOMOhB3JEw0kwSgmmRHOKWSvIjA+ghJS5StsOz0TMGVLwUkkgdYLHgg9GMSnkVVdkQlRO2LEAixZ6FeAptMKTipC/0gndivYMwcuKiGj1smJB9NMXylQqO8yYaA5DIVTuhNTeJvNLZJ9KdT1V7g5a9vwU7ZBVqTfJRAM0CVECw78EU5rHYPIczDfP8YBhJmMWJsP5TOfkD8XRyv5Om2CdxKPFLPKc63vR4vhHNXfPaVvd8TlQpQAAAABJRU5ErkJggg=="
				}
			}
		},
		onShow: function() {
			let user = app.globalData.user
			if (!user) {
				user = '';
				wx.navigateTo({
					url: '/pages/login/login',
				})
			} else {
				this.getMineInfo()
				this.getCreditList()
			}
		},
		methods: {
			getMineInfo: function() {
				API.checkUser().then(res => {
						if (res.status == 200) {
							API.getMineInfo().then(res => {
									console.log(res);
									this.UserInfo = res.user,
										this.account = res.account,
										this.credit = res.credit,
										this.subscribe = res.subscribe
									this.honour = res.honour
								})
								.catch(err => {
									console.log(err)
								})
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '检测出授权已过期, 是否注销授权?',
								success: function(res) {
									if (res.cancel) {
										uni.showToast({
											title: '取消注销',
											icon: 'success',
											duration: 900
										})
									} else {
										this.bindLogout()
									}
								},
								fail: function(err) {
									console.log(err)
								}
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},

			getCreditList: function(data) {
				API.getCredit(data).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
						}
						this.creditlist = this.creditlist.concat(res)
						this.page = this.page + 1

					})
					.catch(err => {
						console.log(err)
					})

			}
		}
	}
</script>

<style>
	.index,
	page {
		background: #fff;
	}

	.index {
		color: #111;
	}

	.background-image-style {
		width: 100%;
	}

	.order-list {
		width: 100%;
		margin: 0 auto;
	}

	.order-item {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid #eee;
	}

	.order-good-image {
		width: 126rpx;
		height: 126rpx;
		border-radius: 12rpx;
	}

	.order-time-num {
		font-weight: 500;
		color: red;
	}

	.order-time-num,
	.order-times {
		font-size: 24rpx;
		font-family: PingFang SC;
	}

	.order-times {
		font-weight: 400;
		color: #909090;
	}

	.order-detail {
		padding-left: 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.index-background-style {
		width: 100%;
	}

	.integral-all {
		position: absolute;
		top: 5rpx;
		width: 100%;
		text-align: center;
	}

	.integral-all-num {
		font-size: 36rpx;
		font-weight: 600;
		color: #ffe339;
	}

	.integral-all-text {
		color: #fff;
		padding-top: 5rpx;
	}

	.integral-all-text,
	.order-detail-time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
	}

	.order-detail-time {
		color: #909090;
		padding-right: 20rpx;
	}

	.order-detail-name {
		padding-left: 20rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #111;
	}

	.integral-all-width {
		width: 350rpx;
		display: flex;
		justify-content: space-between;
	}

	.total-balance {
		border-bottom: 20rpx solid #f4f5f7;
		padding: 30rpx;
	}

	.total-balance-title {
		font-size: 30rpx;
		font-weight: 500;
	}

	.total-balance-score {
		display: flex;
		font-size: 24rpx;
		align-items: center;
	}

	.number {
		color: #9362fa;
		font-size: 30rpx;
	}

	.total-balance-score-line {
		background-color: #999;
		width: 2rpx;
		height: 30rpx;
		margin: 0 30rpx;
	}

	.balance-list {
		padding: 30rpx 40rpx;
	}

	.balance-item {
		border-left: 4rpx solid #ede7fc;
		padding-bottom: 40rpx;
		padding-left: 50rpx;
		position: relative;
	}

	.balance-item:last-child {
		border-left: unset;
	}

	.balance-icon {
		position: absolute;
		top: 0rpx;
		left: -18rpx;
	}

	.balance-icon-image {
		width: 36rpx;
	}

	.balance-item-name {
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.balance-item-name .description {
		width: 80%;
		font-weight: 500;
	}

	.balance-item-score {
		color: #f75150;
	}

	.balance-item-date {
		color: #d5d5d5;
		font-size: 24rpx;
	}
</style>
