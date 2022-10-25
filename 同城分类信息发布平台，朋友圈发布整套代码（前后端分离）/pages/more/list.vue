<template>
	<view>
		<u-swiper :list="swipers" effect3d @click="clickSwiper"></u-swiper>
		<view class="u-p-20" style="background: #F1F1F1;">
			<u-section :title="topic+'信息'" @click="tomore"></u-section>
		</view>
		<view class="u-m-10">
			<forum-list-card :forum="forum"></forum-list-card>
			<u-loadmore :status="status" @loadmore="loadmore" />
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				forum: [],
				swipers: [],
				topic: '',
				page: 0,
				pid: 0,
				status: 'loadmore',
				scrollTop:0
			}
		},
		onLoad(e) {
			this.topic = e.topic
			this.pid = e.pid
			this.getData()
		},
		onReachBottom() {
			if(this.status=='loadmore'){
				this.status='loading'
			}
			if(this.status=='nomore') return;
			this.page++;
			this.getData();
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		methods: {
			async getData() {
				const params = {
					page: this.page,
					pid: this.pid
				}
				const res = await this.$u.api.more(params)
				if (this.page == 0) {
					this.swipers = res.data.swiper
					this.swipers.forEach(item => {
						item.image = this.$u.http.config.baseUrl + item.image
					})
				}
				if (res.data.forum.length < 15) {
					this.status = 'nomore'
				}
				res.data.forum.forEach(item => {
					item.isLike = false
				})
				this.forum = [...this.forum, ...res.data.forum]
			},
			async clickSwiper(index) {
				const res = await this.$u.api.bannerCount({
					id: this.swipers[index].id
				})
				if (res.code == 1) {
					if (this.$u.test.isEmpty(this.swipers[index].url))
						return false;
					uni.navigateTo({
						url: '/pages/browser/browser?url=' + this.swipers[index].url
					})
				}
			},
			loadmore() {
				this.page++
				this.getData()
			},
			tomore() {
				uni.navigateTo({
					url: './more'
				})
			},
			
		}
	}
</script>

<style>

</style>
