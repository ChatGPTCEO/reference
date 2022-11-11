<template>
	<view class="flex-1 mx-3">
		<template v-if="noticeInfo.type == 0">
			<notice-one :noticeInfo="noticeInfo" />
		</template>
	</view>
</template>

<script>
	import noticeOne from '@/components/renovation/index/bc-notice/notice-one';
	export default {
		components:{
			noticeOne
		},
		props: {
			noticeInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			},
		}
	}
</script>

<style>
</style>