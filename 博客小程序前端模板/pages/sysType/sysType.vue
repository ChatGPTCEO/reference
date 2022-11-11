<template>
	<view>
		<anchorLine leftText="全部分类" leftEnglish="type"></anchorLine>
		<loading v-if="loading"></loading>
		<view class="type-container" v-else>
			<sysTypeItem v-for="(item,index) in sysTypeList" :key="index" :sysTypeItem="item"></sysTypeItem>
		</view>
	</view>
</template>

<script>
	import projectApi from '@/api/projectApi.js'
	export default {
		data() {
			return {
				loading: false,
				sysTypeList: []
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			async initData() {
				this.loading = true
				let res = await projectApi.getProjectType()
				this.sysTypeList = res.data
				this.loading = false
			}
		}
	}
</script>

<style scoped>
	.type-container {
		display: flex;
		flex-wrap: wrap;
		margin: 0 25rpx;
	}
</style>
