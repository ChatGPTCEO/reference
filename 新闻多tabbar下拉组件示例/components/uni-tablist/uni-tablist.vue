<template>
	<view>
		<slot name="tablist"></slot>
		<view class="loadbox" :class="{'loadboxshow': Refresh}">
			<view class="loading">
				<text></text>
				<text></text>
				<text></text>
				<text></text>
				<text></text>
			</view>
		</view>
		<swiper class="swiperbox"  :class="{'loadingfn': Refresh}"  :style="{height:'calc(100vh - '+topheight+'rpx)'}" style="transition: transform 0.5s;box-sizing: border-box;" :indicator-dots="false" :autoplay="false" :duration="500" :current="tabindex"
		 @change="changetab">
			<swiper-item v-for="(listbox,idx) in tablist" :key="idx">
				<movable-area style="width: 100%;height: 100%;" >
					<movable-view
						style="width: 100vw;height: 100%;"
						direction="vertical"
						:out-of-bounds="true"
						:y="0"
						:damping="50"
						:inertia="true"
						@change="refresh"
					>
						<scroll-view :scroll-y="true" class="list" lower-threshold=50 @scrolltolower="lower">
							<view style="padding: 20upx 32upx 32upx 32upx;">
								<slot name="list"></slot>
							</view>
						</scroll-view>
					</movable-view>
				</movable-area>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			topheight: {
				type: Number,
				default: 120
			},
			tablist: Array,
			loading: {
				type: Boolean,
				default: true
			},
			tabindex: {
				type: Number,
				tabindex: 0
			},
			Refresh:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			refresh(e){
				if(e.detail.y > 8 && !this.Refresh){
					this.$emit("refresh")
				}
			},
			
			changetab(e) {
				// this.tabindex = e.detail.current;
				this.$emit("changetab",e.detail.current)
			},
			lower(){
				console.log("jiaz")
				if (this.loading) {
					this.$emit('lower')
				} else {
					uni.showToast({
						icon: 'none',
						title: '没有更多了...'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.navheader{
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 17px;
		font-weight: 500;
		color: #000000;
	}
	
	.swiperbox{
		transform: translateY(0upx);
	}
	
	.loadbox {
		position: fixed;
		z-index: 1;
		left: 0rpx;
		top: -200rpx;
		transition: all 0.5s;
		width: 100%;
		text-align: center;
	}
	
	.loadboxshow {
		top: 180upx;
	}
	
	.loadingfn {
		transform: translateY(192rpx);
		transition: all 0.5s;
	}
	
	.loading {
		height: 30px;
		margin: 0 auto;
	}
	
	.loading text {
		display: inline-block;
		width: 8px;
		height: 100%;
		border-radius: 4px;
		background: #007AFF;
		margin: 0rpx 5rpx;
		-webkit-animation: load 1s ease infinite;
	}
	
	@-webkit-keyframes load {
	
		0%,
		100% {
			transform: scale(0.6);
			background-color: #55beff;
		}
	
		50% {
			transform: scale(1);
			background-color: #007AFF;
		}
	}
	
	.loading text:nth-child(2) {
		-webkit-animation-delay: 0.2s;
	}
	
	.loading text:nth-child(3) {
		-webkit-animation-delay: 0.4s;
	}
	
	.loading text:nth-child(4) {
		-webkit-animation-delay: 0.6s;
	}
	
	.loading text:nth-child(5) {
		-webkit-animation-delay: 0.8s;
	}
	.chush{
		height: calc(100vh - 124upx);
	}
	.odheight{
		height: calc(100vh - 84upx);
	}
	.list{
		width: 100%;
		height: 100%;
	}
	
</style>
