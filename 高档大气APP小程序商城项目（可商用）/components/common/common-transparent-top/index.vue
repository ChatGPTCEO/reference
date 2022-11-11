<template>
	<view class="flex-1">
		<view class="flex-1 fixed-top top-size" :class="headerState == true ? 'bg-white' : ''">
			<view class="" :style="'height:' + statusBarheight + 'px'"></view>
			<view class="flex-1 mx-3 pb-2">
				<view class="back-box row iconfont icon-back2-01 fl" :class="headerState == true ? '' : 'text-white'" @click="toBack"></view>
				<view class="text-center font-w font-s-6 font-w pt" v-if="headerState == true">{{ topTitle }}</view>
			</view>
			<slot />
		</view>
		<view class="flex-1" :style="'height:' + topHeight + 'px;'" v-if="occupyState == true"></view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				statusBarheight: '',
				topHeight: '',
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			topTitle: {
				type: String,
				default: ''
			},
			occupyState:{
				type: Boolean,
				default: false
			},
			headerState:{
				type: Boolean,
				default: false
			},
			blackTest: {
				type: Boolean,
				default: false
			}
		},
		created() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.statusBarheight = res.statusBarHeight; //获取顶部状态栏高度+3个像素
				}
			});
			uni.$on('scrollTopEmit', res => {
				this.scrollTop = res
				if (this.scrollTop >= 50) {
					this.headerState = true
				} else {
					this.headerState = false
				}
			});
		},
		mounted() {
			uni.createSelectorQuery()
				.in(this)
				.select('.top-size')
				.boundingClientRect(res => {
					this.topHeight = res.height;
					uni.$emit('topHeightEmit',this.topHeight)
				})
				.exec();
		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.back-box {
		width: 60rpx;
		height: 60rpx;
	}

	.iconfont {
		font-size: 36rpx;
		font-weight: 900;
	}

	.black-color {
		color: #333;
		
	}
</style>
