<template>
	<view   class="car-container">
		<view   class="u-flex u-row-right u-col-center u-m-r-30" style="height: 60rpx;font-size: 34rpx;">
			<view   v-if="btnType==1" @click="changeBtnType(0)">编辑</view>
			<view   v-if="btnType==0" @click="changeBtnType(1)">完成</view>
		</view>

		<scroll-view class="":scroll-x="false" :scroll-y="true" :style="'width:100%;height:'+scrollViewHeight+'px;'">
			<view   class="u-m-b-30 u-m-l-30 u-m-r-30" style="border: 1px solid #ebeef5; border-radius: 20rpx;background-color: #FFFFFF;"
					v-for="(item,shopIndex) in carList" :key="shopIndex">
				<view   class="u-p-b-20 u-p-t-20">
					<view   class="u-flex u-row-left u-col-center">
						<view   class="u-p-l-16" v-if="item.selected==true" @click="selShop(shopIndex)">
							<text class="iconfont car-sel"></text>
						</view>
						<view   class="u-p-l-16" v-else @click="selShop(shopIndex)">
							<text class="iconfont car-unsel"></text>
						</view>
						<view   class="shop-name">{{item.title}}</view>
					</view>
				</view>
				<view   v-for="(itm,gIndex) in item.glist" :key="itm.id" class="u-border-top u-p-b-20 u-p-t-20">
					<u-row>
						<u-col :span="6">
							<view   class="u-flex u-row-left u-col-center u-p-l-16">
								<view  v-if="itm.selected==true"
									   style="width: 40rpx;" @click="selThis(shopIndex,gIndex)">
									<text class="iconfont car-sel"></text>
								</view>
								<view  v-else 
									   style="width: 40rpx;" @click="selThis(shopIndex,gIndex)">
									<text class="iconfont car-unsel"></text>
								</view>
								<view   class="u-m-l-30">
									<u-image width="160rpx" height="160rpx" bg-color="#ffffff"
											border-radius="20" :src="itm.img" mode="aspectFill"></u-image>
								</view>
							</view>
						</u-col>
						<u-col :span="6">
							<view   style="height: 150rpx; display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;">
								<view   class="u-line-2">{{itm.name}}</view>

								<view   class="u-flex u-row-around u-col-center" style="width: 100%;height: 50rpx;">
									<view   class="u-flex u-row-left u-col-center u-p-b-6"
										style="color: #E60012;width: 50%;">
										<view>
											<u-icon name="rmb" size="30"></u-icon>
										</view>
										<view   style="font-size: 32rpx;margin-left: 1rpx;">
											<text>{{itm.price}}</text>
										</view>
									</view>

									<view   class="u-flex u-row-around u-col-center"
										style="color: #E60012;width: 50%;">
										<view  >
											<u-icon size="40" color="#E60012" name="minus-circle-fill"
												@click="changeNum(item.total,shopIndex,gIndex,itm.stock,itm.number,0,itm.id)"></u-icon>
										</view>
										<view   class="u-m-l-20 u-m-r-20">{{itm.number}}</view>
										<view  >
											<u-icon size="40" color="#E60012"name="plus-circle-fill"
												@click="changeNum(item.total,shopIndex,gIndex,itm.stock,itm.number,1,itm.id)"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</scroll-view>
		<!-- width: 98%; -->
		<view   style="width: 100%; position: absolute;bottom: 4rpx;background-color: #FFFFFF;">
			<u-row>
				<u-col :span="3">
					<view   class="u-flex u-row-left u-col-center u-m-l-30" style="height: 100rpx;">
						<view   style="width: 44rpx;">
							<u-checkbox @change="allSelBtn"v-model="allSel" active-color="#E60012"shape="circle"></u-checkbox>
						</view>
						<view  >全选</view>
					</view>
				</u-col>
				<u-col :span="9">
					<view   class="u-flex u-row-between u-col-center u-m-r-30" v-if="btnType==1" style="height: 100rpx;padding-right: 20rpx;">
						<view   class="u-flex u-row-left u-col-center">
							<view   style="font-size: 34rpx;font-weight: bold;margin-right: 10rpx;">合计:</view>
							<view   style="font-weight: bold;">
								<u-icon name="rmb" size="28" color="#E60012"
										label-size="32rpx" :label="allAmount" label-color="#E60012" label-pos="right"
										:margin-left="2">
								</u-icon>
							</view>
						</view>
						<view  >
							<!-- ({{allNumber}}) -->
							<u-button type="error" size="medium"shape="circle" @click="jsCars">结算</u-button>
						</view>
					</view>
					<view   v-else class="u-flex u-row-right u-col-center" style="height: 100rpx;padding-right: 20rpx;">
						<view  >
							<!-- ({{allNumber}}) -->
							<u-button type="error" size="medium"shape="circle" @click="delCars">删除</u-button>
						</view>
					</view>

				</u-col>
			</u-row>
		</view>

		<u-modal v-model="maskFlag" :show-title="false" :content="maskTitle" confirm-color="#E60012" @confirm="confirm()"
				:show-cancel-button="true" @cancel="cancel()"></u-modal>

	</view>
</template>
<script>
	export default {
		props: {
			carList:{
				type: Array,
				default(){
					return []
				}
			},
			scrollViewHeight:{
				type:Number
			}
		},
		data() {
			return {
				maskFlag:false,
				maskTitle:'',
				allSel:true,
				allAmount:'0.00',
				allNumber:0,
				delIds:'',//要删除的购物车id
				btnType:1,//0删除1结算

			};
		},
		mounted() {
			this.getAllMount();
		},

		methods: {
			changeBtnType:function(value){
				this.btnType=value;
			},
			//确定按钮
			confirm:function(){
				var that = this;
				if(that.btnType==0){
					that.delbtn(that.delIds);
				}else{
					let ids = that.getCarIds();
					this.$emit('jsbtn',ids,that.carList);
				}
			},
			//取消按钮
			cancel:function(){
				console.log('您点击了取消按钮');
			},
			//打开删除弹窗
			delCars:function(){
				var that = this;
				that.delIds = '';//清除上次删除记录
				var delIds = that.getCarIds();
				if(!delIds){
					uni.showToast({
						title:'请选择要删除的商品',
						icon:'none'
					})
					return false;
				}else{
					that.delIds = delIds;
					that.maskFlag=true;
					that.maskTitle = '是否将选中商品移除购物车?'
				}
			},
			//确认删除
			delbtn: function(ids) {
				console.log("删除商品",ids);
				var that = this;
				let delParam={mallShoppingCartItem:[]};
				let delGoods=[];
				let list=that.carList;
				//console.log("删除===前===购物车数量",list);
				for (let i = 0; i < list.length; i++) {
					for (let k = 0; k < list[i].glist.length; k++) {
						if (list[i].glist[k].selected == true) {
							let delItem={
								mallId:list[i].shopId,
								amount:0,//list[i].glist[k].number
								createTime:list[i].glist[k].createTime,
								orgEmployeeId:list[i].glist[k].orgEmployeeId,
								skuId:list[i].glist[k].id,
								spuId:'',//list[i].glist[k].spuId
							};
							delGoods.push(delItem);
							list[i].glist.splice(k, 1);
							k--
						}
					}
					//若当前店铺商品删除完，删除当前店铺
					if (list[i].glist.length == 0){
						list.splice(i, 1);
						i--
					}
				}
				delParam.mallShoppingCartItem=delGoods;
				console.log("要删除的商品",delParam);
				that.getAllMount();
				that.$emit("reloadCarList",list,0);
				/* that.$u.api.shopCar.saveShoppingCart(delParam).then(res=>{
					if(res.success){
						that.globalUtil.utilAlert("删除成功");
						that.getAllMount();
						that.$emit("reloadCarList",list,1);
					}
				}) */
			},
			//结算
			jsCars:function(){
				var that = this;
				var delIds = that.getCarIds();
				if(delIds==false){
					this.globalUtil.utilAlert("请先选择需要结算的商品!");
					return;
				}else{
					that.maskFlag=true;
					that.maskTitle = '是否结算选中的商品?'
				}
			},
			//选择商品
			selThis: function(shopIndex, gIndex) {
				var that = this;
				let carList = that.carList;
				if (carList[shopIndex].glist[gIndex].selected == false) {
					carList[shopIndex].glist[gIndex].selected = true;
				} else {
					carList[shopIndex].glist[gIndex].selected = false;
				}
				for (let i = 0; i < carList.length; i++) {
					var indexNum = 0;
					for (let k = 0; k < carList[i].glist.length; k++) {
						if (carList[i].glist[k].selected == false) {
							carList[i].selected = false;
						}else{
							indexNum = indexNum+1;
							if(indexNum>0 && carList[i].glist.length==indexNum){
								carList[i].selected = true;
							}
						}
					}
				}
				that.$emit("reloadCarList",carList,0);
				that.setAllSel();
			},
			//选择商家
			selShop:function(shopIndex){
				var that = this;
				let carList = that.carList;
				if(carList[shopIndex].selected == false){
					carList[shopIndex].selected = true;
					for(let i=0;i<carList[shopIndex].glist.length;i++){
						carList[shopIndex].glist[i].selected = true;
					}
				}else{
					carList[shopIndex].selected = false;
					for(let i=0;i<carList[shopIndex].glist.length;i++){
						carList[shopIndex].glist[i].selected = false;
					}
				}
				that.$emit("reloadCarList",carList,0);
				that.setAllSel();
			},
			//是否全选
			setAllSel:function(){
				let shopNum = 0;
				for(let i=0;i<this.carList.length;i++){
					if(this.carList[i].selected == true){
						shopNum = shopNum+1;
					}
				}
				if(shopNum == this.carList.length && shopNum>0){
					this.allSel = true;
				}else{
					this.allSel = false;
				}
				this.getAllMount();
			},
			//全选
			allSelBtn: function() {
				let that = this;
				that.allSel = !that.allSel;
				let carList = that.carList;
				for (let i = 0; i < carList.length; i++) {
					for (let k = 0; k < carList[i].glist.length; k++) {
						if (that.allSel) {
							carList[i].glist[k].selected = true;
							carList[i].selected = true;
						} else {
							carList[i].selected = false;
							carList[i].glist[k].selected = false;
						}
					}
				}
				that.$emit('reloadCarList',carList,0);
				that.getAllMount();
			},
			//计算选中总价
			getAllMount: function() {
				var that = this;
				let allPrice = 0;
				var selNum = 0;
				let carList = that.carList;
				for (let i = 0; i < carList.length; i++) {
					for (let k = 0; k < carList[i].glist.length; k++) {
						if (carList[i].glist[k].selected == true) {
							selNum = selNum + carList[i].glist[k].number;
							allPrice = allPrice + (carList[i].glist[k].number * carList[i].glist[k].price);
						}else{
							that.allSel=false;
							that.carList[i].selected=false;
						}
					}
				}
				that.allNumber = selNum;
				that.allAmount = allPrice.toFixed(2);
			},
			//获取要结算的商品
			getCarIds: function() {
				var that = this;
				var carList = that.carList;
				var haveSel = [];
				for (let i = 0; i < carList.length; i++) {
					for (let k = 0; k < carList[i].glist.length; k++) {
						if (carList[i].glist[k].selected == true) {
							haveSel.push(carList[i].glist[k].id);
							//haveSel.push(carList[i].glist[k].id);
						}
					}
				}
				console.log("haveSel.length",haveSel.length);
				if (haveSel.length == 0) {
					return false;
				}else{
					let cartIds = haveSel.join(',');
					return cartIds;
				}
			},
			////适用于根据数量改变购物车
			changeNum: function(total, shopIndex, gIndex, stock, number, type, id) {
				var that = this;
				console.log("改变购物车数量");
				if (type == 0) { //减少
					if (number <= 1) {
						that.globalUtil.utilAlert("最少1件起购");
						return false;
					}
					number = number - 1;
				} else { //增加
					if (number >= stock) {
						that.globalUtil.utilAlert("库存不足");
						return false;
					}
					number = number + 1;
				}
				console.log("=====number====",number);
				var carList = that.carList;
				carList[shopIndex].glist[gIndex].number = number;
				if (type == 0) {
				carList[shopIndex].total = total - 1;
				} else {
				carList[shopIndex].total = total + 1;
				}
				that.getAllMount();
				that.$emit('reloadCarList',carList,0);
				//that.$emit('changeNum',total,carList,shopIndex,gIndex,number,id,type);
			},
		}
	}
</script>

<style scoped>
	@font-face {
	font-family: 'iconfont';/* project id 1143282 */
	src: url('https://at.alicdn.com/t/font_1143282_zy7677qexck.eot');
	src: url('https://at.alicdn.com/t/font_1143282_zy7677qexck.eot?#iefix') format('embedded-opentype'),
	url('https://at.alicdn.com/t/font_1143282_zy7677qexck.woff2') format('woff2'),
	url('https://at.alicdn.com/t/font_1143282_zy7677qexck.woff') format('woff'),
	url('https://at.alicdn.com/t/font_1143282_zy7677qexck.ttf') format('truetype'),
	url('https://at.alicdn.com/t/font_1143282_zy7677qexck.svg#iconfont') format('svg');
	}

	.iconfont {
	font-family: "iconfont" !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	}

	.car-add:before{
		content: "\e8a6";
	}
	.car-sub:before{
		content: "\e8a7";
	}
	.car-no:before{
		content: "\e64d";
	}
	.car-unsel:before{
		content: "\e63a";
	}
	.car-sel:before{
		content: "\e639";
	}
	.car-del:before{
		content: "\e622";
	}

	.iconfont{
		margin-right: 10rpx;
		color: #E60012;
	}


	.car-container{
		background-color: #F7F7F7;
	}


</style>
