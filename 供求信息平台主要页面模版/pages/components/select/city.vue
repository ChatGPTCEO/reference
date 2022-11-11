<template>
	<view>
		<view @click="showDialogAct">
			<text class="ft14 cl-info">{{showTitle}}</text>
			<text class="ml5 iconfont icon-gengduo ft14 cl-info"></text>
		</view>
		
		<dialog-model v-if="showDialog" :setting="dialogSetting" @closed="closedAct">
				<template slot="content">
					<view class="pd16_15">
						<picker-view class="picker-view" indicator-style="height:50px" :value="selectVal" @change="bindChange">
							<picker-view-column>
								<view class="item text-center" v-for="(item,index) in cites" :key="index">{{item.name}}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item text-center" v-for="(item,index) in getChildren" :key="index">{{item.name}}</view>
							</picker-view-column>
						</picker-view>
						
					</view>
				</template>
				<template slot="footer">
					<view class="pd10_15">
						<button @click="selectYes" class="btn-big" :style="getBtnStyle">确定选择</button>
					</view>
				</template>
			</dialog-model>
		
	</view>
</template>

<script>
	export default{
		props:{
			pro_id:{
				type:Number,
				default:0
			},
			city_id:{
				type:Number,
				default:0,
			},
		},
		computed:{
			showTitle(){
				console.log(this.city_id);
				if(this.city_id > 0){
					for(var a in this.cites){
						if(this.cites[a].id == this.pro_id){
							for(var b in this.cites[a].children){
								if(this.cites[a].children[b].id == this.city_id){
									return  this.cites[a].name + '-' + this.cites[a].children[b].name;
								}
							}
						}
					}
				}
				return '请选择';
			},
			getChildren(){
				return this.cites[this.selectVal[0]].children;
			}
		},
		data(){
			return {
				myProId:0,
				myCityId:0,
				selectVal:[0,0],
				cites:[
					{id:0,name:'请选择',children:[{id:0,name:'请选择'}]},
					{id:110000,name:'北京',children:[{id:110100,name:'北京市'}]},
					{id:120000,name:'天津',children:[{id:120100,name:'天津市'}]},
					{id:130000,name:'河北',children:[{id:130100,name:'石家庄'},{id:130200,name:'唐山市'}]}
				],
				showDialog:false,
				dialogSetting: {
					show:true,
					title:'选择城市',
					zIndex:400,
					footer:true,
					bg:'#ffffff'
				},
			}
		},
		created(){
			
		},
		methods:{
			bindChange(e){
				let index = parseInt(e.detail.value[0]);
				let cityIndex = parseInt(e.detail.value[1]);
				let pro_id = this.cites[index].id;
				
				if(pro_id != this.myProId){//说明已经变了省份ID
					this.selectVal = [index,0];
				}else{
					this.selectVal = [index,cityIndex];
				}
				this.myProId = pro_id;
				this.myCityId = this.cites[index].children[cityIndex].id
			},
			selectYes(){
				
				this.$emit('change',{
					pro_id:this.myProId,
					city_id:this.myCityId
				});
				this.closedAct();
			},
			showDialogAct(){
				this.myCityId = this.city_id;
				this.myProId  = this.pro_id;
				let values = [0,0];
				for(var a in this.cites){
					if(this.cites[a].id == this.myProId){
						values[0] = parseInt(a);
						for(var b in this.cites[a].children){
							if(this.cites[a].children[b].id == this.myCityId){
								values[1] = parseInt(b);
								break;
							}
						}
						break;
					}
				}
				this.selectVal = values;
				this.dialogSetting.show = true;
				this.showDialog = true;
			},
			closedAct(){
				this.dialogSetting.show = false;
				setTimeout(()=>{
					this.showDialog = false;
				},400);
			},
		}
	}
</script>

<style>
	
</style>