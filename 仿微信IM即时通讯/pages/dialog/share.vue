<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="curview=='dialog'?'cur text-'+theme.actcolor:''" @tap="curview='dialog'">
					最近
				</view>
				<view class="cu-item flex-sub" :class="curview=='friend'?'cur text-'+theme.actcolor:''" @tap="viewfriend()">
					联系人
				</view>
				<view class="cu-item flex-sub" :class="curview=='group'?'cur text-'+theme.actcolor:''" @tap="curview='group'">
					群聊
				</view>
			</view>
		</view>
		<view class="listcontent indexes solid-top">
			<view :class="curview=='dialog'?'':'hidden'">
				<view class="text-empty" v-if="data.dialogs.length==0">
					<text v-if="data.inited">{{text.text_empty}}</text>
					<text v-else class="cu-load load-cuIcon loading">聊天会话加载中...</text>
				</view>
				<view class="cu-list menu-avatar no-padding" v-else>
					<view class="cu-item" @click="doShare(item.cid,item.type,item.title,item.avatar)" v-for="(item, index) in data.dialogs" :key="index">
						<view class="cu-avatar round" :style="'background-image:url('+item.avatar+');'">
							<view class="cu-tag badge cuIcon-group" :class="'bg-'+theme.actcolor" v-if="item.type=='group'"></view>
						</view>
						<view class="content">
							<view><view class="text-cut text-lg">{{item.title}}</view></view>
						</view>
					</view>
				</view>
			</view>
			<view :class="curview=='friend'?'':'hidden'">
				<view class="text-empty" v-if="data.friends.length==0">
					<text v-if="data.inited">{{text.text_empty}}</text>
					<text v-else class="cu-load load-cuIcon loading">好友加载中...</text>
				</view>
				<view v-else>
					<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ indexes.listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]" :scroll-with-animation="true" :enable-back-to-top="true">
						<block v-for="(item,index) in data.friends" :key="index">
							<view :class="'indexItem-' + item.letter" :id="'indexes-' + item.letter" :data-index="item.letter">
								<view class="padding-sm">{{item.letter}}</view>
								<view class="cu-list menu-avatar no-padding">
									<view class="cu-item" @click="doShare(value.fuid,'normal',value.remark,value.avatar)" v-for="(value,key) in item.list" :key="key">
										<view class="cu-avatar round" :style="'background-image:url('+value.avatar+');'"></view>
										<view class="content">
											<view><view class="text-cut text-lg">{{value.remark}}</view></view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</scroll-view>
					<view class="indexBar" :style="[{height:'calc(100vh - ' + indexes.CustomBar + 'px - 165px)'}]">
						<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
							<view class="indexBar-item" v-for="(item,index) in data.friends" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.letter}}</view>
						</view>
					</view>
					<view v-show="!hidden" class="indexToast">
						{{indexes.listCur}}
					</view>
				</view>
			</view>
			<view :class="curview=='group'?'':'hidden'">
				<view class="text-empty" v-if="data.groups.length==0">
					<text v-if="data.inited">{{text.text_empty}}</text>
					<text v-else class="cu-load load-cuIcon loading">群组正在加载中...</text>
				</view>
				<view class="cu-list menu-avatar no-padding" v-else>
					<view class="cu-item" @click="doShare(item.id,'group',item.name,item.pic)" v-for="(item, index) in data.groups" :key="index">
						<view class="cu-avatar round" :style="'background-image:url('+item.pic+');'"></view>
						<view class="content">
							<view><view class="text-cut text-lg">{{item.name}}</view></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	import swasocket from "@/swasocket.js"
	
	export default {
		data() {
			return {
				mid:0,
				theme:core.style,
				text:core.langs,
				curview:'dialog',
				frompage:'',
				hidden:true,
				indexes:{
					listCurID:'',
					CustomBar:this.CustomBar,
					listCur:'',
					boxTop:0,
					barTop:0,
					inited:false
				},
				data:{
					title:"分享到...",
					inited:false,
					simplecontent:'',
					dialogs:[],
					friends:[],
					groups:[]
				}
			}
		},
		onLoad(options) {
			if(typeof(options.mid)=='undefined' || !options.mid) return core.toast('无效的消息内容','back');
			this.mid = parseInt(options.mid);
			if(typeof(options.fp)!='undefined') this.frompage = options.fp;
			this.initData('dialog/share',{mid:this.mid});
		},
		onShow() {
			
		},
		onUnload() {
			if(this.frompage=='web' && this.mid>0){
				core.get('dialog/clearmsg',function(res){},{mid:this.mid});
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
			viewfriend(){
				this.curview = 'friend';
				if(this.data.friends.length>0 && !this.indexes.inited){
					this.indexes.listCur = this.data.friends[0].letter;
					let self = this;
					setTimeout(function(){
						self.indexesReady();
						self.indexes.inited = true;
					},100);
				}
			},
			doShare(cid=0,type='normal',nick='',avatar=''){
				let self = this;
				let title = type=='normal' ? '转发消息给' : '转发消息到';
				core.confirm(this.data.simplecontent+'',title+nick,function(){
					core.post('dialog/share',function(res){
						if(res.type!='success') return core.report(res);
						//处理首页消息显示
						let postevent = swasocket.PostEvent;
						if(typeof(postevent)=='function'){
							postevent({cid:cid,avatar:avatar,title:nick,type:type,spct:self.data.simplecontent});
						}
						core.toast('转发成功！','back','success');
					},{mid:self.mid,cid:cid,type:type})
				});
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
					if(num<that.data.friends.length){
						this.indexes.listCur = that.data.friends[num].letter;
					}
				};
			},
			getCur(e) {
				this.hidden = false;
				this.indexes.listCur = this.data.friends[e.target.id].letter;
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
		}
	}
</script>

<style>
</style>
