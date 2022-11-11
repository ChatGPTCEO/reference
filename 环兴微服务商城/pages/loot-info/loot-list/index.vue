<template>
	<view class="bg-img bg-mask flex align-center"
		style="background-image: url('https://huanxing.oss-cn-beijing.aliyuncs.com/%E8%93%9D%E8%89%B2618%E9%A2%84%E5%94%AEC4D%E5%B1%95%E5%8F%B0%E7%9B%B4%E6%92%AD%E9%97%B4%E8%83%8C%E6%99%AF%E8%B4%B4%E7%89%87.png');height:100vh;">
		<z-paging ref="paging" v-model="list" @query="getList" :auto="false">
			<cu-custom slot="top" :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">夺宝活动</block>
			</cu-custom>
			<!-- 展位view -->
			<view style="height: 300upx;"></view>
			<view class="radius ">
				<view v-for="(item,index) in list">
					<navigator hover-class="none" :url="'/pages/loot-info/loot-detail/index?id='+item.id"
						class="flex radius padding-sm bg-white margin">
						<view class="basis-xs margin-xs radius">
							<view class="cu-avatar radius xl" :style="'background-image:url(' + item.picUrl + ')'">
							</view>
						</view>
						<view class="basis-xl margin-xs">
							<view class="hx-overflow-1">
								{{item.name}}
							</view>
							<view class="flex justify-between align-end margin-top-xs">
								<view>
									<text class="text-red text-price text-xl padding-right-xs">0</text> <text
										class="text-price"
										style="text-decoration:line-through;">{{item.goodsSpu.salesPrice}}</text>
								</view>
							</view>
							<view class="margin-top-xs">
								<view>
									满
									<text class="text-red padding-lr-xs">
										{{item.launchNum}}
									</text>开奖，还差
									<text class="text-red padding-lr-xs">
										{{item.launchNum-item.lootStage.joinedNum}}
									</text>
									人开奖
								</view>
							</view>
							<view class="flex  padding-tb-xs">
								<view class="cu-progress round">
									<view class="bg-green"
										:style="[{ width:item.lootStage.joinedNum>0?getRatio(item.lootStage.joinedNum,item.launchNum)+'%':''}]">
									</view>
								</view>
								<text class="margin-left">{{getRatio(item.lootStage.joinedNum,item.launchNum)}}%</text>
							</view>
							<view>
								<view class="cu-avatar-group">
									<view v-for="(itemAvatar,indexAvatar) in item.joinedAvatars">
										<view class="cu-avatar round xs" :key="indexAvatar"
											:style="[{ backgroundImage:'url(' + itemAvatar + ')' }]"></view>
									</view>
								</view>
							</view>
						</view>
					</navigator>

				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			getApp().initPage().then(res => {
				this.$nextTick(function() {
					this.$refs.paging.reload();
				})
			})
		},
		methods: {
			getRatio(joinedNum, launchNum) {
				console.log("joinedNum" + joinedNum);
				let ratio = joinedNum / launchNum * 100;
				ratio = ratio.toFixed(0);
				return ratio;
			},
			getList(pageNo, pageSize) {
				uni.$myRequest.getLootInfoPage({
					current: pageNo,
					size: pageSize,
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				})
			},
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
