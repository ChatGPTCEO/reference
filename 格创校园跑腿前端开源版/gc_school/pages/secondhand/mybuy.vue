<template>
	<block>
		<!-- gc_school/pages/secondhand/sale.wxml -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">我的订单</view>
		</cu-custom>
		<view class="tabs flex">
			<view class="margin-left" @click="tabs(0)">
				<view :class="states == 0 ? 'tabs-zhong' : 'tabs-lie'">我买的</view>
				<view class="flex" style="align-items: center;width: 100%;justify-content: center;" v-if="states == 0">
					<view class="tabs-zhong-tiao"></view>
				</view>
			</view>
			<view class="margin-left" @click="tabs(1)">
				<view :class="states == 1 ? 'tabs-zhong' : 'tabs-lie'">我卖的</view>
				<view class="flex" style="align-items: center;width: 100%;justify-content: center;" v-if="states == 1">
					<view class="tabs-zhong-tiao"></view>
				</view>
			</view>
		</view>
		<view class="trade_box">
			<view class="single-trade" v-for="(good, index) in dataList" :key="good.id">
				<view @tap="toDetail" class="trade2" :data-id="good.id" :data-status="good.status">
					<image mode="aspectFill" class="bookimage" :src="good.market.image"></image>
					<view class="second-left">
						<view class="textdet flex">
							<view class="text-bookname flex" style="width: 60%;align-items: center;">
								{{ good.market.title }}</view>
							<view class="states" style="width: 30%;text-align: right;" v-if="good.paystate == 1">已付款
							</view>
							<view class="states" style="width: 30%;text-align: right;" v-if="good.paystate == 2">已完成
							</view>
							<view class="states" style="width: 30%;text-align: right;" v-if="good.paystate == 3">退款中
							</view>
							<view class="states" style="width: 30%;text-align: right;" v-if="good.paystate == 4">退款完成
							</view>
						</view>
						<view class="flex" style="align-items: center;">
							<view class="price">￥{{ good.pay }}</view>
							<view class="kucun" v-if="states == 1">库存：{{good.market.stock}}</view>
							<view class="yuanjia" v-if="states == 0">￥{{good.market.price}}</view>
						</view>
						<view class="flex" v-if="states == 1">
							<view>
								<image src="../../../static/images/xihuans.png" v-if="good.stay == 1" class="xihuan">
								<image src="../../../static/images/xihuan.png" v-else class="xihuan">
								</image>
							</view>
							<view class="kucun">{{good.con}}</view>
						</view>
						<view class="flex" v-if="states == 0">
							<view>
								<image :src="good.user.avatar" class="xihuan">
								</image>
							</view>
							<view class="kucun">{{good.user.nickname}}</view>
						</view>
					</view>
				</view>

				<view class="trade3">
					<view class="margin-tb-sm-my text-center">
						<view v-if="good.paystate == 1 && states == 0" class="flex">
							<view @tap="refund" :data-id="good.oid" :data-status="good.status" class="sm button ">
								申请退款</view>
							<view @tap="confirm" :data-id="good.oid" :data-status="good.status"
								class="sm button refund">确认完成
							</view>
						</view>
						<view v-if="good.paystate == 2" :data-id="good.oid" :data-status="good.status"
							class="sm button">已完成</view>
						<view v-if="good.paystate == 3 && states == 0" :data-id="good.oid" :data-status="good.status"
							class="sm button refund">退款中</view>
							<view v-if="good.paystate == 3 && states == 1" class="flex">
							    <view class="sm button refund" @tap="agree" data-type="1" :data-id="good.oid">同意退款</view>
							    <view class="sm button refund" @tap="agree" data-type="2" :data-id="good.oid">拒绝退款</view>
							</view>
						<view v-if="good.paystate == 4" :data-id="good.oid" :data-status="good.status"
							class="sm button">退款完成</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nocontent" v-if="dataList.length == 0">
			<image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
			<view class="blank_text">暂无数据哦~</view>
		</view>

		<view v-if="!loadmore && dataList.length > 0" class="nomore">没有更多数据了~</view>

		<view class="toast-box" v-if="ifName">
			<view class="toastbg"></view>
			<view class="showToast">
				<view class="toast-title">
					<text>退款理由</text>
				</view>
				<view class="toast-main">
					<view class="toast-input">
						<textarea placeholder="请填写退款原因" :value="reason" @input="setValue"></textarea>
					</view>
				</view>
				<view class="toast-button">
					<view class="button1">
						<view @tap.stop.prevent="cancel">取消</view>
					</view>
					<view class="button2">
						<view @tap.stop.prevent="confirmRefund">确定</view>
					</view>
				</view>
			</view>
		</view>
	</block>
</template>

<script>
	// gc_school/pages/mysecond/index.js
	var app = getApp();
	export default {
		data() {
			return {
				tabid: 0,
				states: 0,
				dataList: [],
				page: 1,
				loadmore: true,
				ifName: false,
				id: '',
				reason: '',

				good: {
					id: '',
					status: '',
					img: '',
					name: '',
					price: ''
				},
				onshows:0
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.dataList = [];
			this.page = 1;
			this.getMylist();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			if(this.onshows == 1){
				this.status = 0;
				this.states = 0;
				this.dataList = [];
				this.page = 1;
				this.getMylist();
			}else{
				this.onshows = 1;
			}
			
		},
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
				if(this.states == 0){
					this.getMylist();
				}else{
					this.getMylists();
				}
				
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		methods: {
			cancel() {
				this.setData({
					ifName: false,
					reason: ''
				});
			},
			tabs(e){
				this.states = e 
				if(e == 0){
					this.dataList = [];
					this.page = 1;
					this.getMylist();
				}else{
					this.dataList = [];
					this.page = 1;
					 this.getMylists();
				}
			},
			agree(e) {
			    console.log(e.currentTarget.dataset.id);
			    console.log(e.currentTarget);
			    var self = this;
			    app.globalData.util.request({
			        url: 'Dmhmarketorder/secondRefundOper',
			        data: {
			            s_id: uni.getStorageSync('schoolId'),
			            oid: e.currentTarget.dataset.id,
			            type: e.currentTarget.dataset.type
			        },
			
			        success(res) {
			            self.setData({
			                page: 1,
			                loadmore: true
			            });
						self.dataList = []; 	
			            self.getMylists();
			        }
			    },true);
			},
			//申请退款按钮
			refund(e) {
				console.log(e.currentTarget.dataset.id);
				this.setData({
					ifName: true,
					id: e.currentTarget.dataset.id
				});
			},

			getMylist() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketorder/index',
					data: {
						page: self.page,
						type: 2,
						s_id: uni.getStorageSync('schoolId')
					},

					success(res) {
						console.log(res.data.data.list, '---222---')
						if (res.data.data.list.length < 10) {
							self.setData({
								loadmore: false
							});
						}

						// if (this.page == 1) {
						//     self.setData({
						//         dataList: res.data.data.list
						//     });
						// } else {
						for (var i = 0; i < res.data.data.list.length; i++) {
							self.setData({
								dataList: [...self.dataList, res.data.data.list[i]]
							});
						}
						// } 
						console.log(self.dataList, '---111---')
						// self.setData({
						//   dataList:res.data.data
						// })
					}
				}, true);
			},
			getMylists() {
			    var self = this;
			    app.globalData.util.request({
			        url: 'Dmhmarketorder/index',
			        data: {
			            // openid: uni.getStorageSync('openid'),
			            page: self.page,
			            type: 1,
			            s_id: uni.getStorageSync('schoolId')
			        },
			
			        success(res) {
						console.log(res.data.data.list,'---')
			            if (res.data.data.list.length < 10) {
			                self.setData({
			                    loadmore: false
			                });
			            }
			
			            if (this.page == 1) {
			                self.setData({
			                    dataList: res.data.data.list
			                });
			            } else {
			                for (var i = 0; i < res.data.data.list.length; i++) {
			                    self.setData({
			                        dataList: [...self.dataList, res.data.data.list[i]]
			                    });
			                }
			            } // self.setData({
			            //   dataList:res.data.data
			            // })
			        }
			    },true);
			},

			//确认完成
			confirm(e) {
				var self = this;
				console.log(e.currentTarget.dataset.id, '--1--1--');

				if (e.currentTarget.dataset.id) {
					uni.showModal({
						title: '提示',
						content: '确认收货吗？',

						success(res) {
							if (res.confirm) {
								app.globalData.util.request({
									url: 'Dmhmarketorder/confirm',
									data: {
										oid: e.currentTarget.dataset.id,
										s_id: uni.getStorageSync('schoolId')
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
				}
			},

			setValue(e) {
				this.setData({
					reason: e.detail.value.replace(/\s+/g, '')
				});
			},

			//确定退款
			confirmRefund() {
				var self = this;

				if (this.reason == '') {
					app.globalData.util.message('请填写理由', '', 'error');
					return;
				}

				app.globalData.util.request({
					url: 'Dmhmarketorder/secondRefund',
					data: {
						oid: self.id,
						s_id: uni.getStorageSync('schoolId'),
						reason: self.reason
					},

					success(res) {
						self.setData({
							page: 1,
							loadmore: true,
							ifName: false,
							reason: ''
						});
						self.dataList = [];
						self.getMylist();
					}
				}, true);
			},

			toDetail(e) {
				uni.navigateTo({
					url: '/gc_school/pages/secondhand/orderdetail?id=' + e.currentTarget.dataset.id
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
		background-color: #FFFFFF;
	}

	/* .cu-bar .action:first-child{
  background-color: #FF6444;
  color: white;
} */
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
		display: flex;
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
		/* overflow: hidden; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* height: 85rpx; */
	}

	.second-left {
		/* display: flex;
  flex-direction: row; */
		width: 100%;
	}

	.price {
		/*    color: #ff2a00;
    font-size: 30rpx;
    font-weight: bold;
    line-height: 50rpx; */
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #F42E2F;
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
		/* flex-direction: column; */
		align-items: center;
		/* justify-content: center; */
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
		padding-left: 10rpx;
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
		font-size: 24rpx !important;
		margin-left: 15rpx;
		/* font-size: 24px; */
		font-family: PingFang SC;
		font-weight: 500;
		color: #323232;
		line-height: 18rpx;
	}

	.button {
		border-radius: 50rpx;
		background: white;
		color: black;
		border: 2rpx solid #cccccc;
		padding: 5rpx 20rpx;
		line-height: 50rpx;
	}

	.bg-orange {
		background-color: #ff6344 !important;
		color: white !important;
		border: 2rpx solid #ff6344;
	}

	.refund {
		background: #e54d42;
		color: white;
		border: none;
	}

	.toast-box {
		width: 100%;
		height: 100%;
		opacity: 1;
		position: fixed;
		top: 0px;
		left: 0px;
	}

	.toastbg {
		opacity: 0.2;
		background-color: black;
		position: absolute;
		width: 100%;
		min-height: 100vh;
	}

	.showToast {
		position: absolute;
		opacity: 1;
		width: 70%;
		margin-left: 15%;
		top: 50%;
		transform: translateY(-50%);
	}

	.toast-title {
		padding-left: 5%;
		background-color: #ff6444;
		color: white;
		padding-top: 2vh;
		padding-bottom: 2vh;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}

	.toast-main {
		padding-top: 2vh;
		padding-bottom: 2vh;
		background-color: white;
		/* text-align: center; */
	}

	.toast-input {
		margin-left: 5%;
		margin-right: 5%;
		border: 1px solid #ddd;
		padding-left: 2vh;
		padding-right: 2vh;
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	.toast-button {
		display: flex;
		line-height: 80rpx;
		text-align: center;
	}

	.button1 {
		width: 50%;
	}

	.button2 {
		width: 50%;
	}

	.button1 view {
		width: 100%;
		background-color: white;
		color: red;
		border-radius: 0px;
		border-bottom-left-radius: 16rpx;
		border-right: 1rpx solid #eee;
	}

	.button2 view {
		width: 100%;
		background-color: white;
		color: black;
		border-radius: 0px;
		border-bottom-right-radius: 16rpx;
	}

	.picker {
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	textarea {
		width: 100%;
		height: 200rpx;
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
		height: 50rpx;
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
</style>
