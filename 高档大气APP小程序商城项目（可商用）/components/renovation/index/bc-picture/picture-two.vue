<template>
	<view class="flex-1 row-ac-fw" :style="modularMargin">
		<view class="picture-item" v-for="(item,index) in pictureList.list" :key="index" :style="pictureSize" @click="navTo(item.linkTo)">
			<view class="flex-1 picture-box" :style="[{marginRight:(index%2 != 1 ? rightSpacing :'0rpx' )},{marginLeft:(index%2 == 1 ? rightSpacing :'0rpx' )},{height:pictureH}]">
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
		computed:{
			modularMargin(){
				this.modulMT = this.pictureList.modulMT
				this.modulMargin = this.pictureList.modulMargin
				return `margin-top:${this.modulMT}rpx;margin-right:${this.modulMargin}rpx;margin-left:${this.modulMargin}rpx;`
			},
			pictureSize(){
				this.marginBottom = this.pictureList.marginBottom
				return `margin-bottom:${this.marginBottom}rpx;`
			},
			LeftSpacing(){
				this.LRspacing = this.pictureList.LRspacing / 2
				return `margin-left:${this.Lspacing}rpx;`
			},
			rightSpacing(){
				this.LRspacing = this.pictureList.LRspacing / 2
				return this.LRspacing + 'rpx'
			},
			pictureR(){
				this.pictureRadius = this.pictureList.pictureRadius
				return `border-radius:${this.pictureRadius}rpx;`
			},
			pictureH(){
				this.pictureHeight = this.pictureList.pictureHeight
				return this.pictureHeight + 'rpx'
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
		width: 50%;
		.picture-box{
			height: 150rpx;
		}
	}
</style>