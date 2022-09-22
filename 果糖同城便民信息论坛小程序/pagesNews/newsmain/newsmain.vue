<template>
	<view class="main" v-if="main">
		<view class="title">
			<text>{{main.title}}</text>
		</view>
		<view class="user">
			<text>{{main.author}}</text>
			<text style="margin-left: 20rpx;">{{main.createtime_text}}</text>
			<text style="margin-left: 20rpx;">{{main.view_count}}阅读</text>
		</view>
		<view class="cont">
			<u-parse :html="main.content"></u-parse>
		</view>
		<view class="bottool">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				main:null,
			};
		},
		onLoad(e) {
			this.$u.get('/addons/hicity/news/main', {
				id: e.id
			}).then(res => {
				this.main = res;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: white;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
		}

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;
			color: #666666;
		}
		.cont {
			padding: 20rpx;
			font-size: 30rpx;
			// color: $u-content-color;
			line-height: 1.6;
		}
	}
</style>
