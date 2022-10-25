<template>
	<view class="container">
		<view class="status-bar"></view>
		<button @tap="toPage('list')" class="btn" type="primary">列表</button>
		<button @tap="toPage('comment')" class="btn" type="primary">评论</button>
		<button @tap="toPage('publish')" class="btn" type="primary">发布</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	onLoad() {

	},
	methods: {
		toPage(url){
			uni.navigateTo({ url })
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	padding: 40rpx;
	overflow: hidden;
	background-color: #F9F9F9;
}
.btn{
	margin-bottom: 40rpx;
}
</style>
