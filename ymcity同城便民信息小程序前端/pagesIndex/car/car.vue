<template>
	<view class="pageCont">
		<u-dropdown style="background-color: white;" ref="uDropdown" active-color="#f44c01">
			<u-dropdown-item v-model="search.price" title="价格" :options="options1" @change="refload"></u-dropdown-item>
			<u-dropdown-item v-model="search.mileage" title="里程" :options="options2" @change="refload"></u-dropdown-item>
		</u-dropdown>
		<z-paging ref="paging" @query="queryList" :list.sync="carData" :style="{height: scrollHeight+'px'}">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<CarList :carData="carData"></CarList>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import CarList from '@/components/CarList/CarList.vue'
	export default {
		components: {
			CarList
		},
		data() {
			return {
				search: {
					price: 'all',
					mileage: 'all',
					page:1,
				},
				options1: [{
					"label": "不限",
					"value": "all"
				}, {
					"label": "4万元以下",
					"value": "0-4"
				}, {
					"label": "4-6万元",
					"value": "4-6"
				}, {
					"label": "6-8万元",
					"value": "6-8"
				}, {
					"label": "8万元以上",
					"value": "8-all"
				}],
				options2: [{
						"label": "不限",
						"value": "all"
					},
					{
						"label": "0-3万公里",
						"value": "0-3"
					},
					{
						"label": "3-5万公里",
						"value": "3-5"
					},
					{
						"label": "5-8万公里",
						"value": "5-8"
					},
					{
						"label": "8-10万公里",
						"value": "8-10"
					},
					{
						"label": "10万公里以上",
						"value": "10-all"
					}
				],
				carData: [],
				scrollHeight: 500,
			}
		},
		onLoad() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let windowHeight = res.windowHeight;
					let windowWidth = res.windowWidth;
					let headHeight = 80 / 750 * windowWidth;
					let scrollHeight = (windowHeight - headHeight);
					that.scrollHeight = scrollHeight;
				}
			});
		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/car/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
			refload(e){
				this.$refs.paging.reload();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #F8F8F8;
	}
</style>
