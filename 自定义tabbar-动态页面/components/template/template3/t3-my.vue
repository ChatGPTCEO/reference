<template>
	<view   class="tab-2">
		<view  >
			<u-navbar :is-back="false":title-bold="true" title-color="#ffffff" :title-size="34"
					 title=" " :height="130"
					:border-bottom="false" :background="background">
				<view   class="u-flex u-row-left u-col-top" 
					 style="flex: 1; width: 100%;padding: 30rpx;color: #FFFFFF;height:260rpx;">
					<view   style="width: 100rpx;height: 100rpx;background-color: #FFFFFF;border-radius: 50rpx;">
						<u-image bg-color="#ffffff" width="100" height="100"shape="circle"></u-image>
					</view> 
					<view   class="u-m-l-20 u-m-t-20" style="font-size: 34rpx;font-weight: bold;">
						<text>{{vuex_userInfo.name}}</text>
					</view>
				</view>
			</u-navbar>
		</view>
		<view   class="u-p-20 top-80">
			<view   class="item-box u-p-t-20 u-p-b-20">
				<account-box :showType="0" @toNext="toNext" :mainColor="themeColor"></account-box>
			</view>
			
			<view   class="item-box">
				<order-box @toNext="toNext" :orderTypeList="orderTypeList" :mainColor="themeColor"></order-box>
			</view>
			
			<view   class="item-box">
				<gird-box @toNext="toNext" :girdList="setItemList" :girdTitle="'我的设置'" :mainColor="themeColor"></gird-box>
			</view>
			
			<view   class="item-box">
				<gird-box @toNext="toNext" :girdList="serviceItemList" :girdTitle="'服务中心'" :mainColor="themeColor"></gird-box>
			</view>
			<view   class="item-box">
				<logout :mainColor="themeColor" @loginOut="loginOut"></logout>
			</view>
			<view   class="item-box">
				<guide :scrollViewHeight="300" @toPage="toPage"></guide>
			</view>
		</view>
	</view>
</template>

<script>
	import guide from '@/components/common/guide/template-guide.vue';
	import accountBox from '@/components/common/account.vue';
	import orderBox from '@/components/common/orderBox.vue';
	import girdBox from '@/components/common/girdBox.vue';
	import logout from '@/components/common/loginOut.vue';
	export default {
		components:{
			guide,orderBox,girdBox,accountBox,logout	
		},
		name:"t3-my",
		props:{
			navbarTitle:{
				type:String,
				default:'我的'
			}
		},
		data() {
			return {
				background:{
					backgroundColor:'#ccaf8b',
				},
				themeColor:'#ccaf8b',
				customGirdStyle:{
					padding: '20rpx 0',
					color:'#000000'
				},
				//订单类型
				orderTypeList: [
					{
						title: '待付款',
						status: 'unpaid',
						icon: 'rmb-circle',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{
							orderStatus: 'unpaid'
						},
					},
					{
						title: '待收货',
						status: 'delivered',
						icon: 'bag',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{
							orderStatus: 'delivered'
						},
					}
				],
				setItemList:[
					{
						icon:'integral' ,
						title:'账号安全',
						route:'',
						routeParam:{},
					},
					{
						icon:'map',
						title:'收货地址',
						route:'',
						routeParam:{},
					},
				],
				serviceItemList:[
					{
						icon:'server-fill' ,
						title:'客服中心',
						route:'',
						routeParam:{},
					},
					{
						icon:'email',
						title:'留言建议',
						route:'',
						routeParam:{},
					},
					{
						icon:'email',
						title:'京东/苏宁申请售后',
						route:'',
						routeParam:{},
					},
					{
						icon:'email',
						title:'京东/苏宁售后进度',
						route:'',
						routeParam:{},
					},
				],
				
			};
		},
		methods:{
			toPage:function(param){
				this.$emit("guide",param);
			},
			toNext:function(nextPage){
				let that=this;
				let url= nextPage.route;
				let params=nextPage.routeParam;
				if(url!=null&&url.length>0){
					console.log("跳转界面名称",nextPage.title);
					console.log("跳转界面",url);
					console.log("跳转界面所带参数",params);
					this.$u.route({
						url: url,
						params: params
					});
				}
				else{
					that.globalUtil.utilAlert("跳转界面不存在!");
					return;
				}
			},
			loginOut:function(){
				this.$emit("loginOut");
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab-2{
	.top-80{
		position: relative;
		top: -80rpx;
		z-index: 1000;
	}
	.item-box{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
}
</style>
<style>
	page{
		background-color: #f7f7f7;
	}
</style>
