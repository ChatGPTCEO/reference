<template>
	<view class="content">
		<view>
	
			<view class="box pd16_15">
				<view class="mt24 flex space"  style="width: 600rpx;">
					<view class="col3 text-center">
										
										 <view class="cl-notice ft12">余额</view>
										 <view class="mt8 ft20 ftw600 cl-default">{{member.money}}</view>
										 
					</view>
					
					<view class="col3 text-center">
										
											 <view class="cl-notice ft12">积分</view>
											 <view class="mt8 ft20 ftw600 cl-default">{{member.integral}}</view>
										 
					</view>
				</view>
				<!-- <view class="flex space alcenter  mt24" style="padding-bottom: 16rpx;">
					<view class="flex alcenter">
										 <navigator url="/pages/client/vipcard/recharge">
											<view class="btn-vip-money" :style="getBtnStyle">余额充值</view>
										 </navigator>
										 <navigator url="/pages/client/vipcard/adviser">
											<view class="btn-vip-adviser ml15" :style="getBtnPlanStyle">专属顾问</view>
										 </navigator>
					</view>
				</view> -->
			</view>
		</view>
		
	</view>
		
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				member:[]
			}
		},
		onLoad() {
			this.getmember()
		},
		onShow() {
			this.token = uni.getStorageSync('token')
			if(!this.token){
				uni.navigateTo({
					url: '../denglu/denglu'
				})
			}
		},
		methods: {
			tiao(){
				uni.navigateTo({
					url: "../denglu/denglu"
				})
			},
			getmember(){
				this.api.request({
									url: 'member/view',
									method: 'get',
									has_token: true,
									data: {
										// member_id:6,
										// sell_status: 1
									},
									success: (res) => {
										this.member=res.data
										console.log(res)
										// this.re = res.data.list
									}
								}) 
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
.home-vip-tag-box{
		height: 100rpx;
		width: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 8rpx;
	}
	.btn-vip-money,.btn-vip-adviser{
		width: 208rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color:#FFFFFF;
		background-color: #00C657;
	}
	
</style>
