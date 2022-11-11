<template>
	<view class="content">
		<button class="text-area" @click="success">
			<text class="title">成功</text>
		</button>
		<button class="text-area" @click="warning">
			<text class="title">警告</text>
		</button>
		<button class="text-area" @click="error">
			<text class="title">失败</text>
		</button>
		<button class="text-area" @click="info">
			<text class="title">信息</text>
		</button>
		<view class="text-area">
			<text class="title">{{returnClick}}</text>
		</view>
		<chenfly-confirm></chenfly-confirm>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				returnClick: ""
			}
		},
		onLoad() {

		},
		methods: {
			success(){
				this.confirm_({
					name: "success",
					type: "success",
					message: "保存成功！"
				})
			},
			warning(){
				this.confirm_({
					name: "warning",
					type: "warning",
					message: "保存警告！",
					mask: true,
					closed: true,
					close: () => {this.returnClick = "保存警告close"}
				})
			},
			error(){
				this.confirm_({
					name: "error",
					type: "error",
					message: "保存失败！",
					closed: true,
					close: () => {this.returnClick = "保存失败close"}
				})
			},
			info(){
				this.confirm_({
					name: "info",
					type: "info",
					message: "保存信息！",
					confirmText: "保存", 
					cancelText: "取消",  
					confirm: () => {this.returnClick = "保存信息confirmText"},
					cancel: () => {this.returnClick = "保存信息cancelText"}, 
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin: 16px 0;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
