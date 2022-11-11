<template>
	<view class="cu-item dialogitem" :class="message.uid==userId?'self':''">
		<view class="cu-avatar radius" @longpress.stop="doAt()" @tap="naviTo('member/index',{uid:message.uid,fg:message.gid,fp:chatevel?'dialog':'favor'})" v-if="message.uid!=userId" :style="'background-image:url('+message.avatar+');'"></view>
		<view class="nickname text-grey" v-if="message.uid!=userId && (message.gid>0 || !chatevel)">{{message.nickname}}</view>
		<view :class="[(message.special.type=='normal'?'highmode'+message.highmode:'special-'+message.special.type),(message.special.type=='shareinfo'?'special-main':'main')]" :id="'msgitem'+message.id" @longpress.stop="doLongPress" :data-index="msgindex">
			<block v-if="message.special.type=='normal'">
				<view class="action text-xl" v-if="message.status==-1">
					<text class="cuIcon-infofill text-orange"></text>
				</view>
				<view class="content noaf nobf" v-if="message.highmode==4">
					<image @click="viewImage(message.message)" mode="widthFix" :src="message.message"></image>
				</view>
				<view class="content chat-video noaf nobf" @tap.stop="naviTo('player/index',{vid:message.vid})" v-if="message.highmode==2">
					<view class="bg-video only-img">
						<image :src="message.poster+(poster>0?'?reload='+poster:'')" mode="widthFix" @error="posterReload()"></image>
					</view>
				</view>
				<view class="content shadow" :style="message.uid==userId?'background-color:'+theme.chatbg:''" v-else>
					<view class="richtext" @tap.stop="naviTo(message.url)" v-if="message.highmode<=1">
						<rich-text :nodes="message.message+''"></rich-text>
					</view>
					<view class="chat-audio" :class="audiostyle[message.special.value]" @tap.stop="doPlayAudio()" v-if="message.highmode==5">
						<text class="cuIcon-sound" v-if="message.uid!=userId"></text>
						<text class="chat-audio-time">{{message.yuyintime}}</text>
						<text class="cuIcon-sound self" v-if="message.uid==userId"></text>
					</view>
				</view>
			</block>
			<block v-if="message.special.type=='superface'">
				<view class="content noaf nobf nobg">
					<superface :face="message.special.value"></superface>
				</view>
			</block>
			<block v-if="message.special.type=='transfer'">
				<view class="content chat-transfer bg-orange" @click="naviTo('credit/index')">
					<view class="flex">
						<view class="flex-sub">
							<view class="transfer-icon text-xxxl">
								<text class="cuIcon-order"></text>
							</view>
						</view>
						<view class="flex-fives padding-left-sm">
							<view class="text-xxl">￥{{message.special.value.amount}}</view>
							<view class="margin-top-xs">{{message.special.value.remark || (message.uid==userId?'转账给好友':'收到好友转账')}}</view>
						</view>
					</view>
					<view class="bg-white padding-lr-sm transfer-bar text-grey text-xs">
						<text>{{sitename}}转账</text>
						<text class="margin-left-sm">已到账</text>
					</view>
				</view>
			</block>
			<block v-if="message.special.type=='shareinfo'">
				<view class="cu-list menu-avatar special-content">
					<view class="cu-item arrow" @click="naviTo(message.special.value.page)">
						<view class="cu-avatar radius lg" :style="'background-image:url('+message.special.value.cover+');'"></view>
						<view class="content flex-sub">
							<view>
								<view class="text-cut">{{message.special.value.title}}</view>
							</view>
							<view class="text-gray text-sm flex justify-between text-cut">
								{{message.special.value.desc}}
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="message.special.type=='redpacket'">
				<view class="content chat-transfer bg-orange chat-redpacket" :class="message.special.value.grabed?'light':''" @click="doShowRedpacket()">
					<view class="flex">
						<view class="flex-sub">
							<view class="text-xxxl text-red">
								<text class="cuIcon-redpacket_fill"></text>
							</view>
						</view>
						<view class="flex-fives padding-left-sm">
							<view class="text-lg text-cut">{{message.special.value.remark}}</view>
						</view>
					</view>
					<view class="padding-lr-sm transfer-bar solid-top text-xs">
						<text>{{sitename}}红包</text>
						<text class="margin-left-sm" v-if="message.special.value.grabed">已领取</text>
					</view>
				</view>
			</block>
			<block v-if="message.special.type=='location'">
				<view class="content chat-location bg-white radius" @click="doOpenLocation()">
					<view class="padding-sm">
						<view class="text-cut text-lg text-boldm">{{message.special.value.name}}</view>
						<view class="text-sm text-gray margin-top-xs text-cut">{{message.special.value.address}}</view>
					</view>
					<view class="bg-image">
						<image :src="message.special.value.cover" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<view class="cu-avatar radius" @click="naviTo('member/index',{uid:message.uid})" v-if="message.uid==userId" :style="'background-image:url('+message.avatar+');'"></view>
		<view class="date">{{message.datetime}}</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	import superface from "@/components/util/superface.vue"
	
	export default {
		components: {superface},
		name: 'msglist',
		data(){
			return {
				theme:core.style,
				sitename:core.system.name,
				audiostyle:['unread','playing text-'+core.style.actcolor,'played','text-'+core.style.actcolor],
				viewpics:[],
				poster:0
			}
		},
		mounted(){
			if(this.message.highmode==4){
				this.$emit('genimages',this.message.message);
			}
		},
		props:{
			userId:{
				type:Number,
				default:0
			},
			chatimages:{
				type:Array,
				default:function(){
					return [];
				}
			},
			chatevel:{
				type:Boolean,
				default:false
			},
			msgindex:{
				type:Number,
				default:0
			},
			isManager:{
				type:Boolean,
				default:false
			},
			chatid:{
				type:Number,
				default:0
			},
			dialogtype:{
				type:String,
				default:'normal'
			},
			message:{
				type:Object,
				default:function(){
					return {
						addtime:0,
						at:0,
						avatar:core.system.defaultimg,
						cancel:0,
						dateline:0,
						datetime:'刚刚',
						gid:0,
						highmode:0,
						id:0,
						mediaid:'',
						message:'',
						nickname:'',
						openid:'',
						poster:'@/static/images/poster.jpg',
						special:{
							type:'normal',
							value:''
						},
						status:0,
						touid:0,
						uid:0,
						uniacid:0,
						url:"",
						vid:0,					
						warned:0,
						yuyintime:0
					}
				}
			}
		},
		methods:{
			naviTo(page,data){
				return core.navito(page,data);
			},
			doAt(){
				this.$emit('atuser',{
					uid:this.message.uid,
					nickname:this.message.nickname
				});
			},
			doLongPress(){
				if(!this.chatevel) return false;
				let self = this;
				var elemquery;
				// #ifndef MP-ALIPAY
				elemquery = uni.createSelectorQuery().in(this).select('#msgitem'+this.message.id);
				// #endif
				// #ifdef MP-ALIPAY
				elemquery = uni.createSelectorQuery().select('#msgitem'+this.message.id);
				// #endif
				elemquery.boundingClientRect(function (data) { // data - 各种参数
					let popupbottom = core.Client.windowHeight - data.top - self.CustomBar + 15;
					let poplt = ((data.width/2) + data.left) - 80;
					poplt = poplt<0 ? 0 : poplt;
					let popupleft = poplt + 160 > core.Client.screenWidth ? core.Client.screenWidth-160 : poplt;
					self.$emit('lotap',{
						index:self.msgindex,
						left:popupleft,
						bottom:popupbottom
					});
				}).exec()
			},
			viewImage(pic){
				if(this.chatimages.indexOf(pic)<0){
					this.chatimages.push(pic);
				}
				return uni.previewImage({
					current:pic,
					urls:this.chatimages
				})
			},
			posterReload(){
				if(this.poster>5) return false;
				let self = this;
				setTimeout(function(){
					self.poster += 1;
				},4000);
			},
			doOpenLocation(){
				let locations = this.message.special.value;
				if(this.message.highmode!=7 || !locations.latitude || !locations.longitude) return false;
				// #ifdef H5
				if(core.inwechat){
					return core.initjwx(function(jwx){
						jwx.openLocation({
							latitude:locations.latitude,
							longitude:locations.longitude,
							name:locations.name,
							address:locations.address
						});
					});
				}
				// #endif
				// #ifdef MP-WEIXIN
				return wx.openLocation({
					latitude:locations.latitude,
					longitude:locations.longitude,
					name:locations.name,
					address:locations.address
				});
				// #endif
				let locationurl = 'https://apis.map.qq.com/uri/v1/marker?marker=coord:'+locations.latitude+','+locations.longitude+';title:'+locations.name+';addr:'+locations.address+'&referer='+core.system.name;
				core.navito('web/index',{title:'查看位置','url':encodeURIComponent(locationurl)});
			},
			doPlayAudio(){
				// #ifdef H5
				if(core.inwechat && this.message.mediaid!=''){
					let self = this;
					let Mediaid = this.message.mediaid;
					let Timedelay = this.message.yuyintime * 1000;
					return core.initjwx(function(wx){
						wx.downloadVoice({
							serverId: Mediaid,
							success: function (res) {
								wx.playVoice({
									localId: res.localId,
									success:function(){
										self.message.special.value = 1;
									}
								});
								setTimeout(function(){
									self.message.special.value = 2;
								},Timedelay);
							}
						});
					});
				}
				// #endif
				this.$emit('playaudio',this.msgindex);
			},
			doShowRedpacket(){
				if(!this.chatevel) return core.navito('dialog/index',{cid:chatid,type:dialogtype});
				this.$emit('dospecial',{
					type:'showredpacket',
					index:this.msgindex,
					value:this.message.special.value.id
				});
			}
		}
	}
</script>

<style>
	.dialogitem>.special-main {max-width: calc(100% - 160upx); margin: 0 40upx; display: flex; align-items: center; min-width: 450upx;}
	.dialogitem .special-content{width: 100%; background-color: #FFFFFF; border-radius: 6upx; position: relative; overflow: visible;}
	.dialogitem.self .special-content::after, .cu-chat .self .special-content::before{left: auto; right: -12upx;}
	.dialogitem .nickname{position: absolute; left: 150upx; top: 20upx; font-size: 24upx;}
	.dialogitem .nickname ~ .main, .cu-chat .cu-item .nickname ~ .special-main{margin-top: 30upx;}
	.highmode4 .content, .highmode2 .content{padding: 0 !important;}
	.highmode4 .content{max-height: 400upx; background: none; overflow: hidden; max-width: 260upx !important;}
	.chat-audio{line-height: 48upx;}
	.chat-audio.unread{position: relative;}
	.chat-audio.unread::after{position: absolute;right: -52upx; content: ''; width: 16upx; height: 16upx; border-radius: 50%; background-color: #e54d42; top: 50%; margin-top: -8upx;}
	.chat-audio.played{color: #8799A3;}
	.chat-audio .cuIcon-sound{font-size: 38upx; vertical-align: middle; margin: 0 10upx;}
	.chat-audio .self{transform: rotateY(180deg); display: inline-block;}
	.chat-audio-time::after{content: '"'; display: inline-block; padding-left: 4upx;}
	.chat-video .bg-video image{min-height: 250upx; width: 400upx;}
	.chat-redpacket.light{color: #FFFFFF;}
	.chat-location {display: block !important; overflow: hidden; padding: 0 !important;}
	.chat-location image{width: 100%; display: block;}
	.dialogitem>.main .content.chat-transfer{display: block; padding-bottom: 56upx; min-width:380upx; overflow: hidden;}
	.transfer-bar{position: absolute; left: 0; bottom: 0; height: 40upx; width: 100%; line-height: 40upx;}
	.transfer-icon{height: 80upx; width: 80upx; line-height: 80upx; text-align: center; border: 4upx solid #FFFFFF; border-radius: 50%;}
	.transfer-icon .cuIcon-order{transform: rotate(90deg);}
	.special-shareinfo .cu-item{padding: 16upx; padding-right: 40upx !important;}
	.special-shareinfo .cu-item>.cu-avatar{left: 20upx;}
	.special-shareinfo .cu-item>.content{left: 112upx; width: calc(100% - 156upx) !important;}
	.special-shareinfo .cu-item.arrow::before{right: 20upx;}
	.dialogitem .content .richtext{display: block; overflow: hidden; max-width: 100%;}
	.dialogitem .content .richtext *{max-width: 100%;}
</style>
