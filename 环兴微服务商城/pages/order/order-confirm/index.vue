<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">订单确认</block>
		</cu-custom>
		<view class="bg-white radius-xl margin-sm">
			<navigator hover-class="none" url="/pages/user/user-address/index?isChoose=true">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar cuIcon-location text-red bg-white">
						</view>
						<view v-if="addressInfo" class="content">
							<view class="text-bold">{{addressInfo.detailAddress}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									{{addressInfo.addresseeName}} {{addressInfo.telephone}}
								</view>
							</view>
						</view>
						<view class="content" v-else>
							<text class="text-bold">请选择收货地址</text>
						</view>
						<view class="action">
							<text class="cuIcon-right"></text>
						</view>
					</view>

				</view>
			</navigator>
		</view>
		<view class="bg-white radius-xl margin-sm">
			<view v-for="(item,index) in orderInfo.orderItemList" class="flex">
				<view class="basis-xs margin-xs radius">
					<view class="cu-avatar radius xl" :style="'background-image:url(' + item.picUrl + ')'">
					</view>
				</view>
				<view class="basis-xl margin-xs padding-sm radius">
					<view class="hx-overflow-2 text-bold">
						{{item.spuName}}
					</view>
					<view>
						{{item.spuSpecs}}
					</view>
					<view class="flex justify-between align-end padding-top-xs">
						<view class="text-bold text-df text-price text-red">{{item.salesPrice}}</view>
						<view> x{{item.buyQuantity}}</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 配送服务
				</view>
				<view class="action">
					<view>快递费：{{orderInfo.freightPrice}}元</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 订单备注
				</view>
				<view class="action">
					<view>
						<input placeholder="请输入订单备注" class="text-right" name="input"></input>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<!-- 底部操作栏 -->
		<view class="cu-bar bg-white tabbar foot justify-end">
			<view>
				共{{orderInfo.buyQuantity}}件,
				合计 <text class="text-price text-red text-lg">{{orderInfo.payPrice}}</text>
			</view>
			<view class="padding-lr-xs">
				<button class="cu-btn bg-red shadow round" @tap="createOrderSub" data-target="menuModal">提交订单</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				remark: '',
				showRemark: false,
				orderInfo: {
					orderType: '1', // 订单类型：1.普通订单；
					deliveryWay: '1', // 配送方式：1.普通快递；2.上门自提
					deliveryWay: '1',
					orderItemList: []
				},
				addressInfo: {},
				goodsList: [] // 商品数组
			}
		},
		onLoad(options) {
			this.goodsList = JSON.parse(decodeURIComponent(options.goodsList));
			getApp().initPage().then(res => {
				this.getDefaultAddress();
				this.getPreOrder()
			})

		},
		methods: {
			getPreOrder() {
				let totalPrice = 0; // 商品总金额
				let buyQuantity = 0; // 购买数量
				let freightPrice = 0; // 运费
				let couponPrice = 0; //优惠金额
				let payPrice = 0; // 支付金额
				let orderItems = [];
				this.goodsList.forEach((item, index) => {
					let isInclPostage = item.goodsSpu.freightTemplate.isInclPostage; //是否包邮
					let isInclPostageByIf = item.goodsSpu.freightTemplate.isInclPostageByIf; //是否满额包邮
					let pricingType = item.goodsSpu.freightTemplate.pricingType; //计价方式：1.按件数、2.按重量、3.按体积
					let firstFreight = item.goodsSpu.freightTemplate.firstFreight; //首费（元）
					let continueFreight = item.goodsSpu.freightTemplate.continueFreight; //续费（元）

					let itemTotalPrice = item.goodsSku.salesPrice * item.quantity;

					// 计算运费 start
					let itemFreightPrice = 0;
					if (isInclPostage == '0') {
						// 开始计算运费
						if (pricingType == '1') {
							if (item.quantity > 1) {
								itemFreightPrice = item.quantity * continueFreight
							} else {
								itemFreightPrice = firstFreight;
							}

						}

					}
					orderItems.push({
						spuId: item.goodsSpu.id,
						picUrl: item.goodsSpu.spuUrls[0],
						spuName: item.goodsSpu.name,
						buyQuantity: item.quantity,
						salesPrice: item.goodsSku.salesPrice,
						totalPrice: itemTotalPrice,
						freightPrice: itemFreightPrice,
						couponPrice: 0,
						payPrice: itemTotalPrice + itemFreightPrice,
						spuSpecs: item.goodsSku.spuSpecs,
						skuId: item.goodsSku.id
					})
					totalPrice += itemTotalPrice;
					buyQuantity += item.quantity;
					freightPrice += itemFreightPrice;
					payPrice += (itemTotalPrice + itemFreightPrice);
				})
				this.orderInfo.orderItemList = orderItems;
				this.orderInfo.totalPrice = totalPrice.toFixed(2);;
				this.orderInfo.buyQuantity = buyQuantity
				this.orderInfo.couponPrice = couponPrice.toFixed(2);
				this.orderInfo.freightPrice = freightPrice.toFixed(2);
				this.orderInfo.payPrice = payPrice.toFixed(2);
			},
			/**
			 * 获取默认收货地址
			 */
			getDefaultAddress() {
				uni.$myRequest.defaultAddress().then(res => {
					this.addressInfo = res.data
				})
			},
			createOrderSub() {
				if (!this.addressInfo) {
					uni.showToast({
						title: '请选择收获地址',
						icon: 'none',
						duration: 3000
					});
				}
				this.orderInfo.deliveryWay = '1'; //配送方式：1.普通快递；2.上门自提
				this.orderInfo.orderType = '1'; //订单类型：1.普通订单；
				this.orderInfo.userAddressId = this.addressInfo.id;
				this.orderInfo.createWay = '1';
				uni.$myRequest.createOrder(this.orderInfo).then(res => {
					uni.navigateTo({
						url: '/pages/order/order-detail/index?id=' + res.data.id + "&isPay=true"
					})
				})
			},
			setUserAddress(data) {
				this.addressInfo = data
			}
		}
	}
</script>

<style lang="scss">
</style>
