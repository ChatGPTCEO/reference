<template>
	<view class="">
		<common-transparent-top></common-transparent-top>
		<view class="" :style="'height:' + statusBarheight + 'px'"></view>
		<product-danlie :list="hotProductsList"></product-danlie>
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
				hotProductsTotal: 0
			};
		},
		onLoad() {
			this.initData();
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
	page {
		background-color: #000;
	}
</style>
