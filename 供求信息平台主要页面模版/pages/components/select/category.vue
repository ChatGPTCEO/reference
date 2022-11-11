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
							<view class="item text-center" v-for="(item,index) in categorys" :key="index">{{item.name}}</view>
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
			value:{
				type:Number,
				default:0,
			},
			categorys:{
				type:Array,
				default:function(){
					return new Array;
				}
			}
		},
		computed:{
			
			showTitle(){
				for(var a in this.categorys){
					if(this.categorys[a].category_id == this.value){
						return this.categorys[a].name;
					}
				}
				return '请选择';
			}
		},
		data(){
			return {
				selectVal:[0],
				showDialog:false,
				dialogSetting: {
					show:true,
					title:'选择分类',
					zIndex:400,
					footer:true,
					bg:'#ffffff'
				},
				myselectId:0,
			}
		},
		created(){
			
		},
		methods:{
			bindChange(e){
				let index = e.detail.value[0]
				this.myselectId = this.categorys[index].category_id;
			},
			selectYes(){
				if(this.myselectId == 0){
					this.myselectId = this.categorys[0].category_id;
				}
				this.$emit('input',this.myselectId);
				this.$emit('change',this.myselectId);
				this.closedAct();
			},
			showDialogAct(){
				this.dialogSetting.show = true;
				this.showDialog = true;
				this.myselectId = this.value;
				let values = [0];
				for(var a in this.categorys){
					if(this.categorys[a].category_id == this.value){
						values[0] =  parseInt(a);
					}
				}
				this.selectVal =  values;
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