<template>
	<view class="flex-1 mx-3">
		<template v-if="articleInfo.type === 0">
			<article-one :articleInfo="articleInfo" />
		</template>
		<template v-if="articleInfo.type === 1">
			<article-two :articleInfo="articleInfo" />
		</template>
		<template v-if="articleInfo.type === 2">
			<article-three :articleInfo="articleInfo" />
		</template>
		<template v-if="articleInfo.type === 3">
			<article-four :articleInfo="articleInfo" />
		</template>
		<template v-if="articleInfo.type === 4">
			<article-five :articleInfo="articleInfo" />
		</template>
	</view>
</template>

<script>
	import articleOne from '@/components/renovation/index/bc-article/article-one';  // 单图展示
	import articleTwo from '@/components/renovation/index/bc-article/article-two';  //划动展示
	import articleThree from '@/components/renovation/index/bc-article/article-three'; //每行展示两个列表 可选择常规展示还是瀑布流展示 
	import articleFour from '@/components/renovation/index/bc-article/article-four';
	import articleFive from '@/components/renovation/index/bc-article/article-five';
	export default {
		data() {
			return {}
		},
		components: {
			articleOne,
			articleTwo,
			articleThree,
			articleFour,
			articleFive
		},
		props: {
			articleInfo: {
				type: [String, Object],
				default () {
					return {};
				},
			}
		}
	}
</script>

<style lang="scss">
</style>
