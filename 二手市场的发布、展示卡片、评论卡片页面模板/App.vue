<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
view,
text{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.status-bar{
	height: var(--status-bar-height);
}
.flex-row{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>
