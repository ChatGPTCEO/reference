<template>
	<view   class="login-out-page">
		<!-- #ifdef MP-WEIXIN -->
			<u-button style="width: 100%;"
					@click="loginOut" :custom-style="{color:mainColor,fontSize:'26rpx'}">退出/切换账户</u-button>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
			<u-button @click="loginOut" :custom-style="{color:mainColor,fontSize:'26rpx'}">退出/切换账户</u-button>
		<!-- #endif -->
		<u-select :default-value="[Number(currentTemplate)]" v-model="selectShow" :list="templateList" @confirm="confirm" @cancel="cancel" 
				 label-name="templateName" value-name="templateId"></u-select>
	</view>
</template>

<script>
	export default {
		props:{
			mainColor:{
				type:String,
				default:'#000000'
			},
			justQuit:{
				type:Boolean,
				default:false,
			}	
		},
		data() {
			return {
				selectShow:false,
			}
		},
		mounted:function(){
			
		},
		methods:{
			loginOut:function(){
				if(this.justQuit){
					this.$emit("loginOut");
					return;
				}
				else{
					this.selectShow=true;
					return;
				}
			},
			confirm:function(value){
				let template=value[0];
				//console.log("====选择模板=====",template);
				if(template.value=='-1'){
					this.$emit("loginOut");
					return;
				}else{
					this.$u.vuex('currentTemplate', template.value);
					this.selectShow=false;
				}
			},
			cancel:function(){
				this.selectShow=false;
			}
		}
	}	
</script>

<style scoped lang="scss">
	.login-out-page{
		
	}
</style>
