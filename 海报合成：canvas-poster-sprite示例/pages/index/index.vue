<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<image 
			v-if="path" 
			:src="path" 
			:style="'width: 750rpx; height: '+height+'rpx;'">
		</image>
		<xlcanvas 
			v-if="isReady"
			:param="param" 
			@fail="fail" 
			@success="success">
		</xlcanvas>
	</view>
</template>

<script>
	import xlcanvas from '../../components/canvas/index.vue'
	import { posParam, zmParam } from './param.js'
	import { getCanvasParam } from './model.js'
	export default {
		data() {
			return {
				title: 'Hello',
				isReady : false,
				height:1334,
				param : {},
				path : "",
			}
		},
		components:{
			xlcanvas
		},
		onLoad() {
			//demo-1 商品二维码海报
			// this.param = posParam;
			
			//demo-2 邀请注册海报
			// this.param = zmParam;
			
			//demo-3 高级用法-商品列表
			this.height = 2016;
			this.param = getCanvasParam();
			
			this.isReady = true;
		},
		methods: {	
			fail(e){
				console.log("合成失败：", e);
			},
			success(e){
				console.log("合成成功：", e);
				this.path = e.res.tempFilePath;
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
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
