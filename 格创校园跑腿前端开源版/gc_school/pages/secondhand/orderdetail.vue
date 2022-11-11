<template>
	<block>
		<!-- gc_school/pages/secondhand/orderdetail.wxml -->
		<cu-custom bgColor="bgmain" :isBack="true">
			<view slot="content">订单详情</view>
		</cu-custom>
		<view class="zhuangtai">
			<!-- <view class="paysstate">
				
				{{ data.paystate == 1 ? '待完成' : '已完成' }}
				已付款
			</view> -->
			
			
			<view class="paysstate" v-if="data.paystate == 1">已付款
			</view>
			<view class="paysstate"  v-if="data.paystate == 2">已完成
			</view>
			<view class="paysstate"  v-if="data.paystate == 3">退款中
			</view>
			<view class="paysstate"  v-if="data.paystate == 4">退款完成
			</view>
			
			<view class="paytime">
				支付时间：{{ data.pay_time }}
			</view>
		</view>
		<view>
			<view class="bg-tab">
				<view class="detail_box flex padding-lg">
					<image :src="data.market.image" class="img"></image>
					<view class="justify-between " style="flex-direction: column">
						<view class="pay-title">{{ data.market.title }}</view>
						<view class="flex" style="margin-top: 82rpx;align-items: center;">
							<view class="pay-pay">￥{{data.market.pay}}</view>
							<view class="pay-price">￥{{data.market.price}}</view>
						</view>
						<!-- <view class="text-lg text-right">￥{{data.price}}</view> -->
					</view>
				</view>
			</view>
			<!--    <view class="padding-lg padding-top padding-bottom">
                <view class="flex justify-between margin-top" style="border-top: 1rpx solid #f2f2f2">
                    <view class="text-df margin-top-sm">订单总价：</view>
                    <view class="text-df margin-top text-lg text-bold text-red">￥{{ data.pay }}</view>
                </view>
                <view class="flex justify-between">
                    <view class="text-df margin-top-sm">订单状态：</view>
                    <view class="text-df margin-top text-lg text-bold text-red">{{ data.paystate == 1 ? '待完成' : '已完成' }}</view>
                </view>
            </view> -->
			<view class="bg-tab">
				<view class="detail-center">
					<!-- <view style="width: 100%;" class="flex">
						<view class="number-title">联系人：</view>
						<view class="number-number"> {{ data.market.name }}</view>
					</view> -->
					<view style="width: 100%;" class="flex">
						<view class="number-title">联系电话：</view>
						<view class="number-number"> {{ data.market.phone }}</view>
					</view>
					<view style="width: 100%;" class="flex">
						<view class="number-title">备注信息：</view>
						<view class="number-number" > {{ data.other }}</view>
					</view>
				</view>
			</view>
			<view class="bg-tab">
				<view class="detail-center">
					<view style="width: 100%;" class="flex">
						<view class="number-title">订单编号：</view>
						<view class="number-number"> {{ data.oid }}</view>
					</view>
					<view style="width: 100%;" class="flex">
						<view class="number-title">下单时间：</view>
						<view class="number-number"> {{ data.create_time }}</view>
					</view>
					<view style="width: 100%;" class="flex">
						<view class="number-title">订单金额：</view>
						<view class="number-number" style="color: #FF4C4D;"> ￥{{ data.pay }}</view>
					</view>
				</view>


				<!-- <view style="background: #f2f2f2; height: 30rpx; width: 100%">
					
				</view> -->
				<!-- <view class="padding-lg padding-top-sm detail_box"> -->
				<!-- <view class="text-lg text-bold margin-top">订单信息</view> -->

				<!-- <view class="text-df margin-top-sm">卖家手机号：{{ data.market.phone }}</view>
                <view class="text-df margin-top-sm">订单总价：{{ data.pay }}</view>
                <view class="text-df margin-top-sm">下单时间：{{ data.create_time }}</view>
                <view class="text-df margin-top-sm">联系人姓名：{{ data.name }}</view> -->
				<!-- <view class="text-df margin-top-sm" @tap="makecall">
                    联系人电话：
                    <text class="text-red">{{ data.phone }}</text>
                </view> -->
				<!-- <view class="text-df margin-top-sm">备注：{{ data.other }}</view> -->
				<!-- </view> -->
			</view>
			
		</view>
		<view class="bottom flex">
		  <view class="kefu"  >
			 
			  <image src="../../../static/images/kefus.png" style="width: 57rpx;height: 50rpx;"></image>
			  <view class="kefu-text">客服</view>
			  <button class="btn" open-type="contact" style="background-color: white;height: 70rpx;">
			  
			  </button>
		  </view>
		
		  <view class="kefu">
			  <view class="tuikuan" @click="refund()"  v-if="data.paystate == 1 && uids != data.uid" >
				  申请退款
			  </view>
			  <view class="tuikuan" @click="refund()" v-if="data.paystate == 3 && uids != data.uid" >
			  				  退款中
			  </view>
			  <view class="tuikuan" style="background-color: #FF4C49;" @click="confirm()" v-if="data.paystate == 1 && uids != data.uid">
			  				  确认完成
			  </view>
			  <view class="tuikuan" style="background-color: #FF4C49;"  v-if="data.paystate == 2 && uids != data.uid">
			  				  已完成
			  </view>
			  
			<!--  <view class="paysstate" style="width: 30%;text-align: right;" v-if="data.paystate == 1">已付款
			  </view>
			  <view class="paysstate" style="width: 30%;text-align: right;" v-if="data.paystate == 2">已完成
			  </view>
			  <view class="paysstate" style="width: 30%;text-align: right;" v-if="data.paystate == 3">退款中
			  </view>
			  <view class="paysstate" style="width: 30%;text-align: right;" v-if="data.paystate == 4">退款完成
			  </view> -->
			  
			  
		  </view>
		    <!-- <view class="add-cart sub f16" >
		        <view @tap="makecall" class="add-cart-btn contact" :data-phone="data.phone" :disabled="selfflag">联系卖家</view>
		        <view @tap="toBuy" style="background: #FF4C4D ;" class="add-cart-btn buy" :data-phone="data.phone" :disabled="selfflag">立即购买</view>
		    </view> -->
		</view>
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
	// gc_school/pages/secondhand/orderdetail.js
	var app = getApp();
	export default {
		data() {
			return {
				id: '',
				uids:'',
				data: {
					img: '',
					name: '',
					price: '',
					status: 0,
					addtime: '',
					linkman: '',
					phone: '',
					ids:'',
					remark: ''
				},
				ifName: false,
				reason: '',
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function(options) {
			this.setData({
				id: options.id,
				ids:options.id,
			}); 
			this.getDetail();
			this.getUids();
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
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			//申请退款按钮
			refund(e) {
				// console.log(e.currentTarget.dataset.id);
				this.setData({
					ifName: true,
					id: this.data.oid
				});
			},
			getDetail() {
				var self = this;
				app.globalData.util.request({
					url: 'Dmhmarketorder/details',
					data: {
						id: self.ids,
					},

					success(res) {
						console.log(res.data.data);
						self.setData({
							data: res.data.data
						});
					}
				}, true);
			},
			setValue(e) {
				this.setData({
					reason: e.detail.value.replace(/\s+/g, '')
				});
			},
			getUids() {
				var self = this;
				app.globalData.util.request({
			  url: 'Dmhmarketgoods/uids',
					data: {},
			
					success(res) {
			 		console.log(res.data.data);
			  	self.setData({
							uids: res.data.data.uids,
							// rotation:JSON.parse(res.data.data.rotation),
						});
					}
				}, true);
			},
			//确认完成
			confirm(e) {
				var self = this;
				// console.log(e.currentTarget.dataset.id, '--1--1--');
			
				if (self.data.oid) {
					uni.showModal({
						title: '提示',
						content: '确认收货吗？',
			
						success(res) {
							if (res.confirm) {
								app.globalData.util.request({
									url: 'Dmhmarketorder/confirm',
									data: {
										oid: self.data.oid,
										s_id: uni.getStorageSync('schoolId')
									},
			
									success(res) {
										self.setData({
											page: 1,
											loadmore: true
										});
										self.data = [];
										self.getDetail();
										// self.data = []
									}
								}, true);
							}
						}
					});
				}
			},
			cancel() {
				this.setData({
					ifName: false,
					reason: ''
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
						self.data = [];
						self.getDetail();
					}
				}, true);
			},
			makecall() {
				uni.makePhoneCall({
					phoneNumber: this.data.phone,

					success() {},

					fail() {
						console.log('取消拨打');
					}
				});
			}
		}
	};
</script>
<style>
	/* gc_school/pages/secondhand/orderdetail.wxss */
	page {
		background-color: rgb(241, 241, 241) !important;
		/* background-color: */
	}

	.bgmain {
		/* background-color: #0000; */
		background-color: rgb(241, 241, 241) !important;
		color: #121212;
	}

	.img {
		width: 180rpx;
		height: 180rpx;
		border-radius: 20rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.detail_box {
		/* background-color: white; */
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 28rpx 28rpx;
	}

	.zhuangtai {
		padding: 0 30rpx;
	}

	.paysstate {
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #232323;
		line-height: 70rpx;
	}

	.paytime {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 70rpx;
	}

	.bg-tab {
		padding: 28rpx 28rpx;
		/* background: #FFFFFF; */
		/* border-radius: 20rpx; */
	}

	.pay-pay {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #F42E2F;
		vertical-align: bottom;
		/* margin-top: 82rpx; */
	}

	.pay-title {
		overflow: hidden;

		text-overflow: ellipsis;

		white-space: nowrap;
		width: 289rpx;
		/* height: 29rpx; */
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #141414;
		line-height: 44rpx;
	}

	.pay-price {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-decoration: line-through;
		color: #999999;
	}

	.number-title {
		width: 40%;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #232323;
		line-height: 90rpx;
		/* float: left; */
		text-align: left;
	}

	.number-number {
		width: 60%;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 90rpx;
		/* float: right; */
		text-align: right;
	}

	.detail-center {
		padding: 28rpx 28rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.bottom {
	    width: 100%;
	    background: #fff;
	    opacity: 1;
	    position: fixed;
	    left: 0rpx;
	    bottom: 0rpx;
	    display: flex;
	    /* padding: 10rpx; */
	    border-top: 1rpx solid #eee;
	    align-items: center;
	    box-sizing: border-box;
	    z-index: 8;
	    height: 100rpx;
	    justify-content: space-between;
	}
	.bottom_left {
	    display: flex;
	    width: 50%;
	}
	.t_card {
	    position: relative;
	    width: 20%;
	    height: 100rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    box-sizing: border-box;
	    margin-left: 30rpx;
	}
	
	.t_card image {
	    width: 60rpx;
	    height: 80rpx;
	    /* padding-top: 10rpx; */
	}
	
	.t_card text {
	    display: flex;
	    align-items: flex-start;
	    justify-content: center;
	    height: calc(100% - 45rpx);
	    width: 100%;
	    font-size: 24rpx;
	    text-align: center;
	    white-space: nowrap;
	    padding-top: 5rpx;
	    color: DimGray;
	}
	.add-cart-btn {
	    width: 100%;
	    height: 84rpx;
	    margin-top: 8rpx;
	    background: #222222;
	    /* background: #FF6444; */
	    color: white;
	    letter-spacing: 4rpx;
	    font-size: 30rpx;
	    /* border-radius: 35rpx; */
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	.contact {
	    border-top-left-radius: 40rpx;
	    border-bottom-left-radius: 40rpx;
	}
	.buy {
	    border-top-right-radius: 40rpx;
	    border-bottom-right-radius: 40rpx;
	}
	.add-cart {
	    width: 55%;
	    height: 100%;
	    display: flex;
	    /* padding-left: 30px;
	  justify-content: center;
	  align-items: center;
	  box-sizing: border-box; */
	}
	
	.add-cart-btn {
	    width: 100%;
	    height: 84rpx;
	    margin-top: 8rpx;
	    background: #222222;
	    /* background: #FF6444; */
	    color: white;
	    letter-spacing: 4rpx;
	    font-size: 30rpx;
	    /* border-radius: 35rpx; */
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	.flex > .sub {
	    -webkit-box-flex: 1;
	    flex: 1;
	    overflow: hidden;
	}
	.kefu{
		/* margin-top: 33rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}
	.kefu-text{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #232323;
		line-height: 70rpx;
		margin-left: 15rpx;
	}
	.tuikuan{
		width: 255rpx;
		height: 80rpx;
		background: #111111;
		box-shadow: 0rpx 2tpx 4tpx 0px rgba(0, 0, 0, 0.07);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 14rpx;
		
	}
	.kefu{
		position: relative;
		
	}
	.btn {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0rpx;
		opacity: 0;
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
	
</style>
