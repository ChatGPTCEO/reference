<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" style="height: 100%;width: 100%;">
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<FarmList :farmData="dataList"></FarmList>
		</z-paging>
	</view>
</template>

<script>
	import FarmList from '@/components/FarmList/FarmList.vue'
	export default {
		components: {
			FarmList
		},
		data() {
			return {
				dataList: [],
				search: {
					page: 1,
				},
			}
		},
		onLoad() {

		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/farming/list', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
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

	.ymref {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 10;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
</style>
