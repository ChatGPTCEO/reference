<template>
	<view   class="guideContainer">
		<view  >
			<view   :style="'position: fixed;right:0px;bottom:'+(scrollViewHeight)+'rpx;z-index:1000'">
				<view   style="float: right;">
					<view   class="box-2"v-if="!guideFlag" @click="guideFlag=true">
						<view  ><u-icon name="arrow-left-double" size="30" color="#FEFEFE"></u-icon></view>
						<view   class="box-text-item">
							<view  >快捷</view>
							<view  >导航</view>
						</view>
					</view>
				</view>
			</view>
			<view   v-show="guideFlag">
				<u-mask :show="guideFlag"@click="guideFlag=false":custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
						<view   class="maskbox u-flex u-row-right u-col-center">
						 	<view   class="u-flex u-row-left u-col-center mask-box-item">
						 		<view   class="u-flex u-row-around u-col-centermask-item-left" @click="guideFlag=false">
						 			<view  ><u-icon name="arrow-right-double"size="30" color="#ffffff"></u-icon></view>
						 			<view  ><text>收起</text></view>
						 		</view>
						 		<view  @tap.stop class="u-flex u-row-around u-col-center mask-item-right">
						 			<view  >
						 				<u-icon @click="toPage(0)" name="home" size="40" color="#606266" label="首页" label-pos="bottom" label-color="#606266"></u-icon>
						 			</view>
						 			<view  >
						 				<u-icon @click="toPage(1)" name="shopping-cart"size="40" color="#606266" label="购物车" label-pos="bottom" label-color="#606266"></u-icon>
						 			</view>
						 			<view  >
						 				<u-icon @click="toPage(2)" name="account" size="40" color="#606266" label="我的" label-pos="bottom" label-color="#606266"></u-icon>
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
		name:"template-guide",
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
				let url='';
				switch (pageIndex){
					case 0:
						url="/pages/index/index";
						break;
					case 1:
						url="/pages/index/index";
						break;
					case 2:
						url="/pages/index/index";
						break;
					default:
						that.globalUtil.utilAlert("跳转页面不存在");
						return;
				};
				this.guideFlag=false;
				this.$emit("toPage",{"url":url,"tabIndex":pageIndex});
			},
		}
	}
</script>

<style lang="scss" scoped>
.guideContainer{
	font-family: SourceHanSansCN-Regular, SourceHanSansCN;
	.box-2{
		border-radius: 10rpx;
		width: 90rpx;
		height: 90rpx;
		background: #000000;
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
			font-size: 20rpx;
		}
	}
	.maskbox{
		height: 100%;
		width: 100%;
		.mask-box-item{
			height: 120rpx;
			position: fixed;
			/* #ifdef H5 */
			bottom: 200rpx;
			/* #endif */
			/* #ifndef H5 */
			bottom: 200rpx;
			/* #endif */

			.mask-item-left{
				border-radius: 10rpx;
				background-color:#333333;
				color: #FFFFFF;
				height: 70rpx;
				width: 120rpx;
				padding-left: 10rpx;
				padding-right: 14rpx;
				font-size: 26rpx;
			}
			.mask-item-right{
				width: 300rpx;
				border-radius: 10rpx 0rpx 0rpx 10rpx;
				height: 100rpx;
				background-color:#FFFFFF;
			}
		}
	}
}
</style>
