<template>
	<view class="body-wrap">
		<view class="score-header">
			<text class="title">当前剩余积分：</text>
			<u-count-to :startVal="0" :endVal="999" color="#FFBE59"></u-count-to>
		</view>

		<u-cell-group>
			<u-cell title="点评获得积分奖励" label="2022-3-11 17:08" value="+5"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {},
		methods: {}
	};
</script>

<style lang="scss">
	.body-wrap {
		background-color: #FFFFFF;
	}

	.score-header {
		color: $u-content-color;
		padding: 32rpx;
		font-weight: bold;
		font-size: $u-p;
	}
</style>
