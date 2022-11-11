<template>
	<view class="content">
		<view class="" style="width: 200rpx; height: 100rpx; margin: 200rpx auto;" @click="is_show_share_box = true">
			打开分享栏
		</view>
		<shareColumn @share="share" :is_show_share_box="is_show_share_box" @hideColumn="is_show_share_box = !is_show_share_box"></shareColumn>
	</view>
</template>

<script>
	import shareColumn from '@/components/share-column/share-column.vue'
	import {
		get_provider
	} from '@/utils/common.js'
	export default {
		components: {
			shareColumn
		},
		data() {
			return {
				is_show_share_box: null,
				provider_list: [],
			}
		},
		onLoad() {
			get_provider().then(res => {
				this.provider_list = res
			})
		},
		methods: {
           share(type){
			   console.log(type)
			   //执行分享的逻辑
		   }
		}
	}
</script>

<style>

</style>
