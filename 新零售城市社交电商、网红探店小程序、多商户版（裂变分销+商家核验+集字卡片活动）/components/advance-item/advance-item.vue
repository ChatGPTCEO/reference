<template>
	<view class="advance-item">
		<view class="ad-img">
			<u-image :src="src" width="240rpx" height="170rpx" border-radius="10" mode="aspectFill"></u-image>
		</view>
		<view class="ad-info">
			<text class="u-line-2 ad-title font-title font-700">
				{{ title }}
			</text>
			<view class="ad-set-oper">
				<view class="ad-count" v-if="showLabel">
					<text class="ad-red">距结束</text>
					<view class="ad-center">
						<u-count-down :timestamp="date" font-size="24"></u-count-down>
					</view>
				</view>
				<slot name="label"></slot>
				<view class="ad-oper">
					<view class="ad-price">
						<text class="a-text font-700">
							<text class="a-strong text-red font-price font-700">￥{{ Number(price).toFixed(2) }}</text>
							<text class="text-red-light font-up ml-1" v-if="item.spec_type">起</text>
							<!-- <text class="text-red-light font-up ml-1" >起</text> -->
							<text class="a-del font-ago" v-if="showOld">￥{{ Number(oldPrice).toFixed(2) }}</text>
							<!-- <text class="a-del font-ago" >￥599</text> -->
						</text>
					</view>
					<view class="ad-btn font-700">
						<u-button :type="btnType" size="mini" :custom-style="{color: '#333'}" shape="circle" v-if="showBtn" @click="handle">
							{{ btnText }}
						</u-button>
						<slot></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			showLabel: {
				type: Boolean,
				default: true
			},
			showOld: {
				type: Boolean,
				default: true
			},
			btnText: {
				type: String,
				default: '去抢购'
			},
			btnType: {
				type: String,
				default: 'warning'
			},
			timestamp: {
				type: [Number, String],
				default: 86000
			},
			price: {
				type: [Number, String],
				default: 0
			},
			oldPrice: {
				type: [Number, String],
				default: 0
			},
			showBtn: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {

			};
		},
		computed: {
			date() {
				return this.timestamp - Date.parse(new Date()) / 1000
			}
		},
		methods: {
			handle() {
				this.$emit('handle')
			}
		}
	}
</script>

<style lang="scss">
	@import "/common/dev-yuchen.css";

	.advance-item {
		display: flex;

		.ad-img {
			width: 240rpx;
			height: 170rpx;
		}

		.ad-info {
			margin-left: auto;
			height: 170rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			max-width: calc(100% - 260rpx);

			.ad-title {
				// font-size: $uni-font-size-base;
				color: #333;
			}
		}

		.ad-set-oper {
			display: flex;
			flex-direction: column;
			margin-top: auto;

			.ad-oper {
				display: flex;
				align-items: flex-end;

				.ad-price {
					display: flex;
					align-items: flex-end;
					font-size: 20rpx;
					color: #999;

					.a-text {
						color: $uni-color-error;
					}

					.a-strong {
						font-size: $uni-font-size-lg;
						color: $uni-color-error;
					}

					.a-del {
						margin-left: 10rpx;
						text-decoration: line-through;
						color: #999;
					}
				}

				.ad-btn {
					margin-left: auto;
				}
			}
		}
	}

	.ad-count {
		border: 1rpx solid $uni-color-error;
		width: 260rpx;
		text-align: center;
		display: flex;

		.ad-red {
			background-color: $uni-color-error;
			color: #fff;
			font-size: $uni-font-size-sm;
			padding: 0 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.ad-center {
			flex: 1;
		}
	}
</style>
