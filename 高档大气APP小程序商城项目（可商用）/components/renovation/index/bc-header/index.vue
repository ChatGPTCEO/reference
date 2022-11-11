<template>
	<view>
		<template v-if="headerInfo.type == 0">
			<header-one :headerInfo="headerInfo" />
		</template>
		<template v-if="headerInfo.type == 1">
			<header-two :headerInfo="headerInfo" />
		</template>
	</view>
</template>

<script>
	import headerOne from '@/components/renovation/index/bc-header/header-one';
	import headerTwo from '@/components/renovation/index/bc-header/header-two';
	export default {
		data() {
			return {
				statusBarheight: '',
				bcHeaderHeight: '',
				topInfoStatus: true
			}
		},
		components: {
			headerOne,
			headerTwo
		},
		props: {
			headerInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
		onLoad() {

		},
		computed: {

		},
		mounted() {

		},
		//获取屏幕信息
		created() {

		},
		methods: {

		}
	}
</script>

<style style="">
	.app-title-icon {
		height: 70rpx;
	}

	.app-icon {
		width: 260rpx;
	}

	.search-box {
		height: 58rpx;
		color: #333333;
		background-color: rgba(255, 255, 255, .9);
		border-radius: 0;
	}

	.iconfont {
		font-size: 38rpx;
	}
</style>
