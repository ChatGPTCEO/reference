<template>
	<view>
		<!-- tabs -->
		<view class="tabs">
			<u-tabs :list="tabsList" :is-scroll="false" :current="tabsCurrent" bg-color="#fff" show-bar active-color="#333"
			 :bar-style="{backgroundColor: '#f29100'}" @change="tabsChange">
			</u-tabs>
		</view>
		<!-- list -->
		<view class="list">
			<view class="u-padding-80">
				<u-empty text="您还没有相关记录呢" mode="order"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [{
					name: '全部'
				}, {
					name: '砍价中'
				}, {
					name: '砍价成功'
				}, {
					name: '砍价失败'
				}],
				tabsCurrent: 0
			};
		},
		methods: {
			tabsChange(index) {
				this.tabsCurrent = index;
			}
		}
	}
</script>

<style lang="scss">
</style>
