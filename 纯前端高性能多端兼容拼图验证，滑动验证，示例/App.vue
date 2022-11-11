<script>
	export default {
		globalData:{
			uuid:'',
			shebei:'',
			banbenhao:''
		},
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:16px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;}
	page{
		background-color: #2f2070;
	}
	.header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 90;
	}
	.head{
		width:692upx;
		height:61upx;
		font-size:25upx;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height: 61upx;
		padding: 0 29upx;
		position: relative;
		background:rgba(57,42,136,1);
	}
	.headRight{
		float: right;
		width: 37upx;
		height: 37upx;
		margin-top: 11upx;
	}
	.shijian{
		float: right;
		width: 37upx;
		height: 37upx;
		margin-top: 11upx;
	}
	.back{
		position: absolute;
		top: 50%;
		left: 22upx;
		transform: translateY(-50%);
		width: 18upx;
		height: 33upx;
	}
	.xiazaiBox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		z-index: 99;
	}
	.xiazaixiaokuang{
		width: 525upx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		height: 750upx;
		background-color: #fff;
		border-radius: 15upx;
	}
	.xaizaiBtnBox{
		position: absolute;
		bottom: 50upx;
		left: 30upx;
		width: 465upx;
		border-radius: 100px;
		text-align: center;
		line-height: 65upx;
		height: 65upx;
		color: #686868;
		background-color: #eaeaea;
		font-size: 32upx;
		overflow: hidden;
	}
	.jinduBox{
		position: absolute;
		top: 0upx;
		left: 0upx;
		width: 65%;
		height: 100%;
		text-align: center;
		line-height: 65upx;
		height: 65upx;
		color: #fff;
		background-color: #ea4939;
		font-size: 32upx;
		z-index: 120;
		overflow: hidden;
	}
	.xiazaizizi{
		position: absolute;
		top: 50%;
		left: calc(465upx / 2);
		width: 400upx;
		transform: translate(-50%,-50%);
	}
</style>
