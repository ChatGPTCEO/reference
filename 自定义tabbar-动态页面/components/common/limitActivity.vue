<!-- 限时活动抽取模板 -->
<template>
	<view   class="limit-activity-contatiner">
		<view   class="limit-activity-box" v-for="(limit,limitIndex) in limitActivityList" :key="limitIndex">
			<view   class="ac-info" style="margin-bottom: 10rpx;">
				<view   class="left" style="">
					<view   class=" u-m-l-20 u-font-36" style="font-weight: bold;">
						限时抢购:
					</view>
					<view   class="time-box" style="">
						<u-count-down :timestamp="limit.limitTimeStamp" separator="zh" :separator-size="28"
							separator-color="#F5192A" :font-size="28" :show-border="true" border-color="#ffffff"
							 color="#ffffff" bg-color="#F5192A"></u-count-down>
					</view>
				</view>
				<view   class="right u-m-r-10" @click="toActivity(limit,'limit')">
					<u-icon name="play-right-fill"></u-icon>
				</view>
			</view>
			<view   class="ac-goods-box" 
					v-if="limit.limitAcGoods!=null&&limit.limitAcGoods!=undefined&&limit.limitAcGoods.length>0">
				<scroll-view :scroll-y="false" :scroll-x="true" style="width: 100%;">
					<view   class="u-flex u-row-left u-col-center" style="width: 100%;">
						<view   v-for="(good,index) in limit.limitAcGoods" :key="index" 
							@click="toGoodDetail(good)"
							class="limit-good-item">
							<view   style="border: 1px solid #f7f7f7;border-radius: 10rpx;width: 150rpx;height: 150rpx;">
								<u-image v-if="good.path&&good.path.length>0" 
										:src="good.path" width="150rpx" mode="widthFix" :border-radius="10">
									<u-loading slot="loading"></u-loading>
									<view slot="error">
										<u-icon size="100" name="photo"></u-icon>
									</view> 
								</u-image>
								<view   v-else>
									<u-icon size="100" name="photo" color="#909399"></u-icon>
								</view>
							</view>
							<view   class="u-m-b-10">
								<view   class="good-name">{{good.skuName}}</view>
							</view>
							<view   class="u-m-b-6" style="color: red;font-size: 32rpx;">
								<text class="u-m-r-2">¥</text><text>{{good.unitPrice}}</text>
							</view>
							<view   style="color: gray;font-size: 28rpx;text-decoration: line-through;">
								<text class="u-m-r-2">¥</text><text>{{good.unitPrice}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view   v-else class="custom-empty" style="height: 200rpx;background-color: #FFFFFF;">
				<u-empty text="暂无相关商品"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "limitActivity",
		props:{
			limitActivityList:{
				default:[],
				type:Array
			}	
		},
		data() {
			return {
				primaryColor:'',
				themeType:''
			};
		},
		mounted: function() {
			
		},
		methods: {
			toActivity:function(limitItem,type){
				console.log("通知父组件去跳转更多限时活动列表界面");
				this.$emit("toActivity",limitItem,type);
			},
			toGoodDetail:function(good){
				console.log("通知父组件去跳转商品详情界面",good);
				this.$emit("toGoodDetail",good);
			}
		}
	}
</script>

<style scoped lang="scss">
	.limit-activity-contatiner {
		/* 限时抢购 */
		.limit-activity-box {
			min-height: 400rpx;
			background-color: #FFFFFF;
			border-radius: 16px;
			//margin: 30rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		
			.ac-info {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 4rpx;
		
				.left {
					height: 60rpx;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
		
					.time-box {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						font-size: 32rpx;
						color: red;
		
						.time-item {
							padding: 4rpx;
							width: 50rpx;
							height: 50rpx;
							background-color: red;
							color: #FFFFFF;
							border-radius: 10rpx;
							text-align: center;
						}
					}
				}
		
				.right {
					/* #ifndef H5 */
					//margin-right: 18rpx;
					/* #endif */
					/* #ifdef H5 */
					//margin-right: 16rpx;
					/* #endif */
				}
			}
		
			.ac-goods-box {
				.limit-good-item {
					margin-right: 8rpx;
					width: 180rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
		
					.good-name {
						max-width: 150rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>


