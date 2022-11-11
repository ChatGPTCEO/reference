<template>
	<view>
		<navigationBar text="专业服务" backgroundColor="#5af" :back="true">
		</navigationBar>
		<timeLine :time-list="timeLineList" v-if="timeLineList.length > 0"></timeLine>
	</view>
</template>

<script>
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	export default {

		data() {
			return {
				timeLineList: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			async init() {
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.SERVER_TIME_LIME)
				this.timeLineList = JSON.parse(res.data)
			},
		}
	}
</script>
