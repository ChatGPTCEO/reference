<template>
	<view class="d-flex">
		<view class="pl-1  font-20 font-700 " style="background: #403835;width: 36rpx;height: 32rpx;line-height: 32rpx; color: #efaa89;display: inline-block;">V</view>
		<view class="px-1 font-member border-dark text-dark " style="height: 32rpx;line-height: 28rpx;display: inline-block;">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mtop: {
				type: "String",
				default: ""
			}
		}
	}
</script>

<style scoped>
	@import "/common/dev-yuchen.css";
</style>
