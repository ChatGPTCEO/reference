<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading
			text="加载中"
			:loadshow="loadingStatus">
		</orange-fullloading>
		<template v-if="cartList.length <= 0">
			<!-- 当购物车里有商品时关闭 -->
			<view class="no-goods">
				<view class="iconfont icon-shopping-01 text-empty" style="font-size: 120rpx;"></view>
				<view class="text-empty mt-3 font-s-5">购物车空空如也</view>
			</view>
			<view class="look-around row">
				<navigator class="around bg-color row" url="/pages/index/index" open-type="switchTab">
					随便逛逛
					<text class="iconfont icon-next-01 ml-1"></text>
				</navigator>
			</view>
		</template>
		<template v-else>
			<!-- #ifdef MP-WEIXIN -->
			<view class="d-f align-center justify-end w-100 mt" style="height: 55rpx;">
				<view class="font-s-5 mr-2 text-muted" @click="getGeleteCart">编辑</view>
			</view>
			<!-- #endif -->
			<view class="bg-white ml-2 mr-2 cart-list rounded" v-for="(item, index) in cartList" :key="index">
				<view class="row-ac pt-3">
					<image :src="item.slide_list.img" class="rounded ml-3" mode="" style="width: 150rpx;height: 150rpx;"></image>
					<view class="flex-1 mr-4 ml-2">
						<view class="in2line font-s-4">{{ item.title }}</view>
						<view class="mt-2 font-s-3 text-light-grey">规格：{{ item.skuString }}</view>
					</view>
					<view style="width: 80rpx;height: 80rpx;margin-top: -30rpx;">
						<view v-if="!deleteItem" class="iconfont icon-shanchu1 font-s-7 text-light-grey" @click="removeItem(item.id)"></view>
						<!-- 删除图标 -->
					</view>
				</view>
				<view class="d-f justify-end pb-3 mr-2 mt-2">
					<view class="font-s-6 text-main-color mr-5">
						<text class="font-s-3">￥</text>
						{{ item.price }}
					</view>
					<view class="ml-5 row-ac" style="width: 180rpx;height: 60rpx;">
						<button class="rounded-50 border-none row" style="width: 60rpx;height: 60rpx;" @click="increment(item.id, index)" :disabled="item.amount <= 0">-</button>
						<!--数量到达0，或者库存全等于0时不能点击-->
						<view class="bg-white row" style="width: 60rpx;height: 60rpx;">{{ item.amount }}</view>
						<button
							class="rounded-50 bg-button border-none row"
							style="width: 60rpx;height: 60rpx;"
							@click="decrement(item.id, index)"
							:disabled="item.total_stock == 0"
						>
							+
						</button>
					</view>
				</view>
			</view>
			<view class="w-100 bg-white fixed-bottom row-ac-sb" style="height: 100rpx;">
				<view class="ml-3">商品({{ cartList.length }})件</view>
				<view class="row-ac mr-2">
					<view class="mr-3">
						合计:
						<text class="font-s-7 ml-1">{{ totalPrice | showPrice }}</text>
					</view>
					<view class="settl-ement row bg-color" @tap="toBuyGoods">结算</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="w-100" style="height: 120rpx;"></view>
			<!-- #endif -->
		</template>
	</view>
</template>

<script>
import { getCartListUrl, changeCartGoodsNumUrl, deleteCartGoodsUrl } from '@/api/index.js';
import productList from '@/components/common/product-list'; //商品列表公共组件
import { mapState } from 'vuex';

import {debounce} from '@/utils/util';

export default {
	components: {
		productList
	},
	data() {
		return {
			checkedstate: true,
			commoditynum: false,
			deleteItem: true,
			disabled: false,
			cartList: [], //加入购物车商品列表
			shopItemSku: '',
			// 去结算页面保存的订单
			toOrderGoodsList:[],
			loadingStatus: true
		};
	},
	filters: {
		// 过滤器 这个东西放在methods里不如放在过滤器里
		// 过滤器不改变真正的data，而只是改变渲染的结果，并返回过滤后数据
		showPrice(price) {
			return '¥' + price.toFixed(2);
		}
	},
	computed: {
		...mapState({
			loginStatus: state => state.loginStatus
		}),
		totalPrice() {
			return this.cartList.reduce((preValue, item) => {
				// 单价乘数量
				// preValue是之前已经添加的价格 item是（回调中的array）是list中每一项
				// reduce(callback,innitialValue)
				// callback对数组中的所有元素调用指定的回调函数。 返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
				// callback 如果提供了 initialValue， 则 reduce 会对数组中的每个元素调用一次 callback.如果未提供 initialValue，则 reduce方法会对从第二个元素开始的每个元素调用 callbackfn 函数。
				// 回调函数语法 function callbackfn(previousValue, currentValue, currentIndex, array1)
				return preValue + item.price * item.amount;
				// 0是初始值
			}, 0);
		}
	},
	onLoad() {
		this.initData();
	},
	onShow() {
		this.initData();
	},
	methods: {
		async initData() {
			await this.getCartList();
			// 异步延迟加载
			setTimeout(() => {
				this.loadingStatus = false
			}, 100)
		},
		//点击右上角事件,编辑显示出删除键
		onNavigationBarButtonTap(e) {
			this.deleteItem = !this.deleteItem;
		},
		// #ifdef MP-WEIXIN
        getGeleteCart() {
        	this.deleteItem = !this.deleteItem;
        },
		// #endif
		//获取加入购物车商品列表 注：暂时用其它数据代替
		getCartList() {
			// 如果token为空，直接返回
			if (uni.getStorageSync('token') == '') {
				return;
			}
			this.$R.get(getCartListUrl).then(res => {
				this.cartList = res.data.list;
				this.cartList.forEach(item => {
					if (item.skuJson) {
						item.skuString = Object.values(item.skuJson).join('，');
					} else {
						item.skuString = '统一规格';
					}
				});
				this.$store.commit('shopCartNumChange', this.cartList.length);
			});
		},
		// 购物车商品+1
		increment(goodsId, index) {
			this.cartList[index].amount--;
			this.changeCartGoodsNum(goodsId, this.cartList[index].amount);
		},
		// 购物车商品-1
		decrement(goodsId, index) {
			this.cartList[index].amount++;
			this.changeCartGoodsNum(goodsId, this.cartList[index].amount);
		},
		// 点击移除时
		removeItem(goodsId) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '确定要从购物车移除改宝贝吗？',
				success: function (res) {
					if (res.confirm) {
						let postObj = {
							ids: []
						};
						postObj.ids.push(goodsId);
						that.$R.post(deleteCartGoodsUrl, postObj).then(res => {
							that.getCartList();
						});
					} else if (res.cancel) {

					}
				}
			});
		},
		// 防抖函数修改购物车商品数量
		changeCartGoodsNum: debounce(function(goodsId, count) {
			this.$R.put(changeCartGoodsNumUrl + goodsId, { nums: count }).then(res => {
			});
		}),

		//前往结算
		toBuyGoods() {
			// 把购物车数量大于0的保存下来
			this.cartList.forEach(item=>{
				if(item.amount>0){
					this.toOrderGoodsList.push(item.id)
				}
			})
			if(this.toOrderGoodsList.length<=0){
				return uni.showToast({
					title: '商品数量为0，无法结算',
					icon: 'none'
				})
			}
			uni.navigateTo({
				url: '/pages/order/establishorder?orderType=buyCart&goodsList='+this.toOrderGoodsList
			});
			this.toOrderGoodsList = []
		},
		nvaTo(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}
 /* #ifdef H5 */
.fixed-bottom{
	bottom: 100rpx;
}
 /* #endif */
 /* #ifndef MP-WEIXIN */
 .cart-list{
 	margin-top: 20rpx;
 }
  /* #endif */

.not-logged-in {
	width: 750rpx;
	height: 68rpx;
	background-color: #fefff0;
}

.no-goods {
	margin-top: 80rpx;
	text-align: center;

	image {
		width: 238rpx;
		height: 238rpx;
	}

	.text-empty {
		color: $uni-text-color-grey;
	}
}

.look-around {
	width: 750rpx;
	height: 200rpx;
}

.around {
	width: 198rpx;
	height: 70rpx;

	.iconfont {
		font-size: 20rpx;
	}
}

.settl-ement {
	width: 200rpx;
	height: 65rpx;
	border-radius: 33rpx;
}

.border-none:after {
	border: none;
}
</style>
