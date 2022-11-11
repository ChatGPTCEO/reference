<template>
	<view>
		<z-paging ref="paging" v-model="goodsList" @query="getGoodsList" :auto="false">
			<cu-custom slot="top" :isBack="true" bgColor="bg-red">
				<block slot="backText">返回</block>
				<block slot="content">商品列表</block>
			</cu-custom>
			<view slot="top" class="cu-bar bg-red search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入搜索的关键词" confirm-type="search" v-model="searchKeyword"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="doSearch">搜索</button>
				</view>
			</view>
			<view>
				<goods-list :goodsList="goodsList"></goods-list>
			</view>
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
				goodsList: [],
				searchKeyword: '',
				categorySecondId: ''
			}
		},
		onLoad(option) {
			if (option.categorySecondId) {
				this.categorySecondId = option.categorySecondId;
			}
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			getGoodsList(pageNo, pageSize) {
				uni.$myRequest.goodsSpuPage({
					current: pageNo,
					size: pageSize,
					name: this.searchKeyword,
					categorySecondId: this.categorySecondId
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				})
			},
			doSearch() {
				this.$refs.paging.reload();
			}
		}
	}
</script>

<style>

</style>
