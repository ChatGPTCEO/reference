<template>
	<div class="CustomerList">
		<block v-if="type == 0 && list.length>0" v-for="(item,index) in list" :key="index">
			<div class="item acea-row" @click="goPage(item)">
				<view class="logo">
					<image :src="item.merchant.mer_avatar" mode=""></image>
				</view>
				<view class="info">
					<view class="name">{{item.merchant.mer_name}}</view>
					<view class="con line1" v-if="item.last.msn_type == 1">{{item.last.msn}}</view>
					<view class="con line1" v-if="item.last.msn_type == 2">[表情]</view>
					<view class="con line1" v-if="item.last.msn_type == 3">[图片]</view>
					<view class="con line1" v-if="item.last.msn_type == 4">[商品]</view>
					<view class="con line1" v-if="item.last.msn_type == 5 || item.last.msn_type == 6">[订单]</view>
				</view>
				<view class="right-box">
					<view class="time">{{item.create_time}}</view>
					<view class="num" v-if="item.num>0">{{item.num}}</view>
				</view>
			</div>
		</block>
		<block v-if="type == 1 && list.length>0" v-for="(item,index) in list" :key="index">
			<div class="item acea-row" @click="goPage(item)">
				<view class="logo">
					<image :src="item.user.avatar" mode=""></image>
				</view>
				<view class="info">
					<view class="name">{{item.user.nickname}}</view>
					<view class="con line1" v-if="item.last.msn_type == 1">{{item.last.msn}}</view>
					<view class="con line1" v-if="item.last.msn_type == 2">[表情]</view>
					<view class="con line1" v-if="item.last.msn_type == 3">[图片]</view>
					<view class="con line1" v-if="item.last.msn_type == 4">[商品]</view>
					<view class="con line1" v-if="item.last.msn_type == 5 || item.last.msn_type == 6">[订单]</view>
				</view>
				<view class="right-box">
					<view class="time">{{item.create_time}}</view>
					<view class="num" v-if="item.num>0">{{item.num}}</view>
				</view>
			</div>
		</block>
		<block v-if="list.length == 0">
      <view class="u-padding-30">
        <u-empty src="/static/empty-box.png" text="暂无账号" icon-size="414" margin-top="50"></u-empty>
      </view>
		</block>
	</div>
</template>
<script>

	export default {
		components:{
		},
		data() {
			return {
				list: [],
				productId: 0,
				orderId: "",
				type: 0 // 0 用户 1客服
			};
		},
		onLoad(optios) {
			this.type = optios.type
		},
		onShow(option) {
			this.getList();
		},
		methods: {
			getList() {
				if(this.type == 0){
					this.$u.get('/api/service/list').then(res => {
						this.list = res.data.list;
					});
				}else{
					this.$u.get('/api/service/user_list').then(res =>{
						this.list = res.data.list;
					})
				}
				
			},
			goPage(item) {
				if(this.type == 0){
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?mer_id=${item.mer_id}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?userId=${item.user.uid}&mer_id=${item.mer_id}`
					})
				}
			}
		}
	};
</script>
<style lang="scss">
	.CustomerList {
		.item {
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 20rpx 30rpx;
			background-color: #fff;
			.logo image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
			.info{
				width: 334rpx;
				margin-left: 20rpx;
				.con{
					margin-top: 10rpx;
					color: #999999;
					font-size: 24rpx;
				}
			}
			.right-box{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				font-size: 20rpx;
				color: #BBBBBB;
				.time{
					margin-bottom: 10rpx;
				}
				.num{
					min-width: 6px;
					background-color: $uni-color-warning;
					border-radius: 15px;
					font-size: 10px;
					padding: 0 4px;
					font-size: 20rpx;
					color: #333;
				}
			}
		}
	}
</style>
