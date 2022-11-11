<template>
	<view class="flex-1 mx-3">
		<template v-if="brandInfo.type == 0">
			<brand-one :brandInfo="brandInfo" />
		</template>
		<template v-if="brandInfo.type == 1">
			<brand-two :brandInfo="brandInfo" />
		</template>
		<template v-if="brandInfo.type == 2">
			<brand-three :brandInfo="brandInfo" />
		</template>
		<template v-if="brandInfo.type == 3">
			<brand-four :brandInfo="brandInfo" />
		</template>
		<template v-if="brandInfo.type == 4">
			<brand-five :brandInfo="brandInfo" />
		</template>
	</view>
</template>

<script>
	import brandOne from '@/components/renovation/index/bc-brand/brand-one';
	import brandTwo from '@/components/renovation/index/bc-brand/brand-two';
	import brandThree from '@/components/renovation/index/bc-brand/brand-three';
	import brandFour from '@/components/renovation/index/bc-brand/brand-four';
	import brandFive from '@/components/renovation/index/bc-brand/brand-five';
	export default {
		data() {
			return {

			}
		},
		components: {
			brandOne,
			brandTwo,
			brandThree,
			brandFour,
			brandFive
		},
		props: {
			brandInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
	}
</script>

<style lang="scss">
</style>
