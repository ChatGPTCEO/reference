<template>
	<view>
		<view class="card-box">
			<image :src="cardInfo.poster" mode="aspectFill" class="image"></image>
			<!-- <u-divider color="#333" border-color="#333" margin-top="50" bg-color="none" half-width="100">长按保存图片</u-divider> -->
		</view>
		<view class="card-button">
			<u-button type="warning" :custom-style="{color: '#333'}" size="medium" @click="savePosterPath">保存海报</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardInfo: {}
			};
		},
		onLoad() {
			this.getCard()
		},
		methods: {
			savePosterPath() {
				let that = this;
				uni.downloadFile({
					url: that.cardInfo.poster,
					success(resFile) {
						console.log(resFile, 'resFile')
						if (resFile.statusCode === 200) {
							uni.getSetting({
								success(res) {
									if (!res.authSetting['scope.writePhotosAlbum']) {
										uni.authorize({
											scope: 'scope.writePhotosAlbum',
											success() {
												uni.saveImageToPhotosAlbum({
													filePath: resFile.tempFilePath,
													success: function(res) {
														return uni.showToast({
															title: '保存成功'
														})
													},
													fail: function(res) {
														return uni.showToast({
															title: res.errMsg,
															icon: 'none'
														})
													},
													complete: function(res) {},
												})
											},
											fail() {
												uni.showModal({
													title: '您已拒绝获取相册权限',
													content: '是否进入权限管理，调整授权？',
													success(res) {
														if (res.confirm) {
															uni.openSetting({
																success: function(res) {
																	console.log(res.authSetting)
																}
															});
														} else if (res.cancel) {
															return uni.showToast({
																title: '已取消!',
																icon: 'none'
															});
														}
													}
												})
											}
										})
									} else {
										uni.saveImageToPhotosAlbum({
											filePath: resFile.tempFilePath,
											success: function(res) {
												return uni.showToast({
													title: '保存成功'
												});
											},
											fail: function(res) {
												return uni.showToast({
													title: res.errMsg,
													icon: 'none'
												});
											},
											complete: function(res) {},
										})
									}
								},
								fail(res) {

								}
							})
						} else {
							return uni.showToast({
								title: resFile.errMsg,
								icon: 'none'
							})
						}
					},
					fail(res) {
						return uni.showToast({
							title: res.errMsg,
							icon: 'none'
						})
					}
				})
			},
			getCard() {

				uni.showLoading({
					title: '生成中...',
				});

				this.$u.get('/api/user/spread_image', {
					type: 'routine'
				}).then(({
					data
				}) => {

					uni.hideLoading();
					this.cardInfo = data[0] || {}

					console.log('spread_image', this.cardInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.card-box {
		padding: $gutter;
		width: 100%;
		height: 1000rpx;

		.text {
			font-size: 28rpx;
			color: #333;
			padding: $gutter 0;
		}
	}

	.image {
		border-radius: 15px;
	}

	.card-button {
		padding: $gutter;
	}
</style>
