<template>
	<view   class="categoryContainer">
		<u-navbar title="商品分类" :title-size="34" :border-bottom="false" :is-back="false"></u-navbar>
		 <!-- 商品列表-->
		<view   v-if="list.length>0">
			 <long-categories :scrollViewHeight="scrollViewHeight" :list="list"
				:maxSelected="max" @change="change"></long-categories>
		</view>
		<view   v-else class="custom-empty">
			<u-loading mode="flower" size="60"></u-loading>
		</view>
	</view>
</template>

<script>
	import longCategories from '@/components/category/categoryList.vue';
	import pageData from '@/util/pagedata.js';
	export default {
		components:{
			longCategories
		},
		data() {
			return {
				scrollViewHeight:0,
				list:[],
				searchWord:'',
				max:1,
			};
		},
		mounted:function(){
			this.getData();
			let that = this;
			// #ifdef H5
			this.scrollViewHeight=this.$u.sys().windowHeight-50;
			// #endif
			// #ifndef H5
			this.scrollViewHeight=this.$u.sys().windowHeight-95;
			// #endif

		},
		methods:{
			getData() {
				this.list=pageData.getCategoryData();
			},
			change:function(data) {
				console.log("===data===",data);
				this.globalUtil.utilAlert("去商品列表");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.categoryContainer{
		color: #363132;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		.slot-wrap{
			display: flex;
			align-items: center;
			flex: 1;
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 30rpx;
		}
	}
</style>

