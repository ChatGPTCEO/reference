<template>
	<view class="swiper-box">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" 
		:circular="true"
		 @change="change"
		 easingFunction="easeInOutCubic"
		 previousMargin="30"
		 next-margin="30"
		 active-class="active-class"
		 >
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item">
					<image class="swiper-item" :class="currIndex!=index?'swiper-item-scale':''" :src="item.pic" mode="" @click="clickImg(index)" ></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- dots -->
		<!-- <view class="dtos">
			<view class="dto" :class="{'dto-active':index===currIndex}" v-for="(item,index) in list" :key="index"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				currIndex: 0,
			};
		},
		methods: {
			change(s) {
				this.currIndex = s.detail.current;
			},
			
			clickImg(index){
				this.$emit("clickImg", index);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		width: 100%;
		height: 300upx;
		// height: 383upx;
		background: #fff;
		// background-image: linear-gradient(#8ec2fb, #ffffff);
	}

	.swiper {
		// width: 690upx;
		height: 300upx;
		// margin: 25upx auto 0;
		padding: 20upx 0;
		box-sizing: border-box;
	}

	.swiper-item {
		width: 100%;
		height: 260upx;
		border-radius: 20upx;
		// transition: all 0.2s ease-in 0s;
		// overflow: hidden;
	}
	
	.swiper-item-scale{
		transform: scale(0.92);
		transition: all 0.3s ease-in 0s;
		overflow: hidden;
	}

	.dtos {
		display: flex;
		position: relative;
		bottom: 0upx;
		margin: 0 auto;
		justify-content: center;
		// margin-top: 22upx;

		.dto {
			width: 14upx;
			height: 14upx;
			border-radius: 500upx;
			background: #e5e5e5;
			margin: 0 7upx;
			transition: width 0.5s;
		}

		.dto-active {
			background: #c2c2c2;
			width: 26upx;
		}
	}
	.active-class{
		margin-top: 100upx;
	}
</style>
