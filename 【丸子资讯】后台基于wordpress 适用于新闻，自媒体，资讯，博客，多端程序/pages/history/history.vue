<template>
	<view class="content">
		<article-list :posts="posts"></article-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
posts:[],
			}
		},
		onLoad() {
			let res = uni.getStorageSync('readLogs')
			this.posts = res
		},
		methods: {

		}
	}
</script>

<style>

</style>
