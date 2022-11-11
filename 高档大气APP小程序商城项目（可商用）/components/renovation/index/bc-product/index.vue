<template>
	<view class="flex-1 mx-3">
		<template v-if="productInfo.type == 0">
			<product-one :productInfo="productInfo" />
		</template>
		<template v-if="productInfo.type == 1">
			<product-two :productInfo="productInfo" />
		</template>
		<template v-if="productInfo.type == 2">
			<product-three :productInfo="productInfo" />
		</template>
		<template v-if="productInfo.type == 3">
			<product-four :productInfo="productInfo" />
		</template>
		<template v-if="productInfo.type == 4">
			<product-five :productInfo="productInfo" />
		</template>
	</view>
</template>

<script>
	import productOne from '@/components/renovation/index/bc-product/product-one';
	import productTwo from '@/components/renovation/index/bc-product/product-two';
	import productThree from '@/components/renovation/index/bc-product/product-three';
	import productFour from '@/components/renovation/index/bc-product/product-four';
	import productFive from '@/components/renovation/index/bc-product/product-five';
	export default {
		data() {
			return {
			}
		},
		components:{
			productOne,
			productTwo,
			productThree,
			productFour,
			productFive
		},
		props: {
			productInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			}
		}
	}
</script>

<style>
</style>
