<template>
	<view>
		<z-paging ref="paging" v-model="shoppingCartList" @query="getPage" :auto="false" :refresher-enabled="false">
			<cu-custom slot="top" bgColor="bg-red" :isBack="false">
				<block slot="content">我的购物车</block>
			</cu-custom>
			<view slot="top" class="flex justify-between align-center padding-sm bg-white solid-bottom shadow">
				<view>
					共{{shoppingCartList.length}}件宝贝
				</view>
				<view>
					<button class="cu-btn round bg-red shadow sm">全部删除</button>
				</view>
			</view>
			<view v-for="(item,index) in shoppingCartList" :key="index"
				class="padding-lr-sm padding-tb-xl  bg-white solid-bottom">
				<!-- <navigator hover-class="none" :url="'/pages/goods/goods-detail/index?id=' + item.spuId"> -->
				<view class="flex justify-center align-center">
					<view class="basis-sm">
						<view class="flex align-center">
							<checkbox-group class="padding-lr-xs" @tap="changeShoppingCart(item)">
								<checkbox class="round sm" :class="item.checked?'checked':''"
									:checked="item.checked?true:false" :value="item.id">
								</checkbox>
							</checkbox-group>
							<view class="cu-avatar radius xl" :style="'background-image:url(' + item.picUrl + ')'">
							</view>
						</view>

					</view>
					<view class="basis-xl">
						<view>
							<text class="text-black hx-overflow-2">{{item.spuName}}</text>
							<view class="flex justify-between padding-top-lg">
								<view class="text-red text-price text-bold text-lg">{{item.salesPrice}}</view>
								<view>
									<uni-number-box :min="1" :max="999" v-model="item.quantity"
										@change="numberBoxChange(item)">
									</uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- </navigator> -->
			</view>
			<!-- 底部操作栏 -->
			<view slot="bottom" class="cu-bar bg-white padding-sm">
				<checkbox-group>
					<checkbox class="round sm" @tap="changeShoppingCartAll" :class="checkedAll?'checked':''"
						:checked="checkedAll?true:false">
					</checkbox><text class="padding-xs">全选</text>
				</checkbox-group>
				<view class="flex align-center">
					<view class="padding-xs">合计:<text class="text-red text-price text-lg">{{totalPrice}}</text></view>
					<button class="cu-btn bg-red round shadow-blur" @tap="buySub"
						:disabled="this.selectedValue.length>=0">结算</button>
				</view>
			</view>
		</z-paging>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				shoppingCartList: [],
				selectedValue: [], // 选中数据
				checkedAll: false,
				totalPrice: 0,
			}
		},
		onLoad() {

		},
		onShow() {
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			getPage(pageNo, pageSize) {
				uni.$myRequest.shoppingCartPage({
					current: pageNo,
					size: pageSize,
					descs: 'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				});
			},
			/**
			 * 购物车数量改变
			 */
			numberBoxChange(e) {
				this.$nextTick(function() {
					this.addCart(e)
				})
			},
			/**
			 * 数量修改
			 */
			addCart(dataObj) {
				let data = {
					id: dataObj.id,
					quantity: dataObj.quantity,
				};
				let _this = this;
				uni.$myRequest.saveOrUpdateCart(data).then(res => {
					// 计算购物车
					_this.computeSelectedGoods();
				})

			},
			// 购物车全选
			changeShoppingCartAll() {
				console.log(this.checkedAll)
				this.checkedAll = !this.checkedAll
				console.log(this.checkedAll)
				let _this = this;
				if (this.checkedAll) {
					if (this.shoppingCartList && this.shoppingCartList.length > 0) {
						this.shoppingCartList.forEach(function(item) {
							let index = _this.selectedValue.indexOf(item);
							if (index == -1) {
								_this.selectedValue.push(item);
								item.checked = true;
							}
						})
						// 计算购物车
						this.computeSelectedGoods();
					}
				} else {
					if (this.shoppingCartList && this.shoppingCartList.length > 0) {
						this.shoppingCartList.forEach(function(item) {
							item.checked = false;
						})
					}
					this.selectedValue = []
					this.totalPrice = 0;
				}

			},
			// 购物车选中
			changeShoppingCart(item) {
				item.checked = !item.checked;
				let index = this.selectedValue.indexOf(item);
				console.log("checked" + item.checked)
				console.log("index" + index)
				if (item.checked) {
					if (index == -1) {
						this.selectedValue.push(item);
					}

				} else {
					if (index != -1) {
						this.selectedValue.splice(index, 1);
					}
				}

				// 计算购物车
				this.computeSelectedGoods();
			},
			computeSelectedGoods() {
				this.totalPrice = 0;
				if (this.selectedValue && this.selectedValue.length > 0) {
					if (this.selectedValue.length >= this.shoppingCartList.length) {
						this.checkedAll = true;
					} else {
						this.checkedAll = false;
					}
					let totalPrice = 0;
					let _this = this;
					this.shoppingCartList.forEach(function(item) {
						if (_this.selectedValue.indexOf(item) > -1) {
							totalPrice += item.quantity * item.goodsSpu.salesPrice;
						}
					})
					this.totalPrice = totalPrice.toFixed(2);
				}


			},
			buySub() {
				if (this.selectedValue.length <= 0) {
					uni.showToast({
						title: '请选择要下单的商品进行结算',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/order/order-confirm/index?goodsList=' + encodeURIComponent(JSON
						.stringify(this
							.selectedValue))
				});
				this.selectedValue = [];
				this.totalPrice = 0;
				this.checkedAll = false;
			}
		}
	}
</script>

<style lang="scss">
</style>
