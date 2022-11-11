<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus"></orange-fullloading>
		<!-- 默认选择默认收货地址 -->
		<view class="bg-white">
			<view class="ml-2 font-s-5 pt-2">收货地址:</view>
			<view class="row-ac-sb  pt-2 pb-3" @tap="chooseAddress">
				<view class="row-ac">
					<view class="iconfont icon-dizhi1 rounded-50 row text-light-grey ml-2 font-s-8"></view>
					<view class="ml-2">
						<view>
							{{ defaultAddress.contact_name || '' }}
							<text class="ml-3">{{ defaultAddress.contact_phone || '' }}</text>
						</view>
						<view class="text-secondary font-s-3">
							{{ defaultAddress.province }}{{ defaultAddress.city || '' }}{{ defaultAddress.district || '' }}{{ defaultAddress.address || '' }}
						</view>
					</view>
				</view>
				<view class="iconfont icon-xiangxia mr-2 text-secondary"></view>
			</view>
			<view class="rainbow flex-1"><image :src="rainbow" mode=""></image></view>
		</view>
		<view class="bg-white ml-2 mr-2 mt-1 " v-for="(item, index) in orderGoodsList.item" :key="index">
			<view class="row-ac pt-2">
				<image :src="item.img" class="rounded ml-2" mode="" style="width: 120rpx;height: 120rpx;"></image>
				<view class="flex-1 mr-4 ml-2">
					<view class="in2line font-s-4">{{ item.product_name }}</view>
					<view class="mt-2 font-s-3 text-light-grey">规格：{{ item.skuArr }}</view>
				</view>
			</view>
			<view class="d-f justify-end pb-3 mr-2 mt-2">
				<view class="font-s-6 mr-5">
					<text class="font-s-3">共{{ item.amount }}件</text>
					￥{{ item.total_price }}
				</view>
			</view>
		</view>
		<!-- 选择优惠券 -->
		<view class="bg-white rounded  mx-2 mt-1 coupon-box row-ac-sb py-2">
			<view class="ml-2 font-s-5">优惠券</view>
			<view class=" mr-2 font-s-3">
				<view class="text-main-color" v-if="couponInfo.id">
					满
					<text>{{ couponInfo.fullMoney }}</text>
					减
					<text>{{ couponInfo.couponMoney }}</text>
					<text class="ml-5" @click.stop="clearChooseCoupon">取消</text>
				</view>
				<view class="text-light-grey" @click="toChooseCoupon" v-else>
					<text class="iconfont icon-next-01" ></text>
				</view>
			</view>
		</view>

		<!-- 选择红包 -->
		<view class="bg-white rounded ml-2 mr-2 mt-1 p-2 red-envelope-box">
			<!-- <text class="iconfont icon-yiwancheng" @click="clearChooseRedEnvelope"></text> -->
			<view class="d-f justify-between coupon-box">
				<text class="coupon-text">红包</text>
				<view class="text-main-color mr-2" v-if="checkRedEnvelopeInfo.red_envelopes_money">
				{{ checkRedEnvelopeInfo.red_envelopes_money }}
				</view>
				<view class="text-light-grey mr-2 font-s-3" v-else>
					<text class="" v-if="redEnvelopeList.length == ''">无可用红包</text>
					<text class="" v-else>选择红包</text>
					<text class="iconfont icon-next-01"></text>
				</view>
			</view>
			<picker
				@change="redEnvelopePickerChange($event, myRedEnvelopeList)"
				:value="myRedEnvelopeList.index"
				:range="myRedEnvelopeList"
				:range-key="'red_envelopes_money'"
			></picker>
		</view>

		<!-- 显示助力信息 -->
		<view class="bg-white rounded ml-2 mr-2 mt-1 p-2 red-envelope-box" v-if="boostInfo.id">
			<view class="d-f justify-between coupon-box">
				<text class="coupon-text">助力信息</text>
				<view class="coupon-info">已减{{ orderGoodsList.boostInitiateMoney }}</view>
			</view>
		</view>

		<!-- 支付方式选择 -->
		<view class="w-100 bg-white fixed-bottom border-top d-f justify-end align-center" style="height: 120rpx;">
			<view class="mr-5 font-s-5 ">
				实付款:
				<text class="mr-3 font-s-7" v-if="couponInfo.id">￥{{ (orderGoodsList.total_price - couponInfo.couponMoney).toFixed(2) }}</text>
				<text class="mr-3 font-s-7" v-else>￥{{ totalPrice }}</text>
			</view>
			<!--点击支付直接跳往支付平台-->
			<view @tap="toPay" class="ml-5 mr-2 bg-color row font-s-4" style="width: 180rpx;height: 65rpx;border-radius: 33rpx;">立即支付</view>
		</view>
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue';
import {
	getUserReceivingAddressUrl,
	createOrderAddViewUrl,
	createOrderAddViewByCartUrl,
	createOrderAddViewBySeckillUrl,
	getMyRedEnvelopeListUrl,
	createOrderAddViewByBoostUrl,
	createOrderViewByGroupBuyingUrl
} from '@/api/index';

export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			paymenIndex: 0,
			rainbow: this.$Management.rainbow,
			defaultAddress: {},
			// 直接购买，保存传过来的参数
			testdefaultAddress: '',
			buyNowGoodsInfo: {
				sku: []
			},
			// 订单列表信息
			orderGoodsList: {},
			// 从那个地方进入这个页面【buyNow】商品详情页   【buyCart】购物车页面
			pageType: '',
			// 购物车页面进来的保存购物车列表id
			cartListId: [],
			loadingStatus: true,
			// 秒杀的活动id
			activeId: '',
			// 优惠券信息
			couponInfo: {},
			redEnvelopeList:[],
			myRedEnvelopeList: [],
			checkRedEnvelopeInfo: {
				index: 0,
				id: '',
				red_envelopes_money: ''
			},
			redEnvelopeQueryInfo: {
				status: 0,
				pageSize: 10,
				page: 1,
				field: '',
				desc: ''
			},
			boostInfo: {
				id: ''
			},
			groupBuyingInfo:{}
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	onShow() {
		this.getNewAddress();
		this.getCanUserCoupon();
	},
	methods: {
		async initData(options) {
			if (options.orderType === 'buyNow') {
				// 商品详情页直接进来
				this.buyNowGoodsInfo = JSON.parse(options.goodsAttribute);
				this.pageType = 'buyNow';
				await this.getOrderGoodsInfo('buyNow');
			} else if (options.orderType === 'buyCart') {
				let shopCartGoodsId = options.goodsList.split(',');
				this.cartListId = shopCartGoodsId;
				this.pageType = 'buyCart';
				// 购物车页面进来
				await this.getOrderGoodsInfo('buyCart', shopCartGoodsId);
			} else if (options.orderType === 'seckill') {
				// 从秒杀的商品详情页进来的
				this.activeId = options.activeId;
				this.buyNowGoodsInfo = JSON.parse(options.goodsAttribute);
				this.buyNowGoodsInfo.sku[0].activityId = options.activeId;
				this.pageType = 'seckill';
				await this.getOrderGoodsInfo('seckill');
			} else if (options.orderType === 'boost') {
				this.pageType = 'boost';
				this.boostInfo.id = options.boostId;
				await this.getOrderGoodsInfo('boost', options.boostId);
			}else if(options.orderType === 'groupBuying'){
				this.pageType = 'groupBuying';
				this.groupBuyingInfo = JSON.parse(options.goodsAttribute);
				await this.getOrderGoodsInfo('groupBuying');
			}
			this.getUserDefaultAddress();
			this.getRedEnvelopeList();
			// 异步延迟加载
			setTimeout(() => {
				this.loadingStatus = false;
			}, 100);
		},
		// 获取用户默认地址
		async getUserDefaultAddress() {
			this.defaultAddress = await uni.getStorageSync('defaultAddress');
			if (JSON.stringify(this.defaultAddress) == '{}' || this.defaultAddress == '' || this.defaultAddress == undefined) {
				// 如果缓存里面没有默认地址，那么从接口获取默认地址
				await this.$R.get(getUserReceivingAddressUrl).then(res => {
					console.log(this.testdefaultAddress);
					if (res.data.length == 1) {
						uni.setStorage({
							key: 'defaultAddress',
							data: res.data[0]
						});
						this.defaultAddress = res.data[0];
					} else if (res.data.length > 1) {
						// 把默认地址放在第一个
						let httpDefaultAddress = '';
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].is_default === 1) {
								httpDefaultAddress = res.data.splice(i, 1);
								// 把默认地址放到缓存中，用于后面调用
								uni.setStorage({
									key: 'defaultAddress',
									data: httpDefaultAddress[0]
								});
								this.defaultAddress = httpDefaultAddress[0];
							} else {
							}
						}
					}
				});
			}
		},
		// 获取红包列表
		getRedEnvelopeList() {
			this.$R.get(getMyRedEnvelopeListUrl, this.redEnvelopeQueryInfo).then(res => {
				this.redEnvelopeList = res.data.list
				// 清除无法使用的红包
				res.data.list.forEach((item, index) => {
					if (item.status != 1) {
						if (item.products[0] == 0) {
							// 全场商品
							this.myRedEnvelopeList.push(item);
						} else {
							// 判断部分商品是否可用
							let canUserPrice = 0;
							this.orderGoodsList.item.forEach(goodsItem => {
								item.products.forEach(redEnvelopeProductItem => {
									// 如果商品id和红包可使用的商品id一致
									if (goodsItem.product_id == redEnvelopeProductItem) {
										canUserPrice += Number(goodsItem.total_price);
										if (canUserPrice > item.full_money) {
											this.myRedEnvelopeList.push(item);
										}
									}
								});
							});
						}
					}
				});
			});
		},
		// 选择红包
		redEnvelopePickerChange(e, redEnvelopeInfo) {
			if (this.myRedEnvelopeList.length <= 0) {
				return uni.showToast({
					title: '暂无可用红包！',
					icon: 'none'
				});
			}
			if (this.couponInfo.id) {
				return uni.showToast({
					title: '优惠券和红包只能选择一个！',
					icon: 'none'
				});
			} else {
				this.checkRedEnvelopeInfo.id = redEnvelopeInfo[e.target.value].id;
				this.checkRedEnvelopeInfo.red_envelopes_money = redEnvelopeInfo[e.target.value].red_envelopes_money;
			}
		},
		// 清除已选择的红包
		clearChooseRedEnvelope() {
			this.checkRedEnvelopeInfo = {
				index: 0,
				id: '',
				red_envelopes_money: ''
			};
		},
		// 获取用户重新地址
		getNewAddress() {
			let newAddress = this.$store.state.onceChooseAddress;
			// 如果store里面的newAddress为空，直接返回
			if (JSON.stringify(newAddress) === '{}') {
				return false;
			} else {
				// 把用户选择的地址赋值
				this.defaultAddress = newAddress;
				// 清空用户临时选择的地址
				this.$store.commit('toOnceChooseAddressChange', {});
			}
		},
		// 清除选择的优惠券
		clearChooseCoupon() {
			this.couponInfo = {};
		},
		// 获取用户可用的优惠券
		getCanUserCoupon() {
			this.couponInfo = this.$store.state.chooseCouponInfo;
			console.log(this.couponInfo);
			this.$store.commit('chooseCouponInfoMutations', {});
		},
		// 获取订单信息
		getOrderGoodsInfo(inType, shopCartGoodsId) {
			if (inType === 'buyNow') {
				// 如果是商品详情页直接来的
				this.$R.post(createOrderAddViewUrl, this.buyNowGoodsInfo).then(res => {
					this.orderGoodsList = res.data;
					this.orderGoodsList.item.forEach(item => {
						item.skuArr = [];
						for (let j in item.product_specs) {
							item.skuArr.push(item.product_specs[j]);
						}
						item.skuArr = item.skuArr.join('，');
					});
				});
			}
			else if (inType === 'buyCart') {
				this.$R.post(createOrderAddViewByCartUrl, { cartId: shopCartGoodsId }).then(res => {
					this.orderGoodsList = res.data;
					this.orderGoodsList.item.forEach(item => {
						for (let j in item.product_specs) {
							item.skuArr = [];
							item.skuArr.push(item.product_specs[j]);
							item.skuArr = item.skuArr.join('，');
						}
					});
				});
			}
			else if (inType === 'seckill') {
				this.$R.post(createOrderAddViewBySeckillUrl, this.buyNowGoodsInfo).then(res => {
					this.orderGoodsList = res.data;
					this.orderGoodsList.item.forEach(item => {
						item.skuArr = [];
						for (let j in item.product_specs) {
							item.skuArr.push(item.product_specs[j]);
						}
						item.skuArr = item.skuArr.join('，');
					});
				});
			}
			else if (inType === 'boost') {
				this.$R.get(createOrderAddViewByBoostUrl + shopCartGoodsId, { id: shopCartGoodsId }).then(res => {
					this.orderGoodsList = res.data;
					this.orderGoodsList.item.forEach(item => {
						item.skuArr = [];
						for (let j in item.product_specs) {
							item.skuArr.push(item.product_specs[j]);
						}
						item.skuArr = item.skuArr.join('，');
					});
					let boostGoodsInfo = [
						{
							amount: res.data.item[0].amount,
							productId: res.data.item[0].product_id,
							skuId: res.data.item[0].sku_id
						}
					];
					this.buyNowGoodsInfo.sku = boostGoodsInfo;
				});
			}
			else if(inType === 'groupBuying'){
				let httpObj = {
					sku:[{
						amount:this.groupBuyingInfo.amount,
						productId:this.groupBuyingInfo.productId,
						skuId:this.groupBuyingInfo.skuId,
						collageId:this.groupBuyingInfo.activityId,
					}]
				}
				this.$R.post(createOrderViewByGroupBuyingUrl,httpObj).then(res=>{
					this.orderGoodsList = res.data;
					this.orderGoodsList.item.forEach(item => {
						item.skuArr = [];
						for (let j in item.product_specs) {
							item.skuArr.push(item.product_specs[j]);
						}
						item.skuArr = item.skuArr.join('，');
					});
				})
			}
		},
		// 跳转到选择支付页面
		toPay() {
			if (this.defaultAddress == '' || JSON.toString(this.defaultAddress) == '{}') {
				return uni.showToast({
					icon: 'none',
					title: '收货地址为空，请先编辑地址'
				});
			}
			if (this.couponInfo.id == undefined) {
				this.couponInfo.id = 0;
			}
			if (this.pageType === 'buyNow' || this.pageType === 'boost') {
				// 从商品详情页进入购买
				let httpObj = {
					addressId: this.defaultAddress.id,
					receiveId: this.couponInfo.id,
					envelopesReceiveId: this.checkRedEnvelopeInfo.id,
					boostInitiateId: this.boostInfo.id,
					sku: this.buyNowGoodsInfo.sku
				};
				// 保存订单参数到vuex中
				this.$store.commit('toPayHttpObjChange', httpObj);
				uni.navigateTo({
					url: '/pages/order/pay/pay?payType=buyNow'
				});
			}
			else if (this.pageType === 'buyCart') {
				// 从购物车页面进入购买
				uni.navigateTo({
					url: `/pages/order/pay/pay?payType=buyCart&addressId=${this.defaultAddress.id}
          &cartId=${this.cartListId}&receiveId=${this.couponInfo.id}&envelopesReceiveId=${this.checkRedEnvelopeInfo.id}`
				});
			}
			else if (this.pageType === 'seckill') {
				// 从商品详情页进入购买
				let httpObj = {
					addressId: this.defaultAddress.id,
					receiveId: this.couponInfo.id,
					sku: this.buyNowGoodsInfo.sku
				};
				// 保存订单参数到vuex中
				this.$store.commit('toPayHttpObjChange', httpObj);
				uni.navigateTo({
					url: '/pages/order/pay/pay?payType=seckill'
				});
			}
			else if(this.pageType === 'groupBuying'){
				let skuFormat = [{
					amount:this.groupBuyingInfo.amount,
					productId:this.groupBuyingInfo.productId,
					skuId:this.groupBuyingInfo.skuId,
					collageId:this.groupBuyingInfo.activityId,
				}]
				let httpObj = {
					addressId: this.defaultAddress.id,
					receiveId: this.couponInfo.id,
					sku: skuFormat,
				};
				console.log(this.groupBuyingInfo)
				if(this.groupBuyingInfo.uuid){
					this.$set(httpObj.sku[0],'uuid',this.groupBuyingInfo.uuid)
				}
				this.$store.commit('toPayHttpObjChange', httpObj);
				uni.navigateTo({
					url: '/pages/order/pay/pay?payType=groupBuying'
				});
			}
		},
		chooseAddress() {
			uni.navigateTo({
				url: '/pages/user/configure/address?type=chooseAddress'
			});
		},
		// 跳转到选择优惠券页面
		toChooseCoupon() {
          if (this.checkRedEnvelopeInfo.id) {
				return uni.showToast({
					title: '优惠券和红包只能选择一个！',
					icon: 'none'
				});
			} else {
            this.$store.commit('changeBeforeCreateOrderGoodsMutations', this.orderGoodsList);
            uni.navigateTo({
					url: '/pages/marketing/coupon/my-coupon?type=chooseCoupon'
				});
			}
		}
	},
	computed: {
		totalPrice() {
			if (this.couponInfo.id) {
				return (this.orderGoodsList.total_price - this.couponInfo.couponMoney).toFixed(2);
			} else if (this.checkRedEnvelopeInfo.id) {
				return (this.orderGoodsList.total_price - this.checkRedEnvelopeInfo.red_envelopes_money).toFixed(2);
			} else {
				return this.orderGoodsList.total_price;
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}
.rainbow {
	image {
		width: 100%;
		height: 10rpx;
	}
}

.default-address {
	padding: 2 rpx 4 rpx;
	border: 1 rpx solid;
	border-radius: 4 rpx;
}

.icon-gouxuan {
	color: $uni-text-white-color;
}

.active .icon-gouxuan {
	color: $main-color !important;
}

.red-envelope-box {
	position: relative;
	padding-right: 0;

	picker {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
