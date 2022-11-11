<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content"></block>
		</cu-custom>
		<swaload :hasTopbar="true" v-if="!loaded"></swaload>
		<view class="bg-white">
			<view class="cu-list menu-avatar padding-top-xs">
				<view class="cu-item padding-bottom" style="height: 214upx;">
					<view class="cu-avatar radius xl" @click="doPrevImg(data.member.avatar)" style="top: 0;" :style="'background-image:url('+data.member.avatar+');'"></view>
					<view class="content" style="top: 0;">
						<view class="text-xxxl text-bold text-black">
							{{data.friend.remark || data.member.nickname}}
							<text class="margin-left-xs" :class="data.member.gender==1?'text-blue cuIcon-people':'text-pink cuIcon-friendfamous'" v-if="data.member.gender>0"></text>
						</view>
						<view class="text-content margin-top-xs">
							<view class="text-grey" v-if="data.friend.id>0 && data.member.nickname!=data.friend.remark">昵称：{{data.member.nickname}}</view>
							<block v-if="data.userid!='' && (data.friend.status==1 || data.member.uid==userId)">
								<view class="text-grey JSClip_memberindex" :data-clipboard-text="user_id" v-if="platform=='h5'">
									{{data.userid}}：{{data.userid=='ID'?data.member.uid:data.member.userid}}
									<text class="cuIcon-copy margin-left-xs"></text>
								</view>
								<view class="text-grey" v-else @click="doCopy(user_id)">
									{{data.userid}}：{{data.userid=='ID'?data.member.uid:data.member.userid}}
									<text class="cuIcon-copy margin-left-xs"></text>
								</view>
							</block>
							<view class="text-grey">
								地区：
								<text v-if="data.member.resideprovince=='' && data.member.residecity==''">未知地区</text>
								<text v-else>
									{{data.member.resideprovince}}  {{data.member.residecity}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" style="margin-top: 0;">
				<view class="cu-item arrow" @click="doremark()" v-if="data.friend.status==1">
					<view class="content">设置备注</view>
				</view>
				<view class="cu-item arrow" @click="naviTo('album/index',{uid:data.member.uid})" v-if="data.actions.moments">
					<view class="content">相册</view>
					<view class="action" style="width: 60%;" v-if="data.albums.length>0">
						<view class="grid col-4 grid-square">
							<view class="bg-img" style="margin-bottom: 0;" v-for="(pic,index) in data.albums" :key="index">
								<image :src="pic" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" v-if="data.member.msn!='' && data.friend.status==1" @click="doCopy(data.member.msn)">
					<view class="content">
						<text>微信号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{data.member.msn}}</text>
						<text class="margin-left-sm cuIcon-copy" :class="'text-'+theme.actcolor"></text>
					</view>
				</view>
				<view class="cu-item" style="padding: 20upx 30upx;">
					<view class="content">
						<text>个性签名</text>
					</view>
					<view class="action" style="max-width: 70%;">
						<text class="text-grey">{{data.member.bio || '这家伙很懒，什么都没留下'}}</text>
					</view>
				</view>
				<block v-if="data.profiles.length>0">
					<view class="cu-item" @click="naviTo(item.url)" style="padding: 20upx 30upx;" v-for="(item,index) in data.profiles" :key="index">
						<view class="content">
							<text>{{item.title}}</text>
						</view>
						<view class="action" style="max-width: 70%;">
							<text :class="item.extra">{{item.value}}</text>
						</view>
					</view>
				</block>
				<button class="cu-item" open-type="share" v-if="platform=='wxapp'">
					<view class="content">
						<text class="text-lg text-darkblue">分享此名片</text>
					</view>
				</button>
				<view class="cu-item" @click="showshare=true" v-else>
					<view class="content text-center">
						<text class="text-lg text-darkblue">分享此名片</text>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding-top" v-if="data.friend.status!=1 && data.tofriend.apply>0">
			<view class="text-lg padding-lr solid-bottom padding-bottom-sm">
				<text class="text-darkblue">
					对方请求添加为好友：
				</text>
				<text class="text-gray">{{data.tofriend.note}}</text>
			</view>
			<view class="cu-list menu text-center">
				<view class="cu-item" @click="doagree()">
					<view class="content">
						<text class="text-lg text-darkblue">通过验证</text>
					</view>
				</view>
				<view class="cu-item" @click="doIgnore()">
					<view class="content">
						<text class="text-lg text-gray">忽略</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top-sm text-darkblue text-center" v-if="userId!=data.member.uid">
			<block v-if="data.actions.sendmsg">
				<view class="cu-item" @click="doBack()" v-if="frompage=='dialog'">
					<view class="content">
						<text class="text-lg">发消息</text>
					</view>
				</view>
				<view class="cu-item" @click="naviTo('dialog/index',{cid:data.member.uid,type:'normal'})" v-else>
					<view class="content">
						<text class="text-lg">发消息</text>
					</view>
				</view>
			</block>
			<view class="cu-item" @click="naviTo('credit/transfer',{uid:data.member.uid})" v-if="data.actions.transfer">
				<view class="content">
					<text class="text-lg">转账</text>
				</view>
			</view>
			<view class="cu-item" @click="doremove()" v-if="data.friend.status==1">
				<view class="content">
					<text class="text-lg text-red">移出通讯录</text>
				</view>
			</view>
			<view class="cu-item" @click="domakefriend()" v-if="data.actions.makefriend">
				<view class="content">
					<text class="text-lg">添加到通讯录</text>
				</view>
			</view>
			<view class="cu-item" @click="doshielding()" v-if="data.actions.shielding">
				<view class="content" v-if="data.friend.status==0">
					<text class="text-lg">取消屏蔽</text>
				</view>
				<view class="content" v-else>
					<text class="text-lg text-gray">屏蔽此用户</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu mt0 solid-top text-center" v-if="data.navs.length>0">
			<view class="cu-item" @click="naviTo(item.url)" v-for="(item,index) in data.navs" :key="index">
				<view class="content" :class="item.extra">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<share :shareinfo="shareinfo" @closeshare="showshare=false" :showshare="showshare"></share>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	import share from "@/components/util/share.vue"
	
	export default {
		computed: mapState(['userId']),
		components: {share},
		data() {
			return {
				loaded:false,
				uid:0,
				fromgid:0,
				frompage:'',
				showmodal:"",
				friendremark:"",
				theme:core.style,
				platform:core.platform,
				showshare:false,
				user_id:'',
				shareinfo:{
					url:'',
					providers:4,
					provider:{}
				},
				data:{
					title:"名片",
					userid:"",
					member:{
						avatar: core.system.logo,
						bio: "",
						gender: 1,
						msn: "",
						nickname: "用户昵称",
						residecity: "",
						resideprovince: "",
						uid: 0,
						userid: ""
					},
					actions:{
						sendmsg:false,
						makefriend:false,
						moments:false,
						shielding:false,
						transfer:false
					},
					navs:[],
					profiles:[],
					validation_apply:0,
					uid:0,
					friend:{
						id:0,
						status:0,
						remark:""
					},
					tofriend:{
						id:0,
						apply:0
					},
					group:{
						id:0
					},
					albums:[],
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
			if(typeof(options.uid)=='undefined' || !options.uid) return core.toast('无效的用户编号','back');
			this.uid = options.uid;
			if(typeof(options.fg)!='undefined') this.fromgid = parseInt(options.fg);
			if(typeof(options.fp)!='undefined') this.frompage = options.fp;
			this.initData('member',{uid:this.uid,fg:this.fromgid});
		},
		onShareAppMessage(e){
			return {
				title:this.data.shareinfo.title,
				path:core.page(this.data.shareinfo.url),
			}
		},
		methods:{
			initData(route, data={}, callback=false){
				let that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					that.loaded = true;
					that.data = res;
					that.friendremark = res.friend.id>0 ? res.friend.remark : '';
					let groupprotective = false;
					if(res.group.id>0 && res.friend.status!=1){
						if(res.group.protective){
							groupprotective = true;
						}
					}
					that.groupprotective = groupprotective;
					if(res.userid!=''){
						that.user_id = res.userid=='ID' ? res.member.uid : res.member.userid;
					}
					uni.setNavigationBarTitle({
						title:res.title
					});
					that.shareinfo = core.initshare(res.shareinfo.title,res.shareinfo.url,res.shareinfo.cover,res.shareinfo.desc);
					if(callback){
						callback(res);
					}
				},data);
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			doBack(){
				return core.back();
			},
			doCopy(text){
				return core.copy(text);
			},
			doPrevImg(pic){
				uni.previewImage({
					current:pic,
					urls:[pic]
				})
			},
			doremove(){
				return core.notopen('删除好友');
			},
			domakefriend(){
				if(this.data.friend.status==1) return core.toast('对方已经是好友');
				if(this.data.validation_apply==1) return this.naviTo('friend/apply',{uid:this.uid});
				let that = this;
				return core.get('member/makefriend',function(res){
					if(typeof(res.type)=='undefined') return this.naviTo('friend/apply',{uid:that.uid});
					if(res.type=='success'){
						that.initData('member',{uid:that.uid,fg:that.fromgid});
					}
					let redirect = res.type=='success' ? '' : res.redirect;
					return core.toast(res.message,redirect,res.type);
				},{uid:this.data.member.uid});
			},
			doagree(){
				return core.notopen('删除好友');
			},
			doIgnore(){
				return core.notopen('忽略好友请求');
			},
			doremark(){
				return core.notopen('设置备注');
			},
			doshielding(){
				return core.notopen('屏蔽好友');
			}
		}
	}
</script>

<style>
	.mt0{margin-top: 0px;}
</style>
