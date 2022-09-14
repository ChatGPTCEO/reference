<template>
	 <view  >
		<template v-if="showType==0">
			<u-row>
				<u-col :span="6">
					<view   class="u-text-center" @click="toAccount(0)"><text>账户(个)</text></view>
					<view   style="font-weight: bold;" class="u-text-center u-font-30"><text>2</text></view>
				</u-col>
				<u-col :span="6">
					<view   class="u-text-center"@click="toAccount(1)"><text>积分卡(张)</text></view>
					<view   style="font-weight: bold;" class="u-text-center u-font-30"><text>0</text></view>
				</u-col>
			</u-row>
		</template>
		<template v-if="showType==1">
			<u-row>
				<u-col :span="6">
					<view   class="u-flex u-row-center u-col-center" @click="toAccount(0)">
						 <view  >
							 <u-icon name="star-fill" :color="mainColor" size="40"></u-icon>
						 </view>
						<view   class="u-text-center u-m-l-6 u-m-r-20"><text>账户(个)</text></view>
						<view   style="font-weight: bold;" class="u-text-center u-font-30"><text>2</text></view>
					</view>
				</u-col>
				<u-col :span="6">
					<view   class="u-flex u-row-center u-col-center" @click="toAccount(1)">
						<view  >
							 <u-icon name="red-packet-fill" :color="mainColor" size="40"></u-icon>
						</view>
						<view   class="u-text-centeru-m-l-6 u-m-r-20"><text>积分卡(张)</text></view>
						<view   style="font-weight: bold;" class="u-text-center u-font-30"><text>0</text></view>
					</view>	
				</u-col>
			</u-row>
		</template>
	</view>
</template>


<script>
	export default {
		name:"account",
		props:{
			 showType:{
				type:Number,
				default:0 
			 },
			 mainColor:{
				 type:String,
				 default:"#000000"
			 }
		},
		data() {
			return {
			
			};
		},
		mounted:function(){
		 
		},
		
		methods:{
			toAccount:function(accountType){
				let nextPage={
					route:'',
					routeParam:{}
				};
			//账户
				if(accountType==0){
					nextPage.route="";
				}
				//积分账户
				if(accountType==1){
					nextPage.route="";
				}
				this.$emit("toNext",nextPage);
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
