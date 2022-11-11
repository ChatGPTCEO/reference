<template>
	<view>
		<view class="topbg"></view>
		<view class="shop-info">
			<advance-item :src="info.image" :title="info.store_name" :price="infoAttr.price"
				:old-price="infoAttr.ot_price" :show-label="false" :show-btn="false">
				<view class="f-label u-line-1" slot="label">
					<text class="text">{{ sku }}</text>
				</view>
				<view class="">
					<u-number-box v-model="nums" :min="1" :max="100" size="20" disabled-input input-width="60"
						@change="changeNums">
					</u-number-box>
				</view>
			</advance-item>
			<view class="u-margin-top-20">
				<u-cell-group :border="false">
					<u-cell-item title="选择优惠券" :value="useCouponText" padding="20rpx 0" :border-bottom="false"
						@click="showSeltCoupon = true">
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="cellbox" v-if="mer_status">
				<text>积分抵扣</text>
				<u-checkbox-group>
					<u-checkbox active-color="#FFDD00" @change="checkboxChange" v-model="is_checked" shape="circle">
						{{integral_title}}</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="cellbox">
				<text>实付</text>
				<text class="amount">¥{{ totalPrice }}</text>
			</view>
		</view>
		<template v-if="userInfo.group_id < 1">
			<view class="join-vip">
				<u-icon name="/static/icon/index_icon_rank_0.png" size="28" label-size="20" label-color="#fadbad">
				</u-icon>
				<text class="text">加入会员，立享优惠</text>
				<view class="ml-auto" @click="toRoute({
          url: 'pages/member/member',
          type: 'tab'
        })">
					<text class="text">立即加入</text>
					<u-icon name="arrow-right" color="#fadbad"></u-icon>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="join-vip" v-if="info.price - info.vip_price > 0">
				<u-icon name="/static/icon/index_icon_rank_0.png" size="28"></u-icon>
				<text class="text">您已经是VIP会员，本单享受会员价</text>
			</view>
		</template>
		<view class="msg-phone">
			<u-cell-group :border="false">
				<u-cell-item title="手机号码" :arrow="false" hover-class="none" :value-style="customStyle"
					:title-style="customStyle">
					<u-input v-model="phone" input-align="right" placeholder="请输入手机号" :clearable="false"></u-input>
				</u-cell-item>
			</u-cell-group>
			<view class="bak-box">
				<u-input v-model="bak" placeholder="备注留言"></u-input>
			</view>
		</view>
		<view class="msg-phone">
			<u-cell-group :border="false">
				<u-cell-item title="支付方式" center :value-style="customStyle" :title-style="customStyle"
					@click="showPay = true">
					<view class="" v-if="payType == 'routine'">
						<u-icon name="weixin-circle-fill" color="#41b035" size="58" label="微信支付"></u-icon>
					</view>
					<view class="" v-else-if="payType == 'balance'">
						<u-icon name="rmb-circle-fill" color="#fe960f" size="58" label="余额支付"></u-icon>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<!-- <button type="default" @click="openMsg()">调试</button> -->
		<!-- show Coupon -->
		<u-popup v-model="showSeltCoupon" mode="bottom" length="54%" border-radius="20" safe-area-inset-bottom closeable
			@open="openCoupon">
			<view class="" style="height: 100%;">
				<view class="coupon-title">
					<text>选择优惠券</text>
				</view>
				<scroll-view scroll-y="true" style="height:calc(100% - 196rpx)">
					<template v-if="couponList.length">
						<view class="cliitems" v-for="(item, index) in couponList" :key="index"
							@click="onUseCoupon(item)">
							<coupon-item :amount="item.coupon_price" :label="`满${item.use_min_price}可用`"
								:rule-text="`${item.start_time} 至 ${item.end_time}可用`" :title="item.coupon_title"
								:type-text="typeText[item.coupon.type]" :show-btn="false" :checkbox="item.checked">
							</coupon-item>
						</view>
					</template>
					<template v-else>
						<view class="u-padding-top-30">
							<u-empty text="暂无可用优惠券" mode="coupon"></u-empty>
						</view>
					</template>
				</scroll-view>
				<view class="coupon-oper">
					<view class="textbox">
						<text>已选择{{ seltCoupon.nums }}张，可优惠
							<text class="red">¥{{ seltCoupon.amount }}</text>
						</text>
					</view>
					<view class="">
						<u-button type="warning" shape="circle" size="medium" :custom-style="{
                color: '#333',
                width: '100%'
              }" ripple style="width: 100%" @click="onConfrimCoupon">
							确定
						</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- select pay -->
		<u-select v-model="showPay" :list="payList" @confirm="onSeltPay"></u-select>
		<!-- submit -->
		<view class="navigation-bar">
			<view class="navigation">
				<view class="left">
					<text class="text">合计:<text class="amount">¥{{ totalPrice }}</text></text>
				</view>
				<view class="right">
					<u-button type="warning" shape="circle" size="medium" :custom-style="{
              color: '#333',
              width: '100%'
            }" :enabled="canClick" ripple style="width: 100%"
						@click="payType != 'routine' ? onConfirm() : onPayment()">
						立即支付
					</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				merid: null,
				is_checked: false,
				mer_status: null, //商家积分配置是否开启
				integral: 0,
				integral_title: 0,
				rate: 0, //积分抵扣率
				typeText: ['店铺券', '商品券', '品类券'],
				payList: [{
						value: 'routine',
						label: '微信支付'
					},
					{
						value: 'balance',
						label: '余额支付'
					}
				],
				showSeltCoupon: false,
				showPay: false,
				info: {},
				infoAttr: {
					vip_price: 0,
					price: 0
				},
				customStyle: {
					fontSize: '32rpx',
					color: '#333'
				},
				canClick: true,
				nums: 1,
				bak: '',
				phone: '',
				id: 0,
				payType: 'routine',
				cartId: 0,
				couponList: [],
				useCouponText: '选择优惠券',
				couponAmount: 0,
				useCouponId: [],
				useShopCouponId: [],
				orderInfo: {},
				templateid: []
			};
		},
		computed: {
			seltCoupon() {
				let nums = 0
				let amount = 0
				let len = this.couponList.length
				for (let i = 0; i < len; i++) {
					let item = this.couponList[i]
					if (item.checked) {
						nums++
						amount += Number(item.coupon_price)
					}
				}
				return {
					nums: nums,
					amount: amount
				}
			},
			totalPrice() {
				let uPrice = (this.userInfo.group_id < 1 ? this.infoAttr.price : this.infoAttr.vip_price) || this.infoAttr
					.price
				let sPrice = Number(uPrice * this.nums - this.couponAmount)
				if (sPrice < 0) sPrice = 0;
				if (!sPrice)
					return 0;
				if (this.is_checked == true) {
					sPrice = Number(uPrice - this.computeRate)
				} else {
					return sPrice;
				}
				return sPrice.toFixed(2)
			},
			computeRate() {
				let iPrice = this.integral * (this.rate / 100)
				return iPrice.toFixed(2)
			},
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onLoad(options) {
			this.id = options.id
			this.unique = options.unique
			this.nums = Number(options.nums)
			this.sku = options.sku
			this.phone = this.userInfo.phone || uni.getStorageSync('setPhone') || ''
			this.createOrder()
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				this.is_checked = e.value
				if (e.value == true) {
					this.integral_title = "可以扣" + this.computeRate + "元"
				} else {
					this.integral_title = "当前有" + this.integral + "积分"
				}
			},
			changeNums() {
				//console.log(1)
				this.createOrder()
			},
			openCoupon() {
				let len = this.couponList.length
				for (let i = 0; i < len; i++) {
					let item = this.couponList[i]
					switch (item.coupon.type) {
						case 0:
							item.checked = this.useCouponId.includes(item.coupon_user_id)
							break;
						case 1:
							item.checked = this.useShopCouponId.includes(item.coupon_user_id)
							break;
					}
				}
			},
			onConfrimCoupon() {
				this.calcCoupon()
				this.showSeltCoupon = false
			},
			onUseCoupon(item) {
				item.checked = !item.checked
			},
			onSeltPay(e) {
				this.payType = e[0].value
			},
			calcCoupon() {
				this.couponAmount = 0
				this.useCouponId = []
				this.useShopCouponId = []
				let len = this.couponList.length
				for (let i = 0; i < len; i++) {
					let item = this.couponList[i]
					if (item.checked) {
						this.couponAmount += Number(item.coupon_price)
						switch (item.coupon.type) {
							case 0:
								this.useCouponId.push(item.coupon_user_id)
								break;
							case 1:
								this.useShopCouponId.push(item.coupon_user_id)
								break;
						}
					}
				}
				if (this.couponAmount) {
					this.useCouponText = '已优惠¥' + this.couponAmount.toFixed(2)
				} else {
					this.useCouponText = '选择优惠券'
				}
			},
			getInfo() {
				this.$u.post('/api/order/check', {
					address_id: 0,
					cart_id: [this.cartId]
				}).then(({
					data
				}) => {
					try {
						let merid = data.order[0].mer_id
						this.info = data.order[0].list[0].product
						this.infoAttr = data.order[0].list[0].productAttr
						this.couponList = data.order[0].coupon
						this.orderInfo = data.order[0]
						if (this.couponList.length) {} else {
							this.useCouponText = '暂无优惠券'
						}
						this.calcCoupon()
						this.MerIntegralConfig(merid)
					} catch (e) {}
				})
			},
			//获取商户积分配置
			MerIntegralConfig(merid) {
				this.$u.post('/api/mer/intConfig', {
					userid: this.userInfo.uid,
					merid: merid
				}).then(res => {
					let data = res.data
					this.rate = data.rate
					this.mer_status = data.mer_status
					this.integral = data.integral
					this.integral_title = "当前有" + data.integral + "积分"
				})
			},
			createOrder() {
				this.$u.post('/api/user/cart/create', {
					cart_num: this.nums,
					is_new: 1,
					product_attr_unique: this.unique,
					product_id: this.id
				}).then(({
					data
				}) => {
					this.cartId = data.cart_id
					this.getInfo()
				}).catch(() => {
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				})
			},
			// 开启订阅消息
			openMsg() {
				var that = this

				// 获取用户的当前设置，判断是否点击了“总是保持以上，不在询问”
				wx.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(res) {
						if (res.authSetting['scope.subscribeMessage']) { //用户点击了“总是保持以上，不再询问”
							// uni.openSetting({ // 打开设置页
							// 	success(res) {
							// 		//console.log(res.authSetting)
							// 	}
							// });
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							//var templateid = that.setting.templateid.map(item => item.tempid)

							that.$u.get('/api/template/list').then(res => {
								res.data.list.forEach(function(item, index, arr) {
									that.templateid.push(arr[index].tempid)
									//console.log('item', that.templateid)
								});

								uni.requestSubscribeMessage({
									tmplIds: that.templateid,
									success(res) {
										console.log(res)

										setTimeout(() => {
											that.$u.route({
												url: 'pages/user/order',
												params: {
													type: 0
												},
												type: 'redirectTo'
											})
										}, )

									},
									fail: (res) => {
										console.log(res)

										setTimeout(() => {
											that.$u.route({
												url: 'pages/user/order',
												params: {
													type: 0
												},
												type: 'redirectTo'
											})
										}, )
									}
								})

							});

						}
					}
				})
			},
			onConfirm() {
				uni.showModal({
					showCancel: true,
					title: '是否确认使用余额支付?',
					success: (e) => {
						if (e.confirm) {
							this.onPayment()
						}
					}
				})
			},
			onPayment() {
				uni.setStorage({
					key: 'setPhone',
					data: this.phone
				})
				this.$u.post('/api/order/createVirtualOrder', {
					phone: this.phone,
					// address_id: 0,
					cart_id: [this.cartId],
					coupon: {
						[this.orderInfo.mer_id]: {
							product: {
								[this.id]: this.useShopCouponId[0]
							},
							store: this.useCouponId[0] || ''
						}
					},
					take: [],
					mark: {
						[this.orderInfo.mer_id]: this.bak
					},
					pay_type: this.payType,
					is_integral: this.is_checked
				}).then((res) => {
					if (res.status == 200) {
						if (this.payType != 'routine') {
							uni.showToast({
								title: res.message
							})
							this.canClick = false;
							this.openMsg();
						} else {

							if (this.totalPrice == 0) {
								uni.showToast({
									title: '支付成功'
								})

								this.openMsg();
								this.canClick = false;
								return;
							}

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
									this.canClick = false;
									this.openMsg();

								},
								fail: (e) => {
									uni.showToast({
										title: '支付失败',
										icon: 'none'
									})
									setTimeout(() => {
										this.$u.route({
											url: 'pages/user/order',
											params: {
												type: 1
											},
											type: 'redirectTo'
										})
									}, 1500)
								}
							})
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.topbg {
		height: 150rpx;
		background-color: #ffdd00;
	}

	.shop-info {
		margin: -100rpx $gutter 0;
		background-color: #FFFFFF;
		padding: $gutter;
		border-radius: $uni-border-radius-lg;
	}

	.cellbox {
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 0 0;
		// margin-top: $gutter;
		border-top: 1rpx solid #F8F8F8;

		.amount {
			color: red;
		}
	}

	.join-vip {
		background-color: #333;
		border-radius: $uni-border-radius-base;
		margin: $gutter;
		padding: 10rpx $gutter;
		color: $color;
		display: flex;
		align-items: center;
		font-size: $uni-font-size-sm;

		.text {
			margin-left: 10rpx;
		}
	}

	.msg-phone {
		margin: $gutter;
		border-radius: $uni-border-radius-lg;
		background-color: #fff;
		overflow: hidden;
	}

	.bak-box {
		margin: $gutter;
		padding: 0 $gutter;
		background-color: $bg;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
	}

	.navigation-bar {
		height: 110rpx;

		.navigation {
			display: flex;
			align-items: center;
			border-top: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx $gutter;
			height: 110rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 99;

			.left {
				display: flex;
				font-size: 28rpx;
				width: 300rpx;

				.amount {
					color: red;
					font-weight: bold;
					font-size: 36rpx;
					margin-left: 10rpx;
				}
			}

			.right {
				flex: 1;
				display: flex;
				font-size: 28rpx;
				align-items: center;
				margin-left: auto;
			}
		}
	}

	.f-label {
		color: #999;
		font-size: 20rpx;

		.text {
			width: 100%;
		}
	}

	.coupon-title {
		padding: 28rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666;
	}

	.cliitems {
		box-shadow: 0 4rpx 5rpx rgba($color: #000000, $alpha: 0.2);
		margin: 20rpx $gutter 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.coupon-oper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		padding: 0 $gutter;

		.textbox {
			font-size: 24rpx;
			color: #666;
		}

		.red {
			color: red;
		}
	}
</style>
