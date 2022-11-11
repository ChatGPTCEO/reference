<template>
	<view class="content"><yzb-terms :terms="terms"></yzb-terms></view>
</template>

<script>
import yzbTerms from '@/components/yzb/yzb-terms';
export default {
	components: {
		yzbTerms
	},
	data() {
		return {
			terms: {}
		};
	},
	async onLoad() {
		let params = { categoryId: 1 };
		let data = await this.$apis.getHelpDetail({categoryId:1});
		if (data) {
			this.terms = data[0];
		}
		console.log(this.terms);
	},
	methods: {
		onqueryload(data) {
			console.log('onqueryload', data);
		}
	}
};
</script>

<style></style>
