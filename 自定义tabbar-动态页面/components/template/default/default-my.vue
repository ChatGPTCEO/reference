<template>
	<view   class="default-my-page">
		<view  >
			<u-navbar :is-back="false" :title-bold="true" title-color="#ffffff" :title-size="34"
					 title=" " :height="150" :is-fixed="true"
					:border-bottom="false" :background="background">
				<view   style="display: flex;flex-direction: row;flex:1;width: 100%;padding: 30rpx;color: #FFFFFF;height:300rpx;">
					<view   style="text-align: center;width: 100%;">
						<view   class="u-m-b-20 navbarTitle" style="font-size: 32rpx;font-weight: bold;">我的</view>
						<view   class="u-flex u-row-left u-col-top">
							<view   style="width: 100rpx;height: 100rpx;background-color: #FFFFFF;border-radius: 50rpx;">
								<u-image :src="vuex_userInfo.headimgurl" bg-color="#ffffff" width="100" height="100"shape="circle">
									<view   slot="error">
										<u-icon name="account" :size="60"></u-icon>
									</view>
								</u-image>
							</view> 
							<view   class="u-m-l-20 u-font-26">
								<view   style="font-size: 34rpx;font-weight: bold;text-align: left;"><text>邦邦</text></view>
								<view   class="u-flex u-row-around u-col-center"
									style="margin-top: 10rpx;">
									<view >18800001111</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-navbar>
		</view>
		<view   class="u-p-20 top-move-80">
			<scroll-view :scroll-x="false" :scroll-y="true" class="scroll-view-bar" :style="'height:'+scrollViewHeight+'px;'">
				<view   class="item-box u-p-t-20 u-p-b-20">
					<accountBox :showType="1" :mainColor="themeColor" @toNext="toNext"></accountBox>
				</view>
				
				<view   class="item-box">
					<order-box @toNext="toNext" :orderTypeList="orderTypeList" :mainColor="themeColor"></order-box>
				</view>
				
				<view   class="item-box">
					<gird-box @toNext="toNext" :girdList="personalItemList" :girdTitle="'个人中心'" :mainColor="themeColor"></gird-box>
				</view>
				
				<view   class="item-box">
					<gird-box @toNext="toNext" :girdList="serviceItemList" :girdTitle="'服务中心'" :mainColor="themeColor"></gird-box>
				</view>
			
			</scroll-view>
		</view>
		<view   class="u-m-l-20 u-m-r-20 item-box logout">
			<logout :justQuit="false" :mainColor="themeColor" @loginOut="loginOut"></logout>		
		</view>
	</view>
</template>

<script>
	import logout from '@/components/common/loginOut.vue';
	import guide from '@/components/common//guide/template-guide.vue';
	import accountBox from '@/components/common/account.vue';
	import orderBox from '@/components/common//orderBox.vue';
	import girdBox from '@/components/common/girdBox.vue';
	export default {
		components:{
			guide,accountBox,orderBox,girdBox,logout	
		},
		name:"default-my",
		props:{
			navbarTitle:{
				type:String,
				default:'我的'
			}
		},
		data() {
			return {
				scrollViewHeight:0,
				background:{
					backgroundColor:'#F5192A',
				},
				themeColor:'#F5192A',
				customGirdStyle:{
					padding: '20rpx 0',
					color:'#000000'
				},
				//订单类型
				orderTypeList: [{
						title: '待付款',
						status: 'unpaid',
						icon: 'rmb-circle-fill',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{
							orderStatus: 'unpaid'
						},
					},
					{
						title: '已支付',
						status: 'delivered',
						icon: 'car-fill',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{
							orderStatus: 'delivered'
						},
					},
					{
						title: '待收货',
						status: 'afterSale',
						icon: 'bag-fill',
						count: 0,
						route:'pages/afterSale/afterSaleList',
						routeParam:{
							orderStatus: 'afterSale'
						},
					},
					{
						title: '已完成',
						status: 'over',
						icon: 'checkmark-circle-fill',
						count: 0,
						route:'',
						routeParam:{},
					}
				],
				
				personalItemList:[
					{
						icon:'account' ,
						title:'个人信息',
						route:'pages/tabbar/xinxixiugai/index',
						routeParam:{},
					},
					{
						icon:'integral' ,
						title:'账户安全',
						route:'',
						routeParam:{},
					 },
					{
						icon:'map',
						title:'收货地址',
						route:'pages/tabbar/address/index',
						routeParam:{type: "my"},
					},
					{
						icon:'qzone',
						title:'我的收藏',
						route:'pages/tabbar/collection/collection',
						routeParam:{},
					},
				],
				serviceItemList:[
					{
						icon:'server-fill' ,
						title:'客服中心',
						route:'pages/tabbar/kfserve/index',
						routeParam:{},
					},
					{
						icon:'email',
						title:'留言建议',
						route:'pages/tabbar/feedback/index',
						routeParam:{},
					},
					{
						icon:'question-circle',
						title:'常见问题',
						route:'pages/tabbar/usproblem/index',
						routeParam:{},
					}
				]
			};
		},
		mounted:function(){
		this.scrollViewHeight=this.$u.sys().windowHeight-220;	
		},
		
		methods:{
			toGuide:function(param){
				this.$emit("guide",param);
			},
			loginOut:function(){
				console.log("退出============登录============");
				this.$emit("loginOut");
			},
			toNext:function(nextPage){
				this.$emit("toNext",nextPage);
			},
		}
	}
</script>

<style lang="scss" scoped>
.default-my-page{
	.navbarTitle{
		/* #ifdef MP-WEIXIN */
		padding-left: 160rpx;
		/* #endif */
		//border: 1px solid #333333;
	}
	
	.top-move-80{
		position: relative;
		top: -80rpx;
		z-index: 1000;
	}
	.logout{
		position: absolute;
		bottom: 50rpx;
		width: 95%;
		z-index: 9999;
	}
	
	.item-box{
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		border: 1px solid #FFFFFF;
	}
}
</style>
<style>
	page{
		background-color: #f7f7f7;
	}
</style>
