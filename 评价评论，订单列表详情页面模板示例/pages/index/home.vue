<template>
	<view>
		<u-cell-group>
			<u-cell :title="item.title" v-for="(item, index) in list0" isLink @click="jump_pingjia1"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list2" isLink @click="jump_pingjia2"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list3" isLink @click="jump_pingjia3"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list4" isLink @click="jump_pingjia4"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list5" isLink @click="jump_pingjia5"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list6" isLink @click="jump_dongtai"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list7" isLink @click="jump_liebiao1"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list8" isLink @click="jump_liebiao2"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list9" isLink @click="jump_liebiao3"></u-cell>
		</u-cell-group>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list0: [{
					title: '评价1',
				}],
				list2: [{
					title: '评价2',
				}],
				list3: [{
					title: '评价3',
				}],
				list4: [{
					title: '评价4',
				}],
				list5: [{
					title: '评价5',
				}],
				list6: [{
					title: '评价6',
				}],
				list7: [{
					title: '列表1',
				}],
				list8: [{
					title: '列表2',
				}],
				list9: [{
					title: '列表3',
				}],
			}
		},

		methods: {

			jump_pingjia1() {
				uni.navigateTo({
					url: "/pages/evaluate/one"
				})
			},
			jump_pingjia2() {
				uni.navigateTo({
					url: "/pages/evaluate/two"
				})
			},
			jump_pingjia3() {
				uni.navigateTo({
					url: "/pages/evaluate/three"
				})
			},
			jump_pingjia4() {
				uni.navigateTo({
					url: "/pages/evaluate/four"
				})
			},
			jump_pingjia5() {
				uni.navigateTo({
					url: "/pages/evaluate/five"
				})
			},
			jump_dongtai() {
				uni.navigateTo({
					url: "/pages/evaluate/six"
				})
			},
			jump_liebiao1() {
				uni.navigateTo({
					url: "/pages/evaluation_list/a"
				})
			},
			jump_liebiao2() {
				uni.navigateTo({
					url: "/pages/evaluation_list/b"
				})
			},
			jump_liebiao3() {
				uni.navigateTo({
					url: "/pages/evaluation_list/c"
				})
			}
		}
	}
</script>
<style>
</style>
