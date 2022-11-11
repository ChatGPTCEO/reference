<template>
	<view>
		<dialog-model v-if="showDialog" :setting="dialogSetting" @closed="closedAct">
				<template slot="content">
					<view class="pd16_15">
						<view class=" flex space pt40">
							<view @click="storeLinkTo" class="create-item flex center alcenter">
								<text class="iconfont icon-gongying2 ft24" style="color: #6092f3;"></text>
								<text class="ft16 ftw500 cl-main ml10">我要供应</text>
							</view>
							<view  @click="memberLinkTo" class="create-item flex center alcenter">
								<text class="iconfont icon-qiugou ft24" style="color: #fe544b;"></text>
								<text class="ft16 ftw500 cl-main ml10">我要求购</text>
							</view>
						</view>
						
					</view>
				</template>
		</dialog-model>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				showDialog:false,
				dialogSetting: {
					show:true,
					title:'',
					zIndex:400,
					footer:false,
					bg:'#f7f8f9'
				},
			}
		},
		created(){
			this.showDialog = true;
		},
		methods:{
			memberAct(){
				this.closedAct();
				uni.navigateTo({
					url:'/pages/trade/create'
				})
			},
			storeAct(){
				this.closedAct();
				uni.navigateTo({
					url:'/pages/product/mine/form'
				});
			},
			closedAct(){
				this.dialogSetting.show = false;
				setTimeout(()=>{
					this.showDialog = false;
					this.$emit('closed');
				},400);
			}
		}
	}
</script>

<style>
	.create-item{
		width: calc(50% - 15rpx);
		height: 120rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}
</style>