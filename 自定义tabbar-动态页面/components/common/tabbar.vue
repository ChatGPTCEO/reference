<template>
	<view   class="tabbar-box">
		<u-row>
			<u-col v-for="(tabbar,index) in tabbarList" :key="index" :span="colSpan">
				<view   @click="changeTab(tabbar,index)" class="u-p-20"
					 :style="'display: flex;flex-direction: column;justify-content: space-around;align-items: center;height:'+footerHeight+'px;'">
					<view  ><u-icon :color="index==currentTab?tabbar.activeColor:'#b5b5b5'" :name="index==currentTab?tabbar.activeIcon:tabbar.icon" :size="60"></u-icon></view>
					<view   style="color: #b5b5b5;">
						<text :style="index==currentTab?'color:'+tabbar.activeColor:'color:#b5b5b5'">{{tabbar.title}}</text>
					</view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		props:{
			mainColor:{
				type:String,
				default:'#000000'
			},
			footerHeight:{
				type:Number,
				default:0,
			},
			colSpan:{
				type:Number,
				default:2
			},
			tabbarList:{
				type:Array,
				default:[]
			},
			currentTab:{
				default:0,
				type:Number
			}
		},
		methods:{
			changeTab:function(tabbar,index){
				this.$emit("changeTab",tabbar,index);
			},
		}
	}
</script>

<style scoped lang="scss">
	.tabbar-box{

	}
</style>
