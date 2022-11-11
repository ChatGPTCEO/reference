<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="padding" v-if="binded">
			<view class="binded text-center">
				<text class="cuIcon-mobilefill"></text>
				<checkbox checked="true" class="checked round"></checkbox>
			</view>
			<view class="padding text-center">
				<text class="text-lg">已绑定手机号：{{data.mobile}}</text>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn lg" @click="binded=false" :class="'bg-'+theme.actcolor">更换手机号</button>
			</view>
		</view>
		<view class="padding" v-else>
			<view class="cu-form-group" v-if="data.mobile!=''">
				<view class="title">原手机号</view>
				<input type="number" placeholder="请输入完整的原手机号码" v-model="postdata.oldmobile" name="oldmobile"></input>
			</view>
			<view class="cu-form-group" :class="data.mobile==''?'':'margin-top'">
				<view class="title">新手机号</view>
				<input type="number" :placeholder="data.mobile==''?'输入您的手机号码':'输入新的手机号码'" v-model="postdata.mobile" name="mobile"></input>
				<button class='cu-btn shadow' :disabled="verifycodetext=='获取验证码'?false:true" @click="doGetCode()" :class="verifycodetext=='获取验证码'?'bg-'+theme.actcolor:''" v-if="data.verifycode">{{verifycodetext}}</button>
			</view>
			<view class="cu-form-group margin-top" v-if="data.verifycode">
				<view class="title">验证码</view>
				<input type="number" maxlength="6" placeholder="输入您收到的短信验证码" v-model="postdata.verifycode" name="verifycode"></input>
			</view>
			<view class="flex flex-direction margin-top">
				<button class="cu-btn lg" @click="doBindMobile()" :class="'bg-'+theme.actcolor">确认{{data.mobile==''?'绑定':'更改'}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	var regmobile = /^(\+)?(86)?0?1\d{10}$/;
	var codeInterval = null;
	
	export default {
		data() {
			return {
				binded:false,
				theme:core.style,
				verifycodetext:'获取验证码',
				postdata:{
					oldmobile:"",
					bindmobile:"true",
					mobile:"",
					verifycode:''
				},
				data:{
					title:"绑定手机号",
					verifycode:false,
					mobile:""
				}
			}
		},
		onLoad() {
			let self = this;
			this.initData("member/bind",{},function(res){
				if(res.mobile!=''){
					self.binded = true;
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
			doBindMobile(){
				if(this.data.mobile!=''){
					if(this.postdata.oldmobile=='') return core.toast('请输入您的原手机号')
					if(!this.postdata.oldmobile.match(regmobile)) return core.toast('原手机号格式不正确')
				}
				if(this.postdata.mobile=='') return core.toast('请输入您的新手机号')
				if(!this.postdata.mobile.match(regmobile)) return core.toast('新手机号格式不正确')
				if(this.data.verifycode && !this.postdata.verifycode) return core.toast('请输入您收到的验证码')
				core.post("member/bind",function(res){
					let redirect = res.type=='success' ? 'back' : res.redirect;
					core.toast(res.message,redirect,res.type);
				},this.postdata);
			},
			doGetCode(){
				if(this.verifycodetext!='获取验证码') return false;
				if(this.postdata.mobile=='') return core.toast('请输入您的新手机号')
				if(!this.postdata.mobile.match(regmobile)) return core.toast('新手机号格式不正确');
				var that = this;
				return core.post("member/sendcode",function(res){
					if(res.type=='success'){
						that.verifycodetext = '120s';
						let n = 120;
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
					}
					core.toast(res.message,res.redirect,res.type);
				},{sendcode:"true",mobile:this.postdata.mobile})
			}
		}
	}
</script>

<style>
	.binded{position: relative;}
	.binded .cuIcon-mobilefill{font-size: 300upx;}
	.binded .checked{position: absolute; bottom: 30upx; left: 50%; margin-left: 60upx;}
</style>
