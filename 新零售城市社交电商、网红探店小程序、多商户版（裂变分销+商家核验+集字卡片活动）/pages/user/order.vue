<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<!-- <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" 
          swiperWidth="750"></u-tabs-swiper> -->
				<!-- <u-tabs activeColor="#f29100" ref="tabs" :list="list" :current="current" 
          @change="change" :is-scroll="false" swiperWidth="750"></u-tabs> -->
				<view class="tabs-list">
					<view class="tabs-item" v-for="(item, index) in list" :key="index" :class="[current == index ? 'active' : '']"
					 @click="change(index)">
						{{ item.name }}
					</view>
				</view>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in orderList" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" :refresher-enabled="true" :refresher-triggered="startRefresh"
					 @refresherrefresh="onRefresh" @scrolltolower="onBottom">
						<view class="page-box" v-if="item.length || loadStatus[index] != 'nomore'">
							<view class="order" v-for="(info, idx) in item" :key="idx">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store" 
										@click="toRoute({
											  url: 'pages/goods/store',
											  params: {
												id: info.merchant.mer_id
											  }})">
											{{ info.merchant.mer_name }}
										</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">
										{{ info.paid ==1 ? info.status == -1 ? '已退款' : payText[info.status] : '待付款' }}
									</view>
								</view>
								<view class="item" v-for="(ig, nx) in (info.orderProduct || info.orderList[0].orderProduct)" :key="index"
								 @click="toRoute({
                    url: info.paid == 0 ? 'pages/order/payDetails' : 'pages/order/details',
                    params: {
                      id: info.order_id || info.group_order_id
                    }
                  })">
									<view class="left">
										<image :src="ig.cart_info.product.image" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">
											{{ ig.cart_info.product.store_name }}
										</view>
										<view class="delivery-time" v-if="!ig.is_refund">支付时间 {{ info.pay_time || '未支付' }}</view>
										<view class="delivery-time red" v-else-if="info.status != -1">退款中</view>
									</view>
									<!-- <view class="right">
				    				<view class="price">
				    					￥{{ ig.cart_info.product_price }}
				    					<text class="decimal">.{{ ig.cart_info.product_price }}</text>
				    				</view>
				    				<view class="number">x{{ ig.cart_info.product_num }}</view>
				    			</view> -->
								</view>
								<view class="total">
									共{{ info.total_num }}件商品 合计:
									<text class="total-price">
										￥{{ info.pay_price }}
									</text>
								</view>
								<view class="bottom">
									<template v-if="info.status == 0 	&& info.paid ==1">
										<view class="logistics btn" v-if="!info.orderProduct[0].is_refund" @click="toRoute({
                        url: 'pages/order/refund',
                        params: {
                          order_id: info.order_id,
                          type: info.order_type,
                          ids: info.order_id,
                          refund_type: 1
                        }
                      })">申请退款</view>
										<view class="logistics btn" v-if="!info.orderProduct[0].is_refund" @click="toRoute({
                        url: 'pages/order/qrcode',
                        params: {
                          id: info.order_id
                        }
                      })">查看券码</view>
									</template>
									<template v-if="info.status == 1">
										<view class="evaluate btn" @click="onConfirmPay(info.group_order_id)">确认收货</view>
									</template>
									<template v-if=" info.paid ==0">
										<view class="logistics btn" @click="onCancel(info.group_order_id)">取消订单</view>
										<view class="evaluate-fill btn" @click="onPay(info.group_order_id)">立即付款</view>
									</template>
									<view class="logistics btn" v-if="info.status == 2" @click="toRoute({
                      url: 'pages/goods/details',
                      params: {
                        id: info.order_id
                      }
                    })">再来一单</view>
									<view class="evaluate btn" v-if="info.status == 2" @click="toRoute({
                      url: 'pages/order/comment',
                      params: {
                        uni:info.order_id,
                        order_id: info.order_id
                      }
                    })">评价</view>
								</view>
							</view>
							<view class="u-padding-40">
								<u-loadmore :status="loadStatus[index]" bgColor="#f2f2f2"></u-loadmore>
							</view>
						</view>
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn" @click="toRoute({
                    url: 'pages/index/index',
                    type: 'tab'
                  })">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
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

<script>
	export default {
		data() {
			return {
				showPayType: false,
				orderList: [
					[],
					[],
					[],
					[],
					[]
				],
				list: [{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待消费'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
				pageList: [1, 1, 1, 1, 1],
				limit: 10,
				payText: ['待消费', '待收货', '待评价', '已完成'],
				payId: 0,
				startRefresh: false,
				init: true,
				initload: false,
				initFlag: false
			};
		},
		onLoad(options) {
			this.initload = true
			if (options.type != 0) {
				this.current = options.type
				this.swiperCurrent = options.type
				this.initFlag = true
				this.getOrderList(this.current)
			} else {
				this.initload = false
				// this.getOrderList(this.current)
			}
		},
		onShow() {
			this.loadStatus[this.current] = 'loadmore'
			this.orderList[this.current] = []
			this.pageList[this.current] = 1
			if (!this.initload) {
				this.getOrderList(this.current)
			} else {
				this.initload = false
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			onBottom() {
				this.getOrderList(this.current)
			},
			onRefresh() {
				this.startRefresh = true
				this.loadStatus[this.current] = 'loadmore'
				this.orderList[this.current] = []
				this.pageList[this.current] = 1
				this.getOrderList(this.current)
			},
			onCancel(id) {
				uni.showModal({
					title: '确认取消该订单?',
					success: (res) => {
						if (res.confirm) {
							this.$u.post(`/api/order/cancel/${id}`)
								.then((res) => {
									uni.showToast({
										title: res.message
									})
									this.resetGetList()
								})
						}
					}
				})
			},
			onConfirmPay(id) {
				this.$u.post(`/api/order/take/${id}`)
					.then((res) => {
						uni.showToast({
							title: res.message
						})
						this.resetGetList()
					})
			},
			onPay(id) {
				this.payId = id
				this.showPayType = true
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
							this.resetGetList()
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
								setTimeout(() => {
									this.resetGetList()
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
			resetGetList() {
				this.loadStatus[this.current] = 'loadmore'
				this.orderList[this.current] = []
				this.pageList[this.current] = 1
				this.getOrderList(this.current)
			},
			toRoute(params) {
				this.$u.route(params)
			},
			// 页面数据
			getOrderList(idx) {
				this.init = false
				if (this.loadStatus[idx] == 'loadmore') {
					this.loadStatus.splice(idx, 1, 'loading')
					let url = '/api/order/list'
					let params = {}

					params.status = idx

					//    if (idx == 1) {
					//     url = '/api/order/group_order_list'
					//   } else {
					//   url = '/api/order/list'
					//  }

					this.$u.get(url, {
						page: this.pageList[idx]++,
						limit: this.limit,
						...params
					}).then(({
						data
					}) => {
						this.orderList[idx] = this.orderList[idx].concat(data.list)
						if (data.list.length < this.limit) {
							this.loadStatus.splice(idx, 1, 'nomore')
						} else {
							this.loadStatus.splice(idx, 1, 'loadmore')
						}
						if (this.startRefresh) {
							this.startRefresh = false
							// uni.stopPullDownRefresh()
						}
					})
				}
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item = item || []
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item = item || []
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.current = index
				this.swiperCurrent = index;
				if (!this.orderList[index].length) {
					this.loadStatus[index] = 'loadmore'
					this.pageList[index] = 1
				}
				// this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				try {
					// this.$refs.tabs.setDx(dx);
				} catch (e) {
					//TODO handle the exception
					// console.log('error', e)
				}
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				if (this.initFlag) {
					this.initFlag = false
					return null
				}
				// this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if (!this.orderList[current].length) {
					this.loadStatus[current] = 'loadmore'
					this.pageList[current] = 1
				}
				this.getOrderList(current);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;

					&.red {
						color: red;
					}
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: flex-end;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
				margin-left: $gutter;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}

			.evaluate-fill {
				color: #fff;
				border-color: $u-type-warning-dark;
				background-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.paytype-title {
		position: relative;
		text-align: center;
		padding: 26rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}

	.orange-m {
		color: #f29100;
	}

	.tabs-list {
		position: relative;
		display: flex;
		justify-content: space-between;
		background-color: #fff;

		.tabs-item {
			padding: 10rpx;
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 60rpx;
				margin-left: -30rpx;
				height: 6rpx;
				background-color: #f29100;
				transition: all 0.3s;
				opacity: 0;
			}

			&.active {
				color: #f29100;
				font-weight: bold;

				&::after {
					opacity: 1;
				}
			}
		}
	}
</style>
