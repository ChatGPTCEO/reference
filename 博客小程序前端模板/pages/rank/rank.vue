<!-- 薪资排行 -->
<template>
	<view class="contaier" style="background-color: #FFFFFF;">
		<view class="top_bg">
			<view class="number_sy_box">
				<u-search placeholder="日照香炉生紫烟" :height="64" :searchIconSize="44" :showAction="false" disabled
					@click="toSearch"></u-search>
			</view>
		</view>
		<view class="rankList_box">
			<view class="rankItem" v-for="(item,index) in rankList" :key="index">
				<view class="rank-index">{{index + 1}}</view>
				<view class="rank-title" @click="toDetail(item)">{{item.blogName}}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import indexApi from '@/api/indexApi.js'
	export default {
		data() {
			return {
				nowTime: '',
				rankList: []
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/packageA/pages/search/search?type=0'
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/blogDetail/blogDetail?blogId=' + item.blogId
				})
			},
			async init() {
				let res = await indexApi.getRank();
				this.rankList = res.data
			}
		},
	}
</script>

<style lang="scss">
	.top_bg {
		width: 750rpx;
		height: 450rpx;
		background: url('https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/rank_bg.png') no-repeat;
		background-size: 750rpx;
		position: relative;
	}

	// 第二块
	.number_sy_box {
		width: 660rpx;
		height: 70rpx;
		background-color: #FFFFFF;
		position: absolute;
		left: 25rpx;
		border-radius: 20rpx;
		bottom: -50rpx;
		z-index: 999;
		padding: 20rpx;
		box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1)
	}

	// 列表
	.rankList_box {
		width: 750rpx;
		min-height: 200rpx;
		margin-top: 60rpx;
	}

	.rankItem:last-child {
		border: none;
	}

	.rankItem {
		width: 700rpx;
		height: 80rpx;
		margin: 0px auto;
		border-bottom: 1px solid #e9e9e9;
		display: flex;
		align-items: center;
	}

	.rank-index {
		width: 40rpx;
		color: #CCCCCC;
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	.rank-title {
		white-space: nowrap;
		/*不换行*/
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
	}
</style>
