<template>
	<view>
		<u-navbar :is-back="true" title="动态列表"></u-navbar>
		<u-cell-item icon="list-dot" title="七彩虹加载效果"  @click="jiazai()"></u-cell-item>
		<u-cell-item icon="list-dot" title="七彩虹旋转效果" @click="xuanzhuan()"></u-cell-item>
		
		
		<loading v-if="show1"></loading>
		<loading1 v-if="show2"></loading1>
	</view>
</template>

<script>
	import loading from "../../components/kg-loading/loading.vue"
	import loading1 from "../../components/kg-loading/loading1.vue"
	export default {
		components: {
			loading,
			loading1
		},
		data() {
			return {
				show1:false,
				show2:false,
			};
		},
		methods:{
			jiazai(){
				let that = this
				that.show1 = true
				setTimeout(() => {
					that.show1 = false
				}, 3000);
			},
			xuanzhuan(){
				let that = this
				that.show2 = true
				setTimeout(() => {
					that.show2 = false
				}, 3000);
			}
		}
	}
</script>

<style lang="less">

</style>
