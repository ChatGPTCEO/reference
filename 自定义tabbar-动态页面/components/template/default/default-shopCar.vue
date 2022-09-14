<template>
	<view  >
		<u-navbar :is-back="false" back-icon-color="#ffffff"
				 title="购物车" :title-size="34"  title-color="#ffffff"
				:border-bottom="false" :background="background"></u-navbar>
		<view   class="container" v-if="emptyFlag==false">
			<shopCar ref="mycar" 
				:scrollViewHeight="scrollHeight" 
				:carList="carList" 
				@reloadCarList="reloadCarList"
				@jsbtn="jsbtn" @changeNum="changeNum"></shopCar>
		</view>
		<view   v-else class="custom-empty">
			<u-empty  mode="car">
				<u-button slot="bottom" @click="toCategory()" type="error" plain size="meduim" :custom-style="customBtnStyle">去逛逛</u-button>
			</u-empty>
		</view>
	</view>
</template>

<script>
    import shopCar from '@/components/shopCar/car-list.vue';
	import pageData from '@/util/pagedata.js';
    export default {
	  props:{
		 bodyHeight:{
			 default:400,
			 type:Number,
		 }
	  }	,
      components:{
        shopCar
      },
      data() {
        return {
          background:{
            backgroundColor:'#fa3534'
          },
          scrollHeight:0,
          customBtnStyle:{
            padding:'10rpx 40rpx',
            fontSize: '30rpx',
          },
		  carList:[],
          emptyFlag:true,
        }
      },
	  mounted: function() {
		let that = this;
		that.getShopCarInfo();
		// #ifdef H5
			let windowHeight = this.$u.sys().windowHeight;
			this.scrollHeight = windowHeight / 10 * 9-85;
		// #endif
		// #ifndef H5
			let windowHeight = this.$u.sys().windowHeight;
			this.scrollHeight = windowHeight / 10 *9 - 130;
		// #endif
	  },
      methods: {
		//获取购物车信息
		getShopCarInfo:function(){
			let that=this;
			that.carList = pageData.getShopCarData();
			console.log("购物车数量",that.carList);
			if(that.carList.length>0){
				that.emptyFlag=false;
			}else{
				that.emptyFlag=true;
			}
		},
		//获取购物车数量
		getShopCarCount:function(){
			let that=this;
		},
		//重新渲染购物车
		reloadCarList:function(carList,type){
			if (carList.length < 1) {
				this.emptyFlag=true;
			}
			//静态交互
			if(type==0){
				console.log("静态交互");
				this.carList=carList;
			}
			//动态获取
			else{
				console.log("动态获取购物车数据");
				this.getShopCarInfo();
				//this.carList=carList;
			}
		},
		//购物车有变化
		saveShopCarChange:function(obj){
			let param={
				'mallShoppingCartItem':[obj]
			}
			this.$u.api.shopCar.saveShoppingCart(param).then(res=>{
				console.log("改变购物车",res);
			})
		},
        //结算按钮
        jsbtn:function(ids,list){
		
        },
		//改变购物车数量
		changeNum:function(total,carList,shopIndex,gIndex,number,id,type){
			var that = this;
			console.log("改变购物车数量===total===",total);
			console.log("改变购物车数量===carList===",carList);
			console.log("改变购物车数量===shopIndex===",shopIndex);
			console.log("改变购物车数量===gIndex===",gIndex);
			console.log("改变购物车数量===gIndex===",number);
			console.log("改变购物车数量===number===",id);
			console.log("改变购物车数量====id===",id);
			console.log("改变购物车数量====type===",type);
		},
		//去分类
		toCategory:function(){
			this.$u.route({
				type:'reLaunch',
				url:'/pages/template/customTemplate',
				params:{
					activeTabItem:1
				}
			})
		}
		}
    }
</script>

<style lang="scss">

</style>
