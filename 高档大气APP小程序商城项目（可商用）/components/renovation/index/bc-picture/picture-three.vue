<template>
	<view class="flex-1" :style="modularMargin">
		<view class="d-f flex-1">
			<view class="modul-box">
				<view class="flex-1" :style="leftPictureSise">
					<image :src="pictureList.leftPicture.cover" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="modul-box" >
				<view class="flex-1 d-f justify-between flex-column" :style="rightBoxSise">
					<view style="width: 100%;" :style="rightPictureSise" v-for="(item,index) in pictureList.rightPicture.list">
						<image :src="item.cover" mode="scaleToFill"></image>
					</view>
				</view>
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
		computed:{
			modularMargin(){
				this.modulMT = this.pictureList.modulMT
				this.modulMargin = this.pictureList.modulMargin
				return `margin-top:${this.modulMT}rpx;margin-right:${this.modulMargin}rpx;margin-left:${this.modulMargin}rpx;`
			},
			leftPictureSise(){
				this.sideMargin = this.pictureList.sideMargin / 2
				this.pictureHeight =  this.pictureList.leftPicture.pictureHeight
				return `height:${this.pictureHeight}rpx;margin-right:${this.sideMargin}rpx;`
			},
			rightBoxSise(){
				this.sideMargin = this.pictureList.sideMargin / 2
				this.pictureHeight =  this.pictureList.leftPicture.pictureHeight
				return `height:${this.pictureHeight}rpx;margin-left:${this.sideMargin}rpx;`
			},
			rightPictureSise(){
				this.pictureHeight =  this.pictureList.rightPicture.pictureHeight
				return `height:${this.pictureHeight}rpx`
			},
			LFMargin(){
				this.sideMargin = this.pictureList.sideMargin
				return this.sideMargin
			}
		}
	}
</script>

<style lang="scss">
	.modul-box{
		width: 50%;
	}
</style>