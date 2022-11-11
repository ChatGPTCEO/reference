<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{data.title}}</block>
		</cu-custom>
		<view>
			<view class="cu-list menu-avatar solid-top">
				<view class="cu-item">
					<view class="cu-avatar radius lg" :style="'background-image:url('+data.userinfo.avatar+');'"></view>
					<view class="content">
						<view>
							<view class="text-cut text-xl">
								{{data.userinfo.nickname}}
								<text class="cu-tag bg-red round margin-left-sm light">{{data.userinfo.group.title}}</text>
							</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut" v-if="data.nextgroup.groupid>0">距下一等级还需{{data.nextgroup.upgradecredit}}{{data.credit.name}}</view>
							<view class="text-cut" v-else>您已经是最高等级</view>
						</view>
					</view>
				</view>
			</view>
			<view class="padding text-center text-lg">
				<view class="radius grid padding-tb-xl" :class="['bg-'+theme.actcolor,'col-'+(data.credit.switch?3:2)]">
					<view @click="naviTo('credit/payment')">
						<view class="text-xxxl margin-bottom-xs">
							<text class="cuIcon-barcode"></text>
						</view>
						<text>收付款</text>
					</view>
					<view class="solid-left" @click="naviTo(data.urls.credit2,{title:'资金明细'})">
						<view class="text-xxxl margin-bottom-xs">
							<text class="cuIcon-moneybag"></text>
						</view>
						<text>￥{{data.userinfo.credit2}}</text>
					</view>
					<view v-if="data.credit.switch" @click="naviTo(data.urls.credit1,{title:data.credit.name+'明细'})" class="solid-left">
						<view class="text-xxxl margin-bottom-xs">
							<text class="cuIcon-choiceness"></text>
						</view>
						<text>{{data.userinfo.credit1}}</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="doRecharge()" v-if="data.switchs.recharge">
					<view class="content">
						<text class="text-lg">{{data.texts.recharge}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="naviTo('credit/cash')" v-if="data.switchs.cash">
					<view class="content">
						<text class="text-lg">{{data.texts.cash}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="naviTo('credit/exchange')" v-if="data.switchs.exchange">
					<view class="content">
						<text class="text-lg">{{data.texts.exchange}}{{data.credit.name}}</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" @click="naviTo(data.urls.credit2,{title:'资金明细'})">
					<view class="content">
						<text class="text-lg">资金明细</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="naviTo(data.urls.credit1,{title:data.credit.name+'明细'})" v-if="data.credit.switch">
					<view class="content">
						<text class="text-lg">{{data.credit.name}}明细</text>
					</view>
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
				theme:core.style,
				data:{
					title:"我的钱包",
					credit:{
						"switch":true,
						"name":'积分',
						"proportion":0
					},
					switchs:{
						recharge:true,
						cash:true,
						exchange:true
					},
					texts:{
						recharge:'余额充值',
						cash:'余额提现',
						exchange:'余额转积分',
						balance:"我的余额"
					},
					nextgroup:{
						groupid:0,
						upgradecredit:0
					},
					urls:{
						recharge:"",
						credit2:"",
						credit1:""
					},
					userinfo:{
						uid:0,
						credit1:0,
						credit2:0.00,
						group:{
							title:""
						}
					}
				}
			}
		},
		onLoad() {
		},
		onShow() {
			this.initData('credit');
		},
		onPullDownRefresh() {
			this.initData('credit');
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
			},
			doRecharge(){
				if(core.inwechat && core.platform=='h5'){
					return core.navito('net:'+this.data.urls.recharge);
				}else{
					return core.navito(this.data.urls.recharge,{title:this.data.texts.recharge});
				}
			}
		}
	}
</script>

<style>
</style>
