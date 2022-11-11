<template>
	<view>
		<navigationBar :text="projectDetail.projectName ? projectDetail.projectName : '项目详情'" backgroundColor="#5af"
			:back="true">
		</navigationBar>
		<loading v-if="loading"></loading>
		<view v-else>
			<view class="info-title">{{projectDetail.projectName}}</view>
			<divisionLine></divisionLine>
			<view class="imgs" v-if="projectDetail.imgList.length > 0">
				<u-swiper :list="projectDetail.imgList" previousMargin="30" nextMargin="30" circular :autoplay="true"
					@click="showImgs" radius="30" showTitle height="400">
				</u-swiper>
			</view>
			<view class="tags">
				<imgTag v-for="(item,index) in projectDetail.tags" :key="index" :tagItem="item"></imgTag>
			</view>
			<view class="info-content">
				<markdownParse :resource="projectDetail.content"></markdownParse>
			</view>
		</view>
		<liability :text="liability"></liability>

	</view>
</template>

<script>
	import markdownParse from '@/uni/markdownParse/index.vue'
	import projectApi from '@/api/projectApi.js'
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	export default {
		components: {
			markdownParse
		},
		data() {
			return {
				projectId: 0,
				loading: false,
				projectDetail: {},
				liability: ''
			}
		},
		onLoad(param) {
			let projectId = param.projectId
			this.projectId = projectId ? projectId : 0
			this.getProjectDetail()
			this.init()
		},
		methods: {
			async init() {
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.LIABILITY)
				console.log("========",res)
				this.liability = res.data
			},
			async getProjectDetail() {
				this.loading = true
				let res = await projectApi.getProjectDetail(this.projectId)
				this.projectDetail = res.data
				this.loading = false
			},
			showImgs(index) {
				uni.previewImage({
					current: index,
					urls: this.projectDetail.imgList,
					indicator: 'indicator'
				})
			},
		}
	}
</script>

<style scoped>
	.info-title {
		padding: 40rpx 30rpx 20rpx 30rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		font-weight: bold;
		background: #fff;
	}

	.imgs {
		margin: 20rpx;
	}

	.tags {
		min-height: 100rpx;
		margin: 0 20rpx;
	}

	.info-content {
		margin: 0 20rpx;
	}
</style>
