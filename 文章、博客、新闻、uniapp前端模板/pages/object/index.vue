<template>
	<view>
		<u-navbar title="专题" :is-back="false" titleColor="#fff" :background="background"></u-navbar>
		<view>
			<view v-for="(item,index) in 10" :key="index" @click="toUrl">
				<view class="u-p-20">
					<u-image src="https://cdn.uviewui.com/uview/swiper/2.jpg" height="280" border-radius="6"></u-image>
					<view class="u-m-t-20 u-line-1 weight">身无彩凤双飞翼，身无彩凤双飞翼，心有灵犀一点通心有灵犀一点通</view>
					<view class="u-m-t-10 u-font-sm ztitle u-line-2">身无彩凤双飞翼，心有灵犀一点通身无彩凤双飞翼，心有灵犀一点通身无彩凤双飞翼，心有灵犀一点通身无彩凤双飞翼，心有灵犀一点通</view>
				</view>
				<u-gap bgColor="#ededed" height="20"></u-gap>
			</view>
		</view>
		<u-back-top :scrollTop="scrollTop" :mode="modeTop" :bottom="bottomTop" :right="rightTop" :top="top"
			:icon="iconTop" :custom-style="customStyle" :icon-style="iconStyleTop" :tips="tips">
		</u-back-top>
	</view>
</template>

<script>
	export default {
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
		methods: {
			toUrl(){
				this.$common.navigateTo('/pages/object/objectList')
			},
			// 回到顶部
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ztitle {
		color: #A5A5A5;
	}
	.weight{
		font-weight: 700;
	}
</style>
