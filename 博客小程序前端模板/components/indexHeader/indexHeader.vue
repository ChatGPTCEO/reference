<template>
	<view class="container">
		<view class="statusBar-container" :style="{'height':statusBarHeight + 'px','background':backgroundColor}">
		</view>
		<view class='navbar-container' :style="{'top': navigationBarTop + 'px','background':backgroundColor,
		'height':navigationBarHeight + 'px','border-bottom':boderBottom}">
			<view class='left-container' :style="{'height':titleHeight + 'px','background':backgroundColor}">
				<image :src="logoImg" style="width: 140upx;height: 60rpx;margin:0 20rpx;">
				</image>
			</view>
			<view class='title-container-title'
				:style="{'height':titleHeight + 'px','line-height' : titleHeight  + 'px','width' : titleWidth}">
				<u-search placeholder="日照香炉生紫烟" :height="(titleHeight * 2) - 4" :searchIconSize="44" :disabled="true"
					@click="goToSearch" :showAction="false">
				</u-search>
			</view>
		</view>
		<view :style="{'height':statusBarHeight + navigationBarHeight + 'px','background': '#00000000'}"></view>
	</view>
</template>
<script>
	import util from '@/utils/util.js'
	export default {
		name: "indexHeader",
		props: {
			backgroundColor: {
				type: String,
				value: '#5af'
			},
			boderBottom: {
				type: String,
				value: '1rpx solid #F0F2F5'
			},
			logoImg: {
				type: String,
				default: 'http://images.jiwu.com/images/v5.0/logo(old).png'
			},
		},

		data() {
			return {
				statusBarHeight: 0,
				navigationBarTop: 0,
				navigationBarHeight: 0,
				titleHeight: 0,
				titleWidth: 0,
			};
		},
		mounted: function() {
			this.getSysInfo()
		},
		methods: {
			goToSearch() {
				uni.navigateTo({
					url: '/packageA/pages/search/search?type=0'
				})
			},
			getSysInfo() {
				var res = util.uniqueGetSystemInfo()
				var info = uni.getMenuButtonBoundingClientRect();
				this.titleHeight = info.height
				this.titleWidth = (info.left - uni.upx2px(200)) + "px"
				var tempTop = res.statusBarHeight
				var tempHeight = (res.navigationBarHeight || res.titleBarHeight || 44)
				this.statusBarHeight = res.statusBarHeight
				this.navigationBarTop = tempTop
				this.navigationBarHeight = tempHeight
			}
		}
	};
</script>
<style lang="scss" scoped>
	.navbar-container {
		left: 0;
		width: 100%;
		z-index: 9999;
		border-bottom: 1rpx solid #F0F2F5;
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
	}

	.statusBar-container {
		background-color: white;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}

	.navbar-container .left-container {
		left: 15rpx;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 16px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.left-container .left-icon-box {
		width: 22px;
		height: 22px;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #29211D;
	}

	.navbar-container .title-container-title {
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
</style>
