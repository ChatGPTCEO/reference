<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="houseData" :style="{height: scrollHeight+'px'}">
			<view slot="top">
				<u-dropdown style="background-color: white;" ref="uDropdown" active-color="#f44c01">
					<u-dropdown-item v-model="search.info_type" title="租售类型" :options="options1" @change="refload">
					</u-dropdown-item>
					<u-dropdown-item v-model="search.acreage" title="面积" :options="options2" @change="refload">
					</u-dropdown-item>
				</u-dropdown>
			</view>
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<HouseList :houseData="houseData"></HouseList>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import HouseList from '@/components/HouseList/HouseList.vue';
	export default {
		components: {
			HouseList
		},
		data() {
			return {
				search: {
					type: 'shop',
					info_type: "all",
					acreage: "all",
					page: 1,
				},
				options1: [{
					"label": "全部",
					"value": "all"
				}, {
					"label": "出租",
					"value": "rent"
				}, {
					"label": "出售",
					"value": "sell"
				}],
				options2: [{
						"label": "不限",
						"value": "all"
					},
					{
						"label": "100㎡以下",
						"value": "0-100"
					},
					{
						"label": "100-300㎡",
						"value": "100-300"
					},
					{
						"label": "300-500㎡",
						"value": "300-500"
					},
					{
						"label": "500-1000㎡",
						"value": "500-1000"
					},
					{
						"label": "1000㎡以上",
						"value": "1000-0"
					}
				],
				houseData: [],
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
				//这里的请求只是演示，请替换成自己的项目的网络请求，请在网络请求回调中
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/house/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
			refload(e) {
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
