<template>
	<view>
		<view class="result">
			<u-icon name="checkmark-circle" color="#19be6b" size="200"></u-icon>
			<view class="tips">
				<block v-if="type=='push'">
					<text class="text">发布成功</text>
					<text class="text">可以前往“发布管理”进行置顶等操作哦！</text>
				</block>
				<block v-else>
					<text class="text">发布成功</text>
					<text class="text">可以前往“我的简历”进行是否公开操作哦！</text>
				</block>
			</view>
			<view class="btnbox">
				<view class="btn">
					<u-button type="success" @click="$u.route({type:'back'})" shape="circle">返回</u-button>
				</view>
				<view class="btn" v-if="type=='push'">
					<u-button type="warning" @click="$u.route('/pagesUser/push/push')" shape="circle">发布管理</u-button>
				</view>
				<view class="btn" v-else>
					<u-button type="warning" @click="$u.route('/pagesUser/resume/resume')" shape="circle">我的简历
					</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'push'
			};
		},
		onLoad(e) {
			this.type = e.type
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
