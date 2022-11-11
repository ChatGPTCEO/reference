<template>
	<view>
		<web-view name="whotalkwebview" :webview-styles="webviewStyles" :src="weburl" v-if="platform!='app'"></web-view>
	</view>
</template>

<script>
	import core from "@/core.js"
	var WebView = null;
	
	export default {
		data() {
			return {
				weburl:'',
				title:'',
				nativeurl:'',
				platform:core.platform,
				data:{
					title:"加载中..."
				},
				ColorList:{
					"red":"#e54d42",
					"orange":"#f37b1d",
					"yellow":"#fbbd08",
					"olive":"#8dc63f",
					"green":"#39b54a",
					"cyan":"#1cbbb4",
					"blue":"#0081ff",
					"purple":"#6739b6",
					"mauve":"#9c26b0",
					"pink":"#e03997",
					"brown":"#a5673f",
					"grey":"#8799a3",
					"gray":"#f0f0f0",
					"black":"#333333",
					"white":"#ffffff",
					"limegreen":"#05c160",
				},
				webviewStyles:{
					progress : {
						color:core.style.active
					}
				}
			}
		},
		onShareAppMessage(e){
			return {
				title:this.title
			}
		},
		onNavigationBarButtonTap(e){
			if(e.type=='back') return core.back();
			if(e.type=='share'){
				let self = this;
				return core.post('dialog/shareweb',function(res){
					if(res.type!='success') return core.report(res);
					core.navito('dialog/share',{mid:res.message.id,fp:'web'});
				},{title:this.title,url:this.nativeurl});
			}
		},
		onLoad(options) {
			if(typeof(options.url)=='undefined' || !options.url) return core.toast('参数错误：无效的地址','back');
			if(typeof(options.title)!='undefined' && options.title!=''){
				this.title = options.title;
				uni.setNavigationBarTitle({
					title:options.title
				});
			}
			let weburl = options.url;
			if(weburl.indexOf('%')==-1){
				weburl = encodeURIComponent(weburl);
			}
			this.nativeurl = decodeURIComponent(weburl);
			let url = core.url('web','mobile') + '&url=' + weburl + (core.userinfo.uid==0?'':('&authkey='+core.userinfo.token));
			this.weburl = url;//.replace('swaapi.php','index.php');
			let bgcolor = core.style.navbg.replace('gradual-','');
			bgcolor = bgcolor.replace('bg-','');
			let fontcolor = '#ffffff';
			if(bgcolor=='white' || bgcolor=='yellow' || bgcolor=='gray') fontcolor = '#000000';
			uni.setNavigationBarColor({
				frontColor:fontcolor,
				backgroundColor:this.ColorList[bgcolor]
			});
			// #ifndef H5 || APP-PLUS
			return this.doSetTitle();
			// #endif
			let self = this;
			// #ifdef APP-PLUS
			let SystemInfoSync = uni.getSystemInfoSync();
			let statusBarHeight = SystemInfoSync.statusBarHeight + (core.device=='ios'?50:45);
			let WindowHeight = SystemInfoSync.windowHeight;
			WebView = plus.webview.create(this.weburl, 'id', {
				plusrequire:"none",
				'uni-app': 'none',
				top: statusBarHeight,
				height:WindowHeight
			}, {
				preload: 'preload webview'
			});
			let currentWebview = this.$mp.page.$getAppWebview();
			currentWebview.append(WebView);
			WebView.setStyle({scalable:true});
			WebView.addEventListener('loaded', function(e){
				self.nativeurl = WebView.getURL();
				let title = WebView.getTitle();
				if(title){
					self.title = title;
					uni.setNavigationBarTitle({
						title:self.title
					});
				}
			}, false);
			// #endif
			// #ifdef H5
			setTimeout(function(){
				let Frames = document.getElementsByTagName('iframe');
				var mainFrame = Frames[0];
				try{
					let title = mainFrame.contentWindow.document.title;
					if(title){
						self.title = title;
						uni.setNavigationBarTitle({
							title:self.title
						});
					}
				}catch(e){
					//TODO handle the exception
					console.log('页面标题获取失败：',e);
					self.doSetTitle();
				}
				console.log(mainFrame.contentWindow);
			},500);
			// #endif
		},
		onShow() {
			
		},
		methods:{
			doSetTitle(){
				if(this.title=='加载中...'){
					this.title =  '';
					uni.setNavigationBarTitle({
						title:this.title
					});
				}
			}
		}
	}
</script>

<style>
</style>