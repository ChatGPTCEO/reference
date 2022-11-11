<template>
	<view class="">
		<u-navbar back-text="首页" :customBack="back" backIconName=" " :backTextStyle="backTextColor" backIconColor="#39CCCC" :background="background">
			<view class="search-wrap" @click="toSearch">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search height="56" :showAction="false"></u-search>
			</view>
		</u-navbar>
		<view class="">
			<view class="toptem">
				<u-swiper :list="swiper" border-radius="0" :effect3d="true"></u-swiper>
			</view>
			<u-gap bgColor="#ededed" height="20"></u-gap>
			<!-- list -->
			<list></list>
		</view>
		<u-back-top :scrollTop="scrollTop" :mode="modeTop" :bottom="bottomTop" :right="rightTop" :top="top" :icon="iconTop"
		 :custom-style="customStyle" :icon-style="iconStyleTop" :tips="tips">
		</u-back-top>
	</view>
</template>

<script>
	import list from '@/components/list'
	export default {
		components:{list},
		data() {
			return {
				swiper: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				background: {
					'background-image': 'linear-gradient(45deg, #2BC3C8, #84E7B9)'
				},
				backTextColor: {
					'color': '#ffffff'
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
			toSearch(){
				this.$common.navigateTo('/pages/index/search')
			},
			back() { // 首页
				uni.navigateBack({
					delta: 2
				})
			},
			toDetail(){
				this.$common.navigateTo('/pages/index/detail')
			},
			// 回到顶部
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}
	}
</script>

<style lang="scss">
	.search-wrap {
		margin: 0 30rpx 0 10rpx;
		flex: 1;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx;
	}

	.u-body-item image {
		width: 180rpx;
		flex: 0 0 180rpx;
		height: 150rpx;
		border-radius: 6rpx;
		margin-right: 12rpx;
	}
	
	.height{
		height: 88rpx;
	}

	.toptem {
		padding: 20rpx 0;
	}
</style>
