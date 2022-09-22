<template>
	<view class="ccontent">
		<!--pages/view/view.wxml-->
		<web-view :src="url"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			}
		},
		onLoad: function (options) {
				if( options.url ) {
					let url = decodeURIComponent( options.url )
					if( url.indexOf('*') != -1 ) {
						url = url.replace("*", "?")
					}
					url = url.replace("http://", "https://")
					this.url=url;
				} else {
					uni.showModal({
						title: '提示',
						content: '业务域名不能为空，请检查',
						success: response => {
							console.log(response)
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					})
				}
			},
		methods: {
			
		}
	}
</script>

<style>

</style>
