<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading
			text="加载中"
			:loadshow="loadingStatus">
		</orange-fullloading>
		<view class="header-box">推广员进度</view>
		<view class="user-info-list">
			<view class="user-info-item">
				<view class="label">申请状态</view>
				<view class="content">
					<view v-if="applyDistributionProgressInfo.apply">已申请</view>
					<view v-else>未申请</view>
				</view>
			</view>
			<view class="user-info-item">
				<view class="label">真实姓名</view>
				<view class="content">
					<input type="text" v-model="applyDistributionProgressInfo.result.real_name" disabled/>
				</view>
			</view>
			<view class="user-info-item">
				<view class="label">身份证号</view>
				<view class="content">
					<input type="text" v-model="applyDistributionProgressInfo.result.id_card" disabled/>
				</view>
			</view>
			<view class="user-info-item">
				<view class="label">门店名称</view>
				<view class="content">
					<input type="text" v-model="applyDistributionProgressInfo.result.store_name" disabled/>
				</view>
			</view>
			<view class="user-info-item">
				<view class="label">状态</view>
				<view class="content">
					<view v-if="applyDistributionProgressInfo.result.status === 0">审核未通过</view>
					<view v-else-if="applyDistributionProgressInfo.result.status === 1">审核中</view>
					<view v-else-if="applyDistributionProgressInfo.result.status === 2">审核通过</view>
				</view>
			</view>
			<view class="user-info-item" v-if="applyDistributionProgressInfo.result.reason.length>0">
				<view class="label">拒绝原因</view>
				<view class="content">
					<view>{{applyDistributionProgressInfo.result.reason}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {applyDistributionProgressUrl} from '@/api/index'
	export default {
		data() {
			return {
				applyDistributionProgressInfo:{
					apply:'',
					result:{
						real_name:'',
						id_card:'',
						store_name:'',
						status:'',
						reason:''
					}
				},
				loadingStatus: true

			}
		},
		onLoad () {
			this.initData()
		},
		methods: {
			initData(){
				this.getApplyDistributionProgressInfo()
				// 异步延迟加载
				setTimeout(() => {
					this.loadingStatus = false
				}, 100)
			},
			// 获取推广员进度信息
			getApplyDistributionProgressInfo(){
				this.$R.get(applyDistributionProgressUrl).then(res => {
					console.log(res)
					this.applyDistributionProgressInfo =res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.header-box {
		width: 100%;
		height: 416rpx;
		background-color: $bg-light-color;
		font-size: 60rpx;
		color: $uni-text-white-color;
		line-height: 416rpx;
		text-align: center;
	}
	.user-info-list {
		.user-info-item {
			background-color: #ffffff;
			border-radius: 8rpx;
			height: 80rpx;
			padding: 20rpx;
			color: #999999;
			border-bottom: 1px solid $uni-border-color;
			display: flex;
			justify-content: left;
			.label {
				height: 80rpx;
				line-height: 80rpx;
				vertical-align: top;
				margin-top: 2rpx;
				margin-right: 20rpx;
				width: 180rpx;
			}

			.content {
				height: 80rpx;
				line-height: 80rpx;
				width: 100%;
				input {
					display: inline-block;
					height: 80rpx;
					line-height: 80rpx;
					width: 100%;
				}
			}

		}
	}
</style>
