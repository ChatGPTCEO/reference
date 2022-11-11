<template>
	<view>
		<view class="top-shop">
			<view class="" v-if="goodsInfo.cart_info" @click="toDetails">
				<advance-item :src="goodsInfo.cart_info.product.image" :title="goodsInfo.cart_info.product.store_name" :show-label="false"
				 :price="goodsInfo.product_price" :show-old="false" :btn-text="goodsInfo.is_refund ? '退款中' : '退款'" btn-type="default"
				 @handle="toRefund" :showBtn="info.status ==0">

				</advance-item>
			</view>
			<view class="qr-line">
				<u-line color="red" border-style="dotted" />
			</view>
			<view class="qrcode-info">
				<text class="qr-title">券码信息</text>
				<view class="qrns">
					<text v-if="status" :class="goodsInfo.is_refund ? 'del' : ''">{{ info.verify_code }}
					</text>
					<text v-if="!goodsInfo.is_refund">
						{{ payText[info.status]}}
					</text>
				</view>
			</view>
			<view class="q-cont" v-if="!goodsInfo.is_refund">
				<view class="u-margin-top-20" v-if="status">
					<!-- <u-image :src="qrcodeChat" width="300rpx" height="300rpx"></u-image> -->
					<canvas canvas-id="qrcode" style="width: 300rpx;height: 300rpx;" />
				</view>
			</view>
		</view>
		<view class="shop-card">
			<view class="shopcard-area">
				<view class="vtops">
					<text class="shopname u-line-1">{{ info.merchant.mer_name }}</text>
					<view class="vicons ml-auto">
						<view class="vt-ico" @click="callPhone(info.merchant.service_phone)">
							<u-icon name="phone-fill" size="28"></u-icon>
						</view>
						<view class="vt-ico" @click="openLocation">
							<u-icon name="map-fill" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="vbots">
					<text class="text"></text>
					<text class="text">· {{ info.merchant.mer_address }}</text>
				</view>
			</view>
		</view>
		<view class="order-info">
			<u-cell-group :border="false">
				<u-cell-item title="订单编号" :value="info.order_sn" padding="10rpx 0" :arrow="false" center>
					<view class="u-padding-left-10" slot="right-icon">
						<u-icon name="attach" size="32" color="#999"></u-icon>
					</view>
				</u-cell-item>
				<u-cell-item title="下单时间" :value="info.create_time" padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
				<u-cell-item title="支付状态" :value="!payText[info.status] ? '已退款': payText[info.status] " padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
				<u-cell-item title="支付时间" :value="info.pay_time" padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
				<u-cell-item title="商品总额" :value="`¥${info.total_price}`" padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
				<u-cell-item title="优惠金额" :value="`¥${info.coupon_price}`" padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
				<u-cell-item title="支付方式" :value="payType[info.pay_type]" padding="10rpx 0" :arrow="false" center :border-bottom="false">
				</u-cell-item>
				<u-cell-item title="支付金额" :value="`¥${info.pay_price}`" padding="10rpx 0" :arrow="false" center>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import uQRCode from '../../js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default {
		data() {
			return {
				payType: ['余额支付', '微信支付'],
				payText: ['待消费', '待收货', '待评价', '已完成'],
				id: 0,
				qrcodeText: '',
				qrcodeChat: '',
				info: {
					merchant: {}
				},
				goodsInfo: {},
				status:true
			};
		},
		onLoad(options) {
			this.id = options.id

		},
		onShow(e) {
			this.getInfo()
		},
		methods: {
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
			toRefund() {
				if (!this.goodsInfo.is_refund) {
					//console.log('goodsInfo',this.goodsInfo)
					this.toRoute({
						url: 'pages/order/refund',
						params: {
							order_id: this.info.order_id,
							type: this.info.order_type,
							ids: this.info.order_id,
							refund_type: 1
						}
					})
				}
			},
			// getCodeInfo () {
			//   this.$u.get(`/api/order/verify_code/${this.id}`, {
			//     name: '1'
			//   }).then(() => {

			//   })
			// },
			toDetails() {
				this.toRoute({
					url: 'pages/goods/details',
					params: {
						id: this.goodsInfo.cart_info.product.product_id
					}
				})
			},
			toRoute(params) {
				this.$u.route(params)
			},
			openLocation() {
				let longitudelatitude = this.info.merchant.longitudelatitude
				if (longitudelatitude) {
					longitudelatitude = longitudelatitude.split(',')
					uni.openLocation({
						latitude: Number(longitudelatitude[0]) || 0,
						longitude: Number(longitudelatitude[1]) || 0,
						name: this.info.merchant.mer_address
					})
				} else {
					uni.showToast({
						title: '商家未设地址',
						icon: 'none'
					})
					// uni.openLocation({
					//   name: this.info.mer_address
					// })
				}
			},
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			getInfo() {
				this.$u.get(`/api/order/detail/${this.id}`)
					.then(({
						data
					}) => {
						console.log("data:",data)
						this.info = data
						this.qrcodeText = data.verify_code
						this.qrcodeChat = data.qrcode
						this.goodsInfo = data.orderProduct[0] || {}
						if (!this.goodsInfo.is_refund) {
							this.renderQrcode()
						}
						if(this.info.status == 3){
							this.status = false
							console.log("status:3")
						}
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

	.top-shop {
		padding: $gutter;
		margin: $gutter;
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);

		.qr-line {
			padding: $gutter 0;
			margin: $gutter -20rpx;
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 10rpx;
				left: -10rpx;
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background-color: $bg;
				z-index: 10;
			}

			&::after {
				right: -10rpx;
				left: auto;
			}
		}
	}

	.qrcode-info {
		display: flex;
		flex-direction: column;

		.qr-title {
			font-size: 32rpx;
			font-weight: bold;
		}

		.qrns {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #999;

			.del {
				text-decoration: line-through;
			}
		}
	}

	.order-info {
		margin: $gutter;
		padding: $gutter;
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
	}

	.shop-card {
		margin: $gutter;
		padding: $gutter;
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);

		.shopcard-area {
			display: flex;
			flex-direction: column;
			padding: $gutter 0 0;

			.vtops {
				display: flex;
				align-items: center;
				padding-bottom: 10rpx;
			}

			.vbots {
				font-size: $uni-font-size-sm;
				color: #999;
				display: flex;
				flex-direction: column;

				.text {
					margin-bottom: 10rpx;
				}
			}

			.shopname {
				font-size: $uni-font-size-lg;
				color: #333;
				flex: 1;
			}

			.vicons {
				display: flex;
				align-items: center;
			}

			.vt-ico {
				border-radius: 50%;
				border: 1rpx solid #333;
				width: 50rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: $gutter;
			}
		}
	}

	.q-cont {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
