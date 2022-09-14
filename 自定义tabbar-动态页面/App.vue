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

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	.my-cell-hover-class {
			background-color: rgb(235, 237, 238) !important;
	}
	.custom-empty{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 800rpx;
	}
	.scroll-view-bar{
		::-webkit-scrollbar{
			display: none;
			height: 0;
			width: 0;
		}
	}
	.custom-red{
		color:#F5192A
	}
	
	.test-border{
		border: 1px solid red;
	}
	.custom-cursor{
		cursor: pointer !important;
	}
	
	.limit-activity-contatiner .u-countdown-item {
		padding: 6rpx 10rpx !important;
		border-radius: 12rpx !important;
	}
	.status-bar{
		 height: var(--status-bar-height);
		 width: 100%;
	}
</style>

