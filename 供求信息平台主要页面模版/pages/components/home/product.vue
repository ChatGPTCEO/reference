<template>
	<view class="plr15">
		<view class="flex alcenter space">
			<text class="ft16 cl-main ftw600">热门供应</text>
			<view class="flex alcenter">
				<text class="ft14 cl-notice">查看更多</text>
				<text class="iconfont icon-gengduo ft14 cl-notice ml5"></text>
			</view>
		</view>
		
		<view class="mt16 flex wrap space">
			<view class="product-list-item">
				<navigator url="/pages/product/detail">
				<image class="photo"></image>
				<view style="padding: 10rpx;">
					<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
					<view class="mt5 flex alcenter space">
						<view class="flex alcenter">
							<text class="ft14 cl-price">面议</text>
							<text class="ft12 ml5 cl-notice">/件</text>
						</view>
						<text class="ft12 cl-notice">安徽 合肥</text>
					</view>
				</view>
				</navigator>
			</view>
			<view class="product-list-item">
				<navigator url="/pages/product/detail">
				<image class="photo"></image>
				<view style="padding: 10rpx;">
					<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
					<view class="mt5 flex alcenter space">
						<view class="flex alcenter">
							<text class="ft14 cl-price">面议</text>
							<text class="ft12 ml5 cl-notice">/件</text>
						</view>
						<text class="ft12 cl-notice">安徽 合肥</text>
					</view>
				</view>
				</navigator>
			</view>
			<view v-for="a in 10" :key="a" class="product-list-item mt10">
				<navigator url="/pages/product/detail">
				<image class="photo"></image>
				<view style="padding: 10rpx;">
					<view class="ft14 cl-main ftw500 text-over">武汉卡熙缇童装公主裙品牌折扣童装批发童装公主裙直播货源</view>
					<view class="mt5 flex alcenter space">
						<view class="flex alcenter">
							<text class="ft14 cl-price">面议</text>
							<text class="ft12 ml5 cl-notice">/件</text>
						</view>
						<text class="ft12 cl-notice">安徽 合肥</text>
					</view>
				</view>
				</navigator>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.product-list-item{
		width: calc(50% - 10rpx);
		height: 446rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.product-list-item .photo{
		width: 100%;
		height: 336rpx;
		background: #F2F2F2;
	}
</style>