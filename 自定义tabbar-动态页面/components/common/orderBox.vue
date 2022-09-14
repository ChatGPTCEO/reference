<template>
	 <view  >
		 <view   class="order-box">
		 	<u-cell-item style="padding: 10rpx 20rpx 0rpx 20rpx;"@click="showOrderByType(-1)"
		 				:title-style="{color:'#000000'}" title="我的订单" value="全部订单" :border-bottom="false"></u-cell-item>
		 	<view  >
		 		<u-grid :col="4" :border="false">
		 			<u-grid-item v-for="(item,index) in orderTypeList" :key="index" 
		 					:custom-style="customGirdStyle"
		 						@click="showOrderByType(index)">
		 				<u-icon :name="item.icon" :size="50" :color="mainColor"></u-icon>
		 				<view   class="u-m-t-10 u-font-24">{{item.title}}</view>
		 			</u-grid-item>
		 		</u-grid>
		 	</view>
		</view>
	</view>
</template>


<script>
	export default {
		name:"orderBox",
		props:{
			orderTypeList:{
				default:[],
				type:Array,
			},
			mainColor:{
				type:String,
				default:'#000000'
			},	
		},
		data() {
			return {
				customGirdStyle:{
					padding: '20rpx 0',
					color:'#000000'
				},
			};
		},
		mounted:function(){
		 
		},
		
		methods:{
			showOrderByType:function(index){
				let orderItem={};
				if(index==-1){
					orderItem={
						title: '全部',
						status: 'all',
						icon: '',
						count: 0,
						route:'pages/order/orderList',
						routeParam:{orderStatus: 'all'},
					}
				}else{
					orderItem = this.orderTypeList[index];
				}
				this.$emit("toNext",orderItem);
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
