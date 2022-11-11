<template>
	<view class="flex-1" :style="attributeValue">
		<template v-if="columnInfo.type == 0">
			<view class="flex-1 row-ac-sb">
				<view class="row-ac">
					<view class="row-ac column-title font-s-6">
					    <text class="iconfont" :class="columnInfo.icon" :style="iconAttr" v-if="columnInfo.icon !== ''"></text>
						<text class="" :style="titleAttr">{{ columnInfo.title }}</text>
					</view>
					<view class="promotion" :style="promotionAttr" v-if="columnInfo.promotion !== ''">{{ columnInfo.promotion }}</view>
				</view>
				<view class="to-more" :style="moreAttr" @click="navTo(columnInfo.moreUrl)" v-if="columnInfo.moreText !== ''">
					<text class="font-s-2">{{ columnInfo.moreText }}</text>
				    <text class="iconfont icon-next-01"></text>
				</view>
			</view>
		</template>
		<template v-if="columnInfo.type == 1">
			<view class="flex-1 row">
				<view class="row-ac">
					<view class="row-ac column-title font-s-6">
					    <text class="iconfont" :class="columnInfo.icon" :style="iconAttr" v-if="columnInfo.icon !== ''"></text>
						<text :style="titleAttr">{{ columnInfo.title }}</text>
					</view>
					<view class="promotion" :style="promotionAttr" v-if="columnInfo.promotion !== ''">{{ columnInfo.promotion }}</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data(){
			return{}
		},
		props:{
			columnInfo:{
				type: [String,Object],
				default: () => {
					return {};
				}
			}
		},
		computed:{
			attributeValue(){
				this.modulMT = this.columnInfo.modulMT
				this.modulMargin = this.columnInfo.modulMargin
				return `margin-top: ${this.modulMT}rpx;margin-right: ${this.modulMargin}rpx;margin-left: ${this.modulMargin}rpx;`
			},
			titleAttr(){
				this.titleSize = this.columnInfo.titleSize
				this.titleColor = this.columnInfo.titleColor
				this.titleThickness = this.columnInfo.titleThickness
				this.titleML = this.columnInfo.titleML
				return `font-size: ${this.titleSize}rpx;color:${this.titleColor};font-weight: ${this.titleThickness};margin-left: ${this.titleML}rpx;`
			},
			iconAttr(){
				this.iconSize = this.columnInfo.iconSize
				this.iconColor = this.columnInfo.iconColor
				return `font-size: ${this.iconSize}rpx;color:${this.iconColor};`
			},
			promotionAttr(){
				this.promotionSize = this.columnInfo.promotionSize
				this.promotionColor = this.columnInfo.promotionColor
				this.promotionML = this.columnInfo.promotionML
				return `font-size: ${this.promotionSize}rpx;color:${this.promotionColor};font-weight: ${this.promotionML};margin-left: ${this.promotionML}rpx;`
			},
			moreAttr(){
				this.moreColor = this.columnInfo.moreColor
				return `color:${this.moreColor};`
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
	.column-title{
		color: #2D2D2D;
	}
	.to-more{
		color: #B5B5B5;
		.icon-next-01{
			font-size: 24rpx;
		}
	}
	.promotion{
		margin-left: 30rpx;
		font-size: 26rpx;
		color: #7F7F7F;
	}
</style>