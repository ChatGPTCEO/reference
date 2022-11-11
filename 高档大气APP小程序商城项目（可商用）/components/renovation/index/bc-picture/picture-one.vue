<template>
	<view class=""> 
		<view class="flex-1" :style="pictureMT">
			<view class="picture-item flex-1" v-for="(item,index) in pictureList.list" :key="index" :style="imgHeight" @click="navTo(item.linkTo)">
				<image :src="item.cover" mode="scaleToFill" :style="pictureR"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
	
			}
		},
		props:{
			pictureList:{
				type: [String,Object],
				default: () => {
					return {};
				}
			}
		},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(value).toFixed(0);
				return realVal;
			},
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		computed:{
			pictureMT(){
				this.pictureMarginTop = this.pictureList.pictureMT
				return `margin-top:${this.pictureMarginTop}rpx;`
			},
			imgHeight(){
				this.sideMargin = this.pictureList.sideMargin
				this.marginBottom = this.pictureList.marginBottom
				this.pictureHeight = this.pictureList.pictureHeight
				return `height:${this.pictureHeight}rpx;margin-right:${this.sideMargin}rpx;margin-left:${this.sideMargin}rpx;margin-bottom:${this.marginBottom}rpx;`
			},
			pictureR(){
				this.pictureRadius = this.pictureList.pictureRadius
				return `border-radius:${this.pictureRadius}rpx;`
			}
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss">
	.picture-item{
		height: 200rpx;
	}
</style>
