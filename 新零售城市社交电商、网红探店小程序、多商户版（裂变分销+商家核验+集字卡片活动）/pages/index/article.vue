<template>
	<view class="">
		<u-navbar back-text="返回" :title="info.title"></u-navbar>
		<view class="content">
			<!-- 正文内容 -->
			<view class="box shadow">
				<u-parse :html="info.content.content" show-with-animation lazy-load></u-parse>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				info: '',
			};
		},
		onLoad(res) {
			//console.log('接受的id', res)
			this.$u.get('api/article/detail/' + res.id).then(e => {
				this.info = e.data
			})
		},
		methods: {
			// 路由跳转
			toRoute(params) {
				this.$u.route(params)
			},
		}
	}
</script>
<style lang="scss" scoped>
	/*公共样式 */
	// @import "/common/common.css";
	/*自定义UI库 */
	@import "/common/dev-yuchen.css";

	page {
		background-color: #f0f0f0;
	}

	.content {}

	.shadow {
		-webkit-box-shadow: #F7F7F7 0rpx 0rpx 20rpx 10rpx;
		-moz-box-shadow: #F7F7F7 0rpx 0rpx 20rpx 10rpx;
		box-shadow: #F7F7F7 0rpx 0rpx 20rpx 8rpx;
	}

	.box {
		margin: 20rpx $gutter;
		padding: 20rpx $gutter;
		background-color: #ffffff;
		border-radius: 30rpx;
		//font-size: 20rpx;
		//color: #d1b16b;
	}
</style>
