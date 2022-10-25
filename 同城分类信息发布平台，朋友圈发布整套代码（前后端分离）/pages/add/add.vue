<template>
	<view>
		<view class="logo">
			<image src="/static/img/logo.png" mode="widthFix"></image>
		</view>
		<view class="add-option">
			<view class="add-option-item" @click="toPublish(1)">
				<u-icon color="blue" name="file-text" size="60"></u-icon>
				<text class="u-m-t-10">发帖子</text>
			</view>
			<view class="add-option-item" @click="toPublish(2)">
				<u-icon name="moments" color="green" size="60"></u-icon>
				<text class="u-m-t-10">发动态</text>
			</view>
			<view class="add-option-item" @click="toPublish(3)">
				<u-icon color="red" name="order" size="60"></u-icon>
				<text class="u-m-t-10">发文章</text>
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
		// onShow() {
		// this.utils.isLogin()
		// },
		methods: {
			toPublish(type) {
				if(type==1||type==2){
					uni.navigateTo({
						url: "./create?type=" + type
					})
				}else{
					 uni.showModal({
						title:'提示',
						content:'请完成资格认证后再发布文章',
					 	confirmText:'认证',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url:'../square/apply'
								})
							}
						}
					 })
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f1f1f1;
	}
	.logo {
		position: absolute;
		top: 30%;
		left: 25%;
		right: 25%;
		opacity: 0.6;
	}
	.add-option {
		width: 80%;
		background: #FFFFFF;
		position: absolute;
		bottom: 60rpx;
		left: 10%;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx 0;
		box-shadow: 0rpx 0rpx 5rpx 1rpx rgba(0, 0, 0, 0.2);
	}

	.add-option:before,
	.add-option:after {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		left: 0;
		right: 0;
		border: 30rpx solid transparent;
		margin: auto;
	}

	.add-option:before {
		z-index: 1;
		bottom: -56rpx;
		border-top-color: white;
	}
	.add-option:after {
		bottom: -60rpx;
		border-top-color: rgba(0, 0, 0, 0.1);
	}
	.add-option-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
