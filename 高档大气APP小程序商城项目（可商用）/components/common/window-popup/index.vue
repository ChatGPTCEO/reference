<template>
	<view class="flex-1" :style="popupWindow" :class="showPopup == true ? 'show-popup' : 'hide-popup'">
		<view class="popup-window flex-1" v-if="showPopup" :style="popupStyleHeight">
			<view class="flex-1 d-f justify-end" @click.stop="clickSwitch">
				<view class="row switch-button">
					<text class="iconfont icon-cha"></text>
				</view>
			</view>
			<view class="flex-1">
				<scroll-view scroll-y :style="'height:' + popupHeight + 'rpx;'">
					<slot />
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				showPopup: false
			}
		},
		props: {
			popupHeight: {
				type: [Number, String],
				default () {
					return {}
				}
			},
		},
		created() {
			uni.getSystemInfo({
				success: (res => {
					this.windowHeight = res.windowHeight
				})
			});
			uni.$on('showPopup', res => {
				this.showPopup = res //引用公共组接收值
			})
		},
		computed: {
			popupWindow() {
				return `width: 100%;position: fixed;top: 0;left: 0;height: ${this.windowHeight}px;background-color: rgba(0,0,0, 0.8);z-index: 999;`
			},
			popupStyleHeight() {
				return `height: ${this.popupHeight}rpx;`
			}
		},
		methods: {
			clickSwitch() {
				this.showPopup = !this.showPopup //引用公共组件传值
			}
		}
	}
</script>

<style lang="scss">
	.popup-window {
		height: 200rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: rgba(255, 255, 255, 1);
		animation: to-show 0.4s;
	}
	@keyframes to-show
	{
		from {
			height: 0rpx;
		}
		to {
			
		}
	}
	@keyframes toHide
	{
		from {
			
		}
		to {
			height: 0rpx;
		}
	}
	.switch-button {
		width: 80rpx;
		height: 80rpx;
	}

	.show-popup {
		display: block;
	}

	.hide-popup {
		display: none;
		animation: toHide .3s;
	}
</style>
