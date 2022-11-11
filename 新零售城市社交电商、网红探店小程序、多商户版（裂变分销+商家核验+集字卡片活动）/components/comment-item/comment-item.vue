<template>
	<view class="comment">
		<view class="left">
			<image :src="src" mode="aspectFill"></image>
		</view>
		<view class="right">
			<view class="top">
				<view class="name">{{ name }}</view>
				<!-- <view class="like" :class="{ highlight: isLike }">
						<view class="num">{{ likeNum }}</view>
						<u-icon v-if="!isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike"></u-icon>
						<u-icon v-if="isLike" name="thumb-up-fill" :size="30" color="#f29100" @click="getLike"></u-icon>
					</view> -->
			</view>
			<view class="rate-infos">
				<u-rate :count="5" v-model="rate" active-color="#f29100"></u-rate>
			</view>
			<view class="content">{{ content }}</view>
			<view class="cm-imgs" v-if="pics.length">
				<view class="u-padding-5" v-for="(item, index) in pics" :key="index">
					<u-image :src="item" width="200rpx" height="200rpx" @click="showImage(index)"></u-image>
				</view>
			</view>
			<view class="bottom">
				{{ date }}
				<!-- <view class="reply">回复</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pics: {
				type: Array,
				default: () => []
			},
			src: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			rate: {
				type: [String, Number],
				default: 5
			},
			date: {
				type: String,
				default: ''
			},
			isLike: {
				type: Boolean,
				default: false
			},
			likeNum: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {

			};
		},
		methods: {
			showImage(index) {
				uni.previewImage({
					current: index,
					urls: this.pics
				})
			},
			getLike() {
				this.$emit('like')
			}
		}
	}
</script>

<style lang="scss">
	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #333;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #f29100;

					.num {
						color: #f29100;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
				color: #999;
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
			}
		}
	}

	.rate-infos {
		padding-bottom: 10rpx;
	}

	.cm-imgs {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -10rpx;
	}
</style>
