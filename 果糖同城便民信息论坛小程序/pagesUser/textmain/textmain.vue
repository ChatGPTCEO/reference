<template>
	<view>
		<view class="u-content" v-if="main">
			<view class="title">
				<text>{{main.title}}</text>
			</view>
			<u-parse :html="main.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				main: null,
			};
		},
		onLoad(e) {
			this.id = e.id;
			uni.showLoading({
				title: '加载中'
			})
			this.$u.get('/addons/hicity/index/getTextMain', {
				id: this.id
			}).then(res => {
				uni.hideLoading()
				if (res) {
					this.main = res;
				}
			})
		}
	}
</script>
<style>
	page{
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	.u-content {
		margin: 20rpx;
		.title{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin-bottom: 30rpx;
		}
	}
</style>
