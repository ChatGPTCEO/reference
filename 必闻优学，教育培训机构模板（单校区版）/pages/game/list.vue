<template>
	<view class="body-wrap">
		<!-- 头部轮播图 -->
		<view class="header-wrap">
			<!-- 轮播图 -->
			<view class="swiper-wrap"><u-swiper :list="swiperList" keyName="image" showTitle height="150" radius="10"></u-swiper></view>
		</view>

		<!-- 活动分类tab -->
		<u-sticky bgColor="#ffffff">
			<u-tabs :list="tabList" lineColor="#FFBE59"></u-tabs>
		</u-sticky>
		
		<!-- 活动列表 -->
		<view class="game-card-list-wrap">
			<view v-if="dataList.length == 0" class="empty-wrap u-m-t-80">
				<u-empty mode="list" text="暂无活动"></u-empty>
			</view>
			<view v-for="(item,index) in dataList" class="game-card-wrap box-shadow" :key="index" @click="$u.route('pages/game/detail')">
				<view class="image-wrap">
					<image :src="item.cover_image" mode="aspectFill"></image>
				</view>
				<view class="title-wrap u-line-2">
					<text>{{item.name}}</text>
				</view>
				<view class="school-info-wrap">
					<u-avatar :src="item.school_logo" size="18"></u-avatar>
					<text class="school-name u-line-1">{{item.school_name}}</text>
				</view>
			</view>
		</view>

		<!-- loadmore -->
		<u-loadmore
			marginTop="0"
			:line="true"
			:status="loadmore.status"
			:loading-text="loadmore.loadingText"
			:loadmore-text="loadmore.defaultText"
			:nomore-text="loadmore.nomoreText"
		/>

	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperList: [
				{
					image: 'https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png',
					title: '出炉啦！梨丁拉丝塔塔手作甜到你心'
				},
				{
					image: 'https://cdn.huiwenhuiyi.com/uploads/20220317/FrxbbaF2uZB0u0yFQ3FrvVvSbfyo.png',
					title: '趣味乐高文具盒手作'
				},
				{
					image: 'https://cdn.huiwenhuiyi.com/uploads/20220317/Fr0jH1qEzZXk2bxy46ej-B8MBDyq.png',
					title: '虎头虎脑，开启小老虎零钱包手作之旅~'
				}
			],
			loadmore: {
				status: 'loadmore',
				loadingText: '努力加载中',
				defaultText: '轻轻上拉 查看更多',
				nomoreText: '实在没有了',
				currnetPage: 1
			},
			tabList: [
				{
					name: '推荐'
				},
				{
					name: '附近'
				},
				{
					name: '节日'
				},
				{
					name: '赛事'
				}
			],
			dataList: [
				{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png',
					name: '出炉啦！梨丁拉丝塔塔手作甜到你心',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				},{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/FrxbbaF2uZB0u0yFQ3FrvVvSbfyo.png',
					name: '趣味乐高文具盒手作',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				},
				{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/Fr0jH1qEzZXk2bxy46ej-B8MBDyq.png',
					name: '虎头虎脑，开启小老虎零钱包手作之旅~',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				},{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png',
					name: '出炉啦！梨丁拉丝塔塔手作甜到你心',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				},{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/FrxbbaF2uZB0u0yFQ3FrvVvSbfyo.png',
					name: '趣味乐高文具盒手作',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				},
				{
					cover_image:'https://cdn.huiwenhuiyi.com/uploads/20220317/Fr0jH1qEzZXk2bxy46ej-B8MBDyq.png',
					name: '虎头虎脑，开启小老虎零钱包手作之旅~',
					school_name: '马栏山国际幼儿园',
					school_logo: '/static/img/school_logo1.png'
				}
			],
		};
	},
	methods: {

	}
};
</script>

<style lang="scss">
.body-wrap {
	overflow:visible;
	background-color: #fdfdfd;
}
.header-wrap {
	background-color: $u-primary-color;
	padding: 24rpx;
}

.game-card-list-wrap {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 24rpx 32rpx;

	.game-card-wrap {
		width: 290rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border: 1px solid rgba($color: $u-border-color, $alpha: 0.5);
		border-radius: 20rpx;
		
		.image-wrap {
			position: relative;
			margin: -20rpx -20rpx 10rpx -20rpx;
			image {
				width: 330rpx;
				height: 250rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
			}
			.image-tiny-info {
				position: absolute;
				top: 0;
				left: 0rpx;
				padding: 4rpx 8rpx;
				border-bottom-right-radius: 10rpx;
				background: rgba($color: #ffffff, $alpha: .8);
				z-index: 1;
				text {
					color: $u-content-color;
					font-size: $u-sub;
				}
			}
		}
		
		.title-wrap {
			margin-bottom: 10rpx;
			font-size: $u-p2;
			color: $u-content-color;
			min-height: 80rpx;
			.tag {
				background-color: $u-primary-color;
				padding: 2rpx 4rpx;
				border-radius: 0rpx;
				margin-right: 4rpx;
				color: #FFFFFF;
				font-size: $u-p3;
			}
		}
		
		.school-info-wrap {
			display: flex;
			align-items: center;
			font-size: $u-p3;
			color: $u-tips-color;
			.school-name {
				margin-left: 6rpx;
			}
		}
	}
}
</style>
