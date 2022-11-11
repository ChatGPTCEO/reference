<template>
	<view>
		<cu-custom :Barborder="'solid-bottom'" :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="text-empty" v-if="data.members.length==0">
			<text>{{data.ranking.type==2?'正在获取定位...':text.text_empty}}</text>
		</view>
		<block v-else>
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" @click="naviTo(item.url)" v-for="(item, index) in data.members" :key="index">
					<view class="cu-avatar round lg" :style="'background-image:url('+item.avatar+');'">
						<view class="cu-tag badge" :class="'cuIcon-'+(item.gender==1?'male bg-blue':'female bg-pink')" v-if="item.gender>0"></view>
					</view>
					<view class="content">
						<view class="text-xl">{{item.nickname}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.summary || '这家伙很懒，什么都没留下'}}
							</view>
						</view>
					</view>
					<view class="action" v-if="data.ranking.type==2">
						<text class="cu-tag round light" :class="'bg-'+theme.actcolor">{{item.distance}}</text>
					</view>
				</view>
			</view>
			<view class="text-empty" v-if="!loadmore">
				<text>{{text.msg_no_anymore}}</text>
			</view>
		</block>
		<!-- #ifdef H5 -->
		<remote-js v-if="!inwechat" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></remote-js>
		<!-- #endif -->
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		//#ifdef H5
		components: {
		  'remote-js': {
		    render (createElement) {
		      var self = this
		      return createElement('script', {
		        attrs: { type: 'text/javascript', src: this.src },
		        on: {
		          load: function () {
		            console.log('load js')
		            self.$emit('load-js-finish')
		          }
		        }
		      })
		    },
		    props: {
		      src: { type: String, required: true }
		    }
		  }
		},
		//#endif
		data() {
			return {
				rid:0,
				theme:core.style,
				text:core.langs,
				inwechat:core.inwechat,
				page:1,
				loadmore:false,
				posupdated:0,
				data:{
					title:"用户列表",
					ranking:{
						id:0,
						type:1
					},
					lbskey:"",
					members:[]
				}
			}
		},
		onLoad(options) {
			if(typeof(options.id)=='undefined' || !options.id) return core.toast('找不到该页面','back');
			this.rid = parseInt(options.id);
			this.loadMembers(1);
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.loadMembers(1);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(!this.loadmore || this.data.ranking.type==1) return false;
			this.loadMembers(this.page+1);
		},
		methods:{
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			updatePostion(){
				if(this.posupdated!=0 || this.data.ranking.type!=2) return false;
				this.posupdated = 1;
				let self = this;
				let updatapos = function(ret){
					core.post("member/position",function(res){
						if(res.type=='success'){
							self.posupdated = 2;
							return self.loadMembers(1);
						}
						self.posupdated = 0;
						core.report(res);
					},{poslat:ret.lat,poslng:ret.lng})
				};
				if(core.platform=='h5'){
					if(typeof(inWhotalkPlus)!='undefined'){
						return doPlusGeoLocation(updatapos);
					}else if(this.inwechat){
						core.initjwx(function(wx){
							wx.getLocation({
								success: function (res) {
									updatapos({lat:res.latitude,lng:res.longitude});
								},
								cancel: function (res) {
									core.toast('已取消授权');
									self.loadMembers(1);
								},
								fail:function (res) {
									console.log(res);
									core.toast('获取位置失败');
									self.loadMembers(1);
								}
							});
						});
					}else{
						let geolocation = new qq.maps.Geolocation(this.data.lbskey,core.system.name);
						let options = {timeout: 8000};
						geolocation.getLocation(function (ret) {
							updatapos({lat:ret.lat,lng:ret.lng});
						}, function (ret) {
							core.toast('获取当前位置信息失败');
							self.loadMembers(1);
						}, options);
					}
				}else{
					uni.getLocation({
						success(ret) {
							updatapos({lat:ret.latitude,lng:ret.longitude});
						},
						fail(e) {
							core.toast('无法获取当前位置信息');
							console.log(e);
						}
					});
				}
			},
			loadMembers(page=1){
				let self = this;
				core.get("ranking",function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, page==1?true:false);
					}
					self.loadmore = res.members.length<15 ? false : true;
					if(page==1){
						self.data = res;
						uni.setNavigationBarTitle({
							title:res.title
						});
						if(res.ranking.type==2){
							self.updatePostion();
						}
					}else{
						self.data.members = self.data.members.concat(res.members);
					}
					self.page = page;
				},{id:this.rid,page:page})
			}
		}
	}
</script>

<style>
	page{background-color: #FFFFFF;}
</style>
