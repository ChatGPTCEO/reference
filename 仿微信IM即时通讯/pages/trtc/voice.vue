<template>
	<view>
		<cu-custom bgColor="bg-grey" :isBack="true">
			<block slot="content"></block>
		</cu-custom>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	
	export default {
		computed: mapState(['userId', 'hasLogin']),
		data() {
			return {
				data:{
					title:"语音通话"
				}
			}
		},
		onLoad(options) {
			return core.toast('暂未开放','back','error');
		},
		onShow() {
			
		},
		onUnload() {
			
		},
		methods:{
		}
	}
</script>

<style>
</style>
