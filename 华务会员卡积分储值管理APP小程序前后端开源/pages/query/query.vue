<template>
	<view class="count">
		<view class="selfhe" v-for="(item,index) in query" :key="index">
			<view class="lists">
				<view>{{item.type == '1' ? '余额' : '积分'}}</view>
				
				<view>{{item.aands == '1' ? '+' : '-'}}{{item.sum}}</view>
			</view>
			<view class="lists antext">
				<view>{{item.time | date}}</view>
				<view>{{item.aands == '1' ? '充值' : '消费'}}</view>
			</view>
			 <view class="xian"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:[]
			}
		},
		onLoad() {  //加载时执行	
					this.getquery()
					
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
			getquery(){
				this.api.request({
									url: 'Record/index',
									method: 'get',
									has_token:true,
									data: {
										// recom: 1,
										// sell_status: 1
									},
									success: (res) => {
										console.log(res)
										this.query = res.data.list
									}
								}) 
			}
		}
	}
</script>

<style>
.lists{
	display: flex;
	justify-content: space-between;
	margin-left: 20upx;
	margin-right: 20upx;
	margin-bottom: 25upx;
}
.xian {
		background-color: rgba(240, 240, 240, 0.6);
		height: 3rpx;
		margin: 20rpx 10rpx;
	}
	.count{
		background-color: #FFFFFF;
	}
	.antext{
		font-size: 15upx;
		color: #999999;
	}
</style>
