import Vue from 'vue'
import siteinfo from "@/siteinfo.js"
import store from '@/store/index.js'
import swasocket from "@/swasocket.js"
var core = {
	agentid:0,
	apitoken:'',
	platform:'app',
	version:'1.1.30',
	loading : false,
	appshowing:true,
	inited:false,
	debug:false,
	inwechat:false,
	inithandel:null,
	jweixin:null,
	device:'android',
	Client:{
		screenHeight:0,
		screenWidth:0,
		windowHeight:0,
		statusBarHeight:0
	},
	system:{
		name:'Whotalk',
		logo:'../../static/logo.jpg',
		siteroot:'',
		splash:'../../static/splash.jpg',
		defaultimg:"",
		releasedate:0,
		groupswitch:false,
		creditswitch:false,
		channelswitch:false,
		apprunshow:[],
		auditmode:{
			"status":false
		}
	},
	style:{
		navbg:'bg-gray',
		actcolor:'limegreen',
		link:'#0081ff',
		chatbg:'#96d9dc',
		active:'#04be02'
	},
	langs:{
		text_back:'返回',
		text_contentover:'松开手开始加载',
		text_contentdown:'下拉加载更早的信息',
		text_confirm_title:'温馨提示',
		text_confirm_delete:"确定要删除吗？",
		text_delete_confirm:'删除后不可恢复，是否确定要删除？',
		text_friends_album:"朋友圈",
		text_groupname:'群组',
		text_empty:'空空如也',
		text_please_input_remark:'请填写备注信息',
		text_alert_app_action:"请在APP上使用此功能",
		text_dialog_delete:"您可以通过联系人重新发起会话",
		msg_no_anymore:"没有更多了~"
	},
	userinfo:{uid:0,groupid:0,token:''},
	userset:{
		'remind_voice':1,
		'remind_vibrate':1,
		'post_center':0,
		'talk_private':1,
		'validation_apply':0,
		'allow_search':1,
		'album_open':1,
		'language':'zh'
	},
	init:function(userstate=''){
		this.apitoken = siteinfo.token;
		var that = this;
		if((userstate!='' && this.userinfo.uid==0) || this.debug){
			this.initsys(userstate);
		}else{
			this.cacheread('_xfy_whotalk_system_session_',function(res){
				that.initpage(res.data);
			},function(e){
				that.initsys();
			});
		}
	},
	initsys:function(userstate='',callback=false){
		let postdata = {v:this.version};
		if(userstate!=''){
			this.userinfo.token = userstate;
			postdata.state = userstate;
		}
		let that = this;
		this.get('appconfig',function(res){
			if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined') return that.report(res);
			if(typeof(res.system)=='undefined') return that.toast('服务器连接失败:undefined');
			if(res.member.uid==0){
				res.member = that.userinfo;
			}
			that.initpage(res);
			//清理本地缓存
			uni.clearStorage();
			that.cacheset('_xfy_whotalk_system_session_',res);
			if(typeof(callback)=='function') callback();
		},postdata);
	},
	initpage : function(data){
		this.system = data.system;
		this.style = data.style;
		this.langs = data.langs;
		this.userinfo = data.member;
		this.inwechat = data.system.inwechat;
		if(data.member.uid>0){
			this.login(data.member);
		}
		this.inited = true;
		if(typeof(this.inithandel)=='function'){
			this.inithandel();
		}
	},
	inituser : function(){
		if(this.userinfo.uid==0) return false;
		//初始化用户信息
		if(this.userinfo.usersign!='' && typeof(this.system.socket)!='undefined'){
			//初始化socket服务器
			this.initsocket(this.userinfo.usersign,this.system.socket);
		}
	},
	initsocket:function(usersign='',options={}){
		if(usersign=='' || typeof(options.type)=='undefined' || typeof(options.server)=='undefined' || typeof(this.userinfo.usersid)=='undefined'){
			console.log('SOCKET配置未完全')
			return false;
		}
		//引入
		swasocket.UserSign = usersign;
		let Socket,that = this;
		// #ifdef MP-TOUTIAO
		return console.log('当前版本字节跳动小程序暂不支持即时通讯接口');
		// #endif
		// #ifndef MP-TOUTIAO
		Socket = uni.connectSocket({
		    url: options.server,
			complete: (res)=> {
				//console.log(res);
			},
			success:(res)=>{
				//console.log(res);
				swasocket.Connected = true;
			}
		});
		uni.onSocketOpen(function (res) {
			Socket.connected = true;
			swasocket.Send({
				"Method": "User/Connect",
				"Type": 0,
				"Message": "用户" + usersign + "已连接服务器",
				"fromId": usersign,
				"Data":{
					"SiteRoot":that.system.siteroot
				}
			},options.type);
			swasocket.Ready();
		});
		uni.onSocketMessage(function (res) {
			if(typeof(res)=='string' && that.isJsonString(res)){
				res = JSON.parse(res);
			}
			let data = null;
			if(typeof(res.data)=='object'){
				data = res.data;
			}else{
				data = JSON.parse(res.data);
			}
			if(typeof(data.data)=='undefined') return false;
			if(typeof(data.data.message)!='undefined'){
				let socketdata = JSON.parse(data.data.message);
				return swasocket.Received(socketdata);
			}
		});
		uni.onSocketClose(function(res){
			console.log('Socket连接已断开：',res);
			Socket.connected = false;
			if(res.code!=1000) return that.initsocket(usersign,options);
		});
		//#endif
		Socket.scktype = 'local';
		Socket.connected = false;
		swasocket.Socket = Socket;
		swasocket.Core = this;
	},
	initshare : function(title,url,cover='',summary=''){
		let ShareObject = {
			title : title,
			url: url,
			cover : cover,
			summary : summary
		};
		return ShareObject;
	},
	initjwx:function(callback,debug=false){
		console.log('当前版本不支持微信JS-SDK，请联系作者购买完整版');
	},
	login : function(data,cache=true){
		if(!data.uid) return this.toast('Unknown UID');
		this.userinfo = data;
		store.commit('login',data);
		this.inituser();
		if(cache){
			var system_session = {system:this.system,member:this.userinfo,style:this.style,langs:this.langs};
			this.cacheset('_xfy_whotalk_system_session_',system_session);
		}
		console.log('用户'+data.nickname+'登录成功！');
		return true;
	},
	logout : function(){
		//删除表情缓存
		if(this.userinfo.uid>0){
			let cachekey = '_xfy_whotalk_face_' + this.userinfo.uid;
			uni.removeStorage({key:cachekey,success:function() {
				console.log('成功删除本地表情缓存');
			}});
		}
		this.userinfo = {uid:0,token:''};
		//退出socket
		swasocket.Logout(this.system.socket.type);
		var system_session = {system:this.system,member:this.userinfo,style:this.style,langs:this.langs};
		this.cacheset('_xfy_whotalk_system_session_',system_session);
		this.get('auth/login_out',function(res){});
		store.commit('logout');
		return true;
	},
	scan : function(callback){
		return this.toast('暂未开放');
	},
	copy:function(text='', toast='已复制到剪切板'){
		if(text=='') return this.toast('复制的内容为空');
		if(this.platform=='h5'){
			return this.toast('请在APP上使用此功能');
		}
		return uni.setClipboardData({
			data: text,
			success: function () {
				core.toast(toast,'','success');
			},
			fail:function(e){
				console.log(e);
				core.toast('复制失败');
			}
		});
	},
	back:function(){
		if(this.inwechat) this.jweixin = null;
		let pages = getCurrentPages();
		if(pages.length>1){
			uni.navigateBack();
		}else{
			uni.reLaunch({
				url:'/pages/index/index'
			})
		}
	},
	cachecloud : function(cname,callback,nocache=false){
		let cachekey = '_xfy_whotalk_'+cname+'_';
		let loadcloud = function(){
			core.get(cname,function(res){
				if(typeof(res.type)!='undefined') return console.log('更新缓存失败('+cname+')：'+res.message);
				core.cacheset(cachekey,res);
				if(typeof(callback)=='function'){
					return callback(res);
				}
			});
		}
		if(nocache) return loadcloud();
		return this.cacheread(cachekey,function(res){
			if(typeof(callback)=='function'){
				return callback(res.data);
			}
		},loadcloud);
	},
	cacheread : function(key,callback,fail){
		let cachekey = key + '_' + siteinfo.uniacid;
		let getstorage = {key:cachekey};
		if(typeof(callback)=='function'){
			getstorage.success = callback;
		}
		if(typeof(fail)=='function'){
			getstorage.fail = fail;
		}
		return uni.getStorage(getstorage);
	},
	cacheset : function(key,data){
		let cachekey = key + '_' + siteinfo.uniacid;
		uni.setStorage({key:cachekey,data:data,fail:function(e){
			console.log('写入缓存失败：');
			console.log(e);
		},success:function(){
			//console.log('写入缓存成功！');
		}});
	},
	cacheclear : function(){
		let storages = {
			system:this.system,
			member:this.userinfo,
			style:this.style,
			langs:this.langs
		}
		//清理本地缓存
		uni.clearStorage();
		//重写本地缓存
		this.cacheset('_xfy_whotalk_system_session_',storages);
	},
	confirm:function(msg,title,callback,options={},Cancel){
		options = options || {};
		options.content = msg;
		if(title) options.title = title;
		if(typeof(options.success)=='undefined' && typeof(callback)=='function'){
			options.success = function(res){
				if(res.confirm){
					callback();
				}else if(res.cancel && typeof(Cancel)=='function'){
					Cancel();
				}
			};
		}
		return uni.showModal(options);
	},
	get : function (u,c,d,t,l){
		return this.request(u,'GET',d,t,c,l);
	},
	post : function (u,c,d,t,l) {
		return this.request(u,'POST',d,t,c,l);
	},
	url : function(route="",action='api'){
		route = route.replace('/','.');
		if (route.indexOf('http')==0 || route.indexOf('/index.php')>-1) return route;
		var baseurl = siteinfo.siteroot + '?i='+siteinfo.uniacid+'&m=xfy_whotalk';
		if(action=='api'){
			baseurl = baseurl.replace('app/index.php','app/swaapi.php');
		}else{
			baseurl += '&c=entry&do=' + action;
			if(this.platform=='h5' && baseurl.indexOf('http')!==0){
				baseurl = this.system.siteroot + baseurl;
			}
		}
		if (route=='' || !route) return baseurl;
		return baseurl + '&r=' + route + '&unifrom='+this.platform;
	},
	page : function(url='index/index',data = {}){
		if(url=='' || url=='#' || url.indexOf('javascript:')==0) return '';
		// ***#/pages/***
		if(url.indexOf('#/pages/')>0){
			let urls = url.split('#/pages/');
			url = urls[1];
		}else{
			// *** /#/pages/ ***
			url = url.replace('#/pages/','',url);			
		}
		for (let key in data) {
			url += (url.indexOf('?') == -1 ? '?' : '&') + key + '=' + data[key]
		}
		if(url.indexOf('http')==0){
			url = '/pages/web/index?url=' + encodeURIComponent(url);
		}
		if(url.indexOf('/pages/')!=0) url = '/pages/' + url;
		return url;
	},
	upload:function(file,callback,type="image",apiname="attach/upload"){
		let res = {
			path:"https://shenwahuanan.oss-cn-shenzhen.aliyuncs.com/images/1/2021/04/qmOxHz9zpPPkAaJK9qKkt99qM9Kjtk.jpg",
			success:true,
			url:"https://shenwahuanan.oss-cn-shenzhen.aliyuncs.com/images/1/2021/04/qmOxHz9zpPPkAaJK9qKkt99qM9Kjtk.jpg"
		};
		if(type=='video'){
			res.path = 'https://shenwahuanan.oss-cn-shenzhen.aliyuncs.com/videos/4/2020/09/ZGf6Ykq4h8ZQ6HF4n2Hz446qQ14ZI8.mp4';
			res.url = 'https://shenwahuanan.oss-cn-shenzhen.aliyuncs.com/videos/4/2020/09/ZGf6Ykq4h8ZQ6HF4n2Hz446qQ14ZI8.mp4';
		}
		console.log('当前版本不支持上传接口，请联系作者购买完整版');
		return callback(res);
	},
	navito : function(page='',data={},type = 0){
		if(page.indexOf('tel:')==0){
			return uni.makePhoneCall({
				phoneNumber:page.replace('tel:','')
			});
		}
		var url = this.page(page,data);
		if(url=='') return false;
		if(this.inwechat) this.jweixin = null;
		switch (type) {
			case 0:
				uni.navigateTo({
					url,
					fail: console.log
				})
				break;
			case 1:
				uni.redirectTo({
					url,
					fail: console.log
				})
				break;
			case 2:
				uni.reLaunch({
					url,
					fail: console.log
				})
				break;
			case 3:
				uni.navigateBack({
					delta: url,
					fail: console.log
				})
				break;
			case 4:
				uni.switchTab({
					url: url,
					fail: console.log
				})
				break;
		}
	},
	request : function (u,m,d,t,c,l) {
		var url = this.url(u);
		var method = m ? m : 'GET';
		var data = d ? d : {};
		var datatype = t ? t : 'json';
		data.inajax = 1;
		if (method=='POST'){
			data.submit = 1;
		}
		if(this.userinfo.uid>0){
			data.authkey = this.userinfo.token;
		}
		if (l && !this.loading){
			this.loading = true;
			uni.showLoading({
				mask:true,
				title:'加载中'
			});
		}
		var callback = typeof(c)=='function' ? c : false;
		var hreq = this;
		return uni.request({
			url:url,
			method:method,
			dataType:datatype,
			data:data,
			success:function(res){
				if(res.data){
					if(typeof(res.data.releasedate)!='undefined' && u!='appconfig' && u!='appmain'){
						if(res.data.releasedate!=hreq.system.releasedate){
							hreq.initsys();
						}
					}
				}
				if (typeof(callback)=='function'){
					return callback(res.data);
				}
				hreq.report(res.data);
			},
			fail:function(e){
				uni.showToast({
					title:'网络链接失败',
					icon:'none'
				})
				console.log(e);
			},
			complete:function(res){
				if(hreq.loading){
					hreq.loading = false;
					uni.hideLoading();
				}
			}
		});
	},
	report : function(res, initpage = false){
		if(res===null) res = {message:"敬请期待",redirect:'back',type:"error"};
		if(typeof(res)!='object' && this.isJsonString(res)){
			res = JSON.parse(res);
		}
		if (typeof(res)!='object') return false;
		if(res.redirect=='' && initpage){
			res.redirect = 'back';
		}
		if(typeof(res.url)!='undefined'){
			var act = typeof(res.act)=='undefined' ? 'undefined' : res.act;
			if (act=='redirect'){
				this.navito(res.url, 1);
			}
		}
		if(typeof(res.message)!='undefined'){
			this.toast(res.message,res.redirect,res.type);
		}
	},
	toast : function(m,u,t){
		var toastinfo = {title:m,duration:1500};
		if(this.loading){
			uni.hideLoading();
			this.loading = false;
		}
		var that = this;
		if(u){
			let redirect = function(){
				if(u=='back'){
					that.back();
				}else if(u=='home'){
					that.navito('index/index', {}, 2);
				}else if(u=='login'){
					that.navito('auth/index', {act:'login'}, 1);
				}else{
					that.navito(u,{},1);
				}
			};
			if(t=='redirect'){
				return redirect();
			}
			toastinfo.complete = function(){
				setTimeout(redirect,800);
			}
		}
		toastinfo.icon = (t=='success' || t=='loading') ? t : 'none';
		uni.showToast(toastinfo);
	},
	isJsonString : function(str){
		try {
			if(typeof(JSON.parse(str)) == "object") {
				return true;
			}
		} catch(e) {
		}
		return false;
	},
	notopen:function(str){
		console.log('当前版本不支持'+str+'，请联系作者购买完整版');
		this.toast('暂未开放');
	}
}
module.exports = core;