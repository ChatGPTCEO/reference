<template>
	<view>
		<view class="bc-header fixed-top">
			<view class="header-bg" :style="headerBg"></view>
			<view :style="seizeSeat"></view>
			<view class="flex-1 mx-2 row-ac mt-1 pb-2" :style="textColor" v-if="headerInfo.searchColumn.switch == 0">
				<template v-if="headerInfo.searchColumn.leftIcon.length !== 0">
					<view class="row-ac ml-1" v-for="(item,index) in headerInfo.searchColumn.leftIcon" :key="index">
						<view class="iconfont" :class="item.icon" @click="clickIcon(item)"></view>
					</view>
				</template>
				<view class="flex-1 search-box mx-2 pl-2 pr-2" :style="searchDefinition"
					:class="headerInfo.searchColumn.searchInfo.displayPosition == 'left' ? 'row-ac' :'row'">
					<view class="iconfont icon-search-01"></view>
					<view class="font-s-3 ml-1" style="color: #999;">
						{{ headerInfo.searchColumn.searchInfo.searchContent }}</view>
				</view>
				<template v-if="headerInfo.searchColumn.rightIcon.length !== 0">
					<view class="row-ac ml-2" v-for="(item,index) in headerInfo.searchColumn.rightIcon"
						:key="index + 1">
						<view class="iconfont" :class="item.icon" @click="clickIcon(item)"></view>
					</view>
				</template>
				<!-- #ifdef MP-WEIXIN -->
				<view :style="'width:' + watchButtonWidth + '%'" v-if="headerInfo.appHeader.switch !== 0"></view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarheight: '',
				headerBgColor: '',
				bcHeaderHeight: '',
				openType: true,
				// #ifdef MP-WEIXIN
				watchButtonWidth: '',
				// #endif
				transparency: '',
				navBarTextColor: '#fff'
			}
		},
		props: {
			headerInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
		onLoad() {

		},
		computed: {
			seizeSeat() {
				return `height:${this.statusBarheight}px;margin-top:-${this.bcHeaderHeight}px;`;
			},
			searchDefinition() {
				this.searchRadius = this.headerInfo.searchColumn.searchInfo.searchBoxRadius
				this.searchBoxBgcolor = this.headerInfo.searchColumn.searchInfo.searchBoxBgcolor
				return `background-color:${this.searchBoxBgcolor};border-radius:${this.searchRadius}rpx;`
			},
			headerSwiperBg() {
				this.navBarTextColor = this.headerInfo.navBarTextColort
				return `background-color:${this.headerBgColor};color:${this.navBarTextColor}`
			},
			textColor() {
				return `color:${this.navBarTextColor};`
			},
			headerBg() {
				this.navBarBgColor = this.headerInfo.navBarBgColor
				return `background: rgba(${this.navBarBgColor},${this.transparency});height:${this.bcHeaderHeight}px;`
			},
		},
		mounted() {
			uni.createSelectorQuery()
				.in(this)
				.select('.bc-header')
				.boundingClientRect(res => {
					this.bcHeaderHeight = res.height;
					uni.$emit('bcHeaderEmit', this.bcHeaderHeight);
				})
				.exec();
		},
		//获取屏幕信息
		created() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.statusBarheight = res.statusBarHeight; //获取顶部状态栏高度+3个像素
					//微信右上角胶囊按纽占比
					// #ifdef MP-WEIXIN
					this.watchButtonWidth = ((obj.width + 10) / res.windowWidth) * 100;
					this.appPussWidth = 100 - this.watchButtonWidth;
					// #endif
				}
			});
			uni.$on('swiperBgColor', res => {
				if (this.openType == true) {
					this.headerBgColor = res
				} else {
					this.headerBgColor = this.headerInfo.navBarBgColor
				}
			});
			uni.$on('openTypeEmit', res => {
				this.openType = res
			});
			uni.$on('scrollTop', res => {
				this.scrollTop = res
				if (this.scrollTop >= 200) {
					return
				}
				if (this.scrollTop > 0) {
					this.navBarTextColor = this.headerInfo.navBarTextColor
				}
				if (this.scrollTop <= 0) {
					this.navBarTextColor = '#fff'
				}
				this.transparency = this.scrollTop / 100
			});


		},

		methods: {
			clickIcon(item) {
				if (item.type == 'scanning') {
					// 允许从相机和相册扫码
					uni.scanCode({
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
						}
					});
				}
			},
			onPageScroll(e) {
				console.log(e);
			}
		}
	}
</script>

<style style="">
	.header-bg {}

	.app-title-icon {
		height: 70rpx;
	}

	.app-icon {
		width: 260rpx;
	}

	.search-box {
		height: 58rpx;
		background-color: rgba(255, 255, 255, .9);
		border-radius: 0;
	}

	.iconfont {
		font-size: 38rpx;
	}
</style>
