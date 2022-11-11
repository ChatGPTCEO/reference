<template>
	<view class="dialogpage">
		<view class="dialogcontent" :style="'height: '+heightincress">
			<scroll-view class="dialogchat solid-top" @scrolltoupper="onScrolltoUpper" scroll-y="true" :scroll-into-view="intoviewid">
				<view class="cu-chat" @touchstart="InputBule(false)">
					<block v-for="(msg,index) in data.messages" :key="index">
						<view class="cu-info round" v-if="msg.uid==0||msg.highmode==8" :id="'message'+msg.id">
							<rich-text :nodes="msg.message" @click="naviTo(msg.url)"></rich-text>
						</view>
						<view :id="'message'+msg.id" v-else>
							<msglist :msgindex="index" :chatevel="true" @genimages="getChatimage" @playaudio="doAudioPlay" @dospecial="doSpecialAction" @atuser="doAtUser" @lotap="doLongPress" :isManager="data.ismanager" :userId="userId" :chatimages="chatimages" :dialogtype="type" :chatid="chatid" :message="msg"></msglist>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="cu-bar input noshadow dialogoperation" :class="animationstyle">
				<view class="action" @click="recordShow()">
					<text class="text-grey" style="margin-right: 0;" :class="'cuIcon-'+(record.showing?'keyboard':'sound')"></text>
				</view>
				<view class="action record flex padding-right-sm" @longpress="recordStart" :class="record.showing?'':'hidden'">
					<button class="cu-btn radius bg-grey light flex-direction">暂未开放</button>
				</view>
				<input class="solid-bottom" adjust-position auto-blur hold-keyboard :focus="chatfocus" maxlength="-1" cursor-spacing="10" :class="[InputStyle,record.showing?'hidden':'']" @touchend.prevent="InputBule(true);" :confirm-type="chatpostcenter?'send':''" @confirm="postchatbybtn(1)" v-model="postdata.message" @blur="InputBule()" @input="InputInput"></input> 
				<view class="action" @click="faceShow(true)">
					<text class="text-grey" :class="'cuIcon-'+(face.showing?'keyboard':'emojifill')"></text>
				</view>
				<view class="action" @click="toolShow()" v-if="postdata.message==''">
					<text class="text-grey" :class="'cuIcon-roundadd'+(toolshowing?'':'fill')"></text>
				</view>
				<view class="action" @touchend.prevent="postchatbybtn(1)" v-else>
					<button class="cu-btn radius" :class="'bg-'+theme.actcolor">发送</button>
				</view>
			</view>
			<view class="recordbar padding radius" :class="'bg-'+theme.actcolor" v-if="record.recorder">
				<view class="flex text-center">
					<view class="padding-right-sm">
						<text class="cuIcon-voicefill" :class="record.cancel?'':'playing'"></text>
						<text v-if="record.cancel">松开手取消录音</text>
						<text v-else>您正在说话...</text>
					</view>
					<view class="flex-sub">
						<button class="cu-tag light round" :class="'bg-'+theme.actcolor">上滑取消</button>
					</view>
				</view>
			</view>
			<view class="face-contianer bg-gray" :class="[(face.showing?'':'hidden'),animationstyle]">
				<view class="nav bg-white">
					<view class="cu-item" :class="face.currface=='normal'?'text-green cur':''" @click="face.currface='normal'">经典</view>
					<view class="cu-item" :class="face.currface=='super'?'text-green cur':''" @click="face.currface='super'">超级</view>
					<view class="cu-item" :class="face.currface=='myface'?'text-green cur':''" @click="face.currface='myface'">我的</view>
				</view>
				<scroll-view scroll-y class="face-faces">
					<view class="face-normal face-items" v-if="face.currface=='normal'">
						<view class="grid col-8 text-center">
							<view class="face-item" @click="faceTochat('face_'+item.path+'_'+item.name,false)" v-for="(item,index) in face.faces.normal" :key="index">
								<image mode="aspectFill" :src="item.pic"></image>
							</view>
						</view>
					</view>
					<view class="face-super face-items" v-else-if="face.currface=='super'">
						<view class="grid col-4 padding-top">
							<view class="face-item" @click="faceTochat('superface_'+item,true)" v-for="(item,index) in face.faces.super" :key="index">
								<superface :face="item"></superface>
							</view>
						</view>
					</view>
					<view class="face-mine face-items" v-else>
						<view class="grid col-5 grid-square flex-sub padding-sm">
							<view class="bg-white radius" @click="myfaceadd()">
								<text class="cuIcon-cameraadd"></text>
							</view>
							<view @tap="myfaceTochat(index)" @longpress.stop="myfacerm(index)" class="bg-img" v-for="(item,index) in face.faces.myface" :key="index">
								<image :src="item.resource" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="face-bar flex justify-end" v-if="face.currface=='normal'">
					<button class="cu-btn radius shadow margin-right-sm text-lg" @click="facecancel()" :class="postdata.message==''?'bg-white':'bg-green'">
						<text class="cuIcon-backdelete"></text>
					</button>
					<button class="cu-btn radius shadow text-lg" @click="postchatbybtn(0)" :class="postdata.message==''?'bg-white':'bg-green'">
						<text>发送</text>
					</button>
				</view>
			</view>
			<view class="tool-contianer bg-gray" :class="[(toolshowing?'':'hidden'),animationstyle]">
				<view class="padding-tb grid col-4 padding-lr-sm">
					<view class="text-grey text-center padding-lr-sm">
						<view class="radius bg-white padding-tb-sm" @click="chooseImage()">
							<view class="text-xxxl">
								<text class="cuIcon-picfill"></text>
							</view>
							<view>图片</view>
						</view>
					</view>
					<view class="text-grey text-center padding-lr-sm">
						<view class="radius bg-white padding-tb-sm" @click="chooseVideo()">
							<view class="text-xxxl">
								<text class="cuIcon-videofill"></text>
							</view>
							<view>视频</view>
						</view>
					</view>
					<view class="text-grey text-center padding-lr-sm" v-if="data.redpack">
						<view class="radius bg-white padding-tb-sm" @click="naviTo('redpacket/post',{cid:chatid,type:type})">
							<view class="text-xxxl">
								<text class="cuIcon-redpacket_fill"></text>
							</view>
							<view>红包</view>
						</view>
					</view>
					<!--  #ifndef MP-QQ || MP-TOUTIAO -->
					<view class="text-grey text-center padding-lr-sm">
						<view class="radius bg-white padding-tb-sm" @click="doChooseLocation()">
							<view class="text-xxxl">
								<text class="cuIcon-locationfill"></text>
							</view>
							<view>位置</view>
						</view>
					</view>
					<!--  #endif -->
					<view class="text-grey text-center padding-lr-sm">
						<view class="radius bg-white padding-tb-sm" @click="naviTo('friend/share',{cid:chatid,type:type})">
							<view class="text-xxxl">
								<text class="cuIcon-friendfill"></text>
							</view>
							<view>名片</view>
						</view>
					</view>
					<view class="text-grey text-center padding-lr-sm" v-if="data.transfer">
						<view class="radius bg-white padding-tb-sm" @click="naviTo('credit/transfer',{uid:chatid})">
							<view class="text-xxxl">
								<text class="cuIcon-sponsorfill"></text>
							</view>
							<view>转账</view>
						</view>
					</view>
					<view class="text-grey text-center padding-lr-sm" v-for="(item, index) in navigation.dialog" :key="index">
						<view class="radius bg-white padding-tb-sm" @click="naviTo((item.inner==1?'':'net:')+item.url,{cid:chatid,type:type})" :class="item.extra">
							<view class="text-xxxl">
								<text :class="item.icon==''?'cuIcon-link':item.icon"></text>
							</view>
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showmodal=='groupnotice'?'show':''" v-if="data.group.id>0">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">群公告</view>
				</view>
				<view class="padding-xl">
					<scroll-view scroll-y class="group-notice">
						<rich-text :nodes="data.group.notice" :selectable="true"></rich-text>
					</scroll-view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn" :class="'bg-'+theme.actcolor" @tap="showmodal=''">我知道了</button>
					</view>
				</view>
			</view>
		</view>
		<view class="popupover" :class="showmodal=='popupover'?'active':''">
			<view class="popupover-bg" @touchstart="showmodal='';chatpopup.index=-1"></view>
			<view class="radius popcontainer shadow-blur" :style="'bottom:'+chatpopup.bottom+'px;left:'+chatpopup.left+'px'">
				<view class="cu-list grid text-white" :class="'col-'+chatpopup.colspan">
					<view class="cu-item JSClip_dialogindex" :data-clipboard-text="clipboardtext" :class="chatpopup.copy?'':'hidden'" v-if="platform=='h5'">
						<view class="cuIcon-copy"></view>
						<text>复制</text>
					</view>
					<view class="cu-item" :class="chatpopup.copy?'':'hidden'" @click="doCopy()" v-else>
						<view class="cuIcon-copy"></view>
						<text>复制</text>
					</view>
					<view class="cu-item" @click="doCancel()" v-if="chatpopup.cancel>0">
						<view class="cuIcon-delete"></view>
						<text>{{chatpopup.cancel==1?'撤回':'删除'}}</text>
					</view>
					<view class="cu-item" @click="doFavor()">
						<view class="cuIcon-favor"></view>
						<text>收藏</text>
					</view>
					<view class="cu-item" @click="doShare()">
						<view class="cuIcon-share"></view>
						<text>转发</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import store from '@/store/index.js'
	import core from "@/core.js"
	import swasocket from "@/swasocket.js"
	import superface from "@/components/util/superface.vue"
	import msglist from "@/components/util/msglist.vue"
	
	//#ifndef H5	
	const recorderManager = uni.getRecorderManager();
	//#endif
	
	export default {
		components: {superface,msglist},
		computed: mapState(['userId', 'userName','newMsg','Chatid', 'Chattype']),
		data() {
			return {
				chatid:0,
				platform:core.platform,
				clipboardtext:'',
				chatfocus:false,
				chatpostcenter:core.userset.post_center==1?true:false,
				chatpopup:{
					index:-1,
					bottom:0,
					left:0,
					colspan:4,
					copy:false,
					cancel:0
				},
				chatimages:[],
				genchating:false,
				heightincress:'100vh',
				inited:false,
				intoviewid:"",
				wxmediaid:"",
				animationstyle:'',
				sitename:core.system.name,
				showmodal:'',
				InputBottom:0,
				InputStyle:'',
				toolshowing:false,
				type:'normal',
				theme:core.style,
				navigation:{
					dialog:[]
				},
				postdata:{
					message:"",
					at:0,
					vid:0,
					highmode:0,
					yuyintime:0,
					dialogtype:'normal'
				},
				face:{
					inited:false,
					faces:{
						normal:[],
						myface:[],
						super:[]
					},
					showing:false,
					currface:'normal'
				},
				record:{
					showing:false,
					status:false,
				},
				langs:core.langs,
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
				data:{
					title:"会话",
					messages:[],
					firstid:0,
					imgcompress:0,
					lastid:0,
					avatar:'',
					newapplys:0,
					ismanager:false,
					redpack:false,
					transfer:false,
					group:{
						id:0,
						notice:"",
						noticedate:0
					},
					shareinfo:{
						title:"",
						cover:"",
						url:"",
						desc:""
					}
				}
			}
		},
		onLoad(options) {
			if(typeof(options.cid)=='undefined' || !options.cid) return core.toast('无效的会话ID','back');
			this.chatid = parseInt(options.cid);
			if(typeof(options.type)!='undefined' && options.type!='') this.type = options.type;
			this.postdata.cid = this.chatid;
			this.postdata.dialogtype = this.type;
			store.commit('chatinit',{
				cid:this.chatid,
				type:this.type
			});
			let self = this;
			let inithandel = function(){
				self.SocketInit(core.system.socket.type);
				self.initData('dialog',{cid:self.chatid,dialogtype:self.type});
			}
			if(!core.inited){
				core.inithandel = inithandel;
			}else{
				inithandel();
			}
			//#ifndef APP-PLUS
			let SystemInfoSync = uni.getSystemInfoSync();
			if(typeof(SystemInfoSync.windowTop)!='undefined'){
				this.heightincress = "calc(100vh - "+SystemInfoSync.windowTop+"px)";
			}else{
				this.heightincress = SystemInfoSync.windowHeight+"px";
			}
			//#endif
			//#ifdef H5
			if(typeof(ClipboardJS)!='undefined'){
				let clipboard = new ClipboardJS('.JSClip_dialogindex');
				clipboard.on('success', function(e) {
					core.toast('已复制到剪切板','','success');
				    e.clearSelection();
				});
				
				clipboard.on('error', function(e) {
					core.toast('复制失败');
				});
			}
			//#endif
			let bgcolor = core.style.navbg.replace('gradual-','');
			bgcolor = bgcolor.replace('bg-','');
			let fontcolor = '#ffffff';
			if(bgcolor=='white' || bgcolor=='yellow' || bgcolor=='gray') fontcolor = '#000000';
			uni.setNavigationBarColor({
				frontColor:fontcolor,
				backgroundColor:this.ColorList[bgcolor]
			});
		},
		onShow(){
			if(!this.inited || this.genchating) return;
			let that = this;
			core.get("dialog/redialog",function(res){
				if(res.type=='success'){
					that.data.lastid = res.message.lastmid;
					if(res.message.messages.length>0){
						that.data.messages = that.data.messages.concat(res.message.messages);
						setTimeout(function(){
							that.intoviewid = 'message' + that.data.lastid;
						},50);
					}
				}
				if(res.redirect!=''){
					core.toast(res.message,res.redirect,res.type);
				}
			},{dialogtype:this.type,cid:this.chatid,lastmid:this.data.lastid});
		},
		onUnload() {
			swasocket.Handels.dialog = null;
			store.commit('chatinit',{
				cid:0,
				type:'normal'
			});
		},
		onShareAppMessage(e){
			return {
				title:this.data.shareinfo.title,
				path:core.page(this.data.shareinfo.url),
			}
		},
		onNavigationBarButtonTap(e){
			if(e.type=='back') return core.back();
			if(this.type=='group'){
				core.navito('group/detail',{gid:this.chatid,fp:'dialog'});
			}else{
				core.navito('member/index',{uid:this.chatid,fp:'dialog'});
			}
		},
		methods:{
			initData(route, data={}, callback=false){
				let that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					that.inited = true;
					that.data = res;
					if(res.lastid>0){
						setTimeout(function(){
							that.intoviewid = 'message' + res.lastid;
						},200);
					}
					//初始化表情
					that.faceInit();
					if(res.group.id>0){
						that.GroupNoticeInit();
					}
					core.cachecloud('navigation',function(res){
						that.navigation = res;
					});
					uni.setNavigationBarTitle({
						title:res.title
					});
					if(core.inwechat){
						core.initshare(res.shareinfo.title,res.shareinfo.url,res.shareinfo.cover,res.shareinfo.desc);
					}
					if(callback){
						callback(res);
					}
				},data);
			},
			GroupNoticeInit(){
				if(this.data.group.notice=='') return false;
				this.showmodal = 'groupnotice';
			},
			doAudioPlay(index){
				console.log('当前版本不支持播放语音，请联系作者购买完整版');
				return core.toast('暂未开放');
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			getChatimage(pic){
				if(this.chatimages.indexOf(pic)<0){
					this.chatimages.push(pic);
				}
			},
			doChooseLocation(){
				return core.toast('暂未开放');
			},
			onScrolltoUpper(){
				if(this.data.messages.length<20) return false;
				let that = this;
				if(this.data.firstid==0){
					core.toast(this.langs.msg_no_anymore);
				}else{
					core.get("dialog",function(res){
						if(typeof(res.message)!='undefined') return core.report(res);
						that.data.firstid = res.firstid;
						if(res.count==0){
							core.toast(that.langs.msg_no_anymore);
						}else{
							that.data.messages = res.messages.concat(that.data.messages);
							setTimeout(function(){
								that.intoviewid = 'message' + res.lastid;
							},10);
						}
					},{cid:this.chatid,dialogtype:this.type,getchat:'yes',firstid:this.data.firstid},'json',true);
				}
			},
			chooseImage(){
				let that = this;
				if(core.inwechat){
					let wx = core.jweixin;
					return wx.chooseImage({
						count: 9, // 默认9
						success: function (ret) {
							for (let i in ret.localIds){
								wx.uploadImage({
									localId: ret.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
									isShowProgressTips: 1, // 默认为1，显示进度提示
									success: function (result) {
										core.get('attach/wxmedia',function(res){
											if (res.type=='success'){
												that.postdata.highmode = 4;
												that.postchat(res.message.path,res.message.url);
											}else {
												core.toast(res.message,res.redirect,res.type);
											}
										},{media_id:result.serverId});
									},fail:function (res) {
										util.toast(Luanguages.msg_upload_failed,'','error');
										console.log(res);
									}
								});
							}
						},fail:function (res) {
							util.toast(Luanguages.msg_operation_failed,'','error');
							console.log(res);
						}
					});
				}
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['compressed','original'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						let CallBack = function(FilePath){
							core.upload(FilePath,function(ret){
								that.postdata.highmode = 4;
								that.postchat(ret.path,ret.url);
							},'image','attach/upload');
						};
						for(let i in res.tempFilePaths){
							if(that.data.imgcompress>0){
								that.compressImage(res.tempFilePaths[i],CallBack);
							}else{
								CallBack(res.tempFilePaths[i]);
							}
						}
					}
				});
			},
			compressImage(tempFilePath,callback){
				console.log('当前版本不支持压缩图片，请联系作者购买完整版');
				return callback(tempFilePath);
			},
			chooseVideo(){
				var that = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						core.upload(res.tempFilePath,function(ret){
							that.postdata.highmode = 2;
							that.postdata.vid = ret.vid;
							that.postchat(ret.path,ret.url);
						},'video');
					}
				});
			},
			recordStart(e){
				console.log('当前版本不支持发送语音消息，请联系作者购买完整版');
				return core.toast('暂未开放');
			},
			recordShow(){
				this.record.showing = !this.record.showing;
				if(!this.record.showing) this.chatfocus = true;
			},
			toolShow(frombtn){
				this.intoviewid = '';
				if(this.toolshowing){
					//关闭工具栏
					this.toolshowing = false;
					this.animationstyle = '';
					if(frombtn) this.chatfocus = true;
				}else{
					//打开工具栏
					this.chatfocus = false;
					this.toolshowing = true;
					this.face.showing = false;
					let self = this;
					setTimeout(function(){
						self.intoviewid = 'message' + self.data.lastid;
					},30);
				}
			},
			facecancel(){
				if(this.postdata.message=='') return false;
				let message = this.postdata.message + '';
				let laststr = message.substr(message.length-1,1);
				if(laststr==']'){
					let regs = /\[face_([a-zA-Z0-9]+)_([a-zA-Z0-9]+)\]$/g;
					let matchresult = message.search(regs);
					if(matchresult>-1){
						this.postdata.message = message.replace(regs,'');
						return true;
					}
				}
				this.postdata.message = message.substr(0,message.length-1);
			},
			faceTochat(facename,autopost=false){
				let face = '['+facename+']';
				if(autopost){
					return this.postchat(face);
				}else{
					this.postdata.message += face;
				}
			},
			myfaceTochat(index){
				this.postdata.highmode = 4;
				let myface = this.face.faces.myface[index];
				this.postchat(myface.attach,myface.resource);
			},
			myfaceadd(){
				console.log('当前版本不支持发送语音消息，请联系作者购买完整版');
				return core.toast('暂未开放');
			},
			myfacerm(index){
				console.log('暂未开放');
			},
			faceShow(frombtn=false){
				this.intoviewid = '';
				if(this.record.showing) this.record.showing = false;
				if(this.face.showing){
					//关闭表情选择
					this.face.showing = false;
					this.face.temp = '';
					this.animationstyle = '';
					if(frombtn) this.chatfocus = true;
				}else{
					//打开表情选择
					if(!this.face.inited) return this.faceInit(true);
					this.chatfocus = false;
					this.face.showing = true;
					this.toolshowing = false;
					let self = this;
					setTimeout(function(){
						self.intoviewid = 'message' + self.data.lastid;
					},30);
				}
				return true;
			},
			doAtUser(e){
				this.postdata.at = e.uid,
				this.postdata.message = this.postdata.message + ' @' + e.nickname;
			},
			doSpecialAction(options){
				if(options.type=='showredpacket'){
					return core.toast('暂未开放');
				}
			},
			doShare(){
				if(this.chatpopup.index<0) return false;
				this.showmodal = '';
				return core.navito('dialog/share',{mid:this.data.messages[this.chatpopup.index].id}),this.chatpopup.index=-1;
			},
			doCancel(){
				if(this.chatpopup.index<0) return false;
				console.log('当前版本不支持撤回消息，请联系作者购买完整版');
				return core.toast('暂未开放');
			},
			doFavor(){
				console.log('当前版本不支持收藏消息，请联系作者购买完整版');
				return core.toast('暂未开放');
			},
			doCopy(){
				if(this.chatpopup.index<0) return false;
				return core.copy(this.clipboardtext);
			},
			doLongPress(res){
				let index = res.index;
				this.chatpopup.index = index;
				let popcol = 3;
				this.chatpopup.copy = false;
				if(this.data.messages[index].highmode<=1){
					let text = this.data.messages[index].message + '';
					this.clipboardtext = text.replace(/<[^>]*>|/g,"");
					if(this.clipboardtext!=''){
						popcol += 1;
						this.chatpopup.copy = true;
					}
				}
				if(this.data.messages[index].uid!=this.userId && !this.data.ismanager){
					popcol -= 1;
					this.chatpopup.cancel = 0;
				}else{
					this.chatpopup.cancel = this.data.messages[index].cancel==1 ? 1 : 2;
				}
				this.chatpopup.colspan = popcol;
				this.chatpopup.bottom = res.bottom;
				this.chatpopup.left = res.left;
				this.showmodal = 'popupover';
			},
			faceInit(autoshow=false){
				if(!this.face.inited){
					let cachekey = '_xfy_whotalk_face_' + this.userId;
					let self = this;
					return core.cacheread(cachekey,function(res){
						self.face.inited = true;
						self.face.faces = res.data;
						if(autoshow){
							self.faceShow();
						}
					},function(){
						core.get('face.getface',function(res){
							if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined') return core.report(res);
							self.face.inited = true;
							self.face.faces = res;
							core.cacheset(cachekey,res);
							if(autoshow){
								self.faceShow();
							}
						});
					});
				}else if(autoshow){
					return this.faceShow();
				}
			},
			posttemp(postdata,tempmsg=''){
				let message = tempmsg=='' ? postdata.message : tempmsg;
				let mediaid = '';
				let messageid = 'temp' + this.data.messages.length;
				let special = {
					type:'normal',
					value:''
				};
				if(typeof(message)=='string'){
					if(message.search(/\[superface_([a-z]+)\]/)>-1){
						special = {
							type:'superface',
							value:message.replace(/\[superface_([a-z]+)\]/,"$1")
						};
					}
				}
				if(postdata.highmode==5){
					special.value = 2;
					if(message.indexOf('wxvoice:')===0){
						mediaid = message.replace('wxvoice:','');
						message = '';
					}
				}
				var messageslength = this.data.messages.push({
					addtime:0,
					at:postdata.at,
					avatar:this.data.avatar,
					cancel:1,
					dateline:0,
					datetime:'刚刚',
					gid:this.type=='group'?this.chatid:0,
					highmode:postdata.highmode,
					id:messageid,
					mediaid:mediaid,
					message:message,
					nickname:this.userName,
					openid:this.userId,
					poster:'@/static/images/poster.jpg',
					special:special,
					status:0,
					touid:this.type=='normal'?this.chatid:0,
					uid:this.userId,
					uniacid:0,
					url:"",
					vid:postdata.vid,					
					warned:0,
					yuyintime:parseInt(postdata.yuyintime/1000)
				});
				let self = this;
				setTimeout(function(){
					self.intoviewid = 'message' + messageid;
				},30);
				return messageslength - 1;
			},
			postchat(msg='',tempmsg=''){
				let message = msg=='' ? this.postdata.message : msg;
				if(message=='') return core.toast(core.langs.msg_send_empty);
				let postdata = JSON.parse(JSON.stringify(this.postdata));
				postdata.message = message;
				let chatpushtemp = this.posttemp(postdata,tempmsg);
				let self = this;
				core.post("dialog/postchat",function(res){
					if(res.status!=1){
						self.data.messages[chatpushtemp].status = -1;
						return core.toast(res.message)
					};
					self.postresult(res,chatpushtemp);
				},postdata);
				//清空输入内容
				this.postdata.message = '';
				this.postdata.at = 0;
				this.postdata.highmode = 0;
				this.postdata.yuyintime = 0;
				this.InputStyle = '';
				return true;
			},
			postresult(res,chatpushtemp=0){
				//将发送内容插入列表
				this.data.messages.splice(chatpushtemp,1,res.message);
				setTimeout(function(){
					this.intoviewid = 'message'+res.message.id;
				},30);
				this.data.lastid = res.message.id;
				//更新首页
				let postevent = swasocket.PostEvent;
				if(typeof(postevent)=='function'){
					let avatar = this.type=='group' ? this.data.group.pic : this.data.member.avatar;
					postevent({cid:this.chatid,type:this.type,spct:res.spct,avatar:avatar,title:this.data.title});
				}
				//异步通知对方
				if(this.type=='normal'){
					core.get("dialog/notice",function(rets){},{cid:this.chatid,type:this.type,mid:res.message.id});
				}
			},
			SocketSend(data,touser,server=''){
				let socketdata = {
					"Method": "Message/SendToUsers",
					"Type": 0,
					"Message": JSON.stringify(data),
					"data":{
						"userIds":touser
					}
				};
				swasocket.Send(socketdata,'local',server);
			},
			SocketInit(ctype=''){
				var that = this;
				if(ctype=='local' || ctype=='tim'){
					swasocket.Handels.dialog = this.SocketRecive;
				}
			},
			SocketRecive(socketdata){
				if(socketdata.type=='dialog'){
					if(socketdata.dialogid==this.chatid && socketdata.dialogtype==this.type){
						return this.GetnewChat(socketdata.mid);
					}
				}else if(socketdata.type=='rmdialog'){
					//从列表中删除会话
					let ctypeid = this.type + this.chatid;
					if(socketdata.ctypeid==ctypeid){
						core.back();
					}
				}else if(socketdata.type=='canclechat'){
					if(socketdata.dialogtype==this.type && socketdata.dialogid==this.chatid){
						for(let index in this.data.messages){
							if(this.data.messages[index].id==socketdata.mid){
								this.data.messages[index].highmode = 8;
								this.data.messages[index].message = socketdata.spct;
								break;
							}
						}
					}
				}
			},
			GetnewChat(mid=0){
				let postdata = {mid:mid,cid:this.chatid,setread:1,dialogtype:this.type};
				this.genchating = true;
				var that = this;
				return core.post("dialog/getnewchat",function(res){
					that.genchating = false;
					if(res.type!='success') return core.toast(res.message);
					that.data.messages.push(res.message);
					that.data.lastid = res.message.id;
					setTimeout(function(){
						that.intoviewid = 'message' + res.message.id;
					},50)
				},postdata);
			},
			postchatbybtn(fromtext){
				if(fromtext==1 && !this.face.showing) this.chatfocus = true;
				this.postchat();
			},
			InputBule(autofocus=false) {
				if(this.toolshowing) return this.toolShow(autofocus);
				if(this.face.showing) return this.faceShow(autofocus);
				this.chatfocus = autofocus;
			},
			InputInput(e){
				if(this.postdata.message==''){
					this.postdata.at = 0;
					this.InputStyle = '';
				}else{
					let hasenter = e.detail.value.indexOf("\n");
					if(hasenter==-1){
						this.InputStyle = '';
					}else{
						if(this.chatpostcenter){
							this.postdata.message.replace("\n","");
							return this.postchat();
						}
						this.InputStyle = 'areainput';
					}
				}
			}
		}
	}
</script>

<style>
	@import "@/colorui/animation.css";
	
	.dialogcontent{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	.dialogchat{
		flex: 1;
		overflow: auto;
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.dialogoperation{
		display: flex;
		height: 80rpx;
		flex-shrink: 0;
		width: 100vw;
	}
	.cu-chat{overflow: hidden;}
	.cu-chat.hasbg{background: no-repeat center; background-attachment: fixed; background-size: 30%; min-height: calc(100vh-190upx);}
	
	.group-notice{max-height: 40vh; font-size: 32upx; line-height: 50upx; text-indent: 64upx; text-align: left; white-space: pre-wrap;}
	
	.cu-bar.foot, .face-contianer, .tool-contianer{animation-duration: 0.3s;}
	.cu-bar .action.record{flex: 1;}
	.cu-bar .action.record .cu-btn{width: 100%;}
	.face-contianer{height: 260px; width: 100%; z-index: 100; overflow: hidden;}
	.face-faces{height: 430upx; position: relative;}
	.face-items{padding: 8upx;}
	.face-normal{position: relative; overflow: hidden; padding-bottom: 66upx;}
	.face-normal .face-item{padding: 10upx; overflow: hidden;}
	.face-normal .face-item image{max-width: 100%; width: 62upx; height: 62upx;}
	.face-super .face-item .superface{transform: scale(0.6); margin: -30upx;}
	.face-bar{position: absolute; right: 8upx; bottom: 8upx;}
	.tool-contianer{height: 170px; width: 100%; z-index: 100;}
	.tool-contianer .grid>view{margin-bottom: 20upx;}
	.recordbar{position: fixed; top: 50%; left: 50%; width: 460upx; margin-left: -230upx; height: 124upx; margin-top: -62upx; line-height: 62upx; z-index: 999;}
	.bottom0{bottom: 0;}
	.cu-bar.input{padding-right: 0;}
	.cu-bar.input .areainput{max-height: 148upx; line-height: 50upx; padding: 6upx 0; overflow: hidden;}
	.popcontainer{position: absolute; left: 100upx; background: #2C405A; padding: 10upx; width: 320upx;}
	.popcontainer .cu-list.grid{background: none;}
	.popcontainer .cu-list.grid>.cu-item{padding: 4upx 10upx; text-align: center;}
	.popcontainer .cu-list.grid>.cu-item [class*=cuIcon]{font-size: 36upx; margin-top: 0;}
	.popcontainer .cu-list.grid>.cu-item text{color: #FFFFFF; font-size: 24upx;}
	.popcontainer::after{width: 20upx; height: 20upx; background: #2C405A; content: ''; left: 50%; margin-left: -10upx; bottom: -8upx; position: absolute; transform: rotate(45deg); border-radius: 4upx;}
</style>
