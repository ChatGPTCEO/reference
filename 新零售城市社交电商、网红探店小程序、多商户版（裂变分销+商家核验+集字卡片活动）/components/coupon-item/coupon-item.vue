<template>
	<view class="meituan">
		<view class="content">
			<view class="left">
				<view class="sum">
					￥
					<text class="num">{{ amount }}</text>
				</view>
				<view class="type">{{ typeText }}</view>
			</view>
			<view class="centre">
				<view class="title u-line-1">{{ title }}</view>
				<view class="valid-date">{{ label }}</view>
			</view>
			<view class="right">
				<view size="mini" class="immediate-use" :round="true" :style="btnStyle" v-if="showBtn" @click="click">
					{{ btnText }}
				</view>
				<view class="checkbox-ing" :class="[checkbox ? 'active' : '']" v-else>
					<u-icon name="checkmark-circle-fill" size="36" v-if="checkbox"></u-icon>
				</view>
			</view>
		</view>
		<view class="tips" v-if="showRules">
			<view class="circle-left"></view>
			<view class="circle-right"></view>
			<view class="explain u-line-1">{{ ruleText }}</view>
			<!-- <view class="rule u-line-1" @tap="onRules">
        <text>使用规则</text>
        <u-icon name="arrow-right" color="" :size="20"></u-icon>
      </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			amount: {
				type: [Number, String],
				default: 0
			},
			title: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			btnStyle: {
				type: Object,
				default: () => {}
			},
			btnText: {
				type: String,
				default: '立即使用'
			},
			typeText: {
				type: String,
				default: '优惠券'
			},
			showRules: {
				type: Boolean,
				default: true
			},
			showBtn: {
				type: Boolean,
				default: true
			},
			checkbox: {
				type: Boolean,
				default: true
			},
			ruleText: {
				type: String,
				default: '限最新版本客户端使用'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			click() {
				this.$emit('click')
			},
			onRules() {
				this.$emit('to-rule')
			}
		}
	}
</script>

<style lang="scss">
	.meituan {
		margin: 0 auto;
		background-color: #ffffff;
		width: 100%;
		// border: 10rpx;
		color: #ff0000;
		font-size: 28rpx;

		.content {
			display: flex;
			align-items: center;
			padding: 20rpx 20rpx;
			border: 10rpx;
			background-color: #fff5f4;

			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.sum {
					font-size: 32rpx;

					.num {
						font-size: 40rpx;
						font-weight: bold;
					}
				}
			}

			.centre {
				margin-left: 40rpx;
				max-width: 400rpx;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: $u-main-color;
					margin-bottom: 20rpx;
				}
			}

			.right {
				margin-left: auto;

				.immediate-use {
					padding: 0 20rpx;
					height: 50rpx;
					border-radius: 25rpx;
					line-height: 50rpx;
					background-color: $u-type-warning !important;
					font-size: 24rpx;
					border: none;
					word-break: keep-all;
					color: #333;
				}
			}
		}

		.tips {
			padding: 0 20rpx;
			border: 10rpx;
			background-color: $u-type-info-light;
			position: relative;
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			line-height: 60rpx;
			font-size: 24rpx;

			.circle-left,
			.circle-right {
				position: absolute;
				height: 36rpx;
				width: 18rpx;
				background-color: #fff;
			}

			.circle-right {
				border-radius: 40rpx 0 0 40rpx;
				right: 0;
				top: -18rpx;
			}

			.circle-left {
				border-radius: 0 40rpx 40rpx 0;
				left: 0;
				top: -18rpx;
			}

			.rule {
				font-size: 24rpx;
				display: flex;
				align-items: center;

				text {
					margin-right: 10rpx;
					flex: 1;
				}
			}
		}
	}

	.checkbox-ing {
		border-radius: 50%;
		width: 36rpx;
		height: 36rpx;
		background-color: #fff;
		border: 1rpx solid #ccc;

		&.active {
			border: none;
			background: none;
		}
	}
</style>
