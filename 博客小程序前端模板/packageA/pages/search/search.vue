<template>
	<view>
		<navigationBar text="全站搜索" backgroundColor="#5af" :back="true"></navigationBar>
		<view class="index-search">
			<u-search placeholder="日照香炉生紫烟" :height="64" :searchIconSize="44" :showAction="false" v-model="keyword" @clear="search"
				@search="search"></u-search>
		</view>
		<view class="sea-subsection">
			<u-subsection :list="list" :current="curNow" @change="sectionChange" fontSize="24" activeColor="#5af">
			</u-subsection>
		</view>
		<view style="height: 200rpx;"></view>
		<view v-if="curNow == 0">
			<view :style="'height: calc(100vh - '+topBarHeight+'px)'">
				<zPaging ref="blogPaing" v-model="blogList" @query="getBlogList" back-to-top-threshold="300rpx"
					back-to-top-bottom="300rpx" :fixed="false">
					<custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher>
					<blogArticle v-for="(item,index) in blogList" :key="index" :blogItem="item"></blogArticle>
				</zPaging>
			</view>
		</view>
		<view v-if="curNow == 1">
			<view :style="'height: calc(100vh - '+topBarHeight +'px)'">
				<zPaging ref="projectPaing" v-model="projectList" @query="getProjectList" back-to-top-threshold="300rpx"
					back-to-top-bottom="300rpx" :fixed="false">
					<custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher>
					<sysItem v-for="(item,index) in projectList" :key="index" :projectItem="item"></sysItem>
				</zPaging>
			</view>
		</view>
		<!-- <view v-if="curNow == 2">333</view> -->
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	import searchApi from '@/api/searchApi.js'
	import zPaging from '@/uni/z-paging/z-paging.vue'
	import customRefresher from '@/uni/custom-refresher/custom-refresher.vue'
	export default {
		components: {
			zPaging,
			customRefresher
		},
		data() {
			return {
				topBarHeight: 188,
				list: ['文章', '项目'],
				curNow: 0,
				blogList: [],
				softwareList: [],
				projectList: [],
				keyword: ''
			}
		},
		onLoad(param) {
			this.topBarHeight = util.getTopBarHeight() + 100
			let type = param.type
			this.curNow = type ? type : 0
			this.init()
		},
		methods: {
			search() {
				if (this.curNow == 0) {
					this.$refs.blogPaing.reload()
				} else {
					this.$refs.projectPaing.reload()
				}
			},
			sectionChange(index) {
				this.curNow = index;
			},
			async getBlogList(pageNo, pageSize) {
				let res = await searchApi.search(pageNo, this.keyword, this.curNow)
				this.$refs.blogPaing.complete(res.data);
			},
			async getProjectList(pageNo, pageSize) {
				let res = await searchApi.search(pageNo, this.keyword, this.curNow)
				this.$refs.projectPaing.complete(res.data);
			},
			async init() {

			}
		}
	}
</script>

<style scoped>
	.sea-subsection {
		position: fixed;
		width: 100%;
		z-index: 999;
		top: 276rpx;
	}
</style>
