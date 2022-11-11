<template>
	<scroll-view scroll-y class="scrollPage">
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">查看明细</view>
		</cu-custom>

		<view class="padding bg-white flex align-center justify-between text-black">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
				<view class="uni-input text-lg text-bold">{{date}}
					<text class="cuIcon-unfold"></text>
				</view>
			</picker>
			<view class="type_box" @click="modalName='Modal'">{{type_list[type_index]}}<text class="cuIcon-triangledownfill text-lg"></text></view>
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog padding-bottom-xl">
				<view class="cu-bar justify-end">
					<view class="content">选择筛选项</view>
					<view class="action" @click="modalName=''"> <text class="cuIcon-close"></text> </view>
				</view>
				<view class="padding-xl flex">
					<view v-for="(item,index) in type_list" :key="index" class="">
						<view class="type_item text-black" :class="type_index==index?'type_active':''" @click="change_type(index)">{{item}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 数据列表 -->
		<block v-if="dataList.length>0">
			<view class="margin-lg flex align-center justify-between padding list" v-for="(item,index) in dataList" :key="index">
				<view class="text-lg text-black" style="flex-grow: 1;">
					<view class="text-df text-bold flex align-center">
						<image src="../../../static/images/user/balance.png"></image>
						{{item.remark}}
					</view>
					<view class="text-sm date">{{item.addtime}}</view>
				</view>
				<view class="text-xl text-bold" :class="item.operate==0?'text-red':''">{{item.operate==0?'+':'-'}}{{item.price}}</view>
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
				date: '',
				modalName:'',
				type_list:['全部','收入','支出'],
				type_index:0,
				page:1,
				is_loadmore:true,
				dataList:[],
				startDate:'',
				endDate:'',
				operate_list:['',0,-1]
			}
		},
		onLoad() {
			const date = new Date();
			let year = date.getFullYear();
			let month = (date.getMonth() + 1)<10?('0'+Number(date.getMonth() + 1)):date.getMonth() + 1;
			
			this.startDate = (year-1)+'-'+month
			this.endDate = year+'-'+month
			this.date = year+'-'+month
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
			//选择类型
			change_type(index)
			{
				this.type_index=index
				this.modalName = ''
				this.page = 1
				this.dataList = []
				this.is_loadmore = true
				this.getLst()
			},
			//选择日期
			bindDateChange: function(e) {
				this.date = e.target.value
				this.page = 1
				this.dataList = []
				this.is_loadmore = true
				this.getLst()
			},
			getLst() {
				const self = this;
				app.globalData.util.request({
					url: 'AccountLog/index',
					data: {
						limit:10,
						page:self.page,
						operate:self.operate_list[self.type_index],
						date:self.date
					},
					success(res) {
						if(res.data.data.list.length<10)
						{
							self.is_loadmore = false
						}
						self.dataList = self.page==1?res.data.data.list:[
							...self.dataList,...res.data.data.list
						]
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
		background-color: white;
		color: black;
	}

	.type_box {
		background-color: #F9F9F9;
		font-size: 26rpx;
		height: 60rpx;
		padding: 0 40rpx;
		border-radius: 30rpx;
		align-items: center;
		display: flex;

		text {
			font-size: 36rpx !important;
		}
	}
	.type_item{
		background-color: #F2F2F2;
		height: 120rpx;
		width: 210rpx;
		text-align: center;
		line-height: 120rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}
	.cu-dialog{
		bottom: 0;
		position: absolute;
		width: 100%;
		display: block;
		background-color: white !important;
	}
	.type_active{
		background: #FEEDED;
		border: 2rpx solid #FF4C4D;
		border-radius: 10rpx;
		color: #FF4C4D;
	}
	.list{
		border-radius: 10rpx;
		background-color: white;
		image{
			width: 35rpx;
			height: 35rpx;
			margin-right: 15rpx;
			flex-shrink: 0;
		}
		.date{
			color: #A9A6B0;
			margin: 16rpx 0 0 55rpx;
		}
	}
</style>
