<template>
	<view class="flex-1">
		<template v-if="footerInfo.type == 0">
			<footer-one :footerInfo="footerInfo" />
		</template>
		<template v-if="footerInfo.type == 1">
			<footer-two :footerInfo="footerInfo" />
		</template>
		<template v-if="footerInfo.type == 2">
			<footer-three :footerInfo="footerInfo" />
		</template>
		<template v-if="footerInfo.type == 3">
			<footer-four :footerInfo="footerInfo" />
		</template>
		<template v-if="footerInfo.type == 4">
			<footer-five :footerInfo="footerInfo" />
		</template>
	</view>
</template>

<script>
	import footerOne from '@/components/renovation/index/bc-footer/footer-one';
	import footerTwo from '@/components/renovation/index/bc-footer/footer-two'; //猜你喜欢
	import footerThree from '@/components/renovation/index/bc-footer/footer-three';
	import footerFour from '@/components/renovation/index/bc-footer/footer-four';
	import footerFive from '@/components/renovation/index/bc-footer/footer-five';
	export default {
		data(){
			return{}
		},
		components:{
			footerOne,
			footerTwo,
			footerThree,
			footerFour,
			footerFive
		},
		props: {
			footerInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
	}
</script>

<style>
</style>