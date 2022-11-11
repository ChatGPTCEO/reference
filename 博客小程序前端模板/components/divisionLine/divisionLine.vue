<template>
	<view :style="{ height: height +'rpx'}" style="background-color: #f6f6f6;">
	</view>
</template>

<script>
	export default {
		// 分割线
		name: "divisionLine",
		props: {
			height: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
