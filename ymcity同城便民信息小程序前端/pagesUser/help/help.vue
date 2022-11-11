<template>
	<view>
		<u-cell-group>
			<block v-for="(item,index) in list" :key="index">
				<u-cell-item :title="item.title" @click="$u.route('/pagesUser/textmain/textmain',{id:item.id})"></u-cell-item>
			</block>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			})
			this.$u.get('/addons/hicity/index/getHelpList', {}).then(res => {
				uni.hideLoading()
				this.list = res;
			})
		}
	}
</script>

<style lang="scss" scoped>

</style>
