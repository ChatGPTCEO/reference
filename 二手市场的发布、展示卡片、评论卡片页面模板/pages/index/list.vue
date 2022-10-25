<template>
	<view class="container">
		<view class="status-bar"></view>
		<view class="list">
			<!--列表-->
			<card :list="list"></card>
		</view>
	</view>
</template>

<script>
import card from '@/components/card/index.vue'
export default {
	components: {card},
	data() {
		return {
			list: [
				{
					images: [1],
					tags: 2
				},
				{
					images: [1,2,3,4],
					tags: 6
				},
				{
					images: [1,2,3,4,5],
					tags: 2
				}
			]
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow: hidden;
	background-color: #F9F9F9;
}
.list{
	overflow-y: auto;
	height: calc(100vh - var(--status-bar-height));
}
</style>
