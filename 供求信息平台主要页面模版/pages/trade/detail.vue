<template>
	<view>
		<view class="bg-w pd16_15">
			<view class="ft16 cl-main ftw600">求购订做义工志愿者红背心</view>
			<view class="flex alcenter mt12">
				<text class="ft14 cl-notice">[女装]</text>
				<text class="ft14 cl-notice ml10">安徽合肥</text>
			</view>
			<view class="mt12 flex alcenter space">
				<text class="ft14 cl-notice">2021-07-03</text>
				<view class="flex alcenter cl-notice">
					<text class="iconfont icon-fangwen1 ft14"></text>
					<text class="ft14 ml5">100</text>
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="pd16_15" style="border-radius: 16rpx; background: #F2F2F2;">
				<view class="flex alend space">
					<view>
						<view class="cl-notice">
							<text class="iconfont icon-lianxiren"></text>
							<text class="ft14 ml5">联系人：</text>
							<text class="ft14">尤哥</text>
						</view>
						<view class="cl-notice mt12">
							<text class="iconfont icon-dianhua"></text>
							<text class="ft14 ml5">联系方式：</text>
							<text class="ft14">150****9640</text>
						</view>
					</view>
					<view class="btn-mini" :style="getBtnStyle">查看</view>
				</view>
			</view>
			
			<view class="mt16 ft14 cl-main ftw500">详细说明</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="ft14 cl-notice">
				订购内容说明
			</view>
			
			<view class="mt16 trade-table">
				<view class="flex alcenter" style="background: #E2E2E2;">
					<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 60%;">产品</view>
					<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 40%;border-left: 1px solid #e2e2e2;">数量</view>
				</view>
				
				<view class="flex alcenter">
					<view class="ft14 cl-main ftw500 pd10 text-center text-over" style="width: 60%;">袜子</view>
					<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 40%;border-left: 1px solid #e2e2e2;">100双</view>
				</view>
				<view class="flex alcenter" style="border-top: 1px solid #E2E2E2;">
					<view class="ft14 cl-main ftw500 pd10 text-center text-over" style="width: 60%;">袜子</view>
					<view class="ft14 cl-main ftw500 pd10 text-center" style="width: 40%;border-left: 1px solid #e2e2e2;">100双</view>
				</view>
			</view>
			
		</view>
		
		<view class="pd16_15">
			<view class="ft16 ftw600 cl-main">相关推荐</view>
			<view v-for="a in 10" :key="a"  class="box noshadow  mt16">
				<navigator open-type="redirect" url="/pages/trade/detail">
				<view class="pd16_15">
					<view class="ft16 cl-main ftw500">
						<text class="tag-categroy mr5">女装</text>求购成都批发女装市场求购成都批发女装市场求购成都批发女装市场
					</view>
					<view class="mt12 ft14 cl-notice">
						成都女装批发市场进货价格方面的问题
					</view>
					<view class="mt12 flex alcenter space">
						<view>
							<text class="ft12 cl-main">07-01</text>
							<text class="ft12 cl-main ml10">安徽 合肥</text>
						</view>
						
						<view class="baojia-btn" :style="{borderColor:tempColor,color:tempColor}">我要报价</view>
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
		}
	}
</script>

<style>
	.trade-table{
		border:2rpx solid #E2E2E2;
	}
	.baojia-btn{
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		border:1px solid #F2F2F2;
		color:#f2f2f2;
		font-size: 28rpx;
	}
</style>