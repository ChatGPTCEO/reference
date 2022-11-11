<template>
	<view class="">
		<view class="flex-1 ml-2 topic-box row-ac">
			<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollInto">
				<view
					class="scroll-row-item"
					v-for="(item, index) in articleNavList"
					:key="item.id"
					:class="{ active: navIndex == index }"
					@click="clickNav(index, item)"
					:id="'tab' + index"
				>
					<view class="nav-name mr-5 font-s-5">{{ item.title }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 距离头部高度 -->
		<view class="mx-1 mt-2 flex-1">
			<article-list :list="articleList"></article-list>
		</view>
		<view class="suspension-right row-a-j-fc">
			<view class="suspension-circular row" @click="toRelease"><text class="iconfont icon-jiahao"></text></view>
		</view>
	</view>
</template>

<script>
import articleList from '@/components/common/article-list/article-list';
import { getArticleClassificationUrl, getArticleListUrl } from '@/api/index';

export default {
	components: {
		articleList
	},
	data() {
		return {
			articleNavList: [],
			commonHeaderHeight: 50,
			navIndex: 0,
			scrollInto: '',
			swiperCurrent: '',
			swiperHeight: '',
			articleListTotal: 0,
			articleList: [],
			articleOpenList:[],
			queryInfo: {
				articleTypeId: '',
				pageSize: 10,
				page: 1
			},
			categoryQueryInfo: {
				pid: 0,
				isOpen: 0
			},
			categoryQueryInfoOpen: {
				pid: 0,
				isOpen: 1
			}
		};
	},
	created() {
		//接收组件传送元素高度
		uni.$on('commonHeader', res => {
			this.commonHeaderHeight = res;
			
		});
		uni.getSystemInfo({
			success: res => {
				this.swiperHeight = res.windowHeight - this.commonHeaderHeight - 10;
			}
		});
	},
	onLoad() {
		this.getArticleClassificationList();
		this.getArticleList();
		this.getArticleOpenList();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.articleList = [];
		this.queryInfo.page = 1
		this.getArticleClassificationList();
		this.getArticleList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
			console.log(3);
		}, 1000);
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	methods: {
		// 顶部菜单点击事件
		clickNav(index, classificationInfo) {
			if (this.navIndex === index) {
				return;
			}
			this.navIndex = index;
			this.scrollInto = 'tab' + index;
			this.queryInfo = {
				articleTypeId: classificationInfo.id,
				pageSize: 10,
				page: 1
			};
			this.articleList = [];
			this.getArticleList();
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.articleListTotal != this.articleList.length) {
				this.queryInfo.page++;
				this.getArticleList();
			}
		},
		// 获取文章列表
		getArticleList() {
			this.$R.get(getArticleListUrl, this.queryInfo).then(res => {
				this.articleList = [...this.articleList, ...res.data.list];
				this.articleListTotal = res.data.total;
			});
		},
		// 获取分类标签
		getArticleClassificationList() {
			this.$R.get(getArticleClassificationUrl, this.categoryQueryInfo).then(res => {
				this.articleNavList = [{ id: 0, title: '全部' }, ...res.data];
			});
		},
		// 获取分类标签
		getArticleOpenList() {
			this.$R.get(getArticleClassificationUrl, this.categoryQueryInfoOpen).then(res => {
				this.articleOpenList = res.data;
			});
		},
		toRelease() {
			uni.navigateTo({
				url: '/pages/article/article-release'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.topic-box{
	height: 90rpx
}
.nav-name {
	color: #919191;
}

.active .nav-name {
	color: #3d3d3d;
	font-weight: 900;
	font-size: 32rpx;
}


.suspension-right {
	position: fixed;
	bottom: 120rpx;
	right: 20rpx;
	z-index: 99;

	.suspension-square {
		width: 120rpx;
		height: 120rpx;
		background-color: #ff4b4b;
	}

	.suspension-circular {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: #ff4b4b;
	}

	.iconfont {
		font-size: 58rpx;
		font-weight: 900;
		color: #ffffff;
	}
}
</style>
