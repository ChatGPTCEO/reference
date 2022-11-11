<template>
	<view class="contianer" :class="'wp-'+platform">
		<cu-custom v-if="hasLogin" :bgColor="theme.bgnav" :isBack="false">
			<!-- #ifdef MP -->
			<block slot="left">
				<view class="text-xxl action" @click="naviTo('album/post')" v-if="navkey=='more' && data.switchs.albumpost">
					<text class="cuIcon-cameraadd"></text>
				</view>
				<view class="text-xxl action" @click="showmodal='popupover'" v-else-if="navigation.popup.length>0 || data.switchs.popupscan">
					<text class="cuIcon-roundadd"></text>
				</view>
			</block>
			<!-- #endif -->
			<block slot="content">{{data.title}}</block>
			<!-- #ifndef MP -->
			<block slot="right">
				<view class="text-xxl action right" @click="naviTo('album/post')" v-if="navkey=='more' && data.switchs.albumpost">
					<text class="cuIcon-cameraadd"></text>
				</view>
				<view class="text-xxl action right" @click="showmodal='popupover'" v-else-if="navigation.popup.length>0 || data.switchs.popupscan">
					<text class="cuIcon-roundadd"></text>
				</view>
			</block>
			<!-- #endif -->
		</cu-custom>
		<aboutus v-if="!hasLogin" :auditmode="auditmode" :btnstyle="theme.actcolor" :runshow="runshows"></aboutus>
		<view v-else>
			<view class="splash bg-gray" v-if="!inited">
				<image :src="splash" mode="aspectFill"></image>
				<view class="loader">
					<view class="cu-load loading text-white"></view>
				</view>
			</view>
			<view class="main-pages">
				<view class="mainpageitem" :class="navkey=='dialogs'?'active':''">
					<view class="cu-list menu-avatar dialoglist" v-if="data.dialogs.length>0">
						<view class="cu-item" @longpress="doActionDialog(index)" @click="makechat(item.cid,item.type)" v-for="(item, index) in data.dialogs" :key="index">
							<view class="cu-avatar radius lg" :style="'background-image:url('+item.avatar+');'"></view>
							<view class="content">
								<view><view class="text-cut">{{item.title}}</view></view>
								<view class="text-gray text-sm flex"> <view class="text-cut">{{item.nicknametext}}{{item.message}}</view></view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.datetime}}</view>
								<view class="cu-tag round bg-red sm" v-if="item.noread>0">{{item.noread}}</view>
							</view>
						</view>
					</view>
					<view class="padding solid-top" v-else>
						<view class="text-empty">空无一人，快找个人聊聊吧~</view>
					</view>
				</view>
				<view class="mainpageitem" :class="navkey=='contacts'?'active':''">
					<view class="cu-list menu">
						<view class="cu-item arrow" @click="naviTo('friend/news')">
							<view class="content">
								<text class="cuIcon-friendadd text-grey text-xl"></text>
								<text>新的朋友</text>
							</view>
							<view class="action" v-if="data.newfriends>0">
								<view class="cu-tag round bg-red">{{data.newfriends}}</view>
							</view>
						</view>
						<view class="cu-item arrow" v-if="data.switchs.group" @click="naviTo('group/mine')">
							<view class="content">
								<text class="cuIcon-group text-grey text-xl"></text>
								<text>{{text.text_groupname}}</text>
							</view>
						</view>
					</view>
					<view class="margin-top" v-if="friends.data.length>0">
						<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ indexes.listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - '+indexes.spacehei+'px)'}]" :scroll-with-animation="true" :enable-back-to-top="true">
							<block v-for="(item,index) in friends.data" :key="index">
								<view :class="'indexItem-' + item.letter" :id="'indexes-' + item.letter" :data-index="item.letter">
									<view class="padding-sm">{{item.letter}}</view>
									<view class="cu-list menu-avatar no-padding">
										<view class="cu-item" @click="naviTo('member/index',{uid:value.fuid})" v-for="(value,key) in item.list" :key="key">
											<view class="cu-avatar round" :style="'background-image:url('+value.avatar+');'"></view>
											<view class="content">
												<view><view class="text-cut text-lg">{{value.remark}}</view></view>
											</view>
										</view>
									</view>
								</view>
							</block>
							<view class="padding text-center">
								<text class="text-lg">共{{friends.totals}}位好友</text>
							</view>
						</scroll-view>
						<view class="indexBar" :style="[{height:'calc(100vh - ' + indexes.CustomBar + 'px - '+indexes.spacehei+'px)'}]">
							<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
								<view class="indexBar-item" v-for="(item,index) in friends.data" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.letter}}</view>
							</view>
						</view>
						<view v-show="!hidden" class="indexToast">
							{{indexes.listCur}}
						</view>
					</view>
					<view class="text-empty" v-else>
						<text v-if="friends.inited">{{text.text_empty}}</text>
						<text v-else class="cu-load load-cuIcon loading">好友加载中...</text>
					</view>
				</view>
				<view class="mainpageitem" :class="navkey=='more'?'active':''">
					<view class="cu-list menu" v-if="data.switchs.square || data.switchs.album">
						<view v-if="data.switchs.square" class="cu-item arrow" @click="naviTo('album/index')">
							<view class="content">
								<text class="cuIcon-discover text-red" style="font-size: 40upx;"></text>
								<text class="text-lg">广场</text>
							</view>
						</view>
						<view v-if="data.switchs.album" class="cu-item arrow" @click="naviTo('album/friend')">
							<view class="content">
								<image src="@/static/images/icon_pyq.png" class="png" mode="aspectFit"></image>
								<text class="padding-left-xs">{{text.text_friends_album}}</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu" v-if="data.switchs.groupentry">
						<view class="cu-item arrow" @click="naviTo('group/index')">
							<view class="content">
								<text class="cuIcon-group text-blue" style="font-size: 40upx;"></text>
								<text class="text-lg">全部群组</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu" v-if="data.switchs.scan || data.switchs.search">
						<view v-if="data.switchs.scan" class="cu-item arrow" @click="doscan()">
							<view class="content">
								<text class="cuIcon-scan text-orange" style="font-size: 40upx;"></text>
								<text class="text-lg">扫一扫</text>
							</view>
						</view>
						<view v-if="data.switchs.search" class="cu-item arrow" @click="naviTo('search/index')">
							<view class="content">
								<text class="cuIcon-search text-green" style="font-size: 40upx;"></text>
								<text class="text-lg">搜一搜</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu" v-if="navigation.more.length>0">
						<view class="cu-item arrow" @click="naviTo((item.inner==1?'':'net:')+item.url)" v-for="(item, index) in navigation.more" :key="index">
							<view class="content" :class="item.extra">
								<text :class="item.icon" style="font-size: 40upx;" v-if="item.icon!=''"></text>
								<text class="cuIcon-link text-blue" style="font-size: 40upx;" v-else></text>
								<text class="text-lg">{{item.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="mainpageitem" :class="navkey=='mine'?'active':''">
					<view class="cu-list menu-avatar solid-top">
						<view class="cu-item arrow" @click="naviTo('member/account')">
							<view class="cu-avatar radius lg" :style="'background-image:url('+data.userinfo.avatar+');'"></view>
							<view class="content">
								<view>
									<view class="text-cut text-xl">
										{{data.userinfo.nickname}}
										<text class="cu-tag bg-orange round margin-left-sm light">{{data.userinfo.grouptitle}}</text>
									</view>
								</view>
								<view class="text-gray text-sm flex" v-if="data.userid!=''">
									<view class="text-cut">{{data.userid}} : {{data.userid=='ID'?data.userinfo.uid:data.userinfo.userid}}</view>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-lg">
									<text class="cuIcon-qr_code"></text>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-list menu" v-if="data.switchs.credit">
						<view class="cu-item arrow" @click="naviTo('credit/index')">
							<view class="content">
								<text class="cuIcon-pay" :class="'text-'+theme.actcolor" style="font-size: 40upx;"></text>
								<text class="text-lg">钱包</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu">
						<view class="cu-item arrow" @click="naviTo('album/index',{uid:data.userinfo.uid})">
							<view class="content">
								<text class="cuIcon-pic text-mauve" style="font-size: 40upx;"></text>
								<text class="text-lg">相册</text>
							</view>
						</view>
						<view class="cu-item arrow" @click="naviTo('member/collection')">
							<view class="content">
								<text class="cuIcon-favor text-orange" style="font-size: 40upx;"></text>
								<text class="text-lg">收藏</text>
							</view>
						</view>
						<view class="cu-item arrow" v-if="data.switchs.group" @click="naviTo('member/group')">
							<view class="content">
								<text class="cuIcon-group text-blue" style="font-size: 40upx;"></text>
								<text class="text-lg">群组</text>
							</view>
							<view class="action" v-if="data.groupapplys>0">
								<view class="cu-tag round bg-red sm">{{data.groupapplys}}</view>
							</view>
						</view>
					</view>
					<view class="cu-list menu">
						<view class="cu-item arrow" @click="naviTo('member/setting')">
							<view class="content">
								<text class="cuIcon-settings text-cyan" style="font-size: 40upx;"></text>
								<text class="text-lg">设置</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar tabbar bg-white foot" v-if="data.mainnavs.length>0">
				<view class="action" :class="navkey==item.key?'text-'+theme.actcolor:''" @click="checkoutbar(item.key,item.url)" v-for="(item, index) in data.mainnavs" :key="index">
					<view :class="item.icon+(navkey==item.key?'fill':'')">
						<view class="cu-tag badge" v-if="item.key=='dialogs' && newMsg>0">{{newMsg}}</view>
						<view class="cu-tag badge" v-if="item.key=='contacts' && data.newfriends>0">{{data.newfriends}}</view>
						<view class="cu-tag badge" v-if="item.key=='mine' && data.groupapplys>0">{{data.groupapplys}}</view>
					</view>
					{{item.name}}
				</view>
			</view>
			<view class="popupover" :class="showmodal=='popupover'?'active':''" v-if="navigation.popup.length>0 || data.switchs.popupscan">
				<view class="popupover-bg" @tap="showmodal=''"></view>
				<view class="radius popcontainer shadow-blur">
					<view class="cu-list menu">
						<view class="cu-item" @click="doscan()" v-if="data.switchs.popupscan">
							<view class="content">
								<text class="cuIcon-scan"></text>
								<text>扫一扫</text>
							</view>
						</view>
						<view class="cu-item" @click="naviTo((item.inner==1?'':'net:')+item.url)" v-for="(item,index) in navigation.popup" :key="index">
							<view class="content">
								<text :class="item.icon==''?'cuIcon-link':item.icon"></text>
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="showmodal=='actiondialog'?'show':''">
				<view class="cu-modal-bg" @tap="showmodal=''"></view>
				<view class="cu-dialog">
					<view class="padding">
						<view class="flex flex-direction">
							<button @click="doRmDialog()" class="cu-btn bg-red lg">删除</button>
							<button @click="showmodal=''" class="cu-btn bg-grey lg margin-top">取  消</button>
						</view>
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
	import aboutus from "@/components/util/aboutus.vue"
	
	export default {
		components: {aboutus},
		computed: mapState(['userId', 'hasLogin', 'userName', 'userSign','newMsg','Chatid', 'Chattype']),
		data() {
			return {
				runshows:[],
				inited:false,
				theme:core.style,
				splash:core.system.splash,
				actionindex:-1,
				auditmode:{
					status:false,
					text:'立即体验',
					url:'auth/index',
					login:''
				},
				dialogs:[],
				navkey:"",
				platform:core.platform,
				showmodal:'',
				hidden:true,
				text:core.langs,
				indexes:{
					listCurID:'',
					CustomBar:this.CustomBar,
					listCur:'',
					boxTop:0,
					barTop:0,
					spacehei:165
				},
				friends:{
					inited:false,
					data:[],
					totals:0
				},
				navigation:{
					more:[],
					popup:[]
				},
				data:{
					title:"首页",
					dialogs:[],
					mainnavs:[],
					noreads:0,
					newfriends:0,
					groupapplys:0,
					navkey:"",
					switchs:{
						credit:core.system.creditswitch,
						square:true,
						album:true,
						albumpost:true,
						group:core.system.groupswitch,
						groupentry:true,
						scan:true,
						search:true,
						popupscan:true
					},
					userid:"",
					userinfo:{
						uid:0,
						nickname:"未登录",
						avatar:core.system.logo,
						userid:"",
						grouptitle:"默认用户",
						groupid:0
					},
					userset:{},
					shareinfo:{
						"title":"",
						"desc":"",
						"cover":"",
						"url":""
					}
				}
			}
		},
		onLoad() {
			this.initData('appmain');
		},
		onShow() {
		},
		onShareAppMessage(e){
			return {
				title:this.data.shareinfo.title,
				path:core.page(this.data.shareinfo.url),
				imageUrl:this.data.shareinfo.cover,
				desc:this.data.shareinfo.desc
			}
		},
		onPullDownRefresh() {
			if(!this.hasLogin){
				this.initSystem();
			}else{
				let self = this;
				this.initData('appmain',{},function(){
					self.initNavigation(true);
				});
			}
			uni.stopPullDownRefresh();
		},
		sockets:{
			new_msg(msg){
				let socketdata = typeof(msg.content)=='undefined' ? msg : JSON.parse(msg.content);
				return this.socketrecive(socketdata);
			}
		},
		methods:{
			initSystem(){
				let self = this;
				core.initsys(core.userinfo.token,function(){
					self.theme = core.style;
					self.text = core.langs;
					self.runshows = core.system.apprunshow;
					self.splash = core.system.splash;
					uni.setNavigationBarTitle({
						title:core.system.name
					});
				});
			},
			initData(route, data={}, callback=false){
				let that = this;
				if(!core.inited) {
					core.inithandel = function(){
						that.initData('appmain');
						that.theme = core.style;
						that.platform = core.platform;
						that.text = core.langs;
						that.runshows = core.system.apprunshow;
						that.splash = core.system.splash;
						core.inithandel = null;
						uni.setNavigationBarTitle({
							title:core.system.name
						});
					}
					return core.toast('初始化中...');
				}
				this.runshows = core.system.apprunshow;
				if(!this.hasLogin){
					// #ifdef MP
					if(core.system.auditmode.status){
						this.auditmode = core.system.auditmode;
					}
					// #endif
					return uni.setNavigationBarTitle({
						title:core.system.name
					});
				}
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					that.data = res;
					if(!that.inited){
						that.initNavigation();
					}
					that.inited = true;
					core.userset = res.userset;
					if(that.navkey=='') that.navkey = res.navkey;
					that.initsocket(core.system.socket.type);
					store.commit('setnewmsg',res.noreads);
					uni.setNavigationBarTitle({
						title:res.title
					});
					if(res.releasedate!=core.system.releasedate){
						that.initSystem();
					}else if(res.userinfo.groupid!=core.userinfo.groupid){
						core.cacheclear();
					}
					if(!res.switchs.group){
						that.indexes.spacehei = 115;
					}
					for(let i in res.dialogs){
						that.dialogs[i] = res.dialogs[i].type+''+res.dialogs[i].cid;
					}
					if(core.inwechat){
						core.initshare(res.shareinfo.title,res.shareinfo.url,res.shareinfo.cover,res.shareinfo.desc);
					}
					if(callback){
						callback(res);
					}
				},data);
			},
			initFriends(){
				if(this.friends.inited) return true;
				let self = this;
				return core.get('friend',function(res){
					if(typeof(res.type)!='undefined') return core.report(res);
					self.friends.inited = true;
					self.friends.data = res.data;
					self.friends.totals = res.totals;
					if(res.data.length>0){
						self.indexes.listCur = res.data[0].letter;
						setTimeout(function(){
							self.indexesReady();
						},100);
					}
				});
			},
			initNavigation(nocache=false){
				let self = this;
				return core.cachecloud('navigation',function(res){
					self.navigation = res;
				},nocache);
			},
			socketrecive(socketdata){
				//console.log(socketdata);
				if(socketdata.type=='dialog'){
					let ctypeid = socketdata.dialogtype + '' + socketdata.dialogid;
					if(socketdata.dialogid!=this.Chatid || socketdata.dialogtype!=this.Chattype){
						//增加总未读消息数
						store.commit('getnewmsg');
						//增加列表未读消息数量
						if(this.dialogs.indexOf(ctypeid)==-1){
							//消息列表不存在，则往列表添加聊天
							let dialog = {
								cid:socketdata.dialogid,
								type:socketdata.dialogtype,
								avatar:socketdata.dialogtype=='group'?socketdata.cover:socketdata.avatar,
								title:socketdata.title,
								nicknametext:'',
								message:socketdata.spct,
								datetime:'刚刚',
								noread:1
							}
							this.data.dialogs.unshift(dialog);
							this.dialogs.unshift(ctypeid);
						}else{
							//消息列表存在，则增加未读消息数量
							let dialogindex = this.dialogs.indexOf(ctypeid);
							this.data.dialogs[dialogindex].noread += 1;
							//同时调换顺序到最前面
							if(dialogindex!=0){
								let dialog = this.data.dialogs[dialogindex];
								this.data.dialogs.splice(dialogindex,1);
								this.dialogs.splice(dialogindex,1);
								this.data.dialogs.unshift(dialog);
								this.dialogs.unshift(ctypeid);
							}
						}
					}
					if(this.dialogs.indexOf(ctypeid)>-1){
						//往更新消息列表显示内容
						let dialogindex = this.dialogs.indexOf(ctypeid);
						this.data.dialogs[dialogindex].datetime = '刚刚';
						this.data.dialogs[dialogindex].nicknametext = socketdata.dialogtype=='normal'||this.data.dialogs[dialogindex].title==socketdata.nickname ? '' : socketdata.nickname + '：';
						this.data.dialogs[dialogindex].message = socketdata.spct;
					}
				}else if(socketdata.type=='makefriend'){
					this.data.newfriends += 1;
				}else if(socketdata.type=='groupapplys'){
					this.data.groupapplys += 1;
				}else if(socketdata.type=='rmdialog'){
					//从列表中删除会话
					let ctypeid = socketdata.ctypeid;
					this.doRmDialogFromList(ctypeid);
				}
			},
			initsocket(scktype){
				var that = this;
				swasocket.PostEvent = this.postevent;
				if(scktype=='local' || scktype=='tim'){
					swasocket.Handels.mainpage = this.socketrecive;
				}
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			doscan(){
				return core.scan();
			},
			doActionDialog(index){
				this.actionindex = index;
				this.showmodal = 'actiondialog';
			},
			doRmDialog(){
				return core.toast('暂未开放');
			},
			doRmDialogFromList(ctypeid){
				return core.toast('暂未开放');
			},
			indexesReady(){
				let that = this;
				uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
					that.indexes.boxTop = res.top
				}).exec();
				uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
					that.indexes.barTop = res.top
				}).exec();
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.indexes.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					if(num<that.friends.data.length){
						that.indexes.listCur = that.friends.data[num].letter;
					}
				};
			},
			getCur(e) {
				this.hidden = false;
				this.indexes.listCur = this.friends.data[e.target.id].letter;
			},
			setCur(e) {
				this.hidden = true;
				this.indexes.listCur = this.indexes.listCur
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.indexes.listCurID = this.indexes.listCur
			},
			postevent(data={}){
				let ctypeid = data.type + '' + data.cid;
				let dialogindex = this.dialogs.indexOf(ctypeid);
				if(dialogindex==-1){
					//消息列表未存在
					let dialog = {
						cid:data.cid,
						type:data.type,
						avatar:data.avatar,
						title:data.title,
						nicknametext:data.type=='group'?'我：':'',
						message:data.spct,
						datetime:'刚刚',
						noread:0
					};
					this.data.dialogs.unshift(dialog);
					this.dialogs.unshift(ctypeid);
					return true;
				}
				//更新未读消息数
				let noreads = parseInt(this.data.dialogs[dialogindex].noread);
				if(noreads>0){
					store.commit('setnewmsg',(this.newMsg-noreads));
				}
				//将发送的内容到消息列表
				this.data.dialogs[dialogindex].datetime = '刚刚';
				this.data.dialogs[dialogindex].nicknametext = data.type=='normal' ? '' : '我：';
				this.data.dialogs[dialogindex].message = data.spct;
				this.data.dialogs[dialogindex].noread = 0;
				if(dialogindex!=0){
					let dialog = this.data.dialogs[dialogindex];
					this.data.dialogs.splice(dialogindex,1);
					this.dialogs.splice(dialogindex,1);
					this.data.dialogs.unshift(dialog);
					this.dialogs.unshift(ctypeid);
				}
			},
			makechat(cid=0,ctype='normal'){
				if(cid<=0) return core.toast('无效的会话ID');
				let ctypeid = ctype + '' + cid;
				let dialogindex = this.dialogs.indexOf(ctypeid);
				let noread = this.newMsg - this.data.dialogs[dialogindex].noread;
				store.commit('setnewmsg',noread);
				this.data.dialogs[dialogindex].noread = 0;
				return core.navito('dialog/index',{cid:cid,type:ctype})
			},
			checkoutbar(navkey='',url=''){
				if(url!='') return core.navito(url);
				this.navkey = navkey;
				if(navkey=='contacts'){
					this.initFriends();
				}
			}
		}
	}
</script>

<style>
	page{padding-bottom: 100upx;}
	.splash{position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 999;}
	.splash image{width: 100%; height: 100%;}
	.splash .loader{position: absolute; left: 50%; top: 50%; width: 200upx; margin-left: -100upx; background: rgba(0,0,0,0.3); border-radius: 6upx; margin-top: -42upx;}
	.main-pages .mainpageitem{display: none;}
	.main-pages .mainpageitem.active{display: block;}
	.popcontainer{position: absolute; right: 20upx; background: #2C405A; padding: 10upx 20upx; top: calc(90upx + var(--status-bar-height));}
	.popcontainer .cu-item{background: none !important; color: #FFFFFF; min-height: 72upx; padding:0 10upx;}
	.popcontainer .cu-item::after{border-color: #666666 !important;}
	.popcontainer .cu-item text[class*=cuIcon]{font-size: 36upx;}
	.popcontainer::after{width: 20upx; height: 20upx; background: #2C405A; content: ''; right: 16upx; top: -8upx; position: absolute; transform: rotate(45deg); border-radius: 4upx;}
	.wp-ttapp .popcontainer, .wp-wxapp .popcontainer{right: auto; left: 20upx;}
	.wp-ttapp .popcontainer::after, .wp-wxapp .popcontainer::after{right: auto; left: 16upx;}
</style>
