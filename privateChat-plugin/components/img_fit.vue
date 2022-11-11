<template>
	<view :style="{'height': item.content.data.size.h, 'width': item.content.data.size.w}">
		<image @load="loadOver(e)" :src="item.content.message" lazy-load @click="preview" style="width: 100%;height: 100%;"></image>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				loading: true,
			}
		},
		methods: {
			preview() {
				uni.previewImage({
					urls: [this.item.content.message]
				})
			},
			loadOver(e) {
				this.loading = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>