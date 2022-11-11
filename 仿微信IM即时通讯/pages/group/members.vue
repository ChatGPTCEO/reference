<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom" :class="data.newapplys.length>0?'margin-top':''">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>
				群成员
			</view>
		</view>
		<view class="cu-list grid col-5 no-border">
			<view @click="naviTo('member/index',{uid:item.uid,fg:item.cid})" class="cu-item center" v-for="(item,index) in data.members" :key="index">
				<view class="cu-avatar radius lg" :style="'background-image:url('+item.avatar+');'">
					<view class="cu-tag badge cuIcon-friendfamous bg-orange" v-if="item.uid==data.group.uid"></view>
					<view class="cu-tag badge cuIcon-profile" :class="'bg-'+actcolor" v-else-if="item.ismanager>0"></view>
					<view class="cu-tag badge cuIcon-time bg-grey" v-if="item.forbidden"></view>
				</view>
				<text class="text-cut text-sm">{{item.nickname}}</text>
			</view>
			<view class="cu-item center" @click="naviTo('friend/recommend',{gid:data.group.id})">
				<view class="dashed">
					<text class="cuIcon-add text-gray"></text>
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
				gid:0,
				actcolor:core.style.actcolor,
				actindex:0,
				showmodal:'',
				data:{
					title:"群成员",
					groupname:'群组',
					newapplys:[],
					members:[],
					group:{
						id:0,
						uid:0,
					}
				}
			}
		},
		onLoad(options) {
			if(typeof(options.gid)=='undefined' || !options.gid) return core.toast('无效的群组信息','back');
			this.gid = parseInt(options.gid);
			this.initData('group/members',{gid:this.gid});
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.initData('group/members',{gid:this.gid});
			uni.stopPullDownRefresh();
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
			}
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	.cu-item.center{align-items: center;}
	.cu-item .dashed{border:4upx dashed #AAAAAA; width: 112upx; height: 112upx; text-align: center; font-size: 36upx; border-radius: 6upx;}
	.cu-item .dashed [class*="cuIcon-"]{margin-top: 0; line-height: 104upx !important;}
	.cu-list.grid>.cu-item .cu-avatar{position: relative;}
	.cu-list.grid>.cu-item .cu-avatar .cu-tag{width: 32upx; font-size: 20upx; margin-top: 0; margin-left: 0; top: -10upx; right: -10upx; left: auto; position: absolute; padding: 0; line-height: 32upx;}
</style>
