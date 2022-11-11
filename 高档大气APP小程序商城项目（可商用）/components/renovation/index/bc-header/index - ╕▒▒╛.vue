<template>
	<view>
		<view class="bc-header bg-color" style="padding-bottom: 20rpx;">
			<view :style="'height:' + statusBarheight + 'px'"></view>
			<view class="flex-1 mx-2  row" v-if="headerInfo.appHeader.switch == 'open'">
				<view class=" font-s-7  text-white font-w" v-if="headerInfo.appHeader.exhibitionType == 'appTitle'">
					{{ headerInfo.appHeader.appTitle }}
				</view>
				<view class="app-icon" v-if="headerInfo.appHeader.exhibitionType == 'appIcon'">
					<image :src="headerInfo.appHeader.appIcon" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex-1 mx-2 row-ac mt-2" v-if="headerInfo.searchColumn.switch == 'open'">
				<template v-if="headerInfo.searchColumn.leftIcon.length !== 0">
					<view class="row-ac ml-1" v-for="(item,index) in headerInfo.searchColumn.leftIcon" :key="index">
						<view class="iconfont" :class="item.icon" @click="clickIcon(item)"></view>
					</view>
				</template>
				<view class="flex-1 search-box mx-2 pl-2 pr-2" :style="searchDefinition"
					:class="headerInfo.searchColumn.searchInfo.displayPosition == 'left' ? 'row-ac' :'row'">
					<view class="iconfont icon-search-01"></view>
					<view class="font-s-3 ml-1">{{ headerInfo.searchColumn.searchInfo.searchContent }}</view>
				</view>
				<template v-if="headerInfo.searchColumn.rightIcon.length !== 0">
					<view class="row-ac ml-1" v-for="(item,index) in headerInfo.searchColumn.rightIcon"
						:key="index + 1">
						<view class="iconfont" :class="item.icon" @click="clickIcon(item)"></view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarheight: '',
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
		computed:{
			searchDefinition(){
				let _this = this
				_this.searchRadius = _this.headerInfo.searchColumn.searchInfo.searchBoxRadius
				_this.searchBoxBgcolor = _this.headerInfo.searchColumn.searchInfo.searchBoxBgcolor
				_this.searchTextColor = _this.headerInfo.searchColumn.searchInfo.searchTextColor
				return `background-color:${_this.searchBoxBgcolor};border-radius:${_this.searchRadius}rpx;color:${_this.searchTextColor};`
			},
		},
		mounted() {
			
			//计算顶部元素高度
			uni.createSelectorQuery()
				.in(this)
				.select('.bc-header')
				.boundingClientRect(res => {
					this.bcHeaderHeight = res.height;
					uni.$emit('bcHeader', this.commonHeaderHeight);
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
					this.statusBarheight = res.statusBarHeight + 5; //获取顶部状态栏高度+3个像素
					//微信右上角胶囊按纽占比
					// #ifdef MP-WEIXIN
					this.watchButtonWidth = ((obj.width + 10) / res.windowWidth) * 100;
					this.appPussWidth = 100 - this.watchButtonWidth;
					// #endif
				}
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
			}
		}
	}
</script>

<style style="">
	.app-icon {
		width: 260rpx;
	}

	.search-box {
		height: 58rpx;
		color: #333333;
		background-color: rgba(255,255,255,.9);
		border-radius: 0;
	}

	.iconfont {
		font-size: 38rpx;
	}
</style>
