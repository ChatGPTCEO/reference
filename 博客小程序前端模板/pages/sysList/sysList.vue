<template>
	<view>
		<navigationBar :text="typeName" backgroundColor="#5af" :back="true">
		</navigationBar>
		<view :style="'height: calc(100vh - '+topBarHeight+'px)'">
			<zPaging ref="paging" v-model="projectList" @query="getDataList" :auto-show-back-to-top="true"
				back-to-top-threshold="300rpx" back-to-top-bottom="300rpx" :fixed="false">
				<custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher>
				<anchorLine leftText="热门分类" slot="top" rightText="查看全部" @moreClick="sysMore"></anchorLine>
				<sysItem v-for="(item,index) in projectList" :key="index" :projectItem="item"></sysItem>
			</zPaging>
		</view>

	</view>
</template>

<script>
	import util from '@/utils/util.js'
	import projectApi from '@/api/projectApi.js'
	import zPaging from '@/uni/z-paging/z-paging.vue'
	import customRefresher from '@/uni/custom-refresher/custom-refresher.vue'
	export default {
		components: {
			zPaging,
			customRefresher
		},
		data() {
			return {
				topBarHeight: 88,
				typeName: '',
				projectList: [],
				typeId: null
			}
		},
		onLoad(param) {
			let typeName = uni.getStorageSync("typeName");
			this.typeName = typeName ? typeName : '全部分类'
			if (typeName) uni.removeStorageSync("typeName")
			this.topBarHeight = util.getTopBarHeight()
			this.typeId = param.typeId ? param.typeId : null
		},
		methods: {
			async getDataList(pageNo, pageSize) {
				let res = await projectApi.projectPage(pageNo, pageSize,this.typeId)
				this.$refs.paging.complete(res.data);
			},
			sysMore() {
				uni.switchTab({
					url: '/pages/sysType/sysType'
				})
			},
		},

	}
</script>

<style scoped>
	.banner-view {


		margin-bottom: 20rpx;
	}

	.title {
		color: #5af;
	}

	.tags {
		width: 100%;
		overflow: hidden;
	}
</style>
