<template>
	<view>
		<view class="coupon-list">
			<view class="coupon-item" :class="item.couponStatus ? '' : 'not-user'" v-for="item in myCouponList" :key="item.id" @click="chooseCoupon(item)">
				<view class="coupon-bg">
					<view class="coupon-white"></view>
					<view class="coupon-circular"></view>
				</view>
				<view class="coupon-info">
					<view class="coupon-value">
						￥
						<text>{{ item.couponMoney }}</text>
					</view>
					<view class="coupon-full-money">
						<view class="full-money">满{{ item.fullMoney }}可用</view>
						<view class="coupon-name">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getMyCouponListUrl } from '@/api/index';

export default {
	data() {
		return {
			queryInfo: {
				pageSize: 10,
				page: 1,
				field: '',
				desc: ''
			},
			myCouponList: [],
			total: 0,
			// false为正常进入查看优惠券，true为订单页面选择优惠券
			pageStatus: false,
			// 保存预下单的商品信息
			beforeCreateOrderGoods: []
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	methods: {
		initData(options) {
			// 如果是从选择优惠券进入的
			if (options.type === 'chooseCoupon') {
				this.pageStatus = true;
			}
			this.getMyCouponList();
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.total != this.myCouponList.length) {
				this.queryInfo.page++;
				this.getMyCouponList();
			}
		},
		// 获取预下单商品信息
		getPageStatusInfo(myCouponList) {
			this.beforeCreateOrderGoods = this.$store.state.beforeCreateOrderGoods;
			/*this.beforeCreateOrderGoods = {
        deliver_money: 0,
        item: [
          {
            amount: 1,
            img: 'https://www.chunfengbuy.com/uploads/20210623/ebb59f29b6d2d77c3aa05b031a79316f.jpg',
            price: '573.00',
            product_id: 103,
            product_name: '周六福 黄金吊坠女款足金福字项坠挂坠首饰 福来运到 计价 1.04g（含工费48元）',
            skuArr: '',
            sku_id: 0,
            total_price: '573.00'
          }
        ],
        total_price: '573.00'
      }*/
			console.log('-------------');
			console.log(this.beforeCreateOrderGoods);
			myCouponList.forEach(item => {
				// 先把所有优惠券可用状态改为false
				this.$set(item, 'couponStatus', false);
				// 先判断是不是全场优惠券
				if (item.products[0] == 0) {
					// 全场券 如果vuex传来的订单金额大于优惠券使用金额，优惠券状态改为true
					if (this.beforeCreateOrderGoods.total_price - this.beforeCreateOrderGoods.deliver_money > item.fullMoney) {
						this.$set(item, 'couponStatus', true);
					}
				} else {
					// 部分商品券
					/*
          1.先获取这个商品券可用的商品id
          2.再获取订单的商品id，
          3.取出相同的id，，最后相加，然后判断优惠券可不可用
          */
					console.log(item);
					let canUerCouponPrice = 0;
					item.products.forEach(couponProductId => {
						this.beforeCreateOrderGoods.item.forEach(orderGoodsInfo => {
							console.log(couponProductId == orderGoodsInfo.product_id);
							if (couponProductId == orderGoodsInfo.product_id) {
								canUerCouponPrice += orderGoodsInfo.total_price;
							}
						});
					});
					if (Number(canUerCouponPrice) > item.fullMoney) {
						this.$set(item, 'couponStatus', true);
					}
				}
			});

			// 2.判断部分商品优惠券，如果vuex传来的订单商品*数量 大于部分商品可以使用的商品，优惠券状态也改为true
		},
		// 获取优惠券列表
		getMyCouponList() {
			this.$R.get(getMyCouponListUrl, this.queryInfo).then(res => {
				this.myCouponList = [...this.myCouponList, ...res.data.list];
				console.log(this.myCouponList);
				this.total = res.data.total;
				this.myCouponList.forEach(item => {
					this.$set(item, 'couponStatus', true);
				});
				if (this.pageStatus) {
					console.log(1);
					this.getPageStatusInfo(this.myCouponList);
				}
			});
		},
		// 优惠券点击事件
		chooseCoupon(couponInfo) {
			if (this.pageStatus) {
				if (couponInfo.couponStatus) {
					// 如果是从订单页面进入，点击的可用时候保存优惠券信息，然后返回上一页
					this.$store.commit('chooseCouponInfoMutations', couponInfo);
					// 关闭当前页面，返回上一页
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f2f2f2;
}

.coupon-list {
	padding: 20rpx;

	.coupon-item {
		background-color: #f0d1a2;
		border-radius: 10rpx;
		height: 146rpx;
		padding: 20rpx;
		position: relative;
		margin-bottom: 20rpx;

		&.not-user {
			background-color: #999999;
		}

		.coupon-bg {
			.coupon-white {
				background-color: #ffffff;
				border-radius: 10rpx;
				position: absolute;
				height: 146rpx;
				width: 320rpx;
				top: 20rpx;
				left: 33rpx;
				z-index: 1;
			}

			.coupon-circular {
				background-color: #f0d1a2;
				width: 66rpx;
				height: 66rpx;
				border-radius: 50%;
				position: absolute;
				left: 0rpx;
				top: 50%;
				margin-top: -33rpx;
				z-index: 2;
			}
		}

		.coupon-info {
			position: relative;
			z-index: 3;
			display: flex;

			.coupon-value {
				font-size: 26rpx;
				color: #f61f1b;
				font-weight: bold;
				line-height: 146rpx;
				margin-left: 80rpx;
				width: 280rpx;

				text {
					font-size: 46rpx;
				}
			}

			.coupon-full-money {
				margin-left: 30rpx;
				color: #462301;

				.full-money {
					font-size: 32rpx;
					line-height: 70rpx;
					margin-top: 10rpx;
					font-weight: bold;
				}

				.coupon-name {
					font-size: 26rpx;
					line-height: 40rpx;
				}
			}
		}
	}
	.coupon-item.not-user {
		.coupon-circular {
			background-color: #999999;
		}
	}
}
</style>
