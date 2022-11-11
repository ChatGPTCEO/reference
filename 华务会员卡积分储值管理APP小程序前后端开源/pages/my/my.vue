<template>
	<view class="count">
		<view>
			<view class="selfhe">
				<!-- <view class="textname">昵称</view> -->
				<view class="textnum">账 号：{{member.mobile}}</view>
			</view>
		</view>
		<view class="" style="padding: 10rpx;"></view>
		<!-- <view class="selfhe">
			<view>系统设置</view>
		</view> -->
		<!-- <view class="" style="padding: 10rpx;"></view> -->
		
		<view class="selfhe">
			<view>关于</view>
		</view>
		<view class="" style="padding: 10rpx;"></view>
		
		<view class="selfhe" @click="tui()">
			<view>退出</view>
		</view>
		<view class="" style="padding: 10rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				member:{}
			}
		},
		onLoad(){
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
										// id: uni.getStorageSync('userdata')['id']
										// console.log(res)
										//  this.re = res.data.list
										 // uni.setStorageSync('member',res.data)
									}
								})
			},
			tui(){
				uni.clearStorageSync()
				uni.redirectTo({
					url: '../denglu/denglu',
				})
			}
		}
	}
</script>

<style>
	.count{
		background-color: #F1F1F1;
	}
.all{
	margin-left: 20upx;
	margin-bottom: 30upx;
	background-color: #FFFFFF;
}
.textname{
	font-size: 40rpx;
}
.textnum{
	color: #999999;
}
.selfhe {
		padding: 20rpx;
		border-radius: 0rpx;
		
		background-color: #FFFFFF;
		align-items: center;
	}
</style>
