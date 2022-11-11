<template>
	<view>
		<view class="banner">
			<image mode="scaleToFill" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F590b83f5559ed37d77325dba54c67a4e6d8bbb65260b1-0N8sfG_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642999456&t=7c5e365b1b944db8192bfbd8b7a975e2"></image>
		</view>
		<view class="group-list">
			<product-list-long :type="'group'" :list="groupBuyingProdList"></product-list-long>
		</view>
	</view>
</template>

<script>
import { getGroupBuyingListUrl } from '@/api/index'
import productListLong from '@/components/common/product-list/product-list-long.vue'
	export default {
		data() {
			return {
				queryInfo:{
					page:1,
					pageSize:10
				},
				groupBuyingProdList:[]
			};
		},
		components: {
			productListLong
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.initData()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad () {
			this.initData()
		},
		methods:{
			initData(){
				this.getGroupBuyingList()
			},
			// 获取拼团活动列表
			getGroupBuyingList(){
				this.$R.get(getGroupBuyingListUrl,this.queryInfo).then(res => {
					console.log(res)
					this.groupBuyingProdList = res.data.list
				})
			},
		}
	}
</script>

<style scoped lang="scss">
 .banner{
	 image{
		 display: block;
		 width: 100%;
		 height: 140px;
	 }
 }
</style>
