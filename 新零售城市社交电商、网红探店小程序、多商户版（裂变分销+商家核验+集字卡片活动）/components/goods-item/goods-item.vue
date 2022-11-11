<template>
	<view class="goods-list-item" @click="handle">
		<u-image :src="src" height="150rpx" width="260rpx" :mode="mode" border-radius="10"></u-image>
		<view class="goods-info">
			<view class="goods-info-text u-line-2" style="height: 65rpx;">
				<text class="g-text font-700 font-title">{{ title }}</text>
			</view>
		</view>
		<!-- 会员省 -->
		<!-- 	<view class="border-dark d-flex ml-2" :class="mtop" style="width: 200rpx;height: 32rpx; " v-if="vip_price">
			<text class="font-20 font-700 d-flex j-center" style="background: #403835;width: 36rpx;color: #efaa89;">V</text>
			<text class="font-member text-dark d-flex a-center j-center w-100">
				会员省{{ (price - vip_price).toFixed(2) }}元
			</text>
		</view> -->

		<view class="goods-price">
			<text class="goods-price-strong text-red font-700 font-price">￥{{ price }}</text>
			<text class="text-red-light font-up ml-1" v-if="item.spec_type">起</text>
			<!-- 原价 -->
			<!-- <text class="text-del u-margin-left-10 font" v-if="ot_price">￥{{ ot_price }}</text> -->

			<!-- <text class="text-del u-margin-left-10">{{ 66 }}</text> -->
			<!-- <view class="goods-btn">
        <u-button type="warning" size="mini" shape="circle" :custom-style="{color: '#333'}" 
          v-if="showBtn" @click="handle">抢购</u-button>
        <text class="g-small" v-if="rightText">{{ rightText }}</text>
      </view> -->
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
			vip_price: {
				type: [String, Number],
				default: '0.00'
			},
			showBtn: {
				type: Boolean,
				default: true
			},
			rightText: {
				type: String,
				default: ''
			},
			ot_price: {

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

<style lang="scss" scoped>
	@import "/common/dev-yuchen.css";

	.goods-list-item {
		width: 100%;
		background-color: #fff;

		.goods-img {
			width: 100%;
			overflow: hidden;
		}

		.goods-info {
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			padding: $uni-spacing-col-base;

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
			padding: 0 $uni-spacing-col-base $uni-spacing-col-sm;
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
</style>
