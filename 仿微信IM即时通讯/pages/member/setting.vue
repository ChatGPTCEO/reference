<template>
	<view>
		<cu-custom :isBack="true" :Barborder="'solid-bottom'">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="cu-bar">
			<view class="action text-grey">
				聊天与通知
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">新消息声音提醒</text>
				</view>
				<view class="action">
					<switch class="switch" @change="SwitchSet" data-set="remind_voice" :class="data.userset.remind_voice==1?'checked':''" :checked="data.userset.remind_voice==1?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">新消息震动</text>
				</view>
				<view class="action">
					<switch class="switch" @change="SwitchSet" data-set="remind_vibrate" :class="data.userset.remind_vibrate==1?'checked':''" :checked="data.userset.remind_vibrate==1?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">回车键发送</text>
				</view>
				<view class="action">
					<switch class="switch" @change="SwitchSet" data-set="post_center" :class="data.userset.post_center==1?'checked':''" :checked="data.userset.post_center==1?true:false"></switch>
				</view>
			</view>
		</view>
		<view class="cu-bar margin-top-sm">
			<view class="action text-grey">
				权限与会话
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">接收私聊消息</text>
				</view>
				<view class="action">
					<switch class="switch" disabled @change="SwitchSet" data-set="talk_private" :class="data.userset.talk_private==1?'checked':''" :checked="data.userset.talk_private==1?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">被添加需要验证</text>
				</view>
				<view class="action">
					<switch class="switch" disabled @change="SwitchSet" data-set="validation_apply" :class="data.userset.validation_apply==1?'checked':''" :checked="data.userset.validation_apply==1?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">允许搜索到我</text>
				</view>
				<view class="action">
					<switch class="switch" disabled @change="SwitchSet" data-set="allow_search" :class="data.userset.allow_search==1?'checked':''" :checked="data.userset.allow_search==1?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">开放朋友圈</text>
				</view>
				<view class="action">
					<switch class="switch" disabled @change="SwitchSet" data-set="album_open" :class="data.userset.album_open==1?'checked':''" :checked="data.userset.album_open==1?true:false"></switch>
				</view>
			</view>
		</view>
		<view class="cu-bar margin-top-sm">
			<view class="action text-grey">
				账户与绑定
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="naviTo('bind/mobile')">
				<view class="content">
					<text class="text-black">手机号</text>
				</view>
				<view class="action">
					<view class="cu-tag round light" :class="data.account.mobile==''?'bg-orange':'bg-'+theme.actcolor">{{data.account.mobile==''?'未绑定':data.account.mobile}}</view>
				</view>
			</view>
			<view class="cu-item arrow" @click="unSupport()">
				<view class="content">
					<text class="text-black">微信</text>
				</view>
				<view class="action">
					<view class="cu-tag round light" :class="data.account.weixin==''?'bg-orange':'bg-'+theme.actcolor">{{data.account.weixin==''?'未绑定':data.account.weixin}}</view>
				</view>
			</view>
			<view class="cu-item arrow" @click="unSupport()">
				<view class="content">
					<text class="text-black">QQ</text>
				</view>
				<view class="action">
					<view class="cu-tag round light" :class="data.account.qq==''?'bg-orange':'bg-'+theme.actcolor">{{data.account.qq==''?'未绑定':data.account.qq}}</view>
				</view>
			</view>
		</view>
		<view class="cu-bar margin-top-sm">
			<view class="action text-grey">
				多语言
			</view>
		</view>
		<picker :value="langkeys.indexOf(data.userset.language)" :range="languages" @change="doPickLang">
			<view class="cu-list menu">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-black">选择语言</text>
					</view>
					<view class="action">
						<view class="cu-tag round light" :class="'bg-'+theme.actcolor">{{data.langs[data.userset.language]}}</view>
					</view>
				</view>
			</view>
		</picker>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @click="naviTo('member/account')">
				<view class="content">
					<text class="text-black">修改个人资料</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="unSupport()">
				<view class="content">
					<text class="text-black">修改登录密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="doClearCache()">
				<view class="content">
					<text class="text-black">清理数据缓存</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="doCancellation()" v-if="data.cancellation">
				<view class="content">
					<text class="text-black">注销当前账户</text>
				</view>
			</view>
			<view class="cu-item arrow hidden" @click="unSupport()">
				<view class="content">
					<text class="text-black">设置手势密码</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu text-center margin-bottom-xl">
			<view class="cu-item arrow" @click="doCheckout()">
				<view class="content">
					<text class="text-red">退出当前账号</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="doQuitApp()" v-if="platform=='app' || inplusapp">
				<view class="content">
					<text class="text-gray">关闭{{sitename}}</text>
				</view>
			</view>
			<navigator class="cu-item arrow" target="miniProgram" open-type="exit" v-else-if="platform=='wxapp'">
				<view class="content">
					<text class="text-gray">关闭{{sitename}}</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	var codeInterval = null;
	
	export default {
		data() {
			return {
				platform:core.platform,
				sitename:core.system.name,
				theme:core.style,
				cancellation:{
					verify:true,
					verifycode:'',
					account:'',
					sendtype:'mobile'
				},
				verifycodetext:'重新获取',
				verifycodetype:'mobile',
				showmodal:"",
				inplusapp:false,
				langkeys:['zh'],
				languages:['简体中文'],
				postdata:{
					savepassword:"true",
					oldpassword:"",
					newpassword:"",
					confirmpassword:"",
					verifycode:"",
					verifytype:"pass",
					verifyaccount:""
				},
				viewpassword:"",
				data:{
					langs:[],
					repassport:false,
					title:"设置",
					account:{
						mobile:"",
						weixin:"",
						qq:""
					},
					cancellation:false,
					userset:{
						'remind_voice':1,
						'remind_vibrate':1,
						'post_center':1,
						'talk_private':1,
						'validation_apply':0,
						'allow_search':1,
						'album_open':1,
						'language':'zh'
					}
				}
			}
		},
		onLoad() {
			let self = this;
			if(typeof(inWhotalkPlus)!='undefined') this.inplusapp = true;
			this.initData('member/setting',{},function(res){
				self.langkeys = [];
				self.languages = [];
				for(let i in res.langs){
					self.langkeys.push(i);
					self.languages.push(res.langs[i]);
				}
			});
		},
		onShow() {
			
		},
		methods:{
			initData(route, data={}, callback=false){
				var that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
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
			doClearCache(){
				return core.cacheclear(),core.toast('清理完成！','','success');
			},
			doSavePassword(){
				if(this.postdata.verifytype=='pass'){
					if(this.data.repassport && this.postdata.oldpassword=='') return core.toast('请输入您的原密码');
				}else{
					if(this.postdata.verifycode==''){
						return core.toast('请输入您收到的验证码');
					}
				}
				if(this.postdata.newpassword=='') return core.toast('请设置一个新密码');
				if(this.postdata.confirmpassword=='') return core.toast('请输入确认密码');
				if(this.postdata.newpassword!=this.postdata.confirmpassword) return core.toast('两次输入的密码不一致');
				let postdata = this.postdata;
				postdata.sendtype = this.verifycodetype;
				core.post('member/password',function(res){
					if(res.type!='success') return core.report(res);
					if(core.logout()){
						return core.toast('修改成功，即将重新登录','login','success');
					}
				},postdata);
			},
			doPassSendcode(){
				let self = this;
				return core.post("member/autosendcode",function(res){
					if(res.type!='success') return core.report(res);
					if(res.message.sendtype=='none'){
						return core.toast('无可用验证方式，请联系管理员重置密码');
					}
					self.postdata.verifytype = 'code';
					self.postdata.verifyaccount = res.message.account;
					self.verifycodetype = res.message.sendtype;
					self.showmodal = 'passport';
					self.verifycodetext = '120s';
					var n = 119;
					if(codeInterval!=null){
						clearInterval(codeInterval);
						codeInterval = null;
					}
					codeInterval = setInterval(function(){
						if(n==0){
							clearInterval(codeInterval);
							codeInterval = null;
							self.verifycodetext = '重新获取';
							return;
						}else{
							self.verifycodetext = n+'s';
						}
						n--
					},1e3);
					core.toast('验证码已发送','','success');
				});
			},
			SwitchSet(e){
				let setkey = e.currentTarget.dataset.set;
				if(!setkey) return false;
				let setvalue = e.detail.value ? 1 : 0;
				let self = this;
				core.post("member/setting",function(res){
					let redirect = res.type=='success' ? '' : res.redirect;
					if(res.type=='success'){
						self.data.userset[setkey] = setvalue;
						core.userset[setkey] = setvalue;
					}
					core.toast(res.message,redirect,res.type);
				},{setkey:setkey,setvalue:setvalue,savespset:"true"});
			},
			doPickLang(e){
				let setvalue = this.langkeys[e.detail.value];
				if(!setvalue) return core.toast('请选择要切换的语言');
				if(setvalue==this.data.userset.language) return core.toast('操作成功','','success');;
				let self = this;
				core.post("member/setting",function(res){
					let redirect = res.type=='success' ? 'home' : res.redirect;
					if(res.type=='success'){
						self.data.userset.language = setvalue;
						core.userset.language = setvalue;
						core.initsys();
					}
					core.toast(res.message,redirect,res.type);
				},{setkey:'language',setvalue:setvalue,savespset:"true"});
			},
			doCheckout(){
				return core.confirm('退出后需要重新登录','切换账号',function(){
					if(core.logout()){
						core.navito('auth/index',{},2);
					}
				});
			},
			doQuitApp(){
				core.confirm('确定要退出'+this.sitename+'？','退出'+this.sitename,function(){
					plus.runtime.quit(); 
				});
			},
			doCancellation(unconfirm=false){
				return core.notopen('注销账户');
			},
			unSupport(){
				return core.toast('敬请期待');
			}
		}
	}
</script>

<style>
	.cu-form-group .title {min-width: calc(4em + 15px); text-align-last:justify;}
</style>
