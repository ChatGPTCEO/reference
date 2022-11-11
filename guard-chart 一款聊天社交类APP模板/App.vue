<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mpType: 'app',
	onLaunch() {},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	},
})
</script>
<style lang="scss">
page {
  height: 100%;
}
@import "uview-ui/index.scss"
</style>
