<template>
	<view class="flex-1 mx-3">
		<template v-if="articleListInfo.type === 0">
			<article-list-one :articleListInfo="articleListInfo" />
		</template>
		<template v-if="articleListInfo.type === 1">
			<article-list-two :articleListInfo="articleListInfo" />
		</template>
	</view>
</template>

<script>
	import articleListOne from '@/components/renovation/index/bc-article-list/article-list-one';
	import articleListTwo from '@/components/renovation/index/bc-article-list/article-list-two';
	export default {
		components:{
			articleListOne,
			articleListTwo
		},
		props: {
			articleListInfo: {
				type: [String, Object],
				default () {
					return {};
				},
			}
		}
	}
</script>

<style>
</style>