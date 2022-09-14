<template>
	<view   class="tab-2">
		<view  >
			<u-navbar :is-back="false":title-bold="true" title-color="#ffffff" :title-size="34"
					 title=" " :height="130"
					:border-bottom="false" :background="background">
				<view   style="width: 100%;padding: 30rpx;height:260rpx;text-align: center;">
					<view   class="u-flex u-row-center u-col-center" 
						style="height: 100rpx;">
						<u-image bg-color="#ffffff" width="100" height="100"shape="circle"></u-image>
					</view> 
					<view   class="u-m-l-20 u-m-t-10" style="font-size: 30rpx;font-weight: bold;color: #000000;">
						<text>{{vuex_userInfo.name?vuex_userInfo.name:'测试员01'}}</text>
					</view>
				</view>
			</u-navbar>
		</view>
		<view   class="u-p-20">
			<view   class="item-box u-p-t-20 u-p-b-20">
				<accountBox :showType="1" :mainColor="themeColor"@toNext="toNext"></accountBox>
			</view>
			
			<view   class="item-box">
				<order-box @toNext="toNext" :orderTypeList="orderTypeList" :mainColor="themeColor"></order-box>
			</view>
			
			<view   class="item-box">
				<gird-box @toNext="toNext" :girdList="setItemList" :girdTitle="'个人中心'" :mainColor="themeColor"></gird-box>
			</view>
			
			<view   class="item-box">
				<gird-box @toNext="toNext" :girdList="serviceItemList" :girdTitle="'服务中心'" :mainColor="themeColor"></gird-box>
			</view>
			
			<view   class="item-box">
					<logout :mainColor="themeColor" @loginOut="loginOut"></logout>
			</view>
			
			<view   class="item-box" style="position: absolute;bottom: 300rpx;right: 2rpx;">
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
		name:"t5-my",
		props:{
			navbarTitle:{
				type:String,
				default:'我的'
			}
		},
		data() {
			return {
				background:{
					//backgroundColor:'#E60056',
					backgroundImage: 'linear-gradient(180deg, #E60056, #ffffff)'
				},
				themeColor:'#E60056',
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
					},
					{
						title: '退换货',
						status: 'delivered',
						icon: 'bag',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{
							orderStatus: ''
						},
					},
					{
						title: '美团订单',
						status: '',
						icon: 'bag',
						count: 0,
						route:'',
						routeParam:{
							orderStatus: ''
						},
					}
				],
				setItemList:[
					{
						icon:'account',
						title:'个人信息',
						route:'',
						routeParam:{},
					},
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
						icon:'question-circle',
						title:'常见问题',
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
			},
			
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
