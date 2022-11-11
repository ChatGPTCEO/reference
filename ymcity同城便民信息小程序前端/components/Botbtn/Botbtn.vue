<template>
	<view>
		<view class="botbtn">
			<u-button style="flex: 1;" type="primary" @click="confirem">{{btntext}}</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Botbtn",
		props: {
			btntext: {
				type: String,
				default: '提交'
			},
		},
		data() {
			return {

			};
		},
		methods: {
			confirem() {
				this.$u.throttle(this.$emit('confirem','submit'), 500);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.botbtn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 120rpx;
		padding: 20rpx;
		z-index: 10000;
	}
</style>
