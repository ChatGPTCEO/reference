<template>
	<view>
		<view class="fixed-top bg-white w-100 row-ac" style="height: 80rpx;">
			<view class="flex-1 row-a-j-fc" v-for="(item,index) in tabList" :key="index" @click="clickTab(index)"
						:class="{active: tabIndex == index}">
				<view>{{ item.tabName }}</view>
				<view class="order-underline  mt-1 "></view>
			</view>
		</view>
		<view style="width: 100%;height: 90rpx;"></view>

		<view class="order-list">
			<view class="order-item" v-for="(item,index) in myGroupBuyingList" :key="index">
				<view class="order__info">
					<image class="prod__img" :src="item.img.img"></image>
					<view class="info">
						<view class="title">{{item.title}}</view>
						<view class="bottom-info">
							<view class="price-count">
								<view class="count">{{item.peopleCount}}人团</view>
								<view class="price">￥{{item.price[0]}}</view>
							</view>
							<view class="oder-status">
								<text v-if="item.status === 1">拼团中</text>
								<text v-if="item.status === 2">拼团成功</text>
								<text v-if="item.status === 3">拼团失败</text>
							</view>
						</view>
					</view>
				</view>
				<view class="order-option">
					<view class="btn" @click="toGroupDetail(item)">查看团详情</view>
					<view class="btn btn--invitation" @click="toGroupDetail(item)"  v-if="item.status === 1">邀请好友拼团</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getMyGroupBuyingListUrl
} from '@/api/index.js';
	export default {
		data() {
			return {
				tabList:[{
					tabName:'组团'
				},{
					tabName:'参团'
				}],
				tabIndex:0,
				myGroupBuyingList:[],
				myGroupBuyingTotal:0,
				queryInfo:{
					pageSize: 10,
					page: 1,
					identity:'head'
				},
			}
		},
		onLoad() {
			this.initData();
		},
		// 上划加载
		onReachBottom() {
			this.onReachBottomHandle();
		},
		methods: {
			initData(){
				this.getMyGroupBuyingList()
			},
			onReachBottomHandle() {
				// 触底事件
				if (this.myGroupBuyingTotal != this.myGroupBuyingList.length) {
					this.queryInfo.page++;
					this.getMyGroupBuyingList();
				}
			},
			getMyGroupBuyingList(){
				this.$R.get(getMyGroupBuyingListUrl, this.queryInfo).then(res => {
					console.log(res)
					this.myGroupBuyingList = res.data.list || []
					this.myGroupBuyingTotal = res.data.total
				})
			},
			clickTab(index){
				this.tabIndex = index
				if(index === 0){
					this.queryInfo.identity = 'head'
				}else {
					this.queryInfo.identity = 'ordinary'
				}
				this.myGroupBuyingTotal = 0
				this.queryInfo.page = 1
				this.getMyGroupBuyingList()
			},
			// 跳转到拼团详情页
			toGroupDetail(groupInfo){
				console.log(groupInfo)
				uni.navigateTo({
					url: '/pages/group-buying/my-group-detail?uuid='+groupInfo.uuid
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	// #ifdef H5
	.fixed-top {
		top: 100rpx
	}
	// #endif
	.order-underline {
		width: 80rpx;
		height: 6rpx;
	}

	.active .order-underline {
		background-color: $bg-main-color;
	}
	.order-list{
		margin-top: 16rpx;
		.order-item{
			background-color: #fff;
			margin-bottom: 16rpx;
			padding: 28rpx 28rpx 16rpx;
			.order__info{
				display: flex;
				padding-bottom: 10px;
				.prod__img{
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
					display: block;
				}
				.info{
					.title{
						width: 550rpx;
						font-size: 30rpx;
						color: #333;
					}
					.bottom-info{
						display: flex;
						justify-content: space-between;
						.price-count{
							display: flex;
							.count{
								font-size: 26rpx;
								color: #333;
							}
							.price{
								font-size: 26rpx;
								color: #fe2841;
							}
						}
						.oder-status{
							font-size: 28rpx;
							color: #fe2841;
						}
					}
				}
			}
			.order-option{
				border-top: 1px solid #ddd;
				padding-top: 16rpx;
				height: 60rpx;
				.btn{
					font-size: 24rpx;
					padding: 6rpx 10rpx;
					color: #666666;
					border: 1px solid #ddd;
					margin-left: 20rpx;
					float: right;
					&.btn--invitation{
						background-color: #fe2841;
						color: #fff;
						border-color: #fe2841;
					}
				}
			}
		}
	}

</style>
