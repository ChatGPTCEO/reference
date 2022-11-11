<template>
	<block>
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的发布</view>
		</cu-custom>
		<!-- <view class="tab_contain">
  <view bindtap="changeTab" class="tab_one" data-id="{{index}}" wx:for="{{tab}}" wx:key="id">
    <view class="{{tabid==item.id?'tab_on':''}}">{{item.name}}</view>
  </view>
</view> -->
		<view class="tabs flex">
			<view class="margin-left" @click="tabs(0)">
				<view :class="states == 0 ? 'tabs-zhong' : 'tabs-lie'">全部</view>
				<view class="flex" style="align-items: center;width: 100%;justify-content: center;" v-if="states == 0">
					<view class="tabs-zhong-tiao"></view>
				</view>
			</view>
			<view class="margin-left" @click="tabs(1)"  v-if="examine == 1">
				<view :class="states == 1 ? 'tabs-zhong' : 'tabs-lie'">审核中</view>
				<view class="flex" style="align-items: center;width: 100%;justify-content: center;" v-if="states == 1">
					<view class="tabs-zhong-tiao"></view>
				</view>
			</view>
		</view>
		<view class="trade_box">
			<view class="list-table" v-for="(good, index) in dataList" :key="good.id">
				<view class="single-trade" >
					<view @tap="toDetail" class="trade2" :data-id="good.m_id" :data-status="good.status">
						<image mode="aspectFill" class="bookimage" :src="good.image"></image>
						<view class="second-left">
							<view class="flex">
								<view class="titles">
								{{good.title}}
								</view>
								<view class="paystates" v-if="good.examine == 0">
									审核中
								</view>
								<view class="paystates" v-if="good.examine == 1">
									审核通过
								</view>
								<view class="paystates" v-if="good.examine == 2">
									审核失败
								</view>
							</view>
							<!-- <view class="textdet">
								<view class="text-bookname">{{ good.name }}</view>
							</view> -->
							<view class="flex" style="align-items: center;">
							<view class="price">￥{{ good.pay }}</view>
							<view class="kucun">库存：{{good.stock}}</view>
							</view>
							<view class="flex" >
							<view>
								<!-- <image src="../../../static/images/xihuans.png" class="xihuan"> -->
									<image src="../../../static/images/xihuans.png" v-if="good.stay == 1" class="xihuan">
									<image src="../../../static/images/xihuan.png" v-else class="xihuan">
								</image>
							</view>
							<view class="kucun">{{good.con}}</view>
							</view>
						</view>
					</view>
					<view style="width: 100%;height: 1px;background: #EEEEEE;margin-top: 25rpx;margin-bottom: 25rpx;"></view>
					<view class="trade3">
						<view class="margin-tb-sm-my text-center">
							<!-- <view class="sm button">{{ good.status }}</view> -->
							<view class="sm button" v-if="good.examine == 1">已通过</view>
							<view class="sm button" v-if="good.examine == 2">已拒绝</view>
							<view class="sm button" v-if="good.examine == 0">审核中</view>
						</view>
						<block v-if="good.m_id > 0">
							<view class="margin-tb-sm-my text-center" @tap="edit" :data-id="good.m_id">
								<view class="sm button">编辑</view>
							</view>
							<view class="margin-tb-sm-my text-center">
								<view v-if="good.state == 0" @tap="delorder" class="sm button bg-orange"
									:data-id="good.m_id">下架</view>
								<view v-else @tap="delorder" class="sm button bg-orange" :data-id="good.m_id">上架</view>
							</view>
						</block>
						<block v-else>
							<view class="margin-tb-sm-my text-center">
								<view class="sm button bg-orange">已售完</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="nocontent" v-if="dataList.length == 0">
			<image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
			<view class="blank_text">暂无数据哦~</view>
		</view>

		<view v-if="!loadmore && dataList.length > 0" class="nomore">没有更多数据了~</view>
	</block>
</template>

<script>
	// gc_school/pages/mysecond/index.js
	var app = getApp();
	export default {
		data() {
			return {
				tabid: 0,
				dataList: [],
				page: 1,
				loadmore: true,
				states: 0,
				examine:0,
				good: {
					id: '',
					status: '',
					img: '',
					name: '',
					price: '',
					fav_count: '',
					stock: 0,
					is_sale: 0
				}
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.getMylist();
			this.getexamine();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		// onShareAppMessage: function () {
		// }
		onReachBottom: function() {
			this.setData({
				page: this.page + 1
			});

			if (this.loadmore) {
				this.getMylist();
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		methods: {
			getexamine() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketuser/examine',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						page: self.page
					},
			
					success(res) {
						self.examine = res.data.data.examine;
						console.log(res.data.data.examine,'---111---')
					}
				}, true);
			},
			edit(e) {
				console.log(e.currentTarget.dataset.id);
				uni.navigateTo({
					url: '/gc_school/pages/secondhand/edit?id=' + e.currentTarget.dataset.id
				});
			},
			tabs(e) {
				this.states = e
				if (e == 0) {
					this.dataList = [];
					this.getMylist();
				} else {
					this.dataList = [];
					this.getMylists();
				}
			},
			getMylist() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketuser/goods',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						page: self.page
					},

					success(res) {
						// console.log(res.data.data.length, '---')
						if (res.data.data.length < 10) {
							self.setData({
								loadmore: false
							});
						}

						// if (this.page == 1) {
						//     self.setData({
						//         dataList: res.data.data
						//     });
						// } else {
						for (var i = 0; i < res.data.data.length; i++) {
							self.setData({
								dataList: [...self.dataList, res.data.data[i]]
							});
							// }
						} // self.setData({
						//   dataList:res.data.data
						// })
					}
				}, true);
			},
			getMylists() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketuser/goods',
					data: {
						examine: 1,
						s_id: uni.getStorageSync('schoolId'),
						page: self.page
					},

					success(res) {
						// console.log(res.data.data.length, '---')
						if (res.data.data.length < 10) {
							self.setData({
								loadmore: false
							});
						}

						// if (this.page == 1) {
						//     self.setData({
						//         dataList: res.data.data
						//     });
		 			// } else {
						for (var i = 0; i < res.data.data.length; i++) {
							self.setData({
								dataList: [...self.dataList, res.data.data[i]]
							});
							// }
						} // self.setData({
						//   dataList:res.data.data
						// })
					}
		 	}, true);
			},

			//删除订单
			delorder(e) {
				var self = this;
				console.log(e.currentTarget.dataset.id, '--22--11--');
				uni.showModal({
					title: '提示',
					content: '确认执行此操作吗？',

					success(res) {
						if (res.confirm) {
							app.globalData.util.request({
								url: 'Dmhmarketuser/delorder',
								data: {
									m_id: e.currentTarget.dataset.id,
									s_id: uni.getStorageSync('schoolId'),
								},

								success(res) {
									self.setData({
										page: 1,
										loadmore: true
									});
									self.dataList = [];
									self.getMylist();
								}
							}, true);
						}
					}
				});
			},

			toDetail(e) {
				console.log(e, '---22')
				uni.navigateTo({
					url: '/gc_school/pages/secondhand/detail?id=' + e.currentTarget.dataset.id
				});
			},

			changeTab: function(t) {
				this.setData({
					tabid: t.currentTarget.dataset.id
				});
				this.getlist();
			}
		}
	};
</script>
<style>
	page {
		background-color: rgb(241, 241, 241) !important;
	}

	/* .cu-bar .action:first-child{
  background-color: #FF6444;
  color: white;
} */
	/* .bgmain {
		background-color: #FFFFFF;
		color: #121212;
	} */
	.cu-bar .action:first-child {
		background-color: #FFFFFF;
		color: #121212;
	}

	.bgmain {
		background-color: #FFFFFF;
		color: #121212;
	}

	.tab_contain {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
	}

	.tab_one {
		width: 25%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 10rpx;
	}

	.tab_one view {
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.tab_on {
		font-size: 32rpx;
		font-weight: 600;
		border-bottom: 4rpx solid #7acfa6;
	}

	.trade_box {
		height: 100%;
		/* display: flex; */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.trade_box .single-trade:last-child {
		border-bottom: none;
	}

	.single-trade {
		width: 100%;
		height: 100%;
		padding: 10rpx 10rpx 20rpx;
		background-color: white;
		border-radius: 6rpx;
		position: relative;
		/* box-shadow: 0 0 10rpx rgba(0,0,0,0.1); */
		/* padding-bottom: 20rpx; */
		border-bottom: 2rpx solid #c9c9c9;
		border-radius: 20rpx;
	}

	.trade {
		width: 100%;
		height: 21px;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		margin-top: 20rpx;
		margin-left: 20rpx;
		border-bottom: 1px solid rgba(128, 128, 128, 0.068);
	}

	.first {
		width: 80%;
		height: 21px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.first view {
		font-size: 12px;
		padding-left: 12rpx;
	}

	.status {
		float: right;
		font-size: 12px;
	}

	.trade2 {
		height: 100%;
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		margin-top: 10rpx;
		margin-left: 20rpx;
		align-items: center;
	}

	.text-coursename {
		padding-top: 10rpx;
		font-size: 27rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		letter-spacing: 3rpx;
		line-height: 40rpx;
	}

	.text-bookname {
		font-size: 28rpx;
		font-weight: bold;
		/* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
		/* letter-spacing: 3rpx; */
		/* line-height: 45rpx; */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		/* height: 85rpx; */
	}

	.second-left {
		/* display: flex;
  flex-direction: row; */
		width: 100%;
	}

	.price {
		color: #ff2a00;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 50rpx;
	}

	.count {
		font-size: 24rpx;
	}

	.bookimage {
		width: 170rpx;
		height: 150rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}

	.textdet {
		width: 100%;
		/* width: calc(80% - 100rpx); */
		display: flex;
		flex-direction: column;
	}

	.textdet view {
		padding-left: 10rpx;
	}

	.second-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 20%;
	}

	.second-right image {
		width: 35rpx;
		height: 35rpx;
	}

	.second-right view {
		font-size: 30rpx;
	}

	.trade3 {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin: 20rpx;
	}

	.third-left {
		font-size: 27rpx;
		float: left;
		color: darkgrey;
		padding-left: 20rpx;
	}

	.third-right {
		float: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.trade4 {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.price {
		/* padding-left: 10rpx; */
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #F42E2F;
	}

	.blank {
		width: 100%;
		height: 2px;
		color: grey;
	}

	.nocontent {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
	}

	.nocontent image {
		width: 150rpx;
		height: 150rpx;
	}

	.blank_text {
		padding-top: 10rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
		color: #c6c6c8;
	}

	.sm {
		font-size: 26rpx !important;
		margin-left: 15rpx;
	}

	.button {
		border-radius: 50rpx;
		background: white;
		color: black;
		border: 2rpx solid #cccccc;
		padding: 5rpx 20rpx;
	}

	.bg-orange {
		background-color: #ff6344 !important;
		color: white !important;
		border: 2rpx solid #ff6344;
	}

	.kucun {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		margin-left: 15rpx;
	}

	.xihuan {
		width: 23rpx;
		height: 21rpx;
		margin-left: 15rpx;
	}

	.states {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4C4D;
		line-height: 18rpx;
	}

	.yuanjia {
		margin-left: 15rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
	}

	.tabs {
		background-color: #FFFFFF;
		width: 100%;
		padding: 0 30rpx;

	}

	.tabs-zhong {
		height: 62rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #141414;
		line-height: 36rpx;
	}

	.tabs-lie {
		height: 62rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36rpx;
	}

	.tabs-zhong-tiao {
		width: 40rpx;
		height: 6rpx;
		background: #FF4C4D;
		border-radius: 3rpx;
	}
	.list-table{
		padding: 15rpx 30rpx;
	}
	.titles{
		width: 70%;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #141414;
		line-height: 44rpx;
		overflow: hidden;
		
		text-overflow: ellipsis;
		
		white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
	}
	.paystates{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF4C4D;
		line-height: 18rpx;
		text-align: right;
		width: 30%;
	}
</style>
