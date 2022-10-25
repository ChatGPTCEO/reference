<template>
	<view class="u-p-20">
		<u-collapse>
			<u-collapse-item :title="item.title" v-for="(item, index) in helpList" :key="index">
				{{item.content}}
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpList:[],
			}
		},
		async onLoad() {
			const res = await this.$u.api.help()
			this.helpList = res.data
		},
		methods:{
			
		}
	}
</script>