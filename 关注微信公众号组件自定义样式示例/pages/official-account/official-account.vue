<template>
	<view>
		<custom-official-account class="cont" msg="关注微信公众号，海量资料任你查阅！" :isFollow="false" :max="5"></custom-official-account>
	</view>
</template>
<style scoped>
	.cont {
		position: fixed;
		top: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 700rpx;
	}
</style>
