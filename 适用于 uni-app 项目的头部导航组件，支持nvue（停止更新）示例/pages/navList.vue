<template>
	<view class="page">
		<nav-bar :back="false">案例展示</nav-bar>
		<view class="nav_list" @click="onPageJump('/pages/demo')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>默认固定导航 (nvue版)</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo1')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>不固定导航</text>
		</view> 
		<view class="nav_list" @click="onPageJump('/pages/demo2')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>透明导航</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo3')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>透明固定导航 (nvue版)</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo10')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>颜色渐变固定导航</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo11')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>复杂的颜色渐变导航</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo4')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>显示首页按钮、标题居左、字体颜色、背景颜色</text>
		</view>
		<view class="nav_list" @click="onShare('/pages/demo5')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>分享出去的页面效果</text>
		</view>
		<view class="nav_list" @click="onSwitchTab('/pages/demo6')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>左插槽-地址选择</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo7')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>中插槽-搜索框</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo8')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>右插槽-搜索图标</text>
		</view>
		<view class="nav_list" @click="onPageJump('/pages/demo9')">
			<image src="../static/icon_case.png" mode="aspectFit"></image>
			<text>动态改变标题、字体颜色、背景颜色</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		onPageJump(url){
			uni.navigateTo({
				url:url
			});
		},
		onShare(url){
			uni.reLaunch({
				url:url
			});
		},
		onSwitchTab(url){
			uni.switchTab({
				url:url
			});
		},
	}
};
</script>
<style lang="scss" scoped>
.page {
	padding-top: 20upx;
}
.nav_list {
	background-color: #fff;
	padding: 30upx;
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 10upx;
	&:active {
		background-color: #F5f5f5;
	}
	image {
		width: 40upx;
		height: 40upx;
	}
	text {
		font-size: 28upx;
		color: #333;
		margin-left: 30upx;
	}
	&::after {
		content: '';
		position: absolute;
		right: 30upx;
		top: 50%;
		transform: translateY(-50%);
		width: 40upx;
		height: 40upx;
		background-image: url('../static/icon_right.png');
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
}
</style>
