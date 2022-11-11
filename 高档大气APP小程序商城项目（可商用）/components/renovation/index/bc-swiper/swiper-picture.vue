<template>
	<view class="flex-1">
		<template v-if="swiperList.swiperBgInfo.swiperBgType == 1">
			<view class="swiper-bg flex-1 bg-color" :style="swiperBgHeightInfo">
			</view>
		</template>
		<template v-if="swiperList.displayType == '0'">
			<view class="flex-1" :style="swiperList.swiperBgInfo.swiperBgType == 1 ? swiperAndBgInfo : swiperInfo"
				:class="swiperList.swiperBgInfo.swiperBgType == 1 ? 'swiper-position' : ''">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
					indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#ffffff" :style="imgHeight"
					@change="changeSwiper" class="swiper-info">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<view class="flex-1">
							<image :src="item.image" class="flex-1 swiper-info" mode="" :style="imgHeight"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data(){
			return{
				swiperBackground:'',
			}
		},
		props: {
			swiperList: {
				type: [String, Object],
				default () {
					return {}
				}
			},
			bannerList:{
				type: Array,
				default(){
					return [];
				}
			}
		},
		onLoad() {
             this.loadData();
		},
		created() {
			if (this.swiperList.swiperBgInfo.swiperBgColorType == 1){
				this.openSwiperBgColorType = true
			}else{
				this.openSwiperBgColorType = false
			}
			uni.$emit('openTypeEmit', this.openSwiperBgColorType)
		},
		computed: {
			swiperBgHeightInfo() {
				this.swiperBgHeight = this.swiperList.swiperBgInfo.swiperBgHeight
				this.swiperBgLRadius = this.swiperList.swiperBgInfo.swiperBgLRadius
				this.swiperBgRRadius = this.swiperList.swiperBgInfo.swiperBgRRadius
				return `height:${this.swiperBgHeight}rpx;border-bottom-left-radius:${this.swiperBgLRadius}rpx;border-bottom-right-radius:${this.swiperBgRRadius}rpx;background-color: ${this.swiperBackground};`
			},
			swiperAndBgInfo() {
				this.marginTop = this.swiperList.swiperBgInfo.swiperBgHeight
				this.sideMargin = this.swiperList.sideMargin
				this.marginBottom = this.swiperList.marginBottom
				return `margin-right:${this.sideMargin}rpx;margin-left:${this.sideMargin}rpx;margin-top:-${this.marginTop}rpx;margin-bottom:${this.marginBottom}rpx;`
			},
			swiperInfo() {
				this.marginTop = this.swiperList.marginTop
				this.sideMargin = this.swiperList.sideMargin
				this.marginBottom = this.swiperList.marginBottom
				return `margin-right:${this.sideMargin}rpx;margin-left:${this.sideMargin}rpx;margin-top:${this.marginTop}rpx;margin-bottom:${this.marginBottom}rpx;`
			},
			imgHeight() {
				this.swiperHeight = this.swiperList.swiperHeight
				this.swiperRadius = this.swiperList.swiperRadius
				return `height:${this.swiperHeight}rpx;border-radius: ${this.swiperRadius}rpx;`
			}
		},
		methods: {
			changeSwiper(e) {
				if (this.swiperList.swiperBgInfo.swiperBgColorType == 1) {
					const index = e.detail.current;
					const swiperBg = this.bannerList;
					this.swiperBackground = swiperBg[index].color;
				} else{
					this.swiperBackground = '';
				}
				uni.$emit('swiperBgColor', this.swiperBackground)
			},
		}
	}
</script>

<style lang="scss">
	.swiper-info {
		height: 280rpx;
		border-radius: 0;
	}

	.swiper-bg {
		height: 160rpx;
	}

	.swiper-position {
		position: relative;
		z-index: 1;

	}
</style>
