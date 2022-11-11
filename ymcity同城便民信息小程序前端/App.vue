<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		onLaunch: function() {
			let userInfo = uni.getStorageSync('userInfo');
			let token = uni.getStorageSync('token');
			if (userInfo && token) {
				userInfo.token = token;
				this.login(userInfo);
			} else {
				this.loginOut()
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapActions([
				'login',
				'loginOut'
			]),
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	page {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.pageCont {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	/* ==================
          按钮
 ==================== */

	.cu-btn {
		position: relative;
		border: 0upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30upx;
		font-size: 28upx;
		height: 64upx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		transform: translate(0upx, 0upx);
		margin-right: initial;
	}

	.cu-btn::after {
		display: none;
	}

	.cu-btn:not([class*="bg-"]) {
		background-color: #f0f0f0;
	}

	.cu-btn[class*="line"] {
		background-color: transparent;
	}

	.cu-btn[class*="line"]::after {
		content: " ";
		display: block;
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1upx solid currentColor;
		transform: scale(0.5);
		transform-origin: 0 0;
		box-sizing: border-box;
		border-radius: 12upx;
		z-index: 1;
		pointer-events: none;
	}

	.cu-btn.round[class*="line"]::after {
		border-radius: 1000upx;
	}

	.cu-btn[class*="lines"]::after {
		border: 6upx solid currentColor;
	}

	.cu-btn[class*="bg-"]::after {
		display: none;
	}

	/**
	 * 数据加载图
	 */
	.ymref {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
</style>
