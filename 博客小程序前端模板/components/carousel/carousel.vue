<template>
	<view class="bg-container">
		<view class="bg"></view>
		<swiper class="image-container" previous-margin="20rpx" next-margin="20rpx" circular @change="swiperChange"
			autoplay>
			<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'"
				v-for="(item, index) in imgList" :key="item[urlKey]">
				<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'"
					:src="item[urlKey]" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''"
					mode="aspectFill">
				</image>
				<view class="title">{{item.title}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		name: "carousel",
		props: {
			imgList: {
				type: Array,
				default () {
					return []
				}
			},
			urlKey: {
				type: String,
				default () {
					return ''
				}
			},
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped>
	.bg-container {
		position: relative;
		width: 750rpx;
		height: 350rpx;
		overflow: hidden;
	}

	.bg {
		background-color: #5af;
		position: absolute;
		height: 3000rpx;
		width: 3000rpx;
		border-radius: 50%;
		margin-top: -2680rpx;
		margin-left: -1100rpx;
	}

	.image-container {
		width: 750rpx;
		height: 350rpx;
	}

	.item-img {
		width: 670rpx;
		height: 300rpx;
		border-radius: 14rpx;
		animation: to-big .3s;
	}

	.swiper-item {
		position: relative;
		width: 670rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-img-side {
		width: 670rpx;
		height: 260rpx;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		position: relative;
		width: 670rpx;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		width: 630rpx;
		padding: 0 20rpx;
		height: 46rpx;
		border-radius: 0 0 20rpx 20rpx;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		color: #FFFFFF;
		font-size: 28rpx;
		bottom: 24rpx;
		left: 20rpx;
		line-height: 46rpx;
	}

	@keyframes to-mini {
		from {
			height: 300rpx;
		}

		to {
			height: 260rpx;
		}
	}

	@keyframes to-big {
		from {
			height: 260rpx;
		}

		to {
			height: 300rpx;
		}
	}
</style>
