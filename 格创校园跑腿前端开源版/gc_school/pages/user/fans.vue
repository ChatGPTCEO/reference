<template>
	<scroll-view scroll-y class="scrollPage">
	    <cu-custom bgColor="bgmain" :isBack="true">
	        <view slot="content">我的粉丝</view>
	    </cu-custom>
		
		
		<block v-if="dataList.length>0">
			<block v-for="(item,index) in dataList" :key="index">
				<view class="bg-white flex align-center justify-between padding border-radius20 list">
					<image :src="item.avatar"></image>
					<view class="text-lg text-black text-bold nickname">{{item.nickname}}</view>
					<view class="text-sm follow_box already_follow" v-if="item.is_mutual==1" @click="cancel(item.uid)">
						<image src="../../../static/images/user/change.png"></image>
					</view>
					<view class="text-sm follow_box" v-else @click="follow(item.uid)">关注</view>
				</view>
				
			</block>
		</block>
		
		<block v-else>
			<view class="text-lg text-center margin-top">暂无相关数据~</view>
		</block>
		
	</scroll-view>
</template>

<script>
	var app = getApp();
	export default {
	    data() {
	        return {
				dataList:[]
			}
		},
		onLoad() {
			this.getLst()
		},
		methods:{
			follow(uid)
			{
				var self = this
				app.globalData.util.request({
				    url: 'UserFollow/follow',
				    data: {
						u_id:uid
					},
				    success(res) {
						if(res.data.status==200)
						{
							uni.showToast({
								title:res.data.msg
							})
							self.getLst()
						}
						else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
				    }
				},true);
			},
			cancel(uid)
			{
				var self = this;
				uni.showModal({
					title:'温馨提示',
					content:'确认取消关注该用户吗？',
					success(res) {
						if(res.confirm)
						{
							//执行取消关注操作
							app.globalData.util.request({
							    url: 'UserFollow/follow',
							    data: {
									u_id:uid
								},
							    success(res) {
									if(res.data.status==200)
									{
										uni.showToast({
											title:res.data.msg
										})
										self.getLst()
									}
									else{
										uni.showToast({
											title:res.data.msg,
											icon:'none'
										})
									}
							    }
							},true);
						}
					}
				})
			},
			getLst() {
			    const self = this;
			    app.globalData.util.request({
			        url: 'UserFollow/myFans',
			        data: {},
			        success(res) {
						console.log(res.data.data)
						self.dataList = res.data.data
			        }
			    },true);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F5F6;
	}
	.bgmain{
		background-color: #F7F5F6;
		color: black;
	}
	.border-radius20{
		border-radius: 20rpx;
	}
	.list{
		margin: 30rpx 40rpx;
		image{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.nickname{
			flex-grow: 1;
		}
		.follow_box{
			background: linear-gradient(90deg, #FF484A 0%, #FF716C 100%);
			border-radius: 40rpx;
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			color: white;
		}
		.already_follow{
			background: #FEEDED !important;
			color: #FF4C4D;
			image{
				width: 36rpx;
				height: 36rpx;
				margin: 0 auto;
			}
		}
	}
</style>
