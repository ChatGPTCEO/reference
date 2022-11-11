<script>
	export default {
		onLaunch: function() {

		},
		onShow: function() {

		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import "/static/common/css/iconfont.css";
	@import "/static/common/css/common.css";
	/* #endif */
	/* #ifdef MP-WEIXIN */
	@import "/static/common/css/icon.css";
	/* #endif */
	
  /* h5 rich-text 图片宽度限制 */
  .uni-rich-text img{
	/* #ifndef APP-NVUE */
    max-width: 750rpx;
	/* #endif */
  }
  .page{
	  background-color: $uni-bg-color-grey;
  }
</style>
