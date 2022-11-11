<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar radius lg" @click="doPrevImg(data.group.pic)" :style="'background-image:url('+data.group.pic+');'"></view>
				<view class="content flex-sub">
					<view class="text-grey">{{data.group.name}}</view>
					<view class="text-gray text-sm flex justify-between">
						ID:{{data.group.id}}
						<view class="text-gray text-lg">
							<text class="cuIcon-friend margin-lr-xs"></text> {{data.group.members}}人
							<text class="cuIcon-time margin-right-xs margin-left"></text> {{data.group.datetime}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: 0;">
			<view class="cu-item" style="padding: 20upx 30upx;" v-if="data.group.description!=''">
				<view class="content">
					<text>群简介</text>
				</view>
				<view class="action" style="max-width: 70%;">
					<text class="text-grey">{{data.group.description}}</text>
				</view>
			</view>
		</view>
		<view class="padding bg-white margin-bottom solid-top" v-if="data.group.notice!='' && data.groupmember.status==1">
			<scroll-view scroll-y class="group-notice padding bg-grey light radius">
				<rich-text class="text-lg" :nodes="data.group.notice" :selectable="true"></rich-text>
			</scroll-view>
		</view>
		<view class="cu-list menu solid-bottom" v-if="data.group.uid>0">
			<view class="cu-item arrow" @click="naviTo('member/index',{uid:data.group.uid})">
				<view class="content">
					<text class="cuIcon-friendfamous text-green"></text>
					群主
				</view>
				<view class="action">
					<text class="text-darkblue">{{data.group.nickname}}</text>
				</view>
			</view>
		</view>
		<view :class="data.groupmember.status==1?'':'margin-bottom'">
			<view class="cu-list menu solid-bottom">
				<view class="cu-item arrow noaf" @click="showqrcode=!showqrcode" :class="showqrcode?'arrow-up':''">
					<view class="content">
						<text class="cuIcon-qr_code" :class="'text-'+theme.actcolor"></text>
						<text>分享群</text>
					</view>
				</view>
				<view class="padding-lr-xl bg-white" :class="showqrcode?'':'hidden'">
					<view class="padding-xs text-center account-qrcode" @click="previewimg(data.qrcode)">
						<image mode="widthFix" :src="data.qrcode" class="png qrcode"></image>
						<view class="qrcode-temp" :style="'background-image:url('+data.group.pic+')'"></view>
					</view>
					<view class="margin-lr-xl flex flex-direction padding-bottom">
						<button class="cu-btn lg radius" :class="'bg-'+theme.actcolor" open-type="share" v-if="platform=='wxapp'">
							<text>分享给好友</text>
						</button>
						<view class="cu-btn lg radius" :class="'bg-'+theme.actcolor" @click="showshare=true" v-else>
							<text>分享给好友</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="data.groupmember.status==1">
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="naviTo('group/members',{gid:data.group.id})">
					<view class="content">
						<text class="cuIcon-group text-orange"></text>
						群成员
					</view>
					<view class="action" :class="data.applys>0?'newapply':''" style="max-width: 72%;" v-if="data.members.length>0">
						<view class="cu-tag badge" v-if="data.applys>0">{{data.applys}}</view>
						<view class="grid col-5">
							<view @tap.stop="naviTo('member/index',{uid:item.uid,fg:data.group.id})" class="cu-avatar round sm padding-lr-xs nobg" v-for="(item,index) in data.members" :key="index">
								<image class="round" mode="widthFix" :src="item.avatar"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" v-if="data.group.uid==userId" @click="naviTo('group/profile',{gid:data.group.id})">
					<view class="content">
						<text class="cuIcon-settings text-blue"></text>
						<text>群资料</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showmodal='nickname'">
					<view class="content">
						我的群昵称
					</view>
					<view class="action">
						<text class="text-grey">{{data.groupmember.nickname}}</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu solid-top" style="margin-top: 0;" v-if="data.group.uid==data.groupmember.uid">
				<view class="cu-item arrow" @click="showmodal='editfee'">
					<view class="content">
						进群收费
					</view>
					<view class="action">
						<text class="cu-tag round bg-red light" v-if="data.group.fee>0">￥{{data.group.fee}}</text>
						<text class="cu-tag round light" :class="'bg-'+theme.actcolor" v-else>免费</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						全员禁言
					</view>
					<view class="action">
						<switch class="switch" data-id="allowpost" @change="SwitchSet" :class="data.group.allowpost==1?'':'checked'" :checked="data.group.allowpost==1?false:true"></switch>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						成员保护
					</view>
					<view class="action">
						<switch class="switch" data-id="protective" @change="SwitchSet" :class="data.group.protective==0?'':'checked'" :checked="data.group.protective==0?false:true"></switch>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						允许加入
					</view>
					<view class="action">
						<switch class="switch" data-id="allowjoin" @change="SwitchSet" :class="data.group.allowjoin==0?'':'checked'" :checked="data.group.allowjoin==0?false:true"></switch>
					</view>
				</view>
				<view class="cu-item" v-if="data.group.allowjoin==1">
					<view class="content">
						加入需要审核
					</view>
					<view class="action">
						<switch class="switch" data-id="joinaudit" @change="SwitchSet" :class="data.group.joinaudit==0?'':'checked'" :checked="data.group.joinaudit==0?false:true"></switch>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						隐藏群组
					</view>
					<view class="action">
						<switch class="switch" data-id="ishide" @change="SwitchSet" :class="data.group.ishide==0?'':'checked'" :checked="data.group.ishide==0?false:true"></switch>
					</view>
				</view>
			</view>
			<view class="cu-list menu text-darkblue text-center">
				<view class="cu-item" @click="doBack()" v-if="frompage=='dialog'">
					<view class="content">
						<text class="text-lg">开始聊天</text>
					</view>
				</view>
				<view class="cu-item" @click="naviTo('dialog/index',{cid:data.group.id,type:'group'})" v-else>
					<view class="content">
						<text class="text-lg">开始聊天</text>
					</view>
				</view>
				<view class="cu-item" @click="doExitGroup()">
					<view class="content">
						<text class="text-lg text-red">{{data.group.uid==data.groupmember.uid?'解散群组':'退出群聊'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu text-darkblue text-center" v-else-if="data.group.allowjoin==1">
			<view class="cu-item" @click="doJoinGroup()">
				<view class="content" v-if="data.group.fee>0">
					<text class="text-lg">付费进群</text>
					<text class="text-lg text-red">（￥{{data.group.fee}}）</text>
				</view>
				<view class="content" v-else>
					<text class="text-lg">申请加入群聊</text>
				</view>
			</view>
		</view>
		<view class="cu-modal" v-if="data.group.uid==userId" :class="showmodal=='editfee'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">进群收费</view>
					<view class="action" @tap="showmodal=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group text-left">
						<input type="digit" placeholder="输入进群费用(元),0为免费" v-model="postdata.fee" name="fee"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn text-gray" @tap="showmodal=''">取消</button>
						<button class="cu-btn line-green margin-left-sm" @tap="postdata.fee=0">免费</button>
						<button class="cu-btn margin-left-sm" :class="'bg-'+theme.actcolor" @click="doEdit('fee')">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" v-if="data.groupmember.status==1" :class="showmodal=='nickname'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改群昵称</view>
					<view class="action" @tap="showmodal=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group text-left">
						<input type="text" placeholder="输入新的群昵称" v-model="postdata.nickname" name="nickname"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-gray" @tap="showmodal=''">取消</button>
						<button class="cu-btn margin-left" :class="'bg-'+theme.actcolor" @click="doEdit('nickname')">确定</button>
					</view>
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
				gid:0,
				platform:core.platform,
				frompage:"",
				showqrcode:false,
				showshare:false,
				shareinfo:{
					url:'',
					providers:4,
					provider:{}
				},
				showmodal:"",
				theme:core.style,
				postdata:{
					nickname:"",
					fee:0
				},
				data:{
					title:"群资料",
					applys:0,
					group:{
						id:0,
						name:"",
						pic:core.system.defaultimg,
						datetime:"",
						members:0,
						description:"",
						uid:0,
						nickname:"",
						fee:0,
						allowpost:1,
						protective:0,
						allowjoin:1,
						joinaudit:0,
						ishide:0
					},
					members:[],
					qrcode:"",
					groupmember:{
						id:0,
						status:0,
						nickname:""
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
			if(typeof(options.gid)=='undefined' || options.gid=='') return core.toast('无效的群组信息','back');
			this.gid = parseInt(options.gid);
			if(typeof(options.fp)!='undefined') this.frompage = options.fp;
		},
		onShow() {
			this.initData('group/detail',{gid:this.gid});
		},
		onShareAppMessage(e){
			return {
				title:this.data.shareinfo.title,
				path:core.page(this.data.shareinfo.url),
			}
		},
		methods:{
			initData(route, data={}, callback=false){
				var that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					that.data = res;
					if(res.groupmember.status==1){
						that.postdata.nickname = res.groupmember.nickname;
					}
					that.postdata.fee = res.group.fee;
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
			previewimg(image){
				return uni.previewImage({
					urls:[image]
				})
			},
			doPrevImg(pic){
				uni.previewImage({
					current:pic,
					urls:[pic]
				})
			},
			doJoinGroup(){
				if(this.data.group.allowjoin==0) return core.toast('该群暂不支持加入');
				if(this.data.group.fee>0 || this.data.group.joinaudit==0){
					let that = this;
					return core.post("group/join",function(res){
						let redirect = res.redirect;
						if(res.type=='success'){
							if(typeof(res.message.tid)!='undefined'){
								redirect = core.page('credit/pay',{tid:res.message.tid,fp:'detail'});
								return core.toast(res.message.message,redirect,res.type);
							}else{
								that.initData('group/detail',{gid:that.data.group.id});
								redirect = '';
							}
						}else if(res.type=='info'){
							that.initData('group/detail',{gid:that.data.group.id});
							res.type = 'error';
						}
						core.toast(res.message,redirect,res.type);
					},{gid:this.data.group.id});
				}else{
					return core.navito('group/join',{gid:this.data.group.id});
				}
			},
			doExitGroup(){
				return core.notopen('退出群聊');
			},
			doEdit(setid=''){
				return core.notopen('编辑信息');
			},
			SwitchSet(e){
				return core.notopen('管理群');
			}
		}
	}
</script>

<style>
	.cu-item .newapply{position: relative;}
	.cu-item .newapply .badge{top: 50%; margin-top: -14upx; right: -24upx;}
	.cu-list.menu>.cu-item.arrow.arrow-up:before{
		content: "\e6de";
	}
	
	.group-notice{max-height: 30vh; font-size: 32upx; line-height: 50upx; text-indent: 64upx; text-align: left; white-space: pre-wrap; overflow: hidden;}
	
	.account-qrcode{position: relative;}
	.account-qrcode .qrcode{width: 480upx;}
	.account-qrcode .qrcode-temp{width: 72upx; height: 72upx; position: absolute; left: 50%; top: 50%; margin-top: -36upx; margin-left: -36upx; border-radius: 6upx; background-size: contain;}
</style>
