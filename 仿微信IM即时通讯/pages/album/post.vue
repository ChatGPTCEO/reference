<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		data() {
			return {
				data:{
					title:"发布动态"
				}
			}
		},
		onLoad() {
			return core.toast('暂未开放','back','error');
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
