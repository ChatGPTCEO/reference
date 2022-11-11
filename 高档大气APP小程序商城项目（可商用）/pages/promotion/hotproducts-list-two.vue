<template>
	<view class="">
		<common-transparent-top bgColor="#fff" blackTest headerState occupyState topTitle="TOP必买"></common-transparent-top>
		<view class="flex-1 mt-2">
			<product-danlie :list="hotProductsList"></product-danlie>
		</view>
	</view>
</template>

<script>
	import {
		getHotGoods
	} from '@/api/index.js';
	import productDanlie from '@/components/common/product-list/product-danlie';
	import commonTransparentTop from '@/components/common/common-transparent-top';
	export default {
		components: {
			commonTransparentTop,
			productDanlie
		},
		// 上划加载
		onReachBottom() {
			this.onReachBottomHandle();
		},
		data() {
			return {
				statusBarheight:'',
				queryInfo: {
					size: 10,
					page: 1,
					field: '',
					desc: ''
				},
				hotProductsList: [],
				hotProductsTotal: 0,
			};
		},
		onLoad() {
			this.initData();
		},
		methods: {
			initData() {
				this.getHotProducts();
			},
			// 上滑加载
			onReachBottomHandle() {
				if (this.hotProductsTotal != this.hotProductsList.length) {
					this.queryInfo.page++;
					this.getHotProducts();
				}
			},
			getHotProducts() {
				this.$R.get(getHotGoods, this.queryInfo).then(res => {
					this.hotProductsList = [...this.hotProductsList, ...res.data.list];
					this.hotProductsTotal = res.data.total;
					console.log(this.hotProductsList);
				});
			},
			toProduct(productId) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + productId
				});
			}
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #3B0506;
	}
	.test-text{
		transform:rotate(-30deg);
		.top-iii{
			height: 35rpx;
			line-height: 35rpx;
			padding: 0 15rpx;
			background-color: red;
			color: #ffffff;
		}
	}
</style>
