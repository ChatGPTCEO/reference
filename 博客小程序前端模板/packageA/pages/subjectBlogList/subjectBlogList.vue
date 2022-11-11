<template>
	<view>
		<navigationBar :text="subjectName" backgroundColor="#5af" :back="true">
		</navigationBar>
		<loading v-show="loading"></loading>
		<view :style="'height: calc(100vh - '+topBarHeight+'px)'" v-show="!loading">
			<zPaging ref="paging" v-model="blogList" @query="getDataList" :auto-show-back-to-top="true"
				back-to-top-threshold="300rpx" back-to-top-bottom="300rpx" :fixed="false">
				<custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher>
				<anchorLine leftText="全部文章" slot="top" rightText="查看全部" @moreClick="sysMore" leftEnglish="blogs">
				</anchorLine>
				<blogArticle v-for="(item,index) in blogList" :key="index" :blogItem="item"></blogArticle>
			</zPaging>
		</view>

	</view>
</template>

<script>
	import util from '@/utils/util.js'
	import indexApi from '@/api/indexApi.js'
	import userApi from '@/api/userApi.js'
	import zPaging from '@/uni/z-paging/z-paging.vue'
	import customRefresher from '@/uni/custom-refresher/custom-refresher.vue'
	export default {
		components: {
			zPaging,
			customRefresher
		},
		data() {
			return {
				loading: false,
				topBarHeight: 88,
				subjectName: '',
				blogList: [],
				subjectId: null,
				type: 0
			}
		},
		onLoad(param) {
			let subjectName = uni.getStorageSync("subjectName");
			this.subjectName = subjectName ? subjectName : '全部专题'
			if (subjectName) uni.removeStorageSync("subjectName")
			this.topBarHeight = util.getTopBarHeight()
			this.subjectId = param.subjectId ? param.subjectId : null
			this.type = param.type
		},
		methods: {
			async getDataList(pageNo, pageSize) {
				this.loading = true
				let res
				if (this.type == 0) res = await indexApi.getBlogBySubjectId(this.subjectId, pageNo)
				if (this.type == 1) res = await userApi.getUserLikePage(pageNo)
				if (this.type == 2) res = await userApi.getUserCollectPage(pageNo)
				this.$refs.paging.complete(res.data);
				this.loading = false
			},
			sysMore() {
				uni.navigateTo({
					url: '/pages/blogList/blogList'
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
