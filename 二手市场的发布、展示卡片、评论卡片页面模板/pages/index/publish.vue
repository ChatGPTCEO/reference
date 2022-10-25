<template>
	<view class="container">
		<view class="status-bar"></view>
		<view class="header flex-row">
			<view class="left">
				<uni-icons type="closeempty" size="24" color="#777"></uni-icons>
			</view>
			<view class="center">发布闲置</view>
			<view class="right">发布</view>
		</view>
		<view class="body">
			<textarea v-model="content" placeholder="请输入内容" class="content" />
			<view class="images">
				<view class="item" v-for="(item, index) in 8" :key="index">
					<image src="../../static/img/test.png" class="image"></image>
					<uni-icons type="trash" size="18" color="red" class="delete"></uni-icons>
				</view>
				<view class="item upload-btn flex-row">
					<uni-icons type="plusempty" size="30" color="#ccc" class="add"></uni-icons>
				</view>
			</view>
			<view class="items">
				<view class="item flex-row">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18"></uni-icons>
						<text class="label">选择模块</text>
					</view>
					<view class="flex-row" @tap="showModule">
						<text class="value">点击选择</text>
						<uni-icons type="arrowright" color="#999" size="18"></uni-icons>
					</view>
				</view>
				<view class="item flex-row">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18"></uni-icons>
						<text class="label">闲置价格</text>
					</view>
					<view class="flex-row">
						<text class="value">来开个价吧</text>
						<uni-icons type="arrowright" color="#999" size="18"></uni-icons>
					</view>
				</view>
				<view class="item flex-row">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18"></uni-icons>
						<text class="label">联系方式</text>
					</view>
					<view class="flex-row">
						<text class="value">QQ/微信/手机号</text>
						<uni-icons type="arrowright" color="#999" size="18"></uni-icons>
					</view>
				</view>
			</view>
			<view class="protocol flex-row">
				<uni-icons type="checkbox" size="20" class="checkbox"></uni-icons>
				<view class="text">如果填写，请你知悉并同意：你的联系方式会展现给有兴趣的同学</view>
			</view>
			<!--选择模块-->
			<uni-popup type="middle" ref="module">
				<view class="module">
					<view class="item flex-row" v-for="(item, index) in 10" :key="index">
						<uni-icons type="checkbox" size="20" color="#666"></uni-icons>
						<view class="text">选项名称001</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components: {uniPopup},
	data() {
		return {
			content: ''
		}
	},
	onLoad() {
		
	},
	methods: {
		showModule(){
			this.$refs.module.open()
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow: hidden;
}
.module{
	width: 80vw;
	height: 600rpx;
	padding: 30rpx;
	overflow-y: auto;
	margin: 25vh auto 0;
	background-color: #FFF;
	
	.item{
		height: 80rpx;
		justify-content: flex-start;
		
		.text{
			margin-left: 20rpx;
		}
	}
}

.body{
	padding: 30rpx;
	overflow-y: auto;
	height: calc(100vh - 88rpx - var(--status-bar-height));
	
	.protocol{
		align-items: flex-start;
		
		.text{
			color: #999;
			font-size: 28rpx;
			width: calc(100% - 60rpx);
		}
	}
	
	.items{
		padding: 20rpx 0;
		
		.item{
			height: 100rpx;
			border-bottom: 2rpx solid #F2F2F2;
			
			.label{
				color: #666;
				font-size: 30rpx;
				margin-left: 20rpx;
			}
			
			.value{
				color: #999;
				font-size: 28rpx;
			}
		}
	}
	
	.content{
		height: 200rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		width: calc(100% - 60rpx);
		background-color: #F9F9F9;
	}
	
	.images{
		overflow: hidden;
		
		.item{
			float: left;
			margin: 20rpx 20rpx 0 0;
			width: calc((100vw - 100rpx) / 3);
			height: calc((100vw - 100rpx) / 3);
			position: relative;
			
			&:nth-child(3n){
				margin-right: 0;
			}
			
			&.upload-btn{
				cursor: pointer;
				flex-direction: column;
				justify-content: center;
				border: 2rpx solid #ededed;
			}
			
			.image{
				width: 100%;
				height: 100%;
			}
			
			.delete{
				position: absolute;
				top: 0;
				right: 0;
				z-index: 9;
			}
		}
	}
}
.header{
	height: 88rpx;
	padding: 0 30rpx 0 20rpx;
	border-bottom: 2rpx solid #F2F2F2;
	
	.left,
	.right{
		width: 100rpx;
	}
	.center{
		text-align: center;
		width: calc(100% - 200rpx);
	}
	.right{
		text-align: right;
	}
}
</style>
