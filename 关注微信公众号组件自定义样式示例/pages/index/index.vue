<template>
	<view>
		<custom-tabs index="0" :animation="true" tabPadding="40" :scrollY="true" :flex="false" @changeIndex="changeIndex">
			<custom-tab-pane label="标签一">
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
				<view style="height: 100px;">内容1</view>
			</custom-tab-pane>
			<custom-tab-pane label="标签二">内容2</custom-tab-pane>
			<custom-tab-pane label="标签三3">内容3</custom-tab-pane>
			<custom-tab-pane label="标签四44">内容4</custom-tab-pane>
			<custom-tab-pane label="标签五555">内容5</custom-tab-pane>
			<custom-tab-pane label="标签六6666">内容6</custom-tab-pane>
			<custom-tab-pane label="标签七77777">内容7</custom-tab-pane>
		</custom-tabs>
	</view>
</template>
<script>
	export default {
		// #ifdef VUE2
		methods: {
			changeIndex(index) {
				console.log('改变了index:', index)
			}
		},
		// #endif
		// #ifdef VUE3
		setup() {
			function changeIndex(index) {
				console.log('改变了index:', index)
			}
			return {
				changeIndex
			}
		}
		// #endif
	}
</script>
<style scoped lang="scss">
</style>
