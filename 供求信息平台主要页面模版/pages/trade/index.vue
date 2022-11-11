<template>
	<view>
		<sub-tabnav :scrollTop="100" :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tabnav>
		
		<view class="mt16 plr15 flex alcenter space">
			<text class="ft16 ftw500 cl-main">求购信息</text>
			<view class="flex alcenter">
				<text class="ft12 cl-notice">今日新增</text>
				<text class="ft16 ftw500 cl-main ml5">10条</text>
				<text class="ft12 cl-notice ml10">总计</text>
				<text class="ft16 ftw500 cl-main ml5">100条</text>
			</view>
		</view>
		
		<view class="pd16_15">
			<view v-for="a in 10" :key="a" :class="{mt16:a>0}" class="box noshadow ">
				<navigator url="/pages/trade/detail">
				<view class="pd16_15">
					<view class="ft16 cl-main ftw500">
						<text class="tag-categroy mr5">女装</text>求购成都批发女装市场求购成都批发女装市场求购成都批发女装市场
					</view>
					<view class="mt12 ft14 cl-notice">
						成都女装批发市场进货价格方面的问题
					</view>
					<view class="mt12 flex alcenter space">
						<view>
							<text class="ft12 cl-main">07-01</text>
							<text class="ft12 cl-main ml10">安徽 合肥</text>
						</view>
						
						<view class="baojia-btn" :style="{borderColor:tempColor,color:tempColor}">我要报价</view>
					</view>
				</view>
				</navigator>
			</view>
			
			<!-- <com-empty title="暂无求购信息"></com-empty> -->
		</view>
		<com-footer model="trade"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				selectIndex:0,
				tabs:[
					'全部', '男装','女装','童装','内衣','玩具','配饰'
				],
			}
		},
		onLoad(){
			console.log(JSON.stringify({b2bId:10}));
		},
		methods:{
			changeIndex(e){
				this.selectIndex = e;
			}
		}
	}
</script>

<style>
	
	.category-scroll{
		white-space: nowrap;
	}
	.category-scroll .item{
		display: inline-block;
		margin-right: 20rpx;
		height: 60rpx;
		padding: 0 16rpx;
		border-radius: 30rpx;
		background: #FFFFFF;
		color:#666;
		font-size: 28rpx;
		line-height: 60rpx;
	}
	.baojia-btn{
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		border:1px solid #F2F2F2;
		color:#f2f2f2;
		font-size: 28rpx;
	}
</style>