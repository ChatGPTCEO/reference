<template>
	<view>
		<q-discuss-list :list="discussList" :loadStatus="loadStatus"></q-discuss-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				discussList: [],
				loadStatus: "loadmore",
				page: 1
			};
		},
		onLoad() {
			this.getDiscussList();
		},
		onReachBottom() {
			this.page++;
			this.getDiscussList();
		},
		methods: {
			getDiscussList() {
				this.loadStatus = "loading";
				this.$H.post("discuss/myDis", {
					page: this.page
				}).then(res => {
					this.discussList = this.discussList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
