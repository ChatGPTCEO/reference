<template>
	<view class="plr15">
		<view class="flex alcenter space">
			<text class="ft16 cl-main ftw600">{{title}}</text>
			<navigator url="/pages/store/index">
			<view class="flex alcenter">
				<text class="ft14 cl-notice">查看更多</text>
				<text class="iconfont icon-gengduo ft14 cl-notice ml5"></text>
			</view>
			</navigator>
		</view>
		<view class="box noshadow pd16_15 mt16 flex wrap space">
			<view class="ad-item">
				<image></image>
				<view class="ad-tag">广告</view>
			</view>
			<view class="ad-item">
				<view class="empty"><text class="ft16 cl-notice">等待入驻</text></view>
				<view class="ad-tag">广告</view>
			</view>
			<view class="ad-item mt10">
				<view class="empty"><text class="ft16 cl-notice">等待入驻</text></view>
				<view class="ad-tag">广告</view>
			</view>
			<view class="ad-item mt10">
				<view class="empty"><text class="ft16 cl-notice">等待入驻</text></view>
				<view class="ad-tag">广告</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.ad-item{
		width: calc(50% - 10rpx);
		height: 120rpx;
		background: #F2F2F2;
		position: relative;
	}
	.ad-item image{
		height: 120rpx;
		width: 100%;
	}
	.ad-item .empty{
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
	}
	.ad-item .ad-tag{
		padding: 2rpx 4rpx;
		border-radius: 8rpx;
		border:1px solid #FFFFFF;
		color:#FFFFFF;
		font-size: 24rpx;
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
	}
</style>