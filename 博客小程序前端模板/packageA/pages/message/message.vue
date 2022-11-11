<template>
	<view class="message-container">
		<navigationBar text="说点啥" backgroundColor="#5af" :back="true">
		</navigationBar>
		<view class="message-tip-title">
			留言反馈内容
		</view>
		<u--textarea v-model="message.content" :height="200" placeholder="说点什么..." count></u--textarea>
		<view class="message-tip-title">
			联系人
		</view>
		<u--input placeholder="请输入联系人" border="surround" v-model="message.name"></u--input>
		<view class="message-tip-title">
			联系电话
		</view>
		<u--input placeholder="请输入联系电话" border="surround" v-model="message.phone"></u--input>
		<button class="parse-url-btn" @click="saveMessage">提交</button>
	</view>
</template>

<script>
	import Util from '@/utils/util.js'
	import userApi from '@/api/userApi.js'
	export default {
		data() {
			return {
				message: {
					content: '',
					name: '',
					phone: ''
				}
			}
		},
		methods: {
			async saveMessage() {
				if (Util.stringIsEmpty(this.message.content)) {
					Util.showMyToast('总得提交点啥吧...');
					return;
				}
				if (Util.stringIsEmpty(this.message.name)) {
					Util.showMyToast('总得搞个别名吧...');
					return;
				}
				if (Util.stringIsEmpty(this.message.phone)) {
					Util.showMyToast('总得告诉我你的联系方式吧...');
					return;
				}
				let res = await userApi.saveMessage(this.message)
				this.message = {}
				Util.showMyToast('感谢反馈...');
			}
		}
	}
</script>

<style scoped>
	.message-container {
		margin: 0 30rpx;
	}

	.message-tip-title {
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		font-size: 28rpx;
	}

	.parse-url-btn {
		width: calc(100vw - 120rpx);
		height: 78rpx;
		background: #55aaff;
		border-radius: 39rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
