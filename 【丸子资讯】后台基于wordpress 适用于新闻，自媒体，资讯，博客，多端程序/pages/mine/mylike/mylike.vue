<template>
	<view class="content">
<article-list :posts="posts"></article-list>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				isLastPage: false,
				posts:[],
				status:'loading'
			}
		},
		onLoad() {
			this.getUserLikePosts();
		},
		methods: {
			getUserLikePosts: function(args) {
				API.getLikePosts(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false
					}).then(res => {
						this.getTags({
							per_page: 1,
							page: this.page
						})
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	}
</script>

<style>

</style>
