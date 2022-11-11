<template>
	<view>
	<u-navbar title="专题列表" backIconColor="#fff" titleColor="#fff" :background="background"></u-navbar>
	<list></list>
	<!-- top -->
	<u-back-top :scrollTop="scrollTop" :mode="modeTop" :bottom="bottomTop" :right="rightTop" :top="top"
		:icon="iconTop" :custom-style="customStyle" :icon-style="iconStyleTop" :tips="tips">
	</u-back-top>
	</view>
</template>

<script>
	import list from '@/components/list'
	export default {
		components:{list},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, #2BC3C8, #84E7B9)'
				},
				// top
				scrollTop: 0,
				modeTop: 'circle',
				bottomTop: 200,
				rightTop: 40,
				top: 600,
				iconTop: 'arrow-up',
				iconStyleTop: {
					color: '#ffffff',
					fontSize: '30rpx'
				},
				customStyle: {
					backgroundColor: '#39CCCC',
					color: '#ffffff'
				},
				tips: '顶部',
			}
		},
		onLoad() {
			
		},
		methods:{
			// 回到顶部
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
