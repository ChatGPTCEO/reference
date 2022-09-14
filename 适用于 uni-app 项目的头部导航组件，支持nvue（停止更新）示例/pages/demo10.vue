<template>
	<view class="content">
		<!-- 示例代码 开始-->
		<nav-bar home :bgColor="['#f37402','#0f0']" fontColor="#FFF" title="颜色渐变导航"></nav-bar>
		<!---示例代码 结束---->
		<image src="../static/2.jpg" mode="widthFix"></image>
		<image src="../static/1.jpg" mode="widthFix"></image>
		<image src="../static/3.jpg" mode="widthFix"></image>
		<image src="../static/4.jpg" mode="widthFix"></image>
		<image src="../static/5.jpg" mode="widthFix"></image>
		<image src="../static/6.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	image {
		width: 100%;
		display: block;
	}
</style>
