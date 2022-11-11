<template>
	<view>
		<view class='order-details'>
			<!-- 给header上与data上加on为退款订单-->
			<view class='header bg-color acea-row row-middle'>
				<view class='pictrue'>
					<!-- <image :src="'https://www.uu6s.com/static/order_1.gif'"></image> -->
					<u-icon name="clock" size="100" color="rgba(0, 0, 0, 0.4)"></u-icon>
				</view>
				<view class='data'>
					<view class='state'>请在<u-count-down :timestamp="timestamp" @end="endTime"></u-count-down>内完成支付!</view>
					<view>{{orderInfo.add_time_y}}<text class='time'>{{orderInfo.create_time}}</text></view>
				</view>
			</view>
			<!-- 店铺商品列表 -->
			<view class="order-wrapper" v-for="(item,index) in orderInfo.orderList" :key="index">
				<view class="title" @click="goStore(item)">
					{{item.merchant.mer_name}}
					<u-icon name="arrow-right" size="24" color="#666"></u-icon>
				</view>
				<view class="goods-box">
					<view class="item" v-for="(goods,j) in item.orderProduct" :key="goods.order_product_id" @click="goProduct(goods)">
						<image :src="goods.cart_info.product.image"></image>
						<view class="info-box">
							<view class="name line1">{{goods.cart_info.product.store_name}}</view>
							<view class="msg">{{goods.cart_info.productAttr.sku}}</view>
							<view class="price">￥{{goods.cart_info.productAttr.price}}</view>
						</view>
						<view class="num">x{{goods.product_num}}</view>
					</view>
				</view>
				<view class="goodCall" @click="goGoodCall">
					<u-icon name="kefu-ermai" size="32" label="联系客服"></u-icon>
				</view>
			</view>

			<view class='wrapper'>
				<view class='item acea-row row-between'>
					<view>订单编号：</view>
					<view class='conter acea-row row-middle row-right'>{{orderInfo.group_order_sn}}
						<!-- #ifndef H5 -->
						<text class='copy' @tap='copy'>复制</text>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<text class='copy copy-data' :data-clipboard-text="orderInfo.group_order_sn">复制</text>
						<!-- #endif -->
					</view>
				</view>
				<view class='item acea-row row-between'>
					<view>下单时间：</view>
					<view class='conter'>{{orderInfo.create_time || 0}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付状态：</view>
					<view class='conter'>未支付</view>
				</view>
				<view class='item acea-row row-between'>
					<view>商品总额：</view>
					<view class='conter'>￥{{orderInfo.total_price}}</view>
				</view>
				<!-- <view class='item acea-row row-between'>
					<view>支付方式：</view>
					<view class='conter'>{{orderInfo._status._payType}}</view>
				</view> -->
			</view>
			<view class='wrapper'>
				<view class='item acea-row row-between' v-if="orderInfo.pay_postage > 0">
					<view>运费：</view>
					<view class='conter'>+￥{{orderInfo.pay_postage}}</view>
				</view>
				<view class='item acea-row row-between' v-if='orderInfo.coupon_price>0'>
					<view>优惠券抵扣：</view>
					<view class='conter'>-￥{{orderInfo.coupon_price}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
				<!-- <view class='actualPay acea-row row-right'>实付款：<text class='money font-color'>￥{{orderInfo.pay_price}}</text></view> -->
			</view>
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-right row-middle'>
				<view class="bnt cancel" @click.stop="cancelOrder">取消订单</view>
				<view class='bnt bg-color' @tap='pay_open(orderInfo.order_id)'>立即付款</view>
			</view>
		</view>
		<!-- 选择支付 -->
		<u-popup v-model="showPayType" mode="bottom" length="36%" border-radius="20" closeable>
			<view>
				<view class="paytype-title">
					<text>选择支付方式</text>
				</view>
				<view class="">
					<u-cell-group>
						<u-cell-item icon="weixin-circle-fill" title="微信支付" icon-size="60" :icon-style="{color: 'green'}" label="微信快捷支付"
						 @click="onPaySubmit('routine')">
						</u-cell-item>
						<u-cell-item icon="rmb-circle-fill" title="余额支付" icon-size="60" :icon-style="{color: '#f29100'}" @click="onPaySubmit('balance')">
							<view class="" slot="label">
								<text>可用余额：<text class="orange-m">¥{{ userInfo.now_money }}</text></text>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<style scoped lang="scss">
	.goodCall {
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #f0f0f0;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		color: #282828;

		.icon-kefu {
			font-size: 32rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(0, 0, 0, 0.4) !important;
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 7rpx;
	}

	.order-details .header .data .time {
		margin-left: 10rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color: #e93323;
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 17rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;

	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-details .footer .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1rpx solid #ddd;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin-top: 24rpx;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}

	.order-wrapper {
		margin-top: 15rpx;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			height: 86rpx;
			padding: 0 30rpx;
			border-bottom: 1px solid #f0f0f0;

			.iconfont {
				font-size: 24rpx;
				color: #666;
				margin-top: 6rpx;
				margin-left: 5rpx;
			}
		}

		.goods-box {
			padding-left: 30rpx;

			.item {
				display: flex;
				padding: 25rpx 30rpx 25rpx 0;

				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 16rpx;
				}

				.info-box {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 25rpx;
					width: 450rpx;

					.msg {
						color: #868686;
						font-size: 20rpx;
					}

					.price {
						font-size: 26rpx;
						color: red;
					}
				}

				.num {
					flex: 1;
					text-align: right;
					font-size: 26rpx;
					color: #868686;
				}
			}
		}
	}
</style>

<script>
	let app = getApp();
	// import { HTTP_REQUEST_URL } from '@/config/app';
	// import {
	// 	groupOrderDetail,
	// 	orderAgain,
	// 	orderTake,
	// 	orderDel,
	// 	unOrderCancel
	// } from '@/api/order.js';
	// import {
	// 	openOrderRefundSubscribe
	// } from '@/utils/SubscribeMessage.js';
	// import {
	// 	getUserInfo
	// } from '@/api/user.js';
	// import payment from '@/components/payment';
	// import orderGoods from "@/components/orderGoods";
	// import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	// import {
	// 	toLogin
	// } from '@/libs/login.js';
	// import {
	// 	mapGetters
	// } from "vuex";
	// // #ifdef MP
	// import authorize from '@/components/Authorize';
	// // #endif
	export default {
		components: {},
		data() {
			return {
				order_id: '',
				evaluate: 0,
				cartInfo: [], //购物车产品
				orderInfo: {
					system_store: {},
					_status: {}
				}, //订单详情
				system_store: {},
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					{
						name: "余额支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用余额:',
						number: 0,
						payStatus: app.globalData.yue_pay_status
					},
				],
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				showPayType: false,
				payId: ''
			};
		},
		computed: {
			timestamp() {
				let now = Date.now()
				let year = new Date().getFullYear()
				let sus = new Date((year + '-' + this.orderInfo.cancel_time).replace(/-/g, '/')).getTime()
				console.log(sus, now, sus - now)
				if (now && sus && sus - now > 0) {
					return (sus - now) / 1000
				} else {
					return 0
				}
			},
			userInfo() {
				return this.$store.state.userInfo
			},
			hasLogin() {
				return this.$store.state.hasLogin
			}
		},
		onLoad(options) {
			this.order_id = options.id
			this.getOrderInfo()
		},
		onShow() {},
		methods: {
			endTime() {
				uni.navigateBack()
			},
			onPaySubmit(pay) {
				this.$u.post(`/api/order/pay/${this.payId}`, {
					type: pay
				}).then((res) => {
					if (pay != 'routine') {
						this.showPayType = false
						uni.showToast({
							title: res.message
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						let config = res.data.result.config
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: config.timestamp,
							nonceStr: config.nonceStr,
							package: config.package,
							signType: config.signType,
							paySign: config.paySign,
							success: () => {
								uni.showToast({
									title: '支付成功'
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							},
							fail: () => {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			// 去店铺
			goStore(item) {
				this.$u.route({
					url: 'pages/goods/store',
					params: {
						id: item.merchant.mer_id
					}
				})
			},
			// 商品详情
			goProduct(goods) {
				this.$u.route({
					url: 'pages/goods/details',
					params: {
						id: goods.product_id
					}
				})
			},
			goGoodCall() {
				this.$u.route({
					url: 'pages/user/contact'
				})
				// let self = this
				// uni.navigateTo({
				// 	url: `/pages/chat/customer_list/index?orderId=${self.order_id}`
				// })
			},

			/**
			 * 事件回调
			 * 
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.system_store.phone
				})
			},

			/**
			 * 关闭支付组件
			 * 
			 */
			payClose: function() {
				this.showPayType = false;
			},
			/**
			 * 打开支付组件
			 * 
			 */
			pay_open: function() {
				this.payId = this.orderInfo.group_order_id
				this.showPayType = true
			},
			/**
			 * 获取用户信息
			 * 
			 */
			getUserInfo: function() {
				let that = this;
				this.$u.get('/api/user').then(res => {
					that.payMode[1].number = res.data.now_money;
					that.$set(that, 'payMode', that.payMode);
				})
			},
			/**
			 * 获取订单详细信息
			 * 
			 */
			getOrderInfo: function() {
				let that = this;
				uni.showLoading({
					title: "正在加载中"
				});
				this.$u.get(`/api/order/group_order_detail/${this.order_id}`)
					.then(res => {
						let _type = 0;
						uni.hideLoading();
						that.$set(that, 'orderInfo', res.data);
					}).catch(err => {
						console.log(err)
						uni.hideLoading();
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					});
			},
			/**
			 * 
			 * 剪切订单号
			 */
			// #ifndef H5
			copy() {
				uni.setClipboardData({
					data: this.orderInfo.order_id,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					},
					fail: () => {
						uni.showToast({
							title: '复制失败'
						})
					}
				});
			},
			// #endif
			// 取消订单
			cancelOrder() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认取消该订单?',
					success: function(res) {
						if (res.confirm) {
							self.$u.post(`/api/order/cancel/${self.order_id}`)
								.then((data) => {
									uni.showToast({
										title: data.message,
										icon: 'none'
									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1500)
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}

	.bg-color {
		background-color: #ffdd00 !important;
		color: #333 !important;
	}

	.acea-row {
		display: flex;
		flex-wrap: wrap;
	}

	.acea-row.row-middle {
		align-items: center;
	}

	.acea-row.row-between {
		justify-content: space-between;
	}

	.acea-row.row-right {
		justify-content: flex-end;
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-wrapper {
		margin-top: 14rpx;
		background-color: #fff;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 16rpx;
		border: 1rpx solid #666;
		padding: 2rpx 14rpx;
		margin-left: 24rpx;
	}

	.order-details .nav .progress {
		padding: 0 64rpx;
		margin-top: 10rpx;
	}

	.font-color,
	.font-color-red {
		color: #fc4141 !important;
	}

	.paytype-title {
		position: relative;
		text-align: center;
		padding: 26rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
