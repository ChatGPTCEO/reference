<template>
	<view v-if="text">
		<divisionLine></divisionLine>
		<view class="lia-container">
			<text class="lia-title">免责声明：</text>
			<text class="lia-info">{{text}}</text>
		</view>
		<divisionLine></divisionLine>
	</view>
</template>

<script>
	export default {
		// 免责声明
		name: "liability",
		props: {
			text: {
				type: String,
				default: ''
			}
		}

	}
</script>

<style scoped>
	.lia-container {
		margin: 20rpx 30rpx;
		background-color: #ffffff;
	}

	.lia-title {
		font-weight: bold;
		font-size: 28rpx;
	}

	.lia-info {
		font-size: 28rpx;
		color: #8799a3;
	}
</style>
