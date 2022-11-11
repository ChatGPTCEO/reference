<template>
	<view>
		<view class="top-title">
			<text class="text" v-if="info.orderProduct">
				{{ info.orderProduct[0].cart_info.product.store_name }}
			</text>
			<view class="small boxflex">
				<!-- 有效期至： {{ info.verify_time || '-' }} -->
				<!-- <view v-if="info.take" class="info">
        	<text v-if="info.take.mer_take_day !== undefind && info.take.mer_take_day.length == 7">每日：</text>
        	<block v-else>
        		<text v-for="item in info.take.mer_take_day">{{'周'+ toChinese(item)}},</text>
        	</block>
        	<text class="time">{{info.take.mer_take_time[0]}}-{{info.take.mer_take_time[1]}}</text>
        </view> -->
			</view>
		</view>
		<view class="qrcode-content">
			<view class="q-top">
				<text class="text">券码信息</text>
				<view class="u-padding-top-10">
					<text class="text u-margin-right-20">{{ qrcodeText }}</text>
					<u-icon name="attach" size="32" color="#666" @click="copy(qrcodeText)"></u-icon>
				</view>
			</view>
			<view class="u-margin-top-10 u-margin-bottom-20">
				<u-gap height="4" bg-color="#eee"></u-gap>
			</view>
			<view class="q-cont">
				<view class="u-margin-right-20">
					<!-- <u-image :src="qrcodeChat" width="300rpx" height="300rpx"></u-image> -->
					<canvas canvas-id="qrcode" style="width: 300rpx;height: 300rpx;" />
				</view>
				<!-- <view class="q-border"> </view>
        <view class="u-margin-left-20">
          <u-image src="" width="80rpx" height="300rpx"></u-image>
        </view> -->
			</view>
		</view>
		<view class="confirm-text">
			<text style="color: #AAAAAA;">^_^未消费前，请妥善保存！</text>
		</view>
	</view>
</template>

<script>
	import uQRCode from '../../js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default {
		data() {
			return {
				id: 0,
				qrcodeText: '',
				qrcodeChat: '',
				info: {},
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$u.get(`/api/order/detail/${this.id}`)
					.then(({
						data
					}) => {
						this.info = data
						this.qrcodeText = data.verify_code
						this.qrcodeChat = data.qrcode
						this.renderQrcode()
					})
			},
			renderQrcode() {
				let system = uni.getSystemInfoSync()
				// Promise
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.qrcodeText,
					size: 300 / (750 / system.screenWidth),
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H
				}).then(res => {
					this.qrcodeChat = res
				})
			},
			copy(info) {
				uni.setClipboardData({
					data: info,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.boxflex {
		display: flex;
		align-items: center;
	}

	.top-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: $gutter;

		.text {
			font-size: 42rpx;
			padding: 10rpx 0;
			font-weight: bold;
			color: #333;
		}

		.small {
			font-size: $uni-font-size-sm;
			color: #666;
		}
	}

	.qrcode-content {
		margin: $gutter;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		padding: $gutter;

		.q-top {
			display: flex;
			flex-direction: column;

			.text {
				font-size: 36rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
			}
		}

		.q-cont {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.q-border {
			height: 300rpx;
			border-right: 1rpx dashed #999;
			margin: 0 $gutter;
		}
	}

	.confirm-text {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: $gutter;
		font-size: $uni-font-size-lg;
	}
</style>
