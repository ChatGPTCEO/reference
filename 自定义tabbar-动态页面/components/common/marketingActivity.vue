<!-- 限时活动抽取模板 -->
<template>
	<view   class="marketing-activities-contatiner">
		<view   class="hot-good-box">
			<view   v-show="showTitle" class="u-flex u-row-center u-col-center u-m-l-20 u-m-b-10 u-p-t-10">
				<view   class="u-m-r-20 u-p-t-10">
					<u-icon name="integral-fill" size="48"color="#FCA235"></u-icon>
				</view>
				<view   class="title" style="font-size: 36rpx;font-weight: bold;"><text>为你推荐</text></view>
			</view>
			<view   class="tab-box" style="padding: 20rpx 0rpx;">
				<u-tabs :bar-height="6" :bar-width="100" active-color="#ff9900" name="title" :list="categoryList"
					:is-scroll="true" :current="currentTab" @change="tabChange"></u-tabs>
			</view>
			<view   style="width: 100%;"
				v-if="categoryGoodList!=null&&categoryGoodList!=undefined&&categoryGoodList.length>0">
				<u-row>
					<u-col :span="6" v-for="(good,index3) in categoryGoodList" :key="index3">
						<view   class="good-item" @click="toGoodDetail(good)">
							<view style="width: 320rpx;height: 320rpx;" >
								<u-image :src="good.path" width="320rpx" height="320rpx">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view   class="u-line-1" style="font-size: 28rpx;width: 320rpx;">{{good.skuName}}</view>
							
							<view   v-if="good.dataSourceStr" 
								class="u-p-l-16 u-p-r-16 u-p-t-4 u-p-b-4"
								style="font-size: 24rpx;border-radius: 10rpx; background-color: #F5192A;color: #FFFFFF;text-align: center;">
								{{good.dataSourceStr}}
							</view>
							
							<view   style="color: #909399;margin-top: 10rpx;">
								<text
									style="color: #F0AD4E;font-size: 32rpx;font-weight: bold;">{{good.unitPrice}}</text>
								<text style="margin: 0rpx 10rpx;">积分</text>
								<text v-if="good.listPrice" style="text-decoration: line-through;">{{good.listPrice}}</text>
							</view>
						</view>
					</u-col>
				</u-row>
				<view   v-if="categoryGoodList.length>4" @click="toActivity(categoryList[currentTab],'other')"
					class="u-flex u-row-center u-col-center u-m-t-50">
					<view   class="show-more">查看更多</view>
				</view>
			</view>
			<view   v-else class="custom-empty" style="height: 500rpx;background-color: #FFFFFF;">
				<u-empty text="暂无相关商品"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "selectedBrand",
		props:{
			categoryList:{
				default:[],
				type:Array
			},
			categoryGoodList:{
				default:[],
				type:Array
			},
			currentTab: {
				default:0,
				type:Number
			},
			showTitle:{
				default:true,
				type:Boolean
			}
		},
		data() {
			return {
				
			};
		},
		mounted: function() {
			
		},
		methods: {
			tabChange: function(index) {
				this.$emit("tabChange",index);
			},
			
			toActivity:function(limitItem,type){
				console.log("通知父组件去跳转推荐专区列表界面");
				this.$emit("toActivity",limitItem,type);
			},
			toGoodDetail:function(good){
				console.log("通知父组件去跳转商品详情界面");
				this.$emit("toGoodDetail",good);
			}
		}
	}
</script>

<style scoped lang="scss">
	.marketing-activities-contatiner{
		.hot-good-box {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding-bottom: 20rpx;
		
			.tab-box {
				margin-bottom: 20rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
			}
		
			.good-item {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				width: 100%;
				height: 500rpx;
				margin-bottom: 10rpx;
				//border: 1px solid red;
			}
		
			.show-more {
				font-size: 30rpx;
				letter-spacing: 1rpx;
				width: 400rpx;
				border: 1px solid #F7F7F7;
				text-align: center;
				padding: 16rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>
