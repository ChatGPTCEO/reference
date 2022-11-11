<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">参与结果</block>
		</cu-custom>
		<view class="solids-bottom padding-xs flex align-center bg-white radius">
			<view class="flex-sub text-center">
				<view class="text-xsl">
					<text class="cuIcon-roundcheckfill text-green"></text>
				</view>
				<view class="padding">参与成功</view>
				<view class="padding">等待开奖</view>
			</view>
		</view>
		<view>
			<button class="cu-btn  block margin-sm  bottom-btn bg-red" @tap="detailSub">查看参与记录</button>
			<button class="cu-btn  block margin-sm  bottom-btn line-gray" @tap="homeSub">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			homeSub() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
		}
	}
</script>

<style>
</style>
