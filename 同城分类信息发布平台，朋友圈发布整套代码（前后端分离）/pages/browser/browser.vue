<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},

		onLoad(val) {
			this.url = val.url
		}
	}
</script>
