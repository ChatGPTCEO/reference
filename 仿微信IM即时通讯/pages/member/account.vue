<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="ChooseAvatar()">
					<view class="content">
						<text>头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar radius lg" :style="'background-image:url('+data.userinfo.avatar+')'"></view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" @click="EditInfo('nickname','昵称')">
					<view class="content">
						<text>昵称</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.userinfo.nickname}}</text>
					</view>
				</view>
				<view class="cu-item" @click="EditUserid()" :class="data.userid=='ID'?'':'arrow'" v-if="data.userid!=''">
					<view class="content">
						<text>{{data.userid}}</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.userid=='ID'?data.userinfo.uid:data.userinfo.userid}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showqrcode=!showqrcode" :class="showqrcode?'arrow-up':''">
					<view class="content">
						<text>二维码名片</text>
					</view>
					<view class="action text-xl">
						<text class="cuIcon-qr_code"></text>
					</view>
				</view>
				<view class="padding-xs text-center bg-white account-qrcode" @click="previewimg(data.qrcode)" :class="showqrcode?'':'hidden'">
					<image mode="widthFix" :src="data.qrcode" class="png qrcode"></image>
					<view class="qrcode-temp" :style="'background-image:url('+data.userinfo.avatar+')'"></view>
				</view>
				<view class="cu-item arrow" v-if="data.creditswitch" @click="naviTo('credit/index')">
					<view class="content">
						<text>用户等级</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{data.userinfo.group.title}}</view>
					</view>
				</view>
				<view class="cu-item" v-else>
					<view class="content">
						<text>用户等级</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">{{data.userinfo.group.title}}</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="EditMobile()">
					<view class="content">
						<text>手机号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.userinfo.mobile || '未绑定'}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="EditInfo('email','邮箱号')">
					<view class="content">
						<text>邮箱号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.userinfo.email || '未绑定'}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="EditInfo('msn','微信号')">
					<view class="content">
						<text>微信号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.userinfo.msn}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="EditInfo('bio','个性签名')">
					<view class="content">
						<text>个性签名</text>
					</view>
					<view class="action" style="max-width: 70%;">
						<text class="text-grey">{{data.userinfo.bio}}</text>
					</view>
				</view>
			</view>
			<picker :value="data.userinfo.gender" :range="genders" @change="doPickGender">
				<view class="cu-list menu solid-top">
					<view class="cu-item arrow">
						<view class="content">
							<text class="text-black">性别</text>
						</view>
						<view class="action">
							<view class="cu-tag round light" :class="'bg-'+theme.actcolor">{{genders[data.userinfo.gender]}}</view>
						</view>
					</view>
				</view>
			</picker>
			<view class="cu-list menu solid-top">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-black">地区</text>
					</view>
					<view class="action">
						<view class="cu-tag round light" :class="'bg-'+theme.actcolor">{{data.userinfo.resideprovince}}</view>
						<view class="cu-tag round light" :class="'bg-'+theme.actcolor" v-if="data.userinfo.residecity!=''">{{data.userinfo.residecity}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showmodal=='defaulteditor'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改{{editor.title}}</view>
					<view class="action" @tap="showmodal=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group text-left">
						<input :placeholder="'输入您的'+editor.title" v-model="postdata[editor.colunm]" name="input"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-gray" @tap="showmodal=''">取消</button>
						<button class="cu-btn margin-left" :class="'bg-'+theme.actcolor" @click="UpdateInfo(editor.colunm,postdata[editor.colunm])">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		data() {
			return {
				postdata:{
					avatar:"",
					nickname:"",
					userid:"",
				},
				genders:['保密','男','女'],
				showqrcode:false,
				theme:core.style,
				editor:{
					title:"",
					colunm:""
				},
				showmodal:'',
				address: [],
				provinceList: [],
				cityAllList: [],
				addressIndex: [0, 0],
				ProvinceIndex:0,
				CityIndex:0,
				data:{
					title:"个人信息",
					userinfo:{
						uid:0,
						nickname:"",
						userid:"",
						avatar:"",
						group:{
							title:""
						},
						mobile:"",
						gender:0,
						email:"",
						msn:"",
						resideprovince:"",
						residecity:""
					},
					qrcode:"",
					userid:"",
					verifycode:true,
					creditswitch:false
				}
			}
		},
		onLoad() {
		},
		onShow() {
			let that = this;
			this.initData('member/account',{},function(res){
				if(res.userinfo.resideprovince=="" && res.userinfo.residecity==""){
					that.data.userinfo.resideprovince = '未知';
				}
			});
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
			EditUserid(){
				if(this.data.userid=='' || this.data.userid=='ID') return false;
				this.EditInfo('userid',this.data.userid);
			},
			EditMobile(){
				if(this.data.verifycode) return this.naviTo('bind/mobile');
				this.EditInfo('mobile','手机号');
			},
			doPickGender(e){
				let setvalue = parseInt(e.detail.value);
				this.UpdateInfo('gender',setvalue);
			},
			UpdateInfo(colunm='',value=''){
				return core.notopen('更新资料');
			},
			EditInfo(colunm='',title=''){
				this.editor = {
					title:title,
					colunm:colunm
				};
				this.postdata[colunm] = this.data.userinfo[colunm];
				this.showmodal = 'defaulteditor';
			},
			ChooseAvatar(){
				return core.notopen('修改头像');
			},
			previewimg(image){
				return uni.previewImage({
					urls:[image]
				})
			}
		}
	}
</script>

<style>
	.cu-list.menu>.cu-item.arrow.arrow-up:before{
		content: "\e6de";
	}
	.account-qrcode{position: relative;}
	.account-qrcode .qrcode{width: 480upx;}
	.account-qrcode .qrcode-temp{width: 72upx; height: 72upx; position: absolute; left: 50%; top: 50%; margin-top: -36upx; margin-left: -36upx; border-radius: 6upx; background-size: contain;}
</style>
