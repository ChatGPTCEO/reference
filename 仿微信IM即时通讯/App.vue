<script>
	import Vue from 'vue'
	import core from "@/core.js"
	export default {
		onLaunch: function(options) {
			console.log('App Launch')
			if(typeof(options.query.debug)!='undefined') core.debug = options.query.debug=='yes' ? true : false;
			if(typeof(options.query.fromuid)!='undefined') core.agentid = parseInt(options.query.fromuid);
			let userstate = typeof(options.query.state)=='undefined' ? '' : options.query.state;
			core.init(userstate);
			uni.getSystemInfo({
				success: function(e) {
					let custom;
					core.Client = e;
					Vue.prototype.StatusBar = e.statusBarHeight;
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
						core.device = 'ios';
					};
					// #endif
					// #ifdef MP-WEIXIN
					custom = wx.getMenuButtonBoundingClientRect();
					// #endif
					// #ifdef MP-TOUTIAO
					custom = tt.getMenuButtonBoundingClientRect();
					// #endif
					// #ifdef MP-TOUTIAO || MP-WEIXIN
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			// #ifdef APP-PLUS  
			const _self = this;  
			const _handlePush = function(message) {  
				// TODO
				let payload = message.payload;
				if(core.isJsonString(payload)){
					payload = JSON.parse(payload);
				}
				if(typeof(payload.pagePath)!='undefined'){
					let ws = plus.webview.currentWebview();
					let weburl = ws.getURL();
					let redt = weburl.indexOf('dialog/index')>-1 ? 1 : 0;
					return core.navito(payload.pagePath,{},1);
				}
			};  
			plus.push.addEventListener('click', _handlePush);  
			plus.push.addEventListener('receive', _handlePush);  
			// #endif
		},
		onShow: function() {
			core.appshowing = true;
			console.log('App Show');
		},
		onHide: function() {
			core.appshowing = false;
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "style.css";
	
	.status_bar{width: 100%; height: var(--status-bar-height);}
</style>
