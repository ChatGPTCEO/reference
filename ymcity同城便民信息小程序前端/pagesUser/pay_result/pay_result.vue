<template>
	<view>
		<view class="result">
			<u-icon name="checkmark-circle" color="#19be6b" size="200"></u-icon>
			<view class="tips">
				<block>
					<text class="text">开通成功</text>
					<text class="text">会员生效时间可能会有延迟，请留意观察！</text>
				</block>
			</view>
			<view class="btnbox">
				<view class="btn">
					<u-button type="success" @click="$u.route({type:'back'})" shape="circle">返回会员中心</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad(e) {
			
		}
	}
</script>

<style lang="scss" scoped>
	.result {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 50rpx;
		background-color: white;

		.tips {
			font-size: 28rpx;
			color: #666666;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			line-height: 50rpx;
		}

		.btnbox {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			margin-top: 50rpx;

			.btn {
				width: 280rpx;
			}
		}
	}
</style>
