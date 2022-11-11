<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" v-model="keyword" @confirm="SearchSubmit()" placeholder="输入关键字搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @click="SearchSubmit()" class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<view v-if="!searchstart">
			<view class="padding grid" :class="'col-'+data.searchcol" v-if="searchtype==''">
				<view class="text-center" @click="searchtype=index" v-for="(item,index) in data.searchtypes" :key="index">
					<text class="text-darkblue">{{item}}</text>
				</view>
			</view>
			<view class="text-empty" v-else>搜索{{data.searchtypes[searchtype]}}</view>
		</view>
		<view v-else>
			<scroll-view scroll-x class="bg-white nav" v-if="searchtype==''">
				<view class="flex text-center">
					<view @click="data.searchtype=index" class="cu-item flex-sub" :class="index==data.searchtype?'cur text-'+theme.actcolor:''" v-for="(item,index) in data.searchtypes" :key="index">
						{{item}}
						<view class="cu-tag bg-red round sm margin-left-xs" v-if="data.result[index].length>0">{{data.result[index].length}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="text-empty" v-if="data.result[data.searchtype].length==0">
				<text>找不到与“{{data.keyword}}”相关的{{data.searchtypes[data.searchtype]}}</text>
			</view>
			<view class="padding-tb bg-white solid-top" v-else>
				<block v-if="data.searchtype=='member'">
					<view class="cu-list menu-avatar no-padding indexes">
						<view class="cu-item arrow" @click="naviTo('member/index',{uid:item.uid})" v-for="(item, index) in data.result.member" :key="index">
							<view class="cu-avatar round" :style="'background-image:url('+item.avatar+');'"></view>
							<view class="content">
								<view><view class="text-cut text-lg">{{item.nickname}}</view></view>
							</view>
						</view>
					</view>
				</block>
				<block v-else-if="data.searchtype=='group'">
					<view class="cu-list menu-avatar">
						<view class="cu-item arrow" @click="naviTo('group/detail',{gid:item.id})" v-for="(item, index) in data.result.group" :key="index">
							<view class="cu-avatar round lg" :style="'background-image:url('+item.pic+');'"></view>
							<view class="content">
								<view class="text-xl">{{item.name}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										{{item.description || '群主是相当的懒，啥都不肯说'}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else-if="data.searchtype=='album'">
					<view class="cu-card dynamic bg-gray">
						<view class="cu-item shadow" @click="naviTo('album/detail',{aid:item.id})" v-for="(item, index) in data.result.album" :key="index">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="cu-avatar round lg" @tap.stop="naviTo('member/index',{uid:item.uid})" :style="'background-image:url('+item.avatar+');'"></view>
									<view class="content flex-sub">
										<view>{{item.nickname}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.datetime}}
										</view>
									</view>
								</view>
							</view>
							<view class="text-content richtext margin-top-sm" v-if="item.content!=''">
								<rich-text :nodes="item.content+''"></rich-text>
							</view>
							<view class="text-gray text-lg flex justify-end padding">
								<view>
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praise}}
								</view>
								<view>
									<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="cu-list menu-avatar">
						<view class="cu-item" @click="naviTo(item.url)" v-for="(item, index) in data.result.chatlog" :key="index">
							<view class="cu-avatar radius lg" :style="'background-image:url('+item.avatar+');'"></view>
							<view class="content">
								<view class="text-cut">
									{{item.nickname}}
									<text v-if="item.gid>0" class="cu-tag light sm margin-left round" :class="'bg-'+theme.actcolor">{{item.groupname}}</text>
								</view>
								<view class="text-gray text-sm flex"> <view class="text-cut">{{item.messagesp}}</view></view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.datetime}}</view>
							</view>
						</view>
					</view>
				</block>
				<view class="padding-top text-center text-gray">找到{{data.result[data.searchtype].length}}{{data.searchtypes[data.searchtype]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import core from "@/core.js"
	
	export default {
		data() {
			return {
				theme:core.style,
				searchtype:"",
				keyword:"",
				searchstart:false,
				data:{
					title:"搜索",
					result:[],
					searchtypes:[],
					searchcol:4,
					searchtype:''
				}
			}
		},
		onLoad(options) {
			if(typeof(options.keyword)!='undefined' && options.keyword) this.keyword = options.keyword;
			if(typeof(options.type)!='undefined' && options.type) this.searchtype = options.type;
			if(this.keyword==''){
				this.initData("search",{searchtype:this.searchtype});
			}else{
				this.SearchSubmit();
			}
		},
		onShow() {
			
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
			SearchSubmit(){
				return core.notopen('搜索');
			}
		}
	}
</script>

<style>
</style>
