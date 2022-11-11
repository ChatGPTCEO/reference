<template>
	<view>
		<common-transparent-top></common-transparent-top>
		<view class="" :style="'height:' + statusBarheight + 'px'"></view>
		<product-danlie :list="newproductsList"></product-danlie>
	</view>
</template>

<script>
	import productDanlie from '@/components/common/product-list/product-danlie';
	import commonTransparentTop from '@/components/common/common-transparent-top';
	import {
		getNewGoods
	} from '@/api/index.js';

	export default {
		components: {
			commonTransparentTop,
			productDanlie
		},
		filters: {},
		data() {
			return {
				statusBarheight: '',
				queryInfo: {
					size: 10,
					page: 1,
					field: '',
					desc: ''
				},
				newProductsTotal: 0,
				newproductsList: []
			};
		},
		created() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.statusBarheight = res.statusBarHeight; //获取顶部状态栏高度+3个像素
					//微信右上角胶囊按纽占比
					// #ifdef MP-WEIXIN
					this.watchButtonWidth = ((obj.width + 10) / res.windowWidth) * 100;
					this.appPussWidth = 100 - this.watchButtonWidth;
					// #endif
				}
			});
		},
		onLoad() {
			this.initData();
		},
		// 上划加载
		onReachBottom() {
			this.onReachBottomHandle();
		},
		methods: {
			initData() {
				this.getNewGoodsList();
			},
			// 上滑加载
			onReachBottomHandle() {
				if (this.newProductsTotal != this.newproductsList.length) {
					this.queryInfo.page++;
					this.getNewGoodsList();
				}
			},
			// 获取新品商品列表
			getNewGoodsList() {
				this.$R.get(getNewGoods, this.queryInfo).then(res => {
					this.newproductsList = [...this.newproductsList, ...res.data.list];
					this.newProductsTotal = res.data.total;
				});
			},
			toProduct(productId) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + productId
				});
			}
		},
	};
</script>

<style lang="scss">
	page {
		background-color: #000;
	}

	
</style>
