<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<orange-fullloading :loadicon="loadicon" :loadshow="loadshow" text="加载中" textcolor="#f30" textsize="30"></orange-fullloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello World',
				loadshow:true,
				loadicon:'../../static/orange-fullloading/loading.gif'
			}
		},
		onLoad() {
			//延时控制全屏加载，实际项目中可根据数据调用自由控制
			setTimeout(() => {
				this.loadshow = false
			}, 2000)
		},
		methods: {

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
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
