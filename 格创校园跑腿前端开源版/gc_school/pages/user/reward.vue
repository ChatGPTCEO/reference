<template>
	<scroll-view scroll-y class="scrollPage">
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的打赏</view>
		</cu-custom>


		<!-- 数据列表 -->
		<block v-if="dataList.length>0">
			<view class="margin-lg padding list" v-for="(item,index) in dataList" :key="index" @click="link(item.a_id)">
				<view class="flex align-center justify-between">
					<view class="text-lg text-bold content">{{item.content}}</view>
					<text class="cuIcon-right text-gray"></text>
				</view>
				<view class="text-sm text-gray margin-top-sm">{{item.addtime}}</view>
				<view class="flex justify-between align-center margin-top-sm">
					<image class="avatar" v-if="item.is_anonymous==0"
					:src="item.avatar ? item.avatar : 'https://test.fkynet.net/wximage/avatar.jpg'"></image>
					<image class="avatar" v-else src="https://test.fkynet.net/wximage/avatar.jpg"></image>
					<view class="nickname">
						{{ item.is_anonymous==1?"匿名用户":item.nickname }}
					</view>
					<!-- <view class="nickname text-bold">{{item.is_anonymous==0?"匿名用户":item.nickname}}</view> -->
					<view class="text-df text-red text-bold">￥<text class="text-xl">{{item.price}}</text></view>
				</view>
			</view>
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
				page:1,
				is_loadmore:true,
				dataList:[],
			}
		},
		onLoad() {
			this.getLst()
		},
		onReachBottom() {
			if(this.is_loadmore)
			{
				this.page++
				this.getLst()
			}
			else{
				uni.showToast({
					title:'没有更多数据~',
					icon:'none'
				})
			}
		},
		methods: {
			link(id)
			{
				uni.navigateTo({
				    url: '/gc_school/pages/article/detail?id='+id
				});
			},
			getLst() {
				const self = this;
				app.globalData.util.request({
					url: 'WechatUser/rewardLst',
					data: {
						page:self.page,
					},
					success(res) {
						if(res.data.data.length<10)
						{
							self.is_loadmore = false
						}
						self.dataList = self.page==1?res.data.data:[
							...self.dataList,...res.data.data
						],
						console.log(self.dataList)
					}
				}, true);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F5F6;
	}

	.bgmain {
		background-color: #F7F5F6;
		color: black;
	}
	.list{
		border-radius: 10rpx;
		background-color: white;
		.content{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.avatar{
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
		.nickname{
			font-size: 30rpx;
			flex-grow: 1;
		}
	}
</style>
