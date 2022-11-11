<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{titles[action]}}</block>
		</cu-custom>
		<view>
			<view class="padding-xl text-center text-xxl head" @click="ChooseCover">
				<image class="round avatar margin-top-xl" :src="avatar"></image>
				<text class="cuIcon-camera text-orange" v-if="action=='register'"></text>
			</view>
			<view class="padding-xl">
				<form>
					<view class="cu-form-group round">
						<text class="cuIcon-people margin-right-sm"></text>
						<input type="text" @input="typeusername" :placeholder="'请输入'+data.registermethod+(action=='login'&&data.accountname!=''?'/'+data.accountname:'')" name="username" v-model="postdata.username"></input>
					</view>
					<view class="margin-top cu-form-group round" v-if="data.verifycode && (action=='register' || postdata.mode=='code')">
						<text class="cuIcon-mail margin-right-sm"></text>
						<input type="text" placeholder="输入收到的验证码" name="verifycode" v-model="postdata.verifycode"></input>
						<button @click="sendcode()" :disabled="verifycodetext=='获取验证码'?false:true" :class="verifycodetext=='获取验证码'?'bg-'+theme.actcolor:''" class="cu-btn shadow round">{{verifycodetext}}</button>
					</view>
					<view class="margin-top cu-form-group round" v-if="action=='register'">
						<text class="cuIcon-profile margin-right-sm"></text>
						<input type="text" placeholder="设置一个好听的昵称" name="nickname" v-model="postdata.nickname"></input>
					</view>
					<view class="margin-top cu-form-group round" v-if="action=='register' || (step==1 && postdata.mode!='code')">
						<text class="cuIcon-lock margin-right-sm"></text>
						<input type="text" :focus="inputfocus=='password'?true:false" :password="!viewpassword" :placeholder="action=='login'?'请输入您的登录密码':'设置一个登录密码'" name="password" @confirm="dologin()" v-model="postdata.password"></input>
						<text @click="viewpassword=!viewpassword" :class="viewpassword?['text-'+theme.actcolor,'cuIcon-attentionfill']:'cuIcon-attentionforbid'"></text>
					</view>
					<view class="margin-top" v-if="action=='login'">
						<view class="margin-top flex flex-direction">
							<button class="cu-btn lg round" @click="dologin()" :class="'bg-'+theme.actcolor">{{btnarr[step]}}</button>
						</view>
						<view class="flex margin-top-xl text-center text-lg padding-lr-xl" :style="'color:'+theme.link" v-if="data.register || data.verifycode">
							<view class="flex-sub" :class="data.register?'solid-right':''" v-if="data.verifycode">
								<view @click="postdata.mode='code';step=1" v-if="postdata.mode!='code'">验证码登录</view>
								<view v-else @click="postdata.mode='password'">密码登录</view>
							</view>
							<view class="flex-sub" v-if="data.register" @click="action='register'">
								<text>立即注册</text>
							</view>
						</view>
					</view>
					<view class="margin-top" v-else>
						<view class="margin-top flex flex-direction">
							<button class="cu-btn lg round" @click="doregister()" :class="'bg-'+theme.actcolor">立即注册</button>
						</view>
						<view class="flex margin-top-xl text-center text-lg text-blue padding-lr-xl">
							<view class="flex-sub" @click="action='login'">
								<text>已有账号？前往登录</text>
							</view>
						</view>
					</view>
				</form>
			</view>
			<view class="text-center padding-top-xl margin-top-xl padding-left padding-right" v-if="quicklogin">
				<view class="text-gray text-lg">使用第三方授权登录</view>
				<view class="flex quicklogin padding-left padding-right">
					<!-- #ifdef MP-WEIXIN -->
					<view class="flex-sub quick-item" v-if="quicklogins.weixin">
						<button class="quick-weixin nobg noaf padding-0" open-type="getUserInfo" @getuserinfo="WxappLogin" withCredentials="true">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_weixin.png"></image>
						</button>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="flex-sub quick-item" v-if="inwechat&&platform=='h5'" @click="h5login()">
						<view class="quick-weixin">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_weixin.png"></image>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view class="flex-sub quick-item" v-if="quicklogins.weixin" @click="login('weixin')">
						<view class="quick-weixin">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_weixin.png"></image>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-TOUTIAO -->
					<view class="flex-sub quick-item" v-if="quicklogins.toutiao" @click="login('toutiao')">
						<view class="quick-ttapp">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_ttapp.png"></image>
						</view>
					</view>
					<!-- #endif -->
					<view class="flex-sub quick-item" v-if="quicklogins.qq" @click="login('qq')">
						<view class="quick-qq">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_qqconnect.png"></image>
						</view>
					</view>
					<view class="flex-sub quick-item" v-if="quicklogins.sinaweibo" @click="login('sina')">
						<view class="quick-sina">
							<image mode="aspectFit" class="png" src="@/static/images/icon/auth_sina.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="padding-xl text-center text-lg" @click="doViewAgreement()" v-if="data.agreement!=''">
				<text>{{titles[action]}}代表您已阅读并同意</text>
				<text :style="'color:'+theme.link">《用户隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	var regmobile = /^(\+)?(86)?0?1\d{10}$/;
	var regemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var regaccount = /^[a-zA-Z][_a-zA-Z0-9]{5,11}$/;
	var codeInterval = null;
	
	export default {
		computed: mapState(['userId', 'hasLogin']),
		data() {
			return {
				action:'login',
				fromuid:core.agentid,
				inwechat:core.inwechat,
				theme:core.style,
				checkusername:"",
				redirecturl:"home",
				avatar:core.system.logo,
				dosubmiting:false,
				systemname:core.system.name,
				platform:core.platform,
				viewpassword:false,
				showmodal:"",
				wxappcode:'',
				quicklogin:false,
				quicklogins:{
					"weixin":false,
					"qq":false,
					"sinaweibo":false,
					"toutiao":false
				},
				inputfocus:'',
				titles:{
					"login":"登录",
					"register":"注册"
				},
				step:0,
				btnarr:['下一步','登录'],
				postdata:{
					username:"123456@163.com",
					clientid:"",
					mode:"password",
					password:"123456",
					verifycode:"",
					avatar:"",
					nickname:"光交功课"
				},
				verifycodetext:'发送验证码',
				verifycodesending:false,
				data:{
					title:"登录",
					register:false,
					verifycode:false,
					registermethod:"少艾打扫",
					agreement:"",
					authkey:"",
					accountname:""
				}
			}
		},
		onLoad(options) {
			if(typeof(options.act)!='undefined' && options.act!='') this.action = options.act;
			if(typeof(options.rd)!='undefined') this.redirecturl = options.rd;
			if(this.hasLogin) core.logout();
			if(core.platform=='h5' && this.inwechat){
				//let loginurl = core.url('','mobile');
				//return window.location.href = loginurl;
				this.quicklogin = true;
			}
			if(core.platform=='app'){
				let pinf = plus.push.getClientInfo();
				if(typeof(pinf.clientid)!='undefined' && pinf.clientid){
					this.postdata.clientid = pinf.clientid;
					console.log('获取客户端编号：'+pinf.clientid);
				}
			}
			this.initData('auth');
			// #ifndef H5
			let self = this;
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
					if (res.provider.length>0) self.quicklogin = true;
			        for(var p in res.provider){
						self.quicklogins[res.provider[p]] = true;
					}
			    }
			});
			// #endif
		},
		methods:{
			initData(route, data={}, callback=false){
				var that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					//console.log(res);
					that.data = res;
					uni.setNavigationBarTitle({
						title:res.title
					});
					if(callback){
						callback(res);
					}
				},data);
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			doViewAgreement(){
				return core.navito('web/index',{title:'用户隐私政策',url:encodeURIComponent(data.agreement)});
			},
			doback(){
				return core.back();
			},
			h5login(){
				let loginurl = core.url('auth/wxlogin','mobile');
				window.location.href = loginurl;
			},
			ChooseCover(){
				if(this.action!='register') return false;
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						core.upload(res.tempFilePaths[0],function(res){
							that.avatar = res.url;
							that.postdata.avatar = res.path;
						});
					}
				});
			},
			WxappLogin(e){
				return this.login('weixin');
			},
			sendcode(){
				if(this.verifycodetext!='获取验证码' || this.verifycodesending) return false;
				let username = this.postdata.username;
				if(username==''){
					return core.toast('请输入您的'+this.data.registermethod);
				}
				if (!username.match(regmobile) && !username.match(regemail)) {
					return core.toast(this.data.registermethod+'格式不正确');
				}
				this.verifycodesending = true;
				var that = this;
				return core.get("auth/code",function(res){
					that.verifycodesending = false;
					if(res.type!='success') return core.report(res);
					core.toast(res.message,'','success');
					that.verifycodetext = '120s';
					var n = 120;
					codeInterval = setInterval(function(){
						if(n==0){
							clearInterval(codeInterval);
							that.verifycodetext = '获取验证码';
							return;
						}else{
							that.verifycodetext = n+'s';
						}
						n--
					},1e3);
				},{fromreg:this.action=='register'?1:0,mobile:username,sendcode:"true",authkey:this.data.authkey});
			},
			typeusername(doreg=false){
				let username = this.postdata.username;
				if (username.match(regmobile) || username.match(regemail)){
					this.verifycodetext = '获取验证码';
				}else{
					this.verifycodetext = '发送验证码';
				}
				if(this.action!='login') return false;
				if (username.match(regmobile) || username.match(regemail) || username.match(regaccount)){
					this.checkusername = username;
					var that = this;
					core.get("auth/getavatar",function(res){
						if(res.type=='success'){
							that.step = 1;
							that.avatar = res.avatar;
							if(that.postdata.mode!='code') that.inputfocus = 'password';
						}else{
							that.step = 0;
							that.avatar = core.system.logo;
							if(doreg){
								that.action='register';
							}
						}
					},{username:username,authkey:this.data.authkey,getavatar:true})
				}else if(this.step==1){
					this.step=0;
					this.avatar = core.system.logo;
				}
			},
			login(provider){
				if(this.dosubmiting) return false;
				if(!this.quicklogins[provider]) return core.toast('暂不支持该登录方式');
				this.dosubmiting = true;
				var that = this;
				uni.login({
					provider: provider,
					success: (res) => {
						let useroptions = {
							provider: provider,
							success: (infoRes) => {
								let _provider = core.platform=='wxapp' ? 'wxapp' : provider;
								let postdata = {provider:_provider,userinfo:infoRes.userInfo}
								// #ifdef MP-WEIXIN || MP-TOUTIAO
								postdata.code = res.code;
								// #endif
								if(that.fromuid>0) postdata.fromuid = that.fromuid;
								postdata.appsecret = core.apitoken;
								postdata.clientid = that.postdata.clientid;
								return core.post('auth/quicklogin',function(res){
									if(res.type!='success') return core.report(res);
									core.login(res.member);
									core.toast(res.message, that.redirecturl ,'success');
								},postdata);
							},
							fail(e) {
								console.error(e);
								return core.toast('登陆失败，请重试');
							},
							complete:function(e){
								that.dosubmiting = false;
							}
						}
						// #ifdef MP-WEIXIN
						useroptions.lang = 'zh_CN';
						// #endif
						// #ifdef MP-TOUTIAO || MP-WEIXIN
						useroptions.withCredentials = true;
						// #endif
						uni.getUserInfo(useroptions);
					},
					fail: (err) => {
						core.toast('授权失败');
						that.dosubmiting = false;
						console.error(err);
					}
				});
			},
			dologin(){
				if(this.dosubmiting) return false;
				if(this.postdata.username=='') return core.toast('请输入您的用户名');
				let username = this.postdata.username;
				if (!username.match(regmobile) && !username.match(regemail) && !username.match(regaccount)){
					return core.toast('用户名格式不正确');
				}
				if(this.step==0){
					if(this.checkusername!=username){
						return this.typeusername(true);
					}
					return this.action='register';
				}
				let data = {username:username,mode:this.postdata.mode,dologin:1,authkey:this.data.authkey,clientid:this.postdata.clientid,fromuid:this.fromuid}
				if(this.postdata.mode=='code'){
					if(this.postdata.verifycode=='') return core.toast('验证码不能为空');
					data.verifycode = this.postdata.verifycode;
				}else{
					if(this.postdata.password=='') return core.toast('登录密码不能为空');
					data.password = this.postdata.password;
				}
				this.dosubmiting = true;
				let that = this;
				return core.post('auth/login',function(res){
					that.dosubmiting = false;
					if(res.type!='success') return core.report(res);
					core.login(res.member);
					let redirecturl = res.redirect=='home' ? that.redirecturl : res.redirect;
					core.toast(res.message, redirecturl ,'success');
				},data);
			},
			doregister(){
				if(this.dosubmiting) return false;
				let username = this.postdata.username;
				if(username=='') return core.toast('请输入您的用户名');
				if (!username.match(regmobile) && !username.match(regemail)){
					return core.toast('用户名格式不正确');
				}
				if(this.postdata.password=='') return core.toast('登录密码不能为空');
				if(this.postdata.verifycode=='' && this.data.verifycode) return core.toast('验证码不能为空');
				if(this.postdata.nickname=='') return core.toast('请设置一个昵称');
				this.dosubmiting = true;
				let data = {username:username,doregister:1,authkey:this.data.authkey,fromuid:this.fromuid}
				data.verifycode = this.postdata.verifycode;
				data.password = this.postdata.password;
				data.nickname = this.postdata.nickname;
				data.avatar = this.postdata.avatar;
				data.clientid = this.postdata.clientid;
				let that = this;
				return core.post('auth/register',function(res){
					that.dosubmiting = false;
					if(res.type!='success') return core.report(res);
					core.login(res.member);
					let redirecturl = res.redirect=='home' ? that.redirecturl : res.redirect;
					core.toast(res.message, redirecturl ,'success');
				},data);
			}
		}
	}
</script>

<style>
	.avatar{height: 180upx; width: 180upx; border: 10upx solid #FFFFFF;}
	.head{position: relative;}
	.head .cuIcon-camera{position: absolute; top: 230upx; left: 50%; margin-left: 56upx;}
	.agreement .cu-bar .content{width: calc(100% - 200upx);}
	.agreement-text{max-height: 40vh; font-size: 32upx; line-height: 50upx; text-indent: 64upx; text-align: left;}
	.quick-item{padding-top: 30upx;}
	.quick-item .png{width: 100upx; height: 100upx;}
</style>
