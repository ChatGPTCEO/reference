<template>
	<view>
		<z-paging ref="paging" v-model="goodsList" @query="getGoodsList" :auto="false">
			<cu-custom slot="top" bgColor="bg-red" :isBack="false">
				<block slot="content">HuanXing商城</block>
			</cu-custom>
			<!-- 分类 -->
			<scroll-view scroll-x class="bg-red nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==tabCur?'text-white cur':''" v-for="(item,index) in categoryList"
					:key="index" @tap="toCategory" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>

			<!-- 轮播图 -->
			<swiper class="screen-swiper square-dot bg-red" :indicator-dots="true" :circular="true" :autoplay="true"
				interval="5000" duration="500" style="min-height: 300rpx;">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url"></image>
				</swiper-item>
			</swiper>

			<!-- 快捷入口 -->
			<view class="cu-list grid no-border col-5">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
					<navigator hover-class="none" :url="item.url">
						<view class="xl" :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						</view>
						<text>{{item.name}}</text>
					</navigator>
				</view>
			</view>
			<view style="height: 200rpx;">
				<image style="width: 100%;height: 200rpx;"
					src="https://huanxing.oss-cn-beijing.aliyuncs.com/%E5%88%9B%E6%84%8F%E7%94%B5%E5%95%86%E9%A3%8E%E6%A0%BC%E5%8F%8C%E5%8D%81%E4%BA%8C%E8%83%B6%E5%9B%8Abanner%20%281%29_%E5%A5%BD%E5%8E%8B%E7%9C%8B%E5%9B%BE.png">
				</image>
			</view>
			<view>
				<text class="flex justify-center align-center text-red text-bold text-xl">商品推荐</text>
			</view>
			<goods-list :goodsList="goodsList"></goods-list>
		</z-paging>
	</view>
</template>

<script>
	import GoodsList from "components/goods-list/index";
	export default {
		components: {
			GoodsList
		},
		data() {
			return {
				tabCur: 0,
				scrollLeft: 0,
				cuIconList: [{
					cuIcon: 'goodsfavor',
					color: 'red',
					name: '商城商品',
					url: '/pages/goods/goods-list/index'
				}, {
					cuIcon: 'apps',
					color: 'orange',
					name: '0元夺宝',
					url: '/pages/loot-info/loot-list/index'
				}, {
					cuIcon: 'footprint',
					color: 'yellow',
					name: '我的足迹',
					url: '/pages/user/user-footprint/index'
				}, {
					cuIcon: 'location',
					color: 'olive',
					name: '收获地址',
					url: '/pages/user/user-address/index'
				}, {
					cuIcon: 'form',
					color: 'cyan',
					name: '我的订单',
					url: '/pages/order/order-list/index'
				}],
				theme: getApp().globalData.theme,
				swiperList: [{
					url: 'https://huanxing.oss-cn-beijing.aliyuncs.com/4c777b38-cd21-4875-a3e6-8e0c67b5ea95.png',
				}, {
					url: 'https://huanxing.oss-cn-beijing.aliyuncs.com/1a47d1f2-9846-44de-add5-5d318cb7faf0.jpg',
				}, {
					url: 'https://huanxing.oss-cn-beijing.aliyuncs.com/bc459509-81a9-4bca-b09c-8a7a6018efcf%281%29.jpg',
				}], // 轮播图
				goodsList: [], // 商品列表
				categoryList: [{
					name: '首页'
				}] // 商品分类
			}
		},
		onLoad() {
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
					this.getGoodsCategory();
				})
			})
		},
		methods: {
			getGoodsList(pageNo, pageSize) {
				uni.$myRequest.goodsSpuPage({
					current: pageNo,
					size: pageSize,
					descs: 'sales_volume'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				})
			},
			/**
			 * 获取商品分类
			 * @param {Object} 
			 */
			getGoodsCategory() {
				uni.$myRequest.goodsCategoryList().then(res => {
					this.categoryList = [...this.categoryList, ...res.data]
				});
			},
			toCategory() {
				uni.switchTab({
					url: '/pages/category/index'
				});
			}
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>
