<template>
	<view>
		<view>
			<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
		</view>
		<u-cell-group v-if="curNow == 0">
			<u-cell :title="item.title" v-for="(item, index) in list12" isLink @click="jump_yanxuexq"></u-cell>
			
			<u-cell :title="item.title" v-for="(item, index) in list18" isLink @click="jump_danxiangqing"></u-cell>
		</u-cell-group>
		<u-cell-group v-if="curNow == 1">
			<u-cell :title="item.title" v-for="(item, index) in list20" isLink @click="jump_jzlb"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list13" isLink @click="jump_wm1"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list16" isLink @click="jump_dlb"></u-cell>
		</u-cell-group>
		<u-cell-group v-if="curNow == 2">
			<u-cell :title="item.title" v-for="(item, index) in list15" isLink @click="jump_wmxd"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list19" isLink @click="jump_danxd"></u-cell>
			<u-cell :title="item.title" v-for="(item, index) in list21" isLink @click="jump_jzxd"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['订单详情', '订单列表', '下单'],
				curNow: 0,
				list12: [{
					title: '详情1',
				}],
				list13: [{
					title: '列表2',
				}],
				
				list15: [{
					title: '下单1',
				}],
				list16: [{
					title: '列表3',
				}],

				list18: [{
					title: '详情2',
				}],
				list19: [{
					title: '下单2',
				}],
				list20: [{
					title: '列表1',
				}],
				list21: [{
					title: '下单3',
				}],
			}
		},
		methods: {
			jump_yanxuexq() {
				uni.navigateTo({
					url: "/pages/order_details/a"
				})
			},
			sectionChange(index) {
				this.curNow = index;
			},
			jump_wm1() {
				uni.navigateTo({
					url: "/pages/order/a"
				})
			},
			
			jump_wmxd() {
				uni.navigateTo({
					url: "/pages/payment/c"
				})
			},
			jump_dlb() {
				uni.navigateTo({
					url: "/pages/order/c"
				})
			},
			jump_danxiangqing() {
				uni.navigateTo({
					url: "/pages/order_details/b"
				})
			},
			jump_danxd() {
				uni.navigateTo({
					url: "/pages/payment/a"
				})
			},
			jump_jzlb() {
				uni.navigateTo({
					url: "/pages/order/b"
				})
			},
			jump_jzxd() {
				uni.navigateTo({
					url: "/pages/payment/b"
				})
			},
		}
	}
</script>

<style>
</style>
