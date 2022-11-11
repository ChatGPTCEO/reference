<template>
	<view>
		<view class="status_bar" :class="theme.navbg" v-if="pagescroll>=headheight"></view>
		<view class="head">
			<view class="albumbg" @click="showmodal='actionsheet'" v-if="data.member.uid==userId">
				<image mode="widthFix" :src="data.albumbgurl" class="poster"></image>
			</view>
			<view class="albumbg" @click="doPreviewImage(data.albumbgurl,-1)" v-else>
				<image mode="widthFix" :src="data.albumbgurl" class="poster"></image>
			</view>
			<view class="cu-bar fixed" :class="pagescroll<headheight?'topbar':theme.navbg">
				<view class="action" @click="doBack()">
					<text class="cuIcon-back"></text>
				</view>
				<view class="content">{{data.title}}</view>
				<view class="action" v-if="data.allowpost" @click="naviTo('album/post'+(data.member.uid==userId?'?forward=back':''))">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
			<view class="userbar flex justify-end padding" @click="naviTo('member/index',{uid:data.member.uid})">
				<view class="padding-top-sm">
					<text class="text-shadow text-lg text-bold text-white">{{data.member.nickname}}</text>
				</view>
				<view class="padding-left-sm">
					<view class="cu-avatar lg radius" :style="'background-image:url('+data.member.avatar+')'"></view>
				</view>
			</view>
		</view>
		<view class="cu-bar search bg-white" @click="naviTo('album/post')" v-if="data.allowpost">
			<view class="cu-avatar round" :style="'background-image:url('+myavatar+')'"></view>
			<view class="search-form round">
				<text class="text-gray margin-left-sm">今日风和日丽，来说点什么吧~</text>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav solid-top" scroll-with-animation v-if="data.tags.length>0">
			<view class="cu-item" :class="viewtag==''?'cur text-'+theme.actcolor:''" @click="doTaptag('')">全部</view>
			<view class="cu-item" :class="viewtag==tag?'cur text-'+theme.actcolor:''" v-for="(tag,index) in data.tags" :key="index" @click="doTaptag(tag)">
				{{tag}}
			</view>
		</scroll-view>
		<view>
			<view class="text-empty" v-if="data.albums.length==0">
				<text>空空如也</text>
			</view>
			<view v-else>
				<view class="cu-card dynamic">
					<block v-for="(item, index) in data.albums" :key="index">
						<view class="cu-item shadow" @click="naviTo('album/detail',{aid:item.id})">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" @tap.stop="naviTo('member/index',{uid:item.uid})" :style="'background-image:url('+item.avatar+');'"></view>
									<view class="content flex-sub">
										<view>{{item.nickname}}</view>
										<view class="text-sm flex justify-between">
											<text class="text-gray">{{item.datetime}}</text>
											<text class="text-orange" v-if="item.status==0">审核中</text>
										</view>
									</view>
								</view>
							</view>
							<view class="text-content richtext margin-top-sm" v-if="item.content!=''" @tap.stop="naviTo(item.url)">
								<rich-text :nodes="item.content+''"></rich-text>
							</view>
							<view @tap.stop="naviTo('player/index',{vid:item.vid})" class="chat-video padding-lr margin-top-sm" v-if="item.vid>0">
								<view class="bg-img only-img bg-video">
									<image :src="item.poster+(posters.hasOwnProperty(index)?'?reload='+posters[index]:'')" mode="widthFix" @error="posterReload(index,item.poster)"></image>
								</view>
							</view>
							<view class="grid flex-sub padding-lr margin-top-sm" :class="item.extraclass" v-if="item.pics.length>0">
								<view class="bg-img" @tap.stop="doPreviewImage(pic,index)" :class="item.pics.length==1?'onlyimg':''" v-for="(pic,key) in item.pics" :key="key">
									<image :src="pic" mode="aspectFill"></image>
								</view>
							</view>
							<view class="text-gray text-lg flex justify-end padding">
								<view @tap.stop="doPraise(item.id,index)">
									<text class="cuIcon-appreciatefill margin-lr-xs" :class="item.praised?'text-'+theme.actcolor:''"></text> {{item.praise}}
								</view>
								<view>
									<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
								</view>
							</view>
							<view class="cu-list menu-avatar comment solid-top" v-if="item.comments.id>0">
								<view class="cu-item noaf">
									<view class="cu-avatar round" @tap.stop="naviTo('member/index',{uid:item.comments.uid})" :style="'background-image:url('+item.comments.avatar+');'"></view>
									<view class="content">
										<view class="text-grey">{{item.comments.nickname}}</view>
										<view class="text-content text-df">
											{{item.comments.content}}
										</view>
										<view class="margin-top-sm flex justify-between">
											<view class="text-gray text-df">{{item.comments.datetime}}</view>
											<view>
												<text class="cuIcon-appreciatefill" :class="item.comments.praised?'text-'+theme.actcolor:'text-gray'"></text>
												<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="padding-bottom-sm text-center" v-if="item.comment>1">
								<text :style="'color: '+theme.link">查看更多{{item.comment}}条评论</text>
							</view>
						</view>
					</block>
				</view>
				<view v-if="!loadmore" class="padding-xl text-center text-gray">
					<text>没有更多了~</text>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" v-if="data.member.uid==userId" :class="showmodal=='actionsheet'?'show':''">
			<view class="cu-dialog">
				<view class="padding">
					<view class="flex flex-direction">
						<button @click="doChangeBg()" class="cu-btn bg-green lg">更换背景图</button>
						<button @click="showmodal=''" class="cu-btn bg-grey lg margin-top">取  消</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	
	export default {
		computed: mapState(['userId']),
		data() {
			return {
				uid:0,
				page:1,
				viewtag:'',
				pagescroll:0,
				headheight:250,
				showmodal:"",
				barstatus:0,
				posters:[],
				theme:core.style,
				loadmore:true,
				myavatar:core.userinfo.avatar,
				data:{
					title:"朋友圈",
					uid:0,
					advsindex:0,
					albumbgurl:"../../static/images/bg_album.jpg",
					albums:[],
					allowpost:false,
					tags:[],
					member:{
						uid:0,
						nickname:"",
						avatar:""
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
			if(typeof(options.uid)!='undefined' && options.uid!='') this.uid = parseInt(options.uid);
			this.loadAlbums(1);
		},
		onShow() {
			if(this.data.uid>0 && this.page==1){
				this.loadAlbums(1);
			}
		},
		onPullDownRefresh() {
			this.doTaptag('');
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(!this.loadmore) return false;
			this.loadAlbums(this.page+1);
		},
		onShareAppMessage(e){
			return {
				title:this.data.shareinfo.title,
				path:core.page(this.data.shareinfo.url),
			}
		},
		onPageScroll(e) {
			this.pagescroll = e.scrollTop;
			if(core.platform=='app'){
				if(this.pagescroll>=this.headheight){
					if(this.barstatus==0){
						plus.navigator.setStatusBarStyle("dark");
						this.barstatus = 1;
					}
				}else{
					if(this.barstatus==1){
						plus.navigator.setStatusBarStyle("light");
						this.barstatus = 0;
					}
				}
			}
		},
		methods:{
			loadAlbums(page=1){
				let that = this;
				core.get('album/friends',function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					that.page = page;
					that.loadmore = res.albums.length<15 ? false : true;
					if(page==1){
						that.data = res;
						uni.setNavigationBarTitle({
							title:res.title
						});
						uni.createSelectorQuery().select('.albumbg').boundingClientRect(function(res) {
							that.headheight = res.height;
							if(core.platform=='app'){
								that.headheight -= core.Client.statusBarHeight;
							}
						}).exec();
						if(core.inwechat){
							core.initshare(res.shareinfo.title,res.shareinfo.url,res.shareinfo.cover,res.shareinfo.desc);
						}
					}else{
						that.data.albums = that.data.albums.concat(res.albums);
					}
				},{page:page,uid:this.uid,tag:this.viewtag});
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			doTaptag(tag=''){
				this.viewtag = tag;
				this.loadAlbums(1);
			},
			posterReload(index,pic){
				let postloaded = 1;
				if(this.posters.hasOwnProperty(index)){
					postloaded = this.posters[index] + 1;
				}
				if(postloaded>5) return false;
				let that = this;
				setTimeout(function(){
					that.posters[index] = postloaded;
				},4000);
			},
			doPreviewImage(pic,index){
				let pics = index>=0 ? this.data.albums[index].pics : [pic];
				uni.previewImage({
					current:pic,
					urls:pics
				})
			},
			doChangeBg(){
				return core.notopen('更换背景图');
			},
			doBack(){
				return core.back();
			},
			doPraise(aid=0,index=0){
				return core.notopen('点赞');
			}
		}
	}
</script>

<style>
	.status_bar{width: 100%; height: var(--status-bar-height); position: fixed; left: 0; top: 0; z-index: 99;}
	.head{position: relative;}
	.head .cu-bar{top: var(--status-bar-height);}
	.userbar{position: absolute; right: 0; bottom: 0;}
	.userbar, .cu-bar.topbar,.topbar .cuIcon-cameraadd:before{text-shadow: 0 0 2px #000;}
	.topbar{box-shadow:none !important;}
	.topbar .action{color: #FFFFFF;}
	.topbar .content{display: none;}
	.albumbg{max-height: 560upx; overflow: hidden;}
	.albumbg image{width: 100%; min-height: 400upx; display: block;}
	.cu-card.dynamic>.cu-item>.text-content{margin-bottom: 0;}
	.cu-card.dynamic>.cu-item .onlyimg{height: auto; max-height: 320upx; overflow: hidden;}
	.chat-video .bg-video{height: auto !important; max-height: 360upx !important;}
	.chat-video .bg-video image{min-height: 360upx; width: 100%;}
</style>