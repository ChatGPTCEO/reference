<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">夺宝详情</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500" style="height: 600rpx;">
			<swiper-item v-for="(item,index) in lootInfo.goodsSpu.spuUrls" :key="index">
				<image :src="item" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>

		<view class="padding-sm margin-top-xs bg-gradual-blue">
			<view class="cu-bar">
				<view>
					<text class=" text-price text-xxl">0</text>
					<text>免费拿</text>
					<text class="text-price padding-lr-sm"
						style="text-decoration:line-through;">{{lootInfo.goodsSpu.salesPrice}}</text>
				</view>
				<view>
					<view class="cuIcon-share">
					</view>
				</view>
			</view>
		</view>
		<view class="padding-sm margin-xs radius bg-white">
			<view>
				<view class="text-black ">{{lootInfo.name}}</view>
			</view>

		</view>
		<view class="bg-white padding-xs margin-xs radius">
			<view class="margin-tb-sm">
				<view>
					{{lootInfo.lootStage.numberCode}}期
				</view>
				<view class="flex justify-center align-center margin-tb">
					本期已有
					<text class="text-red padding-lr-xs">
						{{lootInfo.lootStage.joinedNum}}
					</text>
					参加，距开奖还差
					<text class="text-red padding-lr-xs text-xl">
						{{lootInfo.launchNum-lootInfo.lootStage.joinedNum}}
					</text>
					人。
				</view>
				<view class="flex  padding-tb-xs">
					<view class="cu-progress round">
						<view class="bg-green"
							:style="[{ width:lootInfo.lootStage.joinedNum>0?getRatio(lootInfo.lootStage.joinedNum,lootInfo.launchNum)+'%':''}]">
						</view>
					</view>
					<text class="margin-left">{{getRatio(lootInfo.lootStage.joinedNum,lootInfo.launchNum)}}%</text>
				</view>
				<view class="margin-tb flex justify-center">
					活动时间 {{lootInfo.startTime}} - {{lootInfo.endTime}}
				</view>
			</view>
		</view>
		<view class="bg-white padding-xs margin-xs radius" v-if="lootInfo.lootStage.joinedNum >0">
			<view class="cu-bar">
				<view>
					<text class="cuIcon-title text-red"></text> 本期已参与用户
				</view>
				<view>
					查询全部<text class="cuIcon-right"></text>
				</view>
			</view>
			<view>
				<view class="cu-avatar-group flex justify-center align-center"
					v-if="lootInfo.joinedAvatars && lootInfo.joinedAvatars.length >0">
					<view v-for="(itemAvatar,indexAvatar) in lootInfo.joinedAvatars">
						<view class="cu-avatar round xs" :key="indexAvatar"
							:style="[{ backgroundImage:'url(' + itemAvatar + ')' }]"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white margin-top-xs">
			<view class="flex justify-center padding-tb-lg">
				<text>商品详情</text>
			</view>
			<u-parse :content="lootInfo.goodsSpu.description" />
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action">
				<view class=" cuIcon-home"></view> 首页
			</view>
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				客服
			</button>
			<view class="action">
				<view class="cuIcon-share">
				</view>
				分享
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red round shadow-blur" :disabled="lootInfo.isJoined == '1'"
					@tap="onAdd">{{lootInfo.isJoined == '1' ? '本期已参与' : '立即参与'}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				lootInfo: {},
			}
		},
		onLoad(props) {
			getApp().initPage().then(res => {
				if (props.id) {
					this.getDetail(props.id);
				}
			})
		},
		methods: {
			getRatio(joinedNum, launchNum) {
				let ratio = joinedNum / launchNum * 100;
				ratio = ratio.toFixed(0);
				return ratio;
			},
			getDetail(id) {
				uni.$myRequest.getLootById(id).then(res => {
					this.lootInfo = res.data
				});
			},
			onAdd() {
				let form = {
					lootId: this.lootInfo.id,
					lootStageId: this.lootInfo.lootStage.id,
					spuId: this.lootInfo.goodsSpu.id,
				};
				uni.$myRequest.addLootUser(form).then(res => {
					uni.navigateTo({
						url: '/pages/loot-info/loot-result/index?id=' + res.data.id
					})
				});
			}
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
