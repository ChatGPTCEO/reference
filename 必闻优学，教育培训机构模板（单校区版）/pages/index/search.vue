<template>
	<view class="body-wrap">
		<!-- 顶部占位 -->
		<u-status-bar bgColor="#ffffff"></u-status-bar>
		
		<!-- 顶部自定义导航搜索框 -->
		<u-navbar :title="title" bgColor="#FFBE59" leftIconColor="#ffffff" :autoBack="false">
			<view class="u-nav-slot" slot="left" style="width: 520rpx;">
				<u-search placeholder="请输入搜索关键词" inputAlign="center" height="28" v-model="searchKeywords" focus :showAction="false" @search="search()"></u-search>
			</view>
		</u-navbar>
		
		<u-gap height="44"></u-gap>

		<!-- 搜索类型筛选 -->
		<view class="header-wrap cate-select-wrap">
			<view class="type-list-wrap">
				<u-tag
					v-for="(item, index) in typeList"
					:key="index"
					:text="item.name"
					:plain="!item.checked"
					shape="circle"
					:color="item.checked ? '#ffffff' : '#FFBE59'"
					borderColor="#FFBE59"
					:bgColor="item.checked ? '#FFBE59' : '#ffffff'"
					@click="changeSelectType(index)"
				></u-tag>
			</view>
			<view class="sort-btn" @click="sortListShow = !sortListShow">
				<text class="u-m-r-10">{{ sortMethod }}</text>
				<u-icon :name="sortListShow ? 'arrow-up' : 'arrow-down'" size="12"></u-icon>
			</view>
		</view>
		
		<!-- 搜索记录 -->
		<view v-if="dataList.length == 0" class="searchlog-list-wrap">
			<view class="title-wrap">
				<view class="title">搜索记录</view>
				<u-icon name="trash" size="24" color="#909193" @click="deleteModalShow = true"></u-icon>
			</view>
			<view class="loglist-wrap">
				<view v-for="(item, index) in vuex_history.searchKeywords" v-if="index < 20" :key="index" class="log-body u-line-1" @click="search(item)">{{ item }}</view>
			</view>
			<view v-if="afterSearch" class="empty-wrap u-m-t-80"><u-empty mode="search"></u-empty></view>
		</view>

		<!-- loadmore -->
		<u-loadmore
			v-if="dataList.length >= 10"
			:line="true"
			:status="loadmore.status"
			:loading-text="loadmore.loadingText"
			:loadmore-text="loadmore.defaultText"
			:nomore-text="loadmore.nomoreText"
		/>

		<!-- 排序选项actionsheet -->
		<u-action-sheet
			:actions="sortList"
			title="排序方式"
			:closeOnClickOverlay="true"
			:show="sortListShow"
			@close="sortListShow = false"
			@select="changeSortMethod"
		></u-action-sheet>
		
		<!-- uModal -->
		<u-modal :show="deleteModalShow" title="确认删除全部历史记录？" :showCancelButton="true" @cancel="deleteModalShow = false" @confirm="deleteSearchLogList()"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title:'',
			searchKeywords: null,
			type: '资讯',
			typeModel: 'article',
			typeList: [
				{
					name: '学校',
					model: 'school',
					checked: true
				},
				{
					name: '活动',
					model: 'game',
					checked: false
				},
				{
					name: '课程',
					model: 'course',
					checked: false
				},
				{
					name: '资讯',
					model: 'news',
					checked: false
				}
			],
			sortMethod: '综合', //默认排序方式
			sortMethodId: '1', //综合
			sortListShow: false,
			sortList: [
				{
					id: '1',
					name: '综合'
				},
				{
					id: '2',
					name: '阅读量'
				},
				{
					id: '3',
					name: '点赞量'
				},
				{
					id: '4',
					name: '收藏量'
				}
			],
			dataList: [], // 核心商品list
			loadmore: {
				status: 'loadmore',
				loadingText: '努力加载中',
				defaultText: '轻轻上拉',
				nomoreText: '实在没有了',
				currnetPage: 1
			},
			deleteModalShow: false, // 历史记录
			afterSearch: false // 搜索后
		};
	},
	onLoad(params) {
		// 自动搜索
		if (params.keywords !== undefined) {
			this.search(params.keywords);
		}
	},
	methods: {
		// 切换搜索分类
		changeSelectType(index) {
			this.typeList = this.typeList.map((ele, i) => {
				if (index == i) {
					return {
						name: ele.name,
						model: ele.model,
						checked: !ele.checked
					};
				} else {
					return {
						name: ele.name,
						model: ele.model,
						checked: false
					};
				}
			});
			this.type = this.typeList[index].name;
			this.typeModel = this.typeList[index].model;
			this.search(); // 重新发起搜索
			this.loadmore.status = 'loadmore'; // 复位
		},

		// 操作actionsheet
		changeSortMethod(e) {
			this.sortMethod = e.name;
			this.sortMethodId = e.id;
			this.search();
			console.log(e);
		},

		// 统一搜索
		search(kw = null) {
			if (kw !== null && kw !== '') {
				this.searchKeywords = kw;
			}

			if (this.searchKeywords == null || this.searchKeywords == '') {
				uni.$u.toast('请先输入关键词');
				return false;
			}
			
			// 写入搜索记录
			console.log(this.vuex_history);
			if (this.vuex_history.searchKeywords.findIndex(item => item == this.searchKeywords) === -1) {
				this.vuex_history.searchKeywords.unshift(this.searchKeywords); // 加到开头
				uni.$u.vuex('vuex_history.searchKeywords', this.vuex_history.searchKeywords); // 写入缓存
			}
			
			// 请求搜索接口
		},

		// 清空搜索记录
		deleteSearchLogList() {
			let empty = [];
			uni.$u.vuex('vuex_history.searchKeywords', empty);
			uni.$u.toast('已清空搜索记录');
			this.deleteModalShow = false;
		}
	}
};
</script>

<style lang="scss">
.header-wrap {
	background-color: #ffffff;
}

.cate-select-wrap {
	display: flex;
	padding: 20rpx;
	align-items: center;
	justify-content: space-between;

	.type-list-wrap {
		display: flex;
		justify-content: space-around;
		width: 450rpx;
	}

	.sort-btn {
		font-size: 28rpx;
		color: $u-content-color;
		display: flex;
		align-items: center;
	}
}

.searchlog-list-wrap {
	display: flex;
	flex-direction: column;
	padding: 32rpx;
	background-color: #ffffff;
	min-height: 120vh;

	.title-wrap {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 20rpx;

		.title {
			font-size: 30rpx;
			color: $u-tips-color;
		}
	}

	.loglist-wrap {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: flex-start;
		flex-wrap: wrap;

		.log-body {
			color: $u-content-color;
			font-size: 28rpx;
			border-radius: 4rpx;
			padding: 8rpx 14rpx;
			background-color: $u-bg-color;
			margin: 0 20rpx 20rpx 0;
			max-width: 670rpx;
			overflow-x: hidden;
		}
	}
}

.result-list-wrap {
	/* #ifdef APP-PLUS */
	margin-top: 268rpx;
	/* #endif */
	/* #ifndef APP-PLUS */
	margin-top: 210rpx;
	/* #endif */

	margin-left: 20rpx;
	margin-right: 20rpx;
	// padding-left: 20rpx;

	.news-card-body {
		background-color: #ffffff;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		border-radius: 10rpx;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 380rpx;
			.title {
				font-size: $u-p;
			}
			.info-wrap {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.likes {
					margin-right: 10rpx;
				}
				.views,
				.likes {
					font-size: $u-p2;
					color: $u-tips-color;
				}
			}
		}

		.right {
			image {
				border-radius: 10rpx;
				width: 280rpx;
				height: 180rpx;
			}
		}
	}

	.trends-body-wrap {
		background-color: #ffffff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;

		display: flex;

		.avatar-wrap {
			position: relative;
			margin-right: 20rpx;

			text {
				color: #e5af60;
				position: absolute;
				right: -10rpx;
				top: 50rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;

			.right-top-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				.username {
					color: $u-primary-color;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.cate-wrap {
					display: flex;
					color: $u-tips-color;
					font-size: $u-sub;
				}
			}

			.content-wrap {
				width: 100%;
				margin-bottom: 10rpx;

				text {
					max-height: 400rpx;
					color: $u-content-color;
					margin-bottom: 10rpx;
				}

				.picture,
				.video,
				.album {
					width: 470rpx;
					margin-bottom: 10rpx;
				}
				.album {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;

					.picture {
						width: 150rpx;
						margin-bottom: 10rpx;
					}
				}
			}

			.info-wrap {
				background-color: #ffffff;
				display: flex;
				align-items: cetner;
				justify-content: space-between;
				width: 100%;

				font-size: $u-p2;
				color: $u-content-color;

				.likes,
				.comments,
				.data-wrap {
					display: flex;
					align-items: center;
					text {
						margin-left: 6rpx;
					}
				}

				.comments {
					margin-right: 10rpx;
				}
			}

			.interact-list-wrap {
				padding: 10rpx;
				margin-top: 10rpx;
				width: 560rpx;
				border-radius: 6rpx;
				background-color: $u-bg-color;

				.likes-list-wrap {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					font-size: 28rpx;
					color: $u-content-color;

					text {
						color: $u-primary-color;
						margin-right: 10rpx;
						
						&:first-child:after,
						&:last-child:after {
							content: '';
						}
						&:after {
							content: ' ,';
						}
					}
					
				}

				.comments-list-wrap {
					display: flex;
					flex-direction: column;

					.comments-body {
						font-size: $u-p2;
						margin-bottom: 10rpx;
						
						&:last-child {
							margin-bottom: 0;
						}
						.username {
							font-weight: normal;
							margin: 0;
							color: $u-primary-color;
						}
						.username:after {
							content: ':';
						}
						.reply-username {
							font-weight: normal;
							margin: 0;
							color: $u-primary-color;
						}
						text {
							margin-left: 10rpx;
							color: $u-content-color;
						}
					}
				}
			}
		}
	}

	
	.card-body-wrap {
		display: flex;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 20rpx 20rpx 15rpx 20rpx;
		margin-bottom: 10rpx;
		
		&:last-child {
			margin-bottom: 0;
		}

		.left {
			margin-right: 20rpx;

			image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		.right {
			position: relative;
			width: 500rpx;
			height: 180rpx;
			.title {
				font-size: $u-p;
				margin-bottom: 10rpx;
			}

			.des {
				font-size: $u-p2;
				color: $u-content-color;
			}

			.info {
				position: absolute;
				bottom: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: $u-p2;

				.tiny-info {
					color: $u-content-color;
				}
			}
		}
	}
}

.goods-list-wrap {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	/* #ifdef APP-PLUS */
	margin-top: 268rpx;
	/* #endif */
	/* #ifndef APP-PLUS */
	margin-top: 210rpx;
	/* #endif */
	
	margin-left: 20rpx;
	margin-right: 20rpx;
	// background-color: #FFFFFF;
	
	.goods-body-wrap {
		width: 300rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border: 1px solid rgba($color: $u-border-color, $alpha: 0.5);
		border-radius: 10rpx;
		
		.image-wrap {
			position: relative;
			margin: -20rpx -20rpx 0 -20rpx;
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
			.tag {
				background-color: $u-primary-color;
				padding: 2rpx 4rpx;
				border-radius: 0rpx;
				margin-right: 4rpx;
				color: #FFFFFF;
				font-size: $u-p3;
			}
		}
		
		.shop-info-wrap {
			display: flex;
			align-items: center;
			font-size: $u-p3;
			color: $u-tips-color;
			.shop-name {
				margin-left: 6rpx;
			}
		}
	}
}
</style>
