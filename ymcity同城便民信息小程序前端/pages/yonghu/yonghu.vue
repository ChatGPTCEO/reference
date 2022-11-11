<template>
	<view>
		<view class="ym-head">
			<view class="ym-head-left">
				<text>个人中心</text>
			</view>
			<view class="ym-head-right">
				<u-icon name="photo"></u-icon>
				<u-icon name="photo"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.ym-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.ym-head-left {
			flex: 1;
			font-size: 28rpx;
			color: white;
		}
	}
</style>
