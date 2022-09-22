<template>
	<view class="content">
		<article-list :posts="posts"></article-list>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				posts:[],
				page:1,
				isLastPage:false,
				status:"loading",
			}
		},
		onLoad() {
			this.getStickyPosts();
		},
		onPullDownRefresh() {
			this.posts=[];
			this.page=1;
			this.isLastPage=false;
			this.getStickyPosts();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(!this.isLastPage) {
				this.getStickyPosts({
					page: this.page
				})
			}
		},
		methods: {
			getStickyPosts: function(args) {
				API.getStickyPosts(args).then(res => {
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
.content{
	padding-bottom:100rpx;
}
</style>
