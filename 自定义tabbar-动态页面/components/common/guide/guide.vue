<template>
	<view   class="guideContainer">
		<view  >
			<view   :style="'position: fixed;right:0px;bottom:'+(scrollViewHeight)+'rpx;'">
				<view   style="float: right;" v-if="!guideFlag">
					<view   class="box-1" @click="toAdvice()">
						<view  ><u-icon name="bookmark" size="64" color="#FEFEFE"></u-icon></view>
						<view  ><text>留言建议</text></view>
					</view>
					<view   class="box-2"@click="guideFlag=true">
						<view  ><u-icon name="arrow-left" size="40" color="#FEFEFE"></u-icon></view>
						<view   class="box-text-item">
							<view  >快捷</view>
							<view  >导航</view>
						</view>
					</view>
				</view>
			</view>
			<view  >
				<u-mask :show="guideFlag" @click="guideFlag=false" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
						<view   class="maskbox u-flex u-row-right u-col-center">
						 	<view   class="u-flex u-row-left u-col-center mask-box-item" :style="'bottom:'+scrollViewHeight+'rpx'">
						 		<view   class="u-flex u-row-around u-col-centermask-item-left" @click="guideFlag=false">
						 			<view  ><u-icon name="arrow-right"size="36" color="#ffffff"></u-icon></view>
						 			<view  ><text>收起</text></view>
						 		</view>
						 		<view  @tap.stop class="u-flex u-row-around u-col-center mask-item-right">
						 			<view  >
						 				<u-icon @click="toPage(0)" name="home" size="40" color="#606266" label="首页" label-pos="bottom" label-color="#606266"></u-icon>
						 			</view>
						 			<view  >
						 				<u-icon @click="toPage(2)" name="shopping-cart"size="40" color="#606266" label="购物车" label-pos="bottom" label-color="#606266"></u-icon>
						 			</view>
						 			<view  >
						 				<u-icon @click="toPage(3)" name="account" size="40" color="#606266" label="我的" label-pos="bottom" label-color="#606266"></u-icon>
						 			</view>
						 		</view>
						 	</view>
						</view>
				</u-mask>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"guide",
		props:{
			scrollViewHeight: {
				type: [Number],
				default:uni.getSystemInfoSync().screenHeight-230
			},
		},
		data() {
			return {
				guideFlag:false,
			};
		},
		methods:{
			toPage:function(pageIndex){
				this.guideFlag=false;
				let url='/pages/template/customTemplate';
				this.$emit("toPage",url,pageIndex);
			},
			
			toAdvice:function(){
				this.$u.route("/pages/tabbar/feedback/index");
			},
		}
	}
</script>

<style lang="scss" scoped>
.guideContainer{
	font-family: SourceHanSansCN-Regular, SourceHanSansCN;
	.box-1{
		border-radius: 20rpx;
		margin-bottom: 15rpx;
		width: 120rpx;
		height: 120rpx;
		background: #535353;
		color: #FEFEFE;
		opacity: 0.55;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.box-2{
		border-radius: 20rpx;
		margin-top: 15rpx;
		width: 120rpx;
		height: 120rpx;
		background: #535353;
		color: #FEFEFE;
		opacity: 0.55;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.box-text-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}
	}
	.maskbox{
		height: 100%;
		width: 100%;
		.mask-box-item{
			height: 120rpx;
			position: fixed;
			//bottom: var(--scrollViewHeight/2+'rpx');
			.mask-item-left{
				border-radius: 10rpx;
				background-color:#535353;
				color: #FFFFFF;
				height: 60rpx;
				width: 120rpx;
				padding-left: 10rpx;
				padding-right: 14rpx;
			}
			.mask-item-right{
				width: 300rpx;
				border-radius: 20rpx 0rpx 0rpx 20rpx;
				height: 100rpx;
				background-color:#FFFFFF;
			}
		}
	}
}
</style>
