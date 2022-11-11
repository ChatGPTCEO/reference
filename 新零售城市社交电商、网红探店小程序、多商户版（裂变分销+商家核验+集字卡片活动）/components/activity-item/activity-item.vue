<template>
	<view class="goods-list-item" @click="handle">
		<u-image :src="src" height="300rpx" width="100%" :mode="mode" border-radius="10"></u-image>
		<view class="people-fixed">
			<text>{{ nums }}人参与</text>
		</view>
		<view class="goods-info">
			<view class="goods-info-text u-line-2">
				<text class="g-text">{{ title }}</text>
			</view>
		</view>
		<view class="goods-price">
			<text class="goods-price-small red" v-if="showPrice">￥</text>
			<text class="goods-price-strong" v-if="showPrice">{{ price }}</text>
			<slot></slot>
			<text class="text-del u-margin-left-10" v-if="showOld">{{ oPrice }}</text>
			<view class="goods-btn">
				<u-button :type="btnType" size="mini" shape="circle" :custom-style="{color: '#333', minWidth: '180rpx'}" v-if="showBtn"
				 :disabled="disabled" @click="handle">{{ btnText }}</u-button>
				<text class="g-small" v-if="rightText">{{ rightText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			src: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			price: {
				type: [String, Number],
				default: '0.00'
			},
			oPrice: {
				type: [String, Number],
				default: '0.00'
			},
			showPrice: {
				type: Boolean,
				default: true
			},
			showOld: {
				type: Boolean,
				default: true
			},
			showBtn: {
				type: Boolean,
				default: true
			},
			rightText: {
				type: String,
				default: ''
			},
			btnType: {
				type: String,
				default: 'warning'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			btnText: {
				type: String,
				default: '抢购'
			},
			nums: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handle() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-item {
		width: 100%;
		background-color: #fff;
		position: relative;

		.goods-img {
			width: 100%;
			overflow: hidden;
		}

		.goods-info {
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			padding: $uni-spacing-col-base 0;

			.tag-style {
				margin-right: 8rpx;
				vertical-align: middle;
				/* #ifdef APP-PLUS */
				margin-top: -8rpx;
				/* #endif */
			}

			.g-text {
				vertical-align: top;
			}

			.goods-info-text {
				width: 100%;
				line-height: 32rpx;
				height: 64rpx;
			}
		}

		.goods-price {
			color: $uni-color-error;
			font-size: $uni-font-size-sm;
			padding: 0 0 $uni-spacing-col-sm;
			display: flex;
			align-items: center;

			.goods-btn {
				margin-left: auto;

				.g-small {
					color: #999;
					font-size: $uni-font-size-sm;
				}
			}

			.goods-price-strong {
				font-size: $uni-font-size-base;
			}

			.goods-price-small {
				font-size: 0.7em;
				color: #999;
			}

			.red {
				color: $uni-color-error;
			}

			.text-del {
				text-decoration: line-through;
				color: #999;
			}
		}
	}

	.people-fixed {
		position: absolute;
		right: 0;
		top: 0;
		min-width: 200rpx;
		font-size: 24rpx;
		color: #fff;
		background: rgba($color: #000000, $alpha: 0.5);
		z-index: 2;
		text-align: center;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5rpx;
		padding: 0 10rpx;
	}
</style>
