<template>
	<view class="waterfall-item" @tap="onTap">
		<image :src="params.imgUrl" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
		<view class="content">
			<view class="title">{{params.softwareName}}</view>
			<view class="version">版本：{{params.softwareVersion}}</view>
			<view style="width: 100%;text-align: center;margin-top: 20rpx;">
				<button style="width: 90%;" class="cu-btn bg-gradual-blue round shadow-blur"
					@click="copyLink">复制链接</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "helangWaterfall",
		props: {
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			tag: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height, this.$props.tag);
				}).exec();
			},
			onTap() {
				this.$emit("click", this.$props.index, this.$props.tag);
			},
			copyLink() {
				uni.setClipboardData({
					data: this.params.downUrl,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: initial;
	}

	.waterfall-item {
		padding: 16rpx;
		background-color: #fff;
		border-radius: 4px;
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);

		image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			height: 350rpx;
		}

		.content {
			margin-top: 16rpx;

			.title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.version {
				color: #606266;
				margin-top: 8rpx;
			}

			.label {
				background-color: #606266;
				color: #fff;
				font-size: 20rpx;
				padding: 4rpx 16rpx;
				border-radius: 20rpx;
			}

			.shop-name {
				font-size: 20rpx;
				color: #999;
			}
		}
	}

	.bg-gradual-blue {
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
	}

	.cu-btn {
		position: relative;
		border: 0rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30rpx;
		font-size: 28rpx;
		height: 64rpx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		-webkit-transform: translate(0rpx, 0rpx);
		transform: translate(0rpx, 0rpx);
		margin-right: initial;
	}

	.shadow-blur {
		position: relative;
	}

	.round {
		border-radius: 5000rpx;
	}
</style>
